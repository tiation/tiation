#!/bin/bash

echo "Setting up GitHub Pages for tiation/tiation repository..."

# Try to create pages configuration
echo "Configuring GitHub Pages to serve from /docs folder on main branch..."
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/tiation/tiation/pages \
  -f source[branch]='main' \
  -f source[path]='/docs' \
  2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ GitHub Pages has been configured successfully!"
else
    echo "GitHub Pages might already be configured or there was an error."
    echo "Checking current Pages status..."
    
    # Check if pages is already enabled
    gh api \
      -H "Accept: application/vnd.github+json" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      /repos/tiation/tiation/pages \
      2>/dev/null
      
    if [ $? -eq 0 ]; then
        echo "✅ GitHub Pages is already enabled!"
    else
        echo "❌ GitHub Pages is not enabled. Please enable it manually:"
        echo "1. Go to https://github.com/tiation/tiation/settings/pages"
        echo "2. Under 'Source', select 'Deploy from a branch'"
        echo "3. Select 'main' branch and '/docs' folder"
        echo "4. Click 'Save'"
    fi
fi

echo ""
echo "Your site will be available at: https://tiation.github.io/tiation/"
echo "It may take a few minutes for the site to become available."
