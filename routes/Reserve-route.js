const express = require("express");
const Reserve = require("../controllers/Reserve-controller");
const router = express.Router();

router.post("/:uid", Reserve.bill);
router.get("/user/:uid", Reserve.getBillByUserId);
router.get("/:billId", Reserve.getBillByID);
router.delete("/:billId", Reserve.deleteBill);

module.exports = router;