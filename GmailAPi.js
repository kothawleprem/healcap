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
  'refresh_token': '1//0gSe6BCkDQ0FKCgYIARAAGBASNwF-L9IrSKJQiDIWuZL7U7fbTK5FQJ0T1x3qF_UdOHZMv3zTv3G7BGu5gyuOaVeO0zg2HlpGp_M',
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
            // console.log("Searched Results:" + JSON.stringify(response.data));
            threadId = await response.data['messages'][0].id
            // console.log("ThreadId="+threadId)
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
        console.log(error);
        });
        return data

    }

    readInboxContent = async (searchItem)=> {
        const threadId = await this.searchGmail(searchItem)
        const message = await this.readGmailContent(threadId) 
        const encodedMessage = await message.payload['parts'][0].body.data
        const decodedStr = Buffer.from(encodedMessage,"base64").toString("ascii")
        // console.log(decodedStr)
        return decodedStr
    }

    sendGmail = async (uid) => {
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
                    refreshToken:"1//0gSe6BCkDQ0FKCYIARAAGBASNwF-L9IrSKJQiDIWuZL7U7fbTK5FQJ0T1x3qF_UdOHZMv3zTv3G7BGu5gyuOaVeO0zg2HlpGp_M",
                    accessToken:accessToken
                }
            })
            
            // transport.use('compile',hbs({
            //     viewEngine:'express-handlebars',
            //     defaultLayout: false,
            //     viewPath:'./views/'
            // }))
           
                const fileResult = await FileModel.find({'uid':uid},{})
                const fileData = fileResult[0].image
                const filePath = "http://localhost:5000/" + fileData.slice(8)
            
                const dataResult = await Data.find({'preauth.uid':uid},{})
                const preauthData = dataResult[0].preauth
                // console.log(preauthData)
                var agencyid = ""
                for(let i=0;i<preauthData.length;i++)
                {
                    console.log(preauthData[i].uid)
                    if(preauthData[i].uid == uid)
                    {
                        agencyid = preauthData[i].agencyid
                        console.log(agencyid)
                    }
                }
                var toemail = ""
                var htmlTemplate = ''
                if (agencyid == 1){
                toemail = "kothawleprem@gmail.com"
                htmlTemplate = `
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
                        <h2>From {Hospital Name}, for ${uid}</h2>
                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td>{Patient UID}</td>
                                <td>${uid}</td>
                            </tr>
                            </table>
                        <h3> Attachment: ${filePath} </h3>
                            </body>
                            </html>
                       `
                }
                else{
                    toemail = "techbayindia@gmail.com"
                    htmlTemplate = `
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
                        <h2>From {Hospital Name}, for ${uid}</h2>
                        <table>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td>{Patient UID}</td>
                                <td>${uid}</td>
                            </tr>
                            </table>

                            </body>
                            </html>
                       `
                }
                // console.log('toemail',toemail)
         
                const mailOptions = {
                from:'HealCap India <healcaptechnologies@gmail.com>',
                to: toemail,
                subject:`Hello Company ${agencyid}`,
                html:htmlTemplate

            }
            const result = await transport.sendMail(mailOptions)
             return result
            
    
            
            // const mailOptions = {
            //     from:'HealCap India <healcaptechnologies@gmail.com>',
            //     to:toemail,
            //     subject:"Hello user",
            //     text:textmail
                
            // }

            
            // const result = await transport.sendMail(mailOptions)
           
            // return result
            
        }catch(error){
            return error
        }
    }
}

module.exports = new GmailAPI()