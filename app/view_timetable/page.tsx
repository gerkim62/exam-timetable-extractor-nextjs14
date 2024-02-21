"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseDetails from "@/components/CourseDetails";
import Timetable from "@/components/Timetable";
import { Course } from "@/types";
import Loading from "@/components/Loading";
import Link from "next/link";
import { FaArrowLeft, FaCalendar } from "react-icons/fa6";
import Popup from "@/components/Popup";
import { verifyCourseShape } from "./verifyCourseShape";

const Page = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const full_name = useSearchParams().get("full_name");
  const [courses, setCourses] = useState<Course[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [noCourses, setNoCourses] = useState(false);

  function getCoursesFromSearchParams(searchParams: URLSearchParams) {
    const coursesParam = searchParams.get("courses");
    console.log(coursesParam);
    if (coursesParam) {
      try {
        const courses = JSON.parse(coursesParam);
        console.log(courses);
        if (Array.isArray(courses) && courses.every(verifyCourseShape)) {
          console.log(`is array and every course is valid`);
          return courses;
        }
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  }

  function getCoursesFromLocalStorage() {
    const courses = localStorage.getItem("courses");
    if (courses) {
      try {
        const parsedCourses = JSON.parse(courses);
        if (
          Array.isArray(parsedCourses) &&
          parsedCourses.every(verifyCourseShape)
        ) {
          return parsedCourses;
        }
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  }

  function saveCourses(courses: Course[]) {
    localStorage.setItem("courses", JSON.stringify(courses));

    //if no courses are present in the URL, redirect to the URL with the courses
    if (getCoursesFromSearchParams(searchParams).length === 0) {
      console.log("replace since no courses in URL");
      router.replace(`/timetable?courses=${JSON.stringify(courses)}`);

      setCourses(courses);
    }
  }

  //effect that runs on mount

  useEffect(() => {
    const courses = getCoursesFromSearchParams(searchParams);
    if (courses.length > 0) {
      console.log("courses found in URL, saving");
      saveCourses(courses);
    } else {
      const courses = getCoursesFromLocalStorage();
      if (courses.length > 0) {
        console.log("courses found in local storage, saving");
        router.replace(`/timetable?courses=${JSON.stringify(courses)}`);
      } else {
        setNoCourses(true);
        console.log("no courses found in URL or local storage");
      }
    }

    setCourses(courses);
    console.log(courses);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, searchParams]);

  //redirect to error page if no courses are found
  useEffect(() => {
    if (noCourses) {
      router.replace("/");
    }
  }, [noCourses]);

  return (
    <div className="p-4 w-[100vw] overflow-auto">
      <h1 className="text-2xl font-semibold mb-4  !text-center fixed left-0 right-0 ">
        Your Timetable{" "}
        <span role="img" aria-label="timetable">
          
        </span>
      </h1>
      {/* placeholder since above is fixed, transparent */}
      <div className="h-12 opacity-0">j</div>
      {courses.length > 0 ? (
        <div className="flex">
          <Timetable
            courses={courses}
            setSelectedCourse={setSelectedCourse}
            fullName={full_name}
          />
          <div className="">...</div>
        </div>
      ) : (
        <Loading />
      )}

      <Popup
        message="Click on the Course Code to view course details."
        id="courseDetails"
      />

      {selectedCourse && (
        <div
          onClick={() => setSelectedCourse(null)}
          className="fixed inset-0 bg-black bg-opacity-80 z-10 flex justify-center items-center"
        >
          <CourseDetails course={selectedCourse} />
        </div>
      )}

      {/* placeholder since button is fixed, transparent */}
      <div className="h-1 opacity-0">j</div>
      {/* button for discarding and creating another (link) */}

      {!!courses.length && (
        <Link
          href="/"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center max-w-max mx-auto focus:outline-none focus:shadow-outline leading-wide fixed left-0 right-0"
        >
          <FaArrowLeft className="mr-2" /> Create another timetable
        </Link>
      )}
    </div>
  );
};

export default Page;
