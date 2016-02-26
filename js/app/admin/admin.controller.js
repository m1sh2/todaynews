'use strict';

app.controller('AdminCtrl', ['$scope', '$http', '$routeParams', '$sce', '$location', AdminCtrl]);

function AdminCtrl($scope, $http, $routeParams, $sce, $location) {
  // console.info(1234, $routeParams.category);
  var code = null;
  var admin = this;
  admin.categories = [];
  admin.user = false;
  admin.article_title = '';
  admin.article_content = '';
  admin.article_category = 1;
  code = localStorage.getItem('code');
  
  if (code !== null && typeof code !== 'undefined' && code.length === 64) {
    admin.user = code;
    displayAdmin();
  } else {
    admin.user = null;
    $location.path("/login");
  }

  $http.post('api.php?act=getCategories').then(function(result) {
    // console.info(result);
    // getArticles();
    admin.categories = result.data;
    // $scope.user = data;
  });
  
  getArticles();
  // $scope.article = {};
  admin.addArticle = function(f) {
    // console.info(f, $scope.article_title);
    var data = {};
    data.title = Base64.encode(admin.article_title);
    data.content = Base64.encode(admin.article_content);
    data.category = admin.article_category;
    $http.post('api.php?act=addArticle&data=' + Base64.encode(JSON.stringify(data))).then(function(result) {
      // console.info(result);
      getArticles();

      admin.article_title = '';
      admin.article_content = '';
      admin.article_category = 1;
      // $scope.user = data;
    });
  }

  function getArticles() {
    $http.get('api.php?act=getArticlesAdmin').then(function(result) {
      // console.info(result);
      admin.articles = result.data;
      // $scope.user = data;
    });
  }
  
  function displayAdmin() {
    // console.assert('admin');
  }
}


