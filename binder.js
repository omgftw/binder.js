var binder = {};

binder.bindable = function () {

    var bindable = {};
    bindable.backingValue = null;
    bindable.bound = [];

    bindable.get = function () {
        return bindable.backingValue;
    };
    
    bindable.set = function (value) {
        bindable.backingValue = value;
        bindable.updateBound();
    }

    bindable.bind = function(target) {
        bindable.bound.push(target);
    };

    bindable.updateBound = function () {
        for (var i = 0; i < bindable.bound.length; i++) {
            var target = bindable.bound[i];
            if (typeof target != "undefined") {
                if (typeof target.type != "undefined" && target.type == "bindable") {
                    target.set(bindable.get());
                }
                else if (typeof target == "string") {
                    $(target).val(bindable.get());
                }
            }
        }
    };

    bindable.type = "bindable";

    return bindable;
};

binder.bind = function (source, target) {
    if (typeof source != "undefined" && typeof target != "undefined") {
        if (typeof source.type != "undefined" && typeof source.type == "bindable" && typeof target.type != "undefined" && target.type == "bindable") {
            target.bind(source);
            return true;
        }
        else if (typeof source == "string" && typeof target.type != "undefined" && target.type == "bindable") {
            $(source).on('change', function () {
                target.set($(source).val());
            });
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