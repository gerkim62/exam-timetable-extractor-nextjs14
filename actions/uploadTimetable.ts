"use server";

import { redirect } from "next/navigation";
import { tabletojson } from "tabletojson";

import prisma from "@/libs/prisma";

type CourseWith8Fields = {
  "0": string; //start time
  "1": string; //end time
  "2": string; //course code
  "3": string; //course name
  "4": string; //group/option
  "5": string; //instructor
  "6": string; //building
  "7": string; //venue
};
type CourseWith9Fields = {
  "0": "" | string; //date but can be empty sting
  "1": string; //start time
  "2": string; //end time
  "3": string; //course code
  "4": string; //course name
  "5": string; //group/option
  "6": string; //instructor
  "7": string; //building
  "8": string; //venue
};

type TimetableHeaders = {
  "0": "Date";
  "1": "Start Time";
  "2": "End Time";
  "3": "Course";
  "4": "Course Title";
  "5": "Option";
  "6": "Instructor";
  "7": "Building";
  "8": "Venue";
};

type courseLikeObject =
  | CourseWith8Fields
  | CourseWith9Fields
  | TimetableHeaders;

type Course = {
  date: string;
  startTime: string;
  endTime: string;
  code: string;
  title: string;
  option: string;
  instructor: string;
  building: string;
  venue: string;
};

async function uploadTimetable(formData: FormData) {
  let success = false;
  let errorMessage = "";
  try {
    const uploaderName = formData.get("uploaderName");
    const htmlFile = formData.get("htmlFile");

    if (typeof uploaderName !== "string") {
      throw new Error("Invalid uploader name");
    }

    // html file is a file object
    if (!(htmlFile instanceof File)) {
      throw new Error("Invalid HTML file");
    }

    //   checking the content of the file
    const htmlContent = await htmlFile.text();
    // console.log(htmlContent);
    //   parsing the html content

    if (!htmlContent || htmlContent === "") {
      throw new Error("HTML file is empty or invalid");
    }

    const tablesAsJson = tabletojson.convert(htmlContent);

    console.log(tablesAsJson[0]);
    // example
    // {
    //     '0': '2023/2024.2',
    //     '1': '',
    //     '2': 'TENTATIVE EXAM TIMETABLE',
    //     '3': '',
    //     '4': '',
    //     '5': 'READ CAREFULLY'
    //   },
    type TimetableDetailsHeader = {
      "0": string;
      "1": "";
      "2": string;
      "3": "";
      "4": "";
      "5": "READ CAREFULLY";
    };
    const timetaleDetailsHeader: TimetableDetailsHeader = tablesAsJson[0][0];
    const title = timetaleDetailsHeader["2"];
    const semester = timetaleDetailsHeader["0"];

    console.log(semester, title);

    // example
    // {
    //     '0': 'Date',
    //     '1': 'Start Time',
    //     '2': 'End Time',
    //     '3': 'Course',
    //     '4': 'Course Title',
    //     '5': 'Option',
    //     '6': 'Instructor',
    //     '7': 'Building',
    //     '8': 'Venue'
    //   },

    const timetableHeaders: TimetableHeaders = tablesAsJson[0][1];

    console.log(timetableHeaders);

    const courses: Course[] = [];

    let lastDate: string | null = null;
    tablesAsJson.forEach((table) => {
      table.forEach((courseLikeObject: courseLikeObject) => {
        // console.log(courseLikeObject);
        // the number of fields
        const fieldsCount = Object.keys(courseLikeObject).length;
        console.log(fieldsCount);

        if (fieldsCount === 8) {
          console.log("course with 8 fields");
          if (!lastDate)
            console.log(
              "No last date, what do we do now, oh my god!",
              lastDate
            );

          const courseWith8Fields = courseLikeObject as CourseWith8Fields;
          const course: Course = {
            date: lastDate || "",
            startTime: courseWith8Fields["0"],
            endTime: courseWith8Fields["1"],
            code: courseWith8Fields["2"],
            title: courseWith8Fields["3"],
            option: courseWith8Fields["4"],
            instructor: courseWith8Fields["5"],
            building: courseWith8Fields["6"],
            venue: courseWith8Fields["7"],
          };

          courses.push(course);
        } else if (fieldsCount === 9) {
          const isHeader = isTimetableHeaders(
            courseLikeObject as CourseWith9Fields | TimetableHeaders
          );

          if (isHeader) {
            console.log("just a header");
          } else {
            console.log("course with 9 fields");
            // console.log(courseLikeObject);
            const courseWith9Fields = courseLikeObject as CourseWith9Fields;
            const date =
              courseWith9Fields["0"].length > 5
                ? courseWith9Fields["0"]
                : lastDate || "";

            console.log("we will use date", date);
            const course: Course = {
              date: date,
              startTime: courseWith9Fields["1"],
              endTime: courseWith9Fields["2"],
              code: courseWith9Fields["3"],
              title: courseWith9Fields["4"],
              option: courseWith9Fields["5"],
              instructor: courseWith9Fields["6"],
              building: courseWith9Fields["7"],
              venue: courseWith9Fields["8"],
            };

            courses.push(course);

            lastDate = course.date;
            // console.log(course);
            console.log("update lastDate to", lastDate);
          }
        } else {
          console.log("not processing object with", fieldsCount, "fields");
          console.log(courseLikeObject);
        }
      });
    });

    console.log(courses);

    console.log("Creating in mongodb ...");
 

    await createTimetableWithCoursesInBatches({
      semester,
      title,
      uploaderName,
      courses,
      batchSize: 100,
    });

    success = true;
  } catch (error) {
    console.error(error);
    errorMessage =
      error instanceof Error
        ? error.message
        : `An error occurred ${encodeURIComponent(JSON.stringify(error))}`;
  }

  if (success) {
    redirect("/upload_success");
  } else {
    redirect(`/error?message=${errorMessage ?? "An error occurred"}`);
  }
}

function isTimetableHeaders(
  courseLikeObject: CourseWith9Fields | TimetableHeaders
) {
  const headers: TimetableHeaders = {
    "0": "Date",
    "1": "Start Time",
    "2": "End Time",
    "3": "Course",
    "4": "Course Title",
    "5": "Option",
    "6": "Instructor",
    "7": "Building",
    "8": "Venue",
  };

  for (let key in headers) {
    // @ts-expect-error
    if (courseLikeObject[key] !== headers[key]) {
      return false;
    }
  }

  return true;
}

async function createTimetableWithCoursesInBatches({
  semester,
  title,
  uploaderName,
  courses,
  batchSize,
}: {
  semester: string;
  title: string;
  uploaderName: string;
  courses: Course[];
  batchSize: number;
}) {
  console.log(
    `creating timetable with title ${title} and semester ${semester} and uploader name ${uploaderName}`
  );
  // Create timetable entry
  const timetable = await prisma.timetable.create({
    data: {
      semester,
      title,
      uploaderName,
    },
    select: {
      id: true,
    },
  });

  console.log(`created timetable with id ${timetable.id}`);

  // Create courses in batches and associate them with the timetable
  for (let i = 0; i < courses.length; i += batchSize) {
    const batch = courses.slice(i, i + batchSize);
    console.log(`Creating batch of courses ${i} to ${i + batchSize} ...`);
    await createBatchOfCoursesAndAssociateWithTimetable({ batch, timetable });
    console.log("done creating batch of courses ...");
  }

  console.log("done creating all courses ...");
}

// Function to create a batch of courses and associate them with the timetable
async function createBatchOfCoursesAndAssociateWithTimetable({
  batch,
  timetable,
}: {
  batch: Course[];
  timetable: {
    id: string;
  };
}) {
  await prisma.course.createMany({
    data: batch.map((course) => ({
      ...course,
      timetableId: timetable.id,
    })),
  });
}

export default uploadTimetable;
