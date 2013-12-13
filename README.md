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
[/span class="stuff"/stuff here]
````
which compiles to:

````html
<span class="stuff">stuff here</span>
````

Inline Styles
-----

Use 

````
s.
````

Example:
````
[/span s.font-family:Helvetica;/ Helvetica !== Arial]
````

Classes and IDs
------

Use the dot and pound notation as in CSS

````
[/span .ImAClass #ImAnId/ YEAAHHH]
````

[Thanks, I'm more of a Dart person](http://github.com/noahkoch/CylonDart)
