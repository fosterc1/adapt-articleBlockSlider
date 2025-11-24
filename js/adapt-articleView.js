import Adapt from 'core/js/adapt';
import AdaptArticleView from 'core/js/views/articleView';
import a11y from 'core/js/a11y';
import device from 'core/js/device';
import wait from 'core/js/wait';

const BlockSliderView = {

    _isReady: false,
    _disableAnimationOnce: false,
    _touchStartX: 0,
    _touchStartY: 0,
    _touchEndX: 0,
    _touchEndY: 0,
    _isSwiping: false,
    _minSwipeDistance: 50, // Minimum distance for a swipe (in pixels)

    events: {
      'click [data-block-slider]': '_onBlockSliderClick',
      'touchstart .js-abs-slide-container': '_onTouchStart',
      'touchmove .js-abs-slide-container': '_onTouchMove',
      'touchend .js-abs-slide-container': '_onTouchEnd'
    },

    preRender() {
      AdaptArticleView.prototype.preRender.call(this);

      if (!this.model.isBlockSliderEnabled()) {
        this.$el.addClass('is-disabled');
        return;
      }

      this._blockSliderPreRender();
    },

    _blockSliderPreRender() {
      this._blockSliderSetupEventListeners();
      this._blockSliderSetupTouchConfiguration();
      // Create a promise that will be resolved when ready
      this._readyPromise = new Promise(resolve => {
        this.resolveQueue = resolve;
      });
      wait.queue(this._readyPromise);
    },

    _blockSliderSetupTouchConfiguration() {
      // Get article config
      const config = this.model.get('_articleBlockSlider');
      // Store config for use throughout the view
      this._blockSliderConfig = config;
      // Set swipe sensitivity from config
      this._minSwipeDistance = config._swipeSensitivity || 50;
      // Check if touch/swipe is enabled
      this._enableTouchSwipe = config._enableTouchSwipe !== false;
    },

    _blockSliderSetupEventListeners() {

      this._blockSliderResizeHeight = this._blockSliderResizeHeight.bind(this);
      this._onOrientationChange = this._onOrientationChange.bind(this);

      this.listenTo(Adapt, {
        'device:resize': this._onBlockSliderResize,
        'device:changed': this._onBlockSliderDeviceChanged,
        'page:scrollTo': this._onBlockSliderPageScrollTo,
        'page:scrolledTo': this._onBlockSliderPageScrolledTo
      });

      this.listenToOnce(Adapt, 'remove', this._onBlockSliderRemove);
      this.listenToOnce(this.model, 'change:_isReady', this._onBlockSliderReady);

      // Duration will be set after config is loaded
      this._blockSliderHideOthers = _.debounce(this._blockSliderHideOthers.bind(this), 200);

      // Add orientation change listener for mobile devices
      if (window.screen && window.screen.orientation) {
        window.screen.orientation.addEventListener('change', this._onOrientationChange);
      } else {
        // Fallback for older browsers
        $(window).on('orientationchange', this._onOrientationChange);
      }

    },

    render() {

      if (this.model.isBlockSliderEnabled()) {

        this._blockSliderRender();

      } else AdaptArticleView.prototype.render.call(this);

    },

    // Override delegateEvents to add passive flag to touch events
    delegateEvents(events) {
      AdaptArticleView.prototype.delegateEvents.call(this, events);
      
      // Re-attach touch events with passive flag for better performance
      const $container = this.$('.js-abs-slide-container');
      if ($container.length) {
        const elem = $container[0];
        
        // Remove jQuery-bound touch events
        $container.off('touchstart touchmove');
        
        // Add native event listeners with passive flag
        if (elem) {
          elem.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: true });
          elem.addEventListener('touchmove', this._onTouchMove.bind(this), { passive: false }); // false because we preventDefault
        }
      }
    },

    _blockSliderRender() {
      Adapt.trigger(this.constructor.type + 'View:preRender view:render', this);

      this._blockSliderConfigureVariables();

      const data = this.model.toJSON();
      const template = Handlebars.templates['articleBlockSlider-article'];
      this.$el.html(template(data));

      Adapt.trigger(this.constructor.type + 'View:render', this);

      this.addChildren();

      this.$el.addClass('abs');

      this.delegateEvents();

      // Wait for images to load using modern Promise-based approach
      this.onImagesReady().then(() => {
        _.delay(this._blockSliderPostRender.bind(this), 500);
      });

      return this;
    },

    _blockSliderConfigureVariables() {
      const blocks = this.model.getChildren().models.filter(model => model.isTypeGroup('block'));
      const totalBlocks = blocks.length;
      const itemButtons = [];

      for (let i = 0, l = totalBlocks; i < l; i++) {
        itemButtons.push({
          _className: (i === 0 ? 'home' : 'not-home') + (' i'+i),
          _index: i,
          _includeNumber: i !== 0,
          _title: blocks[i].get('title')
        });
      }

      this.model.set({
        _currentBlock: 0,
        _totalBlocks: totalBlocks,
        _itemButtons: itemButtons
      });
    },

    _blockSliderConfigureControls(animate) {

      const duration = this._blockSliderConfig._slideAnimationDuration || 200;

      if (this._disableAnimationOnce) animate = false;
      const _currentBlock = this.model.get('_currentBlock');
      const _totalBlocks = this.model.get('_totalBlocks');

      const $left = this.$el.find("[data-block-slider='left']");
      const $right = this.$el.find("[data-block-slider='right']");

      if (_currentBlock === 0) {
        a11y.toggleEnabled($left, false);
        a11y.toggleEnabled($right, true);
      } else if (_currentBlock == _totalBlocks - 1 ) {
        a11y.toggleEnabled($left, true);
        a11y.toggleEnabled($right, false);
      } else {
        a11y.toggleEnabled($left, true);
        a11y.toggleEnabled($right, true);
      }

      const $indexes = this.$el.find("[data-block-slider='index']");
      a11y.toggleEnabled($indexes, true);
      $indexes.removeClass('is-selected');
      const $currentIndex = $indexes.eq(_currentBlock);
      a11y.toggleEnabled($currentIndex, false);
      $currentIndex.addClass('is-selected is-visited');

      const $blocks = this.$el.find('.block');
      if (!$blocks.length) return;

      a11y.toggleAccessible($blocks, false);
      a11y.toggleAccessible($blocks.eq(_currentBlock), true);
    },

    _blockSliderSetButtonLayout() {
      const buttonsLength = this.model.get('_itemButtons').length;
      const itemwidth = 100 / buttonsLength;
      this.$('.js-abs-btn-tab').css({
        width: itemwidth + '%'
      });
    },

    _blockSliderPostRender() {
      this._blockSliderConfigureControls(false);

      this._onBlockSliderDeviceChanged();

      const startIndex = this._blockSliderConfig._startIndex || 0;

      this._blockSliderMoveIndex(startIndex, false);

      Adapt.trigger(this.constructor.type + 'View:postRender', this);

    },

    _onBlockSliderReady() {
      this._blockSliderHideOthers();
      _.delay(() => {
        this._blockSliderConfigureControls(false);
        this._onBlockSliderResize();
        this.resolveQueue();
        this._isReady = true;
      }, 250);
      this.$('.component').on('resize', this._blockSliderResizeHeight);
    },

    _onBlockSliderClick(event) {
      event.preventDefault();

      const id = $(event.currentTarget).attr('data-block-slider');

      switch(id) {
        case 'left':
          this._blockSliderMoveLeft();
          break;
        case 'index':
          const index = parseInt($(event.currentTarget).attr('data-block-slider-index'));
          this._blockSliderMoveIndex(index);
          break;
        case 'right':
          this._blockSliderMoveRight();
          break;
      }

    },

    _onTouchStart(event) {
      // Check if touch is enabled and only handle on enabled screen sizes
      if (!this._enableTouchSwipe || !this._blockSliderIsEnabledOnScreenSizes()) return;

      const touch = event.originalEvent.touches[0];
      this._touchStartX = touch.clientX;
      this._touchStartY = touch.clientY;
      this._isSwiping = true;
    },

    _onTouchMove(event) {
      if (!this._enableTouchSwipe || !this._isSwiping || !this._blockSliderIsEnabledOnScreenSizes()) return;

      const touch = event.originalEvent.touches[0];
      this._touchEndX = touch.clientX;
      this._touchEndY = touch.clientY;

      // Calculate the difference
      const diffX = this._touchStartX - this._touchEndX;
      const diffY = this._touchStartY - this._touchEndY;

      // If vertical swipe is more significant than horizontal, don't interfere with scrolling
      if (Math.abs(diffY) > Math.abs(diffX)) {
        this._isSwiping = false;
        return;
      }

      // Prevent default scrolling when horizontal swipe is detected
      if (Math.abs(diffX) > 10) {
        event.preventDefault();
      }
    },

    _onTouchEnd(event) {
      if (!this._enableTouchSwipe || !this._isSwiping || !this._blockSliderIsEnabledOnScreenSizes()) {
        this._isSwiping = false;
        return;
      }

      const diffX = this._touchStartX - this._touchEndX;
      const diffY = this._touchStartY - this._touchEndY;

      // Check if horizontal swipe is more significant than vertical
      if (Math.abs(diffX) < Math.abs(diffY)) {
        this._isSwiping = false;
        return;
      }

      // Check if swipe distance meets minimum threshold
      if (Math.abs(diffX) < this._minSwipeDistance) {
        this._isSwiping = false;
        return;
      }

      // Determine swipe direction
      const isRTL = Adapt.config.get('_defaultDirection') === 'rtl';
      
      if (diffX > 0) {
        // Swiped left (or right in RTL)
        if (isRTL) {
          this._blockSliderMoveLeft();
        } else {
          this._blockSliderMoveRight();
        }
      } else {
        // Swiped right (or left in RTL)
        if (isRTL) {
          this._blockSliderMoveRight();
        } else {
          this._blockSliderMoveLeft();
        }
      }

      this._isSwiping = false;
    },

    _blockSliderMoveLeft() {
      if (this.model.get('_currentBlock') === 0) return;

      let index = this.model.get('_currentBlock');
      this._blockSliderMoveIndex(--index);
    },

    _blockSliderMoveIndex(index, animate) {
      if (this.model.get('_currentBlock') != index) {

        this.model.set('_currentBlock', index);

        Adapt.trigger('media:stop');//in case any of the blocks contain media that's been left playing by the user

        this._blockSliderSetVisible(this.model.getChildren().models[index], true);
        this._blockSliderResizeHeight(animate);
        this._blockSliderScrollToCurrent(animate);
        this._blockSliderConfigureControls(animate);
      }

      const duration = this._blockSliderConfig._slideAnimationDuration || 200;

      if (this._disableAnimationOnce) animate = false;

      if (animate !== false) {
        _.delay(() => {
          $(window).resize();
        }, duration);
        return;
      }

      $(window).resize();

    },

    _blockSliderMoveRight() {
      if (this.model.get('_currentBlock') == this.model.get('_totalBlocks') - 1 ) return;

      let index = this.model.get('_currentBlock');
      this._blockSliderMoveIndex(++index);
    },

    _blockSliderScrollToCurrent(animate) {
      const isEnabled = this._blockSliderIsEnabledOnScreenSizes();
      const $container = this.$el.find('.js-abs-slide-container');

      if (!isEnabled) {
        return $container.scrollLeft(0);
      }

      const blocks = this.$el.find('.block');
      const blockWidth = $(blocks[0]).outerWidth();
      const lastIndex = blocks.length - 1;
      const currentBlock = this.model.get('_currentBlock');
      const isRTL = Adapt.config.get('_defaultDirection') === 'rtl';
      const totalLeft = isRTL ? (lastIndex - currentBlock) * blockWidth : currentBlock * blockWidth;

      this._blockSliderShowAll();

      const duration = this._blockSliderConfig._slideAnimationDuration || 200;

      if (this._disableAnimationOnce) animate = false;

      if (animate === false) {
        _.defer(() => {
          $container.scrollLeft(totalLeft);
          this._blockSliderHideOthers();
        });
        return;
      }

      $container.stop(true).animate({scrollLeft: totalLeft}, duration, () => {
        $container.scrollLeft(totalLeft);
        this._blockSliderHideOthers();
      });
    },

    _blockSliderIsEnabledOnScreenSizes() {
      const isEnabledOnScreenSizes = this._blockSliderConfig._isEnabledOnScreenSizes;

      const sizes = isEnabledOnScreenSizes.split(' ');
      if (sizes.indexOf(device.screenSize) > -1) {
        return true;
      }
      return false;
    },

    _blockSliderShowAll() {
      this._blockSliderHideOthers.cancel();

      this.model.getChildren().models.filter(model => model.isTypeGroup('block')).forEach(block => {
        this._blockSliderSetVisible(block, true);
      });
    },

    _blockSliderHideOthers() {
      const currentIndex = this.model.get('_currentBlock');
      this.model.getChildren().models.filter(model => model.isTypeGroup('block')).forEach((block, index) => {
        const makeVisible = (index === currentIndex);
        this._blockSliderSetVisible(block, makeVisible);
      });
    },

    _blockSliderSetVisible(model, makeVisible) {
      this.$el.find('.' + model.get('_id') + ' *').css('visibility', makeVisible ? '' : 'hidden');
    },

    _onBlockSliderResize() {
      try {
        this._blockSliderResizeWidth(false);
        this._blockSliderResizeHeight(false);
        this._blockSliderScrollToCurrent(false);
        this._blockSliderResizeTab();
      } catch (error) {
        console.error('BlockSlider: Error in _onBlockSliderResize:', error);
      }
    },

    _onOrientationChange() {
      // On orientation change, we need to delay slightly to allow the browser
      // to complete the orientation change and recalculate dimensions
      try {
        _.delay(() => {
          try {
            // Force a full recalculation of all dimensions
            this._blockSliderResizeWidth(false);
            _.defer(() => {
              try {
                // Height calculation needs the width to be set first
                this._blockSliderResizeHeight(false);
                _.defer(() => {
                  try {
                    // Scroll positioning needs both width and height
                    this._blockSliderScrollToCurrent(false);
                    this._blockSliderResizeTab();
                    // No window resize trigger needed - Adapt's device:changed event handles component updates
                  } catch (error) {
                    console.error('BlockSlider: Error in orientation change (scroll/tab resize):', error);
                  }
                });
              } catch (error) {
                console.error('BlockSlider: Error in orientation change (height resize):', error);
              }
            });
          } catch (error) {
            console.error('BlockSlider: Error in orientation change (width resize):', error);
          }
        }, 300); // 300ms delay to ensure orientation change is complete
      } catch (error) {
        console.error('BlockSlider: Error in _onOrientationChange:', error);
      }
    },

    _blockSliderResizeHeight(animate) {
      try {
        if (!this._isReady) animate = false;
        const $container = this.$el.find('.js-abs-slide-container');
        const isEnabled = this._blockSliderIsEnabledOnScreenSizes();

        if (!isEnabled) {
          this._blockSliderShowAll();
          // Use CSS transitions instead of velocity
          return $container.css({'height': '', 'min-height': ''});
        }

      const currentBlock = this.model.get('_currentBlock');
      const $blocks = this.$el.find('.block');

      const currentHeight = $container.height();
      const blockHeight = $blocks.eq(currentBlock).height();

      let maxHeight = -1;
      $container.find('.block').each(function() {
        if ($(this).height() > maxHeight) {
          maxHeight = $(this).height();
        }
      });

      const duration = (this._blockSliderConfig._heightAnimationDuration || 200) * 2;

      if (this._disableAnimationOnce) animate = false;

      if (this._blockSliderConfig._hasUniformHeight) {
        if (animate === false) {
          $container.css({'height': maxHeight+'px', 'transition': 'none'});
        } else {
          $container.css({'height': maxHeight+'px', 'transition': `height ${duration}ms ease-in`});
        }
      } else if (currentHeight <= blockHeight) {

        if (animate === false) {
          $container.css({'height': blockHeight+'px', 'transition': 'none'});
        } else {
          $container.css({'height': blockHeight+'px', 'transition': `height ${duration}ms ease-in`});
        }

      } else if (currentHeight > blockHeight) {

        if (animate === false) {
          $container.css({'height': blockHeight+'px', 'transition': 'none'});
        } else {
          $container.css({'height': blockHeight+'px', 'transition': `height ${duration}ms ease-in`});
        }

      }

        const minHeight = this._blockSliderConfig._minHeight;
        if (minHeight) {
          $container.css({'min-height': minHeight+'px'});
        }
      } catch (error) {
        console.error('BlockSlider: Error in _blockSliderResizeHeight:', error);
      }
    },

    _blockSliderResizeTab() {
      try {
        if (!this._blockSliderConfig._hasTabs) return;

        this._blockSliderSetButtonLayout();

        this.$('.js-abs-btn-tab').css({
          height: ""
        });

        const parentHeight = this.$('.js-abs-btn-tab').parent().height();
        this.$('.js-abs-btn-tab').css({
          height: parentHeight + 'px'
        });

        const toolbarHeight = this.$('.js-abs-btn-tab-container').height();
        const additionalMargin = '30';
        this.$('.js-abs-btn-tab-container').css({
          top: '-' + (toolbarHeight + (additionalMargin/2)) + 'px'
        });

        const toolbarMargin = parseFloat(toolbarHeight) + parseFloat(additionalMargin);
        this.$('.js-abs-slide-container').css({
          marginTop: toolbarMargin + 'px'
        });
      } catch (error) {
        console.error('BlockSlider: Error in _blockSliderResizeTab:', error);
      }
    },

    _blockSliderResizeWidth() {
      try {
        const isEnabled = this._blockSliderIsEnabledOnScreenSizes();
        const $blockContainer = this.$el.find('.js-abs-block-container');
        const $blocks = this.$el.find('.block');

        if (!isEnabled) {
          $blocks.css('width', '');
          return $blockContainer.css({'width': '100%'});
        }

        const $container = this.$el.find('.js-abs-slide-container');

        // Force a reflow to ensure we get accurate measurements after orientation change
        $container[0].offsetHeight; // Trigger reflow
        
        const containerWidth = $container.width();
        $blocks.css('width', containerWidth + 'px');

        // Force another reflow after setting block widths
        $blocks[0].offsetHeight; // Trigger reflow
        
        const blockWidth = $($blocks[0]).outerWidth();
        const totalWidth = $blocks.length * blockWidth;

        $blockContainer.width(totalWidth + 'px');
      } catch (error) {
        console.error('BlockSlider: Error in _blockSliderResizeWidth:', error);
      }
    },

    _onBlockSliderDeviceChanged() {
      const showToolbar = this._blockSliderIsEnabledOnScreenSizes();
      this.$('.js-abs-toolbar, .js-abs-toolbar-bottom').toggleClass('u-display-none', !showToolbar);
      // No window resize trigger needed - components respond to device:changed event
    },

    _onBlockSliderPageScrollTo(selector) {
      this._disableAnimationOnce = true;
      _.defer(() => {
        this._disableAnimationOnce = false;
      });

      if (typeof selector === "object") selector = selector.selector;

      if (!this._blockSliderIsEnabledOnScreenSizes()) {
        return;
      }

      if (this.$el.find(selector).length === 0) return;

      const id = selector.substr(1);

      const model = Adapt.findById(id);
      if (!model) return;

      const block = model.get('_type') === 'block' ? model : model.findAncestor('blocks');
      if (!block) return;
      this.model.getChildren().models.filter(model => model.isTypeGroup('block')).find((item, index) => {
        if (item.get('_id') !== block.get('_id')) return;
        _.defer(() => this._blockSliderMoveIndex(index, false));
        return true;
      });
    },

    _onBlockSliderPageScrolledTo() {
      _.defer(() => {
        this._blockSliderScrollToCurrent(false);
      });
    },

    _onBlockSliderRemove() {
      this._blockSliderRemoveEventListeners();
    },

    _blockSliderRemoveEventListeners() {
      this.$('.component').off('resize', this._blockSliderResizeHeight);
      this.stopListening(Adapt, 'device:changed', this._onBlockSliderDeviceChanged);
      
      // Remove orientation change listeners
      if (window.screen && window.screen.orientation) {
        window.screen.orientation.removeEventListener('change', this._onOrientationChange);
      } else {
        $(window).off('orientationchange', this._onOrientationChange);
      }
    },

    // Helper function for image loading (replaces deprecated .imageready())
    onImagesReady() {
      return new Promise(resolve => {
        const images = this.$('img').toArray();
        if (images.length === 0) {
          resolve();
          return;
        }

        let loadedCount = 0;
        const checkComplete = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            resolve();
          }
        };

        images.forEach(img => {
          if (img.complete) {
            checkComplete();
          } else {
            $(img).on('load error', checkComplete);
          }
        });
      });
    }
  };

  export default BlockSliderView;
