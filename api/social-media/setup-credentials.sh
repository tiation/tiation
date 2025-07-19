#!/bin/bash

# Social Media API Credentials Setup Script
# This script helps you obtain API credentials for various social media platforms

echo "🔐 Social Media API Credentials Setup"
echo "====================================="
echo ""

# Create .env file if it doesn't exist
ENV_FILE=".env"
if [ ! -f "$ENV_FILE" ]; then
    echo "# Social Media API Configuration" > "$ENV_FILE"
    echo "# Generated on $(date)" >> "$ENV_FILE"
    echo "" >> "$ENV_FILE"
fi

echo "📝 This script will guide you through obtaining API credentials."
echo "Some platforms require web-based setup, but we'll provide CLI commands where possible."
echo ""

# Function to add or update env variable
update_env() {
    local key=$1
    local value=$2
    
    if grep -q "^$key=" "$ENV_FILE"; then
        # Update existing
        sed -i.bak "s/^$key=.*/$key=$value/" "$ENV_FILE"
    else
        # Add new
        echo "$key=$value" >> "$ENV_FILE"
    fi
}

# Twitter/X API Setup
echo "🐦 TWITTER/X API SETUP"
echo "====================="
echo "1. Go to https://developer.twitter.com/en/portal/dashboard"
echo "2. Create a new app or select existing app"
echo "3. Generate API keys and tokens"
echo ""
read -p "Enter Twitter API Key: " twitter_api_key
read -p "Enter Twitter API Secret Key: " twitter_api_secret
read -p "Enter Twitter Bearer Token: " twitter_bearer_token
read -p "Enter Twitter Access Token: " twitter_access_token
read -p "Enter Twitter Access Token Secret: " twitter_access_secret

if [ ! -z "$twitter_api_key" ]; then
    update_env "TWITTER_API_KEY" "$twitter_api_key"
    update_env "TWITTER_API_SECRET_KEY" "$twitter_api_secret"
    update_env "TWITTER_BEARER_TOKEN" "$twitter_bearer_token"
    update_env "TWITTER_ACCESS_TOKEN" "$twitter_access_token"
    update_env "TWITTER_ACCESS_TOKEN_SECRET" "$twitter_access_secret"
    echo "✅ Twitter credentials saved"
fi

echo ""

# Facebook API Setup
echo "📘 FACEBOOK API SETUP"
echo "====================="
echo "1. Go to https://developers.facebook.com/"
echo "2. Create a new app"
echo "3. Add Facebook Login and Pages API products"
echo "4. Generate Page Access Token"
echo ""
read -p "Enter Facebook App ID: " facebook_app_id
read -p "Enter Facebook App Secret: " facebook_app_secret
read -p "Enter Facebook Page Access Token: " facebook_access_token
read -p "Enter Facebook Page ID: " facebook_page_id

if [ ! -z "$facebook_app_id" ]; then
    update_env "FACEBOOK_APP_ID" "$facebook_app_id"
    update_env "FACEBOOK_APP_SECRET" "$facebook_app_secret"
    update_env "FACEBOOK_ACCESS_TOKEN" "$facebook_access_token"
    update_env "FACEBOOK_PAGE_ID" "$facebook_page_id"
    echo "✅ Facebook credentials saved"
fi

echo ""

# Instagram API Setup
echo "📸 INSTAGRAM API SETUP"
echo "======================"
echo "Instagram uses Facebook's Graph API"
echo "1. Use the same Facebook app created above"
echo "2. Add Instagram Business Account to your Facebook Page"
echo "3. Get Instagram Business Account ID"
echo ""
read -p "Enter Instagram Business Account ID: " instagram_account_id

if [ ! -z "$instagram_account_id" ]; then
    update_env "INSTAGRAM_BUSINESS_ACCOUNT_ID" "$instagram_account_id"
    update_env "INSTAGRAM_ACCESS_TOKEN" "$facebook_access_token"
    echo "✅ Instagram credentials saved"
fi

echo ""

# LinkedIn API Setup
echo "💼 LINKEDIN API SETUP"
echo "====================="
echo "1. Go to https://www.linkedin.com/developers/"
echo "2. Create a new app"
echo "3. Add required products (Marketing API)"
echo "4. Generate access tokens"
echo ""
read -p "Enter LinkedIn Client ID: " linkedin_client_id
read -p "Enter LinkedIn Client Secret: " linkedin_client_secret
read -p "Enter LinkedIn Access Token: " linkedin_access_token
read -p "Enter LinkedIn Organization ID: " linkedin_org_id

if [ ! -z "$linkedin_client_id" ]; then
    update_env "LINKEDIN_CLIENT_ID" "$linkedin_client_id"
    update_env "LINKEDIN_CLIENT_SECRET" "$linkedin_client_secret"
    update_env "LINKEDIN_ACCESS_TOKEN" "$linkedin_access_token"
    update_env "LINKEDIN_ORGANIZATION_ID" "$linkedin_org_id"
    echo "✅ LinkedIn credentials saved"
fi

echo ""

# Test connections
echo "🧪 TESTING CONNECTIONS"
echo "======================"
echo "Testing API connections with provided credentials..."

# Test Twitter if credentials exist
if grep -q "TWITTER_API_KEY=" "$ENV_FILE" && [ ! -z "$(grep 'TWITTER_API_KEY=' "$ENV_FILE" | cut -d'=' -f2)" ]; then
    echo "🐦 Testing Twitter connection..."
    node -e "
        require('dotenv').config();
        const { TwitterApi } = require('twitter-api-v2');
        const client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET_KEY,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        });
        
        client.v2.me().then(user => {
            console.log('✅ Twitter connected as @' + user.data.username);
        }).catch(err => {
            console.log('❌ Twitter connection failed:', err.message);
        });
    " 2>/dev/null || echo "❌ Twitter test failed (check credentials)"
fi

# Test Facebook if credentials exist
if grep -q "FACEBOOK_ACCESS_TOKEN=" "$ENV_FILE" && [ ! -z "$(grep 'FACEBOOK_ACCESS_TOKEN=' "$ENV_FILE" | cut -d'=' -f2)" ]; then
    echo "📘 Testing Facebook connection..."
    node -e "
        require('dotenv').config();
        const axios = require('axios');
        const token = process.env.FACEBOOK_ACCESS_TOKEN;
        const pageId = process.env.FACEBOOK_PAGE_ID;
        
        axios.get(\`https://graph.facebook.com/\${pageId}?fields=name,fan_count&access_token=\${token}\`)
            .then(response => {
                console.log('✅ Facebook connected to:', response.data.name);
                console.log('📊 Followers:', response.data.fan_count);
            })
            .catch(err => {
                console.log('❌ Facebook connection failed:', err.response?.data?.error?.message || err.message);
            });
    " 2>/dev/null || echo "❌ Facebook test failed (check credentials)"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📁 Credentials saved to: $ENV_FILE"
echo ""
echo "🚀 Next steps:"
echo "1. Review and test your API connections"
echo "2. Run: npm run test-connections"
echo "3. Start posting: npm run post-content"
echo ""
echo "📚 Documentation:"
echo "- Twitter API: https://developer.twitter.com/en/docs/twitter-api"
echo "- Facebook API: https://developers.facebook.com/docs/pages-api"
echo "- LinkedIn API: https://docs.microsoft.com/en-us/linkedin/"
echo ""