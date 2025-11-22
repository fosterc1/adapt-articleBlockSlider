# Article Block Slider - Technical Architecture

This document provides a comprehensive overview of the Article Block Slider extension's technical architecture, design patterns, and implementation details.

## Table of Contents

- [Overview](#overview)
- [Architecture Patterns](#architecture-patterns)
- [File Structure](#file-structure)
- [Component Lifecycle](#component-lifecycle)
- [Module System](#module-system)
- [Data Flow](#data-flow)
- [Event System](#event-system)
- [Rendering Pipeline](#rendering-pipeline)
- [Touch & Gesture Handling](#touch--gesture-handling)
- [Accessibility Implementation](#accessibility-implementation)
- [Responsive Design System](#responsive-design-system)
- [Performance Optimization](#performance-optimization)
- [Error Handling](#error-handling)
- [Testing Strategy](#testing-strategy)

---

## Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Adapt Framework                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               Article Block Slider                    │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────┐ │  │
│  │  │   Model    │  │    View    │  │   Extension    │ │  │
│  │  │  (Logic)   │◄─┤   (UI)     │◄─┤   (Entry)      │ │  │
│  │  └────────────┘  └────────────┘  └────────────────┘ │  │
│  │         │               │                │           │  │
│  │         ▼               ▼                ▼           │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │           Adapt Core Services               │    │  │
│  │  │  (a11y, device, wait, events)               │    │  │
│  │  └─────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Core Components

1. **Entry Point** (`articleBlockSlider.js`)
   - Initializes extension
   - Imports required modules
   - No business logic

2. **Extension** (`adapt-articleExtension.js`)
   - Extends Adapt ArticleView and ArticleModel
   - Conditional application based on configuration
   - Acts as integration layer

3. **Model** (`adapt-articleModel.js`)
   - Business logic and state management
   - Configuration validation
   - Data transformation

4. **View** (`adapt-articleView.js`)
   - UI rendering and updates
   - Event handling
   - DOM manipulation
   - Touch gesture management

---

## Architecture Patterns

### 1. Model-View Extension Pattern

The extension uses Adapt's extension pattern to augment existing ArticleView and ArticleModel:

```javascript
// adapt-articleExtension.js
export default class ArticleExtension extends Backbone.Controller {
  
  initialize() {
    // Extend only if configuration exists
    this.listenTo(Adapt, 'adapt:initialize', this._onAdaptInitialize);
  }
  
  _onAdaptInitialize() {
    // Conditionally extend views and models
    if (ArticleModel.prototype.hasOwnProperty('_articleBlockSlider')) {
      _.extend(ArticleView.prototype, BlockSliderView);
      _.extend(ArticleModel.prototype, BlockSliderModel);
    }
  }
}
```

### 2. Mixin Pattern

Business logic is separated into mixins:

```javascript
// Model Mixin
const BlockSliderModel = {
  isBlockSliderEnabled() {
    // Logic here
  }
};

// View Mixin
const BlockSliderView = {
  render() {
    // Override render
  }
};

// Apply mixins
_.extend(ArticleModel.prototype, BlockSliderModel);
_.extend(ArticleView.prototype, BlockSliderView);
```

### 3. Event-Driven Architecture

Uses Backbone's event system extensively:

```javascript
// Listen to framework events
this.listenTo(Adapt, 'device:changed', this._onDeviceChanged);
this.listenTo(Adapt, 'page:scrollTo', this._onPageScrollTo);

// Trigger custom events
Adapt.trigger('articleBlockSlider:ready', this);
Adapt.trigger('articleBlockSlider:afterSlide', { index: currentIndex });
```

### 4. Promise-Based Async Operations

Modern promise-based approach for async operations:

```javascript
_blockSliderPreRender() {
  this._readyPromise = new Promise(resolve => {
    this.resolveQueue = resolve;
  });
  
  wait.queue(this._readyPromise);
  
  // Later, resolve when ready
  this.resolveQueue();
}
```

---

## File Structure

```
adapt-articleBlockSlider/
│
├── js/                          # JavaScript source files
│   ├── articleBlockSlider.js    # Entry point, imports all modules
│   ├── adapt-articleExtension.js # Extends Article View/Model
│   ├── adapt-articleModel.js    # Business logic mixin
│   └── adapt-articleView.js     # UI logic mixin
│
├── less/                        # Stylesheets
│   └── articleBlockSlider-article.less # All styles
│
├── templates/                   # Handlebars templates
│   └── articleBlockSlider-article.hbs # HTML structure
│
├── properties.schema            # Configuration schema (JSON Schema v4)
├── bower.json                   # Bower package definition
├── package.json                 # NPM package definition
├── example.json                 # Example configuration
│
├── README.md                    # User documentation
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guidelines
├── ARCHITECTURE.md              # This file
└── LICENSE                      # GPL-3.0 license
```

### Purpose of Each File

#### JavaScript Files

**articleBlockSlider.js**
- Entry point for the extension
- Imports and initializes ArticleExtension
- No business logic

**adapt-articleExtension.js**
- Extends Adapt's ArticleView and ArticleModel
- Conditional extension based on `_articleBlockSlider` configuration
- Integration layer between extension and framework

**adapt-articleModel.js**
- Contains `BlockSliderModel` mixin
- Business logic: `isBlockSliderEnabled()`
- Configuration validation
- Accessibility checks

**adapt-articleView.js**
- Contains `BlockSliderView` mixin
- UI rendering and DOM manipulation
- Event handling
- Touch gesture management
- Animation control

#### Template File

**articleBlockSlider-article.hbs**
- Handlebars template for slider structure
- Responsive HTML structure
- ARIA attributes for accessibility
- Conditional rendering (arrows/tabs)

#### Style File

**articleBlockSlider-article.less**
- All extension styles
- BEM naming convention
- Responsive breakpoints
- RTL support
- Animation definitions

---

## Component Lifecycle

### Initialization Flow

```
1. Adapt Framework Loads
   └─> articleBlockSlider.js imported
       └─> adapt-articleExtension.js initialized
           └─> Listens for 'adapt:initialize'

2. Adapt Initializes
   └─> 'adapt:initialize' triggered
       └─> Extension checks for _articleBlockSlider config
           └─> Extends ArticleView with BlockSliderView
           └─> Extends ArticleModel with BlockSliderModel

3. Article Model Created
   └─> isBlockSliderEnabled() called
       ├─> Checks _isEnabled
       ├─> Checks accessibility state
       └─> Returns true/false

4. Article View Created
   └─> render() called
       └─> If slider enabled:
           ├─> _blockSliderRender()
           ├─> _blockSliderSetupTouchConfiguration()
           ├─> _blockSliderSetupEventListeners()
           └─> _blockSliderConfigureVariables()

5. Template Rendered
   └─> HTML structure created
       ├─> Blocks container
       ├─> Navigation controls
       └─> ARIA attributes

6. Post-Render
   └─> Images loaded
       └─> _blockSliderPostRender()
           ├─> Configure initial state
           ├─> Setup dimensions
           └─> Trigger 'ready' event

7. User Interaction
   └─> Navigation triggered
       ├─> Button click
       ├─> Touch gesture
       └─> Keyboard shortcut
           └─> _blockSliderMoveIndex()
               ├─> Animate transition
               ├─> Update active state
               └─> Manage focus

8. Cleanup
   └─> View removed
       └─> Event listeners destroyed
       └─> Resources freed
```

### Detailed Method Lifecycle

```javascript
// 1. Initialization
initialize() {
  // Set up initial state
  this._blockSliderPreRender();
}

// 2. Pre-Render Setup
_blockSliderPreRender() {
  this._blockSliderSetupTouchConfiguration();
  this._blockSliderSetupEventListeners();
  // Create ready promise
}

// 3. Rendering
render() {
  if (this.model.isBlockSliderEnabled()) {
    this._blockSliderRender();
  }
}

_blockSliderRender() {
  this._blockSliderConfigureVariables();
  // Render template
  this.addChildren(); // Add blocks
  this.delegateEvents();
  // Wait for images
  this.onImagesReady().then(() => {
    this._blockSliderPostRender();
  });
}

// 4. Post-Render
_blockSliderPostRender() {
  this._blockSliderConfigureControls(false);
  const startIndex = this._blockSliderConfig._startIndex || 0;
  this._blockSliderMoveIndex(startIndex, false);
  this._onBlockSliderReady();
}

// 5. Interaction Handling
_onBlockSliderClick(event) {
  const action = $(event.currentTarget).data('block-slider');
  switch(action) {
    case 'left': this._blockSliderMoveLeft(); break;
    case 'right': this._blockSliderMoveRight(); break;
    case 'index': this._blockSliderMoveIndex(index); break;
  }
}

// 6. Animation & State Update
_blockSliderMoveIndex(index, animate = true) {
  // Validate index
  // Trigger beforeSlide event
  // Apply CSS transitions
  // Update active states
  // Trigger afterSlide event
  // Manage focus
}

// 7. Cleanup
remove() {
  this.stopListening();
  // Parent remove
}
```

---

## Module System

### ES6 Modules

The extension uses ES6 module syntax (not AMD/RequireJS):

```javascript
// Import from Adapt core
import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import device from 'core/js/device';
import wait from 'core/js/wait';

// Import from Adapt views
import ArticleView from 'core/js/views/articleView';
import ArticleModel from 'core/js/models/articleModel';

// Export module
export default BlockSliderView;
```

### Module Dependencies

```
articleBlockSlider.js
└── adapt-articleExtension.js
    ├── adapt-articleModel.js
    │   ├── core/js/a11y
    │   └── (no other dependencies)
    └── adapt-articleView.js
        ├── core/js/adapt
        ├── core/js/a11y
        ├── core/js/device
        ├── core/js/wait
        ├── core/js/views/articleView
        └── adapt-articleModel.js
```

### Circular Dependency Avoidance

The architecture avoids circular dependencies through:

1. **One-Way Dependencies**: View depends on Model, not vice versa
2. **Event-Based Communication**: Use Adapt events instead of direct calls
3. **Minimal Coupling**: Each module has clear, focused responsibility

---

## Data Flow

### Configuration Loading

```
course.json
    └─> articles.json
        └─> _articleBlockSlider: { ... }
            └─> ArticleModel.get('_articleBlockSlider')
                └─> BlockSliderView._blockSliderConfig
```

### State Management

```javascript
// Model State (Data)
model: {
  _articleBlockSlider: {
    _isEnabled: true,
    _hasArrows: true,
    // ... configuration
  }
}

// View State (UI)
view: {
  _currentIndex: 0,
  _totalBlocks: 5,
  _blockSliderConfig: { ... },
  _enableTouchSwipe: true,
  _touchStartX: 0,
  _touchCurrentX: 0
}
```

### Data Transformation

```javascript
// Raw configuration → Processed data

// 1. Model validates configuration
isBlockSliderEnabled() {
  const config = this.get('_articleBlockSlider');
  // Validate and return boolean
}

// 2. View processes configuration
_blockSliderSetupTouchConfiguration() {
  const config = this.model.get('_articleBlockSlider');
  this._blockSliderConfig = config;
  this._minSwipeDistance = config._swipeSensitivity || 50;
}

// 3. View transforms data for rendering
_blockSliderConfigureVariables() {
  const blocks = this.model.getChildren().models;
  const itemButtons = blocks.map((block, i) => ({
    _className: (i === 0 ? 'home' : 'not-home') + (' i'+i),
    _index: i,
    _title: block.get('displayTitle') || `Block ${i+1}`
  }));
  
  this.model.set('_itemButtons', itemButtons);
}
```

---

## Event System

### Framework Events (Listened To)

```javascript
// Device events
Adapt.on('device:changed', handler);
Adapt.on('device:resize', handler);

// Page events
Adapt.on('page:scrollTo', handler);
Adapt.on('page:scrolledTo', handler);

// Model events
model.on('change:_isReady', handler);

// Adapt lifecycle
Adapt.on('adapt:initialize', handler);
Adapt.on('remove', handler);
```

### Custom Events (Triggered)

```javascript
// Extension lifecycle events
Adapt.trigger('articleBlockSlider:ready', view);
Adapt.trigger('articleBlockSlider:beforeSlide', { from, to, view });
Adapt.trigger('articleBlockSlider:afterSlide', { index, view });

// View render events
Adapt.trigger(this.constructor.type + 'View:preRender', this);
Adapt.trigger(this.constructor.type + 'View:render', this);
```

### Event Flow Example

```
User clicks "Next" button
    └─> _onBlockSliderClick()
        └─> _blockSliderMoveRight()
            └─> _blockSliderMoveIndex(newIndex, true)
                ├─> Adapt.trigger('articleBlockSlider:beforeSlide', ...)
                ├─> Apply CSS transform
                ├─> Wait for animation
                ├─> Update active states
                ├─> Adapt.trigger('articleBlockSlider:afterSlide', ...)
                └─> Update focus
```

### Event Handling Best Practices

```javascript
// 1. Use listenTo (auto-cleanup)
this.listenTo(Adapt, 'device:changed', this._onDeviceChanged);

// 2. Bind callbacks
this._blockSliderResizeHeight = this._blockSliderResizeHeight.bind(this);

// 3. Debounce frequent events
this._blockSliderHideOthers = _.debounce(
  this._blockSliderHideOthers.bind(this),
  200
);

// 4. Stop listening on remove
remove() {
  this.stopListening();
  ArticleView.prototype.remove.call(this);
}
```

---

## Rendering Pipeline

### Template Rendering

```javascript
// 1. Get data from model
const data = this.model.toJSON();

// 2. Get compiled template
const template = Handlebars.templates['articleBlockSlider-article'];

// 3. Render HTML
this.$el.html(template(data));

// 4. Add CSS classes
this.$el.addClass('abs');

// 5. Delegate events
this.delegateEvents();

// 6. Add child blocks
this.addChildren();
```

### Dynamic Element Creation

```javascript
// Blocks are added as child views
this.addChildren();
  └─> For each block model:
      └─> Create BlockView
          └─> Render block
              └─> Append to .js-abs-block-container
```

### CSS-Based Animation

```javascript
// Apply transform for sliding
this.$('.js-abs-block-container').css({
  'transform': `translateX(${offset}px)`,
  'transition': `transform ${duration}ms ease-in-out`
});

// Height animation
this.$('.js-abs-slide-container').css({
  'height': `${height}px`,
  'transition': `height ${duration}ms ease-in-out`
});
```

### Responsive Updates

```javascript
_onBlockSliderResize() {
  // Debounced resize handler
  _.debounce(() => {
    this._blockSliderResizeHeight();
    this._blockSliderConfigureControls(false);
  }, 200);
}

_onBlockSliderDeviceChanged() {
  // Screen size changed
  const sizes = this._blockSliderConfig._isEnabledOnScreenSizes.split(' ');
  const currentSize = device.screenSize;
  
  if (sizes.indexOf(currentSize) === -1) {
    // Disable slider on this size
    this._blockSliderDisable();
  } else {
    // Enable slider
    this._blockSliderEnable();
  }
}
```

---

## Touch & Gesture Handling

### Touch Event Flow

```
touchstart
    └─> _onTouchStart(event)
        ├─> Store touchStartX, touchStartY
        ├─> Store touchStartTime
        └─> Set _isSwiping = false

touchmove
    └─> _onTouchMove(event)
        ├─> Calculate touchCurrentX, touchCurrentY
        ├─> Calculate deltaX, deltaY
        ├─> Detect swipe direction (horizontal vs vertical)
        ├─> If horizontal: prevent scroll, set _isSwiping = true
        └─> If vertical: allow scroll, ignore swipe

touchend
    └─> _onTouchEnd(event)
        ├─> If !_isSwiping: return
        ├─> Calculate total swipe distance
        ├─> Compare to _minSwipeDistance
        ├─> Determine direction (left/right)
        ├─> Account for RTL mode
        └─> Trigger navigation
            ├─> Swipe left: _blockSliderMoveRight() (or left in RTL)
            └─> Swipe right: _blockSliderMoveLeft() (or right in RTL)
```

### Implementation

```javascript
_onTouchStart(event) {
  if (!this._enableTouchSwipe) return;
  
  const touch = event.touches[0] || event.changedTouches[0];
  this._touchStartX = touch.pageX;
  this._touchStartY = touch.pageY;
  this._touchStartTime = Date.now();
  this._isSwiping = false;
}

_onTouchMove(event) {
  if (!this._enableTouchSwipe || !this._touchStartX) return;
  
  const touch = event.touches[0] || event.changedTouches[0];
  this._touchCurrentX = touch.pageX;
  this._touchCurrentY = touch.pageY;
  
  const deltaX = Math.abs(this._touchCurrentX - this._touchStartX);
  const deltaY = Math.abs(this._touchCurrentY - this._touchStartY);
  
  // Detect horizontal swipe
  if (deltaX > deltaY && deltaX > 10) {
    event.preventDefault(); // Prevent scroll
    this._isSwiping = true;
  }
}

_onTouchEnd(event) {
  if (!this._enableTouchSwipe || !this._isSwiping) {
    this._resetTouch();
    return;
  }
  
  const distance = this._touchCurrentX - this._touchStartX;
  const absDistance = Math.abs(distance);
  
  if (absDistance >= this._minSwipeDistance) {
    const isRTL = $('html').hasClass('dir-rtl');
    
    if (distance > 0) {
      // Swipe right
      isRTL ? this._blockSliderMoveRight() : this._blockSliderMoveLeft();
    } else {
      // Swipe left  
      isRTL ? this._blockSliderMoveLeft() : this._blockSliderMoveRight();
    }
  }
  
  this._resetTouch();
}

_resetTouch() {
  this._touchStartX = 0;
  this._touchStartY = 0;
  this._touchCurrentX = 0;
  this._touchCurrentY = 0;
  this._isSwiping = false;
}
```

### RTL Support

```javascript
// Determine navigation direction
const isRTL = $('html').hasClass('dir-rtl');

// Reverse swipe logic for RTL
if (isRTL) {
  // In RTL: swipe right = next, swipe left = previous
  swipeRight ? moveNext() : movePrevious();
} else {
  // In LTR: swipe left = next, swipe right = previous
  swipeLeft ? moveNext() : movePrevious();
}
```

---

## Accessibility Implementation

### ARIA Structure

```html
<!-- Main container with role and label -->
<div class="abs__container" 
     role="region"
     tabindex="0"
     aria-label="Block slider navigation">
  
  <!-- Slide container -->
  <div class="abs__slide-container">
    <!-- Blocks with proper structure -->
  </div>
  
  <!-- Navigation controls -->
  <div class="abs__toolbar">
    <!-- Arrow buttons with labels -->
    <button class="abs__btn-arrow is-left"
            aria-label="Previous slide">
      <div class="icon"></div>
    </button>
    
    <button class="abs__btn-arrow is-right"
            aria-label="Next slide">
      <div class="icon"></div>
    </button>
    
    <!-- Tab buttons with labels -->
    <button class="abs__btn-tab"
            aria-label="Slide 1: Introduction"
            data-block-slider-index="0">
      <div class="abs__btn-title">
        <div class="abs__btn-title-inner">
          Introduction
        </div>
      </div>
    </button>
  </div>
</div>
```

### Keyboard Navigation

```javascript
// Keyboard event handling
_onKeyDown(event) {
  const key = event.which || event.keyCode;
  
  switch(key) {
    case 37: // Left arrow
      event.preventDefault();
      this._blockSliderMoveLeft();
      break;
    case 39: // Right arrow
      event.preventDefault();
      this._blockSliderMoveRight();
      break;
    case 36: // Home
      event.preventDefault();
      this._blockSliderMoveIndex(0);
      break;
    case 35: // End
      event.preventDefault();
      this._blockSliderMoveIndex(this._totalBlocks - 1);
      break;
  }
}
```

### Focus Management

```javascript
_blockSliderMoveIndex(index, animate = true) {
  // Navigate to slide
  
  // Update focus
  setTimeout(() => {
    // Focus first focusable element in current slide
    const $currentSlide = this.$('.js-abs-block-container')
      .find('.block')
      .eq(index);
    
    const $focusable = $currentSlide.find(
      'a, button, input, [tabindex]:not([tabindex="-1"])'
    ).first();
    
    if ($focusable.length) {
      $focusable.focus();
    }
  }, animate ? duration : 0);
}
```

### Screen Reader Announcements

```javascript
// Announce slide changes
_announceSlideChange(index) {
  const $liveRegion = this.$('.js-live-region');
  const slideTitle = this.$('.block').eq(index).find('.block__title').text();
  
  $liveRegion.html(
    `Showing slide ${index + 1} of ${this._totalBlocks}: ${slideTitle}`
  );
}
```

### Accessibility Mode

```javascript
// Disable in accessibility mode
isBlockSliderEnabled() {
  const config = this.get('_articleBlockSlider');
  
  if (!config || !config._isEnabled) return false;
  
  // Check accessibility preference
  if (config._isDisabledWhenAccessibilityActive && a11y.isEnabled()) {
    return false;
  }
  
  return true;
}
```

---

## Responsive Design System

### Breakpoint Configuration

```javascript
// Adapt Framework breakpoints (from device.js)
const breakpoints = {
  small: 0,      // 0px - 767px
  medium: 768,   // 768px - 1023px
  large: 1024,   // 1024px - 1439px
  xlarge: 1440   // 1440px+
};

// Current screen size
const currentSize = device.screenSize; // 'small', 'medium', 'large', 'xlarge'
```

### Configuration-Based Responsive Behavior

```javascript
_onBlockSliderDeviceChanged() {
  const config = this._blockSliderConfig;
  const enabledSizes = config._isEnabledOnScreenSizes.split(' ');
  const currentSize = device.screenSize;
  
  if (enabledSizes.indexOf(currentSize) > -1) {
    this._blockSliderEnable();
  } else {
    this._blockSliderDisable();
  }
}

_blockSliderEnable() {
  this.$el.addClass('abs');
  this._blockSliderConfigureControls(false);
  this._blockSliderResizeHeight();
}

_blockSliderDisable() {
  this.$el.removeClass('abs');
  // Reset to vertical layout
  this.$('.js-abs-block-container').css({
    'transform': 'none',
    'display': 'block'
  });
}
```

### CSS Media Queries

```less
// Mobile first approach
.abs {
  // Base styles for all sizes
  
  // Medium and up
  @media (min-width: @device-width-medium) {
    // Tablet styles
  }
  
  // Large and up
  @media (min-width: @device-width-large) {
    // Desktop styles
  }
}
```

---

## Performance Optimization

### 1. Debounced Event Handlers

```javascript
// Debounce frequent events
this._blockSliderHideOthers = _.debounce(
  this._blockSliderHideOthers.bind(this),
  200
);

this._onBlockSliderResize = _.debounce(
  this._onBlockSliderResize.bind(this),
  250
);
```

### 2. CSS Transitions (Hardware Accelerated)

```less
.js-abs-block-container {
  // GPU-accelerated transform
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  
  // Force hardware acceleration
  will-change: transform;
  
  // Prevent sub-pixel rendering
  backface-visibility: hidden;
}
```

### 3. Lazy Image Loading

```javascript
// Images load only when visible
this.onImagesReady().then(() => {
  // Render after images loaded
  this._blockSliderPostRender();
});
```

### 4. Cached Selectors

```javascript
// Cache frequently used selectors
this._$container = this.$('.js-abs-block-container');
this._$slideContainer = this.$('.js-abs-slide-container');
this._$toolbar = this.$('.js-abs-toolbar');

// Use cached selectors
this._$container.css('transform', `translateX(${offset}px)`);
```

### 5. Event Delegation

```javascript
// Delegate events for dynamic elements
events: {
  'click .abs__btn-arrow': '_onBlockSliderClick',
  'click .abs__btn-tab': '_onBlockSliderClick',
  'touchstart .js-abs-slide-container': '_onTouchStart',
  'touchmove .js-abs-slide-container': '_onTouchMove',
  'touchend .js-abs-slide-container': '_onTouchEnd'
}
```

### 6. RequestAnimationFrame for Smooth Animations

```javascript
_animateSlide(offset, duration) {
  const startTime = performance.now();
  const startOffset = this._currentOffset;
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const eased = this._easeInOutCubic(progress);
    
    const currentOffset = startOffset + (offset - startOffset) * eased;
    this._$container.css('transform', `translateX(${currentOffset}px)`);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
}

_easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
```

---

## Error Handling

### Defensive Programming

```javascript
// Check configuration exists
_blockSliderSetupTouchConfiguration() {
  const config = this.model.get('_articleBlockSlider');
  if (!config) {
    console.warn('Article Block Slider: No configuration found');
    return;
  }
  
  this._blockSliderConfig = config;
  this._minSwipeDistance = config._swipeSensitivity || 50;
}

// Validate index bounds
_blockSliderMoveIndex(index, animate = true) {
  // Clamp index to valid range
  index = Math.max(0, Math.min(index, this._totalBlocks - 1));
  
  if (index === this._currentIndex) {
    return; // Already at this slide
  }
  
  // Proceed with navigation
}

// Handle missing elements
_blockSliderConfigureControls(animate) {
  const $controls = this.$('.abs__btn-arrow, .abs__btn-tab');
  
  if (!$controls.length) {
    console.warn('Article Block Slider: No controls found');
    return;
  }
  
  // Configure controls
}
```

### Graceful Degradation

```javascript
// Fall back to standard layout if slider fails
render() {
  try {
    if (this.model.isBlockSliderEnabled()) {
      this._blockSliderRender();
    } else {
      // Standard article rendering
      ArticleView.prototype.render.call(this);
    }
  } catch (error) {
    console.error('Article Block Slider error:', error);
    // Fall back to standard rendering
    ArticleView.prototype.render.call(this);
  }
}

// Touch support fallback
_onTouchStart(event) {
  try {
    if (!this._enableTouchSwipe) return;
    if (!event.touches || !event.touches.length) {
      console.warn('Touch events not supported');
      return;
    }
    
    // Process touch
  } catch (error) {
    console.error('Touch handling error:', error);
    // Disable touch
    this._enableTouchSwipe = false;
  }
}
```

### User-Friendly Error Messages

```javascript
// Log helpful debugging information
_blockSliderPreRender() {
  const config = this.model.get('_articleBlockSlider');
  
  if (Adapt.config.get('_debug')) {
    console.group('Article Block Slider Debug');
    console.log('Configuration:', config);
    console.log('Enabled:', this.model.isBlockSliderEnabled());
    console.log('Screen Size:', device.screenSize);
    console.log('Touch Support:', this._enableTouchSwipe);
    console.groupEnd();
  }
}
```

---

## Testing Strategy

### Manual Testing Checklist

See [CONTRIBUTING.md](CONTRIBUTING.md#testing) for comprehensive testing checklist.

### Automated Testing (Future)

**Recommended Tools:**

1. **Unit Tests** (Jest)
```javascript
describe('BlockSliderModel', () => {
  it('should enable slider when config is valid', () => {
    const model = new ArticleModel({
      _articleBlockSlider: {
        _isEnabled: true
      }
    });
    
    expect(model.isBlockSliderEnabled()).toBe(true);
  });
});
```

2. **Integration Tests** (Cypress)
```javascript
describe('Article Block Slider', () => {
  it('should navigate on arrow click', () => {
    cy.visit('/course');
    cy.get('.abs__btn-arrow.is-right').click();
    cy.get('.block').eq(1).should('be.visible');
  });
});
```

3. **Accessibility Tests** (axe-core)
```javascript
describe('Accessibility', () => {
  it('should have no a11y violations', () => {
    cy.visit('/course');
    cy.injectAxe();
    cy.checkA11y('.abs');
  });
});
```

---

## Conclusion

This architecture document provides a comprehensive technical overview of the Article Block Slider extension. The design emphasizes:

- **Modularity**: Clear separation of concerns
- **Maintainability**: Well-documented, structured code
- **Performance**: Optimized rendering and interactions
- **Accessibility**: WCAG 2.1 AA compliance throughout
- **Extensibility**: Easy to enhance and customize

For questions or contributions, see [CONTRIBUTING.md](CONTRIBUTING.md).
