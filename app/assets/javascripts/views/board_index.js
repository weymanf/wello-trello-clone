window.Wello.Views.BoardIndexView = Backbone.View.extend({
	template: JST["board/board_index"],

	initialize: function() {
		this.listenTo(this.collection, "sync", this.render);
	},

	render: function() {
		var indexContent = this.template({
			boards: this.collection
		});

		this.$el.html(indexContent);
		return this;
	}
	
});