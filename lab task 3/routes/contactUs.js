var express=require('express');
const ContactUs=require('../models/contactus');
var router=express.Router();

router.get('/contactus', (req, res) => {
    res.render('contactus');
  });
router.post('/contactus',async(req,res)=>{
try {
    const { name, email, message } = req.body;
    const newContact = new ContactUs({ name, email, message });
await newContact.save();
   res.redirect('/contactus?success=true');

    
} catch (error) {
    console.error('Error saving visitor:', error);
    res.status(500).send('Error saving visitor');
}
})
module.exports=router;

// const express = require('express');
// const Contact = require('../models/contact');
// const router = express.Router();

// // Render the contact us page
// router.get('/contactus', (req, res) => {
//     res.render('contactus');
// });

// // Handle contact form submission
// router.post('/contactus', async (req, res) => {
//     try {
//         const { name, email, message } = req.body;
//         const newContact = new Contact({ name, email, message });
//         await newContact.save();
//         res.redirect('/contactus?success=true');
//     } catch (err) {
//         console.error('Error saving contact form:', err);
//         res.status(500).send('Error saving contact form');
//     }
// });

// module.exports = router;
