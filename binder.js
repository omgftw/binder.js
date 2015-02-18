var binder = {};

binder.bindable = function (initValue) {

    var bindable = {};
    bindable.backingValue = null;
    bindable.bound = [];

    bindable.get = function () {
        return bindable.backingValue;
    };

    bindable.set = function (value) {
        bindable.backingValue = value;
        bindable.updateBound();
    };

    bindable.bind = function (target) {
        bindable.bound.push(target);
    };

    bindable.updateBound = function () {
        for (var i = 0; i < bindable.bound.length; i++) {
            var target = bindable.bound[i];
            if (typeof target != "undefined") {
                if (typeof target.type != "undefined" && target.type == "bindable") {
                    target.set(bindable.get());
                }
                else if (typeof target.type != "undefined" && target.type == "combind") {
                    target.update();
                }
                else if (typeof target == "string") {
                    $(target).val(bindable.get());
                }
            }
        }
    };

    bindable.type = "bindable";

    if (typeof initValue != "undefined") {
        bindable.set(initValue);
    }

    return bindable;
};

binder.bind = function (source, target) {
    if (typeof source != "undefined" && typeof target != "undefined") {
        if (typeof target.type != "undefined" && (source.type == "bindable" || source.type == "combind") && typeof target.type != "undefined" && (target.type == "bindable" || target.type == "combind")) {
            source.bind(target);
            return true;
        }
        else if (typeof source == "string" && typeof target.type != "undefined" && (target.type == "bindable" || target.type == "combind")) {
            $(source).on('change', function () {
                target.set($(source).val());
            });
            return true;
        }
        else if (typeof source.type != "undefined" && (source.type == "bindable" || source.type == "combind") && typeof target == "string") {
            source.bind(target);
            return true;
        }
        else if (typeof source == "string" && typeof target == "string") {
            $(source).on('change', function () {
                $(target).val($(source).val());
            });
            return true;
        }
    }
    return false;
};

binder.combind = function (bindables, func) {
    var combind = {};
    combind.bound = [];

    if (typeof func == "function" && bindables instanceof Array) {
        combind.internalValue = null;
        combind.internalFunction = func;
        combind.sources = bindables;

        combind.update = function () {
            combind.internalValue = combind.internalFunction();
            combind.updateBound();
        };

        for (var i = 0; i < bindables.length; i++) {
            bindables[i].bind(combind);
        }

        combind.get = function () {
            return combind.internalValue;
        };

        combind.bind = function (target) {
            combind.bound.push(target);
        };

        combind.updateBound = function () {
            for (var i = 0; i < combind.bound.length; i++) {
                var target = combind.bound[i];
                if (typeof target != "undefined") {
                    if (typeof target.type != "undefined" && target.type == "bindable") {
                        target.set(combind.get());
                    }
                    else if (typeof target.type != "undefined" && target.type == "combind") {
                        target.update();
                    }
                    else if (typeof target == "string") {
                        $(target).val(combind.get());
                    }
                }
            }
        };

        combind.update();
    }

    combind.type = "combind";
    return combind;
};