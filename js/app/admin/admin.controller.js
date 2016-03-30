'use strict';

app.controller('AdminCtrl', ['$scope', 'xhr', '$routeParams', '$sce', '$location', AdminCtrl]);

function AdminCtrl($scope, xhr, $routeParams, $sce, $location) {
  // console.info(1234, $routeParams.category);
  var code = null;
  var admin = this;

  admin.categories = [];
  admin.articles = [];
  admin.banners = [];
  admin.user = false;
  
  admin.article_id = 0;
  admin.article_title = '';
  admin.article_content = '';
  admin.article_category = 1;
  admin.article_state = 3;

  admin.banner_id = 0;
  admin.banner_title = '';
  admin.banner_image = '';
  admin.banner_clicks = 0;
  admin.banner_views = 0;
  admin.banner_state = 3;
  admin.banner_link = '';
  admin.banner_client = 0;
  admin.banner_date_start = new Date();
  admin.banner_date_end = new Date();
  admin.banner_category = 0;
  admin.banner_position = '';

  admin.articleAdd = false;
  admin.bannerAdd = false;

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

          case 'banner':
            getBanners();
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
      console.info(result);
      switch(type) {
        case 'article':
          admin.article_id = result.data.id;
          admin.article_title = Base64.decode(result.data.title);
          admin.article_content = Base64.decode(result.data.content);
          admin.article_category = result.data.category;
          admin.article_state = result.data.state;
          admin.articleAdd = true;
          if ($('#cke_article_content').length) {
            CKEDITOR.instances.article_content.destroy();
          }
          CKEDITOR.replace('article_content');
          break;

        case 'banner':
          admin.banner_id = result.data.id;
          admin.banner_title = Base64.decode(result.data.title);
          admin.banner_image = Base64.decode(result.data.image);
          admin.banner_link = Base64.decode(result.data.link);
          admin.banner_date_modified = new Date(Base64.decode(result.data.date_modified));
          admin.banner_date_start = new Date(Base64.decode(result.data.date_start));
          admin.banner_date_end = new Date(Base64.decode(result.data.date_end));
          admin.banner_category = result.data.category;
          admin.banner_state = result.data.state;
          admin.banner_position = result.data.position;
          admin.bannerAdd = true;
          if ($('#cke_banner_image').length) {
            CKEDITOR.instances.banner_image.destroy();
          }
          CKEDITOR.replace('banner_image');
          break;
      }
    });
  }
  
  getArticles();
  getBanners();
  // $scope.article = {};

  admin.addArticleOpen = function() {
    admin.articleAdd = !admin.articleAdd;
    if (admin.articleAdd) {
      CKEDITOR.replace('article_content');
    } else {
      CKEDITOR.instances.article_content.destroy();
    }
  }

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

  admin.addBannerOpen = function() {
    admin.bannerAdd = !admin.bannerAdd;
    if (admin.bannerAdd) {
      CKEDITOR.replace('banner_image');
    } else {
      CKEDITOR.instances.banner_image.destroy();
    }
  }

  admin.addBanner = function(f) {
    console.info(f, admin.banner_date_start, admin.banner_date_end);
    admin.banner_image = CKEDITOR.instances.banner_image.getData();
    var data = {};
    data.id = admin.banner_id;
    data.title = Base64.encode(admin.banner_title);
    data.image = Base64.encode(admin.banner_image);
    data.link = Base64.encode(admin.banner_link);
    
    data.date_start = Base64.encode(admin.banner_date_start.getFullYear() + '-' + (admin.banner_date_start.getMonth() + 1) + '-' + admin.banner_date_start.getDate());
    data.date_end = Base64.encode(admin.banner_date_end.getFullYear() + '-' + (admin.banner_date_end.getMonth() + 1) + '-' + admin.banner_date_end.getDate());
    data.state = admin.banner_state;
    data.position = admin.banner_position;
    data.category = admin.banner_category;

    var dataEncoded = Base64.encode(JSON.stringify(data));
    // console.info(dataEncoded.length);
    if (dataEncoded.length > 2000) {
      var parts = dataEncoded.match(/.{1,2000}/g);
      // console.info(parts.length);
      preload.init(document.querySelector('form[name="addBannerForm"]'));
      sendPart(0);
      function sendPart(i) {
        preload.run(document.querySelector('form[name="addBannerForm"]'), 100 / parts.length * (i + 1) );
        if (i + 1 < parts.length) {
          xhr.post('api.php?act=addBanner&part=' + parts[i], {}, function(result) {
            // console.info(i, parts.length);
            setTimeout(function() {
              sendPart(i + 1);
            }, 1000);
          });
        } else {
          xhr.post('api.php?act=addBanner&finish=' + parts[i], {}, function(result) {
            // console.info(i, 'finish');
            getBanners();
            CKEDITOR.instances.banner_image.destroy();
            CKEDITOR.replace('banner_image');
            admin.banner_id = 0;
            admin.banner_title = '';
            admin.banner_image = '';
            admin.banner_clicks = 0;
            admin.banner_views = 0;
            admin.banner_state = 3;
            admin.banner_link = '';
            admin.banner_client = 0;
            admin.banner_date_start = new Date();
            admin.banner_date_end = new Date();
            admin.banner_category = 0;
            admin.banner_position = '';

            admin.bannerAdd = false;
            preload.remove(document.querySelector('form[name="addBannerForm"]'));
          });
        }
      }
    } else {
      xhr.post('api.php?act=addBanner', data, function(result) {
        // console.info(result);
        getBanners();
        CKEDITOR.instances.banner_image.destroy();
        CKEDITOR.replace('banner_image');
        admin.banner_id = 0;
        admin.banner_title = '';
        admin.banner_image = '';
        admin.banner_clicks = 0;
        admin.banner_views = 0;
        admin.banner_state = 3;
        admin.banner_link = '';
        admin.banner_client = 0;
        admin.banner_date_start = new Date();
        admin.banner_date_end = new Date();
        admin.banner_category = 0;
        admin.banner_position = '';

        admin.bannerAdd = false;
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

  function getBanners() {
    xhr.get('api.php?act=getBannersAdmin', {}, function(result) {
      // console.info(result);
      admin.banners = result.data;
      // $scope.user = data;
    });
  }
  
  function displayAdmin() {
    // console.assert('admin');
    
    CKEDITOR.replace('banner_image');
  }

  if (code !== null && typeof code !== 'undefined' && code.length === 64) {
    admin.user = code;
    // displayAdmin();
  } else {
    admin.user = null;
    $location.path("/login");
  }
}


