$(function() {

//------------------------------гамбургер-----------------------------
	$('.hamburger--3dx').click(function() {
    $(this).toggleClass('is-active');
    $('.header__nav').toggleClass('header__nav-active');
    $('.header__top').toggleClass('header__top-block-menu');
  });


//-------------------------скорость якоря---------------------------------------
  $(".header__nav ul").on("click","a", function (event) {
      // event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 50}, 'slow', 'swing');

      $('.hamburger--3dx').removeClass('is-active');
      $('.header__top').removeClass('header__top-block-menu');
      $('.header__nav').removeClass('header__nav-active');

  });


  $(".footer__nav ul").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 50}, 'slow', 'swing');
  });

//-------------------------------slider---------------------------------------

$('.slider__img').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  asNavFor: '.slider__text',
  centerMode: true,
  centerPadding: '80px',
  speed: 300,
  focusOnSelect: true
});

$('.slider__text').slick({
  asNavFor: '.slider__img',
  infinite: true,
  speed: 300,
  fade: true,
  cssEase: 'linear'
});

$(".slider__img").on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
  var i = (currentSlide ? currentSlide : 0) + 1;
  $("#namber").html('<span> ' + i + ' </span>' + ' / ' + slick.slideCount);
});


//--------------------form-----------------------------
$('.checkbox').on('change', function() {
    var btn = $('.calculation__form .form__btn');
    if ( btn.attr('disabled') ){
      btn.removeAttr("disabled");
      $('.label').addClass('label__active');
    }
    else{
      btn.attr("disabled", true);
      $('.label').removeClass('label__active');
    }
});


    $("#calculation__file").change(function(){
         var filename = $(this).val().replace(/.*\\/, "");
         $("#fl_nm").html("Вы прикрепили файл " + filename);
    });

    $("#calculation-two__file").change(function(){
         var filename = $(this).val().replace(/.*\\/, "");
         $("#fl_nml").html("Вы прикрепили файл " + filename);
    });
//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});
//------------------------------------form-------------------------------------------
	$('input[type="tel"]').mask('+0 (000) 000-00-00');

	jQuery.validator.addMethod("phoneno", function(phone_number, element) {
	   return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
	}, "Введите Ваш телефон");

  $(".calculation-form").validate({
    messages: {
      name: "Введите ваше имя",
      phone: "Введите ваш телефон",
      email: "Введите ваш email",
      upload: "Загрузите ваш документ",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
        var fd = new FormData(document.querySelector(".calculation-form"));

      ajaxSend('.calculation-form', fd);
    }
  });

  $(".calculation-form_two").validate({
    messages: {
      name: "Введите ваше имя",
      phone: "Введите ваш телефон",
      email: "Введите ваш email",
      upload: "Загрузите ваш документ",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var fd = new FormData(document.querySelector(".calculation-form_two"));
      ajaxSend('.calculation-form_two', fd);
    }
  });

    function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

  $(".order").validate({
    messages: {
      name: "Введите ваше имя",
      phone: "Введите ваш телефон",
      email: "Введите ваш email",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".order").find("input[name=name]").val(),
        phone: jQuery(".order").find("input[name=phone]").val(),
        email: jQuery(".order").find("input[name=email]").val(),
        subject: jQuery(".order").find("input[name=subject]").val(),
      };
      ajaxSend('.order', t);
    }
  });

  $(".application").validate({
    messages: {
      name: "Введите ваше имя",
      phone: "Введите ваш телефон",
      email: "Введите ваш email",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".application").find("input[name=name]").val(),
        phone: jQuery(".application").find("input[name=phone]").val(),
        email: jQuery(".application").find("input[name=email]").val(),
        subject: jQuery(".application").find("input[name=subject]").val(),
      };
      ajaxSend('.application', t);
    }
  });

  $(".order-consultation").validate({
    messages: {
      name: "Введите ваше имя",
      phone: "Введите ваш телефон",
      email: "Введите ваш email",
    },
    rules: {
      "phone": {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = {
        name: jQuery(".order-consultation").find("input[name=name]").val(),
        phone: jQuery(".order-consultation").find("input[name=phone]").val(),
        email: jQuery(".order-consultation").find("input[name=email]").val(),
        subject: jQuery(".order-consultation").find("input[name=subject]").val(),
      };
      ajaxSend('.order-consultation', t);
    }
  });



  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        document.location.href="thank-you.html";
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

});
//----------------------------------------fixed----------------------------------
$(window).scroll(function(){
    if($(this).scrollTop()>20){
        $('.header__top').addClass('header__top-active');
    }
    else if ($(this).scrollTop()<20){
        $('.header__top').removeClass('header__top-active');
    }
});

//----------------------------------------preloader----------------------------------

$(window).on('load', function(){
  $('.preloader').delay(1000).fadeOut('slow');
});