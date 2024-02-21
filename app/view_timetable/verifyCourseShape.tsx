"use client";
import { Course } from "@/types";

export function verifyCourseShape(course: Course) {
  // Define the expected shape
  const expectedShape = {
    "SR. No": "string",
    "Course Code": "string",
    "Course Title": "string",
    Credit: "string", // You can change this to "number" if Credit should be a number
    Lecturer: "string",
    Room: "string",
    Days: "object", //this should be an array of strings
    Start: "string", // You can change this to "number" if Start should be a number
    End: "string", // You can change this to "number" if End should be a number
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
