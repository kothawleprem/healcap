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
app.use(cors())



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

// `http://localhost:5000/read?name=${name}`
app.get('/read',(req,res) =>{
  const name = req.query.name
  const getDocument = async () => {
      const dataResult = await Data.find({name:name})
      const preauthData = dataResult[0]
      const result = preauthData['preauth']
      res.json(result)
  }
  getDocument()
})

app.get('/stats',(req,res) => {
  const name = req.query.name
  const getStats = async () => {
    const dataResult = await Data.find({name:name})
    const preauthData = dataResult[0]
    const result = preauthData['preauth']
    var accepted = 0
    var pending = 0
    var nodata = 0
    for(let i=0;i<result.length;i++){
      let val = result[i].status
      console.log(val)
      if(val == undefined){
        nodata = nodata + 1
      }
      else if(val.includes('Accepted')){
        accepted = accepted + 1
      }
      else if(val.includes('Pending')){
        pending = pending + 1
      }
      else{
        nodata = nodata + 1
      }
    }
    res.json({
      'accepted':accepted,
      'pending':pending,
      'nodata':nodata
    })
  }
  getStats()
})


app.get('/sendEmail',(req,res) => {
    const referenceno = req.query.referenceno
    console.log('referenceno1',typeof(referenceno))
    if(referenceno === 'null')
    {
      console.log('wait')
      res.send('Enter Valid Reference Number')
    }
    else{
          const sendMail = async () => {
        console.log('inSendMail')
    await gmail.sendGmail(referenceno).then(
    result => console.log('Status: ',result)
    ).catch((error)=> console.log(error))
    res.json('OK')
}
sendMail()
    }
})



var status = ""
app.get('/checkmail',(req,res) => {
  const referenceno = req.query.referenceno
  console.log('checking for',referenceno)
  const readMail = async () => {
    result = await gmail.readInboxContent("Reference: "+referenceno)
    // console.log(result)
    await Data.updateOne(
        {
            'preauth.referenceno':referenceno
        }
        ,{$set:{'preauth.$.status':result}})
    res.json('Status Updated')
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
    const referenceno = req.body.referenceno
    const file = req.file
    console.log("file",file)
    console.log('referenceno',referenceno)
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next("hey error")
    }
      
      
      const imagepost= new FileModel({
        image: file.path,
        referenceno:referenceno
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

