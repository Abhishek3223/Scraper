const cron = require('node-cron')


cron.schedule('0 */2 * * * *', () => {
  console.log('running a task every minute');
  const date = new Date();
  console.log(date);
});
