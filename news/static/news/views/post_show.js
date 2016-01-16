FamiasNews.Views.PostShow = Backbone.View.extend({
  tagName: "form",
  events: {
    "click .submit" : "submit",
    "click .login"  : "login"
  },

  initialize: function(options) {
    this.model = options.model
    this.collection = options.collection
    this.listenTo(this.collection, 'sync change all', this.render)
    this.listenTo(this.model, 'sync change all', this.render)
    this.id = options.id
    // this.$el = $("<div></div>",
    //               {class: "show-container"})
  },

  render: function() {
     $Container = $("<div></div>",
                   {class: "show-container"});
     $Article = this.makeArticle();
     $input = this.inputComment();
     $userLogin = this.userLogin();
     $comments = this.showComments();
     $Container.append($Article);
     $Container.append($input);
     $Container.append($userLogin);
     $Container.append($comments);
     this.$el.empty().append($Container);
    //  this.$el.append($input);
    //  this.$el.append($comments);

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
},

  inputComment: function() {
    var $input = $(
         "<form>"  +
            "<input name='comment_text' id='new_comment' placeholder='Nice comments here please.'>" +
            "<input class='submit' type='submit' value='comment'>" +
         "</input></form>")
    return $input;
  },

  userLogin: function () {
    var $login = $(
                  "<div id = sign-in>" +
                  "<form class=sign-in>" +
                  "<label for='username'>Username:</label>" +
                  "<input id='username' label='username'>" +
                  "<label for='password'>Password:</label>" +
                  "<input type='password' id='password'>" +
                  "<input class='log-in' type='submit' value='Sign In'>" +
                  "</form>" +
                  "</div>");
    return $login
  },

  login: function(event) {
// get a comments value and pass it to sendUser, following the django docs
    var

  },

  sendUser: function() {
    $.ajax({
      url:"/",
      type: "POST",
      data: {username}
    })
  },

  //comments are going to be sent via jquery ajax.  They will be saved at views.py.
  // then they will be serialized along with posts and sent to the posts api, parsed
  //with the model and served here.

    submit: function(event) {
      event.preventDefault();
      var comment = $('#new_comment').val();
      var id = this.model.id
      var that = this;
      $('form.sign-in').toggleClass('on');
      this.sendComment(comment, id, that);

    },

    sendComment: function (comment, id, that) {
      $.ajax({
        url: "/",
        type: "POST",
        data: {comment_text: comment, post_id: id},
        success: function()  {
          that.model.fetch();
          that.collection.fetch()
          console.log("comment posted")
        },
        error: function() {
          console.log("Ajax oops")
        }
      })
    },

  showComments: function () {
    var $comments = $('<ul id="comments"></ul>')

    var comments = this.model.get('comments') || this.model.get('comment_list')
    // var length = comments.length || this.model.get('length')
    if (comments && comments.length) {
      for (var i = 0; i <comments.length; i++ ) {
        var $comment = $('<li></li>',{
          text: comments[i].text
        })
        $comments.append($comment)
      }
    }
    else if (comments && this.model.get('length')) {
      for (var i = 0; i < this.model.get('length'); i++ ) {
        var $comment = $('<li></li>',{
          text: comments[i]
        })
        $comments.append($comment)
    }
  }
    return $comments
  },








})
