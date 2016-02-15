(function(app) {
  app.Page =
    ng.core.Component({
      selector: 'page',
      templateUrl: 'views/home.html'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
