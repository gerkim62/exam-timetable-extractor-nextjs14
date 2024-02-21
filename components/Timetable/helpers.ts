import { Course, CourseWithColor, Timestamp } from "@/types";

export function extractTopHeaders(courses: Course[]) {
  const topHeaders: Timestamp[] = [];

  // Iterate through each course to extract start and end times
  courses.forEach((course) => {
    const { Start, End } = course;

    // Check if the start and end times are not already in the topHeaders array
    if (
      !topHeaders.some((header) => header.start === Start && header.end === End)
    ) {
      topHeaders.push({ start: Start, end: End });
    }
  });

  // Sort the top headers based on the start time
  topHeaders.sort((a, b) => {
    return a.start.localeCompare(b.start);
  });

  return topHeaders;
}

export function addColorToCourses(courses: Course[]): CourseWithColor[] {
  // Create a map to store course codes and their corresponding color codes
  const courseColorMap: { [key: string]: string } = {};

  // Iterate through each course to add a color property
  const coursesWithColor: CourseWithColor[] = courses.map((course, index) => {
    // If the course code is not in the map, add it with a new color code
    if (!courseColorMap[course["Course Code"]]) {
      courseColorMap[course["Course Code"]] = `--color-course-${index + 1}`;
    }

    return {
      ...course,
      color: courseColorMap[course["Course Code"]],
    };
  });

  return coursesWithColor;
}

export function toAmPmTime(time24: string) {
  const [hours, minutes] = time24.split(":").map(Number);
  const meridiem = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const hoursString = displayHours < 10 ? "0" + displayHours : displayHours;
  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hoursString}:${displayMinutes}${meridiem}`;
}
