var Pca = {
  format: function(data) {
    var _data = [];
    var isArray = Object.prototype.toString.call(data) === "[object Array]";
    
    if(isArray) {
      for(var key in data) {
        var item = data[key];
        _data.push({
          label: item,
          value: item
        });
      }
      return _data;
    } else {
      for(var key in data) {
        var item = data[key];
        _data.push({
          label: key,
          value: key,
          children: this.format(item)
        });
      }
      
      return _data;
    }
  }
};

var pca = Object.create(Pca);

window.WX_PCA = pca.format(PCA);