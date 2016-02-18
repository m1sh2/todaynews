
app.controller('MainCtrl', ['$scope', '$http', '$route', MainCtrl]);

function MainCtrl($scope, $http, $route) {
  $scope.title = '2323sdsd';
  console.info($route);
}
