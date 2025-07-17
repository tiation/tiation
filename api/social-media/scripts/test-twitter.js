/**
 * Simple Twitter Test Script
 * Tests the Twitter API connection and posts a test tweet
 */

require('dotenv').config({ path: '../../../.env' });
const { TwitterApi } = require('twitter-api-v2');

async function testTwitter() {
  console.log('🐦 Testing Twitter API Connection...\n');
  
  try {
    // Create Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET_KEY,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    // Test authentication by getting user info
    console.log('1️⃣ Testing authentication...');
    const me = await client.v2.me();
    console.log(`✅ Connected as @${me.data.username} (${me.data.name})`);
    console.log(`   ID: ${me.data.id}`);
    console.log('');

    // Post a simple tweet
    console.log('2️⃣ Posting test tweet...');
    const tweet = await client.v2.tweet(
      '🚀 Testing Tiation Twitter integration! This is an automated test post. #Tiation #Testing'
    );
    
    console.log('✅ Tweet posted successfully!');
    console.log(`   Tweet ID: ${tweet.data.id}`);
    console.log(`   View at: https://twitter.com/${me.data.username}/status/${tweet.data.id}`);
    console.log('');

    // Get the tweet back to verify
    console.log('3️⃣ Verifying tweet...');
    const verifyTweet = await client.v2.singleTweet(tweet.data.id);
    console.log(`✅ Tweet verified: "${verifyTweet.data.text}"`);
    console.log('');

    console.log('🎉 All tests passed! Twitter API is working correctly.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 401) {
      console.error('\n⚠️  Authentication failed. Please check your API credentials.');
    } else if (error.code === 403) {
      console.error('\n⚠️  Access forbidden. Make sure your app has read/write permissions.');
    } else if (error.code === 429) {
      console.error('\n⚠️  Rate limit exceeded. Please wait a few minutes and try again.');
    }
    
    console.error('\nFull error:', error);
  }
}

// Run the test
testTwitter();
