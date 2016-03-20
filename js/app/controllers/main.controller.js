
app.controller('MainCtrl', ['$scope', 'xhr', '$route', '$location', '$routeParams', '$rootScope', MainCtrl]);

function MainCtrl($scope, xhr, $route, $location, $routeParams, $rootScope) {
  $scope.title = '2323sdsd';
  var main = this;
  var code = null;
  main._location = $location;
  console.info($location);
  main.loginDropdown = false;
  main.user = false;
  main.cat = '';
  xhr.get('api.php?act=getUser', {}, function(result) {
    // console.info(result.data);

    // $scope.categories = result.data;
  });

  main.bannerId = 0;

  main.banners = {};
  main.banners.top = {
    id: 123,
    image: '<img src="http://lmd.lk/wp-content/themes/twentytwelve/images/output_dWt0vW.gif">',
    link: 'http://datsko.it',
    cat: 'obrazovaniye'
  };
  main.banners.right = {
    id: 123,
    image: '<img src="http://www.stc-india.org/wp-content/uploads/PPBU_Q213_fm11_banner_plane_stc_150x600.gif">',
    link: 'http://datsko.it',
    cat: 'obrazovaniye'
  };
  main.banners.bottom = {
    id: 123,
    image: '<img src="images/banners/banner1.png">',
    link: 'http://datsko.it',
    cat: 'obrazovaniye'
  };

  

  main.bannerClick = function() {
    // console.info(main.banners[main.bannerId].link);
    for (var i = 0; i < main.banners.length; i++) {
      if (main.banners[i].id == main.bannerId) {
        // main.banner = '<a href="' + main.banners[i].link + '" target="_blank" rel="nofollow">\
        //     <img src="' + main.banners[i].image + '">\
        //   </a>';

        // main.bannerId = main.banners[i].id;

        xhr.post('api.php?act=addBannerClick', {banner_id: main.banners[i].id, category: main.banners[i].cat}, function(result) {
          console.info(result.data);

          // $scope.categories = result.data;
        });
        return
      } else {
        main.banner = '';
      }
    }
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
    main.cat = cat;

    for (var i = 0; i < main.banners.length; i++) {
      if (main.banners[i].cat == main.cat) {
        main.banner = '<a href="' + main.banners[i].link + '" target="_blank" rel="nofollow">\
            <img src="' + main.banners[i].image + '">\
          </a>';

        main.bannerId = main.banners[i].id;

        xhr.post('api.php?act=addBannerShow', {banner_id: main.banners[i].id, category: main.banners[i].cat}, function(result) {
          console.info(result.data);

          // $scope.categories = result.data;
        });
        return
      } else {
        main.banner = '';
      }
    }
    
    // console.info('cat', cat);
  });
  
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
