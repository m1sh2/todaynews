(function(app) {

  app.NavMain =
    ng.core.Component({
      selector: 'nav'
    })
    .View({
      templateUrl: 'views/nav/main.html',
      directives: [app.NgFor]
    })
    .Class({
      constructor: function() {
        this.names = ['a', 'b', 'c'];
      },
    });

})(window.app || (window.app = {}));