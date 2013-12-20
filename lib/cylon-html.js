// 
// 
// CylonHTML, the delimiting HTML templater
// Created by @noahkoch
// This project is available on the world wide web at github dot com slash noahkoch slash CylonHTML
// 
// 

var cylonHTML = {

	initialize: function(pageData){
		if(pageData){
			var parsed = cylonHTML.parse(pageData);
			$('body').html(parsed);
			window.convertCode = parsed;
			cylonHelpers.helperListeners();
		}
	},

	validElements: ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","bgsound","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","i","iframe","img","input","ins","isindex","kbd","keygen","label","legend","li","link","listing","main","map","mark","marquee","menu","menuitem","meta","meter","nav","nobr","noframes","noscript","object","ol","optgroup","option","output","p","param","plaintext","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr","xmp"],

	getPage: function(pagePath){
		$.ajax({
			type: "GET",
			url: '/public/' + pagePath + '.cylon'
		})
		.done(function(data){
			cylonHTML.initialize(data);
		})
		.fail(function(){
			cylonHTML.pageNotFound(pagePath);
		})
	},

	parse: function(pageData){
		var header = pageData.split('==');
		cylonHTML.headerInfo(header);
		
		var endTags = [];
		var constructPage = [];

		var output = String(pageData).split(/[\[\]]/);
		output.shift();

		$.each(output, function(index,value){
			var valueAttrs = value.split('\\');
			if(valueAttrs.length > 1){
				attrs = valueAttrs[0];
				// check for any helpers
				if(attrs.match(/(link-)/) !== null){

					var page = attrs.match(/link-(.+)/)[1]
					constructPage.push("<a href='#' data-link='" + page + "''>" + valueAttrs[1])
					endTags.unshift("</a>");

				}else{
					// if a valid element is not within your attributes a div tag will be placed in
					if((attrs.indexOf('=') !== -1) && !(cylonHTML.validElements.indexOf(attrs.substr(0,attrs.indexOf(' '))) !== -1) ){
						attrs = 'div ' + attrs; 
					}

					if(attrs.indexOf(' ') !== -1){
						var divElement = attrs.substr(0,attrs.indexOf(' '));
					}else{
						var divElement = attrs;
					}
					constructPage.push("<" + attrs + ">" + valueAttrs[1])
					endTags.unshift("</" + divElement+ ">");
				}

			}else if(!valueAttrs[0].match(/^\s*$/)){
				constructPage.push("<div>" + valueAttrs[0]);
				endTags.unshift("</div>");
			}else{
				constructPage.push(endTags.shift());
			}
		});

		return constructPage.join(' ')
		
	},

	headerInfo: function(page){
		page = page.slice(0,page.length-1)
		$.each(page,function(ind,element){
			if(element.indexOf('style\\') !== -1){
				var styleTitle = element.split('\\')[1];
				$('head').append('<link rel="stylesheet" type="text/css" href="/public/styles/' + styleTitle + '.css">');
			}
			else if(element.indexOf('googlefont\\') !== -1){
				var styleTitle = element.split('\\')[1];
				$('head').append('<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=' + styleTitle + '">');
			}else{
				$('title').html(element)
			}
		})
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

	

	// findAndReplaceVariables: function(parsedCode){
	// 	$.each(variableHash, function(variable,value){
	// 		parsedCode = parsedCode.replace(new RegExp('`' + variable,'g'),value);
	// 	})
	// 	return parsedCode;
	// },

	pageNotFound: function(pagePath){
		$.get('/lib/error.cylon',function(data){cylonHTML.initialize(data)});
	}
	/// let's do some magic
// 	createPage: function(fileName,addLink){
// 		cylonHTML.initPageCreation();
// 		console.log('this will create a file named ' + fileName +'.cylon');
// 	},

// 	initPageCreation: function(){
// 		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
// var fs = null;
// 	}
};