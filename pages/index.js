import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLayout from '../components/PageLayout';
import Button from '../components/Button';
import {
  Brain,
  Clock,
  LineChart,
  Users,
  CheckCircle,
  Sparkles,
  FileText,
  Target,
  ArrowRight,
  Star,
  Award,
  Shield,
  Zap
} from 'lucide-react';

export default function Home() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 sm:space-y-8">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <Sparkles className="h-4 w-4 text-purple-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-700">AI-Powered Grading Platform</span>
                </div>

                <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Grade Smarter,
                  <span className="block gradient-text">Not Harder</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Transform your grading workflow with intelligent rubric generation, automated feedback assistance, and powerful analytics. Save hours every week while providing better student feedback.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" size="lg" href="http://localhost:3002/login">
                    Get Started Free
                    <ArrowRight className="inline-block ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button variant="secondary" size="lg" href="#features">
                    Learn More
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8" role="list">
                  <div role="listitem">
                    <div className="text-2xl sm:text-3xl font-bold gradient-text">85%</div>
                    <div className="text-xs sm:text-sm text-gray-600">Time Saved</div>
                  </div>
                  <div role="listitem">
                    <div className="text-2xl sm:text-3xl font-bold gradient-text">10k+</div>
                    <div className="text-xs sm:text-sm text-gray-600">Educators</div>
                  </div>
                  <div role="listitem">
                    <div className="text-2xl sm:text-3xl font-bold gradient-text">4.9/5</div>
                    <div className="text-xs sm:text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Visual */}
              <div className="relative mt-8 lg:mt-0">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300" role="img" aria-label="GradeGenius application interface preview">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-gray-700">Assignment Grading</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full font-medium">AI Assisted</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                        <span className="text-sm text-gray-600">Rubric auto-generated</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                        <span className="text-sm text-gray-600">Feedback suggestions ready</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                        <span className="text-sm text-gray-600">Consistency verified</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Grading Progress</span>
                        <span className="text-xs font-semibold text-gray-700">24/30 complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2" aria-label="Grading progress: 80% complete">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-xl p-4 transform rotate-3" aria-hidden="true">
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-xl p-3 transform -rotate-3" aria-hidden="true">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-padding bg-white" aria-labelledby="features-heading">
          <div className="container-custom">
            <div className="text-center mb-12 sm:mb-16">
              <h2 id="features-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Powerful Features for Modern Educators
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Everything you need to streamline grading, enhance feedback quality, and gain insights into student performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="list">
              {/* Feature 1 */}
              <article className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover" role="listitem">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6" aria-hidden="true">
                  <Brain className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">AI-Powered Rubrics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automatically generate comprehensive grading rubrics based on assignment requirements. Customize and refine with ease.
                </p>
              </article>

              {/* Feature 2 */}
              <article className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover" role="listitem">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6" aria-hidden="true">
                  <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Save Time</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reduce grading time by up to 85%. Intelligent automation handles repetitive tasks while you focus on meaningful feedback.
                </p>
              </article>

              {/* Feature 3 */}
              <article className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover" role="listitem">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6" aria-hidden="true">
                  <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Smart Feedback</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get AI-assisted feedback suggestions that are personalized, constructive, and aligned with your teaching style.
                </p>
              </article>

              {/* Feature 4 */}
              <article className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover" role="listitem">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6" aria-hidden="true">
                  <LineChart className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track student performance trends, identify learning gaps, and make data-driven decisions with comprehensive analytics.
                </p>
              </article>

              {/* Feature 5 */}
              <article className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover" role="listitem">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6" aria-hidden="true">
                  <Target className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Consistency</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ensure fair and consistent grading across all submissions with AI-powered consistency checks and standardized rubrics.
                </p>
              </article>

              {/* Feature 6 */}
              <article className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 card-hover" role="listitem">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6" aria-hidden="true">
                  <Users className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Student Portal</h3>
                <p className="text-gray-600 leading-relaxed">
                  Students can view grades, feedback, and track their progress through an intuitive, easy-to-use interface.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Why Choose GradeGenius - Competitive Advantages */}
        <section className="section-padding bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white" aria-labelledby="advantages-heading">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 id="advantages-heading" className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose GradeGenius Over Crowdmark & Gradescope?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See how our AI-powered platform delivers results that traditional grading tools can't match
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Advantage 1 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 card-hover">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6" aria-hidden="true">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">AI-Powered Automation</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Unlike Crowdmark and Gradescope, GradeGenius uses advanced AI to automatically generate rubrics, suggest feedback, and ensure consistency across all submissions.
                </p>
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="text-green-400 font-medium flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                    <span>10x faster than manual grading</span>
                  </div>
                </div>
              </div>

              {/* Advantage 2 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 card-hover">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6" aria-hidden="true">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Intelligent Time Savings</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  While Crowdmark and Gradescope offer basic grading workflows, GradeGenius's AI automation reduces grading time by up to 85%, giving you back hours every week.
                </p>
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="text-green-400 font-medium flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                    <span>Save 15+ hours per week on average</span>
                  </div>
                </div>
              </div>

              {/* Advantage 3 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 card-hover">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6" aria-hidden="true">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Superior Feedback Quality</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  GradeGenius doesn't just streamline grading—it enhances feedback quality with AI-assisted suggestions that are personalized, constructive, and aligned with your teaching style.
                </p>
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="text-green-400 font-medium flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                    <span>Higher student satisfaction scores</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                With GradeGenius, you're not just grading smarter—you're transforming your entire teaching experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg" 
                  href="http://localhost:3002/login"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  href="/contact"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Compare Features
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-padding bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white" aria-labelledby="how-it-works-heading">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Get started in minutes with our simple three-step process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
              <div className="text-center" role="listitem">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold" aria-hidden="true">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3">Create Assignment</h3>
                <p className="text-gray-300 leading-relaxed">
                  Upload your assignment details and let our AI generate a comprehensive rubric tailored to your requirements.
                </p>
              </div>

              <div className="text-center" role="listitem">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold" aria-hidden="true">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3">Students Submit</h3>
                <p className="text-gray-300 leading-relaxed">
                  Students upload their work through the secure portal. All submissions are organized and ready for review.
                </p>
              </div>

              <div className="text-center" role="listitem">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold" aria-hidden="true">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3">Grade with AI</h3>
                <p className="text-gray-300 leading-relaxed">
                  Review AI-assisted feedback suggestions, make adjustments, and release grades—all in a fraction of the time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600" aria-labelledby="cta-heading">
          <div className="container-custom text-center text-white">
            <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Grading?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of educators who are saving time and providing better feedback with GradeGenius.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                href="http://localhost:3002/login"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                href="/contact"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageLayout>
  );
}
