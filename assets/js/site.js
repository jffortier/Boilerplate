var Site = {};
(function($, ns, window, document) {
	"use strict";

	var doc = $(document), // jQuery document
		win = $(window),   // jQuery window
		config = {};       // app configurations


	/**
	 * First-phase app initialization, triggered immediately after the library has
	 * loaded. DOM is NOT ready.
	 */
	ns.init = function() {

		// fallback when _gaq is not included
		if(typeof window['_gaq'] == "undefined") {
			window['_gaq'] = [];
		}

		// continue initialization. place all new code before this.
		doc.ready(initAfterDOM);
	};


	/**
	 * Second-phase app initialization, triggered after DOM-ready for instances
	 * that require a full DOM. Reliably triggered after init() has ran.
	 */
	var initAfterDOM = function() {



	};

	// bootstrap the application
	ns.init();

})(jQuery, Site, window, document);
