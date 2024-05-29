import Route53 from "aws-sdk/clients/route53.js";
const route53 = new Route53();

//get all DNS Record
export const getAllDNSRecord = async (req, res) => {
  try {
    const {hostedZoneId} =  req.params;
     await route53.listHostedZones().promise();
    const params = {
      HostedZoneId: hostedZoneId
    };

    const data = await route53.listResourceRecordSets(params).promise();
    const records = data.ResourceRecordSets;

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({success:true, message: "Server error" });
  }
};

//add DNS Record
export const createDNSRecord = async (req,res) => {
  try {
    const { recordData, code } = req.body;

    const { domainName, recordType, recordValue } = recordData
  
    const params = {
      ChangeBatch: {
        Changes: [
          {
            Action: 'CREATE',
            ResourceRecordSet: {
              Name: domainName,
              Type: recordType,
              TTL: 300,     
              ResourceRecords: [{ Value: recordValue }],
            },
          },
        ],
      },
      HostedZoneId: code
    };

await route53.changeResourceRecordSets(params).promise();
      res.status(200).json({
          success: true,
          message:" Added Successfully"
})
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error
    });
  }
};

//  update a DNS record
export const updateDNSRecord = async (req, res) => {
    try {
      const { recordData } = req.body;
      const { id } = req.params;

      if (recordData.Type !== 'SOA') {
        const params = {
          HostedZoneId: id,
          ChangeBatch: {
            Changes: [
              {
                Action: 'UPSERT',
                ResourceRecordSet: {
                  Name: recordData.Name,
                  Type: recordData.Type,
                  TTL: recordData.ttl,
                  ResourceRecords: [
                    {
                      Value: recordData.Value,
                    },
                  ],
                },
              },
            ],
          },
        };

        const data = await route53.changeResourceRecordSets(params).promise();
        res.json({ success:true, message:"Updated Successfully" });
      } else {
        res.status(400).json({success:false, message: "Cannot update SOA record" });
      }
    } catch (error) {

      res.status(500).json({success:false, message: error });
    }
};
  
//  delete a DNS record
export const deleteDNSRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Type, ResourceRecords, TTL } = req.body;

    // Check if any data is unavailable
    if (!Name || !Type || !ResourceRecords || TTL == null) {
      return res.status(400).json({
        message: "Missing required parameters 'Name', 'Type', 'TTL', or 'ResourceRecords'",
      });
    }
    if (Type !== 'SOA') {
      const params = {
        HostedZoneId:id,
        ChangeBatch: {
          Changes: [
            {
              Action: 'DELETE',
              ResourceRecordSet: req.body
            },
          ],
        },
      };

      
      await route53.changeResourceRecordSets(params).promise();

      
      res.status(201).json({success:true,  message: "Deleted successfully" });
    } else {
      // If trying to delete a SOA record, send a message indicating it's not allowed
      res.status(400).json({success:false, message: "Cannot delete the SOA record. Hosted zone must contain exactly one SOA record." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:error});
  }
};
