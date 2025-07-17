# Social Media API Integration Guide

## Overview
This guide covers setting up API connections for automated posting to various social media platforms.

## 🔐 Prerequisites

### Required API Keys/Tokens
1. **Facebook/Instagram** - Facebook App ID, App Secret, Page Access Token
2. **Twitter/X** - API Key, API Secret, Bearer Token, Access Token
3. **LinkedIn** - Client ID, Client Secret, Access Token
4. **YouTube** - Google API Key, OAuth 2.0 credentials

---

## 📘 Facebook Graph API (for Facebook & Instagram)

### 1. Create Facebook App
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Click "My Apps" → "Create App"
3. Choose "Business" type
4. Fill in app details

### 2. Get Page Access Token
```bash
# First, get User Access Token with pages_manage_posts permission
# Then exchange for Page Access Token
```

### 3. Required Permissions
- `pages_show_list`
- `pages_read_engagement`
- `pages_manage_posts`
- `pages_manage_engagement`
- `instagram_basic`
- `instagram_content_publish`

### 4. API Endpoints
```bash
# Post to Facebook Page
POST https://graph.facebook.com/v18.0/{page-id}/feed

# Post to Instagram (Business Account)
POST https://graph.facebook.com/v18.0/{instagram-account-id}/media
```

---

## 🐦 Twitter API v2

### 1. Apply for Developer Account
1. Go to [developer.twitter.com](https://developer.twitter.com)
2. Apply for Elevated access (for posting)
3. Create a Project and App

### 2. Authentication
```bash
# OAuth 2.0 with PKCE (recommended)
# Or OAuth 1.0a for simpler implementation
```

### 3. Required Scopes
- `tweet.read`
- `tweet.write`
- `users.read`

### 4. API Endpoints
```bash
# Post Tweet
POST https://api.twitter.com/2/tweets

# Upload Media
POST https://upload.twitter.com/1.1/media/upload.json
```

---

## 💼 LinkedIn API

### 1. Create LinkedIn App
1. Go to [linkedin.com/developers](https://www.linkedin.com/developers)
2. Create new app
3. Add required products: "Share on LinkedIn", "Sign In with LinkedIn"

### 2. OAuth 2.0 Flow
```bash
# Authorization URL
https://www.linkedin.com/oauth/v2/authorization

# Token Exchange
POST https://www.linkedin.com/oauth/v2/accessToken
```

### 3. Required Scopes
- `r_liteprofile`
- `r_organization_social`
- `w_organization_social`
- `w_member_social`

### 4. API Endpoints
```bash
# Post to Organization Page
POST https://api.linkedin.com/v2/ugcPosts
```

---

## 📹 YouTube Data API v3

### 1. Enable YouTube API
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable YouTube Data API v3

### 2. Create Credentials
- API Key for public data
- OAuth 2.0 for posting/managing content

### 3. Required Scopes
- `https://www.googleapis.com/auth/youtube.upload`
- `https://www.googleapis.com/auth/youtube`

---

## 🔧 Environment Variables Setup

Create a `.env` file in your project root:

```env
# Facebook/Instagram
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
FACEBOOK_PAGE_ID=your_page_id
FACEBOOK_PAGE_ACCESS_TOKEN=your_page_token
INSTAGRAM_ACCOUNT_ID=your_instagram_id

# Twitter
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_BEARER_TOKEN=your_bearer_token
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_token_secret

# LinkedIn
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_ACCESS_TOKEN=your_access_token
LINKEDIN_ORGANIZATION_ID=your_org_id

# YouTube
YOUTUBE_API_KEY=your_api_key
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
YOUTUBE_CHANNEL_ID=your_channel_id
```

---

## 🚀 Quick Start Scripts

### Install Dependencies
```bash
npm install axios dotenv oauth-1.0a crypto
```

### Basic Posting Script Structure
```javascript
const axios = require('axios');
require('dotenv').config();

// Facebook Post
async function postToFacebook(message) {
  const url = `https://graph.facebook.com/v18.0/${process.env.FACEBOOK_PAGE_ID}/feed`;
  const params = {
    message: message,
    access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  };
  
  try {
    const response = await axios.post(url, params);
    console.log('Posted to Facebook:', response.data);
  } catch (error) {
    console.error('Facebook post error:', error.response.data);
  }
}

// Twitter Post
async function postToTwitter(text) {
  const url = 'https://api.twitter.com/2/tweets';
  const data = { text };
  
  const headers = {
    'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  };
  
  try {
    const response = await axios.post(url, data, { headers });
    console.log('Posted to Twitter:', response.data);
  } catch (error) {
    console.error('Twitter post error:', error.response.data);
  }
}
```

---

## 📊 Rate Limits

### Facebook/Instagram
- 200 calls per hour per user
- 4800 calls per day per app

### Twitter
- 300 tweets per 3 hours
- 50 requests per 15 minutes (app auth)

### LinkedIn
- 100 requests per day (organization posts)
- Varies by endpoint

### YouTube
- 10,000 units per day (quota based)
- Different actions cost different units

---

## 🔒 Security Best Practices

1. **Never commit API keys** - Use environment variables
2. **Use OAuth 2.0** where possible instead of API keys
3. **Implement token refresh** for long-lived access
4. **Store tokens securely** - Consider encryption at rest
5. **Use webhook verification** for incoming requests
6. **Implement rate limiting** in your application
7. **Log all API interactions** for audit trails

---

## 📱 Testing Tools

### Postman Collections
Create collections for each platform to test API calls

### Facebook Graph API Explorer
[developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer)

### Twitter API Playground
Use Postman or Insomnia with OAuth 1.0a

### LinkedIn API Console
Test directly in LinkedIn developer portal

---

## 🚨 Common Issues

### Facebook
- **Token Expiration**: Page tokens expire after 60 days
- **App Review**: Need approval for public posting
- **Instagram**: Requires Business/Creator account

### Twitter
- **Elevated Access**: Required for most features
- **Media Upload**: Separate endpoint, multi-step process

### LinkedIn
- **Organization vs Personal**: Different endpoints
- **Media Upload**: Requires pre-registration of assets

### YouTube
- **Quota Limits**: Very restrictive daily quotas
- **Video Processing**: Asynchronous, check status

---

## 📝 Next Steps

1. Register apps on each platform
2. Set up OAuth flows
3. Store credentials securely
4. Implement posting functions
5. Add error handling and retries
6. Set up monitoring and logging
7. Create posting schedule/queue

Need help with a specific platform? Check the individual API documentation or create an issue in our repository.
