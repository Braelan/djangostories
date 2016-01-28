FamiasNews.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "posts",
    "posts/:id": "post"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.collection= options.collection;
    this.currentUser = options.currentUser
    this.listenTo(this.currentUser, "sync change all", this._log)
  },


  posts: function() {
    var view = new FamiasNews.Views.PostsIndex({collection: this.collection})
    this._swapView(view)
  },

  post: function(id) {
    var model = this.collection.getOrFetch(id)
    var view = new FamiasNews.Views.PostShow({model:model, collection: this.collection, currentUser: this.currentUser});
    this._swapView(view)
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  },

  _log: function(){
    if (this.currentUser.escape('status') !== "logged out"){
    $('.email').html('logged in as: ' + this.currentUser.escape('username') +
    '<button id="logout" class="log-out" type="button" name="button">log out</button>'+
    this._logout() )
  }
  },

  _logout: function() {
    return '<script type="text/javascript">'+
      '$("button").click(function() {'+
      '  $.ajax({'+
      '    url: "user",'+
      '    type: "GET",'+
      '    success: function(data) {'+
      '      window.location.reload();'+
      '    }'+
      '  }'+
      '  )'+
      '})'+
    '</script>'
  }
})
