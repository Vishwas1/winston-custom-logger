import {  LOGLEVEL } from './LogLevel'
import { ILogger } from './ILogger'
import * as winston from 'winston'
import * as path from 'path'
import * as fs from 'fs'
export class Logger implements ILogger{
  
  private static loggerInstance: Logger;
  private logger;
  private logLevel: LOGLEVEL;

  private constructor(logfileName: string, level: LOGLEVEL, dirname?: string){
    this.logger = winston.createLogger({  
      format: winston.format.simple(),
      transports: [
        new winston.transports.File({ filename: logfileName , dirname: dirname })
      ]
    });
    this.logLevel = level;
  }

  /**
   * Create instance of logger
   * @param service : Name of the service
   * @param logLevel : Log level as info | warn | error
   * @param logDirectory : (Optional) Directory path where you want to store logs
   */
  static create(service: string, logLevel: string, logDirectory?: string){
    
    if(!Logger.loggerInstance){
    
      let level: LOGLEVEL = LOGLEVEL.info;

      switch(logLevel){
        case 'info' : level = LOGLEVEL.info; break;
        case 'warn' : level = LOGLEVEL.warn; break;
        case 'error' : level = LOGLEVEL.error; break;
        default:  throw new Error('Invalid log level. Set loglevel as info | warn | error');
      }

      let logPath;
      let logfileName; 

      if(logDirectory){
        if (!fs.existsSync(logDirectory)){
          fs.mkdirSync(logDirectory);
        }
        logPath = path.join(logDirectory, service);
      }else{
        logPath = path.join(__dirname, service);
      }
      logfileName = service + "_" + Date.now() + "_" + ".log";
      
      Logger.loggerInstance = new Logger(logfileName, level, logPath);
    }
    
    return Logger.loggerInstance;
  }

  error(message: string){
    message = Date().toString() + " | " + message; 
    this.logger.error(message);
  }

  warn(message: string){
    message = Date().toString() + " | " + message; 
    this.logLevel == LOGLEVEL.warn ? this.logger.warn(message) : "";
  }

  info(message: string){
    message = Date().toString() + " | " + message; 
    this.logLevel == LOGLEVEL.info ? this.logger.info(message) : "";
  }
}
