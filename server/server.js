const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user conected.');

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to group!!!',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New Member has joined the group',
		createdAt: new Date().getTime()
	});

	// socket.emit('newEmail', {
	// 	from: "shashankgva@gmail.com",
	// 	text: "Hi Watsup!!?",
	// 	createdAt: 123
	// });

	
	socket.on('createEmail', (newEmail) => {
		console.log('createEmail', newEmail);
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		// io.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
		socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from client.');
	});




});

server.listen(port, () => {
	console.log(`App Started on PORT ${port}`);
});