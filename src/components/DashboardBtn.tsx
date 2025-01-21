"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SparklesIcon } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

function DashboardBtn() {
  const { isCandidate, isLoading } = useUserRole();

  if (isCandidate || isLoading) return null;

  return (
    <Link href={"/dashboard"}>
      <Button
        className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 sm:px-2 sm:py-1 sm:text-xs md:px-3 md:py-2 md:text-sm lg:px-6 lg:py-3 lg:text-base"
        size={"sm"}
      >
        <SparklesIcon className="h-4 w-4 text-white animate-pulse sm:h-3 sm:w-3 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        <span className="sm:text-xs md:text-sm lg:text-md">Dashboard</span>
      </Button>
    </Link>
  );
}

export default DashboardBtn;
