"use client";

import { ChangeEvent, useState } from "react";
import aws from "../api/aws";


export const ImagesPage = async () => {
  const [message, setMessage] = useState<String>();
  const [file, setFile] = useState<File>();
  async function storeFile(e: ChangeEvent<HTMLInputElement>) {
    console.log("Store file")
    if (e.target.files != null ){
      setFile(e.target.files[0])
    }
    
  }
  const uploadFile = async() => {
    if (file === null) {
      setMessage("uploading");
      var returnedData = aws(file);
      setMessage(String(returnedData));
      setFile(undefined);
    }
  }
  return (
    <div>
      <p> Upload file:</p>
      <p style = {{color: "red"}}>{message}</p>
      <input type="file" onChange={(e)=>storeFile(e)}/>
      <input type="button" onClick={uploadFile} defaultValue= "Send"/>
    </div>
  );
};

export default ImagesPage;