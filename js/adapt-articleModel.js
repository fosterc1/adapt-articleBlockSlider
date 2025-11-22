import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';

const BlockSliderModel = {

  isBlockSliderEnabled() {
    const config = this.get('_articleBlockSlider');
    if (!config || !config._isEnabled || (config._isDisabledWhenAccessibilityActive && a11y.isEnabled())) {
      return false;
    }

    return true;
  }

};

export default BlockSliderModel;
