// 
// 
// EndDiv, the delimiting HTML templater
// Created by @noahkoch
// This project is available on the world wide web at github dot com slash noahkoch slash EndDiv
// 
// 

var EndDiv = {

	initialize: function(el){
		EndDiv.parse(el);
	},

	parse: function(el){
		var nonParsedCode = el.html();

		var parsedCode = EndDiv.addHTMLAttributes(nonParsedCode);
		parsedCode = EndDiv.findVariables(parsedCode);	
		parsedCode = EndDiv.findAndReplaceVariables(parsedCode);

		el.html(parsedCode);
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
			'<$1>' : /\[\/(.+?)[\/]/g,
			// Add character clauses below
				// Set class and id attributes
				'style = "$1"': /s[.]([a-zA-Z0-9:;_\-]+)/g,
				'class = "$1"': /[.]([a-zA-Z0-9:;_\-]+)/g,
				'id = "$1"'		: /[#]([a-zA-Z0-9:;_\-]+)/g,
			// Div clauses must be last as it is the default
			'<div>'	  :    /\[/g,
			'</div>'	:    /\]/g
		}

		$.each(characterMap, function(replaceKey,findKey){
			parsedCode = parsedCode.replace(findKey,replaceKey);
		})
		
		// console.log('non browser interpreted code \n' + parsedCode);
		return parsedCode;

	},

	findAndReplaceVariables: function(parsedCode){
		$.each(variableHash, function(variable,value){
			parsedCode = parsedCode.replace(new RegExp('`' + variable,'g'),value);
		})
		return parsedCode;
	}

};

$(document).ready(function(){
	EndDiv.initialize($('body'));
})