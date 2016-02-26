'use strict';

app.controller('SignupCtrl', [
  '$scope', '$http', '$routeParams', '$sce', '$location',
  function($scope, $http, $routeParams, $sce, $location) {
    console.info(1234, $routeParams.category);
    var code = null;
    var signup = this;
    code = localStorage.getItem('code');
    if (code !== null && typeof code !== 'undefined' && code.length === 64) {
      $scope.user = code;
      $location.path("/admin");
    } else {
      $scope.user = null;
      displayLogin();
    }
    
    
    function displayLogin() {
      console.assert('login');
    }

    $scope.email = 'misha@datsko.info';
    $scope.password = '123456';

    signup.runSignup = function() {
      // localStorage.setItem('code', '1234567890123456789012345678901234567890123456789012345678901234');
      $http.get('api.php?act=addUser&data=' + btoa({email: $scope.email, password: $scope.password})).success(function(data) {
        console.info(data);

        $scope.user = data;
      });
      $location.path("/login");
      // $scope.$apply();
    }
  }
]);
