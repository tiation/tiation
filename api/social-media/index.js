/**
 * Tiation Social Media API
 * Main entry point for all social media integrations
 */

require('dotenv').config();
const express = require('express');
const winston = require('winston');
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Import social media services
const TwitterService = require('./services/twitter');
const InstagramService = require('./services/instagram');
const FacebookService = require('./services/facebook');
const LinkedInService = require('./services/linkedin');
const YouTubeService = require('./services/youtube');
const RedditService = require('./services/reddit');

// Import utilities
const analytics = require('./utils/analytics');
const scheduler = require('./utils/scheduler');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'social-media-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Initialize Express app
const app = express();
app.use(express.json());

// Rate limiter configuration
const rateLimiter = new RateLimiterMemory({
  points: process.env.API_RATE_LIMIT_MAX_REQUESTS || 100,
  duration: process.env.API_RATE_LIMIT_WINDOW || 900000, // 15 minutes
});

// Rate limiting middleware
const rateLimitMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).send('Too Many Requests');
  }
};

app.use(rateLimitMiddleware);

// Initialize services
const services = {
  twitter: new TwitterService(logger),
  instagram: new InstagramService(logger),
  facebook: new FacebookService(logger),
  linkedin: new LinkedInService(logger),
  youtube: new YouTubeService(logger),
  reddit: new RedditService(logger)
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Social media endpoints
app.post('/post', async (req, res) => {
  try {
    const { platforms, content, media, schedule } = req.body;
    const results = {};

    for (const platform of platforms) {
      if (services[platform]) {
        results[platform] = await services[platform].post(content, media, schedule);
      }
    }

    res.json({ success: true, results });
  } catch (error) {
    logger.error('Error posting to social media:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/analytics/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    const { startDate, endDate } = req.query;

    if (!services[platform]) {
      return res.status(404).json({ error: 'Platform not supported' });
    }

    const data = await services[platform].getAnalytics(startDate, endDate);
    res.json({ success: true, data });
  } catch (error) {
    logger.error('Error fetching analytics:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/followers/:platform', async (req, res) => {
  try {
    const { platform } = req.params;

    if (!services[platform]) {
      return res.status(404).json({ error: 'Platform not supported' });
    }

    const followers = await services[platform].getFollowers();
    res.json({ success: true, followers });
  } catch (error) {
    logger.error('Error fetching followers:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start scheduled jobs
scheduler.startJobs(services, logger);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Social Media API server running on port ${PORT}`);
});

module.exports = { app, services };
