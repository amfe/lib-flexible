;(function(win) {
    var docEl = document.documentElement;
    var metaEl = document.querySelector('meta[name="viewport"]');
    var dpr;
    var scale;
    var tid;
    
    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        if (match) {
            scale = parseFloat(match[2]);
            dpr = 1 / scale;
        }
    }

    if (!dpr && !scale) {
        dpr = win.navigator.appVersion.match(/iphone/gi)?win.devicePixelRatio:1;
        scale = 1 / dpr;    
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = document.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);    
        } else {
            var wrap = document.createElement('div');
            wrap.appendChild(metaEl);
            document.write(wrap.innerHTML);
        }
    }

    function setUnitA(){
        win.rem = docEl.getBoundingClientRect().width / 16;
        docEl.style.fontSize = win.rem + 'px';
    }

    win.dpr = dpr;
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(setUnitA, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(setUnitA, 300);
        }
    }, false);
    
    setUnitA();
})(window);