(function () {
    function jQuery (selector) {
        return new jQuery.prototype.init(selector);
    }
    jQuery.prototype.init = function (selector) {
        this.length = 0;
        if (selector == null) {
            return this;
        }

        if (typeof selector == 'string' && selector.indexOf('.') != -1) {
            var dom = document.getElementsByClassName( selector.slice(1) );
        }else if (typeof selector == 'string' && selector.indexOf('#') != -1) {
            var dom = document.getElementById( selector.slice(1) );
        }

        if (selector instanceof Element || dom.length == undefined) {
            this[0] = dom || selector;
            this.length++;
        }else {
            for (var i = 0; i < dom.length; i++) {
                this[i] = dom[i];
                this.length++
            }
        }
    }

    jQuery.prototype.css = function (config) {
        for (var i = 0; i < this.length; i++) {
            for (var attr in config) {
                this[i].style[attr] = config[attr];
            }
        }
        return this;
    }

    jQuery.prototype.pushStack = function (dom) {
        if (dom.constructor != jQuery) {
            dom = jQuery(dom);
        }
        dom.prevObject = this;
        return dom;
    }


    jQuery.prototype.get = function (num) {
        return num != null ? (num >= 0 ? this[num] : this[num + this.length]) : [].slice.call(this, 0);
    }

    jQuery.prototype.eq = function (num) {
        var dom = num != null ? (num >= 0 ? this[num] : this[num + this.length]) : null;
        return this.pushStack(dom);
    }

    jQuery.prototype.add = function (selector) {
        var curObj = jQuery(selector);
        var baseObj = this;
        var newObj = jQuery();

        for (var i = 0; i < curObj.length; i++) {
            newObj[newObj.length++] = curObj[i];
        }
        for (var i = 0; i < baseObj.length; i++) {
            newObj[newObj.length++] = baseObj[i];
        }

        console.log(newObj);

        this.pushStack(newObj);

        return newObj;
    }

    jQuery.prototype.end = function () {
        return this.prevObject;
    }


    jQuery.prototype.myOn = function (type, handle) {
        for (var i = 0; i < this.length; i++) {
            if (!this[i].cacheEvent) {
                this[i].cacheEvent = {};
            }
            if ( !this[i].cacheEvent[type] ) {
                this[i].cacheEvent[type] = [handle];
            }else {
                this[i].cacheEvent[type].push(handle);
            }
        }
    }

    jQuery.prototype.myTrigger = function (type) {
        var params = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
        var self = this;
        for (var i = 0; i < this.length; i++) {
            if ( this[i].cacheEvent[type] ) {
                this[i].cacheEvent[type].forEach(function (ele, index) {
                    ele.apply(self, params)
                });
            }
        }
    }

    jQuery.prototype.init.prototype = jQuery.prototype;


    window.$ = window.jQuery = jQuery;
})();