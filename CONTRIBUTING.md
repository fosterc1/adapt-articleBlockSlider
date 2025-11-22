# Contributing to Article Block Slider

Thank you for your interest in contributing to the Article Block Slider extension! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Harassment of any kind
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **Git**: v2.0.0 or higher
- **Adapt CLI**: v5.0.0 or higher (optional but recommended)

### Fork and Clone

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/adapt-articleBlockSlider.git
cd adapt-articleBlockSlider
```

3. **Add upstream** remote:

```bash
git remote add upstream https://github.com/fosterc1/adapt-articleBlockSlider.git
```

4. **Create a branch** for your feature:

```bash
git checkout -b feature/your-feature-name
```

## Development Setup

### Install Dependencies

The extension doesn't have runtime dependencies, but you may want development tools:

```bash
# For LESS compilation (if customizing styles)
npm install -g less

# For code quality
npm install -g eslint
```

### Integrate with Adapt Framework

To test the extension:

1. **Create or use an existing Adapt course**:

```bash
adapt create course my-test-course
cd my-test-course
```

2. **Link your extension**:

```bash
# Remove existing version if present
rm -rf src/extensions/adapt-articleBlockSlider

# Link your development version
ln -s /path/to/your/adapt-articleBlockSlider src/extensions/adapt-articleBlockSlider
```

3. **Build and run**:

```bash
adapt dev-server
```

## Making Changes

### Branch Naming Convention

Use descriptive branch names:

- **Features**: `feature/description`
- **Bug Fixes**: `fix/description`
- **Documentation**: `docs/description`
- **Refactoring**: `refactor/description`
- **Tests**: `test/description`

Examples:
- `feature/add-fade-animation`
- `fix/rtl-swipe-direction`
- `docs/improve-readme`

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(navigation): add keyboard shortcuts for slider navigation

- Add Home/End keys for first/last slide
- Add Arrow keys for previous/next when focused
- Update accessibility documentation

Closes #123
```

```
fix(touch): correct RTL swipe direction

In RTL mode, swipe left should go to previous slide,
not next slide. Fixed the direction logic.

Fixes #456
```

### Keep Your Fork Updated

Regularly sync with upstream:

```bash
git fetch upstream
git checkout master
git merge upstream/master
git push origin master
```

## Coding Standards

### JavaScript (ES6+)

**Style Guide**: Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

**Key Points:**

```javascript
// Use const/let, not var
const config = this.model.get('_articleBlockSlider');
let currentIndex = 0;

// Arrow functions for callbacks
slides.forEach((slide, index) => {
  // Process slide
});

// Template literals
const message = `Navigating to slide ${index}`;

// Destructuring
const { _isEnabled, _hasArrows } = config;

// Default parameters
function navigate(index = 0, animate = true) {
  // ...
}

// Async/await for promises
async function loadImages() {
  await this.onImagesReady();
  this.render();
}
```

**Module Imports:**

```javascript
// Core imports
import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import device from 'core/js/device';
import wait from 'core/js/wait';

// Local imports
import ArticleView from 'core/js/views/articleView';
```

### CSS/LESS

**Style Guide**: Follow BEM (Block Element Modifier) methodology

**Structure:**

```less
// Block
.abs {
  
  // Element
  &__container {
    // Styles
  }
  
  // Element with modifier
  &__button {
    &.is-disabled {
      // Modifier styles
    }
  }
  
  // Nested element
  &__toolbar {
    &-bottom {
      // Nested styles
    }
  }
}

// State classes
.is-active { }
.is-disabled { }
.is-hidden { }
.has-arrows { }
.has-tabs { }
```

**Variables:**

```less
// Use semantic variable names
@abs-primary-color: @button-color;
@abs-spacing: @item-spacing;

// Not hardcoded values
// ❌ Bad
.abs__button {
  margin: 20px;
  color: #007bff;
}

// ✅ Good
.abs__button {
  margin: @abs-button-spacing;
  color: @abs-button-color;
}
```

### Handlebars Templates

**Guidelines:**

```handlebars
{{!-- Use descriptive comments --}}

{{!-- Check for data before rendering --}}
{{#if displayTitle}}
  <div class="article__title">
    {{{compile displayTitle}}}
  </div>
{{/if}}

{{!-- Use compile helper for rich text --}}
{{{compile body}}}

{{!-- Use appropriate accessibility attributes --}}
<button aria-label="{{_globals._accessibility._ariaLabels.next}}">
```

### Documentation

**JSDoc Comments:**

```javascript
/**
 * Navigate to a specific block index
 * @param {number} index - The zero-based index of the block to navigate to
 * @param {boolean} [animate=true] - Whether to animate the transition
 * @returns {void}
 */
_blockSliderMoveIndex(index, animate = true) {
  // Implementation
}
```

**Inline Comments:**

```javascript
// Single-line for simple explanations
const width = this.$el.width(); // Container width

/**
 * Multi-line for complex logic
 * Calculate the swipe direction based on touch delta
 * In RTL mode, the direction is reversed
 */
const direction = isRTL ? -touchDelta : touchDelta;
```

## Testing

### Manual Testing Checklist

Before submitting, test the following:

#### Functionality
- [ ] Slider navigation (arrows/tabs) works
- [ ] Touch/swipe gestures work on touch devices
- [ ] Animations are smooth (60 FPS)
- [ ] All configuration options work as expected
- [ ] Starting index is respected
- [ ] Uniform height option works correctly

#### Accessibility
- [ ] Keyboard navigation works (Tab, Arrow keys, Home, End)
- [ ] Screen reader announces slide changes
- [ ] Focus is managed correctly
- [ ] All interactive elements are labeled
- [ ] Accessibility mode disables slider correctly

#### Responsive Design
- [ ] Works on all breakpoints (small, medium, large, xlarge)
- [ ] `_isEnabledOnScreenSizes` configuration works
- [ ] Orientation changes handled correctly
- [ ] Touch targets are appropriately sized

#### RTL Support
- [ ] Slider direction reverses in RTL mode
- [ ] Swipe gestures reverse in RTL mode
- [ ] Navigation buttons positioned correctly
- [ ] Text alignment is correct

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari
- [ ] Android Chrome

### Automated Testing

Currently, the extension doesn't have automated tests. Contributions to add tests are welcome!

**Potential Test Frameworks:**
- Jest for unit tests
- Cypress for e2e tests
- Playwright for cross-browser testing

## Submitting Changes

### Pull Request Process

1. **Update Documentation**
   - Update README.md if adding features
   - Update CHANGELOG.md with your changes
   - Add JSDoc comments to new functions
   - Update example.json if adding configuration options

2. **Code Quality**
   - Ensure no console errors or warnings
   - Remove debug code and console.logs
   - Check for proper indentation
   - Validate HTML/CSS

3. **Commit Your Changes**

```bash
git add .
git commit -m "feat: add description of your feature"
```

4. **Push to Your Fork**

```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?
- [ ] Manual testing on desktop
- [ ] Manual testing on mobile
- [ ] Accessibility testing
- [ ] Cross-browser testing

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] No console errors
- [ ] Accessibility maintained
- [ ] Cross-browser tested
- [ ] Mobile tested

## Screenshots (if applicable)
Add screenshots or GIFs

## Related Issues
Closes #issue_number
```

### Review Process

1. **Automated Checks**: PR must pass any CI/CD checks (if configured)
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any feedback or requested changes
4. **Approval**: Once approved, your PR will be merged
5. **Release**: Changes included in next release

## Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (0.x.0): New features (backward compatible)
- **PATCH** (0.0.x): Bug fixes (backward compatible)

### Release Checklist

For maintainers releasing new versions:

1. **Update Version**
   - `package.json`
   - `bower.json`
   - `README.md`

2. **Update CHANGELOG.md**
   - Add release date
   - Categorize changes (Added, Changed, Fixed, etc.)
   - Link to PRs and issues

3. **Create Git Tag**

```bash
git tag -a v4.2.3 -m "Release version 4.2.3"
git push origin v4.2.3
```

4. **Create GitHub Release**
   - Go to Releases on GitHub
   - Click "Draft a new release"
   - Select the tag
   - Add release notes from CHANGELOG
   - Publish release

5. **Announce Release**
   - Update community forums
   - Post on social media (if applicable)
   - Notify major users

## Questions?

- **General Questions**: Open a [Discussion](https://github.com/fosterc1/adapt-articleBlockSlider/discussions)
- **Bug Reports**: Open an [Issue](https://github.com/fosterc1/adapt-articleBlockSlider/issues)
- **Security Issues**: Email maintainers directly

## Thank You!

Your contributions make the Adapt Learning community stronger. Thank you for taking the time to contribute! 🎉

---

**Happy Coding!** 🚀
