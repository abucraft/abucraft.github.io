(function() {
  var index = 2;
  var state = 'closed';

  function initial() {
    $('.icons > li').each(function(idx, li) {
      //transform不能初始化两边所以得先初始化一遍
      Transform(li);
    });
    $('.icons>li').each(function(idx,li){
      $(li).hover(function(){
        li.rotateY=180;
      });
    });
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
    $('.slide-frame').css('margin-left', (1 - index) * 100 + '%');
  }

  function resetPage() {
    index = 2;
    $('.icons > li').each(function(idx, li) {
      $(li).children('a').removeClass('active');
      li.translateX = 0;
      li.scaleX = 1;
      li.scaleY = 1;
      li.scaleZ = 1;
      $(li).css('opacity', 1);
    });
  }

  $('.container').bind('mousewheel', function(event) {
    if (event.originalEvent.deltaY < 0) {
      //滚轮向上滑动，画面向上滚动
      if (state == 'choose-head') {
        state = 'closed';
        resetPage();
        //隐藏
        $('.triangle').addClass('hide-triangle');
        $('.main').addClass('zero-height');
        $('.arrows').addClass('none');
        setTimeout(function() {
          $('.footer').addClass('lower-footer');
        }, 200);
        return; //起break的作用
      }
      if (state == 'choose-middle') {
        state = 'choose-head';
        $(".headerbar").removeClass('to-middle');
        return;
      }
    } else {
      //滚轮下滑，画面展开
      if (state == 'choose-head') {
        state = 'choose-middle';
        $(".headerbar").addClass('to-middle');
        return;
      }
      if (state == 'closed') {
        state = 'choose-head';
        choosePage();
        //显示隐藏的物体
        $('.triangle').removeClass('hide-triangle');
        $('.main').removeClass('zero-height');
        $('.arrows').removeClass('none');
        setTimeout(function() {
          $('.footer').removeClass('lower-footer');
        }, 300);
        return;
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
