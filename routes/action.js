import express from 'express'
import {AddConnector,getZabbix,getKibana,SendEmail,AwsS3,AwsEc2,getAWS} from '../controllers/action.js'
import auth from '../middleware/auth.js'
const router = express.Router();

router.post('/connector',auth,AddConnector)
// router.post('/authzab',postAuth)
router.get('/zabbix',auth,getZabbix)
router.get('/kibana',auth,getKibana)
router.get('/aws',auth,getAWS)
router.post('/email',auth,SendEmail)
router.post('/awss3',auth,AwsS3)
router.post('/awsec2',auth,AwsEc2)

export default router