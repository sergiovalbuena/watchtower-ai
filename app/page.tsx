"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Camera,
  FlipHorizontal,
  PersonStanding,
  Video,
  Volume2,
} from "lucide-react";
import { useRef, useState } from "react";
import { Rings } from "react-loader-spinner";
import Webcam from "react-webcam";
import { toast } from "sonner";

type Props = {};

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //states
  const [mirrored, setMirrored] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);

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
                {autoRecordEnabled ? (
                  <Rings color="white" height={45} />
                ) : (
                  <PersonStanding />
                )}
              </Button>

              <Separator className="my-2" />
            </div>
            {/* Bottom Section */}
            <div className="flex flex-col gap-2">
              <Separator className="my-2" />
              <Popover>
                <PopoverTrigger>
                  <Button variant={"outline"} size={"icon"}>
                    <Volume2 />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Slider
                    max={1}
                    min={0}
                    step={0.2}
                    defaultValue={[volume]}
                    onValueCommit={(val) => {
                      setVolume(val[0]);
                      beep(val[0]);
                    }}
                  />
                </PopoverContent>
              </Popover>
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
      toast("Auto record disabled");
    } else {
      setAutoRecordEnabled(true);
      toast("Auto record enabled");
      //show toast to user to notify that auto record is enabled
    }
  }
};

export default HomePage;
