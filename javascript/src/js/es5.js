// window.onload = function() { };

function getHeight(ele) {
  return ele.clientHeight;
}
function hasAttr(ele, cls) {
  return ele.hasAttribute(cls);
}
function setAttr(ele, cls, value) {
  ele.setAttribute(cls, value);
}
function next(ele) {
  var siblings = [];
  while (ele.nextSibling !== null) {
    if (ele.nextSibling.nodeType == 1) {
      siblings.push(ele.nextSibling);
    }
    ele = ele.nextSibling;
  }
  return siblings;
}
function getStyle(ele, style) {
  return getComputedStyle(ele)[style];
}
function getChildrenHeight(eles, childSelector, flag) {
  for (var i = 0; i < eles.length; i++) {
    var ele = eles[i];
    var father = ele.parentNode;
    var fh = getStyle(father, "height");
    var content = ele.querySelector(childSelector);
    if (content !== null) {
      var h = getStyle(content, "height");
      ele.style.height = h;
      if (flag) {
        father.style.height = parseFloat(fh) + parseFloat(h) + "px";
      }
    } else {
      content = ele.querySelector(".content");
      var h = getStyle(content, "height");
      ele.style.height = h;
    }
    console.log(h);
  }
}
function setChildrenHeight(eles) {
  var totalH = 0;
  for (var i = 0; i < eles.length; i++) {
    var ele = eles[i];
    ele.style.height = 0;
  }
  return totalH;
}

window.addEventListener("DOMContentLoaded", function() {
  var h2s = document.querySelectorAll("h2");
  var h3s = document.querySelectorAll("h3");

  for (var i = 0; i < h2s.length; i++) {
    var h2 = h2s[i];
    h2.onclick = function() {
      // this.classList.toggle("active");
      var nextArr = next(this);
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        setChildrenHeight(nextArr);
      } else {
        this.classList.add("active");
        getChildrenHeight(nextArr, "h3");
      }
    };
  }

  for (var j = 0; j < h3s.length; j++) {
    var h3 = h3s[j];
    h3.onclick = function() {
      var nextArr = next(this);
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        this.parentNode.style.height = getStyle(this, "height");
      } else {
        this.classList.add("active");
        getChildrenHeight(nextArr, ".content", true);
      }
    };
  }
});
