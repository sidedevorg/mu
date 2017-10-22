function str() {

  this.clean = function(str) {

    return str.replace(/(\r\n|\n|\r)/gm,"");

  };

}

module.exports = str;