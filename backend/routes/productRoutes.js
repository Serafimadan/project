import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getRandomProducts,
  getAllProducts,
  verifyProduct,
  rejectProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id/verify').put(protect, verifyProduct)
router.route('/:id/reject').put(protect, rejectProduct)
router.get('/top', getTopProducts)
router.get('/random', getRandomProducts)
router.get('/all', getAllProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
