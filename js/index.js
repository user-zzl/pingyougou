window.addEventListener("load", function () {
  // 获取元素
  var arrowL = document.querySelector(".arrow-l");
  var arrowR = document.querySelector(".arrow-r");
  var focus = document.querySelector(".focus");
  var focusWidth = focus.offsetWidth;
  focus.addEventListener("mouseenter", function () {
    arrowL.style.display = "block";
    arrowR.style.display = "block";
    clearInterval(timer);
    timer = null;
  });
  focus.addEventListener("mouseleave", function () {
    arrowL.style.display = "none";
    arrowR.style.display = "none";
    timer = setInterval(function () {
      arrowR.click();
    }, 2000);
  });
  /****************动态生成小圆圈***********************/
  var ul = focus.querySelector("ul");
  var ol = focus.querySelector(".circle");
  for (var i = 0; i < ul.children.length; i++) {
    // 创建小li
    var li = document.createElement("li");
    //记录当前小圆圈的索引号，通过自定义属性来做
    li.setAttribute("index", i);
    // 把小 li 插入到 ol 里面
    ol.appendChild(li);
    //小圆圈排他思想，生成小圆圈的时候绑定点击事件
    li.addEventListener("click", function () {
      //干掉所有人，把所有的li 清除current类名
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      //留下自己 当前小li 设置为current类名
      this.className = "current";
      //点击小圆圈，移动图片，移动ul
      //当我们点击某个小li，就拿到当前小li的索引号
      var index = this.getAttribute("index");
      //将索引号给num，使点击按钮与点击小圆圈同步
      num = index;
      circle = index;
      animate(ul, -index * focusWidth);
    });
  }
  // 把 ol 里面的第一个 li 设置为current类，让他在选中状态
  ol.children[0].className = "current";
  //克隆第一张图片放到ul 最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  //点击右侧按钮，图片滚动一张
  var num = 0;
  //circle 控制小圆圈的播放
  var circle = 0;
  //节流阀
  var flag = true;
  //右侧按钮
  arrowR.addEventListener("click", function () {
    if (flag) {
      flag = false;
      //走到最后一张图片时，ul要回到第一张
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      //点击右侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
      circle++;
      //走到克隆的那张图时，就将circle复原为0；
      if (circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    }
  });
  //左侧按钮
  arrowL.addEventListener("click", function () {
    if (flag) {
      flag = false;
      //走到最后一张图片时，ul要回到第一张
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + "px";
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      //点击右侧按钮，小圆圈跟随一起变化，可以再声明一个变量控制小圆圈的播放
      circle--;
      //走到克隆的那张图时，就将circle复原为3；
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      circleChange();
    }
  });

  function circleChange() {
    //先清除其余小圆圈的current类名
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    //留下当前小圆圈的current类名
    ol.children[circle].className = "current";
  }
  //自动播放轮播图
  var timer = setInterval(function () {
    arrowR.click();
  }, 2000);
});

//jQuery语法---电梯导航
$(function () {
  //节流阀,点击li则关闭即为false,动画完了，调执行回调函数，将它打开，即为true,滑动得在true是进行。
  var flag = true;
  //1.显示隐藏电梯导航
  var toolTop = $(".recommend").offset().top;
  toggleTool();
  //函数--显示隐藏电梯导航
  function toggleTool() {
    if ($(document).scrollTop() >= toolTop) {
      $(".fixedtool").fadeIn();
    } else {
      $(".fixedtool").fadeOut();
    }
  }
  //页面滚动事件
  $(window).scroll(function () {
    toggleTool();
    //3.页面滚动，电梯导航跟随变化
    if (flag) {
      $(".floor .w").each(function (i, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top) {
          $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
        }
      });
    }
  });
  //2.点击电梯导航页面可以滚动到相应内容区域
  $(".fixedtool li").click(function () {
    flag = false;
    console.log($(this).index());
    //每点有个li，就需要计算页面要去的位置
    var current = $(".floor .w").eq($(this).index()).offset().top;
    //页面动画滚动效果
    $("body, html")
      .stop()
      .animate(
        {
          scrollTop: current,
        },
        function () {
          //节流阀
          flag = true;
        }
      );
    //点击之后让当前li，添加current,变为红背景,兄弟移除current
    $(this).addClass("current").siblings().removeClass();
  });
});
