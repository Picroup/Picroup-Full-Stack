
if (!Array.prototype.last) {
  Array.prototype.last = function() {
    return this[this.length -1];
  }
}

if (!Array.prototype.popped) {
  Array.prototype.popped = function() {
    this.pop();
    return this;
  }
}

if (!Array.prototype.first) {
  Array.prototype.first = function() {
    return this[0];
  }
}


