
/**
 * General initialization code
 */

var TwinkleConfig, FriendlyConfig;

var wikipedia_script_sentry_load;
if ( typeof wikipedia_script_sentry_load === 'undefined' ) {
	wikipedia_script_sentry_load = [];
};
wikipedia_script_sentry_load.push(function() {
	// don't activate on special pages other than "Contributions" so they load faster, especially the watchlist
	// also, can't theoretically run Twinkle on old Internet Explorer, just die...!
	if( (wgNamespaceNumber === -1 && wgTitle !== "Contributions") || ($.client.profile().name === 'msie' && $.client.profile().versionBase < 9) ) {
		return;
	}

	$(document).ready(function() {
		// set up TwinkleConfig and FriendlyConfig
		// look for the unqualified names to start with, to support legacy installations of the scripts
		var usingDefaults = false;
		if (typeof(TwinkleConfig) === "undefined") {
			if (typeof(Twinkle.prefs) === "undefined" || typeof(Twinkle.prefs.twinkle) === "undefined") {
				// this should really be a cloning operation, but since TwinkleConfig should
				// never be modified, that doesn't matter
				TwinkleConfig = Twinkle.defaultConfig.twinkle;  // intentional use of global namespace (TwinkleConfig)
				usingDefaults = true;
			} else {
				TwinkleConfig = Twinkle.prefs.twinkle;  // intentional use of global namespace (TwinkleConfig)
			}
		}
		if (!usingDefaults) {
			$.each(Twinkle.defaultConfig.twinkle, function(key, value) {
				if (typeof(TwinkleConfig[key]) === "undefined") {
					TwinkleConfig[key] = value;
				}
			});
		}

		usingDefaults = false;
		if (typeof(FriendlyConfig) === "undefined") {
			if (typeof(Twinkle.prefs) === "undefined" || typeof(Twinkle.prefs.friendly) === "undefined") {
				FriendlyConfig = Twinkle.defaultConfig.friendly;  // intentional use of global namespace (FriendlyConfig)
				usingDefaults = true;
			} else {
				FriendlyConfig = Twinkle.prefs.friendly;  // intentional use of global namespace (FriendlyConfig)
			}
		}
		if (!usingDefaults) {
			$.each(Twinkle.defaultConfig.friendly, function(key, value) {
				if (typeof(FriendlyConfig[key]) === "undefined") {
					FriendlyConfig[key] = value;
				}
			});
		}

		// load the modules in the order that the tabs should appears
		// misc. ones first
		Twinkle.config.init();
		twinkleunlink();
		twinklediff();
		twinklefluffinit();
		// deletion
		twinklespeedy();
		twinkleprod();
		twinklexfd();
		twinkleimage();
		// maintenance
		twinkleprotect();
		friendlytag();
		// user/user talk-related
		twinklewarn();
		Twinkle.arv();
		friendlywelcome();
		friendlyshared();
		friendlytalkback();
		if (userIsInGroup('sysop')) {
			twinklecloser();
			twinkledeli();
			twinkleproddelete();
			twinklebatchdelete();
			twinklebatchprotect();
			twinkleimagetraverse();
			twinklebatchundelete();
		}
		// run the initialization callbacks for any custom modules
		$(Twinkle.initCallbacks).each(function(k, v) { v(); });
		Twinkle.addInitCallback = function(func) { func(); };
	});
});

importScript('User:' + wgUserName + '/twinkleoptions.js');

// Developers: you can import custom Twinkle modules here
// for example, importScript('User:UncleDouggie/morebits-test.js');

importScript('Wikipedia:WikiProject_User_scripts/Scripts/Load_sentry');  // leave this last
