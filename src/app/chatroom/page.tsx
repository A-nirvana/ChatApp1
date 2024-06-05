"use client"

import { useState, useEffect } from "react";
import { Video } from "./video";

export default function vc(){
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null)

    useEffect(()=>{
        window.navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio : true,
      })
      .then(async (stream) => {
        setVideoStream(stream);
      });
    },[])

    return(
      <>
      <div className=" px-80 h-screen justify-center items-center">
            <Video stream={videoStream}/>
      </div>
      </>
        
    )
}