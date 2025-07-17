/**
 * Twitter Read-Only Test Script
 * Tests Twitter API connection with read-only operations
 */

require('dotenv').config({ path: '../../../.env' });
const { TwitterApi } = require('twitter-api-v2');

async function testTwitterReadOnly() {
  console.log('🐦 Testing Twitter API Connection (Read-Only)...\n');
  
  try {
    // Create Twitter client
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET_KEY,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    // Test 1: Get authenticated user info
    console.log('1️⃣ Getting user information...');
    const me = await client.v2.me({
      'user.fields': ['created_at', 'description', 'public_metrics', 'verified']
    });
    
    console.log(`✅ Connected as @${me.data.username} (${me.data.name})`);
    console.log(`   ID: ${me.data.id}`);
    console.log(`   Bio: ${me.data.description || 'No bio set'}`);
    console.log(`   Account created: ${me.data.created_at}`);
    console.log(`   Metrics:`, me.data.public_metrics);
    console.log('');

    // Test 2: Get user's timeline
    console.log('2️⃣ Getting recent tweets...');
    const timeline = await client.v2.userTimeline(me.data.id, {
      max_results: 5,
      'tweet.fields': ['created_at', 'public_metrics']
    });

    const tweets = timeline.data?.data || [];
    console.log(`✅ Found ${tweets.length} recent tweets:`);
    
    tweets.forEach((tweet, index) => {
      console.log(`\n   Tweet ${index + 1}:`);
      console.log(`   "${tweet.text.substring(0, 100)}${tweet.text.length > 100 ? '...' : ''}"`);
      console.log(`   Posted: ${tweet.created_at}`);
      console.log(`   Metrics:`, tweet.public_metrics);
    });
    
    if (tweets.length === 0) {
      console.log('   No tweets found. This is normal for a new account.');
    }
    console.log('');

    // Test 3: Search for tweets about Tiation
    console.log('3️⃣ Searching for tweets about #Tiation...');
    const searchResults = await client.v2.search('#Tiation', {
      max_results: 10,
      'tweet.fields': ['author_id', 'created_at']
    });

    const searchTweets = searchResults.data?.data || [];
    console.log(`✅ Found ${searchTweets.length} tweets with #Tiation`);
    
    if (searchTweets.length === 0) {
      console.log('   No tweets found yet. Once you start posting, they will appear here!');
    }
    console.log('');

    // Current permissions
    console.log('📋 Current API Access Level: READ-ONLY');
    console.log('   ⚠️  To post tweets, you need to update your app permissions to "Read and Write"');
    console.log('');
    
    console.log('🎉 Read-only tests passed! Your Twitter API connection is working.');
    console.log('\n📝 Next Steps:');
    console.log('1. Go to https://developer.twitter.com/en/portal/dashboard');
    console.log('2. Select your app');
    console.log('3. Update permissions to "Read and Write"');
    console.log('4. Regenerate your access tokens');
    console.log('5. Update the tokens in your .env file');
    console.log('6. Run the posting scripts again');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nFull error:', error);
  }
}

// Run the test
testTwitterReadOnly();
