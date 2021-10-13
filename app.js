const dotenv = require("dotenv");
const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const multer = require('multer');
const Data = require('./model/userSchema');
const FileModel = require('./model/fileSchema')
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
      const result = await User.find()
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
    await User.updateOne(
        {
            'preauth.uid':uid
        }
        ,{$set:{'preauth.$.state':result}})
    res.json('ok')
  }  
//   res.send('updated')
readMail()

})


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null , file.originalname );
    }
});

const upload = multer({ storage: storage })

// Parse JSON

app.use(express.json());

// Use CORS

app.use(cors());

// Serve Static Files

app.use(express.static('uploads'));

// Creating connection to our Mongo Database



  app.post('/', upload.single('file'), async(req, res, next) => {
    const uid = req.body.uid
    const file = req.file
    console.log("file",file)
    console.log('uid',uid)
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next("hey error")
    }
      
      
      const imagepost= new FileModel({
        image: file.path,
        uid:uid
      })
      const savedimage= await imagepost.save()
      res.json(savedimage)
    
  })

    app.get('/image',async(req, res)=>{
   const image = await FileModel.find()
   res.json(image)
   
  })






app.listen(5000 , () => {
    console.log('server is running');
})

