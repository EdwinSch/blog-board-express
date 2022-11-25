// requires
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

// filler textcontent
const homeStartingContent = "Navigate to the compose page to post a tweety on the board."
const aboutContent = "Tofu messenger bag sustainable butcher waistcoat occupy glossier, seitan JOMO readymade banh mi biodiesel kale chips adaptogen activated charcoal. Mumblecore hella pug, PBR&B listicle activated charcoal snackwave lomo meh drinking vinegar. Deep v ennui cold-pressed vice. Williamsburg flexitarian copper mug, scenester art party kickstarter chicharrones pork belly."
const contactContent = "Art party cloud bread Brooklyn banh mi small batch gochujang. Enamel pin migas paleo, offal praxis umami butcher four loko. 3 wolf moon glossier brunch kickstarter deep v chambray seitan bitters street art church-key. Tbh locavore Brooklyn, shoreditch tattooed YOLO marfa palo santo praxis pabst microdosing. Vaporware fingerstache listicle keytar wolf selfies meditation cloud bread yuccie hashtag small batch prism flexitarian tofu."
// set GLOBAL variables
let posts = [];


// invoke express on app variable
const app = express();
// set EJS
app.set('view engine', 'ejs'); 
// Use body parser
app.use(bodyParser.urlencoded({extended: true}));
// Serve static files in public folder
app.use(express.static("public"));

/* ---- Get routes && Render/Serve pages ---- */

// get home (root) route (req/res sequence matters!)
app.get("/", function(req, res) {
    // serve(render) pageName from views folder, content literal
    res.render("home", {
        homeContent: homeStartingContent,
        posts: posts,
    });
})

app.get("/about", function(req, res) {
    res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function(req, res) {
    res.render("contact", {contactContent: contactContent});
})

// serve compose blog page only (not in NAV)
app.get("/compose", function(req, res) {
    res.render("compose");
})

/* ---- Post Actions (user clicks submit button) ---- */

// get compose route
app.post("/compose", function(req, res) {
    // get the input form value using body parser from compose page and store to object
    let post = {
        title: req.body.postTitle,
        content: req.body.postText
    };
    // push each single post to posts array
    posts.push(post)

    // send user back to homepage (root) route
    res.redirect("/")
});

// get dynamic pages route (for blog posts)
app.get("/posts/:postName", function(req,res) {
    // store requested route and convert to lowercase without symbols
    let requestedTitle = _.lowerCase(req.params.postName);
        posts.forEach(post => {
            // store title from array and convert to lowercase
            let storedTitle = _.lowerCase(post.title);
            // check for identical titles
            if (storedTitle === requestedTitle) {
                // if true: render post page with title and content
                res.render("post", {
                    title: post.title,
                    content: post.content
                })
            } else {
                console.log("404 page not found");
            }
        });
})

/* ---- Functions ---- */



// log server run on port 3000
app.listen(3000 || process.env.PORT, function() {
    console.log("server runnning port 3000");
})