import ArticleView from 'core/js/views/articleView';
import ArticleModel from 'core/js/models/articleModel';
import ArticleViewExtension from './adapt-articleView';
import ArticleModelExtension from './adapt-articleModel';

/*
  Here we are extending the articleView and articleModel in Adapt.
  This is to accommodate the block slider functionality on the article.
  The advantage of this method is that the block slider behaviour can utilize all of the predefined article behaviour in both the view and the model.
*/

// Extends core/js/views/articleView.js
const ArticleViewInitialize = ArticleView.prototype.initialize;
ArticleView.prototype.initialize = function(options) {
  if (this.model.get('_articleBlockSlider')) {
    // Extend the articleView with new functionality
    _.extend(this, ArticleViewExtension);
  }
  // Initialize the article in the normal manner
  return ArticleViewInitialize.apply(this, arguments);
};

// Extends core/js/models/articleModel.js
const ArticleModelInitialize = ArticleModel.prototype.initialize;
ArticleModel.prototype.initialize = function(options) {
  if (this.get('_articleBlockSlider')) {
    // Extend the articleModel with new functionality
    _.extend(this, ArticleModelExtension);

    // Initialize the article in the normal manner
    const returnValue = ArticleModelInitialize.apply(this, arguments);

    return returnValue;
  }

  // Initialize the article in the normal manner if no block slider
  return ArticleModelInitialize.apply(this, arguments);
};
