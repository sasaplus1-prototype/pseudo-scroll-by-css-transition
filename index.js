(function(){

  'use strict';

  var db = document.body,
      dd = document.documentElement;

  var rootElement = (/BackCompat/i.test(document.compatMode)) ? db : dd;

  var getScollTop = (typeof window.pageYOffset === 'number') ?
    function() {
      return window.pageYOffset;
    } :
    function() {
      return rootElement.scrollTop;
    };

  var html = document.getElementsByTagName('html')[0],
      scrollToTop = document.querySelector('.js-scroll-to-top');

  scrollToTop.addEventListener('click', function() {
    var scrollTop = getScollTop();

    if (scrollTop === 0) {
      return;
    }

    html.classList.add('js-scroll-transition');

    bindTransitionEndEvent(html, onTransitionEnd);

    html.style.webkitTransform = 'translateY(' + scrollTop + 'px)';
    html.style.mozTransform = 'translateY(' + scrollTop + 'px)';
    html.style.transform = 'translateY(' + scrollTop + 'px)';
  }, false);

  function onTransitionEnd(event) {
    unbindTransitionEndEvent(event.target, onTransitionEnd);

    db.scrollTop = 0;
    dd.scrollTop = 0;

    html.classList.remove('js-scroll-transition');

    html.style.webkitTransform = '';
    html.style.mozTransform = '';
    html.style.transform = '';
  }

  function bindTransitionEndEvent(element, fn) {
    var events = ['transitionend', 'mozTransitionEnd', 'webkitTransitionEnd'];
    
    events.forEach(function(eventName) {
      element.addEventListener(eventName, fn, false);
    });
  }

  function unbindTransitionEndEvent(element, fn) {
    var events = ['transitionend', 'mozTransitionEnd', 'webkitTransitionEnd'];
    
    events.forEach(function(eventName) {
      element.removeEventListener(eventName, fn, false);
    });
  }

}());
