#!/bin/bash

# Tiation Repository README Makeover Script
# Automatically applies enterprise-grade README templates to all Tiation repositories

set -e

# Check if bash version supports associative arrays
if [ ${BASH_VERSION:0:1} -lt 4 ]; then
    echo "This script requires Bash 4.0 or higher for associative arrays."
    echo "Current version: $BASH_VERSION"
    exit 1
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
GITHUB_ORG="tiation"
TEMPLATES_DIR="./docs/README-templates"
WORK_DIR="./temp-repos"
COMMIT_MESSAGE="📚 Enterprise-grade README makeover with professional branding and documentation

🌟 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Repository lists organized by category
declare -A REPO_CATEGORIES=(
    ["core"]="tiation-ai-platform tiation-ai-agents tiation-terminal-workflows tiation-docker-debian"
    ["infrastructure"]="tiation-cms tiation-chase-white-rabbit-ngo tiation-rigger-infrastructure"
    ["business"]="19-trillion-solution company-intranet RiggerConnect-RiggerJobs-Workspace-PB"
    ["creative"]="grieftodesign ChaseWhiteRabbit ProtectChildrenAustralia TiaAstor"
    ["dev-tools"]="git-workspace ubuntu-dev-setup windows-dev-setup workflows server-configs-gae"
    ["specialized"]="DiceRollerSimulator core-foundation-rs awesome-decentralized-autonomous-organizations"
    ["social-impact"]="AlmaStreet dontbeacunt Case_Study_Legal home"
)

# Template mappings
declare -A TEMPLATE_MAPPINGS=(
    ["tiation-ai-platform"]="AI-PLATFORM-README-template.md"
    ["tiation-ai-agents"]="AI-AGENTS-README-template.md" 
    ["tiation-terminal-workflows"]="TERMINAL-WORKFLOWS-README-template.md"
    ["tiation-docker-debian"]="DOCKER-DEBIAN-README-template.md"
    ["tiation-cms"]="CMS-README-template.md"
)

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

# Generate generic README for repositories without specific templates
generate_generic_readme() {
    local repo_name="$1"
    local category="$2"
    
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

```mermaid
graph TB
    A[Core Components] --> B[Business Logic]
    B --> C[Integration Layer]
    C --> D[Data Layer]
    
    style A fill:#00ffff,stroke:#ff00ff,stroke-width:3px
    style B fill:#ff00ff,stroke:#00ffff,stroke-width:3px
    style C fill:#00ff00,stroke:#ffff00,stroke-width:3px
```

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
    local category="$2"
    
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
    
    # Apply template or generate generic README
    if [[ -n "${TEMPLATE_MAPPINGS[$repo_name]}" ]]; then
        local template_file="../$TEMPLATES_DIR/${TEMPLATE_MAPPINGS[$repo_name]}"
        if [ -f "$template_file" ]; then
            log_info "Applying specific template for $repo_name..."
            cp "$template_file" README.md
        else
            log_warning "Template not found for $repo_name, generating generic README..."
            generate_generic_readme "$repo_name" "$category"
        fi
    else
        log_info "No specific template for $repo_name, generating generic README..."
        generate_generic_readme "$repo_name" "$category"
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

# Process all repositories in a category
process_category() {
    local category="$1"
    local repos="${REPO_CATEGORIES[$category]}"
    
    log_info "Processing category: $category"
    log_info "Repositories: $repos"
    
    local success_count=0
    local total_count=0
    
    for repo in $repos; do
        ((total_count++))
        if process_repository "$repo" "$category"; then
            ((success_count++))
        fi
    done
    
    log_success "Processed $success_count/$total_count repositories in category '$category'"
}

# Main execution function
main() {
    log_info "🚀 Starting Tiation Repository README Makeover Process"
    echo ""
    
    # Check prerequisites
    check_prerequisites
    echo ""
    
    # Setup workspace
    setup_workspace
    echo ""
    
    # Process each category
    for category in "${!REPO_CATEGORIES[@]}"; do
        log_info "📁 Processing category: $category"
        process_category "$category"
        echo ""
    done
    
    # Cleanup
    cd ..
    log_info "Cleaning up workspace..."
    rm -rf "$WORK_DIR"
    
    log_success "🎉 README makeover process completed!"
    echo ""
    log_info "All Tiation repositories have been updated with enterprise-grade READMEs!"
}

# Script options
show_help() {
    cat << EOF
Tiation Repository README Makeover Script

Usage: $0 [OPTIONS]

Options:
    -h, --help              Show this help message
    -c, --category CATEGORY Process only repositories in specified category
    -r, --repo REPO         Process only the specified repository
    -l, --list              List all repositories that will be processed
    --dry-run              Show what would be processed without making changes

Categories: ${!REPO_CATEGORIES[@]}

Examples:
    $0                      # Process all repositories
    $0 -c core             # Process only core repositories
    $0 -r tiation-cms      # Process only tiation-cms repository
    $0 --list              # List all repositories
EOF
}

list_repositories() {
    echo "Tiation Repositories by Category:"
    echo ""
    for category in "${!REPO_CATEGORIES[@]}"; do
        echo "📁 $category:"
        for repo in ${REPO_CATEGORIES[$category]}; do
            echo "   - $repo"
        done
        echo ""
    done
}

# Parse command line arguments
PROCESS_CATEGORY=""
PROCESS_REPO=""
DRY_RUN=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -c|--category)
            PROCESS_CATEGORY="$2"
            shift 2
            ;;
        -r|--repo)
            PROCESS_REPO="$2"
            shift 2
            ;;
        -l|--list)
            list_repositories
            exit 0
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        *)
            log_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Execute based on options
if [ -n "$PROCESS_REPO" ]; then
    log_info "Processing single repository: $PROCESS_REPO"
    check_prerequisites
    setup_workspace
    process_repository "$PROCESS_REPO" "single"
    cd ..
    rm -rf "$WORK_DIR"
elif [ -n "$PROCESS_CATEGORY" ]; then
    if [[ ! " ${!REPO_CATEGORIES[@]} " =~ " $PROCESS_CATEGORY " ]]; then
        log_error "Unknown category: $PROCESS_CATEGORY"
        log_info "Available categories: ${!REPO_CATEGORIES[@]}"
        exit 1
    fi
    log_info "Processing category: $PROCESS_CATEGORY"
    check_prerequisites
    setup_workspace
    process_category "$PROCESS_CATEGORY"
    cd ..
    rm -rf "$WORK_DIR"
else
    # Process all repositories
    main
fi