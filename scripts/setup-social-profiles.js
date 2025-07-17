#!/usr/bin/env node

/**
 * Tiation Social Media Profile Setup Script
 * This script helps automate the setup of social media profiles
 */

const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load profile data from the markdown file
const profileData = {
  linkedin: {
    name: "Tiation",
    tagline: "Systemic Solutions Born from Love",
    industry: "Social Enterprise",
    size: "2-10 employees",
    about: `Tiation is a movement born from personal tragedy, transformed into systemic solutions. We believe people aren't broken—systems are—and we're building the tools, policies, and communities to fix them.

Founded by Tia Astor (Master of Counselling - Notre Dame Australia (deferred), Grad Cert Psychological Science - ACAP 2021, Bachelor of Criminology & Justice - Griffith 2018), Tiation combines rigorous academic understanding of justice systems, psychological frameworks, and human behavior with lived experience of systemic failure.

Our flagship initiative, the $19 Trillion Solution, demonstrates how Australia's collective wealth can create abundance for all citizens. Through our Grief to Design methodology, we transform loss into blueprints for a better world.

We're not just theorizing—we're building:
• Open-source platforms for systemic change
• Policy frameworks for economic abundance
• Communities centered on healing and growth
• Educational resources for systems thinking

Join us in creating systems worthy of the people they serve.`,
    website: "https://github.com/tiation/tiation"
  },
  facebook: {
    name: "Tiation Movement",
    category: "Community Organization",
    about: `Born from grief, designed for hope. Tiation transforms personal loss into systemic solutions.

We're proving that:
✓ People aren't broken, systems are
✓ Abundance is possible (The $19 Trillion Solution)
✓ Grief can become a blueprint for change
✓ Technology should serve humanity

Join our movement to redesign broken systems.`,
    cta: "Learn More",
    website: "https://github.com/tiation/tiation"
  },
  twitter: {
    handle: "@tiation",
    bio: "Transforming grief into systemic solutions 💜 | The $19 Trillion Solution for Australia 🇦🇺 | People aren't broken, systems are | #GriefToDesign",
    website: "https://github.com/tiation/tiation"
  },
  instagram: {
    username: "@tiation.movement",
    bio: `Grief→Design→Hope 💜
$19 Trillion Solution for 🇦🇺
Systems change, not charity
Open source everything
↓ Read our story`,
    website: "linktr.ee/tiation"
  },
  youtube: {
    name: "Tiation",
    description: `Welcome to Tiation, where grief transforms into hope and systemic solutions.

We're building a movement that proves:
• People aren't broken, systems are
• Abundance is our birthright (The $19 Trillion Solution)
• Personal loss can fuel universal change
• Open source collaboration changes everything

Subscribe for:
→ Explanations of systemic solutions
→ The $19 Trillion Solution breakdown
→ Grief to Design methodology
→ Community stories
→ Development updates

Together, we're designing systems worthy of humanity.`,
    keywords: "systemic change, grief to design, 19 trillion solution, social innovation, abundance economics, open source"
  }
};

console.log('🌟 Tiation Social Media Profile Setup Assistant');
console.log('=============================================\n');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupLinkedIn() {
  console.log('\n=== LinkedIn Setup ===');
  console.log('To create a LinkedIn Company Page:');
  console.log('1. Visit: https://www.linkedin.com/company/setup/new/');
  console.log('2. Use the following information:\n');
  
  console.log(`Company Name: ${profileData.linkedin.name}`);
  console.log(`Tagline: ${profileData.linkedin.tagline}`);
  console.log(`Industry: ${profileData.linkedin.industry}`);
  console.log(`Company Size: ${profileData.linkedin.size}`);
  console.log(`Website: ${profileData.linkedin.website}\n`);
  
  console.log('About Section (copied to clipboard):');
  console.log(profileData.linkedin.about);
  
  // Copy to clipboard on macOS
  exec(`echo "${profileData.linkedin.about}" | pbcopy`);
  
  await question('\nPress Enter when you\'ve created the LinkedIn page...');
}

async function setupFacebook() {
  console.log('\n=== Facebook Setup ===');
  console.log('To create a Facebook Page:');
  console.log('1. Visit: https://www.facebook.com/pages/create');
  console.log('2. Choose "Community or Public Figure" → "Community"');
  console.log('3. Use the following information:\n');
  
  console.log(`Page Name: ${profileData.facebook.name}`);
  console.log(`Category: ${profileData.facebook.category}`);
  console.log(`Website: ${profileData.facebook.website}\n`);
  
  console.log('About Section (copied to clipboard):');
  console.log(profileData.facebook.about);
  
  // Copy to clipboard on macOS
  exec(`echo "${profileData.facebook.about}" | pbcopy`);
  
  await question('\nPress Enter when you\'ve created the Facebook page...');
}

async function setupTwitter() {
  console.log('\n=== Twitter/X Setup ===');
  console.log('To create a Twitter/X account:');
  console.log('1. Visit: https://twitter.com/i/flow/signup');
  console.log('2. Use the following information:\n');
  
  console.log(`Handle: ${profileData.twitter.handle}`);
  console.log(`Website: ${profileData.twitter.website}\n`);
  
  console.log('Bio (copied to clipboard):');
  console.log(profileData.twitter.bio);
  
  // Copy to clipboard on macOS
  exec(`echo "${profileData.twitter.bio}" | pbcopy`);
  
  await question('\nPress Enter when you\'ve created the Twitter account...');
}

async function setupInstagram() {
  console.log('\n=== Instagram Setup ===');
  console.log('To create an Instagram account:');
  console.log('1. Visit: https://www.instagram.com/accounts/emailsignup/');
  console.log('2. Use the following information:\n');
  
  console.log(`Username: ${profileData.instagram.username}`);
  console.log(`Website: ${profileData.instagram.website}\n`);
  
  console.log('Bio (copied to clipboard):');
  console.log(profileData.instagram.bio);
  
  // Copy to clipboard on macOS
  exec(`echo "${profileData.instagram.bio}" | pbcopy`);
  
  await question('\nPress Enter when you\'ve created the Instagram account...');
}

async function setupYouTube() {
  console.log('\n=== YouTube Setup ===');
  console.log('To create a YouTube channel:');
  console.log('1. Visit: https://www.youtube.com/');
  console.log('2. Sign in and click on your profile → "Create a channel"');
  console.log('3. Choose "Use a custom name" and use:\n');
  
  console.log(`Channel Name: ${profileData.youtube.name}`);
  console.log(`Keywords: ${profileData.youtube.keywords}\n`);
  
  console.log('Description (copied to clipboard):');
  console.log(profileData.youtube.description);
  
  // Copy to clipboard on macOS
  exec(`echo "${profileData.youtube.description}" | pbcopy`);
  
  await question('\nPress Enter when you\'ve created the YouTube channel...');
}

async function generateLinktree() {
  console.log('\n=== Generating Linktree Content ===');
  
  const linktreeContent = `
Tiation Links
=============

📖 Read Our Story
→ https://github.com/tiation/tiation

💰 The $19 Trillion Solution
→ https://github.com/tiation/tiation/blob/main/docs/financials/

💜 Grief to Design Manifesto
→ https://github.com/tiation/tiation/blob/main/docs/manifestos/grief_to_design_manifesto.md

👥 Join Our Community
→ Discord: [Coming Soon]

💻 Contribute on GitHub
→ https://github.com/tiation/tiation

☕ Support Our Work
→ [Coming Soon]
`;

  const linktreePath = path.join(__dirname, '..', 'docs', 'linktree-content.txt');
  fs.writeFileSync(linktreePath, linktreeContent);
  console.log(`Linktree content saved to: ${linktreePath}`);
}

async function main() {
  console.log('Which platform would you like to set up?');
  console.log('1) LinkedIn');
  console.log('2) Facebook');
  console.log('3) Twitter/X');
  console.log('4) Instagram');
  console.log('5) YouTube');
  console.log('6) Generate Linktree Content');
  console.log('7) All Platforms (guided setup)');
  console.log('0) Exit\n');
  
  const choice = await question('Enter your choice (0-7): ');
  
  switch(choice) {
    case '1':
      await setupLinkedIn();
      break;
    case '2':
      await setupFacebook();
      break;
    case '3':
      await setupTwitter();
      break;
    case '4':
      await setupInstagram();
      break;
    case '5':
      await setupYouTube();
      break;
    case '6':
      await generateLinktree();
      break;
    case '7':
      await setupLinkedIn();
      await setupFacebook();
      await setupTwitter();
      await setupInstagram();
      await setupYouTube();
      await generateLinktree();
      console.log('\n✅ All platforms setup complete!');
      break;
    case '0':
      console.log('Goodbye! 💜');
      break;
    default:
      console.log('Invalid choice. Please try again.');
  }
  
  rl.close();
}

main().catch(console.error);
