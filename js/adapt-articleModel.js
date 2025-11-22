import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';

const BlockSliderModel = {

  isBlockSliderEnabled() {
    // Check if extension is globally disabled at course level
    const courseConfig = Adapt.course.get('_articleBlockSlider');
    if (courseConfig && courseConfig._isEnabled === false) {
      return false;
    }

    // Check article-level configuration
    const config = this.get('_articleBlockSlider');
    if (!config || !config._isEnabled || (config._isDisabledWhenAccessibilityActive && a11y.isEnabled())) {
      return false;
    }

    return true;
  },

  getBlockSliderConfig() {
    // Get course-level defaults
    const courseConfig = Adapt.course.get('_articleBlockSlider');
    const courseDefaults = (courseConfig && courseConfig._defaults) || {};

    // Get article-level config
    const articleConfig = this.get('_articleBlockSlider') || {};

    // Merge configs: article settings override course defaults
    return {
      _isEnabled: articleConfig._isEnabled !== undefined ? articleConfig._isEnabled : true,
      _isDisabledWhenAccessibilityActive: articleConfig._isDisabledWhenAccessibilityActive !== undefined 
        ? articleConfig._isDisabledWhenAccessibilityActive 
        : false,
      _slideAnimationDuration: articleConfig._slideAnimationDuration !== undefined 
        ? articleConfig._slideAnimationDuration 
        : (courseDefaults._slideAnimationDuration || 600),
      _heightAnimationDuration: articleConfig._heightAnimationDuration !== undefined 
        ? articleConfig._heightAnimationDuration 
        : (courseDefaults._heightAnimationDuration || 300),
      _isEnabledOnScreenSizes: articleConfig._isEnabledOnScreenSizes !== undefined 
        ? articleConfig._isEnabledOnScreenSizes 
        : (courseDefaults._isEnabledOnScreenSizes || 'large medium'),
      _hasTabs: articleConfig._hasTabs !== undefined 
        ? articleConfig._hasTabs 
        : (courseDefaults._hasTabs || false),
      _hasArrows: articleConfig._hasArrows !== undefined 
        ? articleConfig._hasArrows 
        : (courseDefaults._hasArrows !== undefined ? courseDefaults._hasArrows : true),
      _startIndex: articleConfig._startIndex || 0,
      _hasUniformHeight: articleConfig._hasUniformHeight !== undefined 
        ? articleConfig._hasUniformHeight 
        : (courseDefaults._hasUniformHeight !== undefined ? courseDefaults._hasUniformHeight : true),
      _minHeight: articleConfig._minHeight || null,
      _enableTouchSwipe: articleConfig._enableTouchSwipe !== undefined 
        ? articleConfig._enableTouchSwipe 
        : (courseDefaults._enableTouchSwipe !== undefined ? courseDefaults._enableTouchSwipe : true),
      _swipeSensitivity: articleConfig._swipeSensitivity !== undefined 
        ? articleConfig._swipeSensitivity 
        : (courseDefaults._swipeSensitivity || 50)
    };
  }

};

export default BlockSliderModel;
