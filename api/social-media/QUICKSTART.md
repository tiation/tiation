# 🚀 Tiation Social Media Quick Start Guide

## ✅ Twitter is Ready! 

Your Twitter API credentials are already configured. Let's get Tiation's presence established!

## 📱 Step 1: Launch the Social Media Manager

```bash
cd /Users/tiaastor/tiation-github/tiation/api/social-media
node social-media-manager.js
```

This interactive dashboard lets you:
- Update Twitter profile
- Post introduction thread
- Schedule daily content
- Manage all social media from one place

## 🐦 Step 2: Set Up Twitter Profile

```bash
# Update profile with Tiation information
node twitter-bot.js setup
```

This will update:
- Name: Tiation
- Bio: "Transforming grief into systemic solutions 💜 | The $19 Trillion Solution for Australia 🇦🇺"
- Website: https://github.com/tiation/tiation
- Location: Australia

## 📢 Step 3: Post Introduction Thread

```bash
# Post the 7-part introduction thread
node twitter-bot.js intro
```

This introduces:
- What Tiation is
- The $19 Trillion Solution
- Grief to Design methodology
- Call to action

## 📅 Step 4: Schedule Daily Content

```bash
# Post today's themed content
node twitter-bot.js daily
```

Or use the manager to schedule a week:
```bash
node social-media-manager.js
# Select option 5: Schedule content
```

## 🎯 Step 5: Engage with Community

Follow relevant accounts:
```bash
node twitter-bot.js follow @username
```

Suggested accounts to follow:
- @GetUp (Australian activism)
- @AustralianLabor
- @TheGreenParty
- @ACOSS (Australian Council of Social Service)
- @BeyondBlue (mental health)

## 📱 Step 6: Set Up Other Platforms

Use the browser-based setup:
```bash
# Interactive setup wizard
node ../../scripts/setup-social-profiles.js

# Or CLI browser
../../scripts/lynx-social-setup.sh
```

## 💡 Pro Tips

1. **Post consistently**: Use daily themes
2. **Engage authentically**: Reply to comments, thank supporters
3. **Use visuals**: Create infographics about the $19T solution
4. **Cross-promote**: Link between platforms
5. **Track what works**: Note which content resonates

## 🔧 Custom Posts

Post anything custom:
```bash
node twitter-bot.js tweet "Your message here #Tiation #GriefToDesign"
```

## 📊 Content Ideas

### This Week's Focus
- Monday: Quote about systems change
- Tuesday: Story of transformation
- Wednesday: $19 Trillion fact
- Thursday: Systems thinking insight
- Friday: Vision for Australia's future
- Saturday: Call to action
- Sunday: Thank the community

### Key Statistics to Share
- $19 trillion = Australia's wealth
- $760,000 = Per citizen share
- $800/week = Possible payment
- 47 years = Alaska's success
- 0 = People who should be in poverty

## 🚨 Important Reminders

1. **Be authentic**: This movement comes from grief and love
2. **Stay positive**: Focus on solutions, not just problems
3. **Build community**: Engage, don't just broadcast
4. **Open source**: Share everything transparently
5. **Measure impact**: Track engagement and adjust

## 📞 Need Help?

- Check `api/social-media/README.md` for technical details
- Review `docs/social-media-profiles.md` for brand guidelines
- Run `node twitter-bot.js` without arguments for help

---

💜 Remember: Every post carries the weight of those we've lost and the hope of those we'll help. Make it count.
