//var myApp = new Framework7();
//var base_url = "http://localhost/parapara/parapara_server/";
//var base_url = "http://192.168.20.102/parapara/parapara_server/";
//var base_url = "http://ec2-54-64-238-175.ap-northeast-1.compute.amazonaws.com/parapara_server/";

var base_url = "http://www.parapara.xyz/parapara_server/";

var myApp = new Framework7({
    onPageInit: function (app, page) {
        if (page.name === 'index') {
            var user_id = getParameterByName('user_id');
            localStorage.setItem("parapara_user_id", JSON.stringify(user_id));
        }
    }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});

$$('.popup-compost').on('click', function () {
    myApp.popup('.popup-compost');
});

$(document).ready(function () {
    //FastClick.attach(document.body);

    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));

    console.log(user_id);

    get_timeline(user_id);
});
/**
 * video capture START
 */
function captureSuccess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFile(mediaFiles[i]);
    }
}

// Called if something bad happens.
// 
function captureError(error) {
    if (error.code != "3")
    {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Error');
    }
}

// A button will call this function
//
function captureVideo() {
    // Launch device video recording application, 
    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1, duration: 5});
}

// Upload files to server
function uploadFile(mediaFile) {
    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));
    mainView.router.loadPage("upload.html");
    //jQuery("div[id=parapara_video_upload_text]").fadeIn();
    var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;
    ft.upload(path,
            base_url + "upload_video.php?user_id=" + user_id,
            function (result) {
                jQuery("div[id=parapara_video_upload_text]").fadeOut();
                get_upload();
                //get_timeline(user_id);
                //mainView.router.loadPage("upload.html");
            },
            function (error) {
                jQuery("div[id=parapara_video_upload_text]").fadeOut();
                myApp.alert('Error uploading file ' + path + ': ' + error.code, 'Parapara');
            },
            {fileName: name});
}

/**
 * video capture END
 */

/**
 * define all functions START
 */

function get_timeline(user_id)
{
    var test_data = '';
    var cool_btn = '';
    var i = 0;

    var testing_data = '';


    //fetch data from server

    jQuery('div[id=parapara_timeline]').html("");
    myApp.showIndicator();


    $.ajax({
        url: base_url + "timeline.php",
        data:
                {
                    user_id: user_id
                },
        type: "POST",
        success: function (data)
        {
            myApp.hideIndicator();

            //console.log(data);
            data = jQuery.parseJSON(data);
            //console.log(data);

            //myApp.alert(data.length);

            $.each(data, function (index, value) {
                cool_btn = '';
                if (value.cool_user == 0)
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool before" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-thumbsup"></i></a>';
                } else
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-wink"></i></a>';
                }


                testing_data = '<div id="parapara' + i + '" style="position:relative;" class="imgbox">'

                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video001.jpg" style="position:absolute;width:100%;height:auto;" class="photo0 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video002.jpg" style="position:absolute;width:100%;height:auto;" class="photo1 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video003.jpg" style="position:absolute;width:100%;height:auto;" class="photo2 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video004.jpg" style="position:absolute;width:100%;height:auto;" class="photo3 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video005.jpg" style="position:absolute;width:100%;height:auto;" class="photo4 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video006.jpg" style="position:absolute;width:100%;height:auto;" class="photo5 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video007.jpg" style="position:absolute;width:100%;height:auto;" class="photo6 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video008.jpg" style="position:absolute;width:100%;height:auto;" class="photo7 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video009.jpg" style="position:absolute;width:100%;height:auto;" class="photo8 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video010.jpg" style="position:absolute;width:100%;height:auto;" class="photo9 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video011.jpg" style="position:absolute;width:100%;height:auto;" class="photo10 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video012.jpg" style="position:absolute;width:100%;height:auto;" class="photo11 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video013.jpg" style="position:absolute;width:100%;height:auto;" class="photo12 active preload lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video014.jpg" style="position:absolute;width:100%;height:auto;" class="photo13 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video015.jpg" style="position:absolute;width:100%;height:auto;" class="photo14 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video016.jpg" style="position:absolute;width:100%;height:auto;" class="photo15 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video017.jpg" style="position:absolute;width:100%;height:auto;" class="photo16 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video018.jpg" style="position:absolute;width:100%;height:auto;" class="photo17 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video019.jpg" style="position:absolute;width:100%;height:auto;" class="photo18 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video020.jpg" style="position:absolute;width:100%;height:auto;" class="photo19 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video021.jpg" style="position:absolute;width:100%;height:auto;" class="photo20 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video022.jpg" style="position:absolute;width:100%;height:auto;" class="photo21 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video023.jpg" style="position:absolute;width:100%;height:auto;" class="photo22 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video024.jpg" style="position:absolute;width:100%;height:auto;" class="photo23 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video025.jpg" style="position:absolute;width:100%;height:auto;" class="photo24 unactive lazy img" />'


                        + '</div>';


                if (i == 0)
                {

                    test_data = '<div class="slider-slide" id="timeline_container_' + i + '">'
                            //+ '<img src="img/sample1.png" class="dispimg">'
                            + testing_data
                            + '<div class="toolbar tabbar bottombar">'
                            + '<div class="toolbar-inner-right">'
                            + '<a href="#" data-popover=".popover-share" class="open-popover tab-link tab-icon share" onclick="share_timeline_id=' + value.id + ';"><i class="icon icon-link-ext"></i></a>'
                            + '<a href="#" data-popup=".comment-popup" class="open-popup tab-link tab-icon comment" onclick="get_comment_list(' + value.id + ');"><i class="icon icon-comment-3"></i></a>'

                            + cool_btn

                            + '</div>'
                            + '<div class="toolbar-inner-left">'
                            + '<a href="profile.html?profile_id=' + value.user_id + '" class="link tab-icon"><span><img src="' + value.profile_image + '" class="usericon"></span></a>'
                            + '<a href="#" class="tab-link tab-icon"><span data-popover=".popover-cool" class="open-popover status-content"><span id="parapara_count_cool_' + value.id + '">' + value.cool_count + '</span><span class="icon icon-emo-wink" onclick="get_cool_list(' + value.id + ');"></span></span></a>'
                            + '<a href="#" class="tab-link tab-icon"><span data-popup=".comment-popup" class="open-popup status-content"><span id="parapara_count_comment_' + value.id + '">' + value.comment_count + '</span><span class="icon icon-comment-3" onclick="get_comment_list(' + value.id + ');"></span></span></a>'
                            + '</div>'
                            + '</div>'
                            + '</div>';
                }
                else
                {
                    test_data = '<div id="timeline_container_' + i + '" class="slider-slide"></div>';
                }


                jQuery('div[id=parapara_timeline]').append(test_data);
                jQuery('div[id=timeline_container_0]').show();
                i++;
                $("img.lazy").lazyLoadXT();
            });


            var mySlider = myApp.slider('.slider-container', {
                speed: 400,
                direction: 'vertical',
                onSlideChangeEnd: get_next_timeline
            });

        }
    });

}

function get_next_timeline(slider)
{
    console.log(slider);

    var test_data = '';
    var cool_btn = '';
    var i = 0;
    var start = slider.activeSlideIndex;
    var previous = slider.previousSlideIndex;

    var testing_data = '';
    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));


    //fetch data from server

    myApp.showIndicator();


    $.ajax({
        url: base_url + "get_next_timeline.php",
        data:
                {
                    user_id: user_id,
                    start: start
                },
        type: "POST",
        success: function (data)
        {
            myApp.hideIndicator();

            //console.log(data);
            data = jQuery.parseJSON(data);
            //console.log(data);

            //myApp.alert(data.length);

            $.each(data, function (index, value) {
                cool_btn = '';
                if (value.cool_user == 0)
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool before" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-thumbsup"></i></a>';
                } else
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-wink"></i></a>';
                }


                testing_data = '<div id="parapara' + i + '" style="position:relative;" class="imgbox">'

                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video001.jpg" style="position:absolute;width:100%;height:auto;" class="photo0 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video002.jpg" style="position:absolute;width:100%;height:auto;" class="photo1 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video003.jpg" style="position:absolute;width:100%;height:auto;" class="photo2 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video004.jpg" style="position:absolute;width:100%;height:auto;" class="photo3 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video005.jpg" style="position:absolute;width:100%;height:auto;" class="photo4 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video006.jpg" style="position:absolute;width:100%;height:auto;" class="photo5 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video007.jpg" style="position:absolute;width:100%;height:auto;" class="photo6 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video008.jpg" style="position:absolute;width:100%;height:auto;" class="photo7 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video009.jpg" style="position:absolute;width:100%;height:auto;" class="photo8 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video010.jpg" style="position:absolute;width:100%;height:auto;" class="photo9 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video011.jpg" style="position:absolute;width:100%;height:auto;" class="photo10 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video012.jpg" style="position:absolute;width:100%;height:auto;" class="photo11 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video013.jpg" style="position:absolute;width:100%;height:auto;" class="photo12 active preload lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video014.jpg" style="position:absolute;width:100%;height:auto;" class="photo13 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video015.jpg" style="position:absolute;width:100%;height:auto;" class="photo14 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video016.jpg" style="position:absolute;width:100%;height:auto;" class="photo15 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video017.jpg" style="position:absolute;width:100%;height:auto;" class="photo16 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video018.jpg" style="position:absolute;width:100%;height:auto;" class="photo17 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video019.jpg" style="position:absolute;width:100%;height:auto;" class="photo18 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video020.jpg" style="position:absolute;width:100%;height:auto;" class="photo19 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video021.jpg" style="position:absolute;width:100%;height:auto;" class="photo20 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video022.jpg" style="position:absolute;width:100%;height:auto;" class="photo21 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video023.jpg" style="position:absolute;width:100%;height:auto;" class="photo22 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video024.jpg" style="position:absolute;width:100%;height:auto;" class="photo23 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video025.jpg" style="position:absolute;width:100%;height:auto;" class="photo24 unactive lazy img" />'


                        + '</div>';


                test_data = '<div class="slider-slide" id="timeline_container_' + i + '">'
                        //+ '<img src="img/sample1.png" class="dispimg">'
                        + testing_data
                        + '<div class="toolbar tabbar bottombar">'
                        + '<div class="toolbar-inner-right">'
                        + '<a href="#" data-popover=".popover-share" class="open-popover tab-link tab-icon share" onclick="share_timeline_id=' + value.id + ';"><i class="icon icon-link-ext"></i></a>'
                        + '<a href="#" data-popup=".comment-popup" class="open-popup tab-link tab-icon comment" onclick="get_comment_list(' + value.id + ');"><i class="icon icon-comment-3"></i></a>'
                        + cool_btn
                        + '</div>'
                        + '<div class="toolbar-inner-left">'
                        + '<a href="profile.html?profile_id=' + value.user_id + '" class="link tab-icon"><span><img src="' + value.profile_image + '" class="usericon"></span></a>'
                        + '<a href="#" class="tab-link tab-icon"><span data-popover=".popover-cool" class="open-popover status-content"><span id="parapara_count_cool_' + value.id + '">' + value.cool_count + '</span><span class="icon icon-emo-wink" onclick="get_cool_list(' + value.id + ');"></span></span></a>'
                        + '<a href="#" class="tab-link tab-icon"><span data-popup=".comment-popup" class="open-popup status-content"><span id="parapara_count_comment_' + value.id + '">' + value.comment_count + '</span><span class="icon icon-comment-3" onclick="get_comment_list(' + value.id + ');"></span></span></a>'
                        + '</div>'
                        + '</div>'
                        + '</div>';

                //alert(test_data);

                jQuery('div[id=timeline_container_' + previous + ']').html("");
                jQuery('div[id=timeline_container_' + start + ']').html(test_data);
                //jQuery('div[id=timeline_container_0]').show();
                i++;
                $("img.lazy").lazyLoadXT();



                //console.log(test_data);
            });
//
//
//            var mySlider = myApp.slider('.slider-container', {
//                speed: 400,
//                direction: 'vertical',
//                onSlideChangeEnd: get_next_timeline
//            });
        }
    });



    $("img.lazy").lazyLoadXT();
}

function facebook_login_server()
{
    myApp.showIndicator();
    window.location.href = base_url + "facebook_login/";
}


function get_each(timeline_id)
{
    var test_data = '';
    var cool_btn = '';
    var i = 0;

    var testing_data = '';

    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));

    //add delete function
    jQuery("a[id=parapara_each_delete_timeline]").attr('onclick', 'delete_timeline(' + timeline_id + ');');


    //fetch data from server
    myApp.showIndicator();


    $.ajax({
        url: base_url + "each.php",
        data:
                {
                    timeline_id: timeline_id,
                    user_id: user_id
                },
        type: "POST",
        success: function (data)
        {
            myApp.hideIndicator();

            //console.log(data);
            data = jQuery.parseJSON(data);
            //console.log(data);

            //myApp.alert(data.length);

            $.each(data, function (index, value) {
                cool_btn = '';
                if (value.cool_user == 0)
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool before" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-thumbsup"></i></a>';
                } else
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-wink"></i></a>';
                }


                testing_data = '<div id="parapara' + i + '" style="position:relative;" class="imgbox">'

                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video001.jpg" style="position:absolute;width:100%;height:auto;" class="photo0 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video002.jpg" style="position:absolute;width:100%;height:auto;" class="photo1 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video003.jpg" style="position:absolute;width:100%;height:auto;" class="photo2 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video004.jpg" style="position:absolute;width:100%;height:auto;" class="photo3 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video005.jpg" style="position:absolute;width:100%;height:auto;" class="photo4 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video006.jpg" style="position:absolute;width:100%;height:auto;" class="photo5 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video007.jpg" style="position:absolute;width:100%;height:auto;" class="photo6 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video008.jpg" style="position:absolute;width:100%;height:auto;" class="photo7 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video009.jpg" style="position:absolute;width:100%;height:auto;" class="photo8 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video010.jpg" style="position:absolute;width:100%;height:auto;" class="photo9 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video011.jpg" style="position:absolute;width:100%;height:auto;" class="photo10 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video012.jpg" style="position:absolute;width:100%;height:auto;" class="photo11 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video013.jpg" style="position:absolute;width:100%;height:auto;" class="photo12 active preload lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video014.jpg" style="position:absolute;width:100%;height:auto;" class="photo13 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video015.jpg" style="position:absolute;width:100%;height:auto;" class="photo14 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video016.jpg" style="position:absolute;width:100%;height:auto;" class="photo15 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video017.jpg" style="position:absolute;width:100%;height:auto;" class="photo16 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video018.jpg" style="position:absolute;width:100%;height:auto;" class="photo17 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video019.jpg" style="position:absolute;width:100%;height:auto;" class="photo18 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video020.jpg" style="position:absolute;width:100%;height:auto;" class="photo19 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video021.jpg" style="position:absolute;width:100%;height:auto;" class="photo20 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video022.jpg" style="position:absolute;width:100%;height:auto;" class="photo21 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video023.jpg" style="position:absolute;width:100%;height:auto;" class="photo22 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video024.jpg" style="position:absolute;width:100%;height:auto;" class="photo23 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video025.jpg" style="position:absolute;width:100%;height:auto;" class="photo24 unactive lazy img" />'


                        + '</div>';


                if (i == 0)
                {

                    test_data = '<div class="slider-slide" id="timeline_container_' + i + '">'
                            //+ '<img src="img/sample1.png" class="dispimg">'
                            + testing_data
                            + '<div class="toolbar tabbar bottombar">'
                            + '<div class="toolbar-inner-right">'
                            + '<a href="#" data-popover=".popover-share" class="open-popover tab-link tab-icon share" onclick="share_timeline_id=' + value.id + ';"><i class="icon icon-link-ext"></i></a>'
                            + '<a href="#" data-popup=".comment-popup" class="open-popup tab-link tab-icon comment" onclick="get_comment_list(' + value.id + ');"><i class="icon icon-comment-3"></i></a>'
                            + cool_btn
                            + '</div>'
                            + '<div class="toolbar-inner-left">'
                            + '<a href="profile.html?profile_id=' + value.user_id + '" class="link tab-icon"><span><img src="' + value.profile_image + '" class="usericon"></span></a>'
                            + '<a href="#" class="tab-link tab-icon"><span data-popover=".popover-cool" class="open-popover status-content"><span id="parapara_count_cool_' + value.id + '">' + value.cool_count + '</span><span class="icon icon-emo-wink" onclick="get_cool_list(' + value.id + ');"></span></span></a>'
                            + '<a href="#" class="tab-link tab-icon"><span data-popup=".comment-popup" class="open-popup status-content"><span id="parapara_count_comment_' + value.id + '">' + value.comment_count + '</span><span class="icon icon-comment-3" onclick="get_comment_list(' + value.id + ');"></span></span></a>'
                            + '</div>'
                            + '</div>'
                            + '</div>';
                }
                else
                {
                    test_data = '<div id="timeline_container_' + i + '" class="slider-slide" style="position:relative;"></div>';
                }

                jQuery('div[id=parapara_each_timeline]').append(test_data);
                $("img.lazy").lazyLoadXT();
                i++;

                //console.log(test_data);
            });

            //init();


        }
    });
}


function set_cool(timeline_id)
{
    myApp.showIndicator();
    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));

    $.ajax({
        url: base_url + "set_cool.php",
        data:
                {
                    user_id: user_id,
                    timeline_id: timeline_id
                },
        type: "POST",
        success: function (data)
        {
            myApp.hideIndicator();

            data = jQuery.parseJSON(data);

            if (data.action == "-1")
            {
                jQuery("span[id=parapara_count_cool_" + timeline_id + "]").html(data.number_of_rows);
                jQuery('a[id=parapara_cool_badge_' + timeline_id + ']').addClass('before');
                jQuery('a[id=parapara_cool_badge_' + timeline_id + ']').html('<i class="icon icon-emo-thumbsup"></i>');
                get_cool_list(timeline_id);

            } else
            {
                jQuery("span[id=parapara_count_cool_" + timeline_id + "]").html(data.number_of_rows);
                jQuery('a[id=parapara_cool_badge_' + timeline_id + ']').removeClass('before');
                jQuery('a[id=parapara_cool_badge_' + timeline_id + ']').html('<i class="icon icon-emo-wink"></i>');
                get_cool_list(timeline_id);
            }
        }
    });
}


function get_mypage()
{
    var mypage_data = "";
    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));


    //fetch data from server

    jQuery('div[id=parapara_mypage_feed]').html("");
    jQuery('div[id=parapara_mypage_cool_feed]').html("");
    $.ajax({
        url: base_url + "mypage.php",
        data:
                {
                    user_id: user_id
                },
        type: "POST",
        beforeSend: function (xhr) {
            myApp.showIndicator();
        },
        success: function (data)
        {
            myApp.hideIndicator();

            //console.log(data);
            data = jQuery.parseJSON(data);
            //console.log(data);

            //myApp.alert(data.length);

            $.each(data['mypage_feed'], function (index, value) {
                mypage_data = '<a href="each.html?timeline_id=' + value.id + '" class="pb-standalone-dark"><div class="gallery-item"><img src="' + base_url + 'asset/post_images/' + value.directory + '/video001.jpg" alt="' + value.video + '" /></div></a>';

                jQuery('div[id=parapara_mypage_feed]').append(mypage_data);
            });

            $.each(data['mypage_cool_feed'], function (index, value) {
                mypage_data = '<a href="each.html?timeline_id=' + value.id + '" class="pb-standalone-dark"><div class="gallery-item"><img src="' + base_url + 'asset/post_images/' + value.directory + '/video001.jpg" alt="' + value.video + '" /></div></a>';
                jQuery('div[id=parapara_mypage_cool_feed]').append(mypage_data);
            });

            jQuery('span[id=parapara_mypage_name]').html(data.user_info.name);
            jQuery('img[id=parapara_mypage_profile_pic]').attr('src', data.user_info.profile_image);


        }
    });

}

function mypage_tab(value, ob)
{
    if (value == 'mypage_tab')
    {
        jQuery("a[id=parapara_tab_1]").addClass('tabactive');
        jQuery("a[id=parapara_tab_2]").removeClass('tabactive');
        jQuery('div[id=parapara_mypage_feed]').show();
        jQuery('div[id=parapara_mypage_cool_feed]').hide();
    } else if (value == 'mypage_cool_tab')
    {
        jQuery("a[id=parapara_tab_2]").addClass('tabactive');
        jQuery("a[id=parapara_tab_1]").removeClass('tabactive');
        jQuery('div[id=parapara_mypage_cool_feed]').show();
        jQuery('div[id=parapara_mypage_feed]').hide();
    }
}

function get_cool_list(timeline_id)
{
    var cool_data = "";


    //fetch data from server
    myApp.showIndicator();
    jQuery('div[id=parapara_cool_popup]').html("");

    $.ajax({
        url: base_url + "get_cool.php",
        data:
                {
                    timeline_id: timeline_id
                },
        type: "POST",
        success: function (data)
        {
            myApp.hideIndicator();

            data = jQuery.parseJSON(data);

            jQuery('div[id=parapara_cool_popup]').append('<div class="cool_title">' + data['total'] + ' people say cool.</div>');

            //jQuery('div[id=parapara_cool_popup]').append('<ul>');

            $.each(data['cool_list'], function (index, value) {
                cool_data += '<li>'
                        + '<div class="item-content">'
                        + '<div class="item-media"><img src="' + value.profile_image + '" class="coolpeople"/></div>'
                        + '<div class="item-inner">'
                        + '<div class="item-title-row">'
                        + '<div class="cool-guy">' + value.name + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</li>';

                //jQuery('div[id=parapara_cool_popup]').append(cool_data);
            });
            jQuery('div[id=parapara_cool_popup]').append('<ul>' + cool_data + '</ul>');
            //jQuery('div[id=parapara_cool_popup]').append('</ul>');

            //jQuery('li[id=parapara_say_cool_bar]').html('<a href="#" class="item-link list-button" onclick="set_cool(' + timeline_id + ')" ><i class="icon icon-emo-wink statusicon"></i>Say Cool!</a>');

        }
    });
}

function get_comment_list(timeline_id)
{
    var comment_data = "";


    //fetch data from server
    myApp.showIndicator();


    jQuery('div[id=parapara_comment_popup]').html("");
    $.ajax({
        url: base_url + "get_comment.php",
        data:
                {
                    timeline_id: timeline_id
                },
        type: "POST",
        success: function (data)
        {
            myApp.hideIndicator();

            data = jQuery.parseJSON(data);
            $.each(data, function (index, value) {

                comment_data = '<div class="message-name" style="display:block;">' + value.name + '</div><div class="message-text">' + value.comment + '</div><div style="opacity:1;background-image:url(' + value.profile_image + ')" class="message-avatar"></div>';

                jQuery('div[id=parapara_comment_popup]').append('<div class="message message-received message-with-avatar">' + comment_data + '</div>');
            });

            //jQuery('div[id=parapara_leave_comment]').html('<input type="text" placeholder="Enter comments..." name="name" class="" onkeydown="if (event.keyCode == 13) { set_comment(' + timeline_id + ', this.value); this.value = null; }"/>');
            jQuery('div[id=parapara_leave_comment]').html('<textarea id="comment_text_box" placeholder="Message" onkeydown="if (event.keyCode == 13) { set_comment(' + timeline_id + ', this.value); this.value = null; }"></textarea><a href="#" class="link com" onclick="set_comment(' + timeline_id + ', jQuery(\'#comment_text_box\').val()); jQuery(\'#comment_text_box\').val();">Send</a>');

        }
    });
}

function set_comment(timeline_id, comment)
{
    myApp.showIndicator();
    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));

    $.ajax({
        url: base_url + "set_comment.php",
        data:
                {
                    user_id: user_id,
                    timeline_id: timeline_id,
                    comment: comment
                },
        type: "POST",
        success: function (data)
        {
            myApp.hideIndicator();
            data = jQuery.parseJSON(data);
            jQuery("span[id=parapara_count_comment_" + timeline_id + "]").html(data);

            get_comment_list(timeline_id);
        }
    });
}

function get_barabara(timeline_id)
{
    myApp.showPreloader('Fetching all images ...');
    var gallery_data = '';
    jQuery('div[id=parapara_barabara_gallery]').html("");
    var photos = [{}];

    $.ajax({
        url: base_url + "get_barabara.php",
        data:
                {
                    timeline_id: timeline_id,
                },
        type: "POST",
        success: function (data)
        {
            data = jQuery.parseJSON(data);
            $.each(data.file_list, function (index, value) {
                gallery_data = '<a href="#" class="pb-standalone-dark"><div class="gallery-item_bara"><img src="' + base_url + 'asset/post_images/' + data.directory + '/' + value + '" alt="Image 001" /></div></a>';

                jQuery('div[id=parapara_barabara_gallery]').append(gallery_data);
                photos[index - 3] = base_url + 'asset/post_images/' + data.directory + '/' + value;
            });

            $$('.pb-standalone-dark').on('click', function () {
                myPhotoBrowserPopupDark.open();
            });

            var myPhotoBrowserPopupDark = myApp.photoBrowser({
                photos: photos,
                theme: 'dark',
                type: 'popup'
            });

            myApp.hidePreloader();
        }
    });

}

function get_account()
{
    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));

    $.ajax({
        url: base_url + "get_account.php",
        data:
                {
                    user_id: user_id
                },
        type: "POST",
        beforeSend: function (xhr) {
            myApp.showIndicator();
        },
        success: function (data)
        {
            myApp.hideIndicator();

            data = jQuery.parseJSON(data);

            if (data.facebook_id != '0')
            {
                jQuery("a[id=parapara_account_fb]").show();
            }
            else
            {
                jQuery("a[id=parapara_account_tw]").show();
            }

            jQuery("img[id=parapara_account_profile_image]").attr('src', data.profile_image);

            jQuery("input[id=parapara_account_name]").val(data.name);
            jQuery("input[id=parapara_account_email]").val(data.email);

        }
    });
}

function delete_timeline(timeline_id)
{
    myApp.confirm('本当に削除してもいいですか？', "Parapara", function () {
        var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));

        $.ajax({
            url: base_url + "delete_timeline.php",
            data:
                    {
                        user_id: user_id,
                        timeline_id: timeline_id
                    },
            type: "POST",
            beforeSend: function (xhr) {
                myApp.showIndicator();
            },
            success: function (data)
            {
                myApp.hideIndicator();

                if (data == "1")
                {
                    myApp.alert("削除されました。", "Parapara");
                    mainView.router.loadPage("index.html");
                } else
                {
                    myApp.alert("You are not authonticate to delete this video", "Parapara");
                }

            }
        });
    });

}

function get_profile_timeline(profile_id)
{
    var mypage_data = "";
    var user_id = profile_id;

    console.log(profile_id);


    //fetch data from server

    jQuery('div[id=parapara_mypage_feed]').html("");
    jQuery('div[id=parapara_mypage_cool_feed]').html("");
    $.ajax({
        url: base_url + "mypage.php",
        data:
                {
                    user_id: user_id
                },
        type: "POST",
        beforeSend: function (xhr) {
            myApp.showIndicator();
        },
        success: function (data)
        {
            myApp.hideIndicator();

            //console.log(data);
            data = jQuery.parseJSON(data);
            //console.log(data);

            //myApp.alert(data.length);

            $.each(data['mypage_feed'], function (index, value) {
                mypage_data = '<a href="each.html?timeline_id=' + value.id + '" class="pb-standalone-dark"><div class="gallery-item"><img src="' + base_url + 'asset/post_images/' + value.directory + '/video001.jpg" alt="' + value.video + '" /></div></a>';

                jQuery('div[id=parapara_mypage_feed]').append(mypage_data);
            });

            $.each(data['mypage_cool_feed'], function (index, value) {
                mypage_data = '<a href="each.html?timeline_id=' + value.id + '" class="pb-standalone-dark"><div class="gallery-item"><img src="' + base_url + 'asset/post_images/' + value.directory + '/video001.jpg" alt="' + value.video + '" /></div></a>';
                jQuery('div[id=parapara_mypage_cool_feed]').append(mypage_data);
            });

            jQuery('span[id=parapara_mypage_name]').html(data.user_info.name);
            jQuery('img[id=parapara_mypage_profile_pic]').attr('src', data.user_info.profile_image);


        }
    });
}

function get_profile_next_timeline(slider)
{
    console.log(slider);

    var test_data = '';
    var cool_btn = '';
    var i = 0;
    var start = slider.activeSlideIndex;
    var previous = slider.previousSlideIndex;

    var testing_data = '';


    //fetch data from server

    myApp.showIndicator();


    $.ajax({
        url: base_url + "get_profile_next_timeline.php",
        data:
                {
                    user_id: slider.params.params,
                    start: start
                },
        type: "POST",
        success: function (data)
        {
            myApp.hideIndicator();

            //console.log(data);
            data = jQuery.parseJSON(data);
            //console.log(data);

            //myApp.alert(data.length);

            $.each(data, function (index, value) {
                cool_btn = '';
                if (value.cool_user == 0)
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool before" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-thumbsup"></i></a>';
                } else
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-wink"></i></a>';
                }


                testing_data = '<div id="parapara' + i + '" style="position:relative;" class="imgbox">'

                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video001.jpg" style="position:absolute;width:100%;height:auto;" class="photo0 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video002.jpg" style="position:absolute;width:100%;height:auto;" class="photo1 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video003.jpg" style="position:absolute;width:100%;height:auto;" class="photo2 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video004.jpg" style="position:absolute;width:100%;height:auto;" class="photo3 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video005.jpg" style="position:absolute;width:100%;height:auto;" class="photo4 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video006.jpg" style="position:absolute;width:100%;height:auto;" class="photo5 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video007.jpg" style="position:absolute;width:100%;height:auto;" class="photo6 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video008.jpg" style="position:absolute;width:100%;height:auto;" class="photo7 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video009.jpg" style="position:absolute;width:100%;height:auto;" class="photo8 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video010.jpg" style="position:absolute;width:100%;height:auto;" class="photo9 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video011.jpg" style="position:absolute;width:100%;height:auto;" class="photo10 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video012.jpg" style="position:absolute;width:100%;height:auto;" class="photo11 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video013.jpg" style="position:absolute;width:100%;height:auto;" class="photo12 active preload lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video014.jpg" style="position:absolute;width:100%;height:auto;" class="photo13 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video015.jpg" style="position:absolute;width:100%;height:auto;" class="photo14 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video016.jpg" style="position:absolute;width:100%;height:auto;" class="photo15 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video017.jpg" style="position:absolute;width:100%;height:auto;" class="photo16 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video018.jpg" style="position:absolute;width:100%;height:auto;" class="photo17 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video019.jpg" style="position:absolute;width:100%;height:auto;" class="photo18 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video020.jpg" style="position:absolute;width:100%;height:auto;" class="photo19 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video021.jpg" style="position:absolute;width:100%;height:auto;" class="photo20 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video022.jpg" style="position:absolute;width:100%;height:auto;" class="photo21 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video023.jpg" style="position:absolute;width:100%;height:auto;" class="photo22 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video024.jpg" style="position:absolute;width:100%;height:auto;" class="photo23 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video025.jpg" style="position:absolute;width:100%;height:auto;" class="photo24 unactive lazy img" />'


                        + '</div>';


                test_data = '<div class="slider-slide" id="timeline_container_' + i + '">'
                        //+ '<img src="img/sample1.png" class="dispimg">'
                        + testing_data
                        + '<div class="toolbar tabbar bottombar">'
                        + '<div class="toolbar-inner-right">'
                        + '<a href="#" data-popover=".popover-share" class="open-popover tab-link tab-icon share" onclick="share_timeline_id=' + value.id + ';"><i class="icon icon-link-ext"></i></a>'
                        + '<a href="#" data-popup=".comment-popup" class="open-popup tab-link tab-icon comment" onclick="get_comment_list(' + value.id + ');"><i class="icon icon-comment-3"></i></a>'
                        + cool_btn
                        + '</div>'
                        + '<div class="toolbar-inner-left">'
                        + '<a href="profile.html?profile_id=' + value.user_id + '" class="link tab-icon"><span><img src="' + value.profile_image + '" class="usericon"></span></a>'
                        + '<a href="#" class="tab-link tab-icon"><span data-popover=".popover-cool" class="open-popover status-content"><span id="parapara_count_cool_' + value.id + '">' + value.cool_count + '</span><span class="icon icon-emo-wink" onclick="get_cool_list(' + value.id + ');"></span></span></a>'
                        + '<a href="#" class="tab-link tab-icon"><span data-popup=".comment-popup" class="open-popup status-content"><span id="parapara_count_comment_' + value.id + '">' + value.comment_count + '</span><span class="icon icon-comment-3" onclick="get_comment_list(' + value.id + ');"></span></span></a>'
                        + '</div>'
                        + '</div>'
                        + '</div>';

                //alert(test_data);

                jQuery('div[id=timeline_container_' + previous + ']').html("");
                jQuery('div[id=timeline_container_' + start + ']').html(test_data);
                //jQuery('div[id=timeline_container_0]').show();
                i++;
                $("img.lazy").lazyLoadXT();



                //console.log(test_data);
            });
//
//
//            var mySlider = myApp.slider('.slider-container', {
//                speed: 400,
//                direction: 'vertical',
//                onSlideChangeEnd: get_next_timeline
//            });
        }
    });



    $("img.lazy").lazyLoadXT();
}

function set_public()
{
//    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));
//    get_timeline(user_id);
    mainView.router.loadPage("index.html");
}

function get_upload()
{
    myApp.showIndicator();

    var test_data = '';
    var cool_btn = '';
    var i = 0;

    var testing_data = '';

    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));

    jQuery('div[id=parapara_upload_timeline]').html("");


    $.ajax({
        url: base_url + "get_upload.php",
        data:
                {
                    user_id: user_id
                },
        type: "POST",
        success: function (data)
        {
            myApp.hideIndicator();
            //jQuery("div[id=parapara_video_upload_text]").fadeOut();


            data = jQuery.parseJSON(data);
            //console.log(data);

            //myApp.alert(data.length);

            $.each(data, function (index, value) {
                cool_btn = '';
                if (value.cool_user == 0)
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool before" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-thumbsup"></i></a>';
                } else
                {
                    cool_btn = '<a id="parapara_cool_badge_' + value.id + '" href="#" class="tab-link tab-icon cool" onclick="set_cool(' + value.id + ')"><i class="icon icon-emo-wink"></i></a>';
                }


                testing_data = '<div id="parapara' + i + '" style="position:relative;" class="imgbox">'

                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video001.jpg" style="position:absolute;width:100%;height:auto;" class="photo0 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video002.jpg" style="position:absolute;width:100%;height:auto;" class="photo1 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video003.jpg" style="position:absolute;width:100%;height:auto;" class="photo2 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video004.jpg" style="position:absolute;width:100%;height:auto;" class="photo3 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video005.jpg" style="position:absolute;width:100%;height:auto;" class="photo4 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video006.jpg" style="position:absolute;width:100%;height:auto;" class="photo5 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video007.jpg" style="position:absolute;width:100%;height:auto;" class="photo6 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video008.jpg" style="position:absolute;width:100%;height:auto;" class="photo7 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video009.jpg" style="position:absolute;width:100%;height:auto;" class="photo8 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video010.jpg" style="position:absolute;width:100%;height:auto;" class="photo9 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video011.jpg" style="position:absolute;width:100%;height:auto;" class="photo10 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video012.jpg" style="position:absolute;width:100%;height:auto;" class="photo11 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video013.jpg" style="position:absolute;width:100%;height:auto;" class="photo12 active preload lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video014.jpg" style="position:absolute;width:100%;height:auto;" class="photo13 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video015.jpg" style="position:absolute;width:100%;height:auto;" class="photo14 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video016.jpg" style="position:absolute;width:100%;height:auto;" class="photo15 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video017.jpg" style="position:absolute;width:100%;height:auto;" class="photo16 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video018.jpg" style="position:absolute;width:100%;height:auto;" class="photo17 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video019.jpg" style="position:absolute;width:100%;height:auto;" class="photo18 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video020.jpg" style="position:absolute;width:100%;height:auto;" class="photo19 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video021.jpg" style="position:absolute;width:100%;height:auto;" class="photo20 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video022.jpg" style="position:absolute;width:100%;height:auto;" class="photo21 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video023.jpg" style="position:absolute;width:100%;height:auto;" class="photo22 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video024.jpg" style="position:absolute;width:100%;height:auto;" class="photo23 unactive lazy img" />'
                        + '<img data-src="' + base_url + 'asset/post_images/' + value.directory + '/video025.jpg" style="position:absolute;width:100%;height:auto;" class="photo24 unactive lazy img" />'


                        + '</div>';


                if (i == 0)
                {

                    test_data = '<div class="slider-slide" id="timeline_container_' + i + '">'
                            //+ '<img src="img/sample1.png" class="dispimg">'
                            + testing_data
                            + '<div class="toolbar tabbar bottombar">'
                            + '<div class="row">'
                            + '<div class="col-50">'
                            + '<a href="#" class="button button-big button-fill color-red" onclick="delete_last();" style="border-radius:4px 0px 0px 0px;background: rgba(219, 10, 91,1);">キャンセル</a>'
                            + '</div>'
                            + '<div class="col-50">'
                            + '<a href="#" class="button button-big button-fill color-green" onclick="set_public();" style="border-radius:0px 4px 0px 0px;background: rgba(52, 152, 219,1);">投稿する</a>'
                            + '</div>'
                            + '</div>'
                            + '</div>';
                }
                else
                {
                    test_data = '<div id="timeline_container_' + i + '" class="slider-slide" style="position:relative;"></div>';
                }

                jQuery('div[id=parapara_upload_timeline]').append(test_data);
                $("img.lazy").lazyLoadXT();
                i++;

                //console.log(test_data);
            });

        }
    });

    //myApp.hideIndicator();
}

function delete_last()
{
    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));

    $.ajax({
        url: base_url + "delete_last.php",
        data:
                {
                    user_id: user_id
                },
        type: "POST",
        beforeSend: function (xhr) {
            myApp.showIndicator();
        },
        success: function (data)
        {
            myApp.hideIndicator();
            mainView.router.loadPage("index.html");
        }
    });
}

/**
 * define all functions END
 */

/**
 * define all pages START
 */

jQuery(document).on('pageInit', '.page[data-page="index"]', function (e) {
    var user_id = JSON.parse(localStorage.getItem("parapara_user_id"));

    console.log(user_id);

    get_timeline(user_id);
});

jQuery(document).on('pageInit', '.page[data-page="barabara"]', function (e) {

    var timeline_id = e.currentTarget.f7PageData.query.timeline_id;
    //myApp.alert(timeline_id);

    get_barabara(timeline_id);

});


jQuery(document).on('pageInit', '.page[data-page="mypage"]', function (e) {
    get_mypage();
});

jQuery(document).on('pageInit', '.page[data-page="each"]', function (e) {
    var timeline_id = e.currentTarget.f7PageData.query.timeline_id;
    get_each(timeline_id);
});

jQuery(document).on('pageInit', '.page[data-page="account"]', function (e) {
    get_account();
});

jQuery(document).on('pageInit', '.page[data-page="profile"]', function (e) {
    var profile_id = e.currentTarget.f7PageData.query.profile_id;
    get_profile_timeline(profile_id);
});

jQuery(document).on('pageInit', '.page[data-page="upload"]', function (e) {
    //load content in upload page
    get_upload();
});

/**
 * define all pages END
 */
