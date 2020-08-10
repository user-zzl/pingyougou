$(function() {
    // 1.全选
    $('.checkall').change(function() {
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));
        if ($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');
        }
    });
    // 2.如果小复选框被选中的个数等于3，就应该把全选按钮选上
    $('.j-checkbox').change(function() {
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        if ($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    });
    // 3.增减商品数量模块
    $('.increment').click(function() {
        //得到文本框的值
        var n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);
        //小计模块
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        //利用截取字符串substr(1)，将￥去掉
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        getSum();
    });
    $('.decrement').click(function() {
        //得到文本框的值
        var n = $(this).siblings('.itxt').val();
        if (n == 1) {
            //return后面的语句不会继续执行
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);
        //小计模块
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        //利用截取字符串substr(1)，将￥去掉
        p = p.substr(1);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (p * n).toFixed(2));
        getSum();
    });
    // 4.用户修改文本框的值时，小计模块也要跟随变化
    $('.itxt').change(function() {
        var n = $(this).val();
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (p * n).toFixed(2));
        getSum();
    });
    // 5.计算总计和总额
    getSum(); //提前调用一遍，把原本的数量显示出来

    function getSum() {
        var count = 0; //总件数
        var money = 0; //总价钱
        $('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val());

        });
        $(".amount-sum em").text(count);
        $('.p-sum').each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
            $('.price-sum em').text('￥' + money.toFixed(2));
        })
    };
    // 6.删除
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        getSum();
    });
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
    });
    $('.clear-all').click(function() {
        $('.cart-item').remove();
        $(".amount-sum em").text('0');
        $('.price-sum em').text('￥' + '0.00');
    })
})