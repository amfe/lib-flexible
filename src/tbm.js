;(function(win) {
    var h;
    var scale = 1;
    var dpr = 1;
    if (win.devicePixelRatio === 2 && win.navigator.appVersion.match(/iphone/gi)) {
        scale = 0.5;
        dpr = 2;
    }

    function setUnitA(){
        clearTimeout(h);
        h = setTimeout(function() {
            win.rem = window.innerWidth / 16;
            document.documentElement.style.fontSize = win.rem + 'px';
        }, 300);
    }

    win.dpr = dpr;
    win.addEventListener('resize', setUnitA, false);

    document.write('<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no"/>');
    document.addEventListener('DOMContentLoaded', function(){
        document.body.setAttribute('data-dpr', dpr);
        document.body.style.fontSize = 12 * dpr + 'px';
    }, false);
    setUnitA();
})(window);