import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('https://umi-b.onrender.com/api/projects')
      .then((res) => setProjects(res.data))
      .catch((err) => console.error('Error fetching projects:', err));
  }, []);

  return (
    <Layout>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-12 px-4 sm:px-6 lg:px-12"
        style={{ backgroundImage: "url('/assets/image5.png')" }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-gamja font-bold mb-10 text-white drop-shadow-md">
          Explore Projects
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link
                to={`/projects/${project.id}`}
                key={project.id}
                className="bg-white bg-opacity-90 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:shadow-xl transition duration-200 flex flex-col"
              >
                <img
                  src={project.image || '/assets/placeholder.jpg'}
                  alt={project.name}
                  className="w-full h-48 sm:h-56 object-cover rounded-xl mb-4"
                />
                <h2 className="text-2xl sm:text-3xl font-gamja font-bold mb-2">
                  {project.name}
                </h2>
                <p className="text-base sm:text-lg font-gantari text-gray-700">
                  {project.description ? project.description.slice(0, 100) + '...' : 'No description available.'}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-white text-xl font-gantari col-span-full">
              No projects found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
