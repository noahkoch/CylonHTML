EndDiv
======

The name is temporary. The concept is forever.

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
