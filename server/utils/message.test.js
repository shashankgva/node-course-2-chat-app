let expect = require('expect'); 

let {generateMessage, generateLocationMessage} = require('./message');

describe('generate Message', () => {
	it('Should generate correct message object', () => {
		let from = 'Shash';
		let text = 'Some message from shash';
		let message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			text
		});
	});
});

describe('generateLocationMessage', () => {
	it('Should generate correct message object', () => {
		let from = 'Shash';
		let latitude = 15;
		let longitude = 16;
		let url = 'https://www.google.com/maps?q=15,16';

		let message = generateLocationMessage(from, latitude, longitude);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			url
		});
	});
});