import React from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import projects from '../data/projects';

const Projects = () => {
  return (
    <Layout>
        <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-12 px-4"
        style={{ backgroundImage: "url('/assets/image4.png')" }}
      >
      <h1 className="text-5xl text-white font-gamja font-bold mb-8">Explore Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <Link
            to={`/projects/${project.id}`}
            key={project.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-200"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-3xl font-gamja font-bold">{project.name}</h2>
            <p className="text-lg font-gantari text-gray-600">
              {project.description.slice(0, 80)}...
            </p>
          </Link>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default Projects;
