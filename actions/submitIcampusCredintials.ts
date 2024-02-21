"use server";

import prisma from "@/libs/prisma";

import { API_URL } from "@/constants/api";
import {
  ErrorScraperResponse,
  ScraperResponse,
  SuccessfullScraperResponse,
} from "@/types";
import { redirect } from "next/navigation";

async function submitIcampusCredintials(formData: FormData) {
  let isError = false;
  let errorMessage = "";
  let encodedCourses = "";
  let fullName = "";
  try {
    const username = formData.get("username");
    const password = formData.get("password");

    // console.log(username, password)

    if (typeof username !== "string" || typeof password !== "string") {
      throw new Error("Invalid username or password");
    }

    console.log(`fetching timetable for ${username}`);
    const result: ScraperResponse = await fetchTimetable({
      username,
      password,
    });

    console.log(result);

    if (result.error.exists) {
      isError = true;
      errorMessage = `Could not fetch your courses from iCampus. ${
        (result as ErrorScraperResponse).error.possible_cause
      }`;
    } else {
      const data = result as SuccessfullScraperResponse;
      const coursesCodes = data.timetable.map((course) => {
        return course["Course Code"];
      });

      fullName = data.user.full_name;

      console.log(coursesCodes);
      const courses = await prisma.course.findMany({
        where: {
          code: {
            in: coursesCodes,
          },
        },
      });

      encodedCourses = encodeURIComponent(JSON.stringify(courses));
    }
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    isError = true;
  }

  if (isError) {
    redirect(`/error?message=${errorMessage}`);
  } else if (encodedCourses) {
    redirect(`/view_timetable?courses=${encodedCourses}&full_name=${fullName}`);
  } else {
    redirect(
      `/error?message=Unknown error occurred. Please try manually selecting your courses.`
    );
  }
}

async function fetchTimetable(credentials: {
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      console.log(response);
      // throw new Error("Failed to fetch timetable");
    }

    const data = await response.json();
    console.log(data);
    return data as ScraperResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default submitIcampusCredintials;
