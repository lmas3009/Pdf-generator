import Express from 'express'
import fs from 'fs'
import path from 'path'
import request from 'request'

var app = Express()
app.set('view engine', 'pug');
var port = process.env.PORT || 3000
var __dirname = path.resolve();

app.use(Express.static(path.join(__dirname, 'public')));

var userdata = new Object();
var data123 = [];

function userinfo(data) {
    userdata.Username = data[0].Username
    data123.push(userdata.Username)
}



app.get("/:name", (req, res) => {
    var data = []
    request('http://localhost:3001/userinfo', function (error, response, body1) {
    if (!error && response.statusCode == 200) {
        // data.push(JSON.parse(body)[0])
        var userdetails = []
        var billingdetsils = []
        var date = new Date();
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var new_day;
        if (date.getDate() < 10) {
            new_day = "0" + date.getDate();
        }
        else {
            new_day = date.getDate();
        }
        var fulldate = date.getMonth()+'/'+ new_day+'/'+date.getFullYear()
        var data = JSON.parse(body1);
        data.forEach(element => {
            if (element.Username === req.params.name) {
                userdetails.push(element)
                request('http://localhost:3001/billing', function (error, response, body2) {
                    if (!error && response.statusCode == 200) {
                        var flag=1
                        var data = JSON.parse(body2);
                        data.forEach(element => {
                            if (element.Username === req.params.name) {
                                if (element.Checkout) {
                                    billingdetsils.push(element);
                                }
                            }
                        });
                        
                        res.render('template', {
                                        title: 'Billing Info',day:days[date.getDay()],date:fulldate,name: req.params.name, data: userdetails[0], cartinfo: billingdetsils,Gst: 50});
        
                    }
                    
                })
            }
            else {
                res.render('404')
            }
        });
        
        
    }
    })
    })


app.listen(port, () => {
    console.log("listening on port:",port);
})