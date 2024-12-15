import express from "express";
import Product from "../../models/product.model";
import { Request, Response } from "express";
import sequelize from "../sequelize/sequelize";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, description, image, select, order } = req.body;

  if (!name || !price) {
    res.status(400).json({ error: "Name and Price are required" });
    return;
  }

  try {
    const isSelect = select === 'true' || select === true;

    const orderValue = order !== undefined ? parseInt(order, 10) : null; // اگر order مقدار نداشته باشد، مقدار null می‌دهیم

    const productDetails = {
      price,
      description,
      image,
    };

    const newProduct = await Product.create({
      name,
      details: productDetails,
      select: isSelect,
      order: orderValue, 
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).send("Internal server error");
  }
};


export const findAllProduct = async (req: Request, res: Response): Promise<void> => {
  const { showName, showPrice, showImage, showDescription } = req.query;

  try {
    const [products] = await sequelize.query('SELECT * FROM products');
    
    console.log("Fetched Products:", products);

    const formattedProducts = (products as any[]).map((product) => {
      const details = typeof product.details === 'string' ? JSON.parse(product.details) : product.details || {};

      const productData: any = {};

      if (showName === 'true') productData.name = product.name;
      if (showPrice === 'true' && details.price) productData.price = details.price;
      if (showImage === 'true' && details.image) productData.image = details.image;
      if (showDescription === 'true' && details.description) productData.description = details.description;

      productData.id = product.id;

      return productData;
    });

    console.log("Formatted Products:", formattedProducts);

    res.render('products', {
      title: 'Products List',
      products: formattedProducts,
    });

  } catch (err) {
    console.error('Error retrieving products:', err);
    res.status(500).send('Internal server error');
  }
};


export const updateProductOrder = async (req: Request, res: Response): Promise<void> => {
  const { reorderedIds } = req.body;

  console.log(reorderedIds)

  if (!reorderedIds || reorderedIds.length === 0) {
    res.status(400).json({ error: 'No product order provided.' });
    return;
  }

  const validIds = reorderedIds.filter((id: string) => !isNaN(Number(id)) && id.trim() !== "");

  if (validIds.length === 0) {
    res.status(400).json({ error: 'Invalid product IDs provided.' });
    return;
  }

  try {
    const updatePromises = validIds.map((id: string, index: number) => {
      return Product.update(
        { order: index + 1 },
        { where: { id: id } }
      );
    });

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Product order updated successfully.' });
  } catch (err) {
    console.error('Error updating product order:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
