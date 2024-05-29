import Route53 from 'aws-sdk/clients/route53.js'
import fs from 'fs';
import csv from 'csv-parser';

const route53 = new Route53();

//get all Domains record
export const getAllDomains = async(req,res) => {
      try {
          const result = await route53.listHostedZones().promise();
          
        return res.status(200).json({"hostedZones":result.HostedZones});
      } catch (error) {
        return res.status(500).json({success:false,message:error})
      }
}

//create a new Domain
export const createDomain = async (req,res)=>{
  try {
    const {domainName,desc} = req.body;

    if (!domainName){
      return res.status(400).json("Domain name is required");
      }

      const params = {
          CallerReference: `${Date.now()}`,
          Name: domainName,
          HostedZoneConfig: {
            Comment: desc
          }
        };
   await route53.createHostedZone(params).promise();

    return res
      .status(201)
      .json({
        success:true,
        message:"Added Successfully"
      })
  } catch (error) {

    return res.status(500).json({
      success: false,
      message:error
    });
    
  }
}

//to update domain
export const updateDomain = async (req, res) => {
  try {
    const { hostedZoneId } = req.params; //fetching ID from params
    const { comment } = req.body;

    if (!hostedZoneId) {
      return res.status(400).json("Hosted zone ID is required");
    }

    const params = {
      Id: hostedZoneId,
        Comment: comment,
    };

    await route53.updateHostedZoneComment(params).promise();
    return res
      .status(200)
      .json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    console.error('Error updating hosted zone:', error);
    return res.status(500).json({success:true, message: error });
  }
};

//to delete a domain
export const deleteDomain = async (req,res) => {
  try {
    const {hostedZoneId} = req.params  //fetching ID from params
    const params = {
      Id: hostedZoneId, 
    };
    await route53.deleteHostedZone(params).promise();
    
    return res
      .status(200)
      .json({ success: true, message: "Deleted Successfully" })
  } catch (error) {
    return  res.status(500).json({ success: flase, message:error });
  }
}


//controller to upload bulk csv or json 
export const bulkUploadDomain = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileType = req.file.mimetype;

    let data = [];

    if (fileType === 'application/json') {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else if (fileType === 'text/csv' ) { 
      data = await parseCSV(filePath);
      console.log(data)
    } else {
      throw new Error('File type must be JSON or CSV');
    }

    for (const item of data) {
      const { domainName, desc } = item;

      if (!domainName) {
        console.error("Missing domainName in item:", item);
        continue; 
      } 

      const params = {
        CallerReference: `${Date.now()}`,
        Name: domainName,
        HostedZoneConfig: { Comment: desc }
      };

      try {
        await route53.createHostedZone(params).promise();
      } catch (error) {
     return  console.error(`Error creating domain ${domainName}:`, error);
      }
    }

    fs.unlinkSync(filePath); // Clean up the file after processing
    return res.status(200).json({ success: true, message: "Created Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//function to parsing the csv file
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};
