FamiasNews.Views.PostShow = Backbone.View.extend({


  initialize: function(options) {
    this.model = options.model
    this.collection = options.collection
    this.listenTo(this.collection, 'sync', this.render)
    this.listenTo(this.model, 'sync', this.render)
    this.id = options.id
    this.$el = $("<div></div>",
                  {class: "show-container"})
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
      text: this.model.get("title"),
      class: "show-title"
    })
    var text = this._processText(this.model.get("text"))
    var $body = $(text, {
      class: "show-article"
    })
    $Article.append($title);
    $Article.append($body);
    return $Article;
  },


  _processText: function(text) {
    if (typeof text != "undefined") {
    text = text.replace(/\n/g, '<br>');
    text = "<p class='show-article'>" + text + "</p>";
    return text;
  } else { return ""}
  }


})
