import Action2Model from '../model/action2.js'
import Nessus  from 'nessus-api-helper';
import https from 'https';
import mongoose from 'mongoose'
import axios from 'axios'


export const UploadDoc = async(req,res) => {

	const data = req.body;
const modeldata = new Action2Model({...data,creator:req.userid,createdAt: new Date().toISOString()})

	try{
		await modeldata.save()
		return res.status(200).json({message:'Data successfully posted'})
	}
	catch(error)
	{
		console.log(error)
		res.status(500).json({message:'Something went wrong'})
	}
}

export const getDoc = async (req,res) => {

	

	try{
		// if(!mongoose.Types.ObjectId.isValid(id)) return res.status(405).send('No postss with that id');
		const data = await Action2Model.find({})

		res.status(200).json(data)
	}
	catch(error)
	{
		res.status(409).json({message:error})
	}
}

export const GetNessus = async(req1,res1) => {

	try {

const nessusUrl = 'https://172.17.12.80:8834/session';
const username = 'admin';
const password = '6#g$d2QGs0m';


const loginData = JSON.stringify({
  username: username,
  password: password
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': loginData.length
  },
  rejectUnauthorized: false
};

const req1 = https.request(nessusUrl, options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const responseData = JSON.parse(data);
    res1.status(200).json(responseData.token)

    console.log('Token:', responseData.token);
  });
});

req1.on('error', (error) => {
  console.error(error);
});

req1.write(loginData);
req1.end();




	}
	catch(error)
	{
		console.log(error)
		res1.status(500).json({message:'Something went wrong'})
	}
}


export const GetAllScans = async(req1,res1) => {

	const token = req1.body.token
	console.log(token)

	try {

const nessusUrl = 'https://172.17.12.80:8834/scans';

const options = {
  headers: {
    'X-Cookie': `token=${token}`,
    'User-Agent': 'nessus-nodejs'
  },
  rejectUnauthorized: false
};


const req = https.request(nessusUrl, options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const responseData = JSON.parse(data);
    res1.status(200).json(responseData)
    console.log(responseData);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();




	}
	catch(error)
	{
		console.log(error)
		res1.status(500).json({message:'Something went wrong'})
	}
}