window.Wello.Views.ListShowView = Backbone.CompositeView.extend({
	template: JST["list/list_show"],

	render: function() {
		var listShow = this.template({
			list: this.model
		})

		this.$el.html(listShow);
		return this;
	}



})