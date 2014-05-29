Trellino.Views.CardNew = Backbone.View.extend({
  template: JST['card/new'],
  
  events: {
    "submit #new-card-form": "createCard"
  },
  
  initialize: function(options) {
    this.list = options.list;
  },
    
  render: function() {
    var content = this.template();
    
    this.$el.html(content);
    return this;
  },
  
  createCard: function(event) {
    event.preventDefault();
    
    var title = this.$('#card-title').val();
    var description = this.$('#card-description').val();

    var card = new Trellino.Models.Card({
      list: this.list,
      description: description,
      title: title,
      list_id: this.list.get('id'),
      rank: this.list.cards().length + 1
    });
    
    var newCard = this;
    
    card.save({}, {
      success: function() {
        newCard.list.cards().add(card);
      }
    });
  }
});