import express from "express";
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';


const app = new express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(userRoutes);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});