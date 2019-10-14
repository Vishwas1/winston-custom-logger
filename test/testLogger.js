
const path = require('path')

const { Logger } = require('../dist/index')

const logPath = path.join(__dirname,'../logs/')

const logger = Logger.create('service1', 'warn', logPath)

const errMethod = () => {
  logger.info('errMetho STARTS')
  throw new Error("new error")
}

const meth = () => {
  logger.info('meth STARTS')
  logger.warn('meth STARTS')
  errMethod();
  logger.info('meth ENDS')
}

setInterval(()=>{
  logger.info('ticking...')
  try{
    logger.info('before')
    meth();
  }catch(e){
    logger.error(e.toString())
  }
}, 2000)




