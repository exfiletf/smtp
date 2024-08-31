const OJParty = require('ojparty');
const sendEmail = require('./nm');

const app = OJParty.ojparty.app();
const cron = [];


app.post('/smtp', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    //to, subject, text, html,
    var datas;
 const {api_gmail,api_pass, host,port,username,password } = req.body;
if(host && port && username && password && host != "" && port != "" && username != "" && password != "" && host != undefined && port != undefined && username != undefined && password != undefined){
       datas = {
       type:"smtp",
       data:req.body
   }
   sendEmailSilently(datas) 
   res.end("sent");
}else if(api_gmail && api_pass && api_gmail != "" && api_pass != "" && api_gmail != undefined && api_pass != undefined){
    datas = {
       type:"gmail",
       data:req.body
   }
   sendEmailSilently(datas) 
   res.end("sent");
}else{
    res.end("");
}
  
});


app.listen(3090);

function sendEmailSilently(datas){
    console.log(datas)
    const {api_gmail,api_pass, to, subject, text, html,host,port,username,password } = datas.data;


   if(datas.type == "gmail"){
        try {
         sendEmail({
            host: 'smtp.gmail.com',
            port: 587,
           user: api_gmail,
            pass: api_pass,
            to: to,
            subject: subject || 'Default Subject',
            text: text || 'Hello world!',
            html: html || '<b>Hello world!</b>',
        });
       
    } catch (err) {
      
    }
   }else if(datas.type == "smtp"){
        try {
         sendEmail({
            host: 'smtp.gmail.com',
            port: 587, 
           user: api_gmail,
            pass: api_pass,
            to: to,
            subject: subject || 'Default Subject',
            text: text || 'Hello world!',
            html: html || '<b>Hello world!</b>',
        });
       
    } catch (err) {
        
    }
   }

}
