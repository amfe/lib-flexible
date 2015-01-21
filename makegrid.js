(function(win, lib){
    var doc = win.document;
    var docEl = doc.documentElement;
    var gridEl = doc.querySelector('meta[name="grid"]');
    var styleEl;
    var flexible = lib.flexible || (lib.flexible = {});

    function makeGrid(params) {
        var designWidth = parseFloat(params.designWidth);
        var designUnit = parseFloat(params.designUnit);
        var columnCount = parseFloat(params.columnCount);
        var columnXUnit = parseFloat(params.columnXUnit);
        var gutterXUnit = parseFloat(params.gutterXUnit);
        var edgeXUnit = parseFloat(params.edgeXUnit);
        var className = params.className || 'grid';

        if (!(params.designWidth && params.designUnit && params.columnCount && params.columnXUnit && params.gutterXUnit && params.edgeXUnit)) {
            throw new Error('参数错误');
        }

        lib.flexible.gridParams = params;

        var ratio = designUnit / designWidth * 10;
        var columnWidth = columnXUnit * ratio;
        var gutterWidth = gutterXUnit * ratio;
        var edgeWidth = edgeXUnit * ratio;

        var cssText = [
            '.' + className + ' {',
                'box-sizing:content-box;',
                'padding-left: ' + edgeWidth + 'rem;',
                'padding-right: ' + edgeWidth + 'rem;',
                'margin-left: -' + gutterWidth + 'rem;',
            '}',

            '.' + className + ':before,',
            '.' + className + ':after{',
                'content: " ";',
                'display: table;',
            '}',

            '.' + className + ':after {',
              'clear: both;',
            '}',

            '.' + className + ' [class^="col-"] {',
                'margin-left: ' + gutterWidth + 'rem;',
                'float: left;',
            '}'
        ];

        for (var i = 1; i <= columnCount; i++) {
            var width = columnWidth * i + gutterWidth * (i - 1);
            cssText.push('.' + className + ' .col-' + i + ' {width: ' + width + 'rem;}');
        }

        if (styleEl && styleEl.parentNode) {
            styleEl.parentNode.removeChild(styleEl);
        }
        styleEl = doc.createElement('style');
        styleEl.innerHTML = cssText.join('');
        var el = doc.querySelector('head') || docEl.firstElementChild || docEl;
        el.appendChild(styleEl);
    }

    var gridMode = {
        '750-12': {designWidth:750,designUnit:6,columnCount:12,columnXUnit:7,gutterXUnit:3,edgeXUnit:4},
        '750-6': {designWidth:750,designUnit:6,columnCount:6,columnXUnit:17,gutterXUnit:3,edgeXUnit:4},
        '640-12': {designWidth:640,designUnit:4,columnCount:12,columnXUnit:11,gutterXUnit:2,edgeXUnit:3},
        '640-6': {designWidth:640,designUnit:4,columnCount:6,columnXUnit:24,gutterXUnit:2,edgeXUnit:3}
    }
    function makeGridMode(modeName) {
        var mode = gridMode[modeName];
        if (mode) {
            makeGrid(mode);
        } else {
            throw new Error('不支持这个预设模式');
        }
    }

    if (gridEl) {
        var content = gridEl.getAttribute('content');
        if (content) {
            var reg = /([^=]+)=([\d\.\-]+)/g;
            var matched;
            var params = {};
            while (!!(matched = reg.exec(content))) {
                params[matched[1]] = matched[2];
            }

            if (params.modeName){
                makeGridMode(params.modeName);
            } else {
                makeGrid(params);
            }
        }
    }

    flexible.makeGrid = makeGrid;
    flexible.makeGridMode = makeGridMode;

})(window, window['lib'] || (window['lib'] = {}));