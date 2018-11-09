// importScript User:Wetittwinkle/twinkle-dev.js，後果自負。

(function () {
    var PREFIX = 'User:Wetittwinkle/';
    var tests = [];

    var ajax = function (title) {
        return $.ajax({
            url: 'https://zh.wikipedia.org/w/index.php?title=' + title + '&action=raw&ctype=text/javascript',
            dataType: 'text',
        });
    };

    var load = function (p) {
        return ajax(PREFIX + p);
    };

    var message = function (text) {
        console.log('[Wtwinkle]', text);
    //    $('#simpleSearch input[type="search"]').attr('placeHolder', text);
    };

    var scripts = ['morebits.js',
    'twinkle.js',
    'modules/twinklearv.js',
    'modules/twinklewarn.js',
    'modules/friendlyshared.js',
    'modules/friendlytag.js',
    'modules/friendlytalkback.js',
    'modules/twinklebatchdelete.js',
    'modules/twinklebatchundelete.js',
    'modules/twinkleblock.js',
    'modules/twinkleclose.js',
    'modules/twinkleconfig.js',
    'modules/twinklecopyvio.js',
    'modules/twinkledelimages.js',
    'modules/twinklediff.js',
    'modules/twinklefluff.js',
    'modules/twinkleimage.js',
    'modules/twinkleprotect.js',
    'modules/twinklespeedy.js',
    'modules/twinkleunlink.js',
    'modules/twinklexfd.js'
    ];

    var styles = ['morebits.css',
    'twinkle.css',
    'modules/twinkleconfig.css'
    ];

    var i=0;

    mw.loader.using(['mediawiki.user', 'mediawiki.util', 'mediawiki.RegExp', 'mediawiki.Title', 'jquery.ui.dialog', 'jquery.tipsy']).done(function () {
        for(i=0; i<styles.length; i++) {
            mw.loader.load('https://zh.wikipedia.org/w/index.php?title=' + PREFIX + styles[i] + '&action=raw&ctype=text/css', 'text/css');
        }

        i=0;
        var finished = 0;
        var code = [];

        // all
        message('Loading WTW...');
        var promises = [];
        var done = function (x) {
            return function (data) {
                finished++;
                //message('Loading WTW... (' + finished + '/' + tests.length + ')');
                code[x] = data;
            };
        };
        for (i=0; i<scripts.length; i++) {
            promises[i] = load(scripts[i]).done(done(i));
        }
        $.when.apply($, promises).done(function () {
            eval(code.join('\n;\n'));
            message('Twinkle Done');
        });
    });
})();

