const User = require('../../models/userModel');

const adminOrdersController = async (req, res) => {
    try {
        // Find all users and select only name, email and orderHistory
        console.log("Fetching all users with order history"); // For debugging
        const users = await User.find({}, 'name email orderHistory');
        
        // Extract all orders with user info
        const allOrders = [];
        users.forEach(user => {
            if (user.orderHistory && user.orderHistory.length > 0) {
                user.orderHistory.forEach(order => {
                    allOrders.push({
                        userName: user.name,
                        userEmail: user.email,
                        ...order.toObject()
                    });
                });
            }
        });

        console.log("all orders",allOrders); // For debugging
        
        return res.status(200).json({
            message: "Orders fetched successfully",
            orders: allOrders,
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Error fetching orders",
            success: false
        });
    }
};

module.exports = adminOrdersController;