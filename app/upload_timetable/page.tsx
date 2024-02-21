import uploadTimetable from "@/actions/uploadTimetable";
import SubmitButton from "@/components/SubmitButton";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";

function UploadTimetablePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-left">
        <h2 className="text-3xl font-bold mb-4 ">Upload Exam Timetable</h2>
        <p className="text-lg mb-6 ">
          Download the PDF timetable that was sent in your UEAB email. Go to the{" "}
          <a
            href="https://xodo.com/convert-pdf-to-html"
            className="text-blue-500 hover:underline"
          >
            Xodo Converter website
          </a>{" "}
          and use it to convert the PDF to HTML. Then, upload the HTML file
          here.
        </p>
        <form action={uploadTimetable} className="space-y-4">
          <div>
            <label
              htmlFor="htmlFile"
              className="block text-sm font-medium text-gray-300"
            >
              HTML File
            </label>
            <input
              required
              type="file"
              id="htmlFile"
              name="htmlFile"
              accept=".html"
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md bg-gray-700 text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="uploaderName"
              className="block text-sm font-medium text-gray-300"
            >
              Uploader&#39;s Name
            </label>
            <input
              required
              type="text"
              id="uploaderName"
              name="uploaderName"
              className="mt-1 p-2 block w-full border border-gray-600 rounded-md bg-gray-700 text-gray-300"
              placeholder="Enter your name"
            />
          </div>
          <SubmitButton>Upload</SubmitButton>
        </form>
      </div>
    </div>
  );
}

export default UploadTimetablePage;
