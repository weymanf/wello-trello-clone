window.Wello.Views.ListNewView = Backbone.View.extend({
	template: JST["list/list_form"],

	initialize: function(options) {
		this.board = options.board;
	},

	events: {

	},

	render: function() {
		console.log(this.board.lists().length)
		var listNewContent = this.template({
			board: this.board
		});

		this.$el.html(listNewContent);

		return this;
	}
	
})