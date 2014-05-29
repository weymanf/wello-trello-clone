Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'boards/:id': 'showBoardDetail'
  },
  
  index: function() {
    var boardIndex = new Trellino.Views.BoardIndex({
      collection: new Trellino.Collections.Boards()
    });
    
    boardIndex.collection.fetch();
    this._swapView(boardIndex, $('#content'));
  },
  
  showBoardDetail: function(board_id) {
    var board = Trellino.Collections.boards.getOrFetch(board_id);
    board.lists().fetch();
    
    var boardShowDetail = new Trellino.Views.BoardShowDetail({
      model: board
    });
    
    this._swapView(boardShowDetail, $('#content'));
  },
  
  _swapView: function(view, $destinationEl) {
    if (this._currentView) {
      this._currentView.remove();
    }
    
    this._currentView = view;
    $destinationEl.html(view.render().$el);
  }
});