window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1.鼠标经过小图片盒子时，显示遮挡层和大图片盒子
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        })
        // 2.鼠标移动时，让黄色盒子跟着鼠标走
    preview_img.addEventListener('mousemove', move);

    function move(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskMaxX = preview_img.offsetWidth - mask.offsetWidth;
        var maskMaxY = preview_img.offsetHeight - mask.offsetHeight;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMaxX) {
            maskX = maskMaxX;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMaxY) {
            maskY = maskMaxY;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3.大图片跟随遮挡层移动
        // 大图片的最大移动距离
        var bigImg = document.querySelector('.bigImg');
        var bigMaxX = bigImg.offsetWidth - big.offsetWidth;
        var bigMaxY = bigImg.offsetHeight - big.offsetHeight;
        // 大图片的移动距离
        var bigX = maskX * bigMaxX / maskMaxX;
        var bigY = maskY * bigMaxY / maskMaxY;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    }


})