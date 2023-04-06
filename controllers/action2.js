import Action2Model from '../model/action2.js'
import Nessus  from 'nessus-api-helper';
import https from 'https';
import mongoose from 'mongoose'
import axios from 'axios'
import xmlrpc from 'xmlrpc';
import {parseStringPromise} from 'xml2js';
import { XMLHttpRequest } from 'xmlhttprequest';




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


export const GetAScan = async(req1,res1) => {

	const {token,id} = req1.body
	console.log(id)

	try {

const nessusUrl = `https://172.17.12.80:8834/scans/${id}`;

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


export const OpenVas = async(req,res) => {

	try{

		const ip = '172.17.12.21';
		const username = 'admin';
		const password = 'OpenVas@123';
		const port = '9392'



// const baseURL = 'http://172.17.12.21:9392';

// axios.post(`${baseURL}/omp/login`, {
//   username: 'admin',
//   password: 'OpenVas@123'
// })
// .then(response => {
//   const token = response.headers['x-auth-token'];
//   console.log('Authenticated with token:', token);

//   // Example: Get the list of all targets
 
// })




// const instance = axios.create({
//   baseURL: `http://${ip}:${port}/omp/api/v1/auth`,
//   timeout: 5000,
//   headers: {'Content-Type': 'application/json'},
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   })
// });

// instance.post('/login', {
//   username: username,
//   password: password
// })
// .then((response) => {
//   console.log(response.data);
// })
// .catch((error) => {
//   console.error(error);
// });




// 		const options = {
//   headers: {
//     accept: 'application/json'
//   },
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   })
// };



// const authUrl = `http://${ip}:${port}/omp/api/v1/auth`;
// const response = await axios.post(authUrl, {
//   username,
//   password,
// },{
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   })

// })

// const token = response.data.token;
// console.log(token)
	



		// const client = xmlrpc.createClient({url});

// 		const client = xmlrpc.createSecureClient({
//   url,
//   rejectUnauthorized: false
// });

// client.methodCall('authenticate', [username, password], (error, response) => {
//   if (error) {
//     console.error(error);
//     res.status(500).json(error)
//   } else {
//     const sessionId = response;
//     console.log(`Session ID: ${sessionId}`);
//     res1.status(200).json(sessionId)
//   }
// });

		




	}
	catch(error)
	{

		console.log(error)
		res.status(500).json({message:'Something went wrong'})

	}
}
