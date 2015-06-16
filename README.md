
A fun exercise by [DevTips](https://github.com/DevTips/splash-page-and-modal).


The first commit is my first version. For the second version, I had some goals. 

## Goals

- Support IE 9+
- Integrate concepts from ["Making modal windows better for everyone"](http://www.smashingmagazine.com/2014/09/15/making-modal-windows-better-for-everyone/) by SmashingMagazine 
- Use some cool animations/transitions  
- Allow only elements within the modal to be tabbable when the modal is visible 
- Disallow tabbing to the modal when it is hidden 
- Resume focus to the last active element when the modal closes 

## Problems
- On smaller devices, the modal is pushed outside of the overlay, causing the background to peek through. 
- Chrome will allow a unitless value for the `perspective` property and Firefox and IE don't. 

## Tools I Used
- [VueJS](http://vuejs.org/) for JS
- [JQuery](https://jquery.com/) for DOM manipulation
- [Sass](http://sass-lang.com/guide) indented
- [Gulp](https://github.com/gulpjs/gulp) For processing Sass files and linting JS
- [Modernizr](http://modernizr.com/) to detect if pointerevents are defined 


## Things I learned

- Transitions don't work properly when the property doesn't exist beforehand. For example, if transitioning the left property on hover, the left property needs to be defined on the `selector` as well as `selector:hover`
- Focusing or moving an element when it is being transitioned will cause the transition to fail. 
- VueJS is awesome. 
- Sass is awesome 
- [DevTips](https://www.youtube.com/user/DevTipsForDesigners) is awesome 







