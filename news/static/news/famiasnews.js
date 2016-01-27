window.FamiasNews = {
  Collections: {},
  Models: {},
  Routers: {},
  Views: {},

  initialize: function() {
    FamiasNews._ajax_setup();
    FamiasNews.posts = new FamiasNews.Collections.Posts();
    FamiasNews.user = new FamiasNews.Models.User()
    FamiasNews.user.fetch();
    FamiasNews.posts.fetch({
      success: function() {
        console.log("fetched posts colllection news/famiasnews.js")
      },
      error: function() {
        console.log("failed to fetch posts collection news/famiasnews.js")
      }
    });
    FamiasNews.router = new FamiasNews.Routers.Router({$rootEl: $("span"), collection: FamiasNews.posts, currentUser: FamiasNews.user});
    Backbone.history.start();
    //Backbone.history.stop(); maybe needed

  },



  // consider refactoring to a util from (docs.djangoproject.com/en/dev/ref/csrf/#ajax)
   _getCookie: function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != "") {
      var cookies = document.cookie.split(';');
      for(var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if(cookie.substring(0, name.length + 1) == (name+ "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break
        }
      }
    }
    return cookieValue;
  },

  csrftoken: function() {
    return FamiasNews._getCookie('csrftoken');
  },

  _csrfSafeMethod: function(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  },
  //
  // //hopefully AJAX will play nicely with django with the help of this setup
  _ajax_setup: function() {
    $.ajaxSetup({
      beforeSend: function(xhr, settings) {
        if (!FamiasNews._csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", FamiasNews.csrftoken());
        }
      }
    });

  }
};
