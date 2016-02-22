
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: './js/app/home/home.view.html',
        controller: 'HomeCtrl'
      }).
      // when('/articles', {
      //   templateUrl: './js/app/articles/articles.view.html',
      //   controller: 'ArticlesCtrl'
      // }).
      // when('/articles/:category', {
      //   templateUrl: './js/app/articles/articles.view.html',
      //   controller: 'ArticlesCtrl'
      // }).
      when('/admin', {
        templateUrl: './js/app/admin/admin.view.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      }).
      when('/login', {
        templateUrl: './js/app/login/login.view.html',
        controller: 'LoginCtrl'
      }).
      when('/signup', {
        templateUrl: './js/app/signup/signup.view.html',
        controller: 'SignupCtrl'
      }).
      when('/:category', {
        templateUrl: './js/app/articles/articles.view.html',
        controller: 'ArticlesCtrl'
      }).
      when('/:category/:article', {
        templateUrl: './js/app/articles/articles.view.html',
        controller: 'ArticlesCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });

    

    $locationProvider.html5Mode(true);
  }]
);

app.run(function($rootScope) {
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    //..do something
    //event.stopPropagation();  //if you don't want event to bubble up 
    console.info('chaged');
  });
});