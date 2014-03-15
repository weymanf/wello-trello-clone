window.Wello.Views.BoardFormView = Backbone.View.extend({
	template: JST["board/board_form"],

	events: {
		"submit form": "submit"
	},

	render: function () {
		var formContent = this.template({
			board: this.model
		});
		this.$el.html(formContent);
		return this;
	},

	submit: function(event) {
		event.preventDefault();
		var params = $(event.currentTarget).serializeJSON().board;
		if (this.model.isNew()) {
			this.collection.create(params, {
				success: function() {
					Backbone.history.navigate("", { trigger: true});
				}
			});
		}
	}	
})