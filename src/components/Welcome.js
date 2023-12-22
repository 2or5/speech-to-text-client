import { fontSize } from "@mui/system";
import React from "react";

export default function Welcome() {
  return (
    <div className="mt-4 p-5 bg-dark text-white rounded">
      <h1 align="center">Welcome to Speech Text</h1>
      <p align="center" style={{fontSize: "15px"}}>Here you can record your voice and view your records in text form. Also here you can edit your notes view old notes and delete not needed notes. </p>
      <p align="center" style={{fontSize: "15px"}}>Add Note - here you can record your voice and send to create text format. Note List - here you can view your notes and do actions.</p>
      <h5 align="right"> Good luck and have fun</h5>
    </div>
  );
}
