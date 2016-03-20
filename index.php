<?php
session_start();
?><!DOCTYPE html>
<html ng-app="INFA">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <base href="/">
  <title>IN-FA</title>
  <link href="images/favicon.png" rel="icon">
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
</head>
<body>
<div class="container" ng-controller="MainCtrl as main">
  <header>
    <div class="banner-top" ng-if="main.banners.top" ng-bind-html="main.banners.top.image" ng-click="main.bannerClick('top')"></div>
    <div id="categories" ng-controller="CategoriesCtrl as cats">
      <a href="/" class="logo" ng-click="main.cat = ''">IN <span>FA</span></a>
      <a href="{{category.url}}" ng-class="{'active' : main.cat == category.url}" ng-repeat="category in cats.categories" ng-click="main.cat = category.url">{{category.title}}</a>
    </div>
  </header>
  <div class="content">
    <div class="page {{ pageClass }}" ng-view></div>
    <div class="banner-bottom" ng-if="main.banners.bottom" ng-bind-html="main.banners.bottom.image" ng-click="main.bannerClick('bottom')"></div>
  </div>
  <footer>
    <div class="menu">
      <a href="/about">О сервисе</a>
      <a href="/terms">Условия использования</a>
      <a href="/adv">Реклама</a>
      <a href="/contacts">Контакты</a>
      <div class="logo">
        <img src="/images/infa-logo-grey-32.png"> IN FA
      </div>
    </div>
    <div class="copyright">
      &copy;2016 IN-FA. Все материалы сайта защищены авторским правом. При ссылке на материал (статью) или группу материалов (категорию, группу статей) ссылка на http://infa.co.ua обязательна. Ссылка должна быть индексируема поисковыми системами и кликабельна. Усли вы нашли ошибку в материале (статье), сообщите нам об этом любым из способов, указанных в разделе "<a href="/contacts">Контакты</a>".
    </div>
  </footer>
</div>
</body>
</html>

