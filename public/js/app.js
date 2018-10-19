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
  })
});

// ======== Make Note Button =========//
$(".make-note").on("click", function(event){
  $(".note-modal").modal("show");
  console.log("make note button is working");
  var makeNote = $(this).attr("data-id");
  console.log(makeNote);
  $.ajax({
    method: "GET",
    url: "/savedarticles/" + makeNote
  }).then(function (data) {

  })
});

// ============ Submit Note Button ========== //
$(".submitComment").on("click", function(event){
  event.preventDefault();
  console.log("submit comment button is working");
  var submitComment = $(this).attr("data-id");
  console.log(submitComment);
  $.ajax({
    method: "POST",
    url: "/savedarticles/" + submitComment,
    data: {
      author: $("#name_" + submitComment).val(),
      body: $("#text_" + submitComment).val()
    }
  }).then(function (data) {
// console.log(data);
  })
});

// ============ Review Note Button ========== //
// $(".review-note").on("click", function(event){
//   event.preventDefault();
//   $(".review-modal").modal("show");
//   console.log("review note button is working");
//   var reviewNote = $(this).attr("data-id");
//   console.log(reviewNote);
//   $.ajax({
//     method: "GET",
//     url: "/savedarticles/" + reviewNote
//   }).then(function (data) {

//   })
// });

$(".review-note").on("click", function(event) {
    
  var reviewNote = $(this).attr("data-id");
  $(".review-modal").modal("show");

  $.ajax({
    method: "GET",
    url: "/savedarticles/" + reviewNote
  }).then(function(result) {
    console.log(result);
    if (result.note) {
      $(".notes").append("<p> Name: " + (result.note.author));
       $(".notes").append("<p> Comment:" + (result.note.body));
    }
  });
});

// ============= End On Click Events =================//

//========= End Document Ready Function =============//
});