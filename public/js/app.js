$(document).ready(function () {

  // ======================= On Click Events =======================//

  //======== Save Article Button ========//
  $(".save-article").on("click", function (event) {
    console.log("save article button is working");
    var savedArticle = $(this).attr("data-id");
    console.log(savedArticle);
    $.ajax({
      method: "POST",
      url: "/savedarticles/" + savedArticle
    }).then(function (data) {
      // location.reload()
      if (data.success) {
        console.log("SUCCESS!")
      } else {
        console.log("SAD DAY!")
      }
    })
  });

    // ============= Delete Saved Article Button ========= //
    $(".delete-article").on("click", function (event) {
      console.log("delete article button is working");
      var deleteArticle = $(this).attr("data-id");
      $.ajax({
        method: "POST",
        url: "/deletearticle/" + deleteArticle
      }).done(function (data) {
        window.location = "/savedarticles"
      })
    });

  // ============= Make Note Button ==================================//
  $(".make-note").on("click", function (event) {
    var makeNote = $(this).attr("data-id");
    $("#" + makeNote).modal("show");
    console.log("make note button is working");
    console.log(makeNote);
    $.ajax({
      method: "GET",
      url: "/articles/" + makeNote
    }).then(function (data) {

    })
  });

  // ============ Submit Note Button ============================ //
  $(".submit-note").on("click", function (event) {
    // event.preventDefault();
    console.log("submit comment button is working");
    var submitNote = $(this).attr("data-id");
    console.log(submitNote);
    $.ajax({
      method: "POST",
      url: "/articles/" + submitNote,
      data: {
        author: $("#name_" + submitNote).val(),
        body: $("#text_" + submitNote).val()
      }
    }).then(function (data) {})
  });

  // ============ Review Note Button ======================== //
  $(".review-note").on("click", function (event) {
    var reviewNote = $(this).attr("data-id");
$(".review-modal").modal("show");
    console.log("review note button is working");
    console.log(reviewNote);
    $.ajax({
      method: "GET",
      url: "/articles/" + reviewNote
    }).then(function (data) {

    })
  });

// =============== Delete Note Button ==================== //
$(".delete-note").on("click", function (event) {
  event.preventDefault();
  console.log("delete note button is working");
  var deleteNote = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/deletenote/" + deleteNote
  }).done(function (data) {
    window.location = "/savedarticles"
  })
});

// ============= End On Click Events ================= //

//========= End Document Ready Function =============//
});