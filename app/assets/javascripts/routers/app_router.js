window.Wello.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		"": "boardIndex",
		"boards/new": "boardNew",
		"boards/:id": "boardShow"
	},

	boardIndex: function() {
		var boardIndexView = new Wello.Views.BoardIndexView({
			collection: Wello.Collections.boards
		});
		Wello.Collections.boards.fetch();
		this._swapView(boardIndexView);
	},

	boardNew: function() {
		var board = new Wello.Models.Board();
		var newView = new Wello.Views.BoardFormView({
			model: board,
			collection: Wello.Collections.boards
		});

		this._swapView(newView);
	},

	boardShow: function(id) {
		var board = Wello.Collections.boards.getOrFetch(id)

		var showView = new Wello.Views.BoardShowView({ 
			model: board
		});

		this._swapView(showView);
	},

	_swapView: function(view) {
		if(this.currentView) {
			this.currentView.remove();
		}

		this.currentView = view;
		$("#content").html(view.render().$el);
	}

});