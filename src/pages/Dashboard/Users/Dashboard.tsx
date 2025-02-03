import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Folder } from "lucide-react";

const files = [
  { name: "Blogs", type: "Sketch", date: "21.03.2019" },
  { name: "Gymnastic", type: "Photoshop", date: "20.03.2019" },
  { name: "Newmount", type: "Illustrator", date: "20.03.2019" },
  { name: "Manual app", type: "Sketch", date: "12.01.2019" },
];

const folders = [
  { name: "Products", bg: "bg-indigo-600 text-white" },
  { name: "Orders", bg: "bg-[#9ACBD0] text-white" },
  { name: "Users", bg: "bg-[#E16A54] text-white" },
];

const courses = [
  { name: "Products", progress: 50, total: 140, color: "text-red-600" },
  { name: "Orders", progress: 45, total: 120, color: "text-purple-600" },
  { name: "Blogs", progress: 25, total: 210, color: "text-blue-600" },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Recently Used Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recently Used
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {folders.map((folder, index) => (
            <Card
              key={index}
              className={`p-6 rounded-xl shadow-md ${folder.bg} transition-transform hover:scale-105`}
            >
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Folder className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">{folder.name}</h3>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-200 cursor-pointer" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* New Files Section */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            New Files
          </h2>
          <Button
            variant="outline"
            className="text-sm px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            View All
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mt-4 overflow-x-auto">
          <table className="w-full min-w-[400px] text-left">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-4">File Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-4">{file.name}</td>
                  <td className="p-4">{file.type}</td>
                  <td className="p-4">{file.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*  Progress Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Progress
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="p-6 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800 transition-transform hover:scale-105"
            >
              <CardContent className="flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle
                      className="text-gray-300 dark:text-gray-600"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                    />
                    <circle
                      className={`${course.color} stroke-current`}
                      strokeWidth="4"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                      strokeDasharray="100"
                      strokeDashoffset={100 - course.progress}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xl font-semibold">
                    {course.progress}%
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {course.name}
                </h3>
                <p className="text-gray-500">{course.total}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
