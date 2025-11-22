# ⛔️ DEPRECATED

Article Block Slider has been deprecated and is no longer suppported by Kineo. The repo will remain for a while so anyone can fork and continue development if they wish. We encorage the community to do this.

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

# adapt-articleBlockSlider

**Article Block Slider** is a Kineo *presentation extension*.

The extension changes the presentation of an article's blocks from being vertically stacked to horizontally ordered. This is achieved by implementing a left and right or tabbing navigational element to the article. By default, the **Article Block Slider** is available on large resolutions only (medium and small resolutions can be added but are currently unsupported). When viewing at other resolutions the blocks return to being vertically stacked.

## Installation

Open the */src/extensions* folder in a new terminal window on Mac OSX or right click the folder and select 'Git Bash Here' on Windows.

Git clone the component, making sure to delete the hidden **.git** folder from the *adapt-articleBlockSlider* folder.

## Settings  

The attributes listed below are used in *articles.json* to configure **Article Block Slider**, and are properly formatted as JSON in [*example.json*](https://github.com/cgkineo/adapt-articleBlockSlider/blob/master/example.json).

**_articleBlockSlider** (object): The Article Block Slider object that contains values for **_isEnabled**, **_isDisabledWhenAccessibilityActive**, **_slideAnimationDuration**, **_heightAnimationDuration**, **_isEnabledOnScreenSizes**, **_hasTabs**, **_hasArrows**, **_startIndex**, **_hasUniformHeight**, and **_minHeight**.

>**_isEnabled** (boolean): Turns Article Block Slider on and off. Acceptable values are `true` and `false`.

>**_isDisabledWhenAccessibilityActive** (boolean): Disables this extension when accessibility is active to simplify navigation for screen reader users. Acceptable values are `true` and `false`.

>**_slideAnimationDuration** (number): Sets the slide duration, in milliseconds, of the animation between blocks.

>**_heightAnimationDuration** (number): Sets the duration, in milliseconds, of the animation between varying blocks' heights.

>**_isEnabledOnScreenSizes** (string): Defines which screen sizes the Article Block Slider displays the navigation elements on. Acceptable values are `"large"`, `"medium"` and `"small"` or combinations thereof as a space-separated list e.g. `"large medium"`.

>**_hasTabs** (boolean): Turns the tab navigation on and off. If `_hasTabs` is set to true, you must set `_hasArrows` to false. Acceptable values are `true` and `false`. 

>**_hasArrows** (boolean): Turns the arrow navigation on and off. If `_hasArrows` is set to true, you must set `_hasTabs` to false. Acceptable values are `true` and `false`. 

>**_startIndex** (number): Sets which block displays on page load.

>**_hasUniformHeight** (boolean): Sets all elements within the Article Block Slider to use the highest blocks height. Acceptable values are `true` and `false`.

>**_minHeight** (number): Sets a minimum height on the `.article-block-slider` container class.

## Limitations
 
Only one navigation element (Arrows or Tabs) should be active at any one time.  

The **Article Block Slider** and **Quicknav** extensions don't interact well together when the **Article Block Slider** is the last article on a page with an enabled **Quicknav.**  

----------------------------
**Version number:**  4.0.1  
**Framework versions:**  >=5.53.5  
**Author / maintainer:** Kineo  
**Accessibility support:** WAI AA  
**RTL support:** Partial (RTL scrolling supported)  
**Cross-platform coverage:** Chrome, Firefox, Safari, Edge

## Version 4.0.1 Changes

- **Fixed**: Replaced deprecated `Adapt` namespace accessors with direct module imports
  - `Adapt.wait` → direct `wait` import from `core/js/wait`
  - `Adapt.a11y` → direct `a11y` import from `core/js/a11y`
  - `Adapt.device` → direct `device` import from `core/js/device`
- **Improved**: Eliminates console warnings about deprecated API usage

## Version 4.0.0 Changes

This version has been completely refactored for Adapt Framework v5.53.5 compatibility:

- **ES6 Modules**: Converted from AMD/RequireJS to ES6 module syntax
- **Modern APIs**: Replaced deprecated APIs with current Adapt v5 equivalents:
  - `Adapt.accessibility.isActive()` → `Adapt.a11y.isEnabled()`
  - `.a11y_cntrl_enabled()` → `Adapt.a11y.toggleEnabled()`
  - `.a11y_on()` → `Adapt.a11y.toggleAccessible()`
  - `.imageready()` → Promise-based image loading
  - `.velocity()` → CSS transitions
  - `Adapt.wait.for()` → `Adapt.wait.queue()` with Promises
- **Modern JavaScript**: ES6+ syntax (const/let, arrow functions, template literals)
- **Improved Schema**: Updated to JSON Schema draft-04
- **Package.json**: Added npm package support  
