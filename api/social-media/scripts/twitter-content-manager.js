/**
 * Twitter Content Manager for Tiation
 * Advanced Twitter posting with threads, media, and scheduling
 */

require('dotenv').config({ path: '../../../.env' });
const { TwitterApi } = require('twitter-api-v2');
const winston = require('winston');
const fs = require('fs').promises;
const path = require('path');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...rest }) => {
      return `${timestamp} [${level}]: ${message} ${Object.keys(rest).length ? JSON.stringify(rest) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'twitter-posts.log' })
  ]
});

class TwitterContentManager {
  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET_KEY,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    
    this.v2Client = this.client.v2;
  }

  /**
   * Post a single tweet
   */
  async postTweet(text, options = {}) {
    try {
      const tweet = await this.v2Client.tweet({
        text,
        ...options
      });
      
      logger.info('Tweet posted successfully', { 
        id: tweet.data.id, 
        text: text.substring(0, 50) + '...' 
      });
      
      return tweet;
    } catch (error) {
      logger.error('Failed to post tweet', { error: error.message });
      throw error;
    }
  }

  /**
   * Post a thread of tweets
   */
  async postThread(tweets) {
    try {
      const thread = [];
      let lastTweetId = null;

      for (const tweetText of tweets) {
        const options = lastTweetId ? { reply: { in_reply_to_tweet_id: lastTweetId } } : {};
        const tweet = await this.postTweet(tweetText, options);
        thread.push(tweet);
        lastTweetId = tweet.data.id;
        
        // Small delay between tweets to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      logger.info('Thread posted successfully', { 
        tweets: thread.length,
        firstTweetId: thread[0].data.id 
      });
      
      return thread;
    } catch (error) {
      logger.error('Failed to post thread', { error: error.message });
      throw error;
    }
  }

  /**
   * Upload media and post tweet with image
   */
  async postWithMedia(text, mediaPath) {
    try {
      // Upload the media
      const mediaId = await this.v2Client.uploadMedia(mediaPath);
      
      // Post tweet with media
      const tweet = await this.postTweet(text, {
        media: { media_ids: [mediaId] }
      });
      
      logger.info('Tweet with media posted successfully', { 
        id: tweet.data.id,
        mediaPath 
      });
      
      return tweet;
    } catch (error) {
      logger.error('Failed to post tweet with media', { error: error.message });
      throw error;
    }
  }

  /**
   * Get account information
   */
  async getAccountInfo() {
    try {
      const me = await this.v2Client.me();
      logger.info('Account info retrieved', me.data);
      return me.data;
    } catch (error) {
      logger.error('Failed to get account info', { error: error.message });
      throw error;
    }
  }

  /**
   * Get recent tweets
   */
  async getRecentTweets(count = 10) {
    try {
      const timeline = await this.v2Client.userTimeline(
        (await this.v2Client.me()).data.id,
        { max_results: count }
      );
      
      const tweets = [];
      for await (const tweet of timeline) {
        tweets.push(tweet);
      }
      
      logger.info(`Retrieved ${tweets.length} recent tweets`);
      return tweets;
    } catch (error) {
      logger.error('Failed to get recent tweets', { error: error.message });
      throw error;
    }
  }
}

// Tiation-specific content
const tiationThreads = [
  {
    title: "The Tiation Story",
    tweets: [
      "🧵 Let me tell you the story of Tiation - a journey from idea to innovation.",
      "It started with a simple observation: technology should empower, not overwhelm. Too many tools, too much complexity, not enough integration.",
      "We asked ourselves: What if there was a platform that brought everything together? Social media, analytics, automation - all in one place.",
      "That's when Tiation was born. A unified solution for the digital age. Built by innovators, for innovators.",
      "Today, we're proud to launch our platform to the world. This is just the beginning. Join us as we redefine what's possible. 🚀"
    ]
  },
  {
    title: "Why Tiation?",
    tweets: [
      "🤔 Why choose Tiation? Here's what makes us different:",
      "1️⃣ Unified Platform: No more juggling between multiple tools. Everything you need is in one place.",
      "2️⃣ AI-Powered Insights: Our algorithms help you make smarter decisions with real-time analytics.",
      "3️⃣ Privacy First: Your data is yours. We believe in transparency and user control.",
      "4️⃣ Community Driven: Built with feedback from real users solving real problems.",
      "5️⃣ Continuous Innovation: We're constantly evolving based on your needs.",
      "Ready to experience the difference? Visit https://tiation.com and see for yourself! ✨"
    ]
  }
];

// Main execution
async function main() {
  const manager = new TwitterContentManager();
  
  try {
    // Get account info
    logger.info('=== Twitter Content Manager for Tiation ===');
    const accountInfo = await manager.getAccountInfo();
    logger.info(`Connected to Twitter as @${accountInfo.username}`);
    
    // Post individual tweets
    logger.info('\n--- Posting Individual Tweets ---');
    await manager.postTweet("🎉 Tiation is now live on Twitter! Follow us for updates on our journey to revolutionize digital tools. #Tiation #TechInnovation");
    
    // Wait a bit before posting threads
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Post threads
    logger.info('\n--- Posting Threads ---');
    for (const thread of tiationThreads) {
      logger.info(`Posting thread: ${thread.title}`);
      await manager.postThread(thread.tweets);
      
      // Wait between threads
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
    
    // Get recent tweets to verify
    logger.info('\n--- Verifying Recent Posts ---');
    const recentTweets = await manager.getRecentTweets(5);
    recentTweets.forEach(tweet => {
      logger.info(`Tweet: ${tweet.text.substring(0, 100)}...`);
    });
    
    logger.info('\n✅ Twitter content posting complete!');
    
  } catch (error) {
    logger.error('Main execution error:', error);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { TwitterContentManager };
