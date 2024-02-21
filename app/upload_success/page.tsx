import Link from "next/link";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";

function TimetableUploadedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Timetable Successfully Uploaded!
        </h2>
        <p className="text-lg mb-6 text-center">
          You can now proceed to select your courses.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Select Courses <RiArrowRightSLine className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TimetableUploadedPage;
