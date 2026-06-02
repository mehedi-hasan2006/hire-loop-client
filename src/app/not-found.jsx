"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-[140px]" />
      </div>

      {/* Floating Orb 1 */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-20 top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"
      />

      {/* Floating Orb 2 */}
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl"
      >
        {/* 404 */}
        <motion.h1
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-8xl font-black text-transparent md:text-9xl"
        >
          404
        </motion.h1>

        <h2 className="mt-6 text-3xl font-bold text-white">Page Not Found</h2>

        <p className="mt-4 text-neutral-400">
          Looks like you&rsquo;ve wandered into a part of the internet that
          doesn&rsquo;t exist. The page may have been moved or deleted.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-linear-to-r from-purple-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105"
          >
            Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-white/10"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Line */}
        <div className="mx-auto mt-8 h-px w-32 bg-linear-to-r from-transparent via-white/30 to-transparent" />

        <p className="mt-6 text-xs tracking-widest text-neutral-500 uppercase">
          Error • Not Found
        </p>
      </motion.div>
    </div>
  );
}
