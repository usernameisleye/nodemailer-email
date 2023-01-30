const http = require('http');
const url = require('url');
const fs = require('fs');
const nodeMailer = require('nodemailer');

//NODEMAILER PACKAGE
const port = 5000

const transporter = nodeMailer.createTransport({})

const server = http.createServer((req, res) =>{
    let reqUrl = url.parse(req.url, true).pathname;
    if(reqUrl === '/'){
        res.writeHead(200, { "Content-Type": "text/html" })
            fs.readFile('index.html', (err, data) =>{
                if (err) throw err;
                res.end(data.toString());
            })
    }else if(reqUrl === '/sendmail'){
        const {name, email, about} = url.parse(req.url, true).query;

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'adeleyeadesida@gmail.com',
                pass: 'peugsseixeqtdujd'
            }
        })

        const mailOptions = {
            from: 'adeleyeadesida@gmail.com',
            to: email,
            subject: "What's good gee",
            html: `<h2>Hello ${name}</h2> <br/> 
            <p>Here's what I wanna say, so listen!</p> <br/> <br/>
             <p>${about}</p> <br/> <br/> 
             <p>Yeah that it, by <a href="https://github.com/usernameisleye">Leye</a></p> <br/> <br/>
              <small><b>Courtesy of <a href="https:/
              /nodemailer.com/about">NODEMAILER</a></b></small>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                res.writeHead(400, { "Content-Type": "text/html" });
                res.write(`<h1 style="color: #720026;">Error: Error sending you a mail</h1>`);
                res.end();
                console.log(info.response);
            }else{
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(`<h1 style="color: #90A959;">Sucess: Check your mail, an e-mail has been sent</h1>`);
                res.end();
                console.log(info.response);
            }
        })
    }else{
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(`<h1 style="color: #720026;">Error: Error 404, Not Found</h1>`);
        res.end();
    }

}).listen(port, () => {
    console.log(`Server is running on port ${port}`);
})