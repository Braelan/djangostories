FamiasNews.Views.PostShow = Backbone.View.extend({


  initialize: function(options) {
    this.model = options.model
    this.collection = options.collection
    this.listenTo(this.collection, 'sync', this.render)
    this.listenTo(this.model, 'sync', this.render)
    this.id = options.id
  },

  render: function() {
     $Article = this.makeArticle();
     this.$el.empty().append($Article)
     return this;
  },

  makeArticle: function() {
    var model = this.model
    var $Article = $('<div></div>');
    var $title = $('<h2></h2>', {
      text: this.model.escape("title")
    })
    var $body = $('<p></p>', {
      text: this.model.escape("text")
    })
    $Article.append($title);
    $Article.append($body);
    return $Article;
  }


})
