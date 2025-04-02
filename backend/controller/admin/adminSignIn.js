const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const AdminModel = require('../../models/Admin')

const adminSignInController = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(username,password)
        const admin = await AdminModel.findOne({ username })
        if (!admin) {
            return res.status(400).json({
                message: "Admin not found",
                error: true,
                success: false
            })
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
                error: true,
                success: false
            })
        }
        const token = jwt.sign(
            { adminId: admin._id },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: '1d' }
        )
        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        res.status(200).json({
            message: "Admin signed in successfully",
            error: false,
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Error signing in admin",
            error: true,
            success: false
        })
    }
}

module.exports = adminSignInController