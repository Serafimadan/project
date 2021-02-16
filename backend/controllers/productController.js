import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";
import {
  createNotification,
  createValidateArtNotification,
  notificationForUserCreateArt,
} from "./notificationController.js";

// Check if users have 2 reviews or more to mark them as experts.
const markUserAsExpert = async (userId) => {
  const allProducts = await Product.find();

  const user = await User.findById(userId);

  const reviewsArray = allProducts
    .map((product) => product.reviews)
    .filter((review) => review.length > 0);

  const allReviews = [].concat.apply([], reviewsArray);

  const userReviews = allReviews.filter(
    (review) => review.user.toString() === userId.toString()
  );

  if (userReviews.length > 2) {
    user.isExpert = true;
    await user.save();
  }
};

const getProducts = asyncHandler(async (req, res) => {

  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const { location, minPrice, maxPrice, style, sorts } = req.query
  const price = minPrice && maxPrice ? { minPrice, maxPrice } : false

  const sortItems = {
    BestRating: { type: "rating", order: -1 },
    HighestPrice: { type: "price", order: -1 },
    LowestPrice: { type: "price", order: 1 },
    Newest: { type: "createdAt", order: -1 },
  };

  const sortType = sorts
    ? [[sortItems[sorts].type, sortItems[sorts].order]]
    : "";
    

  const keyword =
    req.query.keyword && req.query.keyword.trim() !== ""
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
      
  //  gte = greater than or equal
  //  lte = lesser than or equal
  //  lt = lesser than
  //  gt = greater than
  //  in = to match values
  const filterObj = {
    ...keyword,
    ...(location && { country: { $in: location } }),
    ...(style && { style: { $in: style } }),
    ...(price && {
      price: {
        $gte: price.minPrice,
        $lte: price.maxPrice,
      },
    }),
  };

  const count = await Product.countDocuments({
    $and: [
      filterObj,
      { "validation.status": { $nin: ["pending", "rejected"] } },
    ],
  });
  const products = await Product.find({
    $and: [
      filterObj,
      { "validation.status": { $nin: ["pending", "rejected"] } },
    ],
  })
    .sort(sortType)
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Delete product: DELETE /api/products/:id (private/Admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {

    if (product.validation.status === 'validated') {
      createNotification(req.user._id, product.id, 'removed', product.name)
    } else {
      null

    }

    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Create product: POST /api/products (private/Admin)
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    medium,
    subject,
    country,
    category,
    countInStock,
  } = req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    brand,
    medium,
    subject,
    country,
    category,
    countInStock,
    numReviews: 0,
    description,
  });
  const createdProduct = await product.save();
  notificationForUserCreateArt(
    req.user._id,
    req.user._id,
    createdProduct._id,
    `You added a new art, ${createdProduct.name}`
  );
  createValidateArtNotification(
    req.user._id,
    createdProduct._id,
    createdProduct.name
  );

  res.status(201).json(createdProduct);
});

// Update product: PUT /api/products/:id (private/Admin)
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  const oldProductName = product.name;
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    createNotification(req.user._id, product.id, "updated", oldProductName);

    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Create new review: POST /api/products/:id/reviews (private)
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    if (!rating) {
      throw new Error("Please select one of the rating options");
    }

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    createNotification(req.user._id, product.id, "reviewed", product.name);

    markUserAsExpert(req.user._id);

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Get top rated products: GET /api/products/top (public)
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(6);
  res.json(products);
});

const verifyProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const user = await User.findById(req.user._id);
  const notification = await Notification.findById(req.body.notificationId);

  if (product) {
    product.validation.status = "validated";
    product.validation.message = `Art is verified by expert ${user.name}`;
    const verifiedProduct = await product.save();
    await notification.remove();
    notificationForUserCreateArt(
      req.user._id,
      product.user,
      product._id,
      `${user.name} validated your art, ${product.name}`
    );

    createNotification(
      product.user,
      product._id,
      'added new art, ',
      product.name
    )

    res.json(verifiedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const rejectProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const user = await User.findById(req.user._id);
  const notification = await Notification.findById(req.body.notificationId);

  if (product) {
    product.validation.status = "rejected";
    product.validation.message = req.body.message;
    const verifiedProduct = await product.save();
    await notification.remove();
    notificationForUserCreateArt(
      req.user._id,
      product.user,
      product._id,
      `${user.name} rejected your art, ${product.name}`
    );
    res.json(verifiedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Get random rated products: GET /api/products/random (public)
const getRandomProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ country: "", category: "" })
    .limit(4);
  res.json(products);
});

// Get random rated products: GET /api/products/all (public)
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json({ products });
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getRandomProducts,
  verifyProduct,
  rejectProduct,
  getAllProducts,
};
