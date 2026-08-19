const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());


// ================= DATABASE =================
mongoose
    .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    })
    .then(() => {
        console.log("MongoDB Connected Successfully ✅");
    })
    .catch((error) => {
        console.error("========== MONGODB ERROR ==========");
        console.error(error.name);
        console.error(error.message);
        console.error("==================================");
    });


// ================= USER MODEL =================

const User = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },

            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true
            },

            password: {
                type: String,
                required: true
            },

            college: {
                type: String,
                default: "Bansal Institute of Engineering and Technology"
            }
        },
        {
            timestamps: true
        }
    )
);


// ================= POST MODEL =================

const Post = mongoose.model(
    "Post",
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true
            },

            content: {
                type: String,
                required: true
            },

            category: {
                type: String,
                default: "Community"
            },

            author: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true
        }
    )
);


// ================= HOME =================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "🎓 UniBuddy Backend is Working!"
    });

});


// ================= HEALTH =================

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "UniBuddy API is Healthy 🚀"
    });

});


// ================= SIGNUP =================

app.post("/api/auth/signup", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            college
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, email and password are required"

            });

        }


        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be at least 6 characters"

            });

        }


        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(409).json({

                success: false,

                message:
                    "Email already registered"

            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user =
            await User.create({

                name,

                email,

                password: hashedPassword,

                college:
                    college ||
                    "Bansal Institute of Engineering and Technology"

            });


        const token =
            jwt.sign(

                {
                    id: user._id,

                    email: user.email

                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }

            );


        res.status(201).json({

            success: true,

            message:
                "Account created successfully 🎉",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                college: user.college

            }

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Server error"

        });

    }

});


// ================= LOGIN =================

app.post("/api/auth/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required"

            });

        }


        const user =
            await User.findOne({ email });


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        const token =
            jwt.sign(

                {
                    id: user._id,

                    email: user.email

                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }

            );


        res.json({

            success: true,

            message:
                "Login successful 🎉",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                college: user.college

            }

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Server error"

        });

    }

});


// ================= GET POSTS =================

app.get("/api/posts", async (req, res) => {

    try {

        const posts =
            await Post.find()
                .sort({
                    createdAt: -1
                })
                .limit(50);


        res.json({

            success: true,

            posts

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Unable to load posts"

        });

    }

});


// ================= CREATE POST =================

app.post("/api/posts", async (req, res) => {

    try {

        const {
            title,
            content,
            category,
            author
        } = req.body;


        if (!title || !content || !author) {

            return res.status(400).json({

                success: false,

                message:
                    "Title, content and author are required"

            });

        }


        const post =
            await Post.create({

                title,

                content,

                category:
                    category || "Community",

                author

            });


        res.status(201).json({

            success: true,

            message:
                "Post created successfully 🎉",

            post

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Unable to create post"

        });

    }

});


// ================= DELETE POST =================

app.delete("/api/posts/:id", async (req, res) => {

    try {

        const post =
            await Post.findByIdAndDelete(
                req.params.id
            );


        if (!post) {

            return res.status(404).json({

                success: false,

                message:
                    "Post not found"

            });

        }


        res.json({

            success: true,

            message:
                "Post deleted successfully"

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Unable to delete post"

        });

    }

});


// ================= SERVER =================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `UniBuddy server running on port ${PORT}`
        );

    }
);
