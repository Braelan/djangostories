FamiasNews.Collections.Posts = Backbone.Collection.extend({
  // model: FamiasNews.Models.Post,
  //this will look to root/api/posts and expect there to be some json there.x
  url: "/api/posts",

  getOrFetch: function(id) {
    var post = this.get(id)
    var posts = this;
    if (!post) {
      post = new FamiasNews.Models.Post({id:id});
      post.fetch({
        success: function() {
          posts.add(post);
        }
      })
    } else {
      post.fetch();
    }
    return post;
  },

  comparator: function(a,b) {
      return this._numDate(a.get("created_date")) < this._numDate(b.get("created_date"))
  },

  parse: function(payload) {
    for (var i = 0; i < payload.length; i++) {
      payload[i].image = this._parse_images(payload[i])
      payload[i].authordate = this._parse_author_published_date(payload[i])
      }
      return payload
  },

  _parse_images: function(post) {
    if (post.image != null) {
      var url = post.image.split("/");
      var imageurl = "static".concat("/", url[4],"/", url[5]);
      return imageurl
    }
    return null
  },

  _parse_author_published_date: function(post) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    "August", "September", "October", "November", "December"]
    var text = post.published_date;
    var groups = text.split("-");
    var published_month = " " + months[parseInt(groups[1]) - 1] + " " + groups[0];
    var authordate = "  Written by " + post.author + ' in' + published_month;
    return authordate;
  },

  _numDate: function(date) {
    var date_array = date.split("-");
    var year_days = parseInt(date_array[0])*1000;
    var month_days = parseInt(date_array[1])*50;
    var days = date_array[2].split("T");
    return parseInt(days[0]) + month_days + year_days;
  },

})
