FamiasNews.Views.PostsIndex = Backbone.View.extend({

  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render)
    this.template = new EJS({url: 'index_template'})
  },

  render: function() {
    var posts = this.collection;
    posts.sort(posts.comparator);
    var posts = this.collection.toJSON();
    this.$el.html(this.template.render({posts}))
    return this;
  },

})
