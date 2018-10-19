$(document).ready(function() {

//========================= Semantic UI ===========================//



//======================== End Semantic UI =======================//


// ======================= On Click Events =======================//

//======== Save Article Button ========//
$(".save-article").on("click", function(event) {
  console.log("save article button is working");
  var savedArticle = $(this).attr("data-id");
console.log(savedArticle);
  $.ajax({
    method: "GET",
    url: "/savedarticles/" + savedArticle
  }).then(function (data) {
    // location.reload()
  }
  )

});


// ============= End On Click Events =================//

//========= End Document Ready Function =============//
});