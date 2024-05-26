import express from 'express';
import Record from '../models/record.js';

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
    const { domainUrl, name, value, recordType } = req.body;
    console.log(id)
        try {
            await Record.findByIdAndUpdate(id, { domainUrl, name, value, recordType})
            res.status(201).json({
                success: true,
                message:'Updated Successfully'
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

export default router;
