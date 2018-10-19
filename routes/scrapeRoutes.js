//=======================================These are tools for Scraping the Web====================================//

// Axios is a promised-based http library, similar to jQuery's Ajax method that works on the client and the server
var axios = require("axios");

//Cheerio
var cheerio = require("cheerio");

// Require all models
var db = require("../models");
//===========================================End Tools for Scraping the Web=====================================//

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index");
    });

    // app.get("/savedarticles", function (req, res) {
    //     res.render("savedarticles");
    // });

    // app.get("/404", function (req, res) {
    //     res.render("404");
    // });

    // app.get("/scrape", function (req, res) {
    //     res.render("scrape");
    // });



    // A GET route for scraping the brothersbrick website
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("http://bricknerd.com/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("div.post").each(function (i, element) {
                // Save an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .find("h1")
                    .text();
                result.link = $(this)
                    .find("a")
                    .attr("href");
                result.date = $(this)
                    .find("time")
                    .attr("datetime");
                result.summary = $(this)
                    .find("p")
                    .text();
                result.image = $(this)
                    .find("img")
                    .attr("src");

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });

            // If we were able to successfully scrape and save an Article, send a message to the client
            // res.send("Scrape Complete!");
            res.redirect("/articles");

        });
    });

    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        // TODO: Finish the route so it grabs all of the articles
        db.Article.find({})
            .then(function (dbArticle) {
                res.render("articles", {
                    articles: dbArticle
                });
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/savedarticles/:id", function (req, res) {
        // TODO
        // ====
        // Finish the route so it finds one article using the req.params.id,
        db.Article.findOne({
                _id: req.params.id
            })
            // and run the populate method with "note",
            .populate("note")
            .then(function (dbArticle) {
                // then responds with the article with the note included
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/savedarticles/:id", function (req, res) {
       
        // save the new note that gets posted to the Notes collection
        // then find an article from the req.params.id
        // and update it's "note" property with the _id of the new note
        db.Note.create(req.body).then(function (dbNote) {
                return db.Article.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    note: dbNote._id
                }, {
                    new: true
                });
            }).then(function (dbArticle) {
                res.json(dbArticle)
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    //================ Route for Saving Articles to Saved Articles Page ==================
    app.get("/savedarticles", function (req, res) {

        db.Article.find(         
            {
                saved: true
            })
            .then(function (dbArticle) {              
                    
                    res.render("savedarticles", {
                        savedArticles: dbArticle
                    })
                })
            
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/savedarticles/:id", function(req, res) {
        console.log(req.params.id);
        db.Article.update({_id: req.params.id},{saved: true})
        .then(function(result) {
            res.redirect("/savedarticles")
        })
        .catch(function(err) {
            res.json(err);
        });
    });





};