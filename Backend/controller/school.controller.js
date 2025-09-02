import conn from "../db/conn.js";
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "schoolImages/"); // images will go inside uploads/
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
});

export const upload = multer({ storage: storage });

export const addSchool = async (req, res) => {
    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file ? `/schoolImages/${req.file.filename}` : null;

    if (!name || !address || !city || !state || !contact || !image || !email_id) {
        return res.status(422).json({ message: "Please fill all the fields" });
    }

    try {
        conn.query("SELECT * FROM schools WHERE email_id = ?", [email_id], (err, result) => {
            if (err) {
                console.error("Error checking school:", err);
                return res.status(500).json({ message: "Database error" });
            }

            if (result.length) {
                return res.status(422).json({ message: "This school is already added" });
            }

            conn.query(
                "INSERT INTO schools SET ?",
                { name, address, city, state, contact, image, email_id },
                (err, result) => {
                    if (err) {
                        console.error("Insert error:", err);
                        return res.status(500).json({ message: "Failed to add school" });
                    }
                    return res.status(201).json({ message: "School added successfully", data: req.body });
                }
            );
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getAllSchools = async (req, res) => {
    try {
        const [results] = await conn.promise().query("SELECT * FROM schools");
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};