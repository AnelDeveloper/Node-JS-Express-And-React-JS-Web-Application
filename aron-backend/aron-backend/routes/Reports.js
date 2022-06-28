const express = require('express');
const router = express.Router();
const { Reports } = require('../models');
const {validateToken} = require('../services/JWT');
const multer = require('multer')
const path = require('path')
const fs = require('fs')



//by subcategory id
router.get('/subcategory/:SubcategoryId', async (req, res) => {
    const SubcategoryId = req.params.SubcategoryId;
    const reports = await Reports.findAll({where: {SubcategoryId: SubcategoryId}})
                            .then(function (categories) {
                                console.log(categories);
                                res.json(categories);
                            })
                            .catch(function (err) {
                                // every error
                                res.json(err);
                            });
});

//by report id
router.get('/report/:id', async (req, res) => {
    const id = req.params.id;
    const report = await Reports.findAll({ where: {id: id}})
                            .then(function (report) {
                                console.log(report);
                                res.json(report);
                            })
                            .catch(function (err) {
                                // every error
                                res.json(err);
                            });
});


//by report check status (not approoved by admin) - need to be checked
router.get('/tocheck', async (req, res) => {
    const reports = await Reports.findAll({ where: {check: 0}})
                            .then(function (reports) {
                                console.log(reports);
                                res.json(reports);
                            })
                            .catch(function (err) {
                                res.json(err);
                            });
});

//by report check status (approoved by admin) - that are approved
router.get('/', async (req, res) => {
    const reports = await Reports.findAll({ where: {check: 1}})
                            .then(function (reports) {
                                console.log(reports);
                                res.json(reports);
                            })
                            .catch(function (err) {
                                res.json(err);
                            });
});



//post new report
router.post("/", async (req, res) => {
    const {title, report_desc, SubcategoryId, check, img, address } = req.body;

    const menu = await Reports
                            .create({
                                title: title,
                                report_desc: report_desc,
                                SubcategoryId: SubcategoryId,
                                check: check,
                                img: img,
                                address:address,
                            })
                            .then(function (report) {
                                res.status(200).json({"msg": "SUCCESS", "report_id":report.id } );
                            })
                            .catch(function (err) {
                                res.status(400).json(err);
                            });
});

//DELETE report by admin
router.delete("/:id", validateToken, async (req, res) => {
    const id = req.params.id;

    const report = await Reports
                    .destroy({
                        where: { id: id },
                    })
                    .then(function(){
                        res.json({"msg": "SUCCESS"});
                    })
                    .catch(function (err) {
                        res.json(err);
                    });
});


//PUT / UPDATE the report check state to approve
router.put("/approve/:id", validateToken, async (req, res) => {
    const id = req.params.id;

    const report = await Reports.update({check:1}, {where: {id:id}})
                            .then(function() {
                                res.json({"msg":"SUCCESS"});
                            })
                            .catch(function (err) {
                                res.json(err);
                            });
    
});




//------img storage------
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name - where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname))
    }
})
 

var upload = multer({
    storage: storage
});

//POST body form data: image -> the image to upload; 
router.post("/image-upload", upload.single('image'), (req, res) => {
    if (!req.file) {
        res.json({"msg": "No file upload"});
    } else {
        res.json({"img_name": req.file.filename, "msg": "SUCCESS"});
    }
});




module.exports = router;


