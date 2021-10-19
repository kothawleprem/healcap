const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    phone: {
        type:Number,
        require:true
    },
    work: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    cpassword: {
        type:String,
        require:true
    },
    date: {
        type: Date,
        default:Date.now
    },
    preauth:[
        {
            referenceno:{
                type:Number,
                require:true
            },
            admissiontype:{
                type:String,
                require:true
            },
            gender:{
                type:String,
                require:true
            },
            address:{
                type:String,
                require:true
            },
            drname:{
                type:String,
                require:true
            },
            policyno:{
                type:Number,
                require:true
            },
            pemail:{
                type:String,
                require:true
            },
            dob:{
                type:String,
                require:true
            },
            city:{
                type:String,
                require:true
            },
            pincode:{
                type:String,
                require:true
            },
            dateadmission:{
                type:String,
                require:true
            },
            insurancecom:{
                type:String,
                require:true
            },
            patientname:{
                type:String,
                require:true
            },
            mob:{
                type:Number,
                require:true
            },
            state:{
                type:String,
                require:true
            },
            treatment:{
                type:String,
                require:true
            },
            adharno:{
                type:String,
                require:true
            },
            status:{
                type:String,
                require:true
            }
        }
    ],
    
   messages:[
       {
        name: {
            type:String,
            require:true
        },
        email: {
            type:String,
            require:true
        },
        phone: {
            type:Number,
            require:true
        },
        message: {
            type:String,
            require:true
        },
       },
   ],
  
    tokens: [
        {
            token:{
                type:String,
                require:true
            }
        }
    ]

});

//  userSchema.pre('save', async function (next) {
//     console.log("heloo bcrypt");
//      if (this.isModified('password'))
//      console.log("modify hogaya")
//       {
//        this.password = bcrypt.hash(this.password, 10);
//        this.cpassword = bcrypt.hash(this.cpassword, 10);

//     }
//      next();

//  });

  userSchema.pre('save', function(next) {
     if (!this.isModified('password')) {
          return next();
     }

    this.hashPassword(this.password)
         .then((password) => {
              this.password = password;
             next();
          });
  });

  userSchema.methods = {
      hashPassword(password) {
          return bcrypt.hash(password, 10);
      },
 }
///

 userSchema.pre('save', function(next) {
    if (!this.isModified('cpassword')) {
         return next();
    }

   this.hashPassword(this.cpassword)
        .then((cpassword) => {
             this.cpassword = cpassword;
            next();
         });
 });

 userSchema.methods = {
     hashPassword(cpassword) {
         return bcrypt.hash(cpassword, 10);
     },
}

//authtoken 

userSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token:token});
         await this.save();
         return token;

    } catch (err) {
        console.log(err);

    }
}


//store the messages

userSchema.methods.addMessage = async function(name, email, phone, message){
    try{
        this.messages = this.messages.concat({name, email, phone, message})
        await this.save();
        return this.message;
    } catch (error) {
        console.log(error)
    }
}


userSchema.methods.addPreauth = async function(referenceno, policyno,admissiontype,gender,address,
    drname,pfname, pmname, psname, pemail, dob, city,
    pincode, dateadmission, insurancecom,  patientname,
    mob, state, treatment, uid,adharno,status){
    try{
        this.preauth = this.preauth.concat({referenceno, policyno,admissiontype,gender,address,
            drname,pfname, pmname, psname, pemail, dob, city,
            pincode, dateadmission, insurancecom,  patientname,
            mob, state, treatment, uid,adharno,status})
        await this.save();
        return this.preauth;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('USER', userSchema);


module.exports = User;

