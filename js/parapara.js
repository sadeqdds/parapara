$(function () {

    var target_id = 'parapara0';
    var pre_deg = {};
    var pic_pos = {};
    const DEG_PER_PIC = 1;

    init();

    function init() {
        window.addEventListener('deviceorientation', function (e) {
            var s = $(document).scrollTop();
            var m = $(window).height();
            var num = Math.abs(parseInt(s / m));
            target_id = 'parapara' + num;
            if (check_loaded()) {
                hide_preload();
                parapara(e);
            } else {
                show_preload();
            }
        }, true).unbind();

        setTimeout(init, 1000);
    }

    /*
     when a device rotate +/- 1 degree, show next/previous picture.
     */
    function parapara(e) {
        var deg = e.gamma;
        var diff = 0;
        var max = get_pic_num() - 1;
        var pos = 0;
        /*
         dosen't work 
         var pos = pic_pos[target_id] || parseInt(get_pic_num() / 2);
         */
        if (typeof pic_pos[target_id] !== 'undefined') {
            pos = pic_pos[target_id];
        } else {
            pos = parseInt(get_pic_num() / 2);
        }
        if ((deg >= 0 && pre_deg[target_id] >= 0) || (deg <= 0 && pre_deg[target_id] <= 0)) {
            diff = parseInt((deg - pre_deg[target_id]) / DEG_PER_PIC);
        } else if ((deg > 0 && pre_deg[target_id] < 0) || (deg < 0 && pre_deg[target_id] > 0)) {
            diff = parseInt((deg + pre_deg[target_id]) / DEG_PER_PIC);
        }
        pos += diff;
        if (pos >= max) {
            pos = max;
        } else if (pos <= 0) {
            pos = 0;
        }
        show_pic(pos);
        pic_pos[target_id] = pos;
        pre_deg[target_id] = deg;
    }

    function get_pic_num() {
        return $('#' + target_id + ' > img').length;
    }

    function show_pic(pos) {
        $('#' + target_id + ' img.active')
                .addClass('unactive')
                .removeClass('active');
        $('#' + target_id + ' img.photo' + pos)
                .addClass('active')
                .removeClass('unactive');

    }

    function show_preload() {
        $('#' + target_id + ' > div > img.preload').css('opacity', 1);
    }

    function hide_preload() {
        $('#' + target_id + ' > div').hide();
    }

    function check_loaded() {
        var flag = false;
        var count = 0;
        var imgs = $('#' + target_id + ' > img');
        for (var i = 0; i < get_pic_num(); i++) {
            if ($(imgs[i]).hasClass('lazy-loaded') || $(imgs[i]).hasClass('preload')) {
                count++;
            }
        }
        if (i == count) {
            flag = true;
        }
        return flag;
    }

});