"use client";

import LoaderUI from "@/components/LoaderUI";
import RecordingCard from "@/components/RecordingCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCalls from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

function RecordingsPage() {
  const { calls, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!calls) return;

      try {
        // Get recordings for each call
        const callData = await Promise.all(
          calls.map((call) => call.queryRecordings())
        );
        const allRecordings = callData.flatMap((call) => call.recordings);

        setRecordings(allRecordings);
      } catch (error) {
        console.log("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, [calls]);

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col mb-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
          Recordings
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          {recordings.length}{" "}
          {recordings.length === 1 ? "recording" : "recordings"} available
        </p>
      </div>

      {/* RECORDINGS GRID */}
      <ScrollArea className="h-[calc(100vh-12rem)] mt-6">
        {recordings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6 transition-all ease-in-out">
            {recordings.map((r) => (
              <RecordingCard key={r.end_time} recording={r} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] gap-4 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-xl bg-muted/20 dark:bg-muted/30">
            <p className="text-xl font-medium text-muted-foreground dark:text-muted-foreground-dark">
              No recordings available
            </p>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
              Check back later or contact support if you believe this is an
              error.
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default RecordingsPage;
