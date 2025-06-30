import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import projects from '../data/projects';

const Project = () => {
    const { id } = useParams();
    const project = projects.find((p) => p.id === id);

    if (!project) return <Layout><p>Project not found</p></Layout>;

    const progress = (project.raised / project.goal) * 100;

    return (
        <Layout>
            <div className='p-10'>

            
            <div className="bg-[#14D30D] bg-opacity-30 rounded-2xl shadow-xl px-10 py-8 flex flex-col md:flex-row gap-10 items-start">
                {/* Left: Image + Avatar + Progress */}
                <div className="w-full md:w-[40%]">
                    <img
                        src={project.image || "/assets/placeholder.jpg"}
                        alt={project.name}
                        className="w-full aspect-[507/436] object-cover rounded-xl"
                    />

                    <div className="flex items-center mt-4">
                        <img
                            src="/assets/avatar_black_4.jpg"
                            alt="avatar"
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <p className="text-sm font-bold text-gray-600">Raised By:</p>
                            <p className="text-md font-bold">{project.raisedBy}</p>
                        </div>
                    </div>

                    <div className="h-2 w-full bg-gray-300 mt-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>


                {/* Right: Details */}
                <div className="flex-1 font-gantari text-gray-800">
                    <h1 className="text-6xl font-gamja font-bold mb-3">{project.name}</h1>
                    <p className="text-lg leading-7 mb-4">
                        {project.description || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis nibh magna. Proin luctus interdum ex quis faucibus. Praesent mollis molestie purus vitae tincidunt. Nullam at diam elementum, gravida arcu vitae, aliquet magna.`}
                    </p>

                    <div className="text-lg font-medium mb-4">
                        <p className="text-green-700 font-semibold mb-1">Benefits:</p>
                        <ul className="list-disc list-inside text-green-700">
                            {project.benefits.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </div>

                    <button className="bg-lime-500 text-white mb-2 font-bold px-6 py-2 text-lg rounded-xl hover:bg-lime-600 mt-2">
                        Donate Now!
                    </button>

                    <div className="mt-2 text-red-400 text-sm">
                        🔴 Just a heads up :) <br />
                        Please read all the related documents carefully before making any transaction
                    </div>

                    <div className="mt-6 bg-green-100 p-4 rounded-xl shadow-inner">
                        <p className="text-lg font-bold text-gray-900">
                            Raised: <span className="text-blue-600">{project.raised} ETH</span> / {project.goal} ETH
                        </p>
                        <p className="text-sm mt-1 text-gray-700">
                            Contributed by: {project.contributors} people
                        </p>
                        <p className="text-sm text-red-500 font-bold">
                            Highest Tip: {project.highestTip} ETH
                        </p>
                    </div>

                    <a
                        href={project.link}
                        className="block mt-6 text-blue-600 text-lg underline hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        www.example.net.com
                    </a>
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default Project;
