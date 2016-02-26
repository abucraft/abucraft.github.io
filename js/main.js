'use strict'
let index = 2;
let state = 'closed';
let lastState = "closed";
let deltaY = 0;

function initial() {
	$('.icons > li').each(function(idx, li) {
		//transform不能初始化两边所以得先初始化一遍
		Transform(li);
		setTimeout(function() {
			$('.icons > li').removeClass('transparent');
		}, 100);
	});
	setTimeout(function() {
		$('.sculpture').removeClass('transparent');
	}, 100);
	$('.icons > li > a').each(function(idx, a) {
		$(a).hover(function() {
			$(a).addClass('hoverOn');
		}, function() {
			$(a).removeClass('hoverOn');
		})
	})
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

//改变页面状态、展开、关闭
function changeState() {
	if (lastState == state) {
		return;
	}
	//从不可见变为可见
	if (lastState == 'closed') {
		choosePage();
		//显示隐藏的物体
		$('.sculpture').addClass('hide');
		$('.sculpture-container').addClass('hide');
		$('.triangle').removeClass('hide-triangle');
		$('.main').removeClass('zero-height');
		$('.arrows').removeClass('none');
		setTimeout(function() {
			$('.footer').removeClass('lower-footer');
		}, 200);
	}
	//从可见变为不可见
	if (lastState == 'choose-head' && state == 'closed') {
		resetPage();
		//隐藏
		$('.sculpture').removeClass('hide');
		$('.sculpture-container').removeClass('hide');
		$('.triangle').addClass('hide-triangle');
		$('.main').addClass('zero-height');
		$('.arrows').addClass('none');
		setTimeout(function() {
			$('.footer').addClass('lower-footer');
		}, 200);
	}
	//choose-head -> choose-middle
	if (lastState == 'choose-head' && state == 'choose-middle') {
		$(".headerbar").addClass('to-middle');
	}

	//choose-middle -> choose-head
	if (lastState == 'choose-middle' && state == 'choose-head') {
		$(".headerbar").removeClass('to-middle');
	}
}

$('.container').bind('mousewheel', function(event) {
	deltaY = deltaY + event.originalEvent.deltaY;
	if (deltaY <= -200) {
		//滚轮向上滑动，画面向上滚动
		deltaY = 0;
		if (state == 'choose-head') {
			lastState = 'choose-head';
			state = 'closed';
			changeState();
			return; //起break的作用
		}
		if (state == 'choose-middle') {
			lastState = 'choose-middle';
			state = 'choose-head';
			changeState();
			return;
		}

	}

	if (deltaY >= 200) {
		//滚轮下滑，画面展开
		deltaY = 0;
		if (state == 'choose-head') {
			lastState = 'choose-head';
			state = 'choose-middle';
			changeState();
			return;
		}
		if (state == 'closed') {
			lastState = 'closed';
			state = 'choose-head';
			changeState();
			return;
		}

	}
	//console.log(event.originalEvent.deltaY);
	//console.log('scrolled');
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

$('.icons > li').each(function(idx, li) {
	$(li).children().click(function() {
		lastState = state;
		state = 'choose-head';
		changeState();
		index = idx + 1;
		choosePage();
	});
});
