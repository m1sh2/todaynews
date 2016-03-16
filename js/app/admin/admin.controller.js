'use strict';

app.controller('AdminCtrl', ['$scope', 'xhr', '$routeParams', '$sce', '$location', AdminCtrl]);

function AdminCtrl($scope, xhr, $routeParams, $sce, $location) {
  // console.info(1234, $routeParams.category);
  var code = null;
  var admin = this;
  admin.categories = [];
  admin.user = false;
  admin.article_id = 0;
  admin.article_title = '';
  admin.article_content = '';
  admin.article_category = 1;
  admin.article_state = 3;
  admin.articleAdd = false;

  admin.articleStates = {
    1: {
      title: 'Published',
      color: 'limegreen',
      icon: 'checkmark'
    },
    2: {
      title: 'Moderated',
      color: 'limegreen',
      icon: 'pushpin'
    },
    3: {
      title: 'New',
      color: 'steelblue',
      icon: 'file-text2'
    },
    4: {
      title: 'On moderation',
      color: 'steelblue',
      icon: 'hour-glass'
    },
    5: {
      title: 'Errors found',
      color: 'darkorange',
      icon: 'warning'
    },
    6: {
      title: 'Source issue',
      color: 'red',
      icon: 'copy'
    },
    7: {
      title: 'Format issue',
      color: 'red',
      icon: 'pen'
    },
    8: {
      title: 'Blocked',
      color: 'red',
      icon: 'blocked'
    }
  };

  code = localStorage.getItem('code');
  
  if (code !== null && typeof code !== 'undefined' && code.length === 64) {
    admin.user = code;
    displayAdmin();
  } else {
    admin.user = null;
    $location.path("/login");
  }

  xhr.post('api.php?act=getCategoriesAdmin', {}, function(result) {
    // console.info(result);
    // getArticles();
    admin.categories = result.data;
    // $scope.user = data;
  });

  admin.delete = function(type, id) {
    if (confirm('Are you sure you want to delete it?')) {
      xhr.post('api.php?act=delete', {
        type: type,
        id: id
      }, function(result) {
        console.info(result);
        switch(type) {
          case 'article':
            getArticles();
            break;
        }
      });
    }
  }

  admin.edit = function(type, id) {
    xhr.post('api.php?act=edit', {
      type: type,
      id: id
    }, function(result) {
      // console.info(result);
      switch(type) {
        case 'article':
          // getArticles();
          admin.article_id = result.data.id;
          admin.article_title = Base64.decode(result.data.title);
          admin.article_content = Base64.decode(result.data.content);
          admin.article_category = result.data.category;
          admin.article_state = result.data.state;
          admin.articleAdd = true;
          CKEDITOR.instances.article_content.destroy();
          CKEDITOR.replace('article_content');
          break;
      }
    });
  }
  
  getArticles();
  // $scope.article = {};
  admin.addArticle = function(f) {
    // console.info(f, $scope.article_title);
    admin.article_content = CKEDITOR.instances.article_content.getData();
    var data = {};
    data.id = admin.article_id;
    data.title = Base64.encode(admin.article_title);
    data.content = Base64.encode(admin.article_content);
    data.category = admin.article_category;
    data.state = admin.article_state;
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
          xhr.post('api.php?act=addArticle&part=' + parts[i], {}, function(result) {
            // console.info(i, parts.length);
            setTimeout(function() {
              sendPart(i + 1);
            }, 1000);
          });
        } else {
          xhr.post('api.php?act=addArticle&finish=' + parts[i], {}, function(result) {
            // console.info(i, 'finish');
            getArticles();
            CKEDITOR.instances.article_content.destroy();
            CKEDITOR.replace('article_content');
            admin.article_id = 0;
            admin.article_title = '';
            admin.article_content = '';
            admin.article_category = 1;
            admin.article_state = 3;
            admin.articleAdd = false;
            preload.remove(document.querySelector('form[name="addArticleForm"]'));
          });
        }
      }
    } else {
      xhr.post('api.php?act=addArticle', data, function(result) {
        // console.info(result);
        getArticles();
        CKEDITOR.instances.article_content.destroy();
        CKEDITOR.replace('article_content');
        admin.article_id = 0;
        admin.article_title = '';
        admin.article_content = '';
        admin.article_category = 1;
        admin.article_state = 3;
        admin.articleAdd = false;
        
        // $scope.user = data;
      });
    }
  }

  function getArticles() {
    xhr.get('api.php?act=getArticlesAdmin', {}, function(result) {
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


