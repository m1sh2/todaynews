'use strict';

app.controller('LoginCtrl', ['$scope', '$http', '$routeParams', '$sce', '$location', LoginCtrl]);

function LoginCtrl($scope, $http, $routeParams, $sce, $location) {
  console.info(1234, $routeParams.category);
  var code = null;
  var vm = this;
  code = localStorage.getItem('code');
  if (code !== null && typeof code !== 'undefined' && code.length === 64) {
    $scope.user = code;
    $location.path("/admin");
  } else {
    $scope.user = null;
    displayLogin();
  }
  
  // $http.get('api.php?act=getCategories').success(function(data) {
  //   console.info(data);

  //   $scope.user = data;
  // });
  function displayLogin() {
    console.assert('login');
  }

  $scope.runLogin = function() {
    localStorage.setItem('code', '1234567890123456789012345678901234567890123456789012345678901234');
    $location.path("/admin");
    // $scope.$apply();
  }
}
