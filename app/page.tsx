"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { IconTrash } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [previousCGPA, setPreviousCGPA] = useState<number | null>(0.00);
  const [creditsCompleted, setCreditsCompleted] = useState<number | null>(0);

  const [courses, setCourses] = useState<
    Array<{ courseName: string; creditHours: number; gradePoint: number }>
  >([{ courseName: "", creditHours: 0, gradePoint: 0.00 }]);

  const grades = [
    { value: 4.00, label: "A" },
    { value: 3.67, label: "A-" },
    { value: 3.33, label: "B+" },
    { value: 3.00, label: "B" },
    { value: 2.67, label: "B-" },
    { value: 2.33, label: "C+" },
    { value: 2.00, label: "C" },
    { value: 1.67, label: "C-" },
    { value: 1.33, label: "D+" },
    { value: 1.00, label: "D" },
    { value: 0.00, label: "F" },
  ];

  const calculateCGPA = () => {
    if (previousCGPA === null || creditsCompleted === null) return "0.00";

    let totalQualityPoints = previousCGPA * creditsCompleted;
    let totalCredits = creditsCompleted;

    courses.forEach((course) => {
      totalQualityPoints += course.gradePoint * course.creditHours;
      totalCredits += course.creditHours;
    });

    return (totalQualityPoints / totalCredits).toFixed(2);
  };

  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      totalQualityPoints += course.gradePoint * course.creditHours;
      totalCredits += course.creditHours;
    });
    
    if (totalCredits === 0) return "0.00";
    return (totalQualityPoints / totalCredits).toFixed(2);
  };

  const calculateCreditsCompleted = () => {
    let totalCredits = 0;

    courses.forEach((course) => {
      totalCredits += course.creditHours;
    });

    if (creditsCompleted!=0) {
      totalCredits += creditsCompleted!;
    }
    
    return totalCredits;
  }



  // 🧩 Add a new empty course row
  const handleAddCourse = () => {
    setCourses([
      ...courses,
      { courseName: "", creditHours: 0, gradePoint: 0.00 },
    ]);
  };

  // 🧩 Update course info dynamically
  const handleCourseChange = (
    index: number,
    field: keyof (typeof courses)[0],
    value: string | number
  ) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value,
    };
    setCourses(updatedCourses);
  };

  const removeCourse = (index: number) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col items-center">
          <Image
            src="/United_International_University_Monogram.svg"
            alt="cgpa-illustration"
            width={140}
            height={300}
            className="mb-6"
          />

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">UIU CGPA Calculator</h1>
            <p className="text-gray-600 text-center max-w-xl">
              Calculate your Cumulative Grade Point Average (CGPA) easily by
              entering your previous CGPA, completed credits, and current trimester
              details.
            </p>
          </div>
        
          
          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-lg bg-white">
            <div className="space-y-2">
              <Label>Previous CGPA</Label>
              <Input
                type="number"
                step="0.01"
                className=" border-gray-200"
                placeholder="Previous CGPA; e.g. 3.75"
                onChange={(e) => setPreviousCGPA(parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Credits Completed</Label>
              <Input
                type="number"
                step="1"
                className="border-gray-200"
                placeholder="Credits Completed; e.g. 15"
                onChange={(e) => setCreditsCompleted(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Course Inputs */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Add Courses</Label>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-5 space-y-2">
                    <Label htmlFor={`course-name-${index}`}>Course Name</Label>
                    <Input
                      id={`course-name-${index}`}
                      type="text"
                      className="border-gray-200"
                      placeholder="e.g. CSE 1111 or Structured Programming Langugage"
                      value={course.courseName}
                      onChange={(e) =>
                        handleCourseChange(index, "courseName", e.target.value)
                      }
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor={`credit-hours-${index}`}>Credits</Label>
                    <Input
                      id={`credit-hours-${index}`}
                      type="number"
                      className="border-gray-200"
                      placeholder="e.g. 3"
                      value={course.creditHours || ""}
                      onChange={(e) =>
                        handleCourseChange(
                          index,
                          "creditHours",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="sm:col-span-3 space-y-2">
                    <Label htmlFor={`grade-${index}`}>Grade</Label>
                    <Select
                      value={course.gradePoint.toFixed(2)}
                      onValueChange={(value) =>
                        handleCourseChange(index, "gradePoint", parseFloat(value))
                      }
                    >
                      <SelectTrigger id={`grade-${index}`} className="bg-white">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map((grade) => (
                          <SelectItem 
                            key={grade.value} 
                            value={grade.value.toFixed(2)}
                          >
                            {grade.label} ({grade.value.toFixed(2)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 flex items-end">
                    <Button
                      variant="destructive"
                      onClick={() => removeCourse(index)}
                      className="w-full"
                    >
                      <IconTrash className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Course Button */}
          <Button
            onClick={handleAddCourse}
            className="w-full sm:w-auto bg-[#f2531c] text-white hover:bg-[#f2531c]/90 transition-colors duration-300"
          >
            + Add Course
          </Button>
        </div>

        {/* Show Calculated CGPA */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Credits Completed</p>
              <p className="text-2xl font-bold text-[#f2531c]">{calculateCreditsCompleted()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Current Trimester GPA</p>
              <p className="text-2xl font-bold text-[#f2531c]"> {isNaN(Number(calculateGPA())) ? "N/A" : calculateGPA()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Overall CGPA</p>
              <p className="text-2xl font-bold text-[#f2531c]">
                {isNaN(Number(calculateCGPA())) ? "N/A" : calculateCGPA()}
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-14 mb-12 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} UIU CGPA Calculator. All rights reserved.</p>
        <p>Developed by: <a className="font-bold text-blue-500 hover:opacity-55 transition-all duration-300" href="http://github.com/kaiumallimon">Kaium Al Limon</a></p>
        </div>
    </div>
  );
}
