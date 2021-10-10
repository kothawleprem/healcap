const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const Data = require('./model/userSchema');
const app = express();

dotenv.config({ path: './config.env'});
require('./db/conn');
var gmail = require("./GmailAPi")

app.use(cookieParser());
app.use(express.json());



app.use(require('./router/auth'));




app.get('/', (req, res) => {
    res.send('Hello World ')
}
);

// app.get('/about',(req, res) => {
//     res.send('Hello about World ')
// }
// );

// app.get('/contact',(req, res) => {
//     res.cookie("jwtoken",'shubham')
//     console.log("contact us !!");
//     res.send('Hello contact World ')
// }
// );

app.get('/login', (req, res) => {
    res.send('Hello login  World ')
}
);

app.get('/singin', (req, res) => {
    res.send('Hello  singin World ')
}
);


app.get('/read',(req,res) =>{
  const getDocument = async () => {
      const result = await Data.find()
      // console.log(result)
      res.json(result)
  }
  getDocument()
})


app.get('/sendEmail',(req,res) => {
    const uid = req.query.uid
    console.log(uid)
    const sendMail = async () => {
        console.log('inSendMail')
    await gmail.sendGmail(uid).then(
    result => console.log('Email sent..',result)
    ).catch((error)=> console.log(error))
    res.send('OK')
}
sendMail()
})



var status = ""
app.get('/checkmail',(req,res) => {
  const uid = req.query.uid
  const readMail = async () => {
    result = await gmail.readInboxContent("UID: "+uid)
    // console.log(result)
    await Data.updateOne(
        {
            'preauth.uid':uid
        }
        ,{$set:{'preauth.$.state':result}})
    res.json('ok')
  }  
//   res.send('updated')
readMail()

})



app.listen(5000 , () => {
    console.log('server is running');
})
