"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import MeetingModal from "@/components/MeetingModal";

export default function Home() {
  const router = useRouter();

  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6 bg-background">
      {/* WELCOME SECTION */}
      <div className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/20 p-6 md:p-8 border shadow-lg mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold ">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Welcome back!
          </span>
          👋
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-2 max-w-full sm:max-w-2xl">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively 🎯"
            : "Access your upcoming interviews and preparations 📅"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary">Your Interviews</h1>
            <p className="text-muted-foreground mt-1 text-lg">
              View and join your scheduled interviews 📝
            </p>
          </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                  No Interviews Scheduled
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 italic">
                  Looks like you haven't scheduled any interviews yet. 🕒
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
