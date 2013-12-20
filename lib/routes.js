// The essential main router
$.routes.add('/{id:word}/', 'namedRoute', function() {
        cylonHTML.getPage(this.id);
});

$.routes.add('/', function() {
        cylonHTML.getPage('index');
});


// You can add other junk here