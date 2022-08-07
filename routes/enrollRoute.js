const router=require('express').Router()

const { enroll__course__controller } = require('../controllers/enrollController')
//const {enroll__course__controller }= require('../client/src/pages/All-Courses/CardOfCourse/enrollController')
const {requireLogin}=require('../middlewares/requireLogin')


router.post('/',requireLogin,enroll__course__controller)
//router.put('/',requireLogin,enroll__course__controller)
module.exports=router