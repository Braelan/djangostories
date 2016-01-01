FamiasNews.Views.PostShow = Backbone.View.extend({
  tagName: "form",
  events: {
    "click .submit" : "submit"
  },

  initialize: function(options) {
    this.model = options.model
    this.collection = options.collection
    this.listenTo(this.collection, 'sync', this.render)
    this.listenTo(this.model, 'sync', this.render)
    this.id = options.id
    // this.$el = $("<div></div>",
    //               {class: "show-container"})
  },

  render: function() {
     $Container = $("<div></div>",
                   {class: "show-container"});
     $Article = this.makeArticle();
     $input = this.inputComment();
     $comments = this.showComments();
     $Container.append($Article);
     $Container.append($input);
     $Container.append($comments);
     this.$el.empty().append($Container);
    //  this.$el.append($input);
    //  this.$el.append($comments);

     return this;
  },

  submit: function(event) {
    event.preventDefault();
    $.ajax({
      url: "/",
      type: "POST",
      data: {comment_text: "test_comment"},
      success: function()  {
        console.log("comment posted")
      },
      error: function() {
        console.log("Ajax oops")
      }
    })


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
},

  inputComment: function() {
    var $input = $(
         "<form>"  +
            "<input name='comment_text' id='new_comment' placeholder='Nice comments here please.'>" +
            "<input class='submit' type='submit' value='comment'>" +
         "</input></form>")
    return $input;
  },

  showComments: function () {
    var $comments = $('<ul id="comments"></ul>')
    return $comments
  },


})
