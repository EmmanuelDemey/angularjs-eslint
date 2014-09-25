[![Build Status](https://travis-ci.org/Gillespie59/angularjs-eslint.svg?branch=master)](https://travis-ci.org/Gillespie59/angularjs-eslint)

This repository will give access to new rules for the ESLint tool. You should use it only if you are developping an AngularJS application. 

# Rules

## ng_angularelement

The angular.element method should be used of the $ or jQuery object (if you are using jQuery of course). If the jQuery library is imported, angular.element will be a wrapper around the jQuery object. 

## ng_controller_name

All your controllers should have a name starting the parameter you can define in your config object

  {
    "rules": {
        "ng_controller_name":  [2, "ng"]
    }
  }

## ng_defineundefined

You should use the angular.isUndefined or angular.isDefined methods instead of using the keyword undefined (myVar === undefined)

## ng_directive_name

All your directives should have a name starting the parameter you can define in your config object

  {
    "rules": {
        "ng_directive_name":  [2, "ng"]
    }
  }
  
## ng_filter_name

All your filters should have a name starting the parameter you can define in your config object

  {
    "rules": {
        "ng_filter_name":  [2, "ng"]
    }
  }
  
## ng_on_watch

Watch and On methods on the scope object should be assigned to a variable, in order to be deleted in a $destroy event handler

## ng_service_name

All your services should have a name starting the parameter you can define in your config object

  {
    "rules": {
        "ng_service_name":  [2, "ng"]
    }
  }
  
## ng_typecheck_array

You should use the angular.isArray method instead of the default JavaScript implementation (typeof [] === "[object Array]"). 

## ng_typecheck_boolean

You should use the angular.isBoolean method instead of the default JavaScript implementation (typeof true === "[object Boolean]"). 

## ng_typecheck_date

You should use the angular.isDate method instead of the default JavaScript implementation (typeof new Date() === "[object Date]"). 

## ng_typecheck_function

You should use the angular.isFunction method instead of the default JavaScript implementation (typeof function(){} ==="[object Function]"). 

## ng_typecheck_number

You should use the angular.isNumber method instead of the default JavaScript implementation (typeof 3 === "[object Number]"). 

## ng_typecheck_object

You should use the angular.isObject method instead of the default JavaScript implementation (typeof {} === "[object Object]"). 

## ng_typecheck_string

You should use the angular.isString method instead of the default JavaScript implementation (typeof "" === "[object String]").
