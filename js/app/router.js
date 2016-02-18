
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: './js/app/home/view.home.html',
        controller: 'HomeCtrl'
      }).
      when('/articles', {
        templateUrl: './js/app/articles/view.articles.html',
        controller: 'ArticlesCtrl'
      }).
      when('/articles/:category', {
        templateUrl: './js/app/articles/view.articles.html',
        controller: 'ArticlesCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]
);