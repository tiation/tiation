/**
 * Scheduler Utility
 * Handles scheduled posts and automated tasks
 */

const cron = require('node-cron');

class Scheduler {
  constructor() {
    this.jobs = new Map();
  }

  /**
   * Start scheduled jobs
   */
  startJobs(services, logger) {
    logger.info('Starting scheduled jobs');

    // Daily analytics collection at 2 AM
    this.addJob('daily-analytics', '0 2 * * *', async () => {
      logger.info('Running daily analytics collection');
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const startDate = yesterday.toISOString().split('T')[0];
      const endDate = startDate;

      for (const [platform, service] of Object.entries(services)) {
        try {
          const analytics = await service.getAnalytics(startDate, endDate);
          logger.info(`${platform} analytics:`, analytics);
        } catch (error) {
          logger.error(`Error fetching ${platform} analytics:`, error);
        }
      }
    });

    // Check follower counts every 6 hours
    this.addJob('follower-check', '0 */6 * * *', async () => {
      logger.info('Checking follower counts');
      
      for (const [platform, service] of Object.entries(services)) {
        try {
          const followers = await service.getFollowers();
          logger.info(`${platform} followers:`, followers);
        } catch (error) {
          logger.error(`Error fetching ${platform} followers:`, error);
        }
      }
    });

    // Content posting schedule (example: every day at 10 AM and 3 PM)
    this.addJob('content-post-morning', '0 10 * * *', async () => {
      logger.info('Morning content posting');
      // Add your content posting logic here
    });

    this.addJob('content-post-afternoon', '0 15 * * *', async () => {
      logger.info('Afternoon content posting');
      // Add your content posting logic here
    });
  }

  /**
   * Add a scheduled job
   */
  addJob(name, schedule, task) {
    if (this.jobs.has(name)) {
      this.jobs.get(name).stop();
    }

    const job = cron.schedule(schedule, task, {
      scheduled: true,
      timezone: process.env.TIMEZONE || 'America/Los_Angeles'
    });

    this.jobs.set(name, job);
    return job;
  }

  /**
   * Remove a scheduled job
   */
  removeJob(name) {
    if (this.jobs.has(name)) {
      this.jobs.get(name).stop();
      this.jobs.delete(name);
      return true;
    }
    return false;
  }

  /**
   * Get all job names
   */
  getJobs() {
    return Array.from(this.jobs.keys());
  }

  /**
   * Stop all jobs
   */
  stopAll() {
    for (const job of this.jobs.values()) {
      job.stop();
    }
    this.jobs.clear();
  }

  /**
   * Schedule a one-time post
   */
  schedulePost(platforms, content, media, scheduleTime, services, logger) {
    const now = new Date();
    const scheduledDate = new Date(scheduleTime);
    
    if (scheduledDate <= now) {
      throw new Error('Scheduled time must be in the future');
    }

    // Calculate delay in milliseconds
    const delay = scheduledDate - now;

    setTimeout(async () => {
      logger.info('Executing scheduled post');
      
      for (const platform of platforms) {
        if (services[platform]) {
          try {
            await services[platform].post(content, media);
            logger.info(`Posted to ${platform} successfully`);
          } catch (error) {
            logger.error(`Error posting to ${platform}:`, error);
          }
        }
      }
    }, delay);

    return {
      platforms,
      content,
      scheduleTime: scheduledDate,
      status: 'scheduled'
    };
  }
}

module.exports = new Scheduler();
