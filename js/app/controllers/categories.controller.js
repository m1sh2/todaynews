'use strict';

app.controller('CategoriesCtrl', ['$scope', 'xhr', '$routeParams', '$sce', ArticlesCtrl]);

function ArticlesCtrl($scope, xhr, $routeParams, $sce) {
  var cats = this;
  // console.info(1234, $routeParams.category);
  $scope.category = $routeParams.category;
  xhr.get('api.php?act=getCategories', {}, function(result) {
    // console.info(result.data);

    cats.categories = result.data;
  });
}
