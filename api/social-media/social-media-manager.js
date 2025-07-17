#!/usr/bin/env node

/**
 * Tiation Social Media Manager
 * Central hub for managing all social media platforms
 */

const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '../../.env' });

// Import Twitter bot
const twitterBot = require('./twitter-bot');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function for user input
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// ASCII Art Banner
function showBanner() {
  console.clear();
  console.log(`
  ╔══════════════════════════════════════════════════════════╗
  ║                                                          ║
  ║     ████████╗██╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗║
  ║     ╚══██╔══╝██║██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║║
  ║        ██║   ██║███████║   ██║   ██║██║   ██║██╔██╗ ██║║
  ║        ██║   ██║██╔══██║   ██║   ██║██║   ██║██║╚██╗██║║
  ║        ██║   ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║║
  ║        ╚═╝   ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝║
  ║                                                          ║
  ║            Social Media Management Dashboard             ║
  ║                                                          ║
  ║    "People aren't broken. Systems are. We can fix them."║
  ║                                                          ║
  ╚══════════════════════════════════════════════════════════╝
  `);
}

// Platform status checker
async function checkPlatformStatus() {
  console.log('\n📊 Checking Platform Status...\n');
  
  const platforms = {
    'Twitter': !!process.env.TWITTER_API_KEY,
    'Facebook': !!process.env.FACEBOOK_APP_ID,
    'Instagram': !!process.env.INSTAGRAM_CLIENT_ID,
    'LinkedIn': !!process.env.LINKEDIN_CLIENT_ID,
    'YouTube': !!process.env.YOUTUBE_API_KEY,
    'TikTok': !!process.env.TIKTOK_CLIENT_KEY,
    'Reddit': !!process.env.REDDIT_CLIENT_ID
  };
  
  for (const [platform, hasCredentials] of Object.entries(platforms)) {
    const status = hasCredentials ? '✅ Configured' : '❌ Not configured';
    console.log(`${platform}: ${status}`);
  }
  
  console.log('\n');
}

// Twitter management menu
async function manageTwitter() {
  console.log('\n🐦 Twitter Management\n');
  console.log('1) Update profile');
  console.log('2) Post introduction thread');
  console.log('3) Post daily content');
  console.log('4) Post custom tweet');
  console.log('5) Schedule weekly content');
  console.log('6) View analytics (coming soon)');
  console.log('0) Back to main menu\n');
  
  const choice = await question('Select an option: ');
  
  switch(choice) {
    case '1':
      await twitterBot.updateProfile();
      break;
    case '2':
      await twitterBot.postThread(introThread);
      break;
    case '3':
      const dailyTweet = twitterBot.generateDailyContent();
      await twitterBot.postTweet(dailyTweet);
      break;
    case '4':
      const customContent = await question('Enter your tweet: ');
      await twitterBot.postTweet(customContent);
      break;
    case '5':
      console.log('📅 Scheduling weekly content...');
      await scheduleWeeklyContent();
      break;
    case '0':
      return;
    default:
      console.log('Invalid option');
  }
  
  await question('\nPress Enter to continue...');
}

// Content scheduler
async function scheduleWeeklyContent() {
  const schedule = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  console.log('\n📅 Weekly Content Schedule:\n');
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayName = days[date.getDay() === 0 ? 6 : date.getDay() - 1];
    const content = twitterBot.generateDailyContent();
    
    schedule.push({
      day: dayName,
      date: date.toLocaleDateString(),
      content: content
    });
    
    console.log(`${dayName} (${date.toLocaleDateString()}):`);
    console.log(content);
    console.log('---\n');
  }
  
  const confirm = await question('Post this schedule? (y/n): ');
  if (confirm.toLowerCase() === 'y') {
    // Save schedule to file
    const schedulePath = path.join(__dirname, 'weekly-schedule.json');
    fs.writeFileSync(schedulePath, JSON.stringify(schedule, null, 2));
    console.log('✅ Schedule saved to weekly-schedule.json');
  }
}

// Cross-platform posting
async function crossPost() {
  console.log('\n📢 Cross-Platform Posting\n');
  
  const message = await question('Enter your message: ');
  const platforms = [];
  
  if (process.env.TWITTER_API_KEY) {
    const postToTwitter = await question('Post to Twitter? (y/n): ');
    if (postToTwitter.toLowerCase() === 'y') platforms.push('twitter');
  }
  
  // Add other platforms as they're implemented
  
  console.log('\n🚀 Posting to selected platforms...\n');
  
  if (platforms.includes('twitter')) {
    await twitterBot.postTweet(message + '\n\n#Tiation #GriefToDesign');
  }
  
  console.log('✅ Cross-posting complete!');
}

// Analytics dashboard
async function viewAnalytics() {
  console.log('\n📊 Social Media Analytics\n');
  console.log('Coming soon: Real-time analytics across all platforms');
  console.log('• Follower growth');
  console.log('• Engagement rates');
  console.log('• Best performing content');
  console.log('• Audience demographics');
}

// Content library manager
async function manageContentLibrary() {
  console.log('\n📚 Content Library\n');
  console.log('1) View quotes');
  console.log('2) View facts');
  console.log('3) View insights');
  console.log('4) Add new content');
  console.log('0) Back\n');
  
  const choice = await question('Select an option: ');
  
  // Implementation coming soon
  console.log('Content library management coming soon!');
}

// Main menu
async function mainMenu() {
  while (true) {
    showBanner();
    await checkPlatformStatus();
    
    console.log('📱 Main Menu\n');
    console.log('1) Manage Twitter');
    console.log('2) Cross-platform posting');
    console.log('3) View analytics');
    console.log('4) Manage content library');
    console.log('5) Schedule content');
    console.log('6) Platform setup wizard');
    console.log('0) Exit\n');
    
    const choice = await question('Select an option: ');
    
    switch(choice) {
      case '1':
        await manageTwitter();
        break;
      case '2':
        await crossPost();
        break;
      case '3':
        await viewAnalytics();
        break;
      case '4':
        await manageContentLibrary();
        break;
      case '5':
        await scheduleWeeklyContent();
        break;
      case '6':
        exec('node ../scripts/setup-social-profiles.js');
        break;
      case '0':
        console.log('\nGoodbye! 💜\n');
        rl.close();
        return;
      default:
        console.log('Invalid option');
        await question('\nPress Enter to continue...');
    }
  }
}

// Launch the dashboard
if (require.main === module) {
  mainMenu().catch(console.error);
}

module.exports = {
  checkPlatformStatus,
  manageTwitter,
  crossPost,
  scheduleWeeklyContent
};
