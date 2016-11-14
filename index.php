<?php
session_start();
?><!DOCTYPE html>
<html ng-app="INFA">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <base href="/">
  <title>IN-FA</title>
  <link href="images/favicon.ico" rel="icon">
  <link rel="stylesheet" href="styles/style.css" type="text/css" />
  <link rel="stylesheet" href="styles/grid.css" type="text/css" />
  <link rel="stylesheet" href="styles/icons.css" type="text/css" />
  <link rel="stylesheet" href="styles/main.css" type="text/css" />

  <!-- Config -->
  <script type="text/javascript">
    var lang = 'ru';
  </script>

  <!-- <script src="angular2/bundles/angular2-polyfills.min.js"></script> -->
  <!-- <script src="js/libs/es6-shim.min.js"></script> -->
  <!-- <script src="js/libs/system.js"></script> -->
  <!-- <script src="js/config.js"></script> -->
  <!-- <script src="js/libs/typescript.js"></script> -->
  <!-- <script src="js/libs/traceur-runtime.js"></script> -->
  <!-- <script src="js/libs/system-polyfills.js"></script> -->
  <!-- <script src="js/libs/system.src.js"></script> -->
  <!-- <script src="js/libs/angular2.min.js"></script> -->
  <!-- <script src="angular2/bundles/angular2.min.js"></script> -->
  <!-- <script src="https://code.angularjs.org/2.0.0-beta.6/angular2.min.js"></script> -->
  <!-- <script src="js/libs/Rx.js"></script> -->

  <!-- Libs -->
  <script src="./js/libs/jquery-2.1.1.min.js"></script>
  <script src="./js/libs/angular.min.js"></script>
  <script src="./js/libs/angular-route.min.js"></script>
  <script src="./js/libs/angular-sanitize.min.js"></script>
  <script src="./js/libs/angular-google-analytics.min.js"></script>
  <script src="./js/libs/ckeditor/ckeditor.js"></script>
  <script src="./js/libs/base64.js"></script>
  <script src="./js/libs/preload.js"></script>
  <script src="./js/_txt.js"></script>

  <!-- App -->
  <script src="./js/app/config.js"></script>
  <script src="./js/app/router.js"></script>
  <script src="./js/app/controllers/main.controller.js"></script>
  <script src="./js/app/controllers/categories.controller.js"></script>
  <script src="./js/app/directives/breadcrumbs.directive.js"></script>

  <!-- App modules -->
  <script src="./js/app/home/home.controller.js"></script>
  <script src="./js/app/articles/articles.controller.js"></script>
  <script src="./js/app/article/article.controller.js"></script>
  <script src="./js/app/article/article-single.controller.js"></script>
  <script src="./js/app/admin/admin.controller.js"></script>
  <script src="./js/app/login/login.controller.js"></script>
  <script src="./js/app/signup/signup.controller.js"></script>

  <!-- Services -->
  <script src="./js/app/services/xhr.srv.js"></script>



  <!-- 2. Configure SystemJS -->

  <script>
    // System.config({
    //   packages: {
    //     app: {
    //       format: 'register'
    //       // main: './main.ts'
    //       // defaultExtension: 'ts'
    //     }
    //   }
    // });
    // System.import('js/app/main.ts')
    //       .then(null, console.error.bind(console));
  </script>
  <script>
    // System.import('app')
    //   .catch(console.error.bind(console));
  </script>

  <!-- Facebook Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '575519845944935');
    fbq('track', "PageView");
  </script>
  <!-- End Facebook Pixel Code -->
</head>
<body>
<div class="container" ng-controller="MainCtrl as main">
  <header ng-if="!main.admin">
	
	<div class="banner-top">
	<!-- Ukrainian Banner Network 728x90 START -->
	<center><script type='text/javascript' id="banner_top">
	var _ubn=_ubn||{sid:Math.round((Math.random()*10000000)),data:[]};
	(function(){var n=document.getElementById('banner_top');
	_ubn.data.push({user: 110966, format_id: 42, page: 1,
	pid: Math.round((Math.random()*10000000)),placeholder: n});
	if(!_ubn.code)(function() {var script = document.createElement('script'); 
	script.type = 'text/javascript'; _ubn.code= script.async = script.defer = true;
	script.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'banner.kiev.ua/j/banner.js?'+_ubn.sid;
	n.parentNode.insertBefore(script,n);})();})();
	</script></center>
	<!-- Ukrainian Banner Network 728x90 END -->
	</div>

	<div class="banner-top" ng-if="main.bannersTop.length > 0" ng-repeat="bannerTop in main.bannersTop" ng-bind-html="bannerTop.image" ng-click="main.bannerClick(bannerTop.id, bannerTop.link)"></div>
	
    <div id="categories" ng-controller="CategoriesCtrl as cats">
      <a href="/" class="logo" ng-click="main.cat = ''">IN <span>FA</span></a>
      <a href="{{category.url}}" ng-class="{'active' : main.cat == category.url}" ng-repeat="category in cats.categories" ng-click="main.cat = category.url">{{category.title}}</a>
    </div>
  </header>
  <div class="content">
    <div class="content-main" ng-class="{'content-main-right': !main.admin && main.bannersRight.length > 0}">
      <div class="page {{ pageClass }}" ng-view></div>
    </div>
    <div class="content-right" ng-if="!main.admin && main.bannersRight.length > 0">
      <div class="banner-right" ng-if="main.bannersRight.length > 0" ng-repeat="bannerRight in main.bannersRight" ng-bind-html="bannerRight.image" ng-click="main.bannerClick(bannerRight.id, bannerRight.link)"></div>
    </div>
  </div>
  <div class="banner-bottom" ng-if="main.bannersBottom.length > 0 && !main.admin" ng-repeat="bannerBottom in main.bannersBottom" ng-bind-html="bannerBottom.image" ng-click="main.bannerClick(bannerBottom.id, bannerBottom.link)"></div>
  <div class="banner-bottom">
    <div id="disqus_thread"></div>
<script>

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
/*
var disqus_config = function () {
this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = '//mytest01.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
  </div>
  <footer>
    <div class="menu">
      <a href="/about">О сервисе</a>
      <a href="/terms">Условия использования</a>
      <a href="/adv">Реклама</a>
      <a href="/contacts">Контакты</a>
      <div class="logo">
        <img src="/images/infa-logofull-grey-40.png">
      </div>
    </div>
    <div class="copyright">
      &copy;2016 IN-FA. Все материалы сайта защищены авторским правом. При ссылке на материал (статью) или группу материалов (категорию, группу статей) ссылка на http://infa.co.ua обязательна. Ссылка должна быть индексируема поисковыми системами и кликабельна. Усли вы нашли ошибку в материале (статье), сообщите нам об этом любым из способов, указанных в разделе "<a href="/contacts">Контакты</a>".
    </div>
  </footer>
</div>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=575519845944935&ev=PageView&noscript=1"
/></noscript>
	<script id="dsq-count-scr" src="//mytest01.disqus.com/count.js" async></script>
</body>
</html>