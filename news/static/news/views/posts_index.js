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
    if (posts.length > 0 && $("a").length === 0) {
      posts.each( function(post){
        var $post = $('<div></div', {
          "class": "post"
        });
        if (post.escape("author") != "Null") {
        $image = this._create_image(post);
        $title = this._create_link(post);
        $date = this._create_author_published_date(post);
        $subtitle = this._create_subtitle(post);
        if ($image != "undefined") {
          $post.append($image);
        }
        $post.append($title);
        $post.append($date)
        $post.append($subtitle);
        this.$el.append($post);
        this.$el.append("<br>");
      }
      }.bind(this))
    }

    return this;
  },

// create a link for use as the post title in render
  _create_link: function (post) {
    var $li = $("<a></a>");
    $li.text(post.escape("title"));
    link = '#posts/' + post.escape("id");
    $li.attr('href', link);
    return $li;
  },
  // create the body of the post as a <p>
  _create_subtitle: function (post) {
    $subtitle = $('<p></p>', {
                  text: post.escape("subtitle")
    })
    return $subtitle;

  },

  _create_author_published_date: function (post) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                      "August", "September", "October", "November", "December"]
      var text = post.escape("published_date");

      var groups = text.split("-");
      var published_month = " " + months[parseInt(groups[1]) - 1] + " " + groups[0];
      var authordate = "Written by " + post.escape("author") + ' in' + published_month;

    $authordate = $('<em></em>', {
                    text: authordate
    });
    return $authordate;
  },

  _create_image: function (post) {
    if (post.escape("image").length > 0) {
      var url = post.escape("image").split("/");
      var imageurl = "static".concat("/", url[4],"/", url[5]);
      $image = $("<img></img>", {
        src: imageurl
      });
      return $image;
    } else
      return undefined;

  }

})
