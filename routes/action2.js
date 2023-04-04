import express from 'express'
import {UploadDoc,getDoc,GetNessus,GetAllScans,GetAScan} from '../controllers/action2.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.post('/upload',auth,UploadDoc)
router.get('/getDoc',auth,getDoc)
router.get('/getToken',auth,GetNessus)
router.post('/getScans',auth,GetAllScans)
router.post('/getscandet',auth,GetAScan)


export default router