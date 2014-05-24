;(function(win) {
    var h;
    var rem;
    var scale = 1;
    var dpr = 1;
    if (win.devicePixelRatio === 2 && win.navigator.appVersion.match(/iphone/gi)) {
        scale = 0.5;
        dpr = 2;
    }

    function setUnitA(){
        rem = document.documentElement.clientWidth / 16;
        document.documentElement.style.fontSize = rem + 'px';
    }

    win.dpr = dpr;
    win.rem = rem;
    win.addEventListener('resize', function(){
        clearTimeout(h);
        h = setTimeout(setUnitA, 300);
    },false);

    document.write('<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no"/>');
    setUnitA();
})(window);