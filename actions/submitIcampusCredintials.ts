"use server";

import prisma from "@/libs/prisma";

import { API_URL } from "@/constants/api";
import {
  ErrorScraperResponse,
  ScraperResponse,
  SuccessfullScraperResponse,
} from "@/types";
import { redirect } from "next/navigation";
import successResponse from "@/constants/example-api-res";

async function submitIcampusCredintials(formData: FormData) {
  let isError = false;
  let errorMessage = "";
  let encodedCourses = "";
  let fullName = "";
  try {
    const username = formData.get("username");
    const password = formData.get("password");

    // console.log(username, password)

    if (!username || !password) {
      throw new Error("Invalid username or password");
    }

    if (typeof username !== "string" || typeof password !== "string") {
      throw new Error("Invalid username or password");
    }

    console.log(`fetching timetable for ${username}`);
    const result: ScraperResponse = //successResponse;
      await fetchTimetable({
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
      const coursesCodes = data.timetable.map(
        (course) => course["Course Code"]
      );

      fullName = data.user.full_name;

      try {
        
      
      const courses =
        //  [
        //   {
        //     id: "65d63623404315ebdac0c915",
        //     date: "Tue, 15-04-2024",
        //     startTime: "07:00 AM",
        //     endTime: "10:00 AM",
        //     code: "COSC238",
        //     title: "PROFESSIONAL PRACTICES IN IT",
        //     option: "Main",
        //     instructor: "NJOROGE ROSELINE NYAMWA",
        //     building: "Auditorium",
        //     venue: "AUD",
        //     timetableId: "65d63622404315ebdac0c894",
        //   },
        //   {
        //     id: "65d63623404315ebdac0c955",
        //     date: "Tue, 15-04-2024",
        //     startTime: "02:00 PM",
        //     endTime: "05:00 PM",
        //     code: "COSC272",
        //     title: "OBJECT ORIENTED DESIGN AND PROGRAMMIN",
        //     option: "Group A",
        //     instructor: "MBATA KEVIN MAYAKA",
        //     building: "Auditorium",
        //     venue: "AUD",
        //     timetableId: "65d63622404315ebdac0c894",
        //   },
        //   {
        //     id: "65d63624404315ebdac0c962",
        //     date: "Wed, 16-04-2024",
        //     startTime: "07:00 AM",
        //     endTime: "10:00 AM",
        //     code: "COSC241",
        //     title: "Software Architecture and Design",
        //     option: "Main",
        //     instructor: "MBATA KEVIN MAYAKA",
        //     building: "Auditorium",
        //     venue: "AUD",
        //     timetableId: "65d63622404315ebdac0c894",
        //   },
        //   {
        //     id: "65d63624404315ebdac0ca0d",
        //     date: "Fri, 18-04-2024",
        //     startTime: "10:30 AM",
        //     endTime: "01:30 PM",
        //     code: "COSC217",
        //     title: "INTRODUCTION TO LINUX ADMINISTRATION",
        //     option: "Main",
        //     instructor: "MBATA KEVIN MAYAKA",
        //     building: "Auditorium",
        //     venue: "AUD",
        //     timetableId: "65d63622404315ebdac0c894",
        //   },
        //   {
        //     id: "65d63625404315ebdac0ca6d",
        //     date: "Tue, 22-04-2024",
        //     startTime: "07:00 AM",
        //     endTime: "10:00 AM",
        //     code: "COSC222",
        //     title: "FUNDAMENTALS OF SOFTWARE ENGINEERING",
        //     option: "Main",
        //     instructor: "MBATA KEVIN MAYAKA",
        //     building: "Auditorium",
        //     venue: "AUD",
        //     timetableId: "65d63622404315ebdac0c894",
        //   },
        //   {
        //     id: "65d63625404315ebdac0caaf",
        //     date: "Wed, 23-04-2024",
        //     startTime: "07:00 AM",
        //     endTime: "10:00 AM",
        //     code: "COSC272",
        //     title: "OBJECT ORIENTED DESIGN AND PROGRAMMIN",
        //     option: "Group A",
        //     instructor: "MBATA KEVIN MAYAKA",
        //     building: "Auditorium",
        //     venue: "AUD",
        //     timetableId: "65d63622404315ebdac0c894",
        //   },
        //   {
        //     id: "65d63625404315ebdac0cacf",
        //     date: "Wed, 23-04-2024",
        //     startTime: "07:00 AM",
        //     endTime: "10:00 AM",
        //     code: "COSC272",
        //     title: "OBJECT ORIENTED DESIGN AND PROGRAMMIN",
        //     option: "Group B",
        //     instructor: "MOBISA FRED",
        //     building: "Auditorium",
        //     venue: "AUD",
        //     timetableId: "65d63622404315ebdac0c894",
        //   },
        //   {
        //     id: "65d63625404315ebdac0cada",
        //     date: "Wed, 23-04-2024",
        //     startTime: "02:00 PM",
        //     endTime: "05:00 PM",
        //     code: "COSC343",
        //     title: "FOUNDATIONS OF HUMAN COMPUTER INTERA",
        //     option: "Main",
        //     instructor: "OMAMBIA ANDREW AUNDA O",
        //     building: "Auditorium",
        //     venue: "AUD",
        //     timetableId: "65d63622404315ebdac0c894",
        //   },
        // ];
        await prisma.course.findMany({
          where: {
            code: {
              in: coursesCodes,
            },
          },
        });

      encodedCourses = encodeURIComponent(JSON.stringify(courses));
    } catch (error) {
        console.log('Failed to fetch courses from db')
        throw new Error("Database connection error. Ask developer.gerison to fix this.")
    }
    }
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    isError = true;
    
  }

  if (isError) {
    redirect(`/error?message=${errorMessage}`);
  } else if (encodedCourses) {
    console.log(`redirecting to /view_timetable?courses=${encodedCourses}`);
    redirect(`/view_timetable?courses=${encodedCourses}&full_name=${fullName}`);
  } else {
    redirect(
      `/error?message=Unknown error occurred.`
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
