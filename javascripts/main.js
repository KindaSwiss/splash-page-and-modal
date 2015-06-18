
(function () {
'use strict';


var ui = {
	attached: function () {
		this.ui = this.$$;
	}
};

/**
 * Listens to the events specified on the window object. 
 * Multiple methods can be added by separating them with 
 * a comma. The keys should be the event and should map to 
 * methods on the vue object. 
 * 
 * Usage:
 * data: {
 * 		windowEvents: {
 * 			keydown: 'onKeyDown',
 * 			focusin: 'checkFocus, refocus'
 * 		}
 * } 
 * 
 * @type {Object}
 */
var windowEvents = {
	attached: function () {
		if (typeof jQuery !== 'function') {
			var err = new Error('jui: jQuery is not defined');
			throw err;
		}
		var $window = jQuery(window);

		/**
		 * Loop through each of the event names in the windowEvents 
		 * object and find the associated method function and 
		 * add it as a listener to the window. 
		 */
		
		_.forIn(this.windowEvents, function (methodNames, eventName) {
			methodNames = _.map(this.windowEvents[eventName].split(','), _.trim),
			
			_.each(methodNames, function (methodName) {
				/**
				 * The method on the Vue object
				 * @name method
				 * @type {Function}
				 */
				var method = this[methodName];

				// If  no method is found, throw an error 
				if (typeof method !== 'function') {
					var err = new Error('Vue windowEvents mixin: No method could be found for name ' + methodName);
					throw err;
				}

				$window.on(eventName, method);
			}, this);

		}, this);
		

	}
};



$(function () {
	'use strict';
	var ESCAPE_KEY = 27;


	/**
	 * https://github.com/Modernizr/Modernizr/pull/924/files
	 * Does this browser support csspointerevents? 
	 * @type  {Boolea}
	 */
	var csspointerevents = (function () {
		var element = document.createElement('x');
		element.style.cssText = 'pointer-events:auto';
		return element.style.pointerEvents === 'auto';
	}());


	var overlay = window.overlay = new Vue({
		el: '#modal-overlay',


		mixins: [ui, windowEvents],


		data: {
			tabIndex: '-1',
			ariaHidden: 'true',


			isHidden: true,
			/**
			 * Whether or not the modal is showing 
			 * @type {Boolean}
			 */
			showing: false,


			/**
			 * Saves the last focused element before the modal was opened 
			 * so it can be focused again when the modal closes 
			 * @type {Element}
			 */
			lastActive: null,


			/**
			 * Listen to these events on window 
			 */
			windowEvents: {
				keydown: 'escape',
				focusin: 'checkFocus'
			},
		},


		methods: {

			
			/**
			 * Hide the modal 
			 * 
			 * @return {void} 
			 */
			hide: function(event) {

				if ( ! event || ~[this.$el, this.ui.close].indexOf(event.target)) {

					/**
					 * If CSS pointer events are not supported the element 
					 * will be hidden. 
					 */
					if ( ! csspointerevents) {
						this.isHidden = true;
					}
					this.showing = false;
					/**
					 * Resume focus to the last active element before the modal 
					 * was opened 
					 */
					this.lastActive.focus();
					this.tabIndex = '-1';
					this.ariaHidden = 'true';
				}
			},


			/**
			 * Show the modal and focus it so that tabbing will focus the 
			 * modal's exit button. 
			 * 
			 * @return {void} 
			 */
			show: function() {
				this.isHidden = false;
				this.showing = true;
				this.lastActive = document.activeElement;
				this.$nextTick(function () {
					this.tabIndex = '0';
					this.$el.focus()
					this.ariaHidden = 'false';
				});

			},


			/**
			 * When the submit button is pressed, hide the modal 
			 * 
			 * @param  {Event} event 
			 * @return {void}
			 */
			submit: function (event) {
				event.preventDefault();
				this.hide();
			},


			/**
			 * Hide the modal when the escape button is pressed 
			 *
			 * @param {KeydownEvent} event 
			 * @return {void} 
			 */
			escape: function (event) {
				if (this.showing && event.which === ESCAPE_KEY) {
					this.hide();
				}
			},


			/**
			 * Check if the modal has lost focus to an element 
			 * outside of it. If it has, refocus the modal. 
			 * 
			 * @param  {FocusinEvent} event 
			 * @return {void}       
			 */
			checkFocus: function (event) {
				var overlay = this.$el;
				var contains = $.contains(overlay, event.target) || event.target === overlay;
				if (this.showing && ! contains) {
					overlay.focus();
				}
			}, 

			/**
			 * Make the overlay `display: none` so that when the 
			 * element can't be tabbed to after it is transitioned 
			 * its opacity back to 0. 
			 * 
			 * @param  {TransitionEndEvent} event 
			 * @return {void} 
			 */
			transitionend: function (event) {
				if (event.target !== this.$el) { return; }
				if ( ! that.showing) {
					this.isHidden = true;
				}
			}
		},
	});


	/**
	 * Whenever the learn more button is clicked, 
	 * show the suscribe modal dialog box 
	 */
	new Vue({
		el: '#learn-more',
		methods: {
			onClick: function () {
				overlay.show();
			}
		}
	});

});


}()); // wrapping iife
