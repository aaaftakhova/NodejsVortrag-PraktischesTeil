var util = require('util'),
    EventEmitter = require('events').EventEmitter;

function CustomEmitter() {
	EventEmitter.call(this);
};
util.inherits(CustomEmitter, EventEmitter);

var customEmitter = new CustomEmitter();

var addnewlistener = function() {
	// catch event every time
	customEmitter.on('customEvent', function(parameter) {
		if (parameter == 'valid') {
			console.log('customEvent occured: ' + parameter);		
		} else if (parameter == 'erroneous') {
			// error emit point
			customEmitter.emit('error', new Error('Errouneous parameter!'));
		}
      
    });
};

// error listener
customEmitter.on('error', (err) => {
  console.log(err);
});

// catch event only once
customEmitter.once('customEvent', function(parameter) {
  console.log('first time customEvent occured: ' + parameter);
  addnewlistener();
});



customEmitter.emit('customEvent', 'valid');
customEmitter.emit('customEvent', 'valid');
customEmitter.emit('customEvent', 'erroneous');