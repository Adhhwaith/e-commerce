const bcrypt = require('bcryptjs');
const AdminModel = require('../../models/Admin');

const adminSignUpController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await AdminModel.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists",
                error: true,
                success: false
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        const admin = new AdminModel({
            username,
            password: hashedPassword
        });

        await admin.save();

        res.status(201).json({
            message: "Admin created successfully",
            error: false,
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "Error creating admin",
            error: true,
            success: false
        });
    }
};

module.exports = adminSignUpController;