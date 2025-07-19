#!/usr/bin/env node

/**
 * Quick API Setup Tool
 * Helps obtain social media API credentials programmatically where possible
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const https = require('https');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ENV_FILE = '.env';

// Utility functions
const question = (query) => new Promise(resolve => rl.question(query, resolve));

const updateEnvFile = (key, value) => {
  let envContent = '';
  
  if (fs.existsSync(ENV_FILE)) {
    envContent = fs.readFileSync(ENV_FILE, 'utf8');
  }
  
  const lines = envContent.split('\n');
  const keyExists = lines.findIndex(line => line.startsWith(`${key}=`));
  
  if (keyExists !== -1) {
    lines[keyExists] = `${key}=${value}`;
  } else {
    lines.push(`${key}=${value}`);
  }
  
  fs.writeFileSync(ENV_FILE, lines.join('\n'));
};

const testTwitterConnection = async (credentials) => {
  return new Promise((resolve) => {
    try {
      const { TwitterApi } = require('twitter-api-v2');
      const client = new TwitterApi(credentials);
      
      client.v2.me()
        .then(user => resolve({ success: true, username: user.data.username }))
        .catch(err => resolve({ success: false, error: err.message }));
    } catch (err) {
      resolve({ success: false, error: 'twitter-api-v2 package not installed' });
    }
  });
};

const testFacebookConnection = async (accessToken, pageId) => {
  return new Promise((resolve) => {
    const url = `https://graph.facebook.com/${pageId}?fields=name,fan_count&access_token=${accessToken}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            resolve({ success: false, error: parsed.error.message });
          } else {
            resolve({ success: true, name: parsed.name, followers: parsed.fan_count });
          }
        } catch (err) {
          resolve({ success: false, error: 'Invalid response' });
        }
      });
    }).on('error', err => resolve({ success: false, error: err.message }));
  });
};

async function main() {
  console.log('🚀 Quick Social Media API Setup');
  console.log('================================');
  console.log('');
  
  // Platform selection
  console.log('Select platforms to configure:');
  console.log('1. Twitter/X');
  console.log('2. Facebook');  
  console.log('3. Instagram (via Facebook)');
  console.log('4. LinkedIn');
  console.log('5. All platforms');
  console.log('');
  
  const choice = await question('Enter your choice (1-5): ');
  console.log('');
  
  // Twitter/X Setup
  if (['1', '5'].includes(choice)) {
    console.log('🐦 TWITTER/X SETUP');
    console.log('==================');
    console.log('You need to:');
    console.log('1. Visit https://developer.twitter.com/en/portal/dashboard');
    console.log('2. Create a new app or use existing');
    console.log('3. Generate API keys under "Keys and tokens"');
    console.log('');
    
    const twitterSetup = await question('Do you have Twitter API credentials? (y/n): ');
    
    if (twitterSetup.toLowerCase() === 'y') {
      const apiKey = await question('API Key: ');
      const apiSecret = await question('API Secret Key: ');
      const accessToken = await question('Access Token: ');
      const accessSecret = await question('Access Token Secret: ');
      
      if (apiKey && apiSecret && accessToken && accessSecret) {
        // Save credentials
        updateEnvFile('TWITTER_API_KEY', apiKey);
        updateEnvFile('TWITTER_API_SECRET_KEY', apiSecret);
        updateEnvFile('TWITTER_ACCESS_TOKEN', accessToken);
        updateEnvFile('TWITTER_ACCESS_TOKEN_SECRET', accessSecret);
        
        // Test connection
        console.log('🧪 Testing Twitter connection...');
        const result = await testTwitterConnection({
          appKey: apiKey,
          appSecret: apiSecret,
          accessToken,
          accessSecret
        });
        
        if (result.success) {
          console.log(`✅ Twitter connected as @${result.username}`);
        } else {
          console.log(`❌ Twitter connection failed: ${result.error}`);
        }
      }
    } else {
      console.log('📝 To get Twitter API credentials:');
      console.log('   curl -X GET "https://api.twitter.com/oauth/request_token" # (requires setup)');
      console.log('   Or visit: https://developer.twitter.com/en/portal/dashboard');
    }
    console.log('');
  }
  
  // Facebook Setup
  if (['2', '3', '5'].includes(choice)) {
    console.log('📘 FACEBOOK SETUP');
    console.log('=================');
    console.log('You need to:');
    console.log('1. Visit https://developers.facebook.com/');
    console.log('2. Create a new app');
    console.log('3. Add "Facebook Login" and "Pages API" products');
    console.log('4. Generate Page Access Token');
    console.log('');
    
    const facebookSetup = await question('Do you have Facebook API credentials? (y/n): ');
    
    if (facebookSetup.toLowerCase() === 'y') {
      const appId = await question('App ID: ');
      const appSecret = await question('App Secret: ');
      const accessToken = await question('Page Access Token: ');
      const pageId = await question('Page ID: ');
      
      if (appId && appSecret && accessToken && pageId) {
        // Save credentials
        updateEnvFile('FACEBOOK_APP_ID', appId);
        updateEnvFile('FACEBOOK_APP_SECRET', appSecret);
        updateEnvFile('FACEBOOK_ACCESS_TOKEN', accessToken);
        updateEnvFile('FACEBOOK_PAGE_ID', pageId);
        
        // Test connection
        console.log('🧪 Testing Facebook connection...');
        const result = await testFacebookConnection(accessToken, pageId);
        
        if (result.success) {
          console.log(`✅ Facebook connected to: ${result.name}`);
          console.log(`📊 Page followers: ${result.followers}`);
        } else {
          console.log(`❌ Facebook connection failed: ${result.error}`);
        }
      }
    } else {
      console.log('📝 Facebook requires web-based OAuth setup');
      console.log('   Visit: https://developers.facebook.com/tools/explorer/');
    }
    console.log('');
  }
  
  // LinkedIn Setup
  if (['4', '5'].includes(choice)) {
    console.log('💼 LINKEDIN SETUP');
    console.log('=================');
    console.log('You need to:');
    console.log('1. Visit https://www.linkedin.com/developers/');
    console.log('2. Create a new app');
    console.log('3. Add required products (Marketing API)');
    console.log('4. Generate access tokens');
    console.log('');
    
    const linkedinSetup = await question('Do you have LinkedIn API credentials? (y/n): ');
    
    if (linkedinSetup.toLowerCase() === 'y') {
      const clientId = await question('Client ID: ');
      const clientSecret = await question('Client Secret: ');
      const accessToken = await question('Access Token: ');
      const orgId = await question('Organization ID (optional): ');
      
      if (clientId && clientSecret && accessToken) {
        updateEnvFile('LINKEDIN_CLIENT_ID', clientId);
        updateEnvFile('LINKEDIN_CLIENT_SECRET', clientSecret);
        updateEnvFile('LINKEDIN_ACCESS_TOKEN', accessToken);
        if (orgId) updateEnvFile('LINKEDIN_ORGANIZATION_ID', orgId);
        
        console.log('✅ LinkedIn credentials saved');
      }
    }
    console.log('');
  }
  
  // Final summary
  console.log('🎉 Setup Complete!');
  console.log('==================');
  console.log(`📁 Credentials saved to: ${path.resolve(ENV_FILE)}`);
  console.log('');
  console.log('🚀 Next steps:');
  console.log('1. Run: node scripts/test-twitter.js');
  console.log('2. Run: node scripts/twitter-content-manager.js');
  console.log('3. Start posting content!');
  console.log('');
  
  rl.close();
}

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n👋 Setup cancelled');
  rl.close();
  process.exit(0);
});

// Run the setup
main().catch(console.error);