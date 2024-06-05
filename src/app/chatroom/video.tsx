"use client"

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
type VideoProps = {
  stream: MediaStream | null;
};
export const Video: React.FC<VideoProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream])

  return (
    <div>
      <div className="rounded-2xl border-8 border-[#404094c6]">
        <video style={{ borderRadius: 10 }} ref={videoRef} muted width="100%" autoPlay={true} playsInline={true}
          className=" rounded-3xl"
        />
      </div>
      <div className="flex w-full justify-center mt-4 space-x-20">
        <motion.div
          className='box p-2 bg-slate-600 rounded-full mx-2 cursor-pointer h-12 w-12 mt-2'
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => {
            window.navigator.mediaDevices
              .getUserMedia({
                video: false,
                audio: true,
              })
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
            window.navigator.mediaDevices
              .getUserMedia({
                video: true,
                audio: false,
              })
          }}
          ></motion.div>
      </div>

    </div>
  )
}