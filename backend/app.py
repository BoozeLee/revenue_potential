from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import stripe
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///revenue.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    stripe_customer_id = db.Column(db.String(100))
    subscription_tier = db.Column(db.String(20), default='free')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class RevenueStream(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    category = db.Column(db.String(50))

with app.app_context():
    db.create_all()

# Routes
@app.route('/api/health')
def health():
    return jsonify({'status': 'ok'})

@app.route('/api/revenue', methods=['GET', 'POST'])
def revenue():
    if request.method == 'POST':
        data = request.json
        stream = RevenueStream(
            user_id=data['user_id'],
            name=data['name'],
            amount=data['amount'],
            date=datetime.fromisoformat(data['date']),
            category=data.get('category', 'other')
        )
        db.session.add(stream)
        db.session.commit()
        return jsonify({'id': stream.id}), 201
    
    user_id = request.args.get('user_id', 1)
    streams = RevenueStream.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': s.id,
        'name': s.name,
        'amount': s.amount,
        'date': s.date.isoformat(),
        'category': s.category
    } for s in streams])

@app.route('/api/forecast')
def forecast():
    user_id = request.args.get('user_id', 1)
    streams = RevenueStream.query.filter_by(user_id=user_id).order_by(RevenueStream.date).all()
    
    if len(streams) < 2:
        return jsonify({'forecast': []})
    
    # Simple linear forecast
    total = sum(s.amount for s in streams)
    avg = total / len(streams)
    last_date = streams[-1].date
    
    forecast = []
    for i in range(1, 4):
        forecast.append({
            'date': (last_date + timedelta(days=30*i)).isoformat(),
            'amount': round(avg * 1.1, 2)  # 10% growth assumption
        })
    
    return jsonify({'forecast': forecast})

@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout():
    data = request.json
    tier = data['tier']
    
    prices = {
        'starter': 'price_starter',
        'pro': 'price_pro',
        'enterprise': 'price_enterprise'
    }
    
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': prices[tier],
                'quantity': 1,
            }],
            mode='subscription',
            success_url='http://localhost:5173/success',
            cancel_url='http://localhost:5173/pricing',
        )
        return jsonify({'url': session.url})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
