<!DOCTYPE html>
<html ng-app="TodayNews">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <base href="/">
  <title>Today News</title>
  <link rel="stylesheet" href="styles/style.css" type="text/css" />
  <link rel="stylesheet" href="styles/grid.css" type="text/css" />
  <link rel="stylesheet" href="styles/icons.css" type="text/css" />
  <link rel="stylesheet" href="styles/main.css" type="text/css" />

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
</head>
<body>
<div class="container" ng-controller="MainCtrl as main">
  <header>
    <a href="/" class="logo">TODAY <span>NEWS</span></a>
    <div class="menu-top">
      <a href="/about">О сервисе</a>
      <a href="javascript:void(0)" ng-click="main.loginDropdown = !main.loginDropdown" class="dropdown-link">Войти</a>
      <div class="dropdown dropdown-menu-top" ng-show="main.loginDropdown">
        <h1>Login {{user}}</h1>
        <button ng-click="main.loginDropdown = !main.loginDropdown;runLogin()" class="btn">Login</button>
        <button ng-click="main.loginDropdown = !main.loginDropdown;main.runLogout()" class="btn">Logout</button>
        <a href="/signup" ng-click="main.loginDropdown = !main.loginDropdown" class="btn">Signup</a>
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
    &copy; Today News, 2016
  </footer>
</div>
</body>
</html>