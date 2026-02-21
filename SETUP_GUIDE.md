# Revenue Potential - Setup Guide

## Quick Start (This Weekend)

### 1. Set Up Stripe Products (5 minutes)

```bash
cd revenue_potential
./setup_stripe.sh
```

This will create 3 products in your Stripe account:
- Starter: $49/month
- Pro: $99/month
- Enterprise: $199/month

Copy the price IDs and update `backend/app.py` line 73-77.

### 2. Enable GitHub Pages (2 minutes)

```bash
# Push to GitHub (already done)
git add .
git commit -m "Initial MVP"
git push origin main

# Enable GitHub Pages
gh repo edit --enable-pages --pages-branch main --pages-path /docs
```

Your landing page will be live at: `https://boozelee.github.io/revenue_potential/`

### 3. Run Locally (5 minutes)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Stripe keys
flask run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

### 4. Test Stripe Integration (5 minutes)

1. Go to http://localhost:5173/pricing
2. Click "Start Free Trial" on any tier
3. You'll be redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`

### 5. Deploy with Docker (Optional)

```bash
docker-compose up -d
```

Visit: http://localhost

---

## Next Steps (This Week)

### Monday: Beta Testing
- [ ] Share with 5 friends/colleagues
- [ ] Collect feedback on UX
- [ ] Fix critical bugs

### Tuesday: Analytics
- [ ] Add Plausible/Fathom analytics
- [ ] Track: signups, conversions, feature usage
- [ ] Set up error monitoring (Sentry)

### Wednesday: Content
- [ ] Write 3 blog posts (SEO)
- [ ] Create demo video (Loom)
- [ ] Prepare Product Hunt assets

### Thursday: Polish
- [ ] Improve mobile responsiveness
- [ ] Add loading states
- [ ] Write better error messages

### Friday: Launch Prep
- [ ] Schedule Product Hunt launch
- [ ] Prepare social media posts
- [ ] Email beta users

---

## Stripe Webhook Setup (Important!)

1. Install Stripe CLI (already done)
2. Forward webhooks to local:
```bash
stripe listen --forward-to localhost:5000/api/webhook
```

3. Copy webhook secret to `.env`:
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

4. Add webhook handler to `backend/app.py`:
```python
@app.route('/api/webhook', methods=['POST'])
def webhook():
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.getenv('STRIPE_WEBHOOK_SECRET')
        )
        
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            # Update user subscription in database
            
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
```

---

## Production Deployment

### Option 1: Railway (Easiest)
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Option 2: DigitalOcean App Platform
1. Connect GitHub repo
2. Auto-deploy on push
3. $12/month for backend + frontend

### Option 3: AWS (Cheapest)
- Frontend: S3 + CloudFront
- Backend: EC2 t3.micro
- Database: RDS PostgreSQL
- ~$20/month

---

## Marketing Checklist

### Pre-Launch
- [x] Landing page live
- [ ] Waitlist collecting emails
- [ ] Demo video recorded
- [ ] Product Hunt profile complete
- [ ] Social media posts drafted

### Launch Day
- [ ] Post on Product Hunt at 12:01 AM PST
- [ ] Share on Twitter/LinkedIn/Reddit
- [ ] Email waitlist
- [ ] Respond to all comments
- [ ] Monitor analytics

### Post-Launch
- [ ] Thank supporters
- [ ] Share results
- [ ] Collect testimonials
- [ ] Plan next features

---

## Key Metrics to Track

**Week 1:**
- Waitlist signups
- Landing page visitors
- Product Hunt upvotes

**Week 2-4:**
- Free trial signups
- Activation rate (users who add revenue)
- Time to first value

**Month 2+:**
- Trial → Paid conversion
- MRR growth
- Churn rate
- Customer acquisition cost

---

## Support & Resources

- **Stripe Docs**: https://stripe.com/docs
- **React Docs**: https://react.dev
- **Flask Docs**: https://flask.palletsprojects.com
- **Product Hunt Guide**: https://www.producthunt.com/launch

---

## Troubleshooting

**Backend won't start:**
```bash
# Check Python version
python --version  # Should be 3.11+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

**Frontend won't build:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

**Stripe checkout not working:**
- Check price IDs in `backend/app.py`
- Verify Stripe keys in `.env`
- Check browser console for errors

---

## Questions?

Open an issue on GitHub or email: contact@bakerstreet.com

Good luck with your launch! 🚀
