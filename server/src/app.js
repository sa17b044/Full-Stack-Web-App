// console.log('test');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express();
//jason data
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send({
        msg : 'Hello sara'
    })
})


app.listen(process.env.PORT || 8081);
console.log('http://localhost:8081');




