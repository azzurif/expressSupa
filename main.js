const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 1234;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json());

app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res) => {
	res.send("/ Endpoint reach");
});

app.get("/users", async (req, res) => {
	const { data: users, error } = await supabase.from("users").select("*");

	if (error) {
		res.json({
			success: false,
			message: error.message,
		});
		return;
	}

	res.status(200).json({
		success: true,
		message: "get all users",
		data: users,
	});
});

app.get("/users/:id", async (req, res) => {
	const { data: user, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", req.params.id)
		.single();

	if (error) {
		res.json({
			success: false,
			message: error.message,
		});
		return;
	}

	res.status(200).json({
		success: true,
		message: "get user",
		data: user,
	});
});

app.post("/users", async (req, res) => {
	const { data, error } = await supabase
		.from("users")
		.insert(req.body)
		.select()
		.single();

	if (error) {
		res.json({
			success: false,
			message: error.message,
		});
		return;
	}

	res.status(200).json({
		success: true,
		message: "insert user",
		data: data,
	});
});

app.put("/users/:id", async (req, res) => {
	const { data, error } = await supabase
		.from("users")
		.update(req.body)
		.eq("id", req.params.id)
		.select()
		.single();

	if (error) {
		res.json({
			success: false,
			message: error.message,
		});
		return;
	}

	res.status(200).json({
		success: true,
		message: "user updated",
		data: data,
	});
});

app.delete("/users/:id", async (req, res) => {
	const { data, error } = await supabase
		.from("users")
		.delete()
		.eq("id", req.params.id)
		.select()
		.single();

	if (error) {
		res.json({
			success: false,
			message: error.message,
		});
		return;
	}

	res.status(200).json({
		success: true,
		message: "user deleted",
		data: data,
	});
});
