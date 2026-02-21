#!/bin/bash

# Create Stripe Products and Prices for Revenue Potential
# Run this script to set up your Stripe products

echo "Creating Stripe products for Revenue Potential..."

# Create Starter Product
echo "Creating Starter tier..."
STARTER_PRODUCT=$(stripe products create \
  --name="Revenue Potential - Starter" \
  --description="1 user, 3 revenue streams, basic forecasting, PDF reports" \
  --format=json | jq -r '.id')

STARTER_PRICE=$(stripe prices create \
  --product="$STARTER_PRODUCT" \
  --unit-amount=4900 \
  --currency=usd \
  --recurring[interval]=month \
  --lookup-key=price_starter \
  --format=json | jq -r '.id')

echo "Starter Product ID: $STARTER_PRODUCT"
echo "Starter Price ID: $STARTER_PRICE"

# Create Pro Product
echo "Creating Pro tier..."
PRO_PRODUCT=$(stripe products create \
  --name="Revenue Potential - Pro" \
  --description="3 users, unlimited streams, AI forecasting, custom reports, API access" \
  --format=json | jq -r '.id')

PRO_PRICE=$(stripe prices create \
  --product="$PRO_PRODUCT" \
  --unit-amount=9900 \
  --currency=usd \
  --recurring[interval]=month \
  --lookup-key=price_pro \
  --format=json | jq -r '.id')

echo "Pro Product ID: $PRO_PRODUCT"
echo "Pro Price ID: $PRO_PRICE"

# Create Enterprise Product
echo "Creating Enterprise tier..."
ENTERPRISE_PRODUCT=$(stripe products create \
  --name="Revenue Potential - Enterprise" \
  --description="Unlimited users, white-label, priority support, custom integrations, account manager" \
  --format=json | jq -r '.id')

ENTERPRISE_PRICE=$(stripe prices create \
  --product="$ENTERPRISE_PRODUCT" \
  --unit-amount=19900 \
  --currency=usd \
  --recurring[interval]=month \
  --lookup-key=price_enterprise \
  --format=json | jq -r '.id')

echo "Enterprise Product ID: $ENTERPRISE_PRODUCT"
echo "Enterprise Price ID: $ENTERPRISE_PRICE"

# Update backend/app.py with price IDs
echo ""
echo "✅ Products created successfully!"
echo ""
echo "Update your backend/app.py with these price IDs:"
echo "prices = {"
echo "    'starter': '$STARTER_PRICE',"
echo "    'pro': '$PRO_PRICE',"
echo "    'enterprise': '$ENTERPRISE_PRICE'"
echo "}"
