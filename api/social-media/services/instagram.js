/**
 * Instagram Service
 * Handles Instagram API interactions
 */

const { IgApiClient } = require('instagram-private-api');
const axios = require('axios');

class InstagramService {
  constructor(logger) {
    this.logger = logger;
    this.client = new IgApiClient();
    this.businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  }

  async initialize() {
    try {
      // Initialize client if using private API
      this.client.state.generateDevice(process.env.INSTAGRAM_USERNAME);
      // await this.client.account.login(process.env.INSTAGRAM_USERNAME, process.env.INSTAGRAM_PASSWORD);
    } catch (error) {
      this.logger.error('Error initializing Instagram client:', error);
    }
  }

  async post(content, media, schedule) {
    try {
      this.logger.info('Posting to Instagram:', content);
      
      // For Instagram Business API
      if (this.businessAccountId && this.accessToken) {
        const response = await axios.post(
          `https://graph.facebook.com/v18.0/${this.businessAccountId}/media`,
          {
            caption: content,
            image_url: media?.imageUrl,
            access_token: this.accessToken
          }
        );
        
        // Publish the media
        const publishResponse = await axios.post(
          `https://graph.facebook.com/v18.0/${this.businessAccountId}/media_publish`,
          {
            creation_id: response.data.id,
            access_token: this.accessToken
          }
        );
        
        return publishResponse.data;
      }
      
      return { message: 'Instagram post created (mock)' };
    } catch (error) {
      this.logger.error('Error posting to Instagram:', error);
      throw error;
    }
  }

  async getAnalytics(startDate, endDate) {
    try {
      this.logger.info('Fetching Instagram analytics');
      
      if (this.businessAccountId && this.accessToken) {
        const response = await axios.get(
          `https://graph.facebook.com/v18.0/${this.businessAccountId}/insights`,
          {
            params: {
              metric: 'impressions,reach,profile_views',
              period: 'day',
              since: startDate,
              until: endDate,
              access_token: this.accessToken
            }
          }
        );
        
        return response.data;
      }
      
      return { impressions: 1000, reach: 800, profileViews: 50 };
    } catch (error) {
      this.logger.error('Error fetching Instagram analytics:', error);
      throw error;
    }
  }

  async getFollowers() {
    try {
      this.logger.info('Fetching Instagram followers');
      
      if (this.businessAccountId && this.accessToken) {
        const response = await axios.get(
          `https://graph.facebook.com/v18.0/${this.businessAccountId}`,
          {
            params: {
              fields: 'followers_count,media_count',
              access_token: this.accessToken
            }
          }
        );
        
        return response.data;
      }
      
      return { followers_count: 1000, media_count: 100 };
    } catch (error) {
      this.logger.error('Error fetching Instagram followers:', error);
      throw error;
    }
  }
}

module.exports = InstagramService;
