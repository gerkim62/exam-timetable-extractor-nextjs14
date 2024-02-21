"use client";

import React, { useEffect, useState } from "react";
import "./Timetable.css";
import { Course, Day } from "@/types";
import { addColorToCourses, extractTopHeaders, toAmPmTime } from "./helpers";


type Props = {
  setSelectedCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  courses: Course[];
  fullName: string | null;
};

const Timetable = ({ setSelectedCourse, courses, fullName }: Props) => {
  const coursesWithColor = addColorToCourses(courses);

  const DAYS_MAP = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  const DOUBLE_CLICK_MESSAGE = "Double click here to edit Title";

  const [title, setTitle] = useState(fullName || DOUBLE_CLICK_MESSAGE);

  useEffect(() => {
    if (title !== DOUBLE_CLICK_MESSAGE) {
      localStorage.setItem("title", title);
    }
    const oldTitle = localStorage.getItem("title");
    if (oldTitle) {
      setTitle(oldTitle);
    }
  }, []);

  const topHeaders = extractTopHeaders(courses);
  let leftHeaders: Day[] = ["mon", "tue", "wed", "thu", "fri"];
  const preferredCourseIdentifier = "Course Code";

  const NO_COURSE_MESSAGE = "No Class";

  return (
    <table className="mx-auto sm:rotate-0">
      <caption
        className="capitalize"
        onDoubleClick={() => {
          const newTitle =
            prompt(
              "Enter new title",
              title === DOUBLE_CLICK_MESSAGE ? "" : title
            )?.trim() || title;

          setTitle(newTitle);

          localStorage.setItem("title", newTitle);
        }}
      >
        {title || `Double click here to edit title`}
      </caption>
      <thead>
        <tr key="timestamps" className="timestamps">
          <th
            className="intersection flex flex-col justify-between uppercase"
            key="intersection"
          >
            <p className="self-end flex items-center justify-between">Time</p>
            <p className="self-start flex items-center justify-between">Day</p>
          </th>
          {topHeaders.map((timestamp, index) => (
            <th key={index}>
              <p>{toAmPmTime(timestamp.start)}</p>
              <p>{toAmPmTime(timestamp.end)}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody key={"tbody"}>
        {leftHeaders.map((day, index) => (
          <tr key={index}>
            <th className="day">{DAYS_MAP[day]}</th>
            {topHeaders.map((timestamp, idx) => {
              const currentCourses = coursesWithColor.filter(
                (course) =>
                  course.Days.includes(day) &&
                  course.Start === timestamp.start &&
                  course.End === timestamp.end
              );
              return (
                <td
                  onClick={() => {
                    setSelectedCourse(
                      currentCourses.length > 0 ? currentCourses[0] : null
                    );
                  }}
                  key={`${index}-${idx}`}
                  style={{
                    backgroundColor: `var(${
                      currentCourses.length > 0
                        ? currentCourses[0].color
                        : "--default-color"
                    })`,
                  }}
                >
                  {currentCourses.length > 0
                    ? currentCourses[0][preferredCourseIdentifier]
                    : NO_COURSE_MESSAGE}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={topHeaders.length + 1}>
            <p>❤️ Made by developer.gerison ❤️</p>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Timetable;
