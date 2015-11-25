FamiasNews.Views.PostsIndex = Backbone.View.extend({
  // template: JST["news/index.html"],

  initialize: function(options) {
    this.collection = options.collection;
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function() {
    // can place a sort function here
    // var view = this.template({questions: this.collection});

    //this injects into the span element as set in famiasnews.js $root and
    //displayed in base.html
    var $index = $("<ul></ul>")
    var posts = this.collection
    if (posts.length > 0) {
      posts.each( function(post){
        var $li = $("<li></li>")
        $li.text(post.escape("title"))
        this.$el.append($li)
      }.bind(this))
    }
    // this.$el.html("Look out! from your posts index view");
    return this;
  }
})
