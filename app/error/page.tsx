import React from "react";
import Link from "next/link";

function ErrorPage({ searchParams }: { searchParams?: { message?: string } }) {
  const errorMessage = searchParams?.message || "An error occurred";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Oops! Something went wrong
        </h2>
        <p className="text-lg mb-4 text-center">{errorMessage}</p>
        <p className="text-xs mb-4 text-center">
          You can go to home and choose to enter courses manually instead
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
