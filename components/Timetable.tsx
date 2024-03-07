import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

type Course = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  code: string;
  title: string;
  option: string;
  instructor: string;
  building: string;
  venue: string;
  timetableId: string;
};

const CoursePopup: React.FC<{ course: Course; onClose: () => void }> = ({
  course,
  onClose,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto border"
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-800"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Course Details
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={onClose}
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Date:
              </span>{" "}
              {course.date}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Time:
              </span>{" "}
              {course.startTime} - {course.endTime}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Course Code:
              </span>{" "}
              {course.code}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Title:
              </span>{" "}
              {course.title}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Option:
              </span>{" "}
              {course.option}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Instructor:
              </span>{" "}
              {course.instructor}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Building:
              </span>{" "}
              {course.building}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Venue:
              </span>{" "}
              {course.venue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseTable: React.FC<{ courses: Course[] }> = ({ courses }) => {
  const [showPopup, setShowPopup] = useState<Course | null>(null);

  const handlePopupClose = () => {
    setShowPopup(null);
  };

  return (
    <div className="container mx-auto p-4">
      <table className="table-auto w-full dark:text-white whitespace-nowrap">
        <thead>
          <tr className="bg-gray-800 dark:bg-gray-700">
            <th className="px-4 py-2">Course Code</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              onClick={() => setShowPopup(course)}
              key={course.id}
              className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="border px-4 py-2">{course.code}</td>
              <td className="border px-4 py-2">{course.date}</td>
              <td className="border px-4 py-2">
                {course.startTime} - {course.endTime}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowPopup(course)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <CoursePopup course={showPopup} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default CourseTable;
