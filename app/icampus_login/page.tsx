import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";

function LoginCredentialsForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 ">
          Exam Timetable Extractor
        </h2>
        <p className="text-sm mb-4 text-red-800 dark:text-red-500
        ">
          Use the same logins you use for iCampus
        </p>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit <RiArrowRightSLine className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginCredentialsForm;
