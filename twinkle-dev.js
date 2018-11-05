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

<<<<<<< HEAD
    tests.push('morebits.js');
    tests.push('twinkle.js');
    tests.push('modules/twinklearv.js');
    tests.push('modules/twinklewarn.js');
    tests.push('modules/friendlyshared.js');
    tests.push('modules/friendlytag.js');
    tests.push('modules/friendlytalkback.js');
    tests.push('modules/twinklebatchdelete.js');
    tests.push('modules/twinklebatchundelete.js');
    tests.push('modules/twinkleblock.js');
    tests.push('modules/twinkleclose.js');
    tests.push('modules/twinkleconfig.js');
    tests.push('modules/twinklecopyvio.js');
    tests.push('modules/twinkledelimages.js');
    tests.push('modules/twinklediff.js');
    tests.push('modules/twinklefluff.js');
    tests.push('modules/twinkleimage.js');
    tests.push('modules/twinkleprotect.js');
    tests.push('modules/twinklespeedy.js');
    tests.push('modules/twinkleunlink.js');
    tests.push('modules/twinklexfd.js');

    mw.loader.using(['mediawiki.user', 'mediawiki.util', 'mediawiki.RegExp', 'mediawiki.Title', 'jquery.ui.dialog', 'jquery.tipsy']).done(function () {
        mw.loader.load('https://zh.wikipedia.org/w/index.php?title=User:Wetittwinkle/morebits.css&action=raw&ctype=text/css', 'text/css');
        
        var i=0;
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
        for (i=0; i<tests.length; i++) {
            promises.push(load(tests[i]).done(done(i)));
        }
        $.when.apply($, promises).done(function () {
            eval(code.join('\n;\n'));
            message('Twinkle Done');
        });
    });
=======
	var tests = ['morebits.js',
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

	mw.loader.using(['mediawiki.user', 'mediawiki.util', 'mediawiki.RegExp', 'mediawiki.Title', 'jquery.ui.dialog', 'jquery.tipsy']).done(function () {
		mw.loader.load('https://zh.wikipedia.org/w/index.php?title=User:Wetittwinkle/morebits.css&action=raw&ctype=text/css', 'text/css');

		var i=0;
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
		for (i=0; i<tests.length; i++) {
			promises[i] = load(tests[i]).done(done(i));
		}
		$.when.apply($, promises).done(function () {
			eval(code.join('\n;\n'));
			message('Twinkle Done');
		});
	});
>>>>>>> 550ee08... Do not use push in twinkle-dev.js
})();

