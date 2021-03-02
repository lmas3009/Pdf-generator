import Express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Billing from './model/billing.js'
import Userinfo from './model/userinfo.js'

var app = Express()
var port = process.env.PORT || 3001

app.use(Express.json())
app.use(Cors())




var url = "mongodb+srv://Ecommerce-billing:aR5nU8hzvv46EIOU@cluster0.z0voz.mongodb.net/pdfdata?retryWrites=true&w=majority"

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.get("/", (req, res) => {
    res.send("Welcome to new tutorial of Generating the Pdf from the data of api")
})


app.post("/billing_add", function(req, res) {
    const dbfeed = req.body
    console.log(dbfeed);
    try {
        Billing.create(dbfeed, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
    } catch (error) {
        console.log(error);
    }
})

app.get("/billing", function(req, res) {
    try {
        Billing.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(data)
        }
    })
    } catch (error) {
        console.log(error);
    }
})

app.post("/userinfo_add", function(req, res){
    const dbfeed = req.body
    console.log(dbfeed);
    try {
        Userinfo.create(dbfeed, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
    } catch (error) {
        console.log(error);
    }
})

app.get("/userinfo", function(req, res) {
    try {
        Userinfo.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(data)
        }
    })
    } catch (error) {
        console.log(error);
    }
})
app.get("/userinfo_username/:name", function (req, res) {
    try {
        Userinfo.find({ Username: req.params.name },(err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(data)
        }
    })
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log("listening on port:",port);
})