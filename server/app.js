const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product");
const router = express.Router();

app.use(cors());
const dbURL = "mongodb+srv://mucahit:12345@cluster0.qlbn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected"))
    .catch((err) => console.log(err));




app.post('/app/:id', (req, res) => {

    const { id } = req.params;
    const product = new Product({

        id: id,
        isFavorite: true,

    })

    product.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err)
        })
});



app.delete('/app/:id', async (req, res) => {

    const { id } = req.params;
    try{
        const deletedData = await Product.deleteMany({ id: req.params.id });
        res.status(200).send(deletedData);

    } catch (err) {
        console.log('error', err)
        res.status(500).json({error:'There was a Server Side Error!'})
     }
        
});



app.get("/app", async (req,res) => {
    try {
        const result = await Product.find({})
        
        //console.log('success', result)
        res.json({message: "Todo Was Update successfully!", result })
    } catch (err) {
       console.log('error', err)
       res.status(500).json({error:'There was a Server Side Error!'})
    }

  
})

app.listen(port,()=> {
    console.log("listening");
});
