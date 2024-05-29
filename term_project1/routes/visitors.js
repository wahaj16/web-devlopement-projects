var express = require('express');
const Visitors = require('../models/visitors');
const bwipjs = require('bwip-js');
var router = express.Router();

router.get('/view.html', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = 10; 
      const totalDocuments = await Visitors.countDocuments();
      const totalPages = Math.ceil(totalDocuments / limit);
      const visitors = await Visitors.find()
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.render('viewVisitors', { visitors, currentPage: page, totalPages });
    } catch (err) {
      console.error('Error retrieving visitors:', err);
      res.status(500).render('error');
    }
  });
  const generateBarcode = (text) => {
    return new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: 'code128',       
        text: text,            
        scale: 3,              
        height: 10,            
        includetext: true,     
        textxalign: 'center',  
      }, (err, png) => {
        if (err) {
          reject(err);
        } else {
          resolve(png.toString('base64'));
        }
      });
    });
  };

  router.post('/visitorForm.html', async (req, res) => {
    try {
       
       const visitor = new Visitors(req.body);
       const barcode = await generateBarcode(visitor.phone);
    visitor.barcode = barcode;
    

      await visitor.save();
      res.redirect(`/visitor/${visitor._id}`);
    
    } catch (err) {
      console.error('Error saving visitor:', err);
      res.status(500).send('Error saving visitor');
    }
  });
  router.get('/visitor/:id', async (req, res) => {
    try {
      const visitor = await Visitors.findById(req.params.id);
      if (!visitor) {
        return res.status(404).send('Visitor not found');
      }
      res.render('printVisitor', { visitor });
    } catch (err) {
      console.error('Error retrieving visitor:', err);
      res.status(500).send('Error retrieving visitor');
    }
  }); 
  router.get('/searchVisitor/:phone', async (req, res) => {
    try {
      const phoneNumber = req.params.phone;
      console.log("phonenumber",phoneNumber);

      const visitor = await Visitors.findOne({phone: phoneNumber }, 'name designation occupation');
      console.log("get method",visitor)
      if (!visitor) {
        return res.status(404).send('Visitor not found');
      }
  
      res.json(visitor);
    } catch (err) {
      console.error('Error retrieving visitor:', err);
      res.status(500).send('Error retrieving visitor');
    }
  });
 




 
  
  module.exports = router;


