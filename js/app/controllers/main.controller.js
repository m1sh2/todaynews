
app.controller('MainCtrl', ['$scope', '$http', '$route', '$location', MainCtrl]);

function MainCtrl($scope, $http, $route, $location) {
  $scope.title = '2323sdsd';
  var vm = this;
  vm._location = $location;
  console.info($route);
  vm.loginDropdown = false;
  vm.user = {};
  $http.get('api.php?act=getUser').then(function(result) {
    console.info(result.data);

    // $scope.categories = result.data;
  });
}

MainCtrl.prototype.runLogout = function(argument) {
  localStorage.removeItem('code');
  this._location.path("/");
}