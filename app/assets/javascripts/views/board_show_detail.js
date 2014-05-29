Trellino.Views.BoardShowDetail = Backbone.View.extend({
  template: JST['board/show_detail'],
  
  initialize: function(options) {
    this.model = options.model;
    this.listenTo(this.model.lists(), "sync add remove", this.render);
    this.subviews = [];
  },
  
  events: {
    "click .delete-board": "deleteBoard"
  },
  
  deleteBoard: function(event) {
    event.preventDefault();
    var boardId = $(event.currentTarget).data('id');
    var board = Trellino.Collections.boards.get(boardId);
    
    var boardShow = this;
    
    board.destroy({
      success: function() {
        Trellino.Collections.boards.remove(board);
        Backbone.history.navigate(
          '#', { trigger: true }
        );
      }
    });
  },
    
  render: function() {
    var content = this.template({
      board: this.model
    });
    
    this.$el.html(content);
    
    var boardDetail = this;
    
    this.model.lists().sort();
    
    this.model.lists().forEach(function(list) {
      var listShow = new Trellino.Views.ListShow({
        model: list,
        board: boardDetail.model
      });
      
      list.cards().fetch();

      boardDetail.subviews.push(listShow);
      $('#board-lists').append(listShow.render().$el);      
    });
    
    var newListForm = new Trellino.Views.ListNew({ board: this.model });

    this.subviews.push(newListForm);
    $('#new-list').html(newListForm.render().$el);
  
    var theBoard = this.model;
    
    $("#board-lists").sortable({
      cursor: "move",
      opacity: 0.5,
      
      stop: function(event, ui) {
        var id = ui.item[0].id;
        var theList = theBoard.lists().get(id);
        
        if (ui.item.prev().index() < 0) {
          theList.set('rank', theList.get('rank')/2);
        } else if (ui.item.next().index() < 0) {
          theList.set('rank', theBoard.lists().last().get('rank') + 1);
        } else {
          var prevIndex = ui.item.prev().index() + 1;
          var nextIndex = ui.item.next().index() + 1;
          
          var prevListId = parseInt(ui.item[0].previousSibling.id);
          var nextListId = parseInt(ui.item[0].nextSibling.id);
        
          var prevList = theBoard.lists().get(prevListId);
          var nextList = theBoard.lists().get(nextListId);
          
          theList.set('rank', (prevList.get('rank') + nextList.get('rank'))/2);
        }
        
        theList.save();
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