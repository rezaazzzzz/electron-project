import express from 'express';
import fs from 'fs';
import path from 'path';
import { isProcessorValid } from './config2';
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';
import {Login, userCreate}  from './controllers/user.controller';
import {createProduct,getProducts} from "./controllers/product.controller"



const appExpress = express();
appExpress.use(express.json());


appExpress.post("/createUser", userCreate as any);
appExpress.post("/login",Login as any)


appExpress.post("/createProduct", createProduct as any);
appExpress.get("/findAllProduct",getProducts as any);

appExpress.use(express.json());
 

appExpress.use(cookieParser());

const filePath = 'C:\\Users\\Administrator\\Desktop\\electronnnnnn\\electron-app\\src\\app.txt';  

appExpress.get('/', (_, res) => {
  
  if (!isProcessorValid()) {
    res.status(403).send('<p>Access Denied: Invalid Processor ID.</p>');
    console.error('Unauthorized access attempt.');
    return;
  }
  
  
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    
    if(!file){
      const filePath = path.resolve(__dirname, 'app.txt'); 
      const file = fs.readFileSync(filePath, 'utf-8');
      
      const hashfile = bcrypt.hashSync(file,10)
      
      
        res.send(hashfile)
         
    }

    res.send(file); 
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).send('<p>Cannot read the specified file.</p>');
  }
});

 
export function apprun() {
  appExpress.listen(3000, () => {
    console.log('Express server started on port 3000');
  });
}

