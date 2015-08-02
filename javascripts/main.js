
(function () {
	'use strict';

	var ESCAPE_KEY = 27;



	/**
	 * Listens to events on the window object and fires the
	 * method specified. Multiple methods can be added by separating them with
	 * a comma. The keys should be the event and should map to
	 * methods on the vue object.
	 *
	 * Usage:
	 * data: {
	 * 		windowEvents: {
	 * 			keydown: 'onKeyDown',
	 * 			click: 'doSomething, anotherThing'
	 * 		}
	 * }
	 *
	 * @type {Object}
	 */
	var windowEvents = {
		attached: function () {

			/**
			 * Loop through each of the event names in the windowEvents
			 * object and find the associated method function and
			 * add it as a listener to the window.
			 */
			for (var eventName in this.windowEvents) {
				var methodNames = this.windowEvents[eventName];

				// get each of the method names that should be called and trim the name
				methodNames = this.windowEvents[eventName].split(',').map(function (methodName) {
					return methodName.trim();
				});

				methodNames.forEach(function (methodName) {
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

					window.addEventListener(eventName, method, false);
				}, this);
			}
		}
	};




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




	var overlay = new Vue({
		el: '#modal-overlay',

		mixins: [windowEvents],
		attached: function () {
			this.ui = this.$$;
		},
		data: function () {
			return {
				tabIndex: '-1',

				ariaHidden: 'true',

				/**
				 * Whether or not the modal is hidden with "display: none".
				 * The modal is normally hidden with "pointer-events: none"
				 * and "opacity: 0". If pointer events are not supported,
				 * "display: none" is used, which causes the transition to
				 * not work properly.
				 * @type {Boolean}
				 */
				isHidden: true,

				/**
				 * Whether or not the modal is is showing.
				 * @type {Boolean}
				 */
				isShowing: false,

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
			}
		},

		methods: {

			/**
			 * Hide the modal and focus back to the element that was
			 * focused before the modal was opened.
			 * @return {void}
			 */
			hide: function(event) {
				// "event" may be undefined from calling this.hide manually
				if ( ! event || ~ [this.$el, this.ui.close].indexOf(event.target)) {

					// If CSS pointer events are not supported, the element will
					// be set to "display: none", which messes up the transition.
					if ( ! csspointerevents) {
						this.isHidden = true;
					}

					this.isShowing = false;

					// Resume focus to the last active element before the modal was opened
					this.lastActive.focus();
					this.tabIndex = '-1';
					this.ariaHidden = 'true';
				}
			},

			/**
			 * Show the modal and focus it so that tabbing will focus the
			 * modal's exit button.
			 * @return {void}
			 */
			show: function() {
				this.isHidden = false;
				this.isShowing = true;
				this.lastActive = document.activeElement;
				this.$nextTick(function () {
					this.tabIndex = '0';
					this.$el.focus()
					this.ariaHidden = 'false';
				});
			},

			/**
			 * When the submit button is pressed, hide the modal
			 * @param  {Event} event
			 * @return {void}
			 */
			submit: function (event) {
				event.preventDefault();
				this.hide();
			},

			/**
			 * Hide the modal when the escape button is pressed
			 * @param {Event} event
			 * @return {void}
			 */
			escape: function (event) {
				if (this.isShowing && event.which === ESCAPE_KEY) {
					this.hide();
				}
			},

			/**
			 * Check if the modal has lost focus to an element
			 * outside of it. If it has, refocus the modal.
			 * @param  {Event} event
			 * @return {void}
			 */
			checkFocus: function (event) {
				var overlay = this.$el;
				var contains = overlay.contains(event.target) || event.target === overlay;

				if (this.isShowing && ! contains) {
					overlay.focus();
				}
			},

			/**
			 * Make the overlay `display: none` so that when the
			 * element can't be tabbed after it is set to "opacity: 0"
			 * @param  {Event} event
			 * @return {void}
			 */
			onTransitionend: function (event) {
				if (event.target !== this.$el) {
					return;
				}

				if ( ! this.isShowing) {
					// Set css display to none
					this.isHidden = true;
				}
			}
		},
	});




	/**
	 * Whenever the learn more button is clicked,
	 * show the suscribe modal dialog box
	 */
	document.querySelector('#learn-more')
		.addEventListener('click', function () {
			overlay.show();
		});

}());