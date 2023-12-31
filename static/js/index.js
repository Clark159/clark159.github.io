/**
 * 页面ready方法
 */
$(document).ready(function() {

    categoryDisplay();
    generateContent();
    backToTop();
    fixFooterInit();
});


/**
 * 固定底栏的初始化方法
 * 在一开始载入页面时，使用fixFooter()方法固定底栏。
 * 在浏览器窗口改变大小是，依然固定底栏
 * @return {[type]} [description]
 */
function fixFooterInit() {
    var footerHeight = $('footer').outerHeight();
    var footerMarginTop = getFooterMarginTop() - 0; 
    fixFooter(footerHeight, footerMarginTop);

    $(window).resize(function() { //when resize window, footer can auto get the postion
        fixFooter(footerHeight, footerMarginTop);
    });
}

/**
 * 固定底栏
 * @param  {number} footerHeight    底栏高度
 * @param  {number} footerMarginTop 底栏MarginTop
 * @return {[type]}                 [description]
 */
function fixFooter(footerHeight, footerMarginTop) {
    var windowHeight = $(window).height();
    var contentHeight = $('body>.container').outerHeight() + $('body>.container').offset().top + footerHeight + footerMarginTop;
    // console.log("window---"+windowHeight);
    // console.log("$('body>.container').outerHeight()---"+$('body>.container').outerHeight() );
    // console.log("$('body>.container').height()---"+$('body>.container').height() );
    // console.log("$('#main').height()--------"+$('#main').height());
    // console.log("$('body').height()--------"+$('body').height());
    //console.log("$('#main').html()--------"+$('#main').html());
    // console.log("$('body>.container').offset().top----"+$('body>.container').offset().top);
    // console.log("footerHeight---"+footerHeight);
    // console.log("footerMarginTop---"+footerMarginTop);
    console.log(contentHeight);
    if (contentHeight < windowHeight) {
        $('footer').addClass('navbar-fixed-bottom');
    } else {
        $('footer').removeClass('navbar-fixed-bottom');
    }

    $('footer').show(400);
}

/**
 * 使用正则表达式得到底栏的MarginTop
 * @return {string} 底栏的MarginTop
 */
function getFooterMarginTop() {
    var margintop = $('footer').css('marginTop');
    var patt = new RegExp("[0-9]*");
    var re = patt.exec(margintop);
    // console.log(re[0]);
    return re[0];
}

/**
 * 分类展示
 * 点击右侧的分类展示时
 * 左侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function categoryDisplay() {

    /*Show Default*/
    $('.post-list-item').hide();  
    $('.post-list-item:lt(20)').show();  

    /*Show Category*/
    $('.categories-list-item').click(function() {

        var cate = $(this).attr('cate');
        if (cate !== undefined) {
            if(cate == 'All') {
                $('.post-list-header').html(cate);
                $('.post-list-body').hide();         
                $('.post-list-item').hide(); 
                $('.post-list-item').show();  
                $('.post-list-body').show(400); 
            } 
            else {
                $('.post-list-header').html(cate);
                $('.post-list-body').hide();         
                $('.post-list-item').hide(); 
                $('.post-list-item[post-cate =\"' + cate + '\"]').show();  
                $('.post-list-body').show(400); 
            }            
        }

        var arch = $(this).attr('arch');
        if (arch !== undefined) {  
            $('.post-list-header').html(arch);
            $('.post-list-body').hide();          
            $('.post-list-item').hide();  
            $('.post-list-item[post-arch =\"' + arch + '\"]').show();
            $('.post-list-body').show(400);  
        }
    });
}

/**
 * 回到顶部
 */
function backToTop() {
    //滚页面才显示返回顶部
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $("#top").fadeIn(500);
        } else {
            $("#top").fadeOut(500);
        }
    });
    //点击回到顶部
    $("#top").click(function() {
        $("body").animate({
            scrollTop: "0"
        }, 500);
    });

    //初始化tip
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
}


/**
 * 侧边目录
 */
function generateContent() {

    // console.log($('#markdown-toc').html());
    if (typeof $('#markdown-toc').html() === 'undefined') {
        // $('#content .content-text').html('<ul><li>文本较短，暂无目录</li></ul>');
        $('#content').hide();
        $('#myArticle').removeClass('col-sm-9').addClass('col-sm-12');
    } else {
        $('#content .content-text').html('<ul>' + $('#markdown-toc').html() + '</ul>');
        /*   //数据加载完成后，加固定边栏
        $('#myAffix').attr({
            'data-spy': 'affix',
            'data-offset': '50'
        });*/
    }
    console.log("myAffix!!!");
}