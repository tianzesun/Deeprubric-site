import React from "react";
import { RubricBuilder } from "@/components/dashboard/RubricBuilder";

export default function RubricsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rubric Builder</h1>
        <p className="text-gray-600">
          Create and manage grading rubrics for your courses. Use AI suggestions or build custom criteria.
        </p>
      </div>
      
      <RubricBuilder />
    </div>
  );
}