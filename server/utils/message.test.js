let expect = require('expect'); 

let {generateMessage} = require('./message');

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