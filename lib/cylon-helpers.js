cylonHelpers = {
	defineHelpers: {
	},

	helperFunctions: {
		// functions called in the same order of their regex
		regex: ['(link-)'],
		
		linkHelper: function(){

		}


	},

	helperListeners: function(){
		cylonHelpers.linkHelperListener();
	},

	linkHelperListener: function(){
		$('[data-link]').click(function(){
			$.routes.find('namedRoute').routeTo({id: $(this).attr('data-link')});
			return false;
		});
	}
}