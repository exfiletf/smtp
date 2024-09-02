const OJParty = require('ojparty');
const sendEmail = require('./nm');

var cron = [];
const app = OJParty.ojparty.app();


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
   cron.push(datas);
   res.end('send');
}else if(api_gmail && api_pass && api_gmail != "" && api_pass != "" && api_gmail != undefined && api_pass != undefined){
    datas = {
       type:"gmail",
       data:req.body
   }
   cron.push(datas);
   res.end('send'); 
}else{
    res.end();   
}
    
   
});


app.listen(3090);

var sending  = false;
setInterval(async function(){
    console.log('Sending ', sending, 'Cron ',JSON.stringify(cron));
    if(cron.length > 0 && sending == false){
        sending = true;
        if(cron[0].type == "gmail"){
         
           
        try{
            const secure = (cron[0].data.secure != undefined)?cron[0].data.secure:false;
            const from  = (cron[0].data.from != undefined)?`${cron[0].data.from} <${cron[0].data.api_gmail}>`:cron[0].data.api_gmail;
            console.log(from)
       await sendEmail({
                host: 'smtp.gmail.com',
                port:(secure)?465:587,// 587,
               user: cron[0].data.api_gmail,
                pass: cron[0].data.api_pass,
                to: cron[0].data.to,
                from:from,
                subject: cron[0].data.subject || 'Default Subject',
                text: cron[0].data.text || 'Hello world!',
                html: cron[0].data.html || '<b>Hello world!</b>',
            },secure);
          //  console.log("Sent!!!")
            cron = cron.slice(1,cron.length);
            sending = false;
        }catch(e){
       //  console.log(e)
         cron = cron.slice(1,cron.length);
         sending = false;
        }
    }else{
       
        try{
            const secure = (cron[0].data.secure != undefined)?cron[0].data.secure:false;
            const from  = (cron[0].data.from != undefined)?`${cron[0].data.from} <${cron[0].data.username}>`:cron[0].data.username
            await sendEmail({
                     host: cron[0].data.host,
                     port: cron[0].data.port,
                    user: cron[0].data.username,
                     pass: cron[0].data.password,
                     to: cron[0].data.to,
                     from:from,
                     subject: cron[0].data.subject || 'Default Subject',
                     text: cron[0].data.text || 'Hello world!',
                     html: cron[0].data.html || '<b>Hello world!</b>',
                 },secure);
               //  console.log("Sent!!!")
                 cron = cron.slice(1,cron.length);
                 sending = false;
             }catch(e){
           //   console.log(e)
              cron = cron.slice(1,cron.length);
              sending = false;
             }
    }
    }
},3000);
