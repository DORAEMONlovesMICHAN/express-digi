import express from 'express';

const app = express();


const port = 3000;

app.use(express.json()); // helps us read the json data the user is sending
let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas",(req,res) => {
    const {name,price} = req.body;
    const newTea = {id : nextId++,name,price};
    teaData.push(newTea);
    res.status(201).send(newTea);
});


// get all tea
app.get("/teas",(req,res) => {
    res.status(200).send(teaData);
});



//get a tead with id
app.get("/teas/:id",(req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id)); // params give it in string format,so we need to parse it to int;
    if (!tea) {
        return res.status(404).send("Hey tea not found !");
    }
    else{
        return res.status(200).send(tea);
    }
});

//update tea
app.put("/teas/:id",(req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Hey tea not found !");
    }
    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
});

//delete tea
app.delete("/teas/:id",(req,res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send('Tea not found !');
    }
    teaData.splice(index,1);
    res.status(200).send('deleted')
});



app.listen(port,() => {
    console.log(`Server is running at port : ${port}...`);
});