
export const getAudio = (rec:boolean) => {
    navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
              const mediaRecorder = new MediaRecorder(stream);
              const chunks: Blob[] = [];
              mediaRecorder.start();
              mediaRecorder.addEventListener("dataavailable", (event) => {
                chunks.push(event.data);
              });
              
              mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(chunks, { type: "audio/webm" });
                const audioUrl = URL.createObjectURL(audioBlob);
                console.log("Recorded audio URL:", audioUrl);
              });
              setTimeout(()=>{
                mediaRecorder.stop();
              },30000)
              return mediaRecorder;
            })
            .catch((error) => {
              console.error("Error accessing microphone:", error);
            });
}