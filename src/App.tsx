// import { Button } from "@/components/ui/button"

import { useState } from "react";

export function App() {
  const projects = [
    { id: 1, title: "Railway Ticketing", tech: "Laravel + React", category: "Fullstack", color: "bg-blue-500" },
    { id: 2, title: "Tokyo Ghoul Wiki", tech: "Next.js + Tailwind", category: "Frontend", color: "bg-red-500" },
    { id: 3, title: "SaaS POS System", tech: "MERN Stack", category: "Fullstack", color: "bg-green-500" },
    { id: 4, title: "QA Automation Bot", tech: "Python + Selenium", category: "QA", color: "bg-yellow-500" },
  ];

const [search, setSearch] = useState<string>("");
const [selectedCategory, setSelectedCategory] = useState<string>("All");

const filteredProjects = projects.filter((project) => {
  const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
  const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || project.tech.toLowerCase().includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});
  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-900">
      <div className="mt-8 w-full max-w-md">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects" className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 mb-2" />
      </div>
      <div className="mt-8 w-full max-w-md">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 mb-2">
          <option value="All">All</option>
          <option value="Fullstack">Fullstack</option>
          <option value="Frontend">Frontend</option>
          <option value="QA">QA</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((filteredProject) => (
          <div key={filteredProject.id} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-t-slate-800 text-gray-900">
            <h1 className="text-xl font-bold text-gray-900">{filteredProject.title}</h1>
            <p className="text-gray-600">{filteredProject.tech}</p>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center mt-10 text-gray-600 text-xl">No projects found</div>
      )}
    </div>
  )
}

export default App
