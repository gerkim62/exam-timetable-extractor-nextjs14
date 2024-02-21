import prisma from "@/libs/prisma";

export default async function ViewTimetablePage({
  searchParams,
}: {
  searchParams?: {
    courses?: string;
  };
}) {
  const courseIds = JSON.parse(
    decodeURIComponent(searchParams?.courses || "[]")
  ) as string[];

  const courses = await prisma.course.findMany({
    where: {
      code: {
        in: courseIds,
      },
    },
  });

  console.log(courses);

  return <h1>Your timetable will be displayed here</h1>;
}
