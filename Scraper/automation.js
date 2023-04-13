const cron = require('node-cron')
const run = require('./linkLoader')

cron.schedule('0 */2 * * * *', () => {
  console.log('running a task every minute');
  const date = new Date();
  run();
  console.log(date);
});
