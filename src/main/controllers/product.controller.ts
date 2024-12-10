import express from "express";
import Product from "../../models/product.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/user.model";
import cookieParser from "cookie-parser";
import { Request, Response } from 'express'





export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  const { name, price, description, image, select, order } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and Price are required' });
  }

  try {
    const productDetails = {
      price,
      description,
      image,
    };

    const newProduct = await Product.create({
      name,
      details: productDetails,
      select: select || false, 
      order: order || false, 
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};




export const getProducts = async (req: Request, res: Response): Promise<Response> => {
  const { showPrice, showImage } = req.query;

  try {
    const products = await Product.findAll();

    const formattedProducts = products.map((product) => {
      const { name, details, select, order } = product;

      const price = select ? details.price : undefined;
      const image = order ? details.image : undefined;

      return {
        name,
        price,
        image,
        description: details.description,
      };
    });

    return res.status(200).json({
      products: formattedProducts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};



export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { select, order } = req.body; 

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.select = select !== undefined ? select : product.select;
    product.order = order !== undefined ? order : product.order;

    await product.save();

    return res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};
