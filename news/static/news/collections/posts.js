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

  _numDate: function(date) {
    var date_array = date.split("-");
    var year_days = parseInt(date_array[0])*1000;
    var month_days = parseInt(date_array[1])*50;
    var days = date_array[2].split("T");
    return parseInt(days[0]) + month_days + year_days;
  },

})
