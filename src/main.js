var Helper = {
  isArray: function(val) {
    return toString.call(val) === '[object Array]';
  },
  isObject: function(val) {
    return val !== null && typeof val === 'object';
  },
  isString: function(val) {
    return typeof val === 'string';
  }
};

var Pca = Object.create(Helper);
Pca.init = function(pca) {
  this._pca = pca;
};
Pca.getPartFrom = function(source, keys) {
  var part = {};

  if(!this.isArray(keys)) {
    console.error("except array");
    return false;
  }

  if(!keys.length || !keys) return this._pca;

  for(var i = 0, len = keys.length; i < len; i++) {
    var targetProvince = keys[i];

    part[targetProvince] = source[targetProvince];
  }

  return part;
};

Pca._format = function(data) {
  var _data = [];
  var isArray = Object.prototype.toString.call(data) === "[object Array]";
  
  if(isArray) {
    for(var key in data) {
      var item = data[key];
      _data.push({ label: item, value: item });
    }
  } else {
    for(var key in data) {
      var item = data[key];
      _data.push({ label: key, value: key, children: this._format(item) });
    }
  }
  return _data;
};

Pca.getProvinceLiist = function() {
  var _pca = this._pca;
  var _provinces = [];

  for(var key in _pca) {
    _provinces.push(key);
  }

  return _provinces;
};

Pca.getCityLiistBy = function(province) {
  var source = this._pca[province];
  var _citys = [];

  for(var key in source) {
    _citys.push(key);
  }

  return _citys;
};

Pca.get = function() {
  var data;
  var source = this._pca;
  var isNullProperty = !arguments.length;
  var provinces = arguments[0],
    citys = arguments[1],
    areas = arguments[2];

  if(isNullProperty) {
    return this._format(source)
  } else {
    if(this.isArray(provinces)) {
      data = this.getPartFrom(source, provinces);
      return this._format(data);

    } else if(this.isString(provinces)){
      source = source[provinces];

      if(arguments.length == 1) {
        data = source;
        return this._format(data);
      }

      if(this.isArray(citys)) {
        data = this.getPartFrom(source, citys);
        return this._format(data);

      } else if(this.isString(citys)) {
        data = source[citys];
        return this._format(data);
      } else {
        console.log(1);
      }
    } else {
      console.log(2);
    }
  }
};


var pca = Object.create(Pca);
pca.init(PCA);