#!/usr/bin/env node

/**
 * Tiation Social Media Poster
 * Automated posting to multiple social media platforms
 */

const axios = require('axios');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
require('dotenv').config();

// Configuration
const config = {
  facebook: {
    pageId: process.env.FACEBOOK_PAGE_ID,
    accessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
    apiVersion: 'v18.0'
  },
  twitter: {
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },
  linkedin: {
    accessToken: process.env.LINKEDIN_ACCESS_TOKEN,
    organizationId: process.env.LINKEDIN_ORGANIZATION_ID,
  },
  instagram: {
    accountId: process.env.INSTAGRAM_ACCOUNT_ID,
    accessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN, // Uses Facebook token
  }
};

// Sample posts with backdated content
const posts = [
  {
    date: '2024-12-01',
    content: "New beginnings at Tiation! We're not just dreaming of change—we're coding it. Join us as we build systems that work for people, not the other way around. #SystemsChange #TechForGood",
    platforms: ['facebook', 'twitter', 'linkedin']
  },
  {
    date: '2025-01-15',
    content: "Introducing our 12 Acts of Systemic Redesign—a comprehensive framework for reimagining how society works. From economic reform to community support, we're tackling it all. #SystemicReform #SocialInnovation",
    platforms: ['facebook', 'twitter', 'linkedin']
  },
  {
    date: '2025-02-01',
    content: "Born from personal loss, the Grief-to-Design methodology transforms tragedy into tangible change. Because no one should walk this path alone. Let's build systems worthy of us all. #GriefToDesign #CompassionInAction",
    platforms: ['facebook', 'twitter', 'linkedin']
  },
  {
    date: '2025-03-01',
    content: "Our founder @TiaAstor believes: 'People are good. Systems are broken. We can fix the systems.' This isn't just a motto—it's our mission. Join the movement. #PeopleFirst #SystemsThinking",
    platforms: ['facebook', 'twitter', 'linkedin']
  },
  {
    date: '2025-04-01',
    content: "🚀 The $19 Trillion Solution: Australia already has the wealth to eliminate poverty and provide universal basic income. We've done the math. Now let's make it happen. Read more: github.com/tiation #19TrillionSolution #AbundanceEconomics",
    platforms: ['facebook', 'twitter', 'linkedin']
  },
  {
    date: '2025-04-15',
    content: "What if we designed systems assuming abundance instead of scarcity? What if we built with compassion instead of control? At Tiation, we're proving it's possible. #AbundanceByDesign #SystemsChange",
    platforms: ['facebook', 'twitter', 'linkedin']
  },
  {
    date: '2025-05-01',
    content: "Technology update: Our open-source platforms are live! From community resource sharing to policy frameworks, everything we build is free for anyone to use and improve. #OpenSource #TechForGood",
    platforms: ['facebook', 'twitter', 'linkedin']
  }
];

// Facebook Graph API posting
async function postToFacebook(message, scheduledTime = null) {
  const url = `https://graph.facebook.com/${config.facebook.apiVersion}/${config.facebook.pageId}/feed`;
  
  const params = {
    message: message,
    access_token: config.facebook.accessToken
  };
  
  // Add scheduled publish time if provided
  if (scheduledTime) {
    params.published = false;
    params.scheduled_publish_time = Math.floor(new Date(scheduledTime).getTime() / 1000);
  }
  
  try {
    const response = await axios.post(url, params);
    console.log(`✅ Posted to Facebook: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Facebook error:', error.response?.data || error.message);
    throw error;
  }
}

// Twitter API v2 posting
async function postToTwitter(text) {
  const oauth = OAuth({
    consumer: {
      key: config.twitter.apiKey,
      secret: config.twitter.apiSecret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64');
    },
  });

  const request_data = {
    url: 'https://api.twitter.com/2/tweets',
    method: 'POST',
    data: { text },
  };

  const token = {
    key: config.twitter.accessToken,
    secret: config.twitter.accessTokenSecret,
  };

  try {
    const response = await axios({
      url: request_data.url,
      method: request_data.method,
      data: request_data.data,
      headers: {
        ...oauth.toHeader(oauth.authorize(request_data, token)),
        'Content-Type': 'application/json',
      },
    });
    
    console.log(`✅ Posted to Twitter: ${response.data.data.id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Twitter error:', error.response?.data || error.message);
    throw error;
  }
}

// LinkedIn API posting
async function postToLinkedIn(text) {
  const url = 'https://api.linkedin.com/v2/ugcPosts';
  
  const postData = {
    author: `urn:li:organization:${config.linkedin.organizationId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: text
        },
        shareMediaCategory: 'NONE'
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  };
  
  try {
    const response = await axios.post(url, postData, {
      headers: {
        'Authorization': `Bearer ${config.linkedin.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log(`✅ Posted to LinkedIn: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('❌ LinkedIn error:', error.response?.data || error.message);
    throw error;
  }
}

// Instagram posting (requires media)
async function postToInstagram(caption, imageUrl) {
  // Step 1: Create media container
  const createUrl = `https://graph.facebook.com/${config.facebook.apiVersion}/${config.instagram.accountId}/media`;
  
  try {
    const createResponse = await axios.post(createUrl, {
      image_url: imageUrl,
      caption: caption,
      access_token: config.instagram.accessToken
    });
    
    const creationId = createResponse.data.id;
    
    // Step 2: Publish the media
    const publishUrl = `https://graph.facebook.com/${config.facebook.apiVersion}/${config.instagram.accountId}/media_publish`;
    
    const publishResponse = await axios.post(publishUrl, {
      creation_id: creationId,
      access_token: config.instagram.accessToken
    });
    
    console.log(`✅ Posted to Instagram: ${publishResponse.data.id}`);
    return publishResponse.data;
  } catch (error) {
    console.error('❌ Instagram error:', error.response?.data || error.message);
    throw error;
  }
}

// Main posting function
async function postToAllPlatforms(post) {
  console.log(`\n📅 Posting content from ${post.date}:`);
  console.log(`📝 "${post.content.substring(0, 50)}..."`);
  console.log('🎯 Platforms:', post.platforms.join(', '));
  
  const results = {};
  
  for (const platform of post.platforms) {
    try {
      switch (platform) {
        case 'facebook':
          results.facebook = await postToFacebook(post.content);
          break;
        case 'twitter':
          results.twitter = await postToTwitter(post.content);
          break;
        case 'linkedin':
          results.linkedin = await postToLinkedIn(post.content);
          break;
        case 'instagram':
          // Instagram requires an image URL
          console.log('⚠️  Instagram requires an image. Skipping for now.');
          break;
      }
    } catch (error) {
      console.error(`Failed to post to ${platform}:`, error.message);
    }
  }
  
  return results;
}

// Check environment variables
function checkConfig() {
  const required = {
    facebook: ['FACEBOOK_PAGE_ID', 'FACEBOOK_PAGE_ACCESS_TOKEN'],
    twitter: ['TWITTER_API_KEY', 'TWITTER_API_SECRET', 'TWITTER_ACCESS_TOKEN', 'TWITTER_ACCESS_TOKEN_SECRET'],
    linkedin: ['LINKEDIN_ACCESS_TOKEN', 'LINKEDIN_ORGANIZATION_ID'],
  };
  
  const missing = [];
  
  for (const [platform, vars] of Object.entries(required)) {
    for (const varName of vars) {
      if (!process.env[varName]) {
        missing.push(`${varName} (${platform})`);
      }
    }
  }
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.error('\nPlease set these in your .env file');
    return false;
  }
  
  return true;
}

// Main execution
async function main() {
  console.log('🌟 Tiation Social Media Poster');
  console.log('==============================\n');
  
  if (!checkConfig()) {
    process.exit(1);
  }
  
  // Check command line arguments
  const args = process.argv.slice(2);
  
  if (args.includes('--test')) {
    console.log('🧪 Test mode - posting single test message');
    const testPost = {
      date: new Date().toISOString().split('T')[0],
      content: "Test post from Tiation automated system. Building systems that serve humanity. #TestPost",
      platforms: ['facebook', 'twitter']
    };
    await postToAllPlatforms(testPost);
  } else if (args.includes('--backdate')) {
    console.log('📅 Posting backdated content...\n');
    for (const post of posts) {
      await postToAllPlatforms(post);
      // Wait 2 seconds between posts to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } else {
    console.log('Usage:');
    console.log('  node social-media-poster.js --test      Post a test message');
    console.log('  node social-media-poster.js --backdate  Post all backdated content');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  postToFacebook,
  postToTwitter,
  postToLinkedIn,
  postToInstagram
};
