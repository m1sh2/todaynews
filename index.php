<?php
session_start();
?>

<!DOCTYPE html>
<html ng-app="INFA">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <base href="/">
  <title>IN|FA</title>
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


<!--     
  
  
  
  <script src="https://code.angularjs.org/2.0.0-alpha.50/angular2.min.js"></script> -->
  

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-74505552-1', 'auto');
    ga('send', 'pageview');

  </script>
</head>
<body>
<div class="container" ng-controller="MainCtrl as main">
  <header>
    <a href="/" class="logo">IN <span>FA</span></a>
    <div class="menu-top">
      <a href="/about">О сервисе</a>
      <a href="javascript:void(0)" ng-click="main.loginDropdown = !main.loginDropdown" class="dropdown-link">Войти</a>
      <div class="dropdown dropdown-menu-top" ng-show="main.loginDropdown">
        <h4>Login</h4>
        <h5 ng-show="!!main.user">{{main.user}}</h5>
        <div ng-show="!main.user">
        <a href="#" ng-click="main.loginDropdown = !main.loginDropdown;runLogin()">Login</a>
        </div>
        <div ng-show="!!main.user">
        <a href="#" ng-click="main.loginDropdown = !main.loginDropdown;main.runLogout()">Logout</a>
        </div>
        <a href="/admin" ng-click="main.loginDropdown = !main.loginDropdown">Admin</a>
        <div>
        <a href="/signup" ng-click="main.loginDropdown = !main.loginDropdown">Signup</a>
        </div>
      </div>
    </div>
    <div id="categories" ng-controller="CategoriesCtrl as cats">
      <a href="{{category.url}}" ng-repeat="category in cats.categories">{{category.title}}</a>
    </div>
  </header>
  <div class="content">
    <div class="drow">
      <div class="dcol11">
        <div class="bredcrumbs"></div>
        <div class="page {{ pageClass }}" ng-view></div>
      </div>
    </div>
  </div>
  <footer>
    &copy; IN|FA, 2016
  </footer>
</div>
</body>
</html>