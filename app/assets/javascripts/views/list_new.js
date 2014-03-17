window.Wello.Views.ListNewView = Backbone.View.extend({
	template: JST["list/list_form"],

	initialize: function(options) {
		this.board = options.board;
	},

	events: {
		"click .list-new": "submit"
	},

	submit: function(event) {
		var view = this;

		event.preventDefault();
		
		var params = $(event.target.parentElement).serializeJSON()["list"];
		var list = new Wello.Models.List(params);
		this.board.lists().create(params);
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