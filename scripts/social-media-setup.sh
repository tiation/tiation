#!/bin/bash

# Tiation Social Media Profile Setup Helper
# This script helps you quickly access profile information for each platform

echo "🌟 Tiation Social Media Setup Helper"
echo "===================================="
echo ""

while true; do
    echo "Which platform are you setting up?"
    echo "1) Twitter/X"
    echo "2) LinkedIn"
    echo "3) Facebook"
    echo "4) Instagram"
    echo "5) YouTube"
    echo "6) TikTok"
    echo "7) Medium"
    echo "8) Reddit"
    echo "9) Discord"
    echo "0) Exit"
    echo ""
    read -p "Enter your choice (0-9): " choice

    case $choice in
        1)
            echo ""
            echo "=== TWITTER/X ==="
            echo "Handle: @tiation"
            echo ""
            echo "Bio:"
            echo "Transforming grief into systemic solutions 💜 | The $19 Trillion Solution for Australia 🇦🇺 | People aren't broken, systems are | #GriefToDesign"
            echo ""
            echo "Website: https://github.com/tiation/tiation"
            echo ""
            echo "Profile bio copied to clipboard!"
            echo "Transforming grief into systemic solutions 💜 | The $19 Trillion Solution for Australia 🇦🇺 | People aren't broken, systems are | #GriefToDesign" | pbcopy
            ;;
        2)
            echo ""
            echo "=== LINKEDIN ==="
            echo "Company Name: Tiation"
            echo "Tagline: Systemic Solutions Born from Love"
            echo "Industry: Social Enterprise"
            echo "Company Size: 2-10 employees"
            echo ""
            echo "About section copied to clipboard!"
            echo "Tiation is a movement born from personal tragedy, transformed into systemic solutions. We believe people aren't broken—systems are—and we're building the tools, policies, and communities to fix them.

Our flagship initiative, the $19 Trillion Solution, demonstrates how Australia's collective wealth can create abundance for all citizens. Through our Grief to Design methodology, we transform loss into blueprints for a better world.

We're not just theorizing—we're building:
• Open-source platforms for systemic change
• Policy frameworks for economic abundance
• Communities centered on healing and growth
• Educational resources for systems thinking

Join us in creating systems worthy of the people they serve." | pbcopy
            ;;
        3)
            echo ""
            echo "=== FACEBOOK ==="
            echo "Page Name: Tiation Movement"
            echo "Category: Community Organization"
            echo ""
            echo "About section copied to clipboard!"
            echo "Born from grief, designed for hope. Tiation transforms personal loss into systemic solutions.

We're proving that:
✓ People aren't broken, systems are
✓ Abundance is possible (The $19 Trillion Solution)
✓ Grief can become a blueprint for change
✓ Technology should serve humanity

Join our movement to redesign broken systems." | pbcopy
            ;;
        4)
            echo ""
            echo "=== INSTAGRAM ==="
            echo "Username: @tiation.movement"
            echo ""
            echo "Bio copied to clipboard!"
            echo "Grief→Design→Hope 💜
$19 Trillion Solution for 🇦🇺
Systems change, not charity
Open source everything
↓ Read our story" | pbcopy
            ;;
        5)
            echo ""
            echo "=== YOUTUBE ==="
            echo "Channel Name: Tiation"
            echo ""
            echo "Description copied to clipboard!"
            echo "Welcome to Tiation, where grief transforms into hope and systemic solutions.

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

Together, we're designing systems worthy of humanity." | pbcopy
            ;;
        6)
            echo ""
            echo "=== TIKTOK ==="
            echo "Username: @tiation"
            echo ""
            echo "Bio copied to clipboard!"
            echo "Fixing broken systems, not people 💜
The $19 Trillion Solution 🇦🇺
Grief→Design→Hope" | pbcopy
            ;;
        7)
            echo ""
            echo "=== MEDIUM ==="
            echo "Publication Name: Tiation Insights"
            echo "Tagline: Where Grief Meets Design"
            echo ""
            echo "About copied to clipboard!"
            echo "Deep dives into systemic solutions, the economics of abundance, and transforming personal loss into societal gain. Home of the $19 Trillion Solution and the Grief to Design movement." | pbcopy
            ;;
        8)
            echo ""
            echo "=== REDDIT ==="
            echo "Subreddit: r/Tiation"
            echo ""
            echo "Description copied to clipboard!"
            echo "A community for those who believe people aren't broken, systems are. Discuss the $19 Trillion Solution, share Grief to Design stories, and collaborate on systemic solutions." | pbcopy
            ;;
        9)
            echo ""
            echo "=== DISCORD ==="
            echo "Server Name: Tiation Community"
            echo ""
            echo "Welcome message copied to clipboard!"
            echo "Welcome to Tiation! 💜

You've found a community that believes in transforming grief into hope, scarcity into abundance, and broken systems into beautiful solutions.

Whether you're here for the $19 Trillion Solution, the Grief to Design philosophy, or just believe we can build better systems—you belong here.

Check out #start-here for orientation!" | pbcopy
            ;;
        0)
            echo "Good luck setting up your social media profiles! 💜"
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            ;;
    esac
    
    echo ""
    echo "Press Enter to continue..."
    read
    clear
done
