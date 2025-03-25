const userModel = require('../../models/userModel')
const productModel = require('../../models/productModel')
// const userModel = require('../../models/userModel')

const orderConfirmed = async(req,res) => {
    try {
        const { userId, orderItems } = req.body

        if(!userId || !orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.json({
                success: false,
                message: "Invalid order data"
            })
        }

        // Find user and update order history
        const user = await userModel.findById(userId)
        
        if(!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        // Update product stock and add orders to history
        for (const item of orderItems) {
            // Find the product
            const product = await productModel.findById(item.productId)
            
            if (!product) {
                return res.json({
                    success: false,
                    message: `Product ${item.productName} not found`
                })
            }

            console.log("Product stock:", product.stock)
            console.log("Requested quantity:", item.quantity)

            // Check if enough stock is available
            if (product.stock === undefined || product.stock === null || product.stock < item.quantity) {
                return res.json({
                    success: false,
                    message: `Insufficient stock for ${item.productName}. Available stock: ${product.stock || 0}`
                })
            }

            // Reduce stock
            product.stock = Number(product.stock) - Number(item.quantity)
            await product.save()
        }

        // Add new orders to order history
        const newOrders = orderItems.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            quantity: item.quantity,
            price: item.price,
            orderDate: new Date()
        }))

        user.orderHistory.push(...newOrders)
        await user.save()

        return res.json({
            success: true,
            message: "Order confirmed and added to history"
        })

    } catch (error) {
        console.error("Error in orderConfirmed:", error)
        return res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = orderConfirmed
