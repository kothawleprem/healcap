var axios = require('axios');
var qs = require('qs');
var nodemailer = require('nodemailer')
const Data  = require('./model/userSchema');
const FileModel = require('./model/fileSchema')
const hbs = require('nodemailer-express-handlebars')

class GmailAPI {
    getAccessToken = async () => {
        var data = qs.stringify({
  'client_id': '880517164838-alpq40bb55eu75ldpjtqk2r4ve7ehnqc.apps.googleusercontent.com',
  'client_secret': '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',
  'refresh_token': '1//0g6fiXAWqx99OCgYIARAAGBASNwF-L9IrBEYtHBR2o_IRy9hVcyX_gKVNoBz_9rKGK4uG3MEVGVl9bBbo5b5PsPMXEitacnkI7WA',
  'grant_type': 'refresh_token' 
});
var config = {
  method: 'post',
  url: 'https://accounts.google.com/o/oauth2/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
  },
  data : data
};

var accessToken = ""

await axios(config)
.then(async function (response) {
//   console.log(JSON.stringify(response.data));
  accessToken = await response.data.access_token
//   console.log(accessToken)
})
.catch(function (error) {
  console.log(error);
});
    return accessToken
    }

    searchGmail = async (searchItem) => {
            var config1 = {
            method: 'get',
            url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages?q='+searchItem,
            headers: { 
                'Authorization': `Bearer ${await this.getAccessToken()}`
            }
            };

            var threadId = ""

            await axios(config1)
            .then(async function (response) {
            console.log("Searched Results:" + JSON.stringify(response.data));
            threadId = await response.data['messages'][0].id
            console.log("ThreadId="+threadId)
            })
            .catch(function (error) {
            console.log(error);
            });
            return threadId
    }

    readGmailContent = async (messageId) => {
    

        var config2 = {
        method: 'get',
        url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
        headers: { 
            'Authorization': `Bearer ${await this.getAccessToken()}`
        }
        };

        var data = {}

        await axios(config2)
        .then(async function (response) {
            data = await response.data
        })
        .catch(function (error) {
        console.log('error',error);
        });
        return data

    }

    readInboxContent = async (searchItem)=> {
        const threadId = await this.searchGmail(searchItem)
        const message = await this.readGmailContent(threadId) 
        console.log('message',message)
        const encodedMessage = await message.payload['parts'][0].body.data
        const decodedStr = Buffer.from(encodedMessage,"base64").toString("ascii")
        // console.log(decodedStr)
        return decodedStr
    }

    sendGmail = async (referenceno) => {
        try{
            const accessToken = await this.getAccessToken()
            console.log(accessToken)
            const transport = nodemailer.createTransport({
                service : 'gmail',
                auth:{
                    type:'OAuth2',
                    user:'healcaptechnologies@gmail.com',
                    clientId:'880517164838-alpq40bb55eu75ldpjtqk2r4ve7ehnqc.apps.googleusercontent.com',
                    clientSecret:'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',
                    refreshToken:"1//0g6fiXAWqx99OCgYIARAAGBASNwF-L9IrBEYtHBR2o_IRy9hVcyX_gKVNoBz_9rKGK4uG3MEVGVl9bBbo5b5PsPMXEitacnkI7WA",
                    accessToken:accessToken
                }
            })
            // http://localhost/?code=4/0AX4XfWhEtYqR8aCG8nywfVX5KjAE-tQEXgbYuphjLjSXBAofIet-AL6P0fMTWPyaZ7a0RA&scope=https://mail.google.com/
            // transport.use('compile',hbs({
            //     viewEngine:'express-handlebars',
            //     defaultLayout: false,
            //     viewPath:'./views/'
            // }))
                console.log('referenceno',referenceno)
                const fileResult = await FileModel.find({'referenceno:':referenceno})
                console.log('fileresult',fileResult)
                const fileData = fileResult[0].image
                const filePath = "http://localhost:5000/" + fileData.slice(8)
                console.log('filePath',filePath)
                const dataResult = await Data.find({'preauth.referenceno':referenceno},{})
                const preauthData = dataResult[0].preauth
                
                // console.log(preauthData)
                var insurancecom = ""
                var hname = ""
                var policyno = ""
                var admissiontype = ""
                var gender = ""
                var address = ""
                var drname= ""
                var patientname = ""
                var pemail =""
                var dob = ""
                var city = ""
                var pincode = ""
                var dateadmission = ""
                var mob = ""
                var state = ""
                var treatment = ""
                var adharno = ""

                for(let i=0;i<preauthData.length;i++)
                {
                    console.log(preauthData[i].referenceno)
                    if(preauthData[i].referenceno == referenceno)
                    {
                        hname = dataResult[0].name
                        insurancecom = preauthData[i].insurancecom
                        policyno = preauthData[i].policyno
                        admissiontype = preauthData[i].admissiontype
                        gender = preauthData[i].gender
                        address = preauthData[i].address
                        drname= preauthData[i].drname
                        patientname = preauthData[i].patientname
                        pemail = preauthData[i].pemail
                        dob = preauthData[i].dob
                        city = preauthData[i].city
                        pincode = preauthData[i].pincode
                        dateadmission = preauthData[i].dateadmission
                        mob = preauthData[i].mob
                        state = preauthData[i].state
                        treatment = preauthData[i].treatment
                        adharno = preauthData[i].adharno

                    }
                }
                var toemail = ""
                var companyName = ""
                var htmlTemplate = `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <style>
                                table {
                                    font-family: arial, sans-serif;
                                    border-collapse: collapse;
                                    width: 100%;
                                    }

                                td, th {
                                    border: 1px solid #dddddd;
                                    text-align: left;
                                    padding: 8px;
                                    }

                                tr:nth-child(even) {
                                    background-color: #dddddd;
                                    }
                            </style>
                        </head>
                        <body>
                        <h2>From ${hname}, for ${referenceno}</h2>
                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td>Patient Reference Number</td>
                                <td>${referenceno}</td>
                            </tr>
                            <tr>
                                <td>Patient Name</td>
                                <td>${patientname}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>${gender}</td>
                            </tr>
                            <tr>
                                <td>Policy Number</td>
                                <td>${policyno}</td>
                            </tr>
                            <tr>
                                <td>Doctor Name</td>
                                <td>${drname}</td>
                            </tr>
                            <tr>
                                <td>Patient Email</td>
                                <td>${pemail}</td>
                            </tr>
                            <tr>
                                <td>Date of Birth</td>
                                <td>${dob}</td>
                            </tr>
                             <tr>
                                <td>Address</td>
                                <td>${address}</td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>${city}</td>
                            </tr>
                            <tr>
                                <td>Pincode</td>
                                <td>${pincode}</td>
                            </tr>
                            <tr>
                                <td>State</td>
                                <td>${state}</td>
                            </tr>
                            <tr>
                                <td>Mobile Number</td>
                                <td>${mob}</td>
                            </tr>
                            
                            <tr>
                                <td>Date of Admission</td>
                                <td>${dateadmission}</td>
                            </tr>
                            <tr>
                                <td>Type of Admission</td>
                                <td>${admissiontype}</td>
                            </tr>
                            <tr>
                                <td>Treatment</td>
                                <td>${treatment}</td>
                            </tr>
                            <tr>
                                <td>Aadhar Number</td>
                                <td>${adharno}</td>
                            </tr>
                            <tr>
                                <td>Attachment</td>
                                <td>${filePath}</td>
                            </tr>
                        </table>
                        </body>
                    </html>
                       `
                if (insurancecom == "1"){
                toemail = "hdfchealcap@gmail.com"
                companyName = "HDFC Insurance"
                }
                else if (insurancecom == "2"){
                toemail = "icicihealcap@gmail.com"
                companyName = "ICICI Insurance"
                }
                else if (insurancecom == "3"){
                toemail = "bajajhealcap@gmail.com"
                companyName = "Bajaj Insurance"
                }
                else if (insurancecom == "4"){
                toemail = "starhealcap@gmail.com"
                companyName = "STAR Insurance"
                }
                else{
                    toemail = "reliancehealcap@gmail.com"
                    companyName = "Reliance Insurance"
                }
         
                const mailOptions = {
                from:'HealCap India <healcaptechnologies@gmail.com>',
                to: toemail,
                subject:`Hello ${companyName}, HealCap here!`,
                html:htmlTemplate

            }
            const result = await transport.sendMail(mailOptions)
             return result
            
            
        }catch(error){
            return 'Invalid Reference Id'
        }
    }
}

module.exports = new GmailAPI()