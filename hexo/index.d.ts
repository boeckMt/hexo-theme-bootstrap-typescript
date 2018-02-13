// Type definitions for hexo ^3.2.0
// Project: http://hexo.io/
// TypeScript Version: ^2.7.1

import EventEmitter = require('events');

declare module hexo{
    
    interface Iargs{
        /** Enable debug mode. Display debug messages in the terminal and save debug.log in the root directory. */
        debug?:boolean;
        /** Enable safe mode. Don’t load any plugins. */
        safe?:boolean;
        /** Enable silent mode. Don’t display any messages in the terminal. */
        silent?: boolean;
        /** Specify the path of the configuration file. */
        config?:string;
    }

    class Hexo {
        constructor(base?:string, args?:hexo.Iargs);
        init():Promise<any>
        call(name:string, args?:any, callback?:Function):Promise<any>
        exit(err?:any):any;
    }
}

export = hexo.Hexo;


