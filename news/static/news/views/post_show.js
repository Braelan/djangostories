FamiasNews.Views.PostShow = Backbone.View.extend({
  // tagName: "form",
  events: {
    "click .submit" : "submit",
    "click .log-in"  : "login",
    "click .logout" : "logout",
    "click #signin" : "signIn"
  },

  initialize: function(options) {
    post = new FamiasNews.Models.Post({id: options.model_id})
    this.model = options.model
    this.collection = options.collection
    this.listenTo(this.collection, 'sync change all', this.render)
    this.listenTo(this.model, 'sync change all', this.render)
    this.id = options.id
    this.currentUser = options.currentUser
    this.template = new EJS({url:'show_template'})
  },

  render: function() {
     this.delegateEvents();
     var post = this.model.toJSON();
     post.text = this._processText(post.text)
     this.$el.html(this.template.render({post}))
     return this;
  },


  _processText: function(text) {
    if (typeof text != "undefined") {
    text = text.replace(/\n/g, '<br>');
    text = "<p class='show-article'>" + text + "</p>";
    return text;
  } else { return ""}
},

// get a comments value and pass it to sendUser, following the django docs
  login: function(event) {
    event.preventDefault();
    var formValues = $('.sign-in > input').serializeArray()
    var hash = this._toHash(formValues)
    this.sendUser(hash)
  },

  sendUser: function(hash) {
    var that = this
    $.ajax({
      url:"user",
      type: "POST",
      data: hash,
      success: function (val) {
        // window.location.reload();
        var attr = {"status": "logged in", 'username': val.username
      }
        window.FamiasNews.router.currentUser.set(attr)
        window.FamiasNews.router._log()

        console.log("successful login")
      }
    })
  },

  _toHash: function(array) {
    var hash = {}
    for (var i = 0; i < array.length; i++) {
      hash[array[i].name] = array[i].value
    }
    return hash
  },



  signIn: function(event) {
    event.preventDefault();
    var formValues = $('.sign > input').serializeArray()
    var hash = this._toHash(formValues)
    hash['login'] = 'true';

    this.sendUser(hash)
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
})
