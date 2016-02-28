var preload = {
  init: function(el) {
    var prl = document.createElement('div');
    var box = document.createElement('div');
    var hdl = document.createElement('div');
    prl.className = 'preload';
    box.className = 'preload-box';
    hdl.className = 'preload-handler';

    box.appendChild(hdl);
    prl.appendChild(box);
    el.appendChild(prl);
  },
  run: function(el, w) {
    el.querySelector('.preload .preload-handler').style.width = w + '%';
  },
  remove: function(el) {
    setTimeout(function() {
      el.removeChild(el.querySelector('.preload'));
    }, 1000);
  }
};