/*!
 * Item: CardX
 * Description: Modern Personal Portfolio / Resume / CV / vCard / HTML5 Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v1.0.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- Table of Contents -----------*/

/**
 * Globals
 * Navbar
 * Overlay block
 * Home
 * Portfolio
 * Testimonials
 * Contact
 * Preloader
 */

(function($) {
  'use strict';
  $(document).ready(function() {
    /*----------- Globals -----------*/

    // Scrolling animation if the user clicks on a Hash link that has 'data-scroll' attribute
    $(document).on('click', 'a[data-scroll][href^="#"]', function(e) {
      var navbarHeight = $('.navbar').innerHeight();
      var id = $(this).attr('href');
      var $id = $(id);
      if ($id.length === 0) {
        return;
      }
      e.preventDefault();
      $('body, html').animate({
        scrollTop: $id.offset().top - navbarHeight
      }, 600);
    });

    /*----------- Navbar -----------*/

    // Triggers the second style of the navbar if the user scrolls down
    $(window).on('scroll', function() {
      var navbar = $('.navbar');
      if (navbar.offset().top > 75) {
        navbar.addClass('scrolled');
      } else {
        navbar.removeClass('scrolled');
      }
    });

    /*----------- Overlay block -----------*/

    $('.navbar .navbar-btn').animatedModal({
      animatedIn: 'fadeIn',
      animatedOut: 'fadeOut',
      animationDuration: '.15s',
      beforeOpen: function() {
        function getNavbarBtnPos() {
          var navbarBtnPos = {
            top: parseInt($('.navbar').css('marginTop'), 10) + $('.navbar .navbar-btn').position().top,
            left: $('.navbar .navbar-btn').position().left
          };
          return navbarBtnPos;
        }
        $('.overlay-block .overlay-close').css(getNavbarBtnPos());
        $(window).on('resize', function() {
          $('.overlay-block .overlay-close').css(getNavbarBtnPos());
        });
      }
    });

    function closeOverlayBlock() {
      $('.overlay-block .overlay-close').trigger('click');
    }

    $(document).on('keydown', function(e) {
      if (e.keyCode === 27 && $('.overlay-block').hasClass('overlay-block-on')) {
        closeOverlayBlock();
      }
    });

    $('.overlay-block .overlay-menu .nav-link').on('click', function() {
      closeOverlayBlock();
    });

    $('body').scrollspy({
      target: '.overlay-menu',
      offset: $('.navbar').innerHeight() + 5
    });

    /*----------- Home -----------*/

    /* Animated heading text */

    // Set animation timing
    var animationDelay = 2500,
      // Clip effect
      revealDuration = 660,
      revealAnimationDelay = 1500;

    initHeadline();

    function initHeadline() {
      // Initialise headline animation
      animateHeadline($('.cd-headline'));
    }

    function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function() {
        var headline = $(this);
        if (headline.hasClass('clip')) {
          var spanWrapper = headline.find('.cd-words-wrapper'),
            newWidth = spanWrapper.width() + 10;
          spanWrapper.css('width', newWidth);
        }

        //trigger animation
        setTimeout(function() {
          hideWord(headline.find('.is-visible').eq(0));
        }, duration);
      });
    }

    function hideWord($word) {
      var nextWord = takeNext($word);

      if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          width: '2px'
        }, revealDuration, function() {
          switchWord($word, nextWord);
          showWord(nextWord);
        });

      }
    }

    function showWord($word, $duration) {
      if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          'width': $word.width() + 10
        }, revealDuration, function() {
          setTimeout(function() {
            hideWord($word);
          }, revealAnimationDelay);
        });
      }
    }


    function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
    }

    /*----------- Portfolio -----------*/

    /* Portfolio filter setup */

    var Shuffle = window.Shuffle;

    var shufflejs = function(element) {
      this.element = element;

      this.shuffle = new Shuffle(element, {
        itemSelector: '.portfolio-area .shufflejs .single-item',
        sizer: element.querySelector('.portfolio-area .shufflejs .sizer-element'),
      });

      this._activeFilters = [];

      this.addFilterButtons();
    };

    shufflejs.prototype.addFilterButtons = function() {
      var options = document.querySelector('.portfolio-area .filter-control');

      if (!options) {
        return;
      }

      var filterButtons = Array.from(options.children);

      filterButtons.forEach(function(button) {
        button.addEventListener('click', this._handleFilterClick.bind(this), false);
      }, this);
    };

    shufflejs.prototype._handleFilterClick = function(evt) {
      var btn = evt.currentTarget;
      var btnGroup = btn.getAttribute('data-group');
      this.shuffle.filter(btnGroup);
    };


    window.shufflejs = new shufflejs(document.getElementById('shufflejs'));

    // Filter nav
    $('.portfolio-area .filter-control>li').on('click', function() {
      $(this).addClass('tab-active').siblings().removeClass('tab-active');
    });

    $('.portfolio-area .shufflejs .portfolio-item').each(function() {
      var element = $(this);
      var target = element.attr('href');
      $(element).animatedModal({
        animatedIn: 'fadeIn',
        animatedOut: 'fadeOut',
        animationDuration: '.15s',
        beforeOpen: function() {
          $(target + '.lightbox-wrapper .lightbox-gallery').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            items: 1,
            smartSpeed: 400
          });
        },
        afterClose: function() {
          $(target + '.lightbox-wrapper .lightbox-gallery').trigger('destroy.owl.carousel');
        }
      });
    });

    /*----------- Testimonials -----------*/

    $('.testimonials-area .owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      margin: 0,
      nav: false,
      smartSpeed: 400
    });

    /*----------- Contact -----------*/

    $('.contact-form').on('submit', function(event) {
      var form = $(this);
      var submitBtn = form.find('#contact-submit');
      var feedbackErr = form.find('.contact-error');
      event.preventDefault();
      // Waiting for the response from the server
      submitBtn.html('Wait...').addClass('wait').prop('disabled', true);
      setTimeout(function() {
        // Posts the Form's data to the server using Ajax
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
          })
          // Getting a response from the server
          .done(function(response) {
            // If the PHP file succeed sending the message
            if (response == 'success') {
              // Feedback to the user
              submitBtn.removeClass('wait').html('Success').addClass('success');
              setTimeout(function() {
                submitBtn.html('Submit').removeClass('success').prop('disabled', false);
              }, 6000);
              // Clears the Form
              form[0].reset();
              // If something is wrong
            } else {
              // Feedback to the user
              submitBtn.removeClass('wait').html('Error').addClass('error');
              feedbackErr.fadeIn(200);
              setTimeout(function() {
                submitBtn.html('Submit').removeClass('error').prop('disabled', false);
                feedbackErr.fadeOut(200);
              }, 6000);
            }
          });
      }, 1000);
    });

    $(window).trigger('scroll');
  });
  $(window).on('load', function() {
    /*----------- Preloader -----------*/

    $('.preloader-icon, .preloader-brand').fadeOut(400);
    $('.preloader').delay(500).fadeOut('slow');

  });
}(jQuery));