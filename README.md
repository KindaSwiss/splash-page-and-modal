# Splash Page and Modal
A fun exercise by [DevTips](https://github.com/DevTips). 

A live preview of my version can be seen here [seen here](http://kindaswiss.github.io/splash-page-and-modal/). 


## Goals
The first commit is my first version. For the second version, I had some goals. 

- Support IE 9+
- Integrate concepts from ["Making modal windows better for everyone"](http://www.smashingmagazine.com/2014/09/15/making-modal-windows-better-for-everyone/) by SmashingMagazine 
- Use some cool animations/transitions  
- Allow only elements within the modal to be tabbable when the modal is visible 
- Disallow tabbing to the modal when it is hidden 
- Resume focus to the last active element when the modal closes 

## Problems
- On smaller devices, the modal is pushed outside of the overlay, causing the background to peek through.

## Tools I Used
- [VueJS](http://vuejs.org/) for JS
- [JQuery](https://jquery.com/) for DOM manipulation
- [Sass](http://sass-lang.com/guide) indented
- [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) for CSS class names
- [Gulp](https://github.com/gulpjs/gulp) For processing Sass files and linting JS
- [Modernizr](http://modernizr.com/) used a snippet of code from modernizr to detect if pointerevents are supported 


## Things I learned

- Transitions don't work properly when the property doesn't exist beforehand. For example, if transitioning the left property on hover, the left property needs to be defined on the `selector` as well as `selector:hover`
- Chrome will allow a unitless value for the `perspective` property and Firefox and IE won't. 
- Focusing or moving an element when it is being transitioned will cause the transition to fail. 
- VueJS is awesome. 
- Sass is awesome 
- [DevTips](https://www.youtube.com/user/DevTipsForDesigners) is awesome 




