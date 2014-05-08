;
(function(win) {
    function setUnitA(){
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 16 +"px";
    }
    var h = null;
    window.addEventListener("resize",function(){clearTimeout(h);h=setTimeout(setUnitA,300);},false);
    setUnitA();
})(window);