import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Target, Users, Heart, Award, TrendingUp, Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="gradient-text">GradeGenius</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to empower educators with AI-powered tools that save time, enhance feedback quality, and improve student outcomes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Our Mission</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Transforming Education Through Technology
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                GradeGenius was founded by educators who experienced firsthand the challenges of grading at scale. We spent countless hours providing feedback, often sacrificing personal time and detailed attention that each student deserves.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform leverages cutting-edge AI technology to automate repetitive tasks, allowing educators to focus on what matters most: meaningful interactions with students and personalized teaching.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Excellence in Education</h3>
                    <p className="text-sm text-gray-600">Recognized by leading educational institutions worldwide</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Continuous Innovation</h3>
                    <p className="text-sm text-gray-600">Regular updates and new features based on educator feedback</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Security First</h3>
                    <p className="text-sm text-gray-600">FERPA compliant with enterprise-grade security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">Principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Educator-Centric</h3>
              <p className="text-gray-600 leading-relaxed">
                We build tools designed by educators, for educators. Your feedback shapes our product roadmap.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Student Success</h3>
              <p className="text-gray-600 leading-relaxed">
                Every feature we build is designed to improve student learning outcomes and engagement.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We leverage the latest AI technology to solve real problems in education, not just for the sake of tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-lg opacity-90">Active Educators</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500K+</div>
              <div className="text-lg opacity-90">Assignments Graded</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-lg opacity-90">Time Saved</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-lg opacity-90">Institutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded in 2023 by a team of educators and technologists
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              GradeGenius began when our founding team—professors at major universities—realized they were spending more time on administrative grading tasks than on actual teaching and mentorship. We saw brilliant educators burning out, students receiving generic feedback, and the potential of technology largely untapped in the grading process.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We asked ourselves: "What if AI could handle the repetitive aspects of grading while preserving the human touch that makes feedback meaningful?" That question sparked the creation of GradeGenius.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we're proud to serve over 10,000 educators across 200+ institutions, helping them reclaim their time while improving the quality and consistency of student feedback. Our journey is just beginning, and we're excited to continue innovating in partnership with the education community.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Become part of a growing community of educators transforming how they grade and provide feedback.
          </p>
          <a href="http://localhost:3002/login" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg inline-block">
            Get Started Free
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
