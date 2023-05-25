"use client";

import { ChangeEvent, useState } from "react";
import aws from "../api/aws";


export const ImagesPage = async () => {
  const [message, setMessage] = useState<String>();
  const [file, setFile] = useState<File>();
  

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files[0]) {
      if (event.target.files != null ){
        setMessage(event.target.files[0].name);
        setFile(event.target.files[0])
      }
    }
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (file === null) {
      setMessage("uploading");
      var returnedData = aws(file);
      setMessage(String(returnedData));
      setFile(undefined);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p> Upload file:</p>
        <p style = {{color: "red"}}>{message}</p>
        <input type="file" onChange={handleChange} accept="image/*"/>
        <button type="submit" className="p-2 text-sm shadow bg-violet-200 rounded-xl">
          Seed !
        </button>
      </div>
    </form>
  );
};

export default ImagesPage;