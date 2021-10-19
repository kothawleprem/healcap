const express = require("express");
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
require('../db/conn');



//HOME PAGE
router.get('/', (req, res) => {
    res.send('Hello World from router js ')
}
);

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill the field properly" })
    }
    try {

        const userExist = await User.findOne({ email: email });


        if (userExist) {
            return res.status(422).json({ error: "emil already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            //
            await user.save();
            res.status(201).json({ message: "User register successfull" });
        }
    } catch (err) {
        console.log(err);
    }


    // console.log(name);
    // res.send("mera registration page");
    // res.json({message: req.body});
});


//login route

router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message:"awasom"});
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "plz Filled the  data" })
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);

        if(userLogin){

     const isMatch = await bcrypt.compare(password, userLogin.password);

    token = await userLogin.generateAuthToken();
     console.log(token);
//
     res.cookie("jwtoken", token, {
         expires: new Date(Date.now()+ 25892000000),
         httpOnly:true
     });

     if (!isMatch) {
         res.status(400).json({ error: "Invalid credientials" });
     } else {
         res.json({ message: "user signin successfully" });
     }
        } else{
            res.status(400).json({ error: "Invalid credientials" });

        }
 
    

    } catch (err) {
        console.log(err);
    }
});

//about us 
 
 router.get("/about", authenticate, (req, res) => {
        // console.log('Hello about World ');
         res.send(req.rootUser);
      });  

// contact us page 

router.post('/contact', authenticate, async(req, res) => {
    try{

    const { name, email, phone, message} = req.body;
    
    if (!name|| !email ||!phone || !message) {
        console.log("erro in contact");
        return res.json({ error: "plzz filled the contact form"});
    }

    const userContact = await User.findOne({ _id: req.userID});

    if (userContact) {
        const userMessage =  await userContact.addMessage(name,email,phone,message);

        await userMessage.save();
        res.status(201).json({ message: "user contact succesfully"});
    }
    }catch (error) {
        console.log(error);
    }

   
});

 router.get('/getdata', authenticate , (req, res) => {
    console.log('Authenticated')
    res.send(req.rootUser);
 });


//logout 

router.get("/logout",(req, res) => {
    console.log('Hello logout page ');
    res.clearCookie('jwtoken', { path: '/'});
     res.status(200).send('user logout');
  });  




//   //preauth 

 router.post('/preauth',  authenticate,async (req, res) => {

     try {
         const { referenceno, policyno,admissiontype,gender,address,
            drname,pfname, pmname, psname, pemail, dob, city,
            pincode, dateadmission, insurancecom,  patientname,
            mob, state, treatment, uid,adharno} = req.body;

        //  if (!referenceno|| !policyno ) {
        //     console.log("erro in preauth");
        //     return res.json({ error: "plzz filled the preauth form"});
        // }
    
      
        const userPreauth = await User.findOne({ _id: req.userID});
        if (userPreauth) {
         const userFrom =  await userPreauth.addPreauth(referenceno, policyno,admissiontype,gender,address,
            drname,pfname, pmname, psname, pemail, dob, city,
            pincode, dateadmission, insurancecom,  patientname,
            mob, state, treatment, uid,adharno );

         await userFrom.save;
         res.status(201).json({ message: "user preauth succesfully"});
     }
         
        
        
     } catch (err) {
         console.log(err);
  }
 });




module.exports = router;


// try {

//     const userExist = await User.findOne({ email: email });


//     if (userExist) {
//         return res.status(422).json({ error: "emil already exist" });
//     } else if (password != cpassword) {
//         return res.status(422).json({ error: "password are not matching" });
//     } else {
//         const user = new User({ name, email, phone, work, password, cpassword });

//         //

//         await user.save();
//         res.status(201).json({ message: "User register successfull" });
//     }
// } catch (err) {
//     console.log(err);
// }


// User.findOne({ email: email })
// .then((userExist) => {
//     if(userExist) {
//     return res.status(422).json({error:"emil already exist"})
//          }else if(password != cpassword) {
//              return res.status(422).json({error:"password are not matching"});
//          } else{
//             const user = new User({ name, email, phone , work, password, cpassword});

//             //

//          await user.save();
//                 res.status(201).json({ message: "User register successfull" });
//          }

//    }).catch((err) => res.status(500).json({ error: "fail to register"}));
// }).catch(err => {console.log(err)});
