const app = require('./server/server');
const port = 5000;

app.get('/',(req,res)=>{
    res.status(200).send("Welcome")
})

app.listen(process.env.PORT || port, (req, res) => {
    console.log(`Server Started On http://localhost:${process.env.PORT || port}`);
})