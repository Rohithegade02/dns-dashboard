import express from "express";
import { createDNSRecord, deleteDNSRecord, getAllDNSRecord,  updateDNSRecord } from "../controller/dnsController.js";


const router = express.Router();

router.get("/hostedZones/:hostedZoneId", getAllDNSRecord);
router.post("/add", createDNSRecord);
 router.put("/update/:id", updateDNSRecord);
router.delete("/delete/:id", deleteDNSRecord);

export default router;