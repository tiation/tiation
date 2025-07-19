#!/usr/bin/env node

/**
 * CLI Social Media Poster
 * Simple command-line tool to post content to social media
 */

const https = require('https');
const querystring = require('querystring');
const crypto = require('crypto');
require('dotenv').config();

class CLIPoster {
  constructor() {
    this.twitterConfig = {
      apiKey: process.env.TWITTER_API_KEY,
      apiSecret: process.env.TWITTER_API_SECRET_KEY,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    };
  }

  // OAuth 1.0a signature generation
  generateSignature(method, url, params, tokenSecret = '') {
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    const signatureBase = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(paramString)}`;
    const signingKey = `${encodeURIComponent(this.twitterConfig.apiSecret)}&${encodeURIComponent(tokenSecret)}`;
    
    return crypto.createHmac('sha1', signingKey).update(signatureBase).digest('base64');
  }

  // Post tweet using raw HTTP
  async postTweet(text) {
    return new Promise((resolve, reject) => {
      const url = 'https://api.twitter.com/2/tweets';
      
      // OAuth parameters
      const oauth = {
        oauth_consumer_key: this.twitterConfig.apiKey,
        oauth_nonce: crypto.randomBytes(16).toString('hex'),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_token: this.twitterConfig.accessToken,
        oauth_version: '1.0'
      };

      // Add signature
      const params = { ...oauth };
      oauth.oauth_signature = this.generateSignature('POST', url, params, this.twitterConfig.accessSecret);

      // Create authorization header
      const authHeader = 'OAuth ' + Object.keys(oauth)
        .map(key => `${key}="${encodeURIComponent(oauth[key])}"`)
        .join(', ');

      const postData = JSON.stringify({ text });

      const options = {
        hostname: 'api.twitter.com',
        port: 443,
        path: '/2/tweets',
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (res.statusCode === 201) {
              resolve(result);
            } else {
              reject(new Error(`Twitter API error: ${result.detail || result.title || data}`));
            }
          } catch (err) {
            reject(new Error(`Failed to parse response: ${data}`));
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.write(postData);
      req.end();
    });
  }

  async postToFacebook(text) {
    return new Promise((resolve, reject) => {
      const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
      const pageId = process.env.FACEBOOK_PAGE_ID;
      
      if (!accessToken || !pageId) {
        reject(new Error('Facebook credentials not configured'));
        return;
      }

      const postData = querystring.stringify({
        message: text,
        access_token: accessToken
      });

      const options = {
        hostname: 'graph.facebook.com',
        port: 443,
        path: `/${pageId}/feed`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.id) {
              resolve(result);
            } else {
              reject(new Error(`Facebook API error: ${result.error?.message || data}`));
            }
          } catch (err) {
            reject(new Error(`Failed to parse response: ${data}`));
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.write(postData);
      req.end();
    });
  }
}

// Tiation content
const twitterPosts = [
  '🚀 Introducing Tiation - where innovation meets integration! Our unified platform brings all your digital tools together in one seamless experience. #Tiation #TechInnovation #DigitalTransformation',
  '💡 Why juggle multiple platforms when you can have it all in one place? Tiation combines social media management, analytics, automation, and more. The future of digital efficiency is here! #Productivity',
  '🌟 At Tiation, we believe technology should empower, not overwhelm. That\'s why we\'ve created a platform that simplifies complexity while amplifying your impact. Join the revolution! #Innovation',
  '🔥 Ready to transform how you work? Tiation offers AI-powered insights, unified dashboards, and seamless integrations. Experience the difference today! #AI #Analytics #Transformation'
];

const facebookPost = `🎉 Exciting news! Tiation is revolutionizing how businesses manage their digital presence. 

Our all-in-one platform combines:
✅ Social media management
✅ Real-time analytics  
✅ AI-powered automation
✅ Unified dashboard
✅ Privacy-first approach

Join thousands of innovators already using Tiation to streamline their digital workflows and amplify their impact.

Ready to experience the future of digital tools? Visit tiation.com today!

#Tiation #DigitalInnovation #BusinessTools #SocialMediaManagement #Analytics #Automation`;

async function main() {
  const poster = new CLIPoster();
  const args = process.argv.slice(2);
  const command = args[0];

  console.log('🚀 Tiation CLI Social Media Poster');
  console.log('==================================');

  try {
    switch (command) {
      case 'twitter':
        console.log('📱 Posting to Twitter...');
        for (let i = 0; i < twitterPosts.length; i++) {
          console.log(`\n📝 Posting tweet ${i + 1}/4...`);
          console.log(`Content: ${twitterPosts[i].substring(0, 80)}...`);
          
          try {
            const result = await poster.postTweet(twitterPosts[i]);
            console.log(`✅ Tweet ${i + 1} posted successfully! ID: ${result.data.id}`);
            
            // Wait between posts to avoid rate limiting
            if (i < twitterPosts.length - 1) {
              console.log('⏳ Waiting 30 seconds before next post...');
              await new Promise(resolve => setTimeout(resolve, 30000));
            }
          } catch (error) {
            console.log(`❌ Tweet ${i + 1} failed: ${error.message}`);
          }
        }
        break;

      case 'facebook':
        console.log('📘 Posting to Facebook...');
        try {
          const result = await poster.postToFacebook(facebookPost);
          console.log(`✅ Facebook post successful! ID: ${result.id}`);
        } catch (error) {
          console.log(`❌ Facebook post failed: ${error.message}`);
        }
        break;

      case 'all':
        console.log('📱 Posting to all platforms...');
        
        // Post to Twitter first
        for (let i = 0; i < twitterPosts.length; i++) {
          console.log(`\n📝 Posting tweet ${i + 1}/4...`);
          try {
            const result = await poster.postTweet(twitterPosts[i]);
            console.log(`✅ Tweet ${i + 1} posted! ID: ${result.data.id}`);
            await new Promise(resolve => setTimeout(resolve, 30000));
          } catch (error) {
            console.log(`❌ Tweet ${i + 1} failed: ${error.message}`);
          }
        }

        // Then post to Facebook
        console.log('\n📘 Posting to Facebook...');
        try {
          const result = await poster.postToFacebook(facebookPost);
          console.log(`✅ Facebook post successful! ID: ${result.id}`);
        } catch (error) {
          console.log(`❌ Facebook post failed: ${error.message}`);
        }
        break;

      case 'test':
        console.log('🧪 Testing connections...');
        
        // Test Twitter
        try {
          console.log('Testing Twitter API...');
          const result = await poster.postTweet('🧪 Test post from Tiation CLI - please ignore');
          console.log('✅ Twitter connection successful!');
          console.log('Note: Test post created, you may want to delete it');
        } catch (error) {
          console.log(`❌ Twitter test failed: ${error.message}`);
        }
        break;

      default:
        console.log('📋 Usage:');
        console.log('  node cli-poster.js twitter   # Post to Twitter');
        console.log('  node cli-poster.js facebook  # Post to Facebook');
        console.log('  node cli-poster.js all       # Post to all platforms');
        console.log('  node cli-poster.js test      # Test connections');
        console.log('');
        console.log('📝 Content preview:');
        console.log('Twitter posts:', twitterPosts.length);
        console.log('Facebook posts: 1');
        break;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { CLIPoster };