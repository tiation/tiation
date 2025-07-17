# Tiation Social Media API

<p align="center">
  <img src="../../assets/images/tiation-logo.png" alt="Tiation Logo" width="200">
</p>

## Overview

The Tiation Social Media API provides a unified interface for managing multiple social media platforms. It supports posting content, fetching analytics, managing followers, and scheduling posts across Twitter/X, Instagram, Facebook, LinkedIn, YouTube, and Reddit.

## Features

- **Multi-Platform Support**: Single API for all major social media platforms
- **Content Publishing**: Post text, images, and videos across platforms
- **Analytics & Insights**: Track engagement, followers, and performance metrics
- **Scheduled Posting**: Schedule content for future publication
- **Rate Limiting**: Built-in rate limiting to prevent API abuse
- **Automated Tasks**: Cron jobs for analytics collection and scheduled posts

## Installation

```bash
cd api/social-media
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp ../../.env.example ../../.env
```

2. Fill in your social media API credentials in the `.env` file.

## API Credentials Setup

### Twitter/X
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Generate API keys and access tokens

### Instagram
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app with Instagram Basic Display
3. Get Instagram Business Account ID

### Facebook
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app
3. Add Facebook Login and Pages API

### LinkedIn
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create an app
3. Request access to necessary products

### YouTube
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable YouTube Data API v3
3. Create OAuth 2.0 credentials

### Reddit
1. Go to [Reddit Apps](https://www.reddit.com/prefs/apps)
2. Create a new app
3. Choose "script" type for personal use

## Usage

### Starting the Server

```bash
npm start
# or for development with auto-reload
npm run dev
```

The API will be available at `http://localhost:3000`

### API Endpoints

#### Health Check
```http
GET /health
```

#### Post Content
```http
POST /post
Content-Type: application/json

{
  "platforms": ["twitter", "facebook", "linkedin"],
  "content": {
    "text": "Check out Tiation's latest features!",
    "title": "Tiation Update"
  },
  "media": {
    "imageUrl": "https://example.com/image.jpg"
  },
  "schedule": "2024-12-25T10:00:00Z"
}
```

#### Get Analytics
```http
GET /analytics/:platform?startDate=2024-01-01&endDate=2024-01-31
```

#### Get Followers
```http
GET /followers/:platform
```

### Example Code

```javascript
const axios = require('axios');

// Post to multiple platforms
async function postToSocial() {
  try {
    const response = await axios.post('http://localhost:3000/post', {
      platforms: ['twitter', 'facebook'],
      content: {
        text: 'Hello from Tiation!'
      }
    });
    
    console.log('Posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting:', error);
  }
}

// Get Twitter analytics
async function getTwitterAnalytics() {
  try {
    const response = await axios.get('http://localhost:3000/analytics/twitter', {
      params: {
        startDate: '2024-01-01',
        endDate: '2024-01-31'
      }
    });
    
    console.log('Twitter analytics:', response.data);
  } catch (error) {
    console.error('Error fetching analytics:', error);
  }
}
```

## Scheduled Jobs

The API runs several automated tasks:

- **Daily Analytics**: Collects analytics data at 2 AM daily
- **Follower Check**: Updates follower counts every 6 hours
- **Content Posting**: Scheduled posts at 10 AM and 3 PM daily

## Rate Limiting

Default rate limits:
- 100 requests per 15 minutes per IP address
- Configurable via environment variables

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "status": 500
}
```

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Architecture

```
social-media/
├── index.js           # Main entry point
├── config.js          # Configuration
├── services/          # Platform-specific services
│   ├── twitter.js
│   ├── instagram.js
│   ├── facebook.js
│   ├── linkedin.js
│   ├── youtube.js
│   └── reddit.js
├── utils/             # Utility functions
│   ├── analytics.js   # Analytics aggregation
│   └── scheduler.js   # Job scheduling
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Email: tiatheone@protonmail.com
- Documentation: https://tiation.com/docs
- GitHub Issues: https://github.com/tiation/tiation/issues

---

<p align="center">
  Made with ❤️ by Tiation
</p>
