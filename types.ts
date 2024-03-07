export type Course = {
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

export type CourseWithColor = Course & { color: string };

export type SuccessfullScraperResponse = {
  timetable: {
    "SR. No": string;
    "Course Code": string;
    "Course Title": string;
    Credit: string;
    Lecturer: string;
    Room: string;
    Days: Day[];
    Start: string;
    End: string;
  }[];
  time_taken: {
    browser_launch: number;
    login: number;
    fetch_timetable: number;
  };
  error: {
    exists: false;
  };

  user: {
    full_name: string;
  };
};

export type ErrorScraperResponse = {
  error: {
    code: number;
    exists: true;
    message: string;
    possible_cause: string;
  };
};

export type Timestamp = {
  start: string;
  end: string;
  date: string;
};

export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type ScraperResponse = ErrorScraperResponse | SuccessfullScraperResponse;
