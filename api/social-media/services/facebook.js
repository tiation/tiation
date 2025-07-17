/**
 * Facebook Service
 * Handles Facebook API interactions
 */

const FB = require('fb');
const axios = require('axios');

class FacebookService {
  constructor(logger) {
    this.logger = logger;
    this.accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    this.pageId = process.env.FACEBOOK_PAGE_ID;
    
    // Initialize FB SDK
    FB.setAccessToken(this.accessToken);
    FB.options({version: 'v18.0'});
  }

  async post(content, media, schedule) {
    try {
      this.logger.info('Posting to Facebook:', content);
      
      const postData = {
        message: content,
        access_token: this.accessToken
      };
      
      if (media?.imageUrl) {
        postData.url = media.imageUrl;
      }
      
      if (schedule) {
        postData.published = false;
        postData.scheduled_publish_time = Math.floor(new Date(schedule).getTime() / 1000);
      }
      
      const response = await FB.api(`/${this.pageId}/feed`, 'post', postData);
      return response;
    } catch (error) {
      this.logger.error('Error posting to Facebook:', error);
      throw error;
    }
  }

  async getAnalytics(startDate, endDate) {
    try {
      this.logger.info('Fetching Facebook analytics');
      
      const response = await FB.api(
        `/${this.pageId}/insights`,
        'get',
        {
          metric: 'page_views_total,page_engaged_users,page_impressions',
          period: 'day',
          since: startDate,
          until: endDate
        }
      );
      
      return response;
    } catch (error) {
      this.logger.error('Error fetching Facebook analytics:', error);
      throw error;
    }
  }

  async getFollowers() {
    try {
      this.logger.info('Fetching Facebook followers');
      
      const response = await FB.api(
        `/${this.pageId}`,
        'get',
        {
          fields: 'fan_count,followers_count,name'
        }
      );
      
      return response;
    } catch (error) {
      this.logger.error('Error fetching Facebook followers:', error);
      throw error;
    }
  }

  async getPageInfo() {
    try {
      const response = await FB.api(
        `/${this.pageId}`,
        'get',
        {
          fields: 'id,name,about,category,description,fan_count,followers_count,website'
        }
      );
      
      return response;
    } catch (error) {
      this.logger.error('Error fetching page info:', error);
      throw error;
    }
  }
}

module.exports = FacebookService;
