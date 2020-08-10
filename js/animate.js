function animate(obj, target, callBack) {
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callBack) {
            //     callBack();
            // }
            callBack && callBack();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}