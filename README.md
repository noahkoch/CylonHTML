CylonHTML
======

CylonHTML is like a shiny robot cloaked in some sexy HTML.

What?
-----
EndDiv is an HTML template creator which requires delimitation allowing your code to be minified. 
Finally your HTML can be as cool as Javascript!

How?
-----
An attribute is defined using brackets. It's defaulted to a div.

This:

````html
<div> Stuff here</div>
````

Becomes
````
[stuff here]
````
to define specific attributes, you can user
````
[span class="stuff"/stuff here]
````
which compiles to:

````html
<span class="stuff">stuff here</span>
````

#####Google Web Fonts


Use 

````
googlefont\Font+Name==
````

Example:
````
google\Open+Sans==
````

Also supports fontsizes in the font name

#####Stylesheets

Use 

````
style\stylesheetname==
````

These are stored in /public/styles

#####Page Titles


Use 

````
Page Name==
````

#####Adding Pages

All public facing pages to be rendered in the CylonHTML format are located in the public directory. To view the page navigate to 
```
/#/your-page-name
```
notice the exclusion of a file extension. All Cylon files must end in the .cylon extension.


Example Page
-----
```
We lost the Pegasus==
style\error==
googlefont\Open+Sans==

[class="container"\

	[h1 \Page not found, Starbuck!]
	[a href="/#/"\Go Home]
	[img src="lib/adama.jpg"\]
	[class='this'\We couldn't find the page you were looking for!]
	[class="remedy"\ 
		[h3\Let's remdy this issue]

		[ul\
			[li\Do you have any files under the public directory?]
			[li\Do your files end in '.cylon'?]
			[li\Is your computer on?]
			[li\Do you have an 'index.clyon' file?]
		]
	]
	[h6\This page was created by eating our own dog food.]
]
```

[Thanks, I'm more of a Dart person](http://github.com/noahkoch/CylonDart)
