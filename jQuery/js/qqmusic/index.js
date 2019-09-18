$(function () {
   $.ajax({
       type: "GET",
       url: "../source/music.json",
       dataType: "json",
       success: function (response) {
           console.log(response);
           $("img").prop("src",response[9]["pic_url"]);
           $("audio").prop("src",response[9]["url"])
           console.log(response[9]["url"]);
       },
       error: function (response) {

       }
   }); 
});