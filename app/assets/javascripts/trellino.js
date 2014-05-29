window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {    
    Trellino.Collections.boards.fetch();
    
    new Trellino.Routers.AppRouter();
    
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellino.initialize();
});