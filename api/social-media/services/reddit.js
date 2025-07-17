/**
 * Reddit Service
 * Handles Reddit API interactions
 */

const snoowrap = require('snoowrap');

class RedditService {
  constructor(logger) {
    this.logger = logger;
    
    // Initialize Reddit client
    this.reddit = new snoowrap({
      userAgent: process.env.REDDIT_USER_AGENT || 'Tiation Social Media Bot/1.0',
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      refreshToken: process.env.REDDIT_REFRESH_TOKEN
    });
  }

  async post(content, media, schedule) {
    try {
      this.logger.info('Posting to Reddit:', content);
      
      const { subreddit, title, text, url } = content;
      
      if (!subreddit || !title) {
        throw new Error('Subreddit and title are required for Reddit posts');
      }
      
      let submission;
      
      if (url || media?.imageUrl) {
        // Link post
        submission = await this.reddit.getSubreddit(subreddit).submitLink({
          title: title,
          url: url || media.imageUrl
        });
      } else {
        // Text post
        submission = await this.reddit.getSubreddit(subreddit).submitSelfpost({
          title: title,
          text: text || ''
        });
      }
      
      return {
        id: submission.name,
        url: `https://reddit.com${submission.permalink}`,
        title: submission.title
      };
    } catch (error) {
      this.logger.error('Error posting to Reddit:', error);
      throw error;
    }
  }

  async getAnalytics(startDate, endDate) {
    try {
      this.logger.info('Fetching Reddit analytics');
      
      // Get user's recent submissions
      const user = await this.reddit.getMe();
      const submissions = await user.getSubmissions({ limit: 100 });
      
      const analytics = {
        totalPosts: 0,
        totalKarma: 0,
        totalComments: 0,
        posts: []
      };
      
      for (const submission of submissions) {
        const created = new Date(submission.created_utc * 1000);
        
        if (created >= new Date(startDate) && created <= new Date(endDate)) {
          analytics.totalPosts++;
          analytics.totalKarma += submission.score;
          analytics.totalComments += submission.num_comments;
          
          analytics.posts.push({
            title: submission.title,
            score: submission.score,
            comments: submission.num_comments,
            url: `https://reddit.com${submission.permalink}`,
            created: created
          });
        }
      }
      
      return analytics;
    } catch (error) {
      this.logger.error('Error fetching Reddit analytics:', error);
      throw error;
    }
  }

  async getFollowers() {
    try {
      this.logger.info('Fetching Reddit karma and account info');
      
      const user = await this.reddit.getMe();
      const info = await user.fetch();
      
      return {
        username: info.name,
        linkKarma: info.link_karma,
        commentKarma: info.comment_karma,
        totalKarma: info.total_karma,
        accountAge: new Date(info.created_utc * 1000),
        hasVerifiedEmail: info.has_verified_email,
        isMod: info.is_mod
      };
    } catch (error) {
      this.logger.error('Error fetching Reddit account info:', error);
      throw error;
    }
  }

  async getSubredditInfo(subredditName) {
    try {
      const subreddit = await this.reddit.getSubreddit(subredditName).fetch();
      
      return {
        name: subreddit.display_name,
        subscribers: subreddit.subscribers,
        description: subreddit.public_description,
        created: new Date(subreddit.created_utc * 1000),
        isNSFW: subreddit.over18
      };
    } catch (error) {
      this.logger.error('Error fetching subreddit info:', error);
      throw error;
    }
  }

  async searchSubreddits(query, limit = 10) {
    try {
      const results = await this.reddit.searchSubreddits({
        query: query,
        limit: limit
      });
      
      return results.map(sub => ({
        name: sub.display_name,
        subscribers: sub.subscribers,
        description: sub.public_description
      }));
    } catch (error) {
      this.logger.error('Error searching subreddits:', error);
      throw error;
    }
  }
}

module.exports = RedditService;
