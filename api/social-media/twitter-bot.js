#!/usr/bin/env node

/**
 * Tiation Twitter Bot
 * Manages Twitter presence for the Tiation movement
 */

require('dotenv').config({ path: '../../.env' });
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

// Initialize Twitter client
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Read-write client
const rwClient = client.readWrite;

// Tiation content themes
const contentThemes = {
  monday: {
    theme: "Motivation Monday",
    hashtags: ["#MotivationMonday", "#SystemicChange", "#GriefToDesign"],
    template: "💜 Monday Motivation: {quote}\n\nPeople aren't broken. Systems are. We can fix the systems.\n\n{hashtags}"
  },
  tuesday: {
    theme: "Transform Tuesday",
    hashtags: ["#TransformTuesday", "#GriefToDesign", "#Hope"],
    template: "🦋 Transform Tuesday: {story}\n\nFrom grief to design, from loss to hope.\n\n{hashtags}"
  },
  wednesday: {
    theme: "Wealth Wednesday",
    hashtags: ["#WealthWednesday", "#19TrillionSolution", "#AbundanceForAll"],
    template: "💰 Did you know? {fact}\n\nThe $19 Trillion Solution proves abundance is possible for all Australians.\n\n{hashtags}"
  },
  thursday: {
    theme: "Thoughtful Thursday",
    hashtags: ["#ThoughtfulThursday", "#SystemsThinking", "#ChangeTheSystem"],
    template: "🤔 Thoughtful Thursday: {insight}\n\nIt's time to redesign our broken systems.\n\n{hashtags}"
  },
  friday: {
    theme: "Future Friday",
    hashtags: ["#FutureFriday", "#VisionForAbundance", "#SystemicSolutions"],
    template: "🌟 Future Friday: {vision}\n\nTogether, we're building systems worthy of humanity.\n\n{hashtags}"
  },
  saturday: {
    theme: "Solutions Saturday",
    hashtags: ["#SolutionsSaturday", "#TakeAction", "#OpenSource"],
    template: "🛠️ Solutions Saturday: {action}\n\nJoin us in creating real change: github.com/tiation/tiation\n\n{hashtags}"
  },
  sunday: {
    theme: "Community Sunday",
    hashtags: ["#CommunitySunday", "#TogetherWeRise", "#Tiation"],
    template: "👥 Community Sunday: {community}\n\nThank you for being part of the movement. 💜\n\n{hashtags}"
  }
};

// Content library
const content = {
  quotes: [
    "Where grief transforms into hope and systemic solutions.",
    "Every system was designed. Every system can be redesigned.",
    "Abundance isn't a dream—it's a choice we make together.",
    "From personal loss to universal gain—that's the power of grief to design.",
    "We don't need charity. We need systems that work for everyone."
  ],
  facts: [
    "Australia has $19 trillion in collective wealth—that's $760,000 per citizen!",
    "Every Australian adult could receive $800/week without anyone losing wealth.",
    "Alaska has been sharing oil wealth with citizens for 47 years. It works.",
    "Zero people should live in poverty when we have $19 trillion to share.",
    "The technology exists. The wealth exists. Only the will is missing."
  ],
  insights: [
    "When we blame people instead of fixing systems, nothing changes.",
    "Grief taught us that broken systems compound human suffering.",
    "Cooperative capitalism: where competition drives innovation, cooperation drives distribution.",
    "Open source everything—transparency builds trust, trust builds change.",
    "The best time to fix a broken system was yesterday. The second best time is now."
  ],
  actions: [
    "Read the $19 Trillion Solution research",
    "Share your story of systems failing people",
    "Contribute to our open-source platform",
    "Start conversations about abundance",
    "Question why poverty exists amid plenty"
  ]
};

// Profile management functions
async function updateProfile() {
  try {
    const profile = await rwClient.v1.updateAccountProfile({
      name: 'Tiation',
      description: 'Transforming grief into systemic solutions 💜 | The $19 Trillion Solution for Australia 🇦🇺 | People aren\'t broken, systems are | #GriefToDesign',
      url: 'https://github.com/tiation/tiation',
      location: 'Australia'
    });
    console.log('✅ Profile updated successfully');
    return profile;
  } catch (error) {
    console.error('❌ Error updating profile:', error);
  }
}

// Tweet functions
async function postTweet(content) {
  try {
    const tweet = await rwClient.v2.tweet(content);
    console.log('✅ Tweet posted:', tweet.data.id);
    return tweet;
  } catch (error) {
    console.error('❌ Error posting tweet:', error);
  }
}

async function postThread(tweets) {
  try {
    let lastTweetId = null;
    const thread = [];
    
    for (const tweetContent of tweets) {
      const tweetData = lastTweetId 
        ? { text: tweetContent, reply: { in_reply_to_tweet_id: lastTweetId } }
        : { text: tweetContent };
      
      const tweet = await rwClient.v2.tweet(tweetData);
      thread.push(tweet);
      lastTweetId = tweet.data.id;
      
      // Wait a bit between tweets to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('✅ Thread posted:', thread.length, 'tweets');
    return thread;
  } catch (error) {
    console.error('❌ Error posting thread:', error);
  }
}

// Content generation
function generateDailyContent() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  const theme = contentThemes[today];
  
  let contentData = {};
  switch(today) {
    case 'monday':
      contentData.quote = content.quotes[Math.floor(Math.random() * content.quotes.length)];
      break;
    case 'wednesday':
      contentData.fact = content.facts[Math.floor(Math.random() * content.facts.length)];
      break;
    case 'thursday':
      contentData.insight = content.insights[Math.floor(Math.random() * content.insights.length)];
      break;
    case 'saturday':
      contentData.action = content.actions[Math.floor(Math.random() * content.actions.length)];
      break;
    default:
      contentData = {
        story: "Every loss carries the seed of transformation.",
        vision: "A world where every person thrives.",
        community: "You are the reason this movement exists."
      };
  }
  
  contentData.hashtags = theme.hashtags.join(' ');
  
  // Replace placeholders in template
  let tweet = theme.template;
  for (const [key, value] of Object.entries(contentData)) {
    tweet = tweet.replace(`{${key}}`, value);
  }
  
  return tweet;
}

// Engagement functions
async function likeAndRetweet(tweetId) {
  try {
    await rwClient.v2.like(tweetId);
    await rwClient.v2.retweet(tweetId);
    console.log('✅ Liked and retweeted:', tweetId);
  } catch (error) {
    console.error('❌ Error engaging with tweet:', error);
  }
}

async function followUser(username) {
  try {
    const user = await rwClient.v2.userByUsername(username);
    await rwClient.v2.follow(user.data.id);
    console.log('✅ Followed:', username);
  } catch (error) {
    console.error('❌ Error following user:', error);
  }
}

// Thread content
const introThread = [
  "🧵 Introducing Tiation: Where grief transforms into hope and systemic solutions.\n\n#GriefToDesign #SystemicChange",
  "1/ Born from personal tragedy, Tiation proves a simple truth: People aren't broken. Systems are. And we can fix the systems.",
  "2/ Our flagship initiative? The $19 Trillion Solution. Australia has $19 trillion in collective wealth—enough for every citizen to thrive.",
  "3/ That's $760,000 per Australian. Managed correctly, every adult could receive $800/week without anyone losing their wealth.",
  "4/ This isn't fantasy. Alaska has shared oil wealth with citizens for 47 years. The model works. We just need to scale it.",
  "5/ But Tiation is more than economics. It's about transforming grief into blueprints for a better world. #GriefToDesign",
  "6/ We're building:\n• Open-source platforms for change\n• Policy frameworks for abundance\n• Communities centered on healing\n• Educational resources for systems thinking",
  "7/ Join us. Read our research. Share your story. Build with us.\n\n🔗 github.com/tiation/tiation\n\nTogether, we're designing systems worthy of humanity. 💜"
];

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch(command) {
    case 'setup':
      console.log('🚀 Setting up Tiation Twitter profile...');
      await updateProfile();
      break;
      
    case 'intro':
      console.log('📢 Posting introduction thread...');
      await postThread(introThread);
      break;
      
    case 'daily':
      console.log('📅 Posting daily content...');
      const dailyTweet = generateDailyContent();
      await postTweet(dailyTweet);
      break;
      
    case 'tweet':
      const customTweet = args.slice(1).join(' ');
      if (customTweet) {
        console.log('🐦 Posting custom tweet...');
        await postTweet(customTweet);
      } else {
        console.error('Please provide tweet content');
      }
      break;
      
    case 'follow':
      const username = args[1];
      if (username) {
        await followUser(username);
      } else {
        console.error('Please provide username');
      }
      break;
      
    default:
      console.log(`
Tiation Twitter Bot Commands:
  
  setup     - Update profile with Tiation information
  intro     - Post introduction thread
  daily     - Post daily themed content
  tweet     - Post custom tweet (provide content)
  follow    - Follow a user (provide username)
  
Example: node twitter-bot.js daily
      `);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  updateProfile,
  postTweet,
  postThread,
  generateDailyContent,
  likeAndRetweet,
  followUser
};
