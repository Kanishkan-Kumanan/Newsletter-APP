// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app =express();
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
})

app.post("/",function(req,res){
    const Fname = req.body.fname
    const Lname = req.body.lname
    const Email = req.body.email

    var data = {
        members:[
            {
                email_address: Email,
                status:"subscribed",
                merge_fields:{
                    FNAME : Fname,
                    LNAME: Lname
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    var url =  'https://us6.api.mailchimp.com/3.0/lists/e1f1562e9b'
    var options = {
        method: "POST",
        auth:"kanishk6:330e51d91dc8020f3b8f983097b70ec9-us6"
    }

   const request = https.request(url, options, function(response){
if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
}
else{
    res.sendFile(__dirname + "/failure.html");
}

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
})

app.get("/failure",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on local host:3000");
})

// API key: 330e51d91dc8020f3b8f983097b70ec9-us6
// list_id : e1f1562e9b