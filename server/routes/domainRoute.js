import express from "express"
import multer from 'multer';
import { bulkUploadDomain, createDomain, deleteDomain, getAllDomains, updateDomain } from "../controller/domainController.js"
const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.get('/getdomain', getAllDomains)
router.post('/createdomain', createDomain)
router.post('/createdomain/bulkupload', upload.single('file'),bulkUploadDomain)
router.put('/updatedomain/:hostedZoneId',updateDomain)
router.delete('/deletedomain/:hostedZoneId',deleteDomain)
export default router