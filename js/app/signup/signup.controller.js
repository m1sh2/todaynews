'use strict';

app.controller('SignupCtrl', ['$scope', 'xhr', '$routeParams', '$sce', '$location', SignupCtrl]);

function SignupCtrl($scope, xhr, $routeParams, $sce, $location) {
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
    console.info('login');
  }

  $scope.email = 'misha@datsko.info';
  $scope.password = '123456';

  signup.runSignup = function() {
    // localStorage.setItem('code', '1234567890123456789012345678901234567890123456789012345678901234');
    xhr.get('api.php?act=addUser', {
      email: $scope.email,
      password: $scope.password
    }, function(data) {
      console.info(data);
      $scope.user = data;
    });
    $location.path("/login");
    // $scope.$apply();
  }
}