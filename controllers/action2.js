import Action2Model from '../model/action2.js'
import Nessus  from 'nessus-api-helper';
import https from 'https';
import fs  from 'fs';
import mongoose from 'mongoose'
import axios from 'axios'
import xmlrpc from 'xmlrpc';
import request from 'request'
import {parseStringPromise} from 'xml2js';
import { XMLHttpRequest } from 'xmlhttprequest';
import sql from 'mssql'




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






export const SQL = async(req1,res1) => {

  try{

    const config = {
  user: 'zbx_monitor',
  password: 'nV9jOQI88E6u',
  server: '172.17.19.35', 
  database: 'master',
  options: {
    trustServerCertificate: true
  }
}

async function run() {
 try {
    await sql.connect(config)
    
    console.log('Connected to database');
  
   const pool = await sql.connect(config)
  const request = pool.request()
 
 const query = `USE master; EXEC xp_readerrorlog 0, 1, N\'Login failed\'`

 const query2 = `SELECT  
sys.server_principals.name AS LoginName, 
sys.server_principals.type_desc AS LoginType, 
sys.server_principals.create_date AS LoginCreated, 
sys.server_principals.modify_date AS LoginLastModified, 
sys.server_principals.is_disabled AS LoginDisabled, 
LOGINPROPERTY(sys.server_principals.name, 'IsExpired') AS LoginExpired, 
LOGINPROPERTY(sys.server_principals.name, 'IsLocked') AS LoginLocked, 
LOGINPROPERTY(sys.server_principals.name, 'BadPasswordCount') AS LoginBadPasswordCount, 
LOGINPROPERTY(sys.server_principals.name, 'DaysUntilExpiration') AS LoginDaysUntilExpiration, 
LOGINPROPERTY(sys.server_principals.name, 'PasswordLastSetTime') AS LoginPasswordLastSetTime, 
SERVERROLE.name AS ServerRole, 
SERVERROLE.create_date AS ServerRoleCreated, 
SERVERROLE.modify_date AS ServerRoleLastModified 

FROM  

    sys.server_principals 

LEFT JOIN  

    sys.server_role_members ON sys.server_principals.principal_id = sys.server_role_members.member_principal_id 

LEFT JOIN  

    sys.server_principals AS SERVERROLE ON sys.server_role_members.role_principal_id = SERVERROLE.principal_id 

WHERE  

    sys.server_principals.type_desc IN ('SQL_LOGIN', 'WINDOWS_LOGIN', 'WINDOWS_GROUP') 

    AND sys.server_principals.is_disabled = 0 

    AND SERVERROLE.name IN ('sysadmin', 'securityadmin', 'serveradmin', 'setupadmin') 

ORDER BY  

    LoginName ASC;
`

const query3 = `SELECT  
  ses.login_name AS LoginName, 
  ses.program_name AS Application, 
  ses.host_name AS HostName, 
  ses.login_time AS LoginTime 
FROM  
  sys.dm_exec_sessions AS ses 
INNER JOIN  
  sys.database_principals AS DP ON ses.login_name = DP.name 
WHERE  
  DP.type_desc IN ('SQL_USER', 'WINDOWS_USER', 'WINDOWS_GROUP') 
ORDER BY  
  LoginTime DESC;
`
const query4 =`SELECT TOP 10 
  total_worker_time/execution_count AS AvgCPUTime, 
  execution_count, 
  total_elapsed_time/execution_count as AvgElapsedTime, 
  (SELECT text FROM sys.dm_exec_sql_text(plan_handle)) AS QueryText 
FROM  
  sys.dm_exec_query_stats 
ORDER BY  
  AvgCPUTime DESC; 
`
const query5 = `SELECT TOP 10 
  (total_logical_reads + total_logical_writes)/execution_count as AvgLogicalIO, 
  total_worker_time/execution_count AS AvgCPUTime, 
  total_elapsed_time/execution_count as AvgElapsedTime, 
  (SELECT text FROM sys.dm_exec_sql_text(plan_handle)) AS QueryText 
FROM  
  sys.dm_exec_query_stats 
ORDER BY  
  AvgLogicalIO DESC; 
`
const result = await request.query(query)
const result2 = await request.query(query2)
const result3 = await request.query(query3)
const result4 = await request.query(query4)
const result5 = await request.query(query5)
 res1.status(200).json({login:result,privileged:result2,userlogin:result3,CPU:result4,Memory:result5})
console.log(result)
console.log(result2)


} catch (error) {

    console.log(error)
    res1.status(500).json({message:'Something went wrong'})
    
  }

}

run()


  }

  catch(error){

    console.log(error)
    res1.status(500).json({message:'Something went wrong'})

  }

	
}

