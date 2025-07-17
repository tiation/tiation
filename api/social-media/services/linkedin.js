/**
 * LinkedIn Service
 * Handles LinkedIn API interactions
 */

const axios = require('axios');

class LinkedInService {
  constructor(logger) {
    this.logger = logger;
    this.accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    this.organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
    this.apiUrl = 'https://api.linkedin.com/v2';
  }

  async post(content, media, schedule) {
    try {
      this.logger.info('Posting to LinkedIn:', content);
      
      const author = this.organizationId 
        ? `urn:li:organization:${this.organizationId}`
        : `urn:li:person:${await this.getPersonId()}`;
      
      const postData = {
        author: author,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: media ? 'IMAGE' : 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      };
      
      if (media?.imageUrl) {
        // First, register the image
        const uploadResponse = await this.registerUpload();
        // Then upload the image
        await this.uploadImage(uploadResponse.value.uploadMechanism, media.imageUrl);
        // Add media to post
        postData.specificContent['com.linkedin.ugc.ShareContent'].media = [{
          status: 'READY',
          media: uploadResponse.value.asset
        }];
      }
      
      const response = await axios.post(
        `${this.apiUrl}/ugcPosts`,
        postData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      this.logger.error('Error posting to LinkedIn:', error);
      throw error;
    }
  }

  async getPersonId() {
    try {
      const response = await axios.get(
        `${this.apiUrl}/me`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      return response.data.id;
    } catch (error) {
      this.logger.error('Error getting person ID:', error);
      throw error;
    }
  }

  async registerUpload() {
    try {
      const registerData = {
        registerUploadRequest: {
          recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
          owner: this.organizationId 
            ? `urn:li:organization:${this.organizationId}`
            : `urn:li:person:${await this.getPersonId()}`,
          serviceRelationships: [{
            relationshipType: 'OWNER',
            identifier: 'urn:li:userGeneratedContent'
          }]
        }
      };
      
      const response = await axios.post(
        `${this.apiUrl}/assets?action=registerUpload`,
        registerData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      this.logger.error('Error registering upload:', error);
      throw error;
    }
  }

  async uploadImage(uploadMechanism, imageUrl) {
    // Implementation would depend on image source
    // This is a placeholder
    this.logger.info('Uploading image to LinkedIn');
  }

  async getAnalytics(startDate, endDate) {
    try {
      this.logger.info('Fetching LinkedIn analytics');
      
      const response = await axios.get(
        `${this.apiUrl}/organizationalEntityShareStatistics`,
        {
          params: {
            q: 'organizationalEntity',
            organizationalEntity: `urn:li:organization:${this.organizationId}`,
            timeIntervals: `(timeRange:(start:${new Date(startDate).getTime()},end:${new Date(endDate).getTime()}))`
          },
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching LinkedIn analytics:', error);
      throw error;
    }
  }

  async getFollowers() {
    try {
      this.logger.info('Fetching LinkedIn followers');
      
      const response = await axios.get(
        `${this.apiUrl}/networkSizes/${this.organizationId}`,
        {
          params: {
            edgeType: 'CompanyFollowedByMember'
          },
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching LinkedIn followers:', error);
      throw error;
    }
  }
}

module.exports = LinkedInService;
