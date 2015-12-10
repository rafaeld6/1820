
$(function(){
    $.w = $(window);
    $.w.on('resize', res);
    res();
});


function res() {
    $('.banner--animate, .banner__caption').css('height',($.w.outerHeight())+'px');
}





$('.banner--animate')
    .scrollSections({
        speed: 1100,
        alwaysStartWithFirstSection : true, // force to load the page on the first section (prevent broswer caching)

        before: function($currentSection, $nextSection){

            _initFuturSection($nextSection);
        },

        after: function($currentSection, $previousSection){

            _initNewSection($currentSection, $previousSection);
        }
    });

function _initNewSection($section, $prevSection){

    // Do some stuff each time this new section ends animating

    // Only if there is a previous section (its null on first scroll)
    if($prevSection){
        $('.banner__title, .banner__content, .portfolio', $prevSection).removeClass('is-in'); // Hide old section title
    }
    $('.banner__title, .banner__content, .portfolio', $section).addClass('is-in'); // Fade in current section title

    // Do some stuffs only on first init
    if( !$section.data('isInit') ){
        // Create slider for example
        // $('.selector', $section).slider();

        // Singleton
        $section.data('isInit', true);
    }
}

function _initFuturSection($section){

    // Do some stuff each time before this section appears
    $('.banner__title, .banner__content, .portfolio', $section).removeClass('is-in');
}

$('.button--play').click(function() {
    $('.banner__title, .banner__content, .l-header, .l-footer, #scrollsections-navigation').addClass('is-shrinked');
    $('.video-screen').addClass('is-play').delay(1000);

    $('video').trigger('play');
});

$('.video__close').click(function() {
    $('.video-screen').removeClass('is-play');
    $('.banner__title, .banner__content, .l-header, .l-footer, #scrollsections-navigation').removeClass('is-shrinked');
});