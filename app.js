const express = require("express");
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
  }));

//const mailchimpTx = require("mailchimp_transactional")("d7423d3c1ab15b88b37587b317ea8503-us8");
const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({apiKey: "d7423d3c1ab15b88b37587b317ea8503-us8",  server: "us8",});



app.listen(process.env.PORT || 3000, function() {
    console.log("server is running");
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    //console.log(req.body.fName);
    
    var data = {    
        email_address: req.body.email,
        status: "subscribed",
        merge_fields: {
            FNAME: req.body.fName,
            LNAME: req.body.lName
        }
    };
    //var jsonData = JSON.stringify(data);
    
   signUp(data, res);
   console.log("audience sent");

})

async function signUp(data, res) {
    try {

        const response = await client.lists.addListMember("4b452805d0", data);
        console.log(response);
        res.sendFile(__dirname + "/success.html");
    } catch (err) {
        console.log(err.status);
        res.sendFile(__dirname + "/failure.html");
    }
    
}
//api key
//d7423d3c1ab15b88b37587b317ea8503-us8

//id for list?
//4b452805d0