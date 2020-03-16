var isFilterFixed = false;

function fixFilterAnchor() {
    $('.fr-filter-anchor').addClass('fr-filter-anchor--fixed');
    $('.fr-filter-anchor--fixed').on('click', openFilterHandler);
}
function unfixFilterAnchor() {
    $('.fr-filter-anchor').removeClass('fr-filter-anchor--fixed')
}

function openFilterHandler(e) {
    e.preventDefault();
    isFilterFixed = false;
    $('.fr-filter-block').removeClass('fr-filter-block--hide');
    unfixFilterAnchor();
    $('html, body').animate({scrollTop : 0},700);
}

$( document ).ready(function() {
    $('.fr-slider-widget').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navText: ['<svg width="16" height="22" viewBox="0 0 16 22" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M14.032 19.98l-11.032-8.961 9.971-8.178.498-.43.498-.43" stroke="#5894D4" stroke-width="3"/></svg>', '<svg width="15" height="22" viewBox="0 0 15 22" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M1 2l11 9-10 8.143-.5.429-.5.429" stroke="#5894D4" stroke-width="3"/></svg>'],

    });

    $('.fr-btn-slideDown').html('Смотреть 103 квартир');

    $('.fr-btn-slideDown').on('click', function(e){
        e.preventDefault();

        var
            $this = $(this),
            content = $('.fr-flats-list-inner');


        if(!$this.hasClass('fr-btn-trigger')){
            $this.addClass('fr-btn-trigger');
            $this.html('Скрыть');

            content.slideDown();
        } else {
            $this.removeClass('fr-btn-trigger');
            $this.html('Смотреть 103 квартир');

            content.slideUp();
        }
    });

    $('.fr-card-link-toggle').click(function(e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('.fr-card-body').removeClass('show');
            $this.parent().parent().find('.fr-card-body').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });

    $('.fr-tab').on('click', function (e) {
        e.preventDefault();
        $('.fr-tab, .fr-tab-content').removeClass('active');
        $(this).add('#' + $(this).attr('id').replace(/\s*filter-tab\s*/, 'filter-content')).addClass('active');
        $(this).focus();
    });

    $('.fr-filter-block-cut').on('click', function (e) {
        $('.fr-filter-block').addClass('fr-filter-block--hide');
        setTimeout(function () {
            isFilterFixed = true;
            fixFilterAnchor();
        }, 1000);
    });



    $(".fr-drop-down__value").click(function(event) {
        toggleMenu($(this).attr('data-id'));
        event.stopPropagation();
    });

    $('.fr-drop-down__list-item').click(function() {
        var id = $(this).parent().attr('data-id');
        $(`#${id}-value`).html($(this).text());
        toggleMenu(id);
    });

    function toggleMenu(dataId) {
        let menu = $(`#${dataId}`);

        const openedDropdown = $('.fr-drop-down__dropped.active');
        console.log(openedDropdown.attr('id') === dataId);
        openedDropdown.attr('id') !== dataId && openedDropdown.toggleClass('active');

        if (!menu.hasClass('active')) {
            window.addEventListener('click', closeMenu);
        } else {
            window.removeEventListener('click', closeMenu);
        }
        menu.toggleClass("active");
    }

    function closeMenu() {
        $(".fr-drop-down__dropped").removeClass("active")
    }

    $('.fr-drop-down__dropped').click(function(event) {
        event.stopPropagation();
    });


    $('.fr-input__field').on('input', function() {
        let search = $(this).val();
        searchData(search);
    });

    function searchData(search) {
        let towns = $('.fr-drop-down__list-item');
        towns.each(function() {
            if ($(this).text().indexOf(search) === -1) {
                $(this).addClass('item_hide');
            } else {
                $(this).removeClass('item_hide');
            }
        });
    }




});

const sliders = document.querySelectorAll('.fr-range-field');
for (let i = 0; i < sliders.length; i++) {
    noUiSlider.create(sliders[i], {
        start: [20],
        connect: true,
        step: 1,
        orientation: 'horizontal',
        range: {
            'min': 0,
            'max': 100
        },
        format: wNumb({
            decimals: 0
        })
    });
}

$(window).scroll(function() {
    $('.fr-filter-anchor--fixed').off('click', openFilterHandler);
    if($(window).scrollTop() > window.innerHeight || isFilterFixed === true){
        fixFilterAnchor();
    } else{
        unfixFilterAnchor();
    }
});

