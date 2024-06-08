"use client"

import { useState, useEffect } from "react";
import { Video } from "./video";
import { motion } from "framer-motion";

export default function vc() {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    window.navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(async (stream) => {
        setVideoStream(stream);
      });
  }, [])

  return (
    <>
      <div className=" px-80 h-screen justify-center items-center">
        <Video stream={videoStream} />
        <div className="flex w-full justify-center mt-4 space-x-20">
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