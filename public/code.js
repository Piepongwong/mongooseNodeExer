$(document).ready(function(){

function getWord () {
  var keyword = $("#keyword").val();
  console.log(keyword);
}

$("#submit").click(function(){
  getWord();
})

})