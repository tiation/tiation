/**
 * Social Media API Configuration
 * Central configuration for all social media platform APIs
 */

const config = {
  // Twitter/X API Configuration
  twitter: {
    apiKey: process.env.TWITTER_API_KEY,
    apiSecretKey: process.env.TWITTER_API_SECRET_KEY,
    bearerToken: process.env.TWITTER_BEARER_TOKEN,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    apiUrl: 'https://api.twitter.com/2',
    apiVersion: 'v2',
    scopes: ['tweet.read', 'tweet.write', 'users.read', 'follows.read', 'follows.write']
  },

  // Instagram API Configuration
  instagram: {
    clientId: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    apiUrl: 'https://graph.instagram.com',
    apiVersion: 'v18.0',
    scopes: ['user_profile', 'user_media', 'instagram_basic', 'instagram_content_publish']
  },

  // Facebook API Configuration
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN,
    apiUrl: 'https://graph.facebook.com',
    apiVersion: 'v18.0',
    scopes: ['public_profile', 'pages_show_list', 'pages_manage_posts', 'pages_read_engagement']
  },

  // LinkedIn API Configuration
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    accessToken: process.env.LINKEDIN_ACCESS_TOKEN,
    apiUrl: 'https://api.linkedin.com/v2',
    scopes: ['r_liteprofile', 'r_emailaddress', 'w_member_social', 'r_organization_social']
  },

  // TikTok API Configuration
  tiktok: {
    clientKey: process.env.TIKTOK_CLIENT_KEY,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
    accessToken: process.env.TIKTOK_ACCESS_TOKEN,
    apiUrl: 'https://open-api.tiktok.com',
    apiVersion: 'v1.3',
    scopes: ['user.info.basic', 'video.list', 'video.upload']
  },

  // YouTube API Configuration
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY,
    clientId: process.env.YOUTUBE_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
    accessToken: process.env.YOUTUBE_ACCESS_TOKEN,
    refreshToken: process.env.YOUTUBE_REFRESH_TOKEN,
    apiUrl: 'https://www.googleapis.com/youtube/v3',
    scopes: ['https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/youtube']
  },

  // Pinterest API Configuration
  pinterest: {
    appId: process.env.PINTEREST_APP_ID,
    appSecret: process.env.PINTEREST_APP_SECRET,
    accessToken: process.env.PINTEREST_ACCESS_TOKEN,
    apiUrl: 'https://api.pinterest.com/v5',
    scopes: ['boards:read', 'boards:write', 'pins:read', 'pins:write', 'user_accounts:read']
  },

  // Reddit API Configuration
  reddit: {
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN,
    userAgent: process.env.REDDIT_USER_AGENT || 'Tiation Social Media Bot/1.0',
    apiUrl: 'https://oauth.reddit.com',
    scopes: ['identity', 'submit', 'read', 'privatemessages', 'subscribe']
  }
};

module.exports = config;
