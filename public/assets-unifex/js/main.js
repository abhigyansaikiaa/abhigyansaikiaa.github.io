/***************************************************
==================== JS INDEX ======================
****************************************************

01. PreLoader Js
02. Sticky Js
03. Menu Controls JS
04. offcanvas Menu JS
05. offcanvas two Menu JS
06. Sidebar Js
07. AOS Js
08. Backtotop Js
09. Magnific Popup Js
10. Counter Js
11. Feature Widget Animation Js
12. Service Two Images Hover Animation Js
13. Bg Image For Attribute  Js
14. Mouse active Js





****************************************************/

(function ($) {
  "use strict";

  ////////////////////////////////////////////////////
  // 01. PreLoader & Hero Reveal Js
  document.addEventListener("DOMContentLoaded", () => {
    // Hide navbar initially to prevent flash
    const header = document.querySelector(".portfolio-header");
    if (header) header.style.opacity = "0";

    // Set initial states for hero elements
    gsap.set(".banner-three-man", { opacity: 0, y: 30 }); // Subtle fade/slide for character
    // Title word is handled inline in HTML
    // Support content handled inline in HTML

    const tl = gsap.timeline();
    const svg = document.querySelector(".preloader-svg path");
    const percentEl = document.querySelector(".preloader-percent");
    const wordEl = document.querySelector(".preloader-word");
    const preloaderWords = ["Hello", "नमस्ते", "Bonjour", "Hola", "Ciao", "مرحباً", "你好", "こんにちは"];
    
    // SVG paths matching reference
    const width = window.innerWidth;
    const height = window.innerHeight;
    const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width/2} ${height + 300} 0 ${height} Z`;
    const finalPath = `M0 0 L${width} 0 L${width} 0 Q${width/2} 0 0 0 Z`;

    if (svg) svg.setAttribute("d", initialPath);

    // Simulated Loading
    let dummy = { value: 0 };
    let wordIndex = 0;

    tl.to(dummy, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (percentEl) percentEl.textContent = Math.round(dummy.value).toString().padStart(2, "0");
        
        let newIndex = Math.floor((dummy.value / 100) * preloaderWords.length);
        if (newIndex >= preloaderWords.length) newIndex = preloaderWords.length - 1;
        if (newIndex !== wordIndex) {
          wordIndex = newIndex;
          if (wordEl) wordEl.textContent = preloaderWords[wordIndex];
        }
      }
    })
    // Preloader Text Exit
    .to(".preloader-content, .preloader-percent, .preloader-dot-pulse", {
      y: -50,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in"
    }, "-=0.2")
    // SVG Morph & Slide Up
    .to(svg, {
      attr: { d: finalPath },
      duration: 1.0,
      ease: "power4.inOut"
    }, "slideUp")
    .to(".custom-preloader", {
      y: "-100vh",
      duration: 1.0,
      ease: "power4.inOut",
      onComplete: () => {
        const pl = document.querySelector(".custom-preloader");
        if (pl) pl.style.display = "none";
      }
    }, "slideUp")
    
    // Hero Sequence Starts
    .add(() => {
      if (header) {
        header.classList.remove("header-hidden");
        gsap.to(header, { opacity: 1, duration: 1, ease: "power3.out" });
      }
    }, "-=0.2")
    
    // 1. Character Reveal
    .to(".banner-three-man", {
      opacity: 1,
      duration: 1.4,
      ease: "power3.out"
    }, "-=0.5")
    
    // 2. Title clip-reveal (slides up from y:100% inside overflow-hidden h1)
    .to(".hero-title-word:nth-child(2)", {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      marginTop: 0,
      duration: 1.2,
      ease: "power4.out"
    }, "-=1.0")
    
    // 3. Side content staggered entrance
    .to(".hero-support-mobile", {
      x: 0,
      opacity: 1,
      duration: 1.0,
      ease: "power3.out"
    }, "-=0.8")
    .to(".hero-support-desktop", {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: "power3.out"
    }, "<");
  });

  ////////////////////////////////////////////////////
  // 02. Sticky Js
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 50) {
      $(".header").addClass("scrolled-header");
    } else {
      $(".header").removeClass("scrolled-header");
    }
  });

  ////////////////////////////////////////////////////
  // 03. Menu Controls JS
  $(".tw-hamburger-toggle").on("click", function () {
    $(".tw-header-side-menu").slideToggle("tw-header-side-menu");
  });
  if ($(".tw-main-menu-content").length && $(".tw-main-menu-mobile").length) {
    let navContent = document.querySelector(".tw-main-menu-content").outerHTML;
    let mobileNavContainer = document.querySelector(".tw-main-menu-mobile");
    mobileNavContainer.innerHTML = navContent;
    let arrow = $(".tw-main-menu-mobile .has-dropdown > a");
    arrow.each(function () {
      let self = $(this);
      let arrowBtn = document.createElement("BUTTON");
      arrowBtn.classList.add("dropdown-toggle-btn");
      arrowBtn.innerHTML = "<i class='ph ph-caret-right'></i>";
      self.append(function () {
        return arrowBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("dropdown-opened");
        self.parent().toggleClass("expanded");
        self
          .parent()
          .parent()
          .addClass("dropdown-opened")
          .siblings()
          .removeClass("dropdown-opened");
        self.parent().parent().children(".tw-submenu").slideToggle();
      });
    });
  }

  ////////////////////////////////////////////////////
  // 04. offcanvas Menu JS
  $(".tw-offcanvas-open-btn").on("click", function () {
    $(".tw-offcanvas-2-area").addClass("opened");

    setTimeout(() => {
      $(".tw-text-hover-effect-word").addClass("animated-text");
    }, 900);
  });

  ////////////////////////////////////////////////////
  // 05. offcanvas two Menu JS
  $(".tw-offcanvas-2-close-btn").on("click", function () {
    setTimeout(() => {
      $(".tw-text-hover-effect-word").removeClass("animated-text");
    }, 1200);

    $(".tw-offcanvas-2-area").removeClass("opened");
    $(".body-overlay").removeClass("opened");
  });

  ////////////////////////////////////////////////////
  // 06. Sidebar Js
  $(".tw-menu-bar").on("click", function () {
    $(".twoffcanvas").addClass("opened");
    $(".body-overlay").addClass("apply");
  });
  $(".close-btn").on("click", function () {
    $(".twoffcanvas").removeClass("opened");
    $(".body-overlay").removeClass("apply");
  });
  $(".body-overlay").on("click", function () {
    $(".twoffcanvas").removeClass("opened");
    $(".body-overlay").removeClass("apply");
  });

  ////////////////////////////////////////////////////
  // 07. AOS Js
  AOS.init({
    once: false, // animation will happen every time you scroll
    offset: 0, // start animation when element enters the viewport
    anchorPlacement: "top-bottom", // when the bottom of the element hits the bottom of the screen
  });

  // 08. Backtotop Js
  function back_to_top() {
    var btn = $("#back_to_top");
    var btn_wrapper = $(".back-to-top-wrapper");
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        btn_wrapper.addClass("back-to-top-btn-show");
      } else {
        btn_wrapper.removeClass("back-to-top-btn-show");
      }
    });

    btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 300);
    });
  }
  back_to_top();

  ////////////////////////////////////////////////////
  // 09. Magnific Popup Js
  $(".open-popup").magnificPopup({
    type: "iframe",
    removalDelay: 300,
    mainClass: "mfp-fade",
  });

  ////////////////////////////////////////////////////
  // 10. Counter Js
  new PureCounter();
  new PureCounter({
    filesizing: true,
    selector: ".filesizecount",
    pulse: 2,
  });

  ////////////////////////////////////////////////////
  // 11. Feature Widget Animation Js
  function service_animation() {
    var active_bg = $(".feature-widget .active-bg");
    var element = $(".feature-widget .current");
    $(".feature-widget .feature-2-item").on("mouseenter", function () {
      var e = $(this);
      activeService(active_bg, e);
    });
    $(".feature-widget").on("mouseleave", function () {
      element = $(".feature-widget .current");
      activeService(active_bg, element);
      element.closest(".feature-2-item").siblings().removeClass("mleave");
    });
    activeService(active_bg, element);
  }
  service_animation();
  function activeService(active_bg, e) {
    if (!e.length) {
      return false;
    }
    var topOff = e.offset().top;
    var height = e.outerHeight();
    var menuTop = $(".feature-widget").offset().top;
    e.closest(".feature-2-item").removeClass("mleave");
    e.closest(".feature-2-item").siblings().addClass("mleave");
    active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
  }
  $(".feature-widget .feature-2-item").on("click", function () {
    $(".feature-widget .feature-2-item").removeClass("current");
    $(this).addClass("current");
  });

  ////////////////////////////////////////////////////
  // 12. Service Two Images Hover Animation Js
  $(".service-two-list-wrap .service-two-list-item").on(
    "mouseenter",
    function () {
      $("#service-two-thumb").removeClass().addClass($(this).attr("rel"));
      $(this).addClass("active").siblings().removeClass("active");
    },
  );

  ////////////////////////////////////////////////////
  // 13. Bg Image For Attribute  Js
  $(".bg-img").each(function () {
    var img = $(this).data("background-image");
    if (img) {
      $(this).css("background-image", "url('" + img + "')");
    }
  });

  ////////////////////////////////////////////////////
  // 14. Mouse active Js
  $(document).ready(function () {
    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });

    $(".service-ip-wrapper").on("mouseenter", function () {
      $(this).addClass("active");
      $(this)
        .parent()
        .siblings()
        .find(".service-ip-wrapper")
        .removeClass("active");
    });
  });

  $(document).ready(function () {
    function initRipples() {
      $(".ripple-image").each(function () {
        var $container = $(this);
        var $img = $container.find("img").first();

        if ($img.length === 0) return;

        var img = new Image();
        img.src = $img.attr("src");

        img.onload = function () {
          var imgURL = img.src;

          $container.css({
            "background-image": "url(" + imgURL + ")",
            "background-size": "cover",
            "background-position": "center center",
          });

          // init ripples plugin
          if (typeof $container.ripples === "function") {
            $container.ripples({
              resolution: 400,
              perturbance: 0.03,
              imageUrl: imgURL,
            });
          }

          $img.hide();
        };
      });
    }

    initRipples();
  });
})(jQuery);
