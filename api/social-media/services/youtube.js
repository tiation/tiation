/**
 * YouTube Service
 * Handles YouTube API interactions
 */

const { google } = require('googleapis');

class YouTubeService {
  constructor(logger) {
    this.logger = logger;
    
    // Initialize OAuth2 client
    this.oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      'http://localhost:3000/youtube/callback'
    );
    
    this.oauth2Client.setCredentials({
      access_token: process.env.YOUTUBE_ACCESS_TOKEN,
      refresh_token: process.env.YOUTUBE_REFRESH_TOKEN
    });
    
    // Initialize YouTube API
    this.youtube = google.youtube({
      version: 'v3',
      auth: this.oauth2Client
    });
  }

  async post(content, media, schedule) {
    try {
      this.logger.info('Posting to YouTube:', content);
      
      if (!media?.videoPath) {
        throw new Error('Video path is required for YouTube posts');
      }
      
      // For video uploads
      const response = await this.youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title: content.title || 'Tiation Video',
            description: content.description || content,
            tags: content.tags || ['tiation'],
            categoryId: '22' // People & Blogs
          },
          status: {
            privacyStatus: schedule ? 'private' : 'public',
            publishAt: schedule ? new Date(schedule).toISOString() : undefined
          }
        },
        media: {
          body: media.videoStream // Would need to create a stream from video file
        }
      });
      
      return response.data;
    } catch (error) {
      this.logger.error('Error posting to YouTube:', error);
      throw error;
    }
  }

  async getAnalytics(startDate, endDate) {
    try {
      this.logger.info('Fetching YouTube analytics');
      
      const response = await this.youtube.reports.query({
        ids: 'channel==MINE',
        startDate: startDate,
        endDate: endDate,
        metrics: 'views,likes,comments,shares,estimatedMinutesWatched,subscribersGained',
        dimensions: 'day'
      });
      
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching YouTube analytics:', error);
      throw error;
    }
  }

  async getFollowers() {
    try {
      this.logger.info('Fetching YouTube subscribers');
      
      const response = await this.youtube.channels.list({
        part: ['statistics'],
        mine: true
      });
      
      if (response.data.items && response.data.items.length > 0) {
        return {
          subscriberCount: response.data.items[0].statistics.subscriberCount,
          viewCount: response.data.items[0].statistics.viewCount,
          videoCount: response.data.items[0].statistics.videoCount
        };
      }
      
      return { subscriberCount: 0, viewCount: 0, videoCount: 0 };
    } catch (error) {
      this.logger.error('Error fetching YouTube followers:', error);
      throw error;
    }
  }

  async getChannelInfo() {
    try {
      const response = await this.youtube.channels.list({
        part: ['snippet', 'statistics', 'brandingSettings'],
        mine: true
      });
      
      return response.data.items[0];
    } catch (error) {
      this.logger.error('Error fetching channel info:', error);
      throw error;
    }
  }

  async getVideos(maxResults = 10) {
    try {
      const response = await this.youtube.search.list({
        part: ['snippet'],
        forMine: true,
        maxResults: maxResults,
        type: 'video'
      });
      
      return response.data.items;
    } catch (error) {
      this.logger.error('Error fetching videos:', error);
      throw error;
    }
  }
}

module.exports = YouTubeService;
