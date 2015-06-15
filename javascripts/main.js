var constants = {
	ESCAPE_KEY: 27
};



$(function () {
	'use strict';
	var ESCAPE_KEY = 27;

	var suscribeModal = new Vue({
		el: '#modal-overlay',
		data: {},
		methods: {
			/**
			 * Hide the modal 
			 * @return {void} 
			 */
			hide: function(event) {
					console.log('wtf')
				if (!event || ~[this.$el, this.ui.close.get(0)].indexOf(event.target)) {
					this.ui.el.addClass('is-hidden');
				}
			},
			/**
			 * Show the modal 
			 * @return {void} 
			 */
			show: function() {
				this.ui.el
					.removeClass('is-hidden')
				this.ui.input.focus();
			},
		},
		computed: {
			ui: function() {
				var el = $(this.$el);

				return {
					el: el,
					modal: el.find('.modal'),
					input: el.find('input'),
					close: el.find('.modal__close'),
					overlay: $('#modal-overlay')
				};
			},
		}
	});


	/**
	 * Hide the modal when the escape button is pressed 
	 */
	$('html').on('keydown', function (event) {
		if (event.which === ESCAPE_KEY) {
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


});


