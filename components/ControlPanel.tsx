import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Camera,
  FlipHorizontal,
  PersonStanding,
  Video,
  Volume2,
} from "lucide-react";
import { Rings } from "react-loader-spinner";
import { beep } from "@/utils/audio";

type ControlPanelProps = {
  mirrored: boolean;
  setMirrored: React.Dispatch<React.SetStateAction<boolean>>;
  isRecording: boolean;
  userPromptScreenshot: () => void;
  userPromptRecord: () => void;
  autoRecordEnabled: boolean;
  toggleAutoRecord: () => void;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  mirrored,
  setMirrored,
  isRecording,
  userPromptScreenshot,
  userPromptRecord,
  autoRecordEnabled,
  toggleAutoRecord,
  volume,
  setVolume,
}) => {
  return (
    <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4">
      {/* top secion  */}
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

      {/* Middle section  */}
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
        <Separator className="my-2" />
        <Button
          variant={autoRecordEnabled ? "destructive" : "outline"}
          size={"icon"}
          onClick={toggleAutoRecord}
        >
          {autoRecordEnabled
            ? <Rings color="white" height={45} />
            : <PersonStanding />}
        </Button>
      </div>
      {/* Bottom Secion  */}
      <div className="flex flex-col gap-2">
        <Separator className="my-2" />
        <Popover>
          <PopoverTrigger asChild>
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
  );
};

export default ControlPanel;
