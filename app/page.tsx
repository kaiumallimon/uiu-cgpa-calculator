"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [previousCGPA, setPreviousCGPA] = useState<number | null>(0.0);
  const [creditsCompleted, setCreditsCompleted] = useState<number | null>(0);
  const [showHeader, setShowHeader] = useState(false);

  const [courses, setCourses] = useState<
    Array<{ courseName: string; creditHours: number; gradePoint: number }>
  >([{ courseName: "", creditHours: 0, gradePoint: 0.0 }]);

  const grades = [
    { value: 4.0, label: "A" },
    { value: 3.67, label: "A-" },
    { value: 3.33, label: "B+" },
    { value: 3.0, label: "B" },
    { value: 2.67, label: "B-" },
    { value: 2.33, label: "C+" },
    { value: 2.0, label: "C" },
    { value: 1.67, label: "C-" },
    { value: 1.33, label: "D+" },
    { value: 1.0, label: "D" },
    { value: 0.0, label: "F" },
  ];

  // scroll to toggle header visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateCGPA = () => {
    if (previousCGPA === null || creditsCompleted === null) return "0.00";

    let totalQualityPoints = previousCGPA * creditsCompleted;
    let totalCredits = creditsCompleted;

    courses.forEach((course) => {
      totalQualityPoints += course.gradePoint * course.creditHours;
      totalCredits += course.creditHours;
    });

    return totalCredits === 0 ? "0.00" : (totalQualityPoints / totalCredits).toFixed(2);
  };

  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      totalQualityPoints += course.gradePoint * course.creditHours;
      totalCredits += course.creditHours;
    });

    return totalCredits === 0 ? "0.00" : (totalQualityPoints / totalCredits).toFixed(2);
  };

  const calculateCreditsCompleted = () => {
    let totalCredits = courses.reduce((sum, course) => sum + course.creditHours, 0);
    return creditsCompleted ? totalCredits + creditsCompleted : totalCredits;
  };

  const handleAddCourse = () => {
    setCourses([...courses, { courseName: "", creditHours: 0, gradePoint: 0.0 }]);
  };

  const handleCourseChange = (
    index: number,
    field: keyof (typeof courses)[0],
    value: string | number
  ) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    setCourses(updatedCourses);
  };

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 pt-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Animated Sticky Header */}
      <AnimatePresence>
        {showHeader && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/60 border-b border-gray-200 shadow-sm z-50"
          >
            <div className="flex justify-center items-center py-4 md:py-6 gap-3">
              <Image
                src="/United_International_University_Monogram.svg"
                alt="UIU Logo"
                width={40}
                height={40}
              />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                UIU CGPA Calculator
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="max-w-4xl mx-auto space-y-8 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/United_International_University_Monogram.svg"
              alt="cgpa-illustration"
              width={140}
              height={300}
              className="mb-6"
            />
          </motion.div>

          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              UIU CGPA Calculator
            </h1>
            <p className="text-gray-600 text-center max-w-xl">
              Calculate your Cumulative Grade Point Average (CGPA) easily by entering
              your previous CGPA, completed credits, and current trimester details.
            </p>
          </motion.div>

          {/* Inputs for Previous CGPA + Credits */}
          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 border p-4 rounded-lg bg-white shadow-sm">
            <div className="space-y-2">
              <Label>Previous CGPA</Label>
              <Input
                type="number"
                step="0.01"
                className="border-gray-200"
                placeholder="e.g. 3.75"
                onChange={(e) => setPreviousCGPA(parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Credits Completed</Label>
              <Input
                type="number"
                step="1"
                className="border-gray-200"
                placeholder="e.g. 15"
                onChange={(e) => setCreditsCompleted(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Course Inputs */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Add Courses</Label>

          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                {/* Course Name */}
                <div className="sm:col-span-5 space-y-2">
                  <Label>Course Name</Label>
                  <Input
                    type="text"
                    className="border-gray-200"
                    placeholder="e.g. CSE 1111 or Structured Programming"
                    value={course.courseName}
                    onChange={(e) =>
                      handleCourseChange(index, "courseName", e.target.value)
                    }
                  />
                </div>

                {/* Credit Hours */}
                <div className="sm:col-span-2 space-y-2">
                  <Label>Credits</Label>
                  <Input
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

                {/* Grade Select */}
                <div className="sm:col-span-3 space-y-2">
                  <Label>Grade</Label>
                  <Select
                    value={course.gradePoint.toFixed(2)}
                    onValueChange={(value) =>
                      handleCourseChange(index, "gradePoint", parseFloat(value))
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade.value} value={grade.value.toFixed(2)}>
                          {grade.label} ({grade.value.toFixed(2)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Remove Button */}
                <div className="sm:col-span-2 flex items-end">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full"
                  >
                    <Button
                      variant="destructive"
                      onClick={() => removeCourse(index)}
                      className="w-full flex justify-center items-center gap-2"
                    >
                      <IconTrash className="h-4 w-4" />
                      Remove
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Course Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleAddCourse}
              className="w-full sm:w-auto bg-[#f2531c] text-white hover:bg-[#f2531c]/90 transition-colors duration-300"
            >
              + Add Course
            </Button>
          </motion.div>
        </div>


          
        

        {/* Results Section */}
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Credits Completed</p>
              <p className="text-2xl font-bold text-[#f2531c]">
                {calculateCreditsCompleted()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Current Trimester GPA</p>
              <p className="text-2xl font-bold text-[#f2531c]">
                {isNaN(Number(calculateGPA())) ? "N/A" : calculateGPA()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Overall CGPA</p>
              <p className="text-2xl font-bold text-[#f2531c]">
                {isNaN(Number(calculateCGPA())) ? "N/A" : calculateCGPA()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-14 mb-12 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            © {new Date().getFullYear()} UIU CGPA Calculator. All rights reserved.
          </p>
          <p>
            Developed by:{" "}
            <a
              className="font-bold text-blue-500 hover:opacity-55 transition-all duration-300"
              href="http://github.com/kaiumallimon"
            >
              Kaium Al Limon
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
