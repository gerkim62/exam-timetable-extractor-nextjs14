"use client";
import { Course } from "@/types";

export function verifyCourseShape(course: Course) {
  // Define the expected shape
  const expectedShape = {
    id: "65d63625404315ebdac0cada",
    date: "Wed, 23-04-2024",
    startTime: "02:00 PM",
    endTime: "05:00 PM",
    code: "COSC343",
    title: "FOUNDATIONS OF HUMAN COMPUTER INTERA",
    option: "Main",
    instructor: "OMAMBIA ANDREW AUNDA O",
    building: "Auditorium",
    venue: "AUD",
    timetableId: "65d63622404315ebdac0c894",
  };

  // Check if all keys in expectedShape are present in obj
  for (let key in expectedShape) {
    if (!(key in course)) {
      return false;
    }
  }

  // Check if the types of values match the expected types
  for (let key in expectedShape) {
    // @ts-ignore
    if (typeof course[key] !== expectedShape[key]) {
      return false;
    }
  }

  // If all checks pass, return true
  return true;
}

[
  {
    id: "65d63623404315ebdac0c915",
    date: "Tue, 15-04-2024",
    startTime: "07:00 AM",
    endTime: "10:00 AM",
    code: "COSC238",
    title: "PROFESSIONAL PRACTICES IN IT",
    option: "Main",
    instructor: "NJOROGE ROSELINE NYAMWA",
    building: "Auditorium",
    venue: "AUD",
    timetableId: "65d63622404315ebdac0c894",
  },
  {
    id: "65d63623404315ebdac0c955",
    date: "Tue, 15-04-2024",
    startTime: "02:00 PM",
    endTime: "05:00 PM",
    code: "COSC272",
    title: "OBJECT ORIENTED DESIGN AND PROGRAMMIN",
    option: "Group A",
    instructor: "MBATA KEVIN MAYAKA",
    building: "Auditorium",
    venue: "AUD",
    timetableId: "65d63622404315ebdac0c894",
  },
  {
    id: "65d63624404315ebdac0c962",
    date: "Wed, 16-04-2024",
    startTime: "07:00 AM",
    endTime: "10:00 AM",
    code: "COSC241",
    title: "Software Architecture and Design",
    option: "Main",
    instructor: "MBATA KEVIN MAYAKA",
    building: "Auditorium",
    venue: "AUD",
    timetableId: "65d63622404315ebdac0c894",
  },
  {
    id: "65d63624404315ebdac0ca0d",
    date: "Fri, 18-04-2024",
    startTime: "10:30 AM",
    endTime: "01:30 PM",
    code: "COSC217",
    title: "INTRODUCTION TO LINUX ADMINISTRATION",
    option: "Main",
    instructor: "MBATA KEVIN MAYAKA",
    building: "Auditorium",
    venue: "AUD",
    timetableId: "65d63622404315ebdac0c894",
  },
  {
    id: "65d63625404315ebdac0ca6d",
    date: "Tue, 22-04-2024",
    startTime: "07:00 AM",
    endTime: "10:00 AM",
    code: "COSC222",
    title: "FUNDAMENTALS OF SOFTWARE ENGINEERING",
    option: "Main",
    instructor: "MBATA KEVIN MAYAKA",
    building: "Auditorium",
    venue: "AUD",
    timetableId: "65d63622404315ebdac0c894",
  },
  {
    id: "65d63625404315ebdac0caaf",
    date: "Wed, 23-04-2024",
    startTime: "07:00 AM",
    endTime: "10:00 AM",
    code: "COSC272",
    title: "OBJECT ORIENTED DESIGN AND PROGRAMMIN",
    option: "Group A",
    instructor: "MBATA KEVIN MAYAKA",
    building: "Auditorium",
    venue: "AUD",
    timetableId: "65d63622404315ebdac0c894",
  },
  {
    id: "65d63625404315ebdac0cacf",
    date: "Wed, 23-04-2024",
    startTime: "10:30 AM",
    endTime: "01:30 PM",
    code: "COSC272",
    title: "OBJECT ORIENTED DESIGN AND PROGRAMMIN",
    option: "Group B",
    instructor: "MOBISA FRED",
    building: "Auditorium",
    venue: "AUD",
    timetableId: "65d63622404315ebdac0c894",
  },
  {
    id: "65d63625404315ebdac0cada",
    date: "Wed, 23-04-2024",
    startTime: "02:00 PM",
    endTime: "05:00 PM",
    code: "COSC343",
    title: "FOUNDATIONS OF HUMAN COMPUTER INTERA",
    option: "Main",
    instructor: "OMAMBIA ANDREW AUNDA O",
    building: "Auditorium",
    venue: "AUD",
    timetableId: "65d63622404315ebdac0c894",
  },
];
