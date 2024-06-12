const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
	"mongodb+srv://fero:ff123@cluster0.xz8l06p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
);

app.get("/", (req, res) => {
	res.send("Express App is running");
});

const storage = multer.diskStorage({
	destination: "./upload/images",
	filename: (req, file, cb) => {
		return cb(
			null,
			`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
		);
	},
});

const upload = multer({ storage: storage });
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
	res.json({
		success: 1,
		image_url: `http://localhost:${port}/images/${req.file.filename}`,
	});
});

const Product = mongoose.model("Product", {
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	new_price: {
		type: Number,
		required: true,
	},
	old_price: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	available: {
		type: Boolean,
		default: true,
	},
});

app.post("/addproduct", async (req, res) => {
	try {
		let products = await Product.find({});
		let id;
		if (products.length > 0) {
			let last_product_array = products.slice(-1);
			let last_product = last_product_array[0];
			id = last_product.id + 1;
		} else {
			id = 1;
		}
		const product = new Product({
			id: id,
			name: req.body.name,
			image: req.body.image,
			category: req.body.category,
			new_price: req.body.new_price,
			old_price: req.body.old_price,
		});
		await product.save();
		console.log("Product saved:", product);
		res.json({
			success: true,
			name: req.body.name,
		});
	} catch (error) {
		console.error("Error adding product:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/removeproduct", async (req, res) => {
	try {
		await Product.findOneAndDelete({ id: req.body.id });
		console.log("Product removed:", req.body.id);
		res.json({
			success: true,
		});
	} catch (error) {
		console.error("Error removing product:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.get("/allproducts", async (req, res) => {
	try {
		let products = await Product.find({});
		console.log("All products fetched:", products.length);
		res.json(products); // Send the products array as JSON
	} catch (error) {
		console.error("Error fetching products:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

const User = mongoose.model("User", {
	name: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	cartData: {
		type: Object,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

app.post("/signup", async (req, res) => {
	try {
		let check = await User.findOne({ email: req.body.email });
		if (check) {
			return res.status(400).json({
				success: false,
				errors: "Existing user found with email address",
			});
		}
		let cart = {};
		for (let i = 0; i < 100; i++) {
			cart[i] = 0;
		}
		const user = new User({
			name: req.body.username,
			email: req.body.email,
			password: req.body.password,
			cartData: cart,
		});
		await user.save();

		const data = {
			user: {
				id: user.id,
			},
		};
		const token = jwt.sign(data, "secret_ecom");
		res.json({ success: true, token });
	} catch (error) {
		console.error("Error during signup:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.post("/login", async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			const passMatch = req.body.password === user.password;
			if (passMatch) {
				const data = {
					user: {
						id: user.id,
					},
				};
				const token = jwt.sign(data, "secret_ecom");
				res.json({ success: true, token });
			} else {
				res
					.status(401)
					.json({ success: false, errors: "Password Doesn't Match" });
			}
		} else {
			res
				.status(404)
				.json({ success: false, errors: "Unrecognized Email Address" });
		}
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.get("/newcollections", async (req, res) => {
	let products = await Product.find({});
	let newcollection = products.slice(1).slice(-8);
	console.log("New Collection fetched");
	res.send(newcollection);
});
app.get("/popular", async (req, res) => {
	let products = await Product.find({ category: "men" });
	let popular = products.slice(0, 4);
	console.log("Popular Products fetched");
	res.send(popular);
});
const fetchUser = async (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) {
		res.status(401).send({ errors: "Please authenticate using valid login" });
	} else {
		try {
			const data = jwt.verify(token, "secret_ecom");
			req.user = data.user;
			next();
		} catch {
			res.status(401).send({ errors: "please authenticate using valid token" });
		}
	}
};

app.post("/addtocart", fetchUser, async (req, res) => {
    console.log(req.body, req.user)
	let userData = await User.findOne({ _id: req.user.id });
	userData.cartData[req.body.itemId] += 1;
	await User.findOneAndUpdate(
		{ _id: req.user.id },
		{ cartData: userData.cartData },
	);
	res.send("Added");
});
app.post("/removefromcart", fetchUser, async (req, res) => {
	let userData = await User.findOne({ _id: req.user.id });
	if (userData.cartData[req.body.itemId] > 0) {
		userData.cartData[req.body.itemId] -= 1;
	}
	await User.findOneAndUpdate(
		{ _id: req.user.id },
		{ cartData: userData.cartData },
	);
	res.send("Removed");
});
app.post('/getcart', fetchUser, async(req, res) => {
    console.log("Get Cart")
    let userData = await User.findOne({_id: req.user.id})
    res.json(userData.cartData)
})

app.listen(port, (error) => {
	if (!error) {
		console.log("Server is Running on port " + port);
	} else {
		console.log("Error: " + error);
	}
});
