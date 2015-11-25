FamiasNews.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "posts"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection= FamiasNews.posts;
  },

  posts: function() {
    var view = new FamiasNews.Views.PostsIndex({collection: this.collection})
    this._swapView(view)
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})
