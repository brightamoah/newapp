import express from 'express';
import https from 'https';
// import cors from 'cors';
// import path from 'path';
const app = express();
const port = 3000;

// app.use((cors));
app.get('/paystack', (req, res) => {
    // res.send('Hello from Node.js!');
    // const https = require('https')

    const params = JSON.stringify({
        "email": req.query.email,
        "amount": req.query.amount,
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: 'Bearer sk_test_2fceb3e464ec59cd4d1b44823bec9ebe5f4a13e0',
            'Content-Type': 'application/json'
        }
    }

    const reqpaystack = https.request(options, respaystack => {
        let data = ''

        respaystack.on('data', (chunk) => {
            data += chunk
        });

        respaystack.on('end', () => {
            res.send(data)
            console.log(JSON.parse(data))
        })
    }).on('error', error => {
        console.error(error)
    })

    reqpaystack.write(params)
    reqpaystack.end()
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});