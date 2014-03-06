/**
 * jQuery.SimpleShareButton
 * @author biggates
 */
 
;(function($){
    var defaultOptions = {
        imageBase : './images/',
        handlers : {
            sina : {
                name : '新浪微博',
                image : 'sina.png',
                func : function(text){
                    var appKey = '2992571369';
                    window.open('http://v.t.sina.com.cn/share/share.php?source=bookmark&appkey=' + appKey + '&url=' + encodeURIComponent(document.location) + '&title=' + text);
                }
            },
            renren : {
                name : '人人',
                image : 'renren.png',
                func : function(text){
                    (function(s,d,e){
                        if(/renren\.com/.test(d.location))return;
                        var f='http://share.renren.com/share/buttonshare?link=',u=d.location,l=d.title,p=[e(u),'&title=',e(l)].join(''),a=function(){
                            if(!window.open([f,p].join(''),'xnshare',['toolbar=0,status=0,resizable=1,width=626,height=436,left=',(s.width-626)/2,',top=',(s.height-436)/2].join('')))u.href=[f,p].join('');
                        };
                        if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else a();}
                    )(screen,document,encodeURIComponent);
                }
            },
            t_qq : {
                name : '腾讯微博',
                image : 't.qq.png',
                func : function(text){
                    var _url = encodeURIComponent(document.location);
                    var _site = document.location; //你的网站地址
                    var _u = 'http://v.t.qq.com/share/share.php?title='+text+'&url='+_url+'&site='+_site;
                    window.open( _u,'', 'width=700, height=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
                }
            },
            douban : {
                name : '豆瓣',
                image : 'douban.png',
                func : function(text){
                    var d=document,e=encodeURIComponent,s1=window.getSelection,s2=d.getSelection,s3=d.selection,s=s1?s1():s2?s2():s3?s3.createRange().text:'',r='http://www.douban.com/recommend/?url='+e(d.location.href)+'&title='+e(d.title)+'&sel='+e(s)+'&v=1',x=function(){if(!window.open(r,'douban','toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330'))location.href=r+'&r=1'};
                    if(/Firefox/.test(navigator.userAgent)){setTimeout(x,0)}else{x()}
                }
            },
            zone_qq : {
                name : 'QQ 空间',
                image : 'qz_logo.png',
                func : function(text){
                    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(document.location.href));
                }
            },
            friends_qq : {
                name : '朋友社区',
                image : 'xy-icon.png',
                func : function(text){
                    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url='+encodeURIComponent(document.location.href));
                }
            },
            twitter : {
                name : 'Twitter',
                image : 'twitter.png',
                func : function(text){
                    window.open('http://twitter.com/share?text=' + text);
                }
            }
        }
    };
    $.fn.shareButton = function(settings){
        var options = $.extend(true, defaultOptions, settings);
        var getHandler = function(index){
            var handler = options.handlers[index];
            return function(){
                var _t = encodeURI(document.title);
                var _url = encodeURIComponent(document.location);
                var text = document.title;
                var textEnc = encodeURI(text);
                // 处理一句话
                handler.func(textEnc);
            };
        };
        return this.each(function(){
            var data = options.handlers;
            for(name in data){
                $(this).append(
                    $('<a>').attr({
                        href : 'javascript:void(0);',
                        title : '分享到' + data[name].name
                    }).click(getHandler(name)).append(
                        $('<img>').attr('src', options.imageBase + data[name].image)
                    )
                );
            }
        });
    };
} )(jQuery);

