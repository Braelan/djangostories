FamiasNews.Views.PostsIndex = Backbone.View.extend({
  // template: JST["news/index.html"],

  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function() {
    // can place a sort function here
    // var view = this.template({questions: this.collection});
    this.$el.html("Look out! from your posts index view");
    return this;
  }
})
