# Changelog

All notable changes to the Article Block Slider extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
