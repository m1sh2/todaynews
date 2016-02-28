
app.controller('MainCtrl', ['$scope', '$http', '$route', '$location', MainCtrl]);

function MainCtrl($scope, $http, $route, $location) {
  $scope.title = '2323sdsd';
  var main = this;
  var code = null;
  main._location = $location;
  // console.info($route);
  main.loginDropdown = false;
  main.user = false;
  $http.get('api.php?act=getUser').then(function(result) {
    // console.info(result.data);

    // $scope.categories = result.data;
  });

  main.email = '';
  main.password = '';
  code = localStorage.getItem('code');
  if (code !== null && typeof code !== 'undefined' && code.length === 64) {
    main.user = true;
  //   $location.path("/admin");
  } else {
  //   main.user = null;
  //   displayLogin();
  }
  
  // $http.get('api.php?act=getCategories').success(function(data) {
  //   console.info(data);

  //   $scope.user = data;
  // });
  function displayLogin() {
    // console.assert('main');
  }

  main.btn = '';
  main.error = '';
  main.runLogin = function() {
    main.btn = 'disabled';
    $http.post('api.php?act=runLogin&data=' + Base64.encode(JSON.stringify({
      email: main.email,
      password: main.password
    }))).then(function(result) {
      // console.info(result.data);
      if (!result.data.error) {
        localStorage.setItem('code', result.data.code);
        main.user = result.data.user;
        $location.path("/admin");
      } else {
        main.error = 'Ошибка. Проверьте email/пароль';
      }
      // cats.categories = result.data;
      
    });
    
    // $scope.$apply();
  }

  main.runLogout = function(argument) {
    localStorage.removeItem('code');
    window.location = "/";
  }
}
