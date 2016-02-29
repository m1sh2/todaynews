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
  admin.articleAdd = false;
  admin.articleStateIcon = {
    1: 'checkmark',
    2: 'pushpin',
    3: 'file-text2',
    4: 'hour-glass',
    5: 'warning',
    6: 'copy',
    7: 'pen',
    8: 'blocked'
  };
  admin.articleStateColor = {
    1: 'limegreen',
    2: 'limegreen',
    3: 'steelblue',
    4: 'steelblue',
    5: 'darkorange',
    6: 'red',
    7: 'red',
    8: 'red'
  };
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

  admin.delete = function(type, id) {
    if (confirm('Are you sure you want to delete it?')) {
      $http.post('api.php?act=delete&type=' + type + '&id=' + id).then(function(result) {
        console.info(result);
        switch(type) {
          case 'article':
            getArticles();
            break;
        }
      });
    }
  }
  
  getArticles();
  // $scope.article = {};
  admin.addArticle = function(f) {
    // console.info(f, $scope.article_title);
    admin.article_content = CKEDITOR.instances.article_content.getData();
    var data = {};
    data.title = Base64.encode(admin.article_title);
    data.content = Base64.encode(admin.article_content);
    data.category = admin.article_category;
    var dataEncoded = Base64.encode(JSON.stringify(data));
    // console.info(dataEncoded.length);
    if (dataEncoded.length > 2000) {
      var parts = dataEncoded.match(/.{1,2000}/g);
      // console.info(parts.length);
      preload.init(document.querySelector('form[name="addArticleForm"]'));
      sendPart(0);
      function sendPart(i) {
        preload.run(document.querySelector('form[name="addArticleForm"]'), 100 / parts.length * (i + 1) );
        if (i + 1 < parts.length) {
          $http.post('api.php?act=addArticle&part=' + parts[i]).then(function(result) {
            // console.info(i, parts.length);
            setTimeout(function() {
              sendPart(i + 1);
            }, 1000);
          });
        } else {
          $http.post('api.php?act=addArticle&finish=' + parts[i]).then(function(result) {
            // console.info(i, 'finish');
            getArticles();
            CKEDITOR.instances.article_content.destroy();
            CKEDITOR.replace('article_content');
            admin.article_title = '';
            admin.article_content = '';
            admin.article_category = 1;
            admin.articleAdd = false;
            preload.remove(document.querySelector('form[name="addArticleForm"]'));
          });
        }
      }
    } else {
      $http.post('api.php?act=addArticle&data=' + Base64.encode(JSON.stringify(data))).then(function(result) {
        // console.info(result);
        getArticles();
        CKEDITOR.instances.article_content.destroy();
        CKEDITOR.replace('article_content');
        admin.article_title = '';
        admin.article_content = '';
        admin.article_category = 1;
        admin.articleAdd = false;
        
        // $scope.user = data;
      });
    }
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
    CKEDITOR.replace('article_content');
  }
}


