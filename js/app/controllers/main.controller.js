
app.controller('MainCtrl', ['$scope', '$http', '$route', '$location', MainCtrl]);

function MainCtrl($scope, $http, $route, $location) {
  $scope.title = '2323sdsd';
  var main = this;
  main._location = $location;
  // console.info($route);
  main.loginDropdown = false;
  main.user = {};
  $http.get('api.php?act=getUser').then(function(result) {
    // console.info(result.data);

    // $scope.categories = result.data;
  });
}

MainCtrl.prototype.runLogout = function(argument) {
  localStorage.removeItem('code');
  this._location.path("/");
}