var scroll	= $('body, .page__details'),
  $window	= $(window),
  intro	= $('.detail:first-of-type');


// Scrolling to on-site anchor hashes

$('a[href^=#]').on('click', function(e){
  scroll.animate({
    scrollTop:$($(this).attr('href')).offset().top
  }, 500);
  e.preventDefault();
});


// Hide scroll indicator if scrolled past 50% of the first detail section

$window.scroll(function() {
  if ($window.scrollTop() > intro.height() / 2) {
    intro.addClass('is-scrolled');
  }
  else {
    intro.removeClass('is-scrolled');
  }
});
