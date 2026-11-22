/* ========================================
   main.js — Navigation, Scroll FX,
             Typed Animation, Scroll Spy
   Author: Tanjimul Hossain Tanim
   ======================================== */

$(document).ready(function () {

  /* ---- 1. Navbar scroll shrink ---- */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  /* ---- 2. Mobile hamburger toggle ---- */
  $('.hamburger').on('click', function () {
    $('.nav-links').toggleClass('open');
    // Animate hamburger lines into X
    $(this).toggleClass('active');
  });

  // Close menu when a nav link is clicked (mobile)
  $('.nav-links a').on('click', function () {
    $('.nav-links').removeClass('open');
    $('.hamburger').removeClass('active');
  });

  /* ---- 3. Active nav link highlight ---- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $('.nav-links a').each(function () {
    var href = $(this).attr('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html')) {
      $(this).addClass('active');
    }
  });

  /* ---- 4. Fade-in on scroll (Intersection Observer) ---- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback for older browsers */
    $('.fade-in').addClass('visible');
  }

  /* ---- 5. Typed text animation (home page) ---- */
  var typedEl = document.getElementById('typed');
  if (typedEl) {
    var phrases = [
      'CSE Student 🎓',
      'Web Developer 💻',
      'Problem Solver 🧩',
      'Tech Enthusiast 🚀'
    ];
    var phraseIndex = 0;
    var charIndex   = 0;
    var isDeleting  = false;

    function type() {
      var current = phrases[phraseIndex];
      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      var delay = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex === current.length) {
        delay = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }
      setTimeout(type, delay);
    }
    type();
  }

  /* ---- 6. Animated skill bars (skills page) ---- */
  if ($('.skill-fill').length) {
    setTimeout(function () {
      $('.skill-fill').each(function () {
        var pct = $(this).data('pct');
        $(this).css('width', pct + '%');
      });
    }, 400);
  }

  /* ---- 7. Smooth scroll for in-page anchor links ---- */
  $('a[href^="#"]').on('click', function (e) {
    var target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 70 }, 600);
    }
  });

  /* ---- 8. AJAX — Inspirational Quote (home page) ---- */
  if ($('#quote-text').length) {
    // Hardcoded fallback quotes (no API key needed, works offline)
    var quotes = [
      { text: "The only way to do great work is to love what you do.", author: "— Steve Jobs" },
      { text: "Code is like humor. When you have to explain it, it's bad.", author: "— Cory House" },
      { text: "First, solve the problem. Then, write the code.", author: "— John Johnson" },
      { text: "Experience is the name everyone gives to their mistakes.", author: "— Oscar Wilde" },
      { text: "In order to be irreplaceable, one must always be different.", author: "— Coco Chanel" },
      { text: "Java is to JavaScript what car is to carpet.", author: "— Chris Heilmann" },
      { text: "Talk is cheap. Show me the code.", author: "— Linus Torvalds" },
      { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "— Martin Fowler" }
    ];

    // Try fetching from public quotable API first (AJAX demo)
    $.ajax({
      url: 'https://api.quotable.io/random?tags=technology|success|education',
      method: 'GET',
      timeout: 4000,
      success: function (data) {
        $('#quote-text').text('"' + data.content + '"');
        $('#quote-author').text('— ' + data.author);
      },
      error: function () {
        // Graceful fallback to local quotes
        var q = quotes[Math.floor(Math.random() * quotes.length)];
        $('#quote-text').text('"' + q.text + '"');
        $('#quote-author').text(q.author);
      }
    });
  }

  /* ---- 9. Counter animation (home stats) ---- */
  if ($('.stat-box .num').length) {
    var counted = false;

    function animateCounters() {
      if (counted) return;
      counted = true;
      $('.stat-box .num').each(function () {
        var $this = $(this);
        var target = parseInt($this.data('target'), 10);
        $({ counter: 0 }).animate({ counter: target }, {
          duration: 1500,
          easing: 'swing',
          step: function () {
            $this.text(Math.ceil(this.counter) + ($this.data('suffix') || ''));
          },
          complete: function () {
            $this.text(target + ($this.data('suffix') || ''));
          }
        });
      });
    }

    // Trigger when stats section is visible
    if ('IntersectionObserver' in window) {
      var statsObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          animateCounters();
          statsObs.disconnect();
        }
      }, { threshold: 0.4 });

      var statsEl = document.querySelector('.stats-row');
      if (statsEl) statsObs.observe(statsEl);
    } else {
      animateCounters();
    }
  }

});
