import React, {useState, useEffect} from 'react';
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
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-12 px-4"
        style={{ backgroundImage: "url('/assets/image5.png')" }}
      >
      <h1 className="text-6xl font-gamja font-bold mb-8">Explore Projects</h1>
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
