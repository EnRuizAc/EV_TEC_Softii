import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    res.send("Get base");
});

router.get("/pago", (req, res) => {
    res.send("Get pay");
});

router.post("/pago", (req, res) => {
    res.send("Save pay");
});

export default router;