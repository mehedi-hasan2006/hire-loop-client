import { fetchJobDetails } from "@/lib/actions/jobs";
import React from "react";
import {
  CircleDollar,
  Clock,
  Globe,
  Pin,
  Briefcase,
  Factory,
  Calendar,
  ArrowLeft,
  ArrowShapeTurnUpRight,
  Bookmark,
  ChevronRight,
  CircleCheck,
  CircleExclamation,
} from "@gravity-ui/icons";
import Link from "next/link";

async function JobDetailsPage({ params }) {
  const { id } = await params;

  const getJobDetails = await fetchJobDetails(id);

  // Sample data for preview (remove when API is connected)
  const job = getJobDetails || {
    _id: { $oid: "6a24c19674db0150913199a2" },
    jobTitle: "Senior Frontend Developer",
    jobCategory: "technology",
    jobType: "full-time",
    minSalary: "80",
    maxSalary: "120",
    currency: "USD",
    deadline: "2026-07-15",
    responsibilities:
      "Lead the frontend development team in building scalable web applications. Collaborate with designers and backend engineers to implement new features. Mentor junior developers and conduct code reviews. Ensure application performance, accessibility, and cross-browser compatibility.",
    requirements:
      "5+ years of experience with React.js and TypeScript. Strong understanding of modern JavaScript (ES6+), HTML5, and CSS3. Experience with state management (Redux, Zustand). Knowledge of RESTful APIs and GraphQL. Familiarity with testing frameworks (Jest, Cypress). Excellent problem-solving and communication skills.",
    benefits:
      "Competitive salary and equity package. Health, dental, and vision insurance. 401(k) matching. Flexible work hours and remote options. Annual learning and development budget. Home office setup stipend. Gym membership reimbursement.",
    user: "MD. MEHEDI HASAN",
    userId: "6a230714a07ec853879dc673",
    userEmail: "admin1@gmail.com",
    isRemote: false,
    companyId: "company_123",
    status: "active",
    isPubliclyVisible: true,
    createdAt: { $date: "2026-06-07T00:55:50.168Z" },
    companyName: "TechCorp Inc.",
    companyLogo: null,
    location: "San Francisco, CA",
  };

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
    return `${symbol}${Number(min).toLocaleString()} - ${symbol}${Number(max).toLocaleString()}`;
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
      return {
        text: "Expired",
        color: "text-red-400 bg-red-500/10 border-red-500/20",
        icon: CircleExclamation,
      };
    }
    if (daysLeft === 0) {
      return {
        text: "Today",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        icon: CircleExclamation,
      };
    }
    if (daysLeft === 1) {
      return {
        text: "1 day left",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        icon: Clock,
      };
    }
    if (daysLeft <= 7) {
      return {
        text: `${daysLeft} days left`,
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        icon: Clock,
      };
    }

    const date = new Date(dateString);
    return {
      text: `Until ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
      color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
      icon: Calendar,
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

  const deadlineInfo = job.deadline ? formatDeadline(job.deadline) : null;
  const DeadlineIcon = deadlineInfo?.icon || Clock;

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/browse-jobs"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              {/* Company Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 flex items-center justify-center flex-shrink-0 shadow-inner overflow-hidden">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={`${job.companyName || job.user} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Factory className="w-8 h-8 text-zinc-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {job.jobTitle}
                  </h1>
                  <p className="text-zinc-400 text-sm">
                    {job.companyName || job.user}
                  </p>
                  {job.location && !job.isRemote && (
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-zinc-500">
                      <Pin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getCategoryColor(job.jobCategory)}`}
                >
                  {job.jobCategory.charAt(0).toUpperCase() +
                    job.jobCategory.slice(1)}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getJobTypeColor(job.jobType)}`}
                >
                  {job.jobType
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
                {job.isRemote && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                    <Globe className="w-3.5 h-3.5" />
                    Remote
                  </span>
                )}
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <CircleDollar className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Salary Range</p>
                    <p className="text-sm font-semibold text-white">
                      {formatSalary(job.minSalary, job.maxSalary, job.currency)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Job Type</p>
                    <p className="text-sm font-semibold text-white capitalize">
                      {job.jobType.split("-").join(" ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5">Posted</p>
                    <p className="text-sm font-semibold text-white">
                      {formatPostedDate(job.createdAt.$date)}
                    </p>
                  </div>
                </div>
                {deadlineInfo && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-0.5">Deadline</p>
                      <p className="text-sm font-semibold text-white">
                        {new Date(job.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Deadline Alert */}
              {deadlineInfo && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-xl border ${deadlineInfo.color} mb-6`}
                >
                  <DeadlineIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    {deadlineInfo.text}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-400 hover:to-purple-500 font-semibold rounded-xl px-6 py-3 shadow-lg shadow-violet-500/25 transition-all duration-200 text-sm">
                  Apply Now
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl font-medium text-sm transition-all">
                  <Bookmark className="w-4 h-4" />
                  Save Job
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl font-medium text-sm transition-all">
                  <ArrowShapeTurnUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Job Description Sections */}
            <div className="space-y-6">
              {/* Responsibilities */}
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CircleCheck className="w-5 h-5 text-emerald-400" />
                  Responsibilities
                </h2>
                <div className="text-sm text-zinc-400 leading-relaxed space-y-2">
                  {job.responsibilities.split(". ").map(
                    (item, index) =>
                      item && (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-violet-400 mt-1.5 flex-shrink-0">
                            •
                          </span>
                          <span>{item.endsWith(".") ? item : `${item}.`}</span>
                        </div>
                      ),
                  )}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CircleExclamation className="w-5 h-5 text-amber-400" />
                  Requirements
                </h2>
                <div className="text-sm text-zinc-400 leading-relaxed space-y-2">
                  {job.requirements.split(". ").map(
                    (item, index) =>
                      item && (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-violet-400 mt-1.5 flex-shrink-0">
                            •
                          </span>
                          <span>{item.endsWith(".") ? item : `${item}.`}</span>
                        </div>
                      ),
                  )}
                </div>
              </div>

              {/* Benefits */}
              {job.benefits && (
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CircleCheck className="w-5 h-5 text-emerald-400" />
                    Benefits & Perks
                  </h2>
                  <div className="text-sm text-zinc-400 leading-relaxed space-y-2">
                    {job.benefits.split(". ").map(
                      (item, index) =>
                        item && (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-1.5 flex-shrink-0">
                              ✦
                            </span>
                            <span>
                              {item.endsWith(".") ? item : `${item}.`}
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Card */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm sticky top-8">
              <h3 className="text-base font-semibold text-white mb-4">
                About the Company
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-700 border border-zinc-700 flex items-center justify-center flex-shrink-0 shadow-inner overflow-hidden">
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
                <div>
                  <p className="text-sm font-semibold text-white">
                    {job.companyName || job.user}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {job.location || "Global"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {job.companyName || job.user} is a leading company in the{" "}
                {job.jobCategory} industry, committed to innovation and
                excellence in delivering top-quality solutions.
              </p>

              <Link
                href={`/company/${job.companyId}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
              >
                View Company Profile
                <ChevronRight className="w-4 h-4" />
              </Link>

              {/* Job Summary */}
              <div className="mt-6 pt-6 border-t border-zinc-800/50 space-y-3">
                <h4 className="text-sm font-semibold text-white">
                  Job Summary
                </h4>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Posted</span>
                  <span className="text-zinc-300">
                    {new Date(job.createdAt.$date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Job Type</span>
                  <span className="text-zinc-300 capitalize">
                    {job.jobType.split("-").join(" ")}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Category</span>
                  <span className="text-zinc-300 capitalize">
                    {job.jobCategory}
                  </span>
                </div>

                {job.isRemote && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Location</span>
                    <span className="text-zinc-300">Remote</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t border-zinc-800/50">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Posted By
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
                    {job.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {job.user}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {job.userEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
