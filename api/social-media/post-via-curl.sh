#!/bin/bash

# Simple curl-based social media posting
# Uses raw HTTP requests for posting content

set -e

echo "🚀 Tiation CLI Social Media Poster (curl-based)"
echo "================================================"

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Tiation Twitter posts
TWITTER_POSTS=(
    "🚀 Introducing Tiation - where innovation meets integration! Our unified platform brings all your digital tools together in one seamless experience. #Tiation #TechInnovation #DigitalTransformation"
    "💡 Why juggle multiple platforms when you can have it all in one place? Tiation combines social media management, analytics, automation, and more. The future of digital efficiency is here! #Productivity"
    "🌟 At Tiation, we believe technology should empower, not overwhelm. That's why we've created a platform that simplifies complexity while amplifying your impact. Join the revolution! #Innovation"
    "🔥 Ready to transform how you work? Tiation offers AI-powered insights, unified dashboards, and seamless integrations. Experience the difference today! #AI #Analytics #Transformation"
)

# Facebook post content
FACEBOOK_POST="🎉 Exciting news! Tiation is revolutionizing how businesses manage their digital presence. 

Our all-in-one platform combines:
✅ Social media management
✅ Real-time analytics  
✅ AI-powered automation
✅ Unified dashboard
✅ Privacy-first approach

Join thousands of innovators already using Tiation to streamline their digital workflows and amplify their impact.

Ready to experience the future of digital tools? Visit tiation.com today!

#Tiation #DigitalInnovation #BusinessTools #SocialMediaManagement #Analytics #Automation"

# Function to post to Facebook using Graph API
post_to_facebook() {
    local message="$1"
    
    if [ -z "$FACEBOOK_ACCESS_TOKEN" ] || [ -z "$FACEBOOK_PAGE_ID" ]; then
        echo "❌ Facebook credentials not configured"
        return 1
    fi
    
    echo "📘 Posting to Facebook..."
    
    response=$(curl -s -X POST "https://graph.facebook.com/${FACEBOOK_PAGE_ID}/feed" \
        -d "message=${message}" \
        -d "access_token=${FACEBOOK_ACCESS_TOKEN}")
    
    if echo "$response" | grep -q '"id"'; then
        post_id=$(echo "$response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
        echo "✅ Facebook post successful! ID: $post_id"
        return 0
    else
        echo "❌ Facebook post failed: $response"
        return 1
    fi
}

# Function to check Twitter credentials
check_twitter_creds() {
    if [ -z "$TWITTER_BEARER_TOKEN" ]; then
        echo "❌ Twitter Bearer Token not found"
        echo "📝 To get Twitter credentials:"
        echo "   1. Visit https://developer.twitter.com/en/portal/dashboard"
        echo "   2. Create app and get Bearer Token"
        echo "   3. Add to .env file: TWITTER_BEARER_TOKEN=your_token_here"
        return 1
    fi
    return 0
}

# Function to post to Twitter using Bearer Token (read-only check)
test_twitter_connection() {
    if ! check_twitter_creds; then
        return 1
    fi
    
    echo "🧪 Testing Twitter connection..."
    
    response=$(curl -s -X GET "https://api.twitter.com/2/users/me" \
        -H "Authorization: Bearer ${TWITTER_BEARER_TOKEN}")
    
    if echo "$response" | grep -q '"username"'; then
        username=$(echo "$response" | grep -o '"username":"[^"]*"' | cut -d'"' -f4)
        echo "✅ Twitter connected as @$username"
        return 0
    else
        echo "❌ Twitter connection failed: $response"
        return 1
    fi
}

# Main execution
case "$1" in
    "facebook")
        post_to_facebook "$FACEBOOK_POST"
        ;;
    "twitter-check")
        test_twitter_connection
        echo ""
        echo "📝 Twitter posts ready to deploy:"
        for i in "${!TWITTER_POSTS[@]}"; do
            echo "$((i+1)). ${TWITTER_POSTS[i]:0:80}..."
        done
        echo ""
        echo "💡 For Twitter posting, you need write permissions."
        echo "   Current setup allows read-only access."
        echo "   Visit developer.twitter.com to upgrade permissions."
        ;;
    "show-content")
        echo "📝 READY-TO-POST CONTENT"
        echo "========================"
        echo ""
        echo "🐦 TWITTER POSTS:"
        for i in "${!TWITTER_POSTS[@]}"; do
            echo ""
            echo "POST $((i+1)):"
            echo "${TWITTER_POSTS[i]}"
            echo "Length: $(echo "${TWITTER_POSTS[i]}" | wc -c) characters"
        done
        echo ""
        echo "📘 FACEBOOK POST:"
        echo "$FACEBOOK_POST"
        echo "Length: $(echo "$FACEBOOK_POST" | wc -c) characters"
        ;;
    "manual")
        echo "📋 MANUAL POSTING GUIDE"
        echo "======================="
        echo ""
        echo "Copy and paste these posts manually:"
        echo ""
        echo "🐦 TWITTER/X POSTS:"
        for i in "${!TWITTER_POSTS[@]}"; do
            echo ""
            echo "--- TWEET $((i+1)) ---"
            echo "${TWITTER_POSTS[i]}"
            echo "--- END TWEET $((i+1)) ---"
        done
        echo ""
        echo "📘 FACEBOOK POST:"
        echo "--- FACEBOOK POST ---"
        echo "$FACEBOOK_POST"
        echo "--- END FACEBOOK POST ---"
        ;;
    *)
        echo "📋 Usage:"
        echo "  ./post-via-curl.sh facebook        # Post to Facebook"
        echo "  ./post-via-curl.sh twitter-check   # Check Twitter connection"
        echo "  ./post-via-curl.sh show-content    # Show all content"
        echo "  ./post-via-curl.sh manual          # Show content for manual posting"
        echo ""
        echo "🔧 Current status:"
        echo "✅ 4 Twitter posts ready"
        echo "✅ 1 Facebook post ready"
        echo "❓ API credentials need verification"
        ;;
esac