
import {test as setup} from '@playwright/test';
import { Console } from 'console';
import { config } from 'dotenv';
import fs from 'fs';
require('dotenv').config();


const authFile = './authFile.json';


console.log('----------------This is the dependency setup file-----------');
setup('Authentication',async({request})=>{


    console.log(process.env.EMAIL);
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data:{
            "user":
            {
                "email":process.env.EMAIL,
                "password":process.env.PASSWORD
            }
        }
    })
    
    const responseBody = await response.json();
    const accessToken = await responseBody.user.token;
    const obj = [{token:`${accessToken}`}];

    fs.writeFileSync(authFile,JSON.stringify(obj));

    console.log('Token generated');
    process.env['ACCESS_TOKEN'] = accessToken;
    
})