"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Camera, FlipHorizontal, Video } from "lucide-react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

type Props = {};

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //states
  const [mirrored, setMirrored] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);

  return (
    <main>
      <div className="flex h-screen">
        {/* left division - webcam & canvas */}
        <div className="relative">
          <div className="relative h-screen w-full">
            {/* <Webcam
              ref={webcamRef}
              mirrored={mirrored}
              className="h-full w-full object-contain p-2"
            /> */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 h-full w-full object-contain"
            ></canvas>
          </div>
        </div>
        {/* right division - controls */}
        <div className="flex flex-row flex-1 ">
          <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4">
            {/* top separator */}
            <div className="flex flex-col gap-2">
              <ModeToggle />
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => {
                  setMirrored((prev) => !prev);
                }}
              >
                <FlipHorizontal />
              </Button>

              <Separator className="my-2" />
            </div>
            {/* Middle Section */}

            <div className="flex flex-col gap-2">
              <Separator className="my-2" />
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={userPromptScreenshot}
              >
                <Camera />
              </Button>

              <Button
                variant={isRecording ? "destructive" : "outline"}
                size={"icon"}
                onClick={userPromptRecord}
              >
                <Video />
              </Button>
              <Button
                variant={autoRecordEnabled ? "destructive" : "outline"}
                size={"icon"}
                onClick={toggleAutoRecord}
              >
                {autoRecordEnabled ? "Show animation" : <PersonStanding />}
              </Button>

              <Separator className="my-2" />
            </div>
            <div className="flex flex-col gap-2">
              <Separator className="my-2" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  //handler functions
  function userPromptScreenshot() {
    //take picture
    //save it to downloads
  }

  function userPromptRecord() {
    //check if recording
    //then stop recording
    //and save to downloads
    //if not recording
    //start recording
  }

  function toggleAutoRecord() {
    if (autoRecordEnabled) {
      setAutoRecordEnabled(false);
      //show toast to user to notify that auto record is disabled
    } else {
      setAutoRecordEnabled(true);
      //show toast to user to notify that auto record is enabled
    }
  }
};

export default HomePage;
