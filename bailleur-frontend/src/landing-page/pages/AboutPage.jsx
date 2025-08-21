import React from 'react';
import { Link, Code, Phone, Mail } from 'lucide-react';

const AboutPage = () => {
  const skills = [
    'Django Web Development',
    'WhatsApp API Integration',
    'Python Backend Programming',
    'React Frontend Development',
    'Responsive Web Design',
    'Database Management'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">About the Developer</h1>
            <p className="text-blue-100 text-lg">Creating solutions that make a difference</p>
          </div>

          <div className="p-8">
            <div className="text-center mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                VY
              </div>
              <h2 className="text-3xl font-semibold text-gray-800">Vasitha Sulem Yong</h2>
              <p className="text-gray-600 text-lg">Software Developer & Problem Solver</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-600">About Me</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  I'm a passionate software developer dedicated to creating innovative solutions that simplify everyday challenges. LeBailleur was born from my Dad's struggles with property management and a desire to make rent tracking seamless and stress-free.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  With a focus on practical, user-friendly applications, I believe technology should serve people, not complicate their lives. Every line of code I write is aimed at solving real-world problems.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-600">Technical Skills</h3>
                <div className="grid grid-cols-1 gap-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-semibold mb-8 text-blue-600 text-center">Let's Connect</h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.linkedin.com/in/softwareengineervasitha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <Link className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/vasitha1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300"
                >
                  <Code className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="mailto:vasitha@example.com"
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
                <a
                  href="tel:+1555-631-1809"
                  className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                    <Phone className="w-5 h-5" />
                    <span>Call</span>   
                </a>
              </div>
            </div>
            </div>
            </div>
            </div>
            </div>
    );
}

export default AboutPage;