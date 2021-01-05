const mongoose = require('mongoose');
const router = require('express').Router();   
const UserList = require('../models/UserList');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/add_user', upload.single('file'),function(req, res, next){
    console.log(req.body);
    const {name,email} = req.body;

        const newUserList = new UserList({
            name:name,
            email: email,
            photo:req.file.filename
    
        });
    
        try {
        
            newUserList.save()
                .then((user) => {
                    res.json({ success: true, user: user });
                });
    
                
    
        } catch (err) {
            
            res.json({ success: false, msg: err });
        
        }

});


router.delete('/delete_user',function(req, res){
    const { userId} = req.body;
        try {
            UserList.deleteOne({_id:userId }).then(
                () =>{
                res.json({ success: true, msg: "user removed" });
            });
                
    
        } catch (err) {
            
            res.json({ success: false, msg: err });
        
        }

});

router.get('/get_userlist',(req,res)=>{

    UserList.find({
    })
    .then(results =>{
        res.json(results);
    })
});


module.exports = router;