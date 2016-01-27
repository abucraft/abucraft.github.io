(function() {
  var index = 2;

  function initial() {
    $('.icons > li').each(function(idx, li) {
      //transform不能初始化两边所以得先初始化一遍
      Transform(li);
    });
    choosePage();
  }

  initial();

  function headerToTop() {
    $('.icons > li').each(function(idx, li) {
      li.translateX = (2 - index) * li.offsetHeight;
      li.scaleX = (1 - Math.abs(idx + 1 - index) * 0.25);
      li.scaleY = (1 - Math.abs(idx + 1 - index) * 0.25);
      li.scaleZ = (1 - Math.abs(idx + 1 - index) * 0.25);
      $(li).css('opacity', 1 - Math.abs(idx + 1 - index) * 0.25);
      if (idx + 1 == index) {
        $(li).children('a').addClass('active');
      }
    });
  }

  function choosePage() {
    $('.icons > li').each(function(idx, li) {
      $(li).children('a').removeClass('active');
      li.translateX = (2 - index) * li.offsetHeight;
      li.scaleX = (1 - Math.abs(idx + 1 - index) * 0.25);
      li.scaleY = (1 - Math.abs(idx + 1 - index) * 0.25);
      li.scaleZ = (1 - Math.abs(idx + 1 - index) * 0.25);
      $(li).css('opacity', 1 - Math.abs(idx + 1 - index) * 0.25);
      if (idx + 1 == index) {
        $(li).children('a').addClass('active');
      }
    });
    $('.slide-frame').css('margin-left',(1-index)*100+'%');
  }

  $('.container').bind('mousewheel', function(event) {
    if (event.originalEvent.deltaY < 0) {
      var header = $(".headerbar");
      if (header.hasClass('to-middle')) {
        header.removeClass('to-middle');
      }
    } else {
      var header = $(".headerbar");
      if (!header.hasClass('to-middle')) {
        header.addClass('to-middle');
      }
    }
    console.log(event.originalEvent.deltaY);
    console.log('scrolled');
  });


  $('.left-arrow').click(function() {
    if (index != 1) {
      index = index - 1;
    }
    choosePage();
    console.log('arrow clicked');
    console.log(index);
  });

  $('.right-arrow').click(function() {
    if (index != 3) {
      index = index + 1;
    }
    choosePage();
    console.log('arrow clicked');
    console.log(index);
  });
})();
