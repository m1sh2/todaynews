
var app = angular.module('INFA', ['ngRoute', 'ngSanitize', 'angular-google-analytics',
  function() {
    console.info('START');
  }
]);

app.filter('plaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

