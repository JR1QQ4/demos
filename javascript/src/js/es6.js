window.onload = function() {
  var c = document.getElementById("c");
  let loading = this.document.querySelector(".loading-bro");
  this.setTimeout(() => {
    let container = document.querySelector(".container");    loading.parentNode.removeChild(loading);
    container.style.opacity = 1;
  }, 2000);
};
