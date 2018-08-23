let moment = require('moment');

let date = moment();

date.add(10, 'years').subtract(8, 'months')
console.log(date.format('MMM Do, YYYY'));