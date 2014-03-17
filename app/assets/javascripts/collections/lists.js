window.Wello.Collections.Lists = Backbone.Collection.extend({
	model: Wello.Models.List,

	initialize: function(model, options) {
		this.board = options.board
	},


	url: function () {
		return '/boards/' + this.board.id + '/lists';
	}
});