// $(function () {
//   var $carousel = $("#product-carousel");
//   var $counter = $("#slide-counter");
//   var totalSlides = $carousel.find(".carousel-card").length;

//   function updateCounter(event) {
//     var normalizedIndex = event.relatedTarget.relative(event.item.index);
//     $counter.text("Showing " + (normalizedIndex + 1) + " of " + totalSlides);
//   }

//   $carousel.on("initialized.owl.carousel changed.owl.carousel", updateCounter);

//   $carousel.owlCarousel({
//     loop: true,
//     margin: 12,
//     nav: false,
//     dots: true,
//     autoplay: true,
//     autoplayTimeout: 5000,
//     autoplayHoverPause: true,
//     smartSpeed: 500,
//     responsive: {
//       0: {
//         items: 1,
//       },
//       768: {
//         items: 2,
//       },
//       1024: {
//         items: 3,
//       },
//     },
//   });

//   // Ensure correct text is visible immediately after initialization.
//   $counter.text("Showing 1 of " + totalSlides);

//   $("#carousel-next").on("click", function () {
//     $carousel.trigger("next.owl.carousel");
//   });

//   $("#carousel-prev").on("click", function () {
//     $carousel.trigger("prev.owl.carousel");
//   });

//   $(document).on("click", ".carousel-card", function () {
//     var targetId = $(this).data("target");
//     var targetElement = document.getElementById(targetId);
//     if (targetElement) {
//       targetElement.scrollIntoView({ behavior: "smooth" });
//     }
//   });

//   $(document).on("mouseenter", ".carousel-card", function () {
//     $carousel.trigger("stop.owl.autoplay");
//   });

//   $(document).on("mouseleave", ".carousel-card", function () {
//     $carousel.trigger("play.owl.autoplay", [5000]);
//   });
// });






$(function () {
  var $carousel = $("#product-carousel");
  var $counter = $("#slide-counter");
  var totalSlides = $carousel.find(".carousel-card").length;

  // Initialize carousel
  $carousel.owlCarousel({
    loop: true,
    margin: 12,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 500,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
    },
  });

  // Update counter safely
  function updateCounter(event) {
    // Get the index of the current **real** slide
    var realIndex = event.item.index - event.relatedTarget._clones.length / 2;
    if (realIndex < 0) realIndex += totalSlides; // wrap around negative
    var current = (realIndex % totalSlides) + 1; // 1-based counting
    $counter.text(`Showing ${current} of ${totalSlides}`);
  }

  // Update counter on carousel load and change
  $carousel.on("initialized.owl.carousel changed.owl.carousel", updateCounter);

  // Show initial counter
  $counter.text(`Showing 1 of ${totalSlides}`);

  // Next/Prev buttons
  $("#carousel-next").click(() => $carousel.trigger("next.owl.carousel"));
  $("#carousel-prev").click(() => $carousel.trigger("prev.owl.carousel"));

  // Scroll to target on card click
  $(document).on("click", ".carousel-card", function () {
    var target = document.getElementById($(this).data("target"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });

  // Pause/play on hover
  $(document).on({
    mouseenter: () => $carousel.trigger("stop.owl.autoplay"),
    mouseleave: () => $carousel.trigger("play.owl.autoplay", [5000])
  }, ".carousel-card");
});



document.getElementById("fa-bars").addEventListener("click", function () {
  document.querySelector("nav").style.display = "grid";
  document.getElementById("fa-bars").style.display = "none";
  document.getElementById("fa-xmark").style.display = "flex";
  document.getElementById("fa-xmark").style.position = "absolute";
  document.getElementById("fa-xmark").style.right = "40px";
});

document.getElementById("fa-xmark").addEventListener("click", function () {
  document.querySelector("nav").style.display = "none";
  document.getElementById("fa-bars").style.display = "flex";
  document.getElementById("fa-xmark").style.display = "none";
});
