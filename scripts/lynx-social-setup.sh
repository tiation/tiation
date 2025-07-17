#!/bin/bash

# Tiation Social Media Profile Setup with Lynx
# This script opens social media sites in Lynx for profile creation

echo "🌟 Tiation Social Media Profile Setup with Lynx"
echo "=============================================="
echo ""
echo "This will guide you through creating profiles using the Lynx browser."
echo ""

show_profile_info() {
    platform=$1
    echo ""
    echo "=== $platform Profile Information ==="
    echo ""
    
    case $platform in
        "LinkedIn")
            echo "Company Name: Tiation"
            echo "Tagline: Systemic Solutions Born from Love"
            echo "Industry: Social Enterprise"
            echo "Company Size: 2-10 employees"
            echo "Website: https://github.com/tiation/tiation"
            ;;
        "Facebook")
            echo "Page Name: Tiation Movement"
            echo "Category: Community Organization"
            echo "Website: https://github.com/tiation/tiation"
            ;;
        "Twitter")
            echo "Handle: @tiation"
            echo "Website: https://github.com/tiation/tiation"
            ;;
        "Instagram")
            echo "Username: @tiation.movement"
            echo "Website: linktr.ee/tiation"
            ;;
        "YouTube")
            echo "Channel Name: Tiation"
            ;;
    esac
    
    echo ""
    echo "Press Enter to open $platform in Lynx..."
    read
}

while true; do
    echo ""
    echo "Which platform would you like to set up?"
    echo "1) LinkedIn Company Page"
    echo "2) Facebook Page"
    echo "3) Twitter/X"
    echo "4) Instagram"
    echo "5) YouTube"
    echo "6) Create Linktree"
    echo "0) Exit"
    echo ""
    read -p "Enter your choice (0-6): " choice

    case $choice in
        1)
            show_profile_info "LinkedIn"
            echo "Opening LinkedIn Company Setup..."
            lynx "https://www.linkedin.com/company/setup/new/"
            ;;
        2)
            show_profile_info "Facebook"
            echo "Opening Facebook Page Creation..."
            lynx "https://www.facebook.com/pages/create"
            ;;
        3)
            show_profile_info "Twitter"
            echo "Opening Twitter Signup..."
            lynx "https://twitter.com/i/flow/signup"
            ;;
        4)
            show_profile_info "Instagram"
            echo "Opening Instagram Signup..."
            lynx "https://www.instagram.com/accounts/emailsignup/"
            ;;
        5)
            show_profile_info "YouTube"
            echo "Opening YouTube..."
            echo "Note: You'll need to sign in first, then create a channel."
            lynx "https://www.youtube.com/"
            ;;
        6)
            echo ""
            echo "Opening Linktree..."
            lynx "https://linktr.ee/"
            ;;
        0)
            echo "Profile setup complete! 💜"
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            ;;
    esac
done
