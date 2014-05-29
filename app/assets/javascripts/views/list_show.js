Trellino.Views.ListShow = Backbone.View.extend({
  template: JST['list/show'],
  
  initialize: function(options) {
    this.model = options.model;
    this.board = options.board;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "sync add remove", this.render);
    this.subviews = [];
    this.$el = $('<li class="list_entry" id="' + this.model.get('id') + '"></li>');
  },
  
  events: {
    "click .delete-list": "deleteList",
    "click .add-a-card": "addForm"
  },

  addForm: function(event) {
    $(event.currentTarget).prev().css("display","initial")
    $(event.currentTarget).css("display","none")
  },

  
  deleteList: function(event) {
    event.preventDefault();
    var listId = $(event.currentTarget).data('id');
    var list = this.board.lists().get(listId);
    
    var listShow = this;
    
    list.destroy({
      success: function() {
        listShow.board.lists().remove(list);
      }
    });
  },
  
  render: function() {
    var content = this.template({
      list: this.model
    });
    
    this.$el.html(content);
    
    var listShow = this;
    
    this.model.cards().sort();

    this.model.cards().forEach(function(card) {
      var cardShow = new Trellino.Views.CardShow({
        model: card,
        list: listShow.model
      });
      card.todoItems().fetch();
      
      listShow.subviews.push(cardShow);
      $('#list-cards-' + listShow.model.get('id')).append(cardShow.render().$el);
    });
    
    var newCardForm = new Trellino.Views.CardNew({ list: this.model });

    listShow.subviews.push(newCardForm);
    $('#new-list-' + this.model.get('id') + '-card').html(newCardForm.render().$el);

    var theList = this.model;
    var theBoard = this.board;
    
    $("#list-cards-" + this.model.get('id')).sortable({
      cursor: "move",
      opacity: 0.5,
      connectWith: '.sortable-cards',
      placeholder: 'white_area',
      dropOnEmpty: true,
      
      stop: function(event, ui) {
        var id = $(ui.item[0].firstChild).data('id');
        var theCard = theList.cards().get(id);
                
        if (ui.item.prev().index() < 0) {
          theCard.set('rank', theCard.get('rank')/2);
        } else if (ui.item.next().index() < 0) {
          theCard.set('rank', theList.cards().last().get('rank') + 1);
        } else {
          var prevIndex = ui.item.prev().index() + 1;
          var nextIndex = ui.item.next().index() + 1;
          
          var prevCardId = $(ui.item.prev()[0].firstChild).data('id');
          var nextCardId = $(ui.item.next()[0].firstChild).data('id');
        
          var prevCard = theList.cards().get(prevCardId);
          var nextCard = theList.cards().get(nextCardId);
          
          theCard.set('rank', (prevCard.get('rank') + nextCard.get('rank'))/2);
        }
        
        theCard.save();
      },
      
      receive: function(event, ui) {
        
        var id = $(ui.item[0].firstChild).data('id');
        var theCard;
        
        theBoard.lists().each(function(list) {
          var card = list.cards().get(id)
          if (card) {
            theCard = card;
          }
        });

        var sourceListId = $(ui.item[0].firstChild).data('list');
        var sourceList = theBoard.lists().get(sourceListId);
        
        var destListId = $(event.target).data('id');
        var destList = theBoard.lists().get(destListId);
                
        if (ui.item.prev().index() < 0) {
          theCard.set('rank', theCard.get('rank')/2);
        } else if (ui.item.next().index() < 0) {
          theCard.set('rank', theList.cards().last().get('rank') + 1);
        } else {
          var prevIndex = ui.item.prev().index() + 1;
          var nextIndex = ui.item.next().index() + 1;
          
          var prevCardId = $(ui.item.prev()[0].firstChild).data('id');
          var nextCardId = $(ui.item.next()[0].firstChild).data('id');
        
          var prevCard = theList.cards().get(prevCardId);
          var nextCard = theList.cards().get(nextCardId);
          
          theCard.set('rank', (prevCard.get('rank') + nextCard.get('rank'))/2);
        }
        
        theCard.save({ list_id: destListId }, {
          success: function() {
            sourceList.cards().remove(theCard);
            destList.cards().add(theCard);
          }
        });
      }
    });

    return this;
  },
  
  remove: function() {
    this.subviews.forEach(function(subview) {
      subview.remove();
    });
    
    Backbone.View.prototype.remove.call(this);
  }
});