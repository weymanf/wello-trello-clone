window.Wello.Models.Board = Backbone.Model.extend({
	urlRoot: "/boards",

	initialize: function() {
		this.lists();
	},

	lists: function () {
		if (!this._lists) {
			this._lists = new Wello.Collections.Lists([], {
				board: this
			})
		}
		return this._lists;
	},

	parse: function (jsonResp) {
		if (jsonResp.lists) {
			this.lists().set(jsonResp.lists);
			delete jsonResp.lists;
		}
		return jsonResp;
	}
	
});