'use strict';

app.controller('LoginCtrl', ['$scope', 'xhr', '$routeParams', '$sce', '$location', LoginCtrl]);

function LoginCtrl($scope, xhr, $routeParams, $sce, $location) {
  // console.info(1234, $routeParams.category);
  var code = null;
  var login = this;
  login.email = '';
  login.password = '';
  code = localStorage.getItem('code');
  // if (code !== null && typeof code !== 'undefined' && code.length === 64) {
  //   $scope.user = code;
  //   $location.path("/admin");
  // } else {
    $scope.user = null;
    displayLogin();
  // }
  
  // xhr.get('api.php?act=getCategories').success(function(data) {
  //   console.info(data);

  //   $scope.user = data;
  // });
  function displayLogin() {
    // console.assert('login');
  }

  login.btn = '';
  login.error = '';
  login.runLogin = function() {
    login.btn = 'disabled';
    xhr.post('api.php?act=runLogin', {
      email: login.email,
      password: login.password
    }, function(result) {
      // console.info(result.data);
      if (!result.data.error) {
        localStorage.setItem('code', JSON.parse(result.data));
        $location.path("/admin");
      } else {
        login.error = 'Ошибка. Проверьте email/пароль';
      }
      // cats.categories = result.data;
      
    });
    
    // $scope.$apply();
  }
}
