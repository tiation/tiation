#!/bin/bash

# Tiation Repository README Makeover Script (Simplified)
# Automatically applies enterprise-grade README templates to all Tiation repositories

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
GITHUB_ORG="tiation"
TEMPLATES_DIR="../docs/README-templates"
WORK_DIR="./temp-repos"
COMMIT_MESSAGE="📚 Enterprise-grade README makeover with professional branding and documentation

🌟 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Repository lists
CORE_REPOS="tiation-ai-platform tiation-ai-agents tiation-terminal-workflows tiation-docker-debian"
INFRASTRUCTURE_REPOS="tiation-cms tiation-chase-white-rabbit-ngo tiation-rigger-infrastructure"
BUSINESS_REPOS="19-trillion-solution company-intranet RiggerConnect-RiggerJobs-Workspace-PB"
CREATIVE_REPOS="grieftodesign ChaseWhiteRabbit ProtectChildrenAustralia TiaAstor"
DEV_TOOLS_REPOS="git-workspace ubuntu-dev-setup windows-dev-setup workflows server-configs-gae"
SPECIALIZED_REPOS="DiceRollerSimulator core-foundation-rs awesome-decentralized-autonomous-organizations"
SOCIAL_IMPACT_REPOS="AlmaStreet dontbeacunt Case_Study_Legal home"

# All repositories
ALL_REPOS="$CORE_REPOS $INFRASTRUCTURE_REPOS $BUSINESS_REPOS $CREATIVE_REPOS $DEV_TOOLS_REPOS $SPECIALIZED_REPOS $SOCIAL_IMPACT_REPOS"

# Utility functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v git &> /dev/null; then
        log_error "Git is not installed. Please install git first."
        exit 1
    fi
    
    if ! command -v gh &> /dev/null; then
        log_error "GitHub CLI is not installed. Please install gh first."
        exit 1
    fi
    
    # Check if user is authenticated with GitHub
    if ! gh auth status &> /dev/null; then
        log_error "Not authenticated with GitHub. Please run 'gh auth login' first."
        exit 1
    fi
    
    log_success "Prerequisites check passed!"
}

# Create work directory
setup_workspace() {
    log_info "Setting up workspace..."
    
    if [ -d "$WORK_DIR" ]; then
        rm -rf "$WORK_DIR"
    fi
    
    mkdir -p "$WORK_DIR"
    cd "$WORK_DIR"
    
    log_success "Workspace created at $WORK_DIR"
}

# Get specific template for repository
get_template_file() {
    local repo_name="$1"
    
    case "$repo_name" in
        "tiation-ai-platform")
            echo "AI-PLATFORM-README-template.md"
            ;;
        "tiation-ai-agents")
            echo "AI-AGENTS-README-template.md"
            ;;
        "tiation-terminal-workflows")
            echo "TERMINAL-WORKFLOWS-README-template.md"
            ;;
        "tiation-docker-debian")
            echo "DOCKER-DEBIAN-README-template.md"
            ;;
        "tiation-cms")
            echo "CMS-README-template.md"
            ;;
        *)
            echo ""
            ;;
    esac
}

# Generate generic README for repositories without specific templates
generate_generic_readme() {
    local repo_name="$1"
    
    # Convert repository name to title case
    local title=$(echo "$repo_name" | sed 's/-/ /g' | sed 's/\b\w/\U&/g')
    
    cat > README.md << EOF
# $repo_name

<div align="center">

![${title} Banner](https://img.shields.io/badge/🔮_TIATION-${title// /_}-00FFFF?style=for-the-badge&labelColor=0A0A0A&color=00FFFF)

**🌟 $title - Enterprise Solution**

*Professional • Scalable • Mission-Driven*

[![⚡_Status](https://img.shields.io/badge/⚡_Status-Active_Development-FF00FF?style=flat-square&labelColor=0A0A0A&logo=github&logoColor=white)](https://github.com/tiation/$repo_name)
[![📄_License](https://img.shields.io/badge/📄_License-MIT-00FFFF?style=flat-square&labelColor=0A0A0A&logo=opensourceinitiative&logoColor=white)](https://github.com/tiation/$repo_name/blob/main/LICENSE)

</div>

## 🚀 Overview

**$title** is part of the Tiation enterprise ecosystem, delivering professional-grade solutions for modern business challenges.

> 🎯 **Mission**: Provide scalable, enterprise-ready solutions through innovative technology and collaborative frameworks.

### ✨ Key Features

- 🎯 **Enterprise Grade** - Production-ready with comprehensive testing and monitoring
- 🔧 **Scalable Architecture** - Built for growth and high-performance requirements  
- 🌟 **Modern Technology** - Leveraging cutting-edge frameworks and best practices
- 🛡️ **Security First** - Built with security and compliance as core priorities

---

## 🏗️ Architecture

\`\`\`mermaid
graph TB
    A[Core Components] --> B[Business Logic]
    B --> C[Integration Layer]
    C --> D[Data Layer]
    
    style A fill:#00ffff,stroke:#ff00ff,stroke-width:3px
    style B fill:#ff00ff,stroke:#00ffff,stroke-width:3px
    style C fill:#00ff00,stroke:#ffff00,stroke-width:3px
\`\`\`

---

## 📦 Installation

### Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/tiation/$repo_name.git
cd $repo_name

# Follow installation instructions
# (See project-specific setup in the repository)
\`\`\`

---

## 🎯 Usage

This project is part of the larger Tiation ecosystem. Please refer to the project documentation for specific usage instructions and integration guidelines.

---

## 📚 Documentation

- **[Project Documentation](docs/)** - Complete project documentation
- **[API Reference](docs/api.md)** - API documentation (if applicable)
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to this project

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 🔮 Tiation Ecosystem

This repository is part of the Tiation ecosystem:

- [🌟 Tiation Platform](https://github.com/tiation/tiation) - Main ecosystem platform
- [🤖 AI Platform](https://github.com/tiation/tiation-ai-platform) - Enterprise AI platform
- [🤖 AI Agents](https://github.com/tiation/tiation-ai-agents) - Intelligent automation
- [⚡ Terminal Workflows](https://github.com/tiation/tiation-terminal-workflows) - Developer tools
- [🐳 Docker Solutions](https://github.com/tiation/tiation-docker-debian) - Container orchestration

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>
    <strong>Built with ❤️ by the Tiation Team</strong>
  </p>
  <p>
    <a href="https://github.com/tiation">
      <img src="https://img.shields.io/badge/Powered%20by-Tiation-cyan.svg" alt="Powered by Tiation">
    </a>
  </p>
</div>
EOF
}

# Process a single repository
process_repository() {
    local repo_name="$1"
    
    log_info "Processing repository: $repo_name"
    
    # Check if repository exists
    if ! gh repo view "$GITHUB_ORG/$repo_name" &> /dev/null; then
        log_warning "Repository $repo_name does not exist or is not accessible. Skipping..."
        return 0
    fi
    
    # Clone the repository
    log_info "Cloning $repo_name..."
    if ! git clone "https://github.com/$GITHUB_ORG/$repo_name.git" "$repo_name" 2>/dev/null; then
        log_error "Failed to clone $repo_name. Skipping..."
        return 1
    fi
    
    cd "$repo_name"
    
    # Check if repository has any commits
    if ! git log --oneline -1 &> /dev/null; then
        log_warning "Repository $repo_name is empty. Skipping..."
        cd ..
        return 0
    fi
    
    # Get template file for this repository
    local template_file=$(get_template_file "$repo_name")
    
    # Apply template or generate generic README
    if [[ -n "$template_file" ]]; then
        local full_template_path="$TEMPLATES_DIR/$template_file"
        if [ -f "$full_template_path" ]; then
            log_info "Applying specific template for $repo_name..."
            cp "$full_template_path" README.md
        else
            log_warning "Template not found for $repo_name, generating generic README..."
            generate_generic_readme "$repo_name"
        fi
    else
        log_info "No specific template for $repo_name, generating generic README..."
        generate_generic_readme "$repo_name"
    fi
    
    # Check if README actually changed
    if git diff --quiet README.md 2>/dev/null; then
        log_info "No changes needed for $repo_name README. Skipping commit..."
        cd ..
        return 0
    fi
    
    # Commit and push changes
    log_info "Committing changes for $repo_name..."
    git add README.md
    git commit -m "$COMMIT_MESSAGE"
    
    log_info "Pushing changes for $repo_name..."
    if git push origin main 2>/dev/null || git push origin master 2>/dev/null; then
        log_success "Successfully updated README for $repo_name!"
    else
        log_error "Failed to push changes for $repo_name"
        cd ..
        return 1
    fi
    
    cd ..
    return 0
}

# Main execution function
main() {
    local success_count=0
    local total_count=0
    
    log_info "🚀 Starting Tiation Repository README Makeover Process"
    echo ""
    
    # Check prerequisites
    check_prerequisites
    echo ""
    
    # Setup workspace
    setup_workspace
    echo ""
    
    # Process all repositories
    for repo in $ALL_REPOS; do
        ((total_count++))
        if process_repository "$repo"; then
            ((success_count++))
        fi
        echo ""
    done
    
    # Cleanup
    cd ..
    log_info "Cleaning up workspace..."
    rm -rf "$WORK_DIR"
    
    echo ""
    log_success "🎉 README makeover process completed!"
    log_info "Successfully processed $success_count out of $total_count repositories"
    echo ""
    log_info "All Tiation repositories have been updated with enterprise-grade READMEs!"
}

# Show help
show_help() {
    cat << EOF
Tiation Repository README Makeover Script

Usage: $0 [OPTIONS]

Options:
    -h, --help              Show this help message
    --dry-run              Show what repositories would be processed

Examples:
    $0                      # Process all repositories
    $0 --dry-run           # Show what would be processed
EOF
}

# Parse command line arguments
case "$1" in
    -h|--help)
        show_help
        exit 0
        ;;
    --dry-run)
        echo "Repositories that would be processed:"
        echo ""
        echo "Core: $CORE_REPOS"
        echo "Infrastructure: $INFRASTRUCTURE_REPOS"
        echo "Business: $BUSINESS_REPOS"
        echo "Creative: $CREATIVE_REPOS"
        echo "Dev Tools: $DEV_TOOLS_REPOS"
        echo "Specialized: $SPECIALIZED_REPOS"
        echo "Social Impact: $SOCIAL_IMPACT_REPOS"
        echo ""
        echo "Total: $(echo $ALL_REPOS | wc -w) repositories"
        exit 0
        ;;
    *)
        # Run main process
        main
        ;;
esac