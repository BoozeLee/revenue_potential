#!/bin/bash

echo "🚀 Revenue Potential - Quick Start"
echo "=================================="
echo ""

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found. Using SQLite instead."
    export DATABASE_URL="sqlite:///revenue.db"
else
    echo "✓ PostgreSQL found"
    # Create database if it doesn't exist
    createdb revenue_potential 2>/dev/null || echo "  Database already exists"
fi

# Backend setup
echo ""
echo "📦 Setting up backend..."
cd backend

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate
pip install -q -r requirements.txt

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your Stripe keys"
fi

echo "✓ Backend ready"

# Frontend setup
echo ""
echo "📦 Setting up frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    npm install
fi

echo "✓ Frontend ready"

# Summary
echo ""
echo "=================================="
echo "✅ Setup complete!"
echo ""
echo "To start the app:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && source venv/bin/activate && flask run"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend && npm run dev"
echo ""
echo "Then visit: http://localhost:5173"
echo ""
echo "📚 Read SETUP_GUIDE.md for detailed instructions"
echo "🚀 Read PRODUCT_HUNT_LAUNCH.md for launch strategy"
