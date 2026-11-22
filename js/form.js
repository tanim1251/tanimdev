/* ========================================
   form.js — Contact Form Validation
             & jQuery AJAX Submission
   Author: Tanjimul Hossain Tanim
   ======================================== */

$(document).ready(function () {

  /* Utility: show/hide error */
  function showError($input, $err, msg) {
    $input.css('border-color', '#ef4444');
    $err.text(msg).addClass('show');
  }

  function clearError($input, $err) {
    $input.css('border-color', '');
    $err.removeClass('show');
  }

  /* ---- Real-time validation on blur ---- */
  $('#name').on('blur', function () {
    var val = $(this).val().trim();
    if (val.length < 2) {
      showError($(this), $('#name-err'), 'Name must be at least 2 characters.');
    } else {
      clearError($(this), $('#name-err'));
    }
  });

  $('#email').on('blur', function () {
    var val = $(this).val().trim();
    var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(val)) {
      showError($(this), $('#email-err'), 'Please enter a valid email address.');
    } else {
      clearError($(this), $('#email-err'));
    }
  });

  $('#subject').on('blur', function () {
    if ($(this).val() === '') {
      showError($(this), $('#subject-err'), 'Please choose a subject.');
    } else {
      clearError($(this), $('#subject-err'));
    }
  });

  $('#message').on('blur', function () {
    if ($(this).val().trim().length < 10) {
      showError($(this), $('#message-err'), 'Message must be at least 10 characters.');
    } else {
      clearError($(this), $('#message-err'));
    }
  });

  /* ---- Form submit handler ---- */
  $('#contact-form').on('submit', function (e) {
    e.preventDefault(); // Prevent default page reload

    var valid = true;

    /* Validate Name */
    var name = $('#name').val().trim();
    if (name.length < 2) {
      showError($('#name'), $('#name-err'), 'Name must be at least 2 characters.');
      valid = false;
    } else {
      clearError($('#name'), $('#name-err'));
    }

    /* Validate Email */
    var email = $('#email').val().trim();
    var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      showError($('#email'), $('#email-err'), 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError($('#email'), $('#email-err'));
    }

    /* Validate radio — gender/inquiry type */
    if (!$('input[name="inquiry"]:checked').length) {
      $('#inquiry-err').addClass('show');
      valid = false;
    } else {
      $('#inquiry-err').removeClass('show');
    }

    /* Validate subject dropdown */
    if ($('#subject').val() === '') {
      showError($('#subject'), $('#subject-err'), 'Please choose a subject.');
      valid = false;
    } else {
      clearError($('#subject'), $('#subject-err'));
    }

    /* Validate message */
    var msg = $('#message').val().trim();
    if (msg.length < 10) {
      showError($('#message'), $('#message-err'), 'Message must be at least 10 characters.');
      valid = false;
    } else {
      clearError($('#message'), $('#message-err'));
    }

    if (!valid) return;

    /* ---- Simulate AJAX submission ---- */
    var $btn = $('#submit-btn');
    $btn.prop('disabled', true).text('Sending...');

    // Simulated AJAX delay (in a real project, this posts to a backend endpoint)
    setTimeout(function () {
      $('#form-success').fadeIn(400);
      $('#contact-form')[0].reset();
      $btn.prop('disabled', false).text('Send Message');

      // Auto-hide success message after 5s
      setTimeout(function () {
        $('#form-success').fadeOut(400);
      }, 5000);
    }, 1200);
  });

  /* ---- Clear border on input focus ---- */
  $('.form-control').on('focus', function () {
    $(this).css('border-color', '');
  });

});
