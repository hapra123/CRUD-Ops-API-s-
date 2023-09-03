const express= require('express')
const mongoose=require('mongoose')
const Product=require('./productModel')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/',(req,res)=>{
  res.send('Hello node api')

})
app.delete('/products/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Cannot find any product" });
        }
        const updatedProducts = await Product.find({});
        res.status(200).json({
            message: `Product=${product.name} with Price=${product.price}Rs successfully deleted`,
            remainingData: updatedProducts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.put('/products/update/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const produc=await Product.findByIdAndUpdate(id,req.body);
        if(!produc)  {
            return res.status(404).json({messege: 'cannot find any product with ID'})
        }
        const updated=await Product.findById(id); 
        res.status(200).json(updated);
    } catch (error) {
        res.status (500).json({messge:error.messege})

    }
})
app.get('/products/find/:id',async(req,res)=>{
   try {
    const {id}=req.params;
    const produc=await Product.findById(id)
    res.status(200).json(produc)
   } catch (error) {
    res.status (500).json({messge:error.messege})
   }
}
)
app.get('/products/findall',async(req,res)=>{
    try {
        const products=await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status (500).json({messge:error.messege})

    }
}
)
app.post('/products/create',async(req,res)=>{
  try {
    const product=await Product.create(req.body)
    res.status(200).json(product);
  } catch (error) {
    console.log(error.messege);
    res.status(500).json({messege:error.messege})
  }
}
)


mongoose.connect('mongodb+srv://admin:admin@cluster0.mjsmqlz.mongodb.net/node?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000,()=>{
        console.log('Node API is running on port 3000')
       
       })
    console.log("Connected to db")
}).catch((error)=>{
    console.log("Error")
})

//hello