(function(){
    var e,t;
    e=function(){
        function e(e,t){
            var n,r;
            this.options={
                target:"ody",
                get:"popular",
                resolution:"thumbnail",
                sortBy:"none",
                links:!0,
                mock:!1,
                useHttp:!1
            };
            if(typeof e=="object")
                for(n in e)r=e[n],
                    this.options[n]=r;
            this.context=t!=null?t:this,
                this.unique=this._genKey()
        }
        return e.prototype.hasNext=function(){
            return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0
        },
            e.prototype.next=function(){
                return this.hasNext()?this.run(this.context.nextUrl):!1
            }
            ,e.prototype.run=function(t){
            var n,r,i;
            if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");
            if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");
            return this.options.before!=null&&typeof
                this.options.before=="function"&&this.options.before.call(this),
            typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),
                i.id="ody-fetcher",
                i.src=t||this._buildUrl(),
                n=document.getElementsByTagName("head"),
                n[0].appendChild(i),
                r="odyCache"+this.unique,
                window[r]=new e(this.options,this),
                window[r].unique=this.unique),!0
        },
            e.prototype.parse=function(e){
                var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S;
                if(typeof e!="object"){
                    if(this.options.error!=null&&typeof
                            this.options.error=="function")
                        return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?d=["","random"]:d=this.options.sortBy.split("-"),p=d[0]==="least"?!0:!1;switch(d[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",p);break;case"liked":e.data=this._sortBy(e.data,"likes.count",p);break;case"commented":e.data=this._sortBy(e.data,"comments.count",p);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){a=e.data,this.options.limit!=null&&a.length>this.options.limit&&(a=a.slice(0,this.options.limit+1||9e9)),n=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(a=this._filter(a,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){i="",o="",l="",v=document.createElement("div");for(m=0,b=a.length;m<b;m++)s=a[m],u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),o=this._makeTemplate(this.options.template,{model:s,id:s.id,link:s.link,image:u,caption:this._getObjectProperty(s,"caption.text"),likes:s.likes.count,comments:s.comments.count,location:this._getObjectProperty(s,"location.name")}),i+=o;v.innerHTML=i,S=[].slice.call(v.childNodes);for(g=0,w=S.length;g<w;g++)h=S[g],n.appendChild(h)}else for(y=0,E=a.length;y<E;y++)s=a[y],f=document.createElement("img"),u=s.images[this.options.resolution].url,this.options.useHttp||(u=u.replace("http://","//")),f.src=u,this.options.links===!0?(t=document.createElement("a"),t.href=s.link,t.appendChild(f),n.appendChild(t)):n.appendChild(f);document.getElementById(this.options.target).appendChild(n),r=document.getElementsByTagName("head")[0],r.removeChild(document.getElementById("ody-fetcher")),c="odyCache"+this.unique,window[c]=void 0;try{delete window[c]}catch(x){}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(typeof this.options.tagName!="string")throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(typeof this.options.locationId!="number")throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(typeof this.options.userId!="number")throw new Error("No user specified. Use the 'userId' option.");if(typeof this.options.accessToken!="string")throw new Error("No access token. Use the 'accessToken' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=""+e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=odyCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))i=n.match(r)[1],s=(o=this._getObjectProperty(t,i))!=null?o:"",n=n.replace(r,""+s);return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],i=function(e){if(t(e))return n.push(e)};for(s=0,o=e.length;s<o;s++)r=e[s],i(r);return n},e}(),t=typeof exports!="undefined"&&exports!==null?exports:window,t.ody=e}).call(this);

var feed=new ody({
    get:"user",
    limit:20,
    resolution:"standard_resolution",
    template:
    '<li class="col-lg-3 col-md-3 img_insta" >' +
    '<a href="{{link}}" target="_blank" style="background-image:url({{image}});background-size: cover;">' +
    '<img class="insta_img" src="https://lh3.googleusercontent.com/-P-gOTAfNfZ4/V2RPSYvECxI/AAAAAAAABng/Efqy2Oxjqm4lrmDhT07PBtlgYRb_MlJ7QCCo/s100/questyerror.png"> </img>' +

    '</li>',
    userId:1936041288,
    accessToken:"1936041288.1677ed0.f2bb02d24fdb4f8aab7045b5dc33be9a"
});feed.run();

$(window).scroll(function () {
    var st = $(this).scrollTop();
    var bo = $(this).scrollTop();
    if ( bo > 700 ) {
        $("nav").css("display", "block");
    } else {
        $("nav").css("display", "none");
    };


    console.log(st);
    $(".logo_img").css({
        "transform" : "translate(0%, "+ st/4 + "%"
    });

    $(".sect_2 img").css({
        "transform" : "translate(0%, "+ st/50 + "%"
    });
    
    $(".sect_3 img").css({
        "transform" : "translate(0%, -"+ st/80 + "%"
    });
    $(".sect_4").css({
        "transform" : "translate(0%, -"+ st/80 + "%"
    });
    $(".sect_").css({
        "transform" : "translate(0%, -"+ st/80 + "%"
    });
});

/*
 * jQuery liLanding v 2.1
 *
 * Copyright 2013, Linnik Yura | LI MASS CODE | http://masscode.ru
 * Free to use
 *
 * Last Update: 19.06.2016
 */
(function ($) {
    var methods = {
        init: function (options) {
            var p = {
                show: function (linkEl, landingItem) {},
                hide: function (linkEl, landingItem) {},
                topMargin: 0,
                speedFactor: 1
            };
            if (options) {
                $.extend(p, options);
            }
            return this.each(function () {
                var el = $(this);
                var elPos = el.offset().top;
                var wHalf = $(window).height()/2
                var scrollId = function(){};

                //assign events only links with anchors
                $('a[href^=#]',el).on('click',function(){
                    var linkItem = $(this);
                    if(!linkItem.is('.cur')){
                        var linkHref = linkItem.attr('href');
                        var linkTarget = $(linkHref);
                        var linkTargetPos = linkTarget.offset().top;
                        var windowPos = $(window).scrollTop();
                        var animDuration = linkTargetPos - windowPos
                        if(animDuration < 0){
                            animDuration = animDuration*-1
                        }
                        //scroll the page to the desired block
                        if(linkTarget.length){
                            $('html, body').stop(true).animate({scrollTop:(linkTargetPos-parseFloat(p.topMargin))},animDuration*p.speedFactor,function(){
                                $(window).trigger('scroll');
                            });
                        }
                    }
                    return false;
                })
                //stop the animation by scrolling
                var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
                if (document.attachEvent) //if IE (and Opera depending on user setting)
                    document.attachEvent("on"+mousewheelevt, function(e){
                        $('html, body').stop(true);
                    });
                else if (document.addEventListener) //WC3 browsers
                    document.addEventListener(mousewheelevt, function(e){
                        //e.detail //direction
                        $('html, body').stop(true);
                    }, false)
                //highlight the desired link in the menu by scrolling
                $(window).on('scroll',function(e){
                    clearTimeout(scrollId);
                    var windowPos = $(window).scrollTop();
                    if(windowPos > elPos){
                        el.addClass('landingFix');
                    }else{
                        el.removeClass('landingFix');
                    }
                    scrollId = setTimeout(function(){
                        $('.landingItem').each(function(){
                            var landingItem = $(this);
                            var landingItemHeight = landingItem.height();
                            var landingItemTop = landingItem.offset().top - wHalf;
                            var linkHref = landingItem.attr('id');
                            var linkEl = $('a[href="#'+linkHref+'"]',el);
                            var status;

                            if(windowPos > landingItemTop && windowPos < (landingItemTop + landingItemHeight)){
                                if(!linkEl.is('.cur')){
                                    linkEl.addClass('cur');
                                    if (p.show !== undefined) {
                                        p.show(linkEl, landingItem);
                                    }
                                }
                            }else{
                                if(linkEl.is('.cur')){
                                    linkEl.removeClass('cur');
                                    if (p.hide !== undefined) {
                                        p.hide(linkEl, landingItem);
                                    }
                                }
                            }
                        });
                    },100);
                })
                $(window).trigger('scroll');
            });
        }
    };
    $.fn.liLanding = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод ' + method + ' в jQuery.liLanding не существует');
        }
    };
})(jQuery);

//Инициализация плагина
$(window).load(function(){
    $('.landingNav').liLanding({
        topMargin:60
    });
})