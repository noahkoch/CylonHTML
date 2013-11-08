// Dependent on jQuery

var EndDiv = {
	
	initialize: function(){
		EndDiv.parse();
		EndDiv.variables();
	},

	parse: function(){

		var nonParsedCode = $('body').html();
		var parsedCode = nonParsedCode;

		// Items will be replaced in order 
		// output is the key, input is the value in regex format
		characterMap = {
			// Add character clauses below
			'' : /[(](.+?)[\/]/,
			// Div clauses must be last as it is the default
			'<div>'	  :    /\(/g,
			'</div>'	:    /\)/g
		}

		$.each(characterMap, function(replaceKey,findKey){
			// '<' + /[(](.+?)[\/]/ + '>' /
			if(replaceKey == ''){
				parsedCode = parsedCode.replace(findKey,'<$1>')
			}
			else{
				parsedCode = parsedCode.replace(findKey,replaceKey)
			}
		})
		
		console.log(parsedCode);
		$('body').html(parsedCode)

	},

	variables: function(){
		variableHash = {}
	},

	add_to_variables: function(variable,contents){

	}

};

$(document).ready(function(){
	EndDiv.initialize();
})