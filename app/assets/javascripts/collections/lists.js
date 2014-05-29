Trellino.Collections.Lists = Backbone.Collection.extend({
  model: Trellino.Models.List,
  
  initialize: function(models, options) {
    this.board = options.board;
  },
  
  url: function() {
    return this.board.url() + "/lists";
  },
  
  comparator: function(list) {
    return list.get('rank');
  }
});