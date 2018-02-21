// Type definitions for hexo ^3.2.0
// Project: http://hexo.io/
// TypeScript Version: ^2.7.1

import EventEmitter = require('events');

declare module hexo{

    class HexoDefaultConfig{
      /** Site */
      title: 'Hexo'
      subtitle: string;
      description: string;
      author: 'John Doe'
      language: string;
      timezone: string;
      /** URL */
      url: 'http://yoursite.com'
      root: '/'
      permalink: ':year/:month/:day/:title/'
      permalink_defaults: {}
      /** Directory */
      source_dir: 'source'
      public_dir: 'public'
      tag_dir: 'tags'
      archive_dir: 'archives'
      category_dir: 'categories'
      code_dir: 'downloads/code'
      i18n_dir: ':lang'
      skip_render: string[]
      /** Writing */
      new_post_name: ':title.md'
      default_layout: 'post'
      titlecase: false
      external_link: true
      filename_case: 0
      render_drafts: false
      post_asset_folder: false
      relative_link: false
      future: true
      highlight: {
        enable: true,
        auto_detect: false,
        line_number: true,
        tab_replace: ''
      }
      /** Category & Tag */
      default_category: 'uncategorized'
      category_map: {}
      tag_map: {}
      /** Date / Time format */
      date_format: 'YYYY-MM-DD'
      time_format: 'HH:mm:ss'
      /** Pagination */
      per_page: 10
      pagination_dir: 'page'
      /** Extensions */
      theme: 'landscape'
      /** Deployment */
      deploy: {}
    }

    class HexoConfig extends HexoDefaultConfig {
      [key: string]:any;
    }

    class HexoPost {
      context:any;

      /**
      * title	Title
      * slug	URL
      * layout	Layout. Defaults to the default_layout setting.
      * path	Path. Hexo builds the post path based on the new_post_path setting by default.
      * date	Date. Defaults to the current date.
      * The attributes of a post can be defined in data. Additional attributes may be appended to the front-matter.
      */
      create(data, replace?, callback?:Function)
      publish(data, replace?, callback?:Function)
      /** The data must contain the content attribute. If not, Hexo will try to read the original file */
      render(source, data, callback?:Function)
    }

    /** https://hexo.io/api/router.html */
    class HexoRouter{
      routes: Object;

      list():any[];
      get(path:string):any;
      isModified(path:string):boolean;
      set(path:string, data: Object | Function ):HexoRouter;
      remove(path:string):HexoRouter;

    }

    /** https://hexo.io/api/box.html */
    class HexoBox{
      process(callback):Promise<any>;
      /**
      * Box provides many ways for path matching. You can use a regular expression, a function or an Express-style pattern string. For example:
      */
      addProcessor(pattern, fn:Function)
      load(callback):Promise<any>;
      watch(callback):Promise<any>;
      unwatch();
      isWatching():boolean;
    }

    class HexoSource extends HexoBox{
      processors:any;
    }

    class HexoRender{
      context:any;
      renderer: any;

      isRenderable(path:string):boolean;
      isRenderableSync(path:string):boolean;
      getOutput(path:string):any;
      getRenderer(ext, sync):any;
      getRendererSync(ext):any;
      render(data, options?, callback?):Promise<any>;
      renderSync(data, options?):any;
    }

    /**
    * hexo.extend.console.register('config', 'Display configuration', function(args){
    *  console.log(hexo.config);
    * });
    */
    class HexoConsole{
      store: Object;
      alias: Object;

      get(name):any;
      list():any;
      register(name:string, desc?, options?, fn?:Function)
    }

    /**
    * A filter is used to modify some specified data. Hexo passes data to filters in sequence and the filters then modify the data one after the other.
    * https://hexo.io/api/filter.html
    */
    class HexoFilter{
      store: Object;
      get(name):any;
      list():any;
      register(type:HexoFilterList, fn?:Function, priority?)
      unregister(typetype:HexoFilterList,  fn?:Function)
      exec(type, data, options):Promise<any>;
      execSync(type, data, options)
    }

    class HexoDeployer{
      store: Object;
      get(name):any;
      list():any;
      register(name:string, fn?:Function)
    }


    interface IRoute{
      /** Path not including the prefixing */
      path:string;
      data:any;
      /** Layout. Specify the layouts for rendering. The value can be a string or an array. If it’s ignored then the route will return data directly. */
      layout: string | string[];
    }

    /**
    * A generator builds routes based on processed files.
    * https://hexo.io/api/generator.html
    */
    class HexoGenerator{
      id:0;
      store: Object;
      get(name):any;
      list():any;
      /** A locals argument will get passed into the function, containing the site variables. You should use this argument to get the website data, thereby avoiding having to access the database directly. */
      register(name:string, fn:(locals:HexoLocals) => IRoute);
    }

    /**
    * A helper makes it easy to quickly add snippets to your templates. We recommend using helpers instead of templates when you’re dealing with more complicated code.
    * helpers are added in a index.js in a script folder in the theme or root directory
    * https://hexo.io/api/helper.html
    */
    class HexoHelper{
      store: Object;
      list():any;
      get(name):any;
      register(name:string, fn:(path) => any);
    }

    class HexoMigrator{
      //TODO
    }

    class HexoProcessor{
      //TODO
    }

    class HexoRenderer{
      //TODO
    }

    class HexoTag{
      //TODO
    }


    /** https://hexo.io/api/console.html */
    interface HexoExtend{
      console: HexoConsole;
      filter: HexoFilter;
      deployer: HexoDeployer;
      generator:HexoGenerator;
      helper: HexoHelper;
      migrator: HexoMigrator;
      processor: HexoProcessor;
      renderer: HexoRenderer
      tag: HexoTag;
    }

    interface HexoArgs{
        /** Enable debug mode. Display debug messages in the terminal and save debug.log in the root directory. */
        debug?:boolean;
        /** Enable safe mode. Don’t load any plugins. */
        safe?:boolean;
        /** Enable silent mode. Don’t display any messages in the terminal. */
        silent?: boolean;
        /** Specify the path of the configuration file. */
        config?:string;
    }

    class HexoLocalsToObject{
      posts	/** All posts */
      pages	/** All pages */
      categories	/** All categories */
      tags /** All tags */
      data
    }

    /**
    * Local variables are used for template rendering, which is the site variable in templates
    */
    class HexoLocals{
      ache: any;
      getters: any;

      get(name:string):any;
      set(name:string, value:any):HexoLocals;
      remove(name:string):HexoLocals;
      invalidate():HexoLocals;
      toObject(): HexoLocalsToObject
    }

    /**
    * https://hexo.io/docs/commands.html
    */
    type HexoCommands = 'new' | 'generate' | 'publish' | 'server' | 'deploy' | 'render' | 'migrate' | 'clean' | 'list' | 'version';

    /**
    * https://hexo.io/api/events.html
    */
    type HexoEvents = 'deployBefore' | 'deployAfter' | 'exit' | 'generateBefore' | 'generateAfter' | 'new' | 'processBefore' | 'processAfter' | 'ready';

    type HexoFilterList = 'before_post_render' | 'after_post_render' | 'before_exit' | 'before_generate' | 'after_generate' | 'template_locals' | 'after_init' | 'new_post_path' | 'post_permalink' | 'after_render' | 'server_middleware';

    class Hexo {
        constructor(base?:string, args?:hexo.HexoArgs);
        lib_dir:string;
        core_dir:string;
        version:string;

        base_dir:string;
        public_dir:string;
        source_dir:string;
        plugin_dir:string;
        script_dir:string;
        scaffold_dir:string;
        theme_dir:string;
        theme_script_dir:string;

        env;
        extend: HexoExtend;
        config: HexoConfig;
        log;
        render: HexoRender;
        route: HexoRouter;
        post: HexoPost;
        scaffold;
        database;
        config_path: string;

        /**
        * Box is a container used for processing files in a specified folder.
        * Hexo uses two different boxes: hexo.source and hexo.theme. The former is used to process the source folder and the latter to process the theme folder.
        */
        source: HexoSource;
        theme: HexoBox;
        locals: HexoLocalsToObject;



        init():Promise<any>
        /**
        * Execute Commands
        * Any console command can be called explicitly using the call method on the Hexo instance. Such a call takes two arguments: the name of the console command, and an options argument
        *
        */
        call(name:HexoCommands, args?:any, callback?:Function):Promise<any>
        /**
        * You should call the exit method upon successful or unsuccessful completion of a console command. This allows Hexo to exit gracefully and finish up important things such as saving the database.
        */
        exit(err?:any):any;

        model(name:string, schema:any):any;
        loadPlugin(path:string, callback:Function);

        /**
        * Hexo provides two methods for loading files: load and watch. load is used for loading all files in the source folder as well as the theme data.
        * watch does the same things load does, but will also start watching for file changes continuously.
        */
        load(callback:Function):Promise<any>;
        watch(callback:Function):Promise<any>;
        unwatch();

        execFilter(type, data, options):Promise<any>;
        execFilterSync(type, data, options);

        /**
        * Hexo inherits from EventEmitter. Use the on method to listen for events emitted by Hexo, and use the emit method to emit events. For more information, refer to the Node.js API documentation.
        */
        on(event:HexoEvents, callback:Function);
    }
}

export = hexo.Hexo;
