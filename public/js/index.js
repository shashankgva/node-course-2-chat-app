let socket = io();

socket.on('connect', function () {
	console.log('Connected to server.');
	socket.emit('createEmail', {
		to: "shashankgva@gmail.com",
		text: "Hi This is Shashank!"
	});
	
});

socket.on('disconnect', function () {
	console.log('Disconnected from server.');
});

socket.on('newEmail', function (email) {
	console.log('New Email', email);
});

socket.on('newMessage', function (message) {
	console.log('New Message', message);
});