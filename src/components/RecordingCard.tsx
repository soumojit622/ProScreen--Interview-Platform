import { CallRecording } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { calculateRecordingDuration } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { CalendarIcon, ClockIcon, CopyIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";

function RecordingCard({ recording }: { recording: CallRecording }) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recording.url);
      toast.success("🎉 Recording link copied to clipboard!");
    } catch (error) {
      toast.error("❌ Failed to copy link to clipboard. Please try again.");
    }
  };

  const formattedStartTime = recording.start_time
    ? format(new Date(recording.start_time), "MMM d, yyyy, hh:mm a")
    : "Unknown";

  const duration =
    recording.start_time && recording.end_time
      ? calculateRecordingDuration(recording.start_time, recording.end_time)
      : "Unknown duration";

  return (
    <Card className="group hover:shadow-xl transition-all rounded-xl overflow-hidden border border-neutral-100 dark:border-neutral-700">
      {/* CARD HEADER */}
      <CardHeader className="p-4 space-y-1">
        <div className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            <span>{formattedStartTime}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <ClockIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            <span>{duration}</span>
          </div>
        </div>
      </CardHeader>

      {/* CARD CONTENT */}
      <CardContent className="p-0">
        <div
          className="w-full aspect-video bg-muted/20 dark:bg-muted/30 rounded-xl flex items-center justify-center cursor-pointer group transition-transform transform hover:scale-105"
          onClick={() => window.open(recording.url, "_blank")}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center group-hover:bg-primary-dark">
            <PlayIcon className="w-8 h-8 text-white transition-transform group-hover:scale-110" />
          </div>
        </div>
      </CardContent>

      {/* CARD FOOTER */}
      <CardFooter className="flex items-center justify-between gap-4 p-4">
        <Button
          className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300"
          onClick={() => window.open(recording.url, "_blank")}
        >
          <PlayIcon className="w-4 h-4 mr-2" />
          <span>Play Recording</span>
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2 text-neutral-600 border-neutral-300 hover:border-primary hover:text-primary dark:text-neutral-400 dark:border-neutral-600 dark:hover:border-primary dark:hover:text-primary"
          onClick={handleCopyLink}
        >
          <CopyIcon className="w-4 h-4" />
          Copy Link
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RecordingCard;
