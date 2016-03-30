
app.controller('MainCtrl', ['$scope', 'xhr', '$route', '$location', '$routeParams', '$rootScope', MainCtrl]);

function MainCtrl($scope, xhr, $route, $location, $routeParams, $rootScope) {
  $scope.title = '2323sdsd';
  var main = this;
  var code = null;
  main._location = $location;
  // console.info($location);
  main.loginDropdown = false;
  main.user = false;
  main.cat = '_home_';

  main.admin = false;
  main.adminTab = 'articles';

  xhr.get('api.php?act=getUser', {}, function(result) {
    // console.info(result.data);

    // $scope.categories = result.data;
  });

  main.bannerId = 0;

  main.banners = {};
  main.bannersTop = [];
  main.bannersRight = [];
  main.bannersMiddle = [];
  main.bannersBottom = [];
  getBanners();

  main.bannerClick = function(id, link) {
    $('body').append('<a id="bannerlink" href="' + link + '" target="_blank"></a>');
    $('#bannerlink')[0].click();
    $('#bannerlink').remove();
    xhr.post('api.php?act=addBannerClick', {id: id, category: main.cat}, function(result) {
      console.info(result.data);

      // $scope.categories = result.data;
    });
  }

  function getBanners() {
    xhr.get('api.php?act=getBanners', {
      category: main.cat
    }, function(result) {
      // console.info(result.data);
      var banners = {};
      for (var i = 0; i < result.data.length; i++) {
        var banner = result.data[i];
        var cat = banner.category == 0 ? '_home_' : banner.category_url;
        var pos = banner.position;
        if (typeof banners[cat] == 'undefined') {
          banners[cat] = {};
        }
        if (typeof banners[cat][pos] == 'undefined') {
          banners[cat][pos] = [];
        }
        banners[cat][pos].push({
          image: banner.image,
          link: banner.link,
          id: banner.id
        });
      }
      main.banners = banners;

      bannersInit();
    });
  }

  main.email = '';
  main.password = '';
  code = localStorage.getItem('code');
  if (code !== null && typeof code !== 'undefined' && code.length === 64) {
    main.user = true;
  //   $location.path("/admin");
  } else {
  //   main.user = null;
  //   displayLogin();
  }

  $rootScope.$on('$locationChangeSuccess', function () {
    var cat = $location.path();
    cat = cat.split('/');
    cat = cat[1];
    main.cat = cat == '' ? '_home_' : cat;
    if (main.cat == 'login' || main.cat == 'admin') {
      main.admin = true;
    }

    bannersInit();

    // for (var i = 0; i < main.banners.length; i++) {
    //   if (main.banners[i].cat == main.cat) {
    //     main.banner = '<a href="' + main.banners[i].link + '" target="_blank" rel="nofollow">\
    //         <img src="' + main.banners[i].image + '">\
    //       </a>';

    //     main.bannerId = main.banners[i].id;

    //     
    //     return
    //   } else {
    //     main.banner = '';
    //   }
    // }
    
    // console.info('cat', cat);
  });

  function bannersInit() {
    if (typeof main.banners[main.cat] !== 'undefined') {
      main.bannersTop = main.banners[main.cat].top && main.banners[main.cat].top.length ? main.banners[main.cat].top : [];
      main.bannersRight = main.banners[main.cat].right && main.banners[main.cat].right.length ? main.banners[main.cat].right : [];
      main.bannersMiddle = main.banners[main.cat].middle && main.banners[main.cat].middle.length ? main.banners[main.cat].middle : [];
      main.bannersBottom = main.banners[main.cat].bottom && main.banners[main.cat].bottom.length ? main.banners[main.cat].bottom : [];
      // console.info(main.cat, typeof main.banners[main.cat].right);
    } else {
      main.bannersTop = [];
      main.bannersRight = [];
      main.bannersMiddle = [];
      main.bannersBottom = [];
    }
    
    // console.info(main.bannersTop, main.bannersRight, main.bannersBottom);

    bannersView();
  }

  function bannersView() {
    // console.info(main.bannersTop, main.bannersRight, main.bannersBottom);
    for (var i = 0; i < main.bannersTop.length; i++) {
      view(main.bannersTop[i].id);
    }

    for (var i = 0; i < main.bannersRight.length; i++) {
      view(main.bannersRight[i].id);
    }

    for (var i = 0; i < main.bannersBottom.length; i++) {
      view(main.bannersBottom[i].id);
    }

    function view(id) {
      // console.info(id);
      xhr.post('api.php?act=addBannerView', {id: id, category: main.cat}, function(result) {
        // console.info(result.data);
      });
    }
  }
  
  // xhr.get('api.php?act=getCategories').success(function(data) {
  //   console.info(data);

  //   $scope.user = data;
  // });
  function displayLogin() {
    // console.assert('main');
  }

  

  main.btn = '';
  main.error = '';
  main.runLogin = function() {
    main.btn = 'disabled';
    xhr.post('api.php?act=runLogin', {
      email: main.email,
      password: main.password
    }, function(result) {
      // console.info(result.data);
      if (!result.data.error) {
        localStorage.setItem('code', result.data.code);
        main.user = result.data.user;
        $location.path("/admin");
      } else {
        main.error = 'Ошибка. Проверьте email/пароль';
      }
      // cats.categories = result.data;
      
    });
    
    // $scope.$apply();
  }

  main.runLogout = function(argument) {
    localStorage.removeItem('code');
    window.location = "/";
  }
}
