import schedule from 'node-schedule'
import fs from 'fs'
import dir from './dir'

const SCHEDULE: string = process.env.SCHEDULE || '* 1 * * *'

const run = () => {
  schedule.scheduleJob(SCHEDULE, function(){
    if (fs.existsSync(dir)) fs.rmdirSync(dir, { recursive: true })
  });
}

export default run()