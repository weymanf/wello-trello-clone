Trellino.Collections.Cards = Backbone.Collection.extend({
  model: Trellino.Models.Card,
  
  initialize: function(models, options) {
    this.list = options.list;
  },
  
  url: function() {
    return this.list.showUrl() + '/cards';
  },
  
  comparator: function(card) {
    return card.get('rank');
  }
});