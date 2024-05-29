
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

//config AWS Crenditenal
const configAWS = () => {
    // console.log(process.env.AWS_AccessID,process.env.AWS_Secret_Access_Key)
    try {
      const res=  AWS.config.update({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region:'us-east-1'
        });
        console.log('AWS configured successfully!',res);
    } catch (error) {
        console.log('Error', error.message);
    }
};

export default configAWS;