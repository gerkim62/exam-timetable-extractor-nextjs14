import Link from "next/link";
import React from "react";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Welcome to the Exam Timetable Extractor!
        </h2>
        <p className="text-sm mb-6 text-center">
          This tool allows you to extract your exam timetable from the timetable
          that was sent via email instead of looking through the big pdf
          manually.
        </p>
        <div className="flex justify-center space-x-4 mb-6">
          <Link
            href={"/icampus_login"}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-400 dark:hover:bg-blue-500"
          >
            Log in with iCampus
          </Link>
          <button
            disabled
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-400 dark:hover:bg-blue-500 text-left"
          >
            Enter Courses Manually
          </button>
        </div>
        <p className="text-center text-red-400 my-4">Enter courses manually is coming soon</p>
        <p className="text-lg text-center">
          Did you encounter any issues?{" "}
          <Link
            className="text-blue-500 hover:underline whitespace-nowrap"
            href="/contact"
          >
            {" "}
            Contact developer.gerison
          </Link>
        </p>
      </div>
      {/* link for updating the timetabe */}
      <Link
        href="/upload_timetable"
        className=" text-blue-500 hover:underline mt-4 text-xs"
      >
        Upload exam Timetable
      </Link>
    </div>
  );
}

export default LandingPage;
