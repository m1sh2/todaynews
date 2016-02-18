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
  <script src="./js/app/home/ctrl.home.js"></script>
  <script src="./js/app/articles/ctrl.articles.js"></script>
  <script src="./js/app/ctrls/ctrl.main.js"></script>
  


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
<div class="container">
  <header>
    <a href="/" class="logo">TODAY <span>NEWS</span></a>

  </header>
  <div class="content">
    <div class="drow">
      <div class="dcol34">
        <div class="page {{ pageClass }}" ng-view></div>
      </div>
      <div class="dcol14">
        <right></right>
      </div>
    </div>
  </div>
  <footer>
    &copy; Today News, 2016
  </footer>
</div>
</body>
</html>