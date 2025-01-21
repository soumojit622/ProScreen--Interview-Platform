import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CalendarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import useMeetingActions from "@/hooks/useMeetingActions";

type Interview = Doc<"interviews">;

function MeetingCard({ interview }: { interview: Interview }) {
  const { joinMeeting } = useMeetingActions();

  const status = getMeetingStatus(interview);
  const formattedDate = format(
    new Date(interview.startTime),
    "EEEE, MMMM d · h:mm a"
  );

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <CardHeader className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <CalendarIcon className="h-5 w-5 text-teal-500" />
            <span>{formattedDate} 📅</span>
          </div>

          <Badge
            variant={
              status === "live"
                ? "default"
                : status === "upcoming"
                  ? "secondary"
                  : "outline"
            }
            className="capitalize text-sm font-medium"
          >
            {status === "live"
              ? "Live Now 🎥"
              : status === "upcoming"
                ? "Upcoming"
                : "Completed"}
          </Badge>
        </div>

        <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
          {interview.title}
        </CardTitle>

        {interview.description && (
          <CardDescription className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
            {interview.description} 📝
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="p-6 flex flex-col gap-4">
        {status === "live" && (
          <Button
            className="w-full bg-teal-600 text-white font-medium rounded-lg shadow-md hover:bg-teal-700 hover:shadow-xl transition-all duration-300"
            onClick={() => joinMeeting(interview.streamCallId)}
          >
            Join Meeting 🎤
          </Button>
        )}

        {status === "upcoming" && (
          <Button
            variant="outline"
            className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-600 dark:text-white hover:text-teal-700 transition-all duration-300 rounded-lg py-3"
            disabled
          >
            Waiting to Start ⏳
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default MeetingCard;
