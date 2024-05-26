import express from 'express';
import Record from '../models/record.js';
import upload from '../middleware/upload.js';
import fs from 'fs';
import csvParser from 'csv-parser';

const router = express.Router();

//  storing all record
router.get('/', async (req, res) => {
  try {
    const records = await Record.find();
    res.json({
      sucess: true,
      message: records,
    });
  } catch (err) {
    res.status(500).json({
      
      message: err.message
    });
  }
});

// to create a new record
router.post('/add', async (req, res) => {
  const { domainUrl, recordType,name,value} = req.body;
  try {
    await Record.create({
        domainUrl, recordType,name,value
    });
 
    res.status(201).json({
      success: true,
      message: 'Record created  successfully',
      
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//to update the record
router.put('/update/:id', async (req, res) => {
  
    const { id } = req.params;
    const data = req.body;
    console.log(id)
        try {
           const updateRecord= await Record.findByIdAndUpdate(id, data, { new: true })
            res.status(201).json({
                success: true,
                message:updateRecord
            })
        } catch (err) {
            res.status(400).json({message:err.message})
        }
    
})
//to delete the record
router.delete('/delete/:id', async (req, res) => {
  
    const { id } = req.params;

    console.log(id)
        try {
            await Record.findByIdAndDelete(id)
            res.status(201).json({
                success: true,
                message:'Deleted Successfully'
            })
        } catch (err) {
            res.status(400).json({message:err.message})
        }
    
})
router.post('/upload/csv', upload.single('file'), async (req, res) => {
  const results = [];
 
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await Record.insertMany(results);
        res.status(200).send('Records added successfully');
      } catch (error) {
        console.error('Error adding records:', error);
        res.status(500).send('Error adding records');
      }
    })
    .on('error', (error) => {
      console.error('CSV parsing error:', error);
      res.status(500).send('Error parsing CSV file');
    });
 });
 
 // JSON upload endpoint
 router.post('/upload/json', upload.single('file'), async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(req.file.path, 'utf8'));
    await Record.insertMany(data);
    res.status(200).send('Records added successfully');
  } catch (error) {
    console.error('Error adding records:', error);
    res.status(500).send('Error adding records');
  }
 });
 router.get('/domain-distribution', async (req, res) => {
  try {
    const domainDistribution = await Record.aggregate([
      { $group: { _id: '$domainUrl', count: { $sum: 1 } } },
    ]);
    res.status(200).json(domainDistribution);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching domain distribution data' });
  }
});
export default router;
