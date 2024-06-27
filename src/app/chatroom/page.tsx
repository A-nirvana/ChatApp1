"use client"

import { useState, useEffect } from "react";
import { Video } from "./video";
import { motion } from "framer-motion";

const VC : React.FC =()=> {
  let pc: RTCPeerConnection;

  if (typeof window !== "undefined") pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
    iceCandidatePoolSize: 10,
  });

  // const createAndSetOffer = async () => {
  //   try {
  //     const offerDescription = await pc.createOffer();
  //     await pc.setLocalDescription(offerDescription);

  //     const offer = {
  //       sdp: offerDescription.sdp,
  //       type: offerDescription.type
  //     }
  //   } catch (error) {
  //     console.error("Error creating offer or setting local description:", error);
  //   }
  // };

  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  useEffect(() => {
    window.navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(async (stream) => {
        setVideoStream(stream);
      });
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        pc.addTrack(track, videoStream);
      })
    }
  }, [])

  // useEffect(() => {
  //   pc.ontrack = (event) => {
  //     setRemoteStream(event.streams[0]);
  //   };

  //   createAndSetOffer();
  // }, [remoteStream])

  return (
    <>
      <div className=" px-80 h-screen justify-center items-center">
        <div className="flex justify-center mt-20">
          <Video stream={videoStream} />
          <Video stream={remoteStream} />
        </div>

        <div className="flex w-1/2 mx-16 justify-center mt-4 space-x-20 absolute bottom-4">
          <motion.div
            className='box p-2 bg-slate-600 rounded-full mx-2 cursor-pointer h-12 w-12 mt-2'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => {
              if (videoStream) {
                // Get the video tracks and stop them
                videoStream.getVideoTracks().forEach((track) => {
                  track.stop();
                });
                // Set the video stream to null to remove the video
                setVideoStream(new MediaStream(videoStream.getAudioTracks()));
              }
            }}
          ></motion.div>
          <motion.div
            className='box p-2 bg-red-700 rounded-full mx-2 cursor-pointer h-16'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => {
              window.location.href = "/chat"
            }}
          >
            <img src="/phone.svg" className=" h-12 rotate-[135deg] mt-1" />
          </motion.div>
          <motion.div
            className='box p-2 bg-slate-600 rounded-full mx-2 cursor-pointer h-12 w-12 mt-2'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => {
              if (videoStream) {
                // Get the video tracks and stop them
                videoStream.getAudioTracks().forEach((track) => {
                  track.stop();
                });
                // Set the video stream to null to remove the video
                setVideoStream(new MediaStream(videoStream.getVideoTracks()));
              }
            }}
          ></motion.div>
        </div>
      </div>
    </>

  )
}

export default VC