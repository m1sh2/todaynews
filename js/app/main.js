(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.NavMain);
    ng.platform.browser.bootstrap(app.Page);
  });
})(window.app || (window.app = {}));
