import Hexo = require('hexo');

var hexo = new Hexo(process.cwd());

hexo.init().then(() => {
    hexo.call('generate',{
        config: '_config-custom.yml'
    }).then(() => {
        return hexo.exit();
    }).catch((err) => {
        return hexo.exit(err);
    });
});

