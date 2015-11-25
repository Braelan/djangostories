window.FamiasNews = {
  Collections: {},
  Models: {},
  Routers: {},
  Views: {},

  initialize: function() {
    FamiasNews.posts = new FamiasNews.Collections.Posts();
    FamiasNews.posts.fetch({
      success: function() {
        console.log("fetched posts colllection news/famaiasnews.js")
      },
      error: function() {
        console.log("failed to fetch posts collection news/famiasnews.js")
      }
    });
    new FamiasNews.Routers.Router({$rootEl: $("span")});
    Backbone.history.start();
    //Backbone.history.stop(); maybe needed

  }
};
