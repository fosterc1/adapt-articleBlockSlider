# Changelog

All notable changes to the Article Block Slider extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.3.3] - 2025-11-24

### Fixed
- **Console Errors**: Fixed uncaught exceptions in resize handlers that were cluttering console logs
  - Added comprehensive try-catch error handling to all resize methods
  - Added error logging with context for easier debugging
  - Wrapped `_onBlockSliderResize()` in try-catch block
  - Wrapped `_blockSliderResizeHeight()` in try-catch block
  - Wrapped `_blockSliderResizeWidth()` in try-catch block
  - Wrapped `_blockSliderResizeTab()` in try-catch block
  - Enhanced `_onOrientationChange()` with nested try-catch blocks for each step

- **Performance**: Improved touch event performance on mobile devices
  - Added passive event listeners for `touchstart` events (improves scroll performance)
  - Kept `touchmove` as non-passive (required for preventDefault)
  - Override `delegateEvents()` to properly attach native event listeners with passive flag
  - Eliminates browser warnings about scroll-blocking touch events

### Technical Details
- All resize operations now fail gracefully with descriptive error messages
- Console errors include method names for easy identification
- Touch events use native `addEventListener` with proper `{passive}` options
- Maintains backward compatibility - no breaking changes

## [4.3.2] - 2025-01-24

### Fixed
- **Orientation Change on Touch Devices**: Fixed background/container not resizing correctly when rotating between landscape and portrait orientations on mobile devices
  - Added dedicated `orientationchange` event listener for mobile devices
  - Improved resize sequencing with proper delays to account for browser orientation transition
  - Added forced reflows to ensure accurate dimension measurements after orientation changes
  - Ensured width is recalculated before height, and scroll positioning is updated last
- **Resize Calculation**: Enhanced `_blockSliderResizeWidth()` to force DOM reflows for accurate measurements

### Technical Details
- Modern browsers: Uses `screen.orientation` API with `change` event
- Legacy browsers: Falls back to `orientationchange` event on window
- 300ms delay after orientation change to allow browser to complete transition
- Sequential resize operations with `_.defer()` to maintain proper calculation order
- Proper cleanup of orientation listeners in `_blockSliderRemoveEventListeners()`

## [4.3.1] - 2025-01-22

### Changed
- **BREAKING**: `_isEnabled` now defaults to `false` instead of `true`
  - **Why**: The plugin was enabling itself on every article by default, which was unexpected behavior
  - **Impact**: Existing courses will need to explicitly enable the slider on articles where it's desired
  - **Benefit**: Opt-in approach prevents unintended activation and gives authors full control
- Updated documentation to clarify that the slider is disabled by default
- Added help text to `_isEnabled` property in schema

### Migration Guide
If you were relying on the slider being enabled by default:
1. Edit each article where you want the slider active
2. Expand the "Article Block Slider" section
3. Check the "Enabled" checkbox (or set `_isEnabled: true` in JSON)

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
