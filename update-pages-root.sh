#!/bin/bash

echo "Updating GitHub Pages to serve from root directory..."

# Update pages configuration to serve from root
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/tiation/tiation/pages \
  -f source[branch]='main' \
  -f source[path]='/' \
  2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ GitHub Pages has been updated to serve from root!"
else
    echo "Trying alternative approach..."
    
    # Delete and recreate pages configuration
    gh api \
      --method DELETE \
      -H "Accept: application/vnd.github+json" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      /repos/tiation/tiation/pages \
      2>/dev/null
    
    sleep 2
    
    gh api \
      --method POST \
      -H "Accept: application/vnd.github+json" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      /repos/tiation/tiation/pages \
      -f source[branch]='main' \
      -f source[path]='/' \
      2>/dev/null
      
    if [ $? -eq 0 ]; then
        echo "✅ GitHub Pages has been reconfigured to serve from root!"
    else
        echo "⚠️  Please manually update GitHub Pages settings:"
        echo "1. Go to https://github.com/tiation/tiation/settings/pages"
        echo "2. Change 'Source' from '/docs' to '/ (root)'"
        echo "3. Click 'Save'"
    fi
fi

echo ""
echo "Your site will be available at: https://tiation.github.io/tiation/"
echo "It may take a few minutes for changes to take effect."
