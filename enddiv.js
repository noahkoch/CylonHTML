// Dependent on jQuery

var EndDiv = {
	
	initialize: function(){
		// EndDiv.errorLog();
		EndDiv.parse();
	},

	parse: function(){
		var nonParsedCode = $('body').html();

		var parsedCode = EndDiv.addHTMLAttributes(nonParsedCode);
		parsedCode = EndDiv.findVariables(parsedCode);	
		parsedCode = EndDiv.findAndReplaceVariables(parsedCode);

		$('body').html(parsedCode);
	},

	findVariables: function(parsedCode){
		window.variableHash = {}
		var variables = parsedCode.match(/`(.+?)`/g);
		if(variables){
			$.each(parsedCode.match(/`(.+?)`/g),function(ind,declaration){

				// Match array returns as [original,variable,value]
				var seperate = declaration.match(RegExp(/`(.+?)=(.+?)`/));
				// Remove the existance of this variable from the document
				parsedCode = parsedCode.replace(seperate[0],'');
				variableHash[seperate[1].trim()] = seperate[2].trim();
			});
		}
		return parsedCode;
	},

	addHTMLAttributes: function(nonParsedCode){
		
		var parsedCode = nonParsedCode;
		// Items will be replaced in order 
		// output is the key, input is the value in regex format
		characterMap = {
			// gets all set attributes
			'' : /[\/](.+?)[\/]/g,
			// Add character clauses below
			// 
			// Div clauses must be last as it is the default
			'<div>'	  :    /\[/g,
			'</div>'	:    /\]/g
		}

		$.each(characterMap, function(replaceKey,findKey){
			parsedCode = (replaceKey == '') ? parsedCode.replace(findKey,'<$1>') : parsedCode.replace(findKey,replaceKey);
		})
		
		console.log('non browser interpreted code \n' + parsedCode);
		return parsedCode;

	},

	findAndReplaceVariables: function(parsedCode){
		$.each(variableHash, function(variable,value){
			console.log(new RegExp('`' + variable));
			parsedCode = parsedCode.replace(new RegExp('`' + variable,'g'),value);
		})
		return parsedCode;
	}

};

$(document).ready(function(){
	EndDiv.initialize();
})