/**
 * Twitter Launch Script for Tiation
 * Posts initial content to establish Tiation's presence
 */

require('dotenv').config({ path: '../../../.env' });
const TwitterService = require('../services/twitter');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// Tiation content strategy
const tiationContent = [
  {
    text: "🚀 Introducing Tiation - Where innovation meets execution. We're building the future of integrated digital solutions. #Tiation #Innovation #TechStartup",
    delay: 0
  },
  {
    text: "At Tiation, we believe in the power of connection. Our platform brings together the best of technology, creativity, and human potential. 🌟 #DigitalTransformation",
    delay: 2
  },
  {
    text: "💡 Did you know? The name 'Tiation' represents the transformation of ideas into action. We're here to help you turn your vision into reality. #StartupLife #Innovation",
    delay: 5
  },
  {
    text: "🎯 Our mission: Empower individuals and businesses with cutting-edge tools that simplify complexity and amplify impact. Join us on this journey! #TiationMission",
    delay: 10
  },
  {
    text: "📊 Excited to announce that we're developing AI-powered analytics tools to help businesses make data-driven decisions. Stay tuned for updates! #AI #Analytics #Tiation",
    delay: 15
  },
  {
    text: "🤝 Building a community of innovators, creators, and changemakers. Are you ready to be part of something extraordinary? #TiationCommunity #JoinUs",
    delay: 20
  },
  {
    text: "🔍 Transparency and trust are at the core of everything we do. We believe in open communication and ethical technology. #EthicalTech #Transparency",
    delay: 30
  },
  {
    text: "🌐 From social media management to advanced analytics, Tiation is your all-in-one platform for digital excellence. Learn more at https://tiation.com #DigitalPlatform",
    delay: 45
  },
  {
    text: "💪 Every great journey begins with a single step. Today, we take ours. Thank you for being part of the Tiation story from day one. #Grateful #NewBeginnings",
    delay: 60
  },
  {
    text: "🎨 Design thinking meets technical excellence. At Tiation, we're not just building products - we're crafting experiences. #DesignThinking #UX",
    delay: 90
  },
  {
    text: "📈 Setting up our social media presence across all major platforms. Follow us everywhere @tiation for updates, insights, and inspiration! #SocialMedia",
    delay: 120
  },
  {
    text: "🔐 Security isn't an afterthought - it's built into our DNA. Your data, your privacy, your trust - protected by Tiation. #CyberSecurity #Privacy",
    delay: 180
  },
  {
    text: "🌟 Big things are coming! We're working on revolutionary features that will change how you interact with digital tools. Can't wait to share more! #ComingSoon",
    delay: 240
  },
  {
    text: "💬 We want to hear from you! What challenges are you facing in your digital journey? Let's solve them together. #CommunityFirst #Feedback",
    delay: 300
  },
  {
    text: "🏆 Excellence is not a destination, it's a journey. At Tiation, we're committed to continuous improvement and innovation. #Excellence #ContinuousImprovement",
    delay: 360
  }
];

// Historical context posts (these reference past events but are posted now)
const historicalContext = [
  {
    text: "📅 Looking back at our journey: It all started with a simple idea - make technology work for people, not the other way around. #TiationOrigins #Throwback",
    delay: 400
  },
  {
    text: "🔧 From our early prototypes to today's platform, we've learned that the best solutions come from listening to our users. Thank you for your feedback! #UserFirst",
    delay: 450
  },
  {
    text: "📚 The research phase taught us so much about market needs. Every late night and early morning was worth it to build something truly valuable. #StartupJourney",
    delay: 500
  }
];

async function postToTwitter() {
  try {
    const twitterService = new TwitterService(logger);
    logger.info('Starting Twitter content posting for Tiation...');

    // Combine all content
    const allContent = [...tiationContent, ...historicalContext];

    // Post content with delays
    for (const content of allContent) {
      setTimeout(async () => {
        try {
          const result = await twitterService.post(content.text);
          logger.info(`Posted: "${content.text.substring(0, 50)}..."`);
          logger.info(`Tweet ID: ${result.data?.id}`);
        } catch (error) {
          logger.error(`Failed to post: ${error.message}`);
        }
      }, content.delay * 1000); // Convert seconds to milliseconds
    }

    logger.info(`Scheduled ${allContent.length} tweets over the next ${Math.max(...allContent.map(c => c.delay))} seconds`);
    
    // Keep the script running until all posts are sent
    setTimeout(() => {
      logger.info('All tweets have been posted!');
      process.exit(0);
    }, (Math.max(...allContent.map(c => c.delay)) + 10) * 1000);

  } catch (error) {
    logger.error('Error in Twitter posting script:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  logger.info('=== Tiation Twitter Launch Script ===');
  logger.info('This will post a series of tweets to establish Tiation\'s presence');
  logger.info('Posts will be staggered over time to appear natural');
  logger.info('=====================================\n');
  
  postToTwitter();
}

module.exports = { postToTwitter };
