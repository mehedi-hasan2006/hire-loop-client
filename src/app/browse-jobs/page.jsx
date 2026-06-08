import { fetchJobs } from "@/lib/actions/jobs";
import React from "react";
import {
  Magnifier,
  Clock,
  CircleDollar,
  Globe,
  Pin,
  Briefcase,
  ChevronRight,
  Factory,
  Calendar,
} from "@gravity-ui/icons";
import Link from "next/link";

async function BrowseJobsPage() {
  const getJobs = await fetchJobs();

  // Use API data or sample data
  const jobs = getJobs;

  const getCategoryColor = (category) => {
    const colors = {
      technology: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      design: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      marketing: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      management: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      sales: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    };
    return (
      colors[category] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
    );
  };

  const getJobTypeColor = (type) => {
    const colors = {
      "full-time": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      "part-time": "bg-blue-500/10 text-blue-400 border-blue-500/20",
      contract: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      internship: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    };
    return colors[type] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  };

  const formatSalary = (min, max, currency) => {
    const symbols = { USD: "$", BDT: "৳", EUR: "€", GBP: "£" };
    const symbol = symbols[currency] || currency;
    return `${symbol}${min} - ${symbol}${max}`;
  };

  const getDaysLeft = (deadlineString) => {
    const deadline = new Date(deadlineString);
    const now = new Date();
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDeadline = (dateString) => {
    const daysLeft = getDaysLeft(dateString);
    
    if (daysLeft < 0) {
      return { text: "Expired", color: "text-red-400 bg-red-500/10 border-red-500/20" };
    }
    if (daysLeft === 0) {
      return { text: "Today", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
    }
    if (daysLeft === 1) {
      return { text: "1 day left", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
    }
    if (daysLeft <= 3) {
      return { text: `${daysLeft} days left`, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
    }
    if (daysLeft <= 7) {
      return { text: `${daysLeft} days left`, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    }
    
    const date = new Date(dateString);
    return { 
      text: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20"
    };
  };

  const formatPostedDate = (dateString) => {
    const postedDate = new Date(dateString);
    const now = new Date();
    const diffTime = now - postedDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return postedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Browse Jobs
              </h1>
              <p className="text-zinc-500 mt-2 text-sm">
                Find your next opportunity from our curated listings
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Magnifier className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600/20 rounded-xl h-12 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
              />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400">
              <Briefcase className="w-3.5 h-3.5" />
              {jobs.length} Active Jobs
            </span>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => {
            const deadlineInfo = job.deadline ? formatDeadline(job.deadline) : null;
            const daysLeft = job.deadline ? getDaysLeft(job.deadline) : null;
            
            return (
              <Link
                key={job._id}
                href={`/browse-jobs/${job._id}`}
                className="group block"
              >
                <article className="h-full bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:bg-zinc-900/80 backdrop-blur-sm">
                  {/* Company Logo & Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Sample Logo Section - Replace with actual company logo */}
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-zinc-800 to-zinc-700 border border-zinc-700 flex items-center justify-center flex-shrink-0 shadow-inner overflow-hidden">
                      {job.companyLogo ? (
                        <img
                          src={job.companyLogo}
                          alt={`${job.companyName || job.user} logo`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Factory className="w-6 h-6 text-zinc-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors truncate">
                        {job.jobTitle}
                      </h2>
                      <p className="text-sm text-zinc-500 mt-0.5 truncate">
                        {job.companyName || job.user}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(job.jobCategory)}`}
                    >
                      {job.jobCategory.charAt(0).toUpperCase() +
                        job.jobCategory.slice(1)}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${getJobTypeColor(job.jobType)}`}
                    >
                      {job.jobType
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </span>
                    {job.isRemote && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                        <Globe className="w-3 h-3" />
                        Remote
                      </span>
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="space-y-2.5 mb-4">
                    {/* Salary */}
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <CircleDollar className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="font-medium text-zinc-300">
                        {formatSalary(job.minSalary, job.maxSalary, job.currency)}
                      </span>
                      <span className="text-zinc-600">/ year</span>
                    </div>

                    {/* Location (if not remote) */}
                    {!job.isRemote && job.location && (
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Pin className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                    )}

                    {/* Deadline with days left */}
                    {deadlineInfo && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-400">
                            {new Date(job.deadline).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${deadlineInfo.color}`}
                          >
                            {deadlineInfo.text}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        Posted {formatPostedDate(job.createdAt.$date)}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                      View Details
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-400 mb-2">
              No Jobs Available
            </h3>
            <p className="text-sm text-zinc-600">
              Check back later for new opportunities
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseJobsPage;