let socket = io();

socket.on('connect', function () {
	console.log('Connected to server.');
	// socket.emit('createEmail', {
	// 	to: "shashankgva@gmail.com",
	// 	text: "Hi This is Shashank!"
	// });
	
});

socket.on('disconnect', function () {
	console.log('Disconnected from server.');
});

// socket.on('newEmail', function (email) {
// 	console.log('New Email', email);
// });

socket.on('newMessage', function (message) {
	console.log('New Message', message);

	let li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	$('#messages').append(li); 
});

socket.on('newLocationMessage', function (message) {
	let li = $('<li></li>');

	let a = $('<a target="_blank">My Current Location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	$('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'Nanu',
// 	text: 'Sumne hage'
// }, function (data) {
// 	console.log('Hi, Got it!!', data);
// });

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {

	});
});

let locationButton = $('#send-location');

locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by this browser!');
	}

	navigator.geolocation.getCurrentPosition(function(position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		alert('unable to get current position.');
	});
});	