var constants = {
	ESCAPE_KEY: 27
};



$(function () {
	'use strict';
	var ESCAPE_KEY = 27;

	// https://github.com/Modernizr/Modernizr/pull/924/files
	var csspointerevents = (function () {
		var element = document.createElement('x');
		element.style.cssText = 'pointer-events:auto';
		return element.style.pointerEvents === 'auto';
	}());


	var suscribeModal = new Vue({
		el: '#modal-overlay',
		data: {
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
		},
		methods: {

			
			/**
			 * Hide the modal 
			 * @return {void} 
			 */
			hide: function(event) {

				// Append to bottom of DOM to avoid tabbing into them right off the bat 
				if ( ! event || ~[this.$el, this.ui.close.get(0)].indexOf(event.target)) {

					suscribeModal.$appendTo(document.body);
					/**
					 * If CSS pointer events are not supported the element 
					 * will be hidden. 
					 */
					if ( ! csspointerevents) {
						this.ui.el.addClass('is-hidden');
					}
					this.showing = false;
					this.lastActive.focus();
					setTimeout(function () {
						this.ui.el
							.attr('tabindex', '-1')
							.attr('aria-hidden', true);

					}.bind(this), 0);

				}
			},


			/**
			 * Show the modal and focus it so that tabbing will focus the 
			 * exit button. 
			 * @return {void} 
			 */
			show: function() {
				suscribeModal.ui.el.prependTo(document.body);
				this.ui.el.removeClass('is-hidden');
				this.showing = true;
				this.lastActive = document.activeElement;
				setTimeout(function () {
					this.ui.el
						.attr('tabindex', '0')
						.focus()
						.attr('aria-hidden', false);
				}.bind(this), 0);

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
		},
		attached: function () {
			var el = $(this.$el);
			this.ui = {
				el: el,
				modal: el.find('.modal'),
				input: el.find('input').first(),
				close: el.find('.modal__close')
			};

			// Add a class of `is-hidden` when the transition has ended 
			// but only when the element is being hidden 
			var that = this;
			this.ui.el.on('transitionend', function (event) {
				if (event.target !== this) { return; }
				if ( ! that.showing) {
					that.ui.el.addClass('is-hidden');
				}
			});
		},
	});


	/**
	 * Hide the modal when the escape button is pressed 
	 */
	$('html').on('keydown', function (event) {
		if (suscribeModal.showing && event.which === ESCAPE_KEY) {
			suscribeModal.hide();
		}
	});


	/**
	 * Whenever the learn more button is clicked, 
	 * show the suscribe modal dialog box 
	 */
	new Vue({
		el: '#learn-more',
		methods: {
			onClick: function () {
				suscribeModal.show();
			}
		}
	});
	// Keep focus within the modal 
	$(window).on('focusin', function (event) {
		var overlay = suscribeModal.ui.el[0];
		var contains = $.contains(overlay, event.target) || event.target === overlay;
		if (suscribeModal.showing && ! contains) {
			suscribeModal.ui.el.focus();
		}
	});
});


