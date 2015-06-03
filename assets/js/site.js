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
		Tabs.setup(".tabs, .tabs-vertical");

		// invoke conditional behaviors and event handlers
		initHandlers();
	};



	/**
	 * Misc dom-ready
	 */
	var initHandlers = function() {


	};



	/**
	 * Tabs
	 */
	var Tabs = (function() {

		var init = function(selector) {
			doc.ready(function() {
				$(selector).each(register);
			});
			return true;
		};

		var register = function() {
			var tabs = $(this),
				tabsMenu = tabs.find(".tabs-menu"),
				tabsContent = tabs.find(".tabs-content"),
				tabsTitle = tabsContent.find(".tabs-title");

			// Yay I have JS
			tabsMenu.addClass("visible");
			tabsTitle.remove();
			tabsContent.not(".active").hide();

			// Bind action
			tabsMenu.on("click", "a", function(e){
				e.preventDefault();

				var tab = $(this);
				if(!tab.hasClass("active")){
					tabsContent.hide();
					tabsMenu.find(".active").removeClass("active");

					tabsContent.eq(tab.index()).show();
					tab.addClass("active");
				}
			});
		};

		return {
			setup : init
		};

	})();



	// bootstrap the application
	ns.init();

})(jQuery, Site, window, document);
