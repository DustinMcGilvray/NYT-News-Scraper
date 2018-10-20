$(document).ready(function () {

  //========================= Semantic UI ===========================//



  //======================== End Semantic UI =======================//


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

  // ======== Make Note Button =========//
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

  // ============ Submit Note Button ========== //
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
    }).then(function (data) {
      console.log(data);
    })
  });

  // ============ Review Note Button ========== //
  $(".review-note").on("click", function (event) {
    event.preventDefault();
    $(".review-modal").modal("show");
    console.log("review note button is working");
    var reviewNote = $(this).attr("data-id");
    console.log(reviewNote);
    $.ajax({
      method: "GET",
      url: "/note/:id" + reviewNote
    }).then(function (data) {

    })
  });

  // ============= Delete Saved Article Button ========= //
  $(".delete-article").on("click", function (event) {
    console.log("delete article button is working");
    var deleteArticle = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/delete/" + deleteArticle
    }).done(function (data) {
      window.location = "/savedarticles"
    })
  });

  // ============= End On Click Events ================= //

  //========= End Document Ready Function =============//
});