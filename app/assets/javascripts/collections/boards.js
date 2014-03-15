window.Wello.Collections.Boards = Backbone.Collection.extend({
	url: "/boards",
	model: Wello.Models.Board,

	getOrFetch: function (id) {
		var model = this.get(id);
		var boards = this;

		if (model) {
			model.fetch();
			return model;
		} else {
			model = new Wello.Models.Board({ id: id });
			model.fetch({
				success: function () { boards.add(model) }
			});
			return model;
		}
	}


});

window.Wello.Collections.boards = new Wello.Collections.Boards();