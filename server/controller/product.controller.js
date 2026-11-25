import {Product} from "../model/product.model.js";
import{uploadOnCloudinary} from "../config/cloudinary.config.js";
import fs from "fs";

const getProducts=async(req,res)=>{
    try{
        const products=await Product.find({});

        return res.status(200).json({
            products
        })

    }catch(error){
        throw new Error(error)
    }
}

const getProductById=async(req,res)=>{
    const { id } = req.params;
    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({
                message:"Product does not exist"
            })
        }
        return res.status(200).json({product})
    }catch(error){
        throw new Error(error);
    }
}

const createProduct=async(req,res)=>{
    try {
        const {name, description, price, category, stock}=req.body;

        if (!req.file) {
            return res.status(400).json({
                message:"Product image is required."
            });
        }
        
        const result = await uploadOnCloudinary(req.file.path);
        if (!result) {
            return res.status(502).json({
                message: "Product image upload failed"
            });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            imageURL: result.url
        });

        return res.status(201).json({
            message:"Product created successfully",
            product:newProduct
        });
    } catch (error) {
        console.error("Create product error:", error);
        return res.status(500).json({
            message:"Product creation failed",
            error:error.message
        });
    }
}


const updateProduct=async(req,res)=>{
    const id=req.params.id;
    const {name,description, price,stock,category}=req.body;
    const product=await Product.findById(id);
    if(!product){
        return res.status(400).json({
            message:"Product does not exist"
        })
    }
    product.name= name || product.name,
    product.description= description || product.description,
    product.price= price || product.price,
    product.stock= stock || product.stock,
    product.category= category || product.category
    
   
    if(req.file){
        const result = await uploadOnCloudinary(req.file.path);
        if (!result) {
            return res.status(502).json({
                message: "Product image upload failed"
            });
        }
        product.imageURL =result.secure_url;
    }

    
    await product.save();
    return res.status(200).json({
        message:"Product updated successfully",
        product
    })

}

const deleteProduct=async(req,res)=>{
    const id=req.params.id;
    const product=await Product.findById(id);
    if(!product){
        return res.status(400).json({
            message:"Product does not exist"
        })
    }
    await product.deleteOne();
    return res.status(200).json({
        message:"Product deleted successfully"
    })
}

export {getProducts, getProductById, createProduct, updateProduct, deleteProduct}