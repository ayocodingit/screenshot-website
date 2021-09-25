require('dotenv').config();
const schedule = require('node-schedule');
const fs = require('fs')
const dir = 'tmp'

const run = () => {
  schedule.scheduleJob(process.env.SCHEDULE, function(){
    if (fs.existsSync(dir)) fs.rmdirSync(dir, { recursive: true })
  });
}

module.exports = run()