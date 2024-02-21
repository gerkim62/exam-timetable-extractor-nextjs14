// @ts-nocheck

import React from "react";
import { BiTime } from "react-icons/bi";
import { AiOutlineBook, AiOutlineFieldTime } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { MdRoom } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import "./CourseDetails.css";
import { Course } from "@/types";
import { GiTeacher } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";

const CourseDetails = ({ course }: { course: Course }) => {
  const {
    "SR. No": srNo,
    "Course Code": courseCode,
    "Course Title": courseTitle,
    Credit,
    Lecturer,
    Room,
    Days,
    Start,
    End,
  } = course;

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function toAmPmTime(time24: string) {
    const [hours, minutes] = time24.split(":").map(Number);
    const meridiem = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${displayHours}:${displayMinutes}${meridiem}`;
  }

  return (
    <div className={` _properties`}>
      <div
        onClick={(e) => e.stopPropagation()}
        id="properties-custom-card"
        className="custom-card"
      >
        <div className="circle">
          <h2 id="code">{courseCode}</h2>
        </div>
        <div className="content">
          <ul>
            <li tooltip="Course Title" flow="left">
              <AiOutlineBook />
              <p id="title">{courseTitle}</p>
            </li>

            <li tooltip="Lecturer" flow="left">
              <FaUserCheck />
              <p id="instructor">{Lecturer}</p>
            </li>
            <li tooltip="Room" flow="left">
              <MdRoom />
              <p id="building">{Room}</p>
            </li>
            <li tooltip="Days" flow="left">
              <IoCalendarClearOutline />
              <p id="days">{Days.map(capitalize).join(", ")}</p>
            </li>
            <li tooltip="Time" flow="left">
              <BiTime />
              <p className="whitespace-nowrap" id="time">
                {toAmPmTime(Start)} - {toAmPmTime(End)}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
