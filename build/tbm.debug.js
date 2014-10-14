;(function(win) {
    var docEl = document.documentElement;
    var metaEl = document.querySelector('meta[name="viewport"]');
    var fontEl = document.createElement('style');
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
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var dpr = win.devicePixelRatio;
        if (isAndroid) {
            // 安卓下，对于3或2.5的屏，用2倍的方案，其余用1倍方案
            // if (dpr > 2) {
            //     dpr = 2;    
            // } else {
                dpr = 1;
            //}
        } else if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (dpr >= 2) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        }
        scale = 1 / dpr;    
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = document.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
            docEl.firstElementChild.appendChild(fontEl)
        } else {
            var wrap = document.createElement('div');
            wrap.appendChild(metaEl);
            document.write(wrap.innerHTML);
        }
    }

    function setUnitA(){
        var width = docEl.getBoundingClientRect().width;
        win.rem = width / 16;
        fontEl.innerHTML = 'html{font-size:' + win.rem + 'px}body{font-size:' + parseInt(12 * (width / 320)) + 'px}';
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