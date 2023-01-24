const cron = require('node-cron') 


cron.schedule('0 0 */3 * * *', () => {
  console.log('running a task every minute');
});