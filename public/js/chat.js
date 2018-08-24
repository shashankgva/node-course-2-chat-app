let socket = io(); 

function scrollToBottom() {
	let message = $('#messages');
	let newMessage = $('li:last-child');

	let scrollHeight = message.prop('scrollHeight');
	let clientHeight = message.prop('clientHeight');
	let scrollTop = message.prop('scrollTop');
	let newMessageHeight = newMessage.innerHeight();
	let lastmessageHeight = newMessage.prev().innerHeight();


	if (clientHeight + scrollTop + newMessageHeight + lastmessageHeight >= scrollHeight) {
		message.scrollTop(scrollHeight);
	}
}

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
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = $('#message-template').html();
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime 
	});

	$('#messages').append(html);

	scrollToBottom();

	// let formattedTime = moment(message.createdAt).format('h:mm a');

	// console.log('New Message', message);

	// let li = $('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text}`);

	// $('#messages').append(li); 
});

socket.on('newLocationMessage', function (message) {
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = $('#location-message-template').html();
	let html = Mustache.render(template, {
		from: message.from,
		createdAt: formattedTime,
		url: message.url
	});
	$('#messages').append(html);

	scrollToBottom();
});

// socket.on('newLocationMessage', function (message) {
// 	let formattedTime = moment(message.createdAt).format('h:mm a');
// 	let li = $('<li></li>');

// 	let a = $('<a target="_blank">My Current Location</a>');

// 	li.text(`${message.from} ${formattedTime}: `);
// 	a.attr('href', message.url);
// 	li.append(a);
// 	$('#messages').append(li);  
// });

// socket.emit('createMessage', {
// 	from: 'Nanu',
// 	text: 'Sumne hage'
// }, function (data) {
// 	console.log('Hi, Got it!!', data);
// });

$('#message-form').on('submit', function(e) {
	e.preventDefault();

	let textBox = $('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: textBox.val()
	}, function() {
		textBox.val('');
	});
});

let locationButton = $('#send-location');

locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by this browser!');
	}

	locationButton.prop('disabled', true).text('Sending...');
	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.prop('disabled', false).text('Send Location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.prop('disabled', false).text('Send Location');
		alert('unable to get current position.');
	});
});	