/**
 * Analytics Utility
 * Aggregates and analyzes social media metrics
 */

class Analytics {
  constructor() {
    this.metrics = {};
  }

  /**
   * Track a social media event
   */
  trackEvent(platform, eventType, data) {
    if (!this.metrics[platform]) {
      this.metrics[platform] = {
        posts: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        impressions: 0,
        followers: 0,
        engagement: 0
      };
    }

    switch (eventType) {
      case 'post':
        this.metrics[platform].posts++;
        break;
      case 'like':
        this.metrics[platform].likes += data.count || 1;
        break;
      case 'comment':
        this.metrics[platform].comments += data.count || 1;
        break;
      case 'share':
        this.metrics[platform].shares += data.count || 1;
        break;
      case 'impression':
        this.metrics[platform].impressions += data.count || 1;
        break;
      case 'follower':
        this.metrics[platform].followers = data.count || 0;
        break;
    }

    // Calculate engagement rate
    this.calculateEngagement(platform);
  }

  /**
   * Calculate engagement rate for a platform
   */
  calculateEngagement(platform) {
    const metrics = this.metrics[platform];
    if (metrics.impressions > 0) {
      metrics.engagement = ((metrics.likes + metrics.comments + metrics.shares) / metrics.impressions) * 100;
    }
  }

  /**
   * Get metrics for a specific platform
   */
  getPlatformMetrics(platform) {
    return this.metrics[platform] || null;
  }

  /**
   * Get all metrics
   */
  getAllMetrics() {
    return this.metrics;
  }

  /**
   * Generate analytics report
   */
  generateReport(startDate, endDate) {
    const report = {
      period: {
        start: startDate,
        end: endDate
      },
      platforms: {},
      totals: {
        posts: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        impressions: 0,
        engagement: 0
      }
    };

    for (const [platform, metrics] of Object.entries(this.metrics)) {
      report.platforms[platform] = { ...metrics };
      
      // Add to totals
      report.totals.posts += metrics.posts;
      report.totals.likes += metrics.likes;
      report.totals.comments += metrics.comments;
      report.totals.shares += metrics.shares;
      report.totals.impressions += metrics.impressions;
    }

    // Calculate total engagement
    if (report.totals.impressions > 0) {
      report.totals.engagement = (
        (report.totals.likes + report.totals.comments + report.totals.shares) / 
        report.totals.impressions
      ) * 100;
    }

    return report;
  }

  /**
   * Reset metrics
   */
  reset() {
    this.metrics = {};
  }
}

module.exports = new Analytics();
