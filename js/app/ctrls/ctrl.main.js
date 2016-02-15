
function MainCtrl($scope, $http, $routeProvider) {
  $scope.title = '2323sdsd';
  console.info($routeProvider);
}

app.controller('MainCtrl', ['$scope', '$http', '$routeProvider', MainCtrl]);
