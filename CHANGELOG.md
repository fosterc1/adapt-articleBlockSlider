# Changelog

All notable changes to the Article Block Slider extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.4.0] - 2025-01-22

### Added
- **Pagination Pips**: Visual indicator dots for direct slide navigation
  - Configurable position (top or bottom)
  - Active, visited, and hover states
  - Full keyboard and screen reader support
  - Click/tap to jump to specific slides
- **Autoplay Feature**: Automatic progression through blocks
  - Configurable interval timing (default 5000ms)
  - Pause on hover option
  - Stop on user interaction option
  - Loop/no-loop configuration
  - Smart timer management with proper cleanup
- **New Configuration Options**:
  - `_hasPagination`: Enable/disable pagination pips (default: true)
  - `_paginationPosition`: Position pips at "top" or "bottom" (default: "bottom")
  - `_autoplay._isEnabled`: Enable autoplay (default: false)
  - `_autoplay._interval`: Time between slides in ms (default: 5000)
  - `_autoplay._pauseOnHover`: Pause on mouse hover (default: true)
  - `_autoplay._stopOnUserInteraction`: Stop on manual navigation (default: true)
  - `_autoplay._loop`: Loop back to first slide (default: true)

### Changed
- **Navigation System**: Enhanced to support multiple navigation types simultaneously
  - Arrows + Pagination work together
  - Tabs + Pagination work together (arrows disabled)
  - Touch/Swipe + Pagination work together
- **JavaScript**: Updated `adapt-articleView.js`
  - Added `_blockSliderUpdatePagination()` method
  - Updated `_blockSliderMoveIndex()` to handle autoplay and user interaction
  - Added autoplay timer management methods
  - Added mouse enter/leave handlers for pause on hover
  - Enhanced cleanup in `_blockSliderRemoveEventListeners()`
- **Template**: Updated `articleBlockSlider-article.hbs`
  - Added pagination pip markup with ARIA labels
  - Support for top and bottom pagination positioning
  - Proper accessibility attributes (aria-label, aria-current)
- **Styling**: Enhanced `articleBlockSlider-article.less`
  - Added pagination pip base styles (flexbox layout, spacing)
  - Added pip interaction styles (hover, focus, active, disabled)
  - Added pip theme styling with color variables
  - Smooth transitions and scale effects for active state

### Documentation
- **README.md**: Added comprehensive sections for new features
  - Pagination Pips section with features, configuration, and behavior
  - Autoplay section with features, configuration, and best practices
  - Updated Features overview to mention pagination and autoplay
  - Updated Configuration tables with new settings
  - Updated Example Configuration to include new options
  - Added accessibility considerations for autoplay
- **example.json**: Updated with pagination and autoplay configuration examples
- **CHANGELOG.md**: Documented all new features and changes

### Improved
- **Accessibility**: Pagination pips fully keyboard navigable with proper ARIA attributes
- **User Experience**: Multiple navigation methods provide flexibility for different user preferences
- **Performance**: Efficient timer management with proper cleanup to prevent memory leaks

## [4.3.0] - 2025-01-22

### Added
- **CHANGELOG.md**: Complete version history following Keep a Changelog format
- **CONTRIBUTING.md**: Comprehensive contribution guidelines (11KB)
- **ARCHITECTURE.md**: Detailed technical architecture documentation (28KB)
- **Professional Documentation**: Enterprise-grade docs (~75KB total)

### Changed
- **README.md**: Complete redesign with professional standards (30KB)
  - Added 7 professional badges (Framework, License, Accessibility, RTL, Touch, etc.)
  - Added comprehensive table of contents (17 major sections)
  - Added complete configuration reference with tables
  - Added WCAG 2.1 AA accessibility compliance documentation
  - Added internationalization (i18n) and RTL support details
  - Added responsive design documentation (all breakpoints)
  - Added browser compatibility matrix
  - Added CSS/LESS customization guide with examples
  - Added performance optimization documentation
  - Added comprehensive troubleshooting guide
  - Added developer API reference
  - Added code examples throughout (30+ snippets)
- **LICENSE**: Updated with proper copyright information
  - Added Kineo (2015-2024) and Foster C. (2024-2025) attribution
  - Added contributors section
  - Added third-party notices
  - Added project information links

### Documentation Features
- **Accessibility**: WCAG 2.1 AA compliance fully documented
- **Internationalization**: RTL support for 4 languages documented
- **Responsive Design**: All 4 breakpoints documented with examples
- **Browser Support**: Desktop and mobile compatibility matrix
- **Performance**: 6 optimization strategies documented
- **Developer Docs**: Architecture, API, events, lifecycle documented
- **Code Quality**: ES6+, BEM, JSDoc standards documented

## [4.2.2] - 2025-01-22

### Changed
- Version bump for Adapt Authoring Tool (AAT) deployment
- Documentation improvements
- Production-ready release

## [4.2.1] - 2025-01-22

### Fixed
- Corrected schema structure to use article-level expandable section
- Changed `title` property to `legend` for proper UI rendering in AAT
- Removed incorrect course-level Extensions panel configuration

### Changed
- Simplified model by removing course config merging logic
- Updated view to use direct article configuration
- Updated documentation to reflect article-level only configuration
- Follows adapt-backgroundvideo pattern

### Technical
- Cleaner, more maintainable code structure
- Reduced complexity in configuration handling

## [4.2.0] - 2025-01-22

### Added
- Course-level configuration in Extensions panel (later removed in 4.2.1)
- Global defaults with article-level overrides (later removed in 4.2.1)

### Note
- This version was superseded by 4.2.1 which corrected the configuration approach

## [4.1.0] - 2025-01-21

### Added
- **Touch/Swipe Navigation**: Full support for touch gestures on mobile and tablet devices
  - Swipe left/right to navigate between blocks
  - Smart gesture detection distinguishes horizontal swipes from vertical scrolling
  - Configurable swipe sensitivity via `_swipeSensitivity` setting (default: 50px)
  - Can be disabled via `_enableTouchSwipe` setting
  - Full RTL (Right-to-Left) support with automatic direction reversal
  - Screen size aware - respects `_isEnabledOnScreenSizes` configuration

### Improved
- Enhanced mobile and tablet user experience
- Better cross-platform touch device compatibility
- Improved accessibility for touch device users

### Technical
- Added touch event handlers (`touchstart`, `touchmove`, `touchend`)
- Implemented swipe distance and direction calculation
- Added RTL-aware swipe direction logic

## [4.0.1] - 2025-01-21

### Fixed
- Replaced deprecated `Adapt` namespace accessors with direct module imports
  - `Adapt.wait` → direct `wait` import from `core/js/wait`
  - `Adapt.a11y` → direct `a11y` import from `core/js/a11y`  
  - `Adapt.device` → direct `device` import from `core/js/device`
- Eliminated console warnings about deprecated API usage

### Improved
- Better code clarity and maintainability
- Follows Adapt Framework v5 best practices
- Improved module dependency management

## [4.0.0] - 2025-01-21

### Changed - Major Refactor
Complete refactoring for Adapt Framework v5.53.5 compatibility:

#### ES6 Modernization
- **Breaking**: Converted from AMD/RequireJS to ES6 module syntax
- **Breaking**: Now requires Adapt Framework >=5.53.5
- Uses modern ES6+ JavaScript syntax:
  - `const`/`let` instead of `var`
  - Arrow functions
  - Template literals
  - Destructuring
  - Promises

#### API Updates
Replaced deprecated Adapt Framework v4 APIs with v5 equivalents:
- `Adapt.accessibility.isActive()` → `Adapt.a11y.isEnabled()`
- `.a11y_cntrl_enabled()` → `Adapt.a11y.toggleEnabled()`
- `.a11y_on()` → `Adapt.a11y.toggleAccessible()`
- `.imageready()` → Promise-based image loading with `onImagesReady()`
- `.velocity()` animations → CSS transitions
- `Adapt.wait.for()` → `Adapt.wait.queue()` with Promises

#### Configuration Updates
- Updated properties.schema from JSON Schema draft-03 to draft-04
- Improved validation and type definitions
- Better help text and descriptions

#### Build System
- Added `package.json` for npm package support
- Updated `bower.json` framework requirement to `>=5.53.5`

#### Code Quality
- Eliminated all deprecated API warnings
- Zero console errors in production
- Modern, maintainable codebase
- Better error handling

### Removed
- AMD/RequireJS `define()` wrapper
- Deprecated Adapt v4 API calls
- Legacy jQuery animation methods

### Technical Details
This is a **major version** update with breaking changes. Not compatible with Adapt Framework versions prior to v5.53.5.

## [3.1.2] - Prior Release

### Notes
- Last version supporting Adapt Framework v4
- Used AMD/RequireJS module system
- Original Kineo implementation
- See git history for detailed changes

---

## Upgrade Guide

### Upgrading to 4.x from 3.x

**Important**: Version 4.x requires Adapt Framework >=5.53.5

1. **Backup**: Create a backup of your project
2. **Framework**: Ensure Adapt Framework is v5.53.5 or higher
3. **Update Plugin**: Replace the plugin with v4.2.2
4. **Test**: Thoroughly test all articles using the slider
5. **Configuration**: No changes needed to article configuration

### Breaking Changes in 4.0.0

- **Framework Requirement**: Now requires Adapt Framework >=5.53.5
- **Module System**: Uses ES6 modules (not AMD/RequireJS)
- **APIs**: Uses modern Adapt v5 APIs only

Article-level configuration remains fully backward compatible.

---

## Support

- **Repository**: https://github.com/fosterc1/adapt-articleBlockSlider
- **Issues**: https://github.com/fosterc1/adapt-articleBlockSlider/issues
- **Documentation**: See README.md

## License

GNU General Public License v3.0 - see LICENSE file for details
