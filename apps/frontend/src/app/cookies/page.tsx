import React from 'react';
import ScrollToTop from '@/components/ScrollToTop';

const ReadingTimeBadge = ({ textContent }: { textContent: string }) => {
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const minutes = calculateReadingTime(textContent);

  return (
    <div className="flex items-center gap-2 mt-2">
      <span className="text-sm text-slate-500 italic">
        Last updated: January 27, 2026
      </span>
      <span className="text-slate-300">•</span>
      <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">
          {minutes} min read
        </span>
      </div>
    </div>
  );
};

export default function CookiesPage() {
  // Cookie policy content for reading time calculation
  const cookiePolicyContent = `
    Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the cookie. We use cookies and similar technologies for storing and honoring your preferences and settings, enabling you to sign in, and analyzing how our services perform.
    
    DeepRubric uses cookies to provide a seamless grading experience. These technologies help us understand user behavior, tell us which parts of our website people have visited, and facilitate and measure the effectiveness of our platform features.
    
    Essential cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as:
    Authentication: Keeping you signed into your DeepRubric account.
    Security: Detecting and preventing malicious activity.
    Preferences: Remembering your privacy and cookie settings.
    
    We use analytics cookies to collect information about how visitors use our site. We use the information to compile reports and to help us improve the site. The cookies collect information in an anonymous form, including the number of visitors to the site and the pages they visited.
    
    Preference cookies allow our website to remember choices you make when you use the service, such as remembering your language preference or your specific grading rubric settings to provide a more personalized experience.
    
    DeepRubric does not sell your data to third parties. However, we may use limited marketing cookies to track the effectiveness of our own outreach campaigns and to ensure we aren't showing you duplicate advertisements for our own services.
    
    In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, such as those provided by Google Analytics or Microsoft Azure.
    
    Most web browsers allow some control of most cookies through the browser settings. You can choose to block or delete cookies, but please note that if you do so, certain features of the DeepRubric platform may no longer function correctly.
    
    To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
    
    Your mobile operating system may provide additional controls for cookies and tracking. You can usually find these in your "Settings" menu under "Privacy" or "Advertising."
    
    We may update this Cookie Policy from time to time to reflect changes in the technologies we use. We will notify you by updating the "Last updated" date at the top of this page.
    
    If you have questions about our use of cookies, please contact us at privacy@deeprubric.com.
  `;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Professional Academic Style with Sticky Behavior */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Simplified DeepRubric Logo */}
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">D</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">DeepRubric</h1>
              <p className="text-xl font-extrabold text-slate-900">Cookie Policy</p>
            </div>
          </div>
          
          {/* Sign In Button */}
          <a 
            href="/login" 
            className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all border border-indigo-200"
          >
            Sign In
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Reading Time Badge */}
        <div className="mb-8 text-center">
          <ReadingTimeBadge textContent={cookiePolicyContent} />
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <a 
              href="#what-are-cookies" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">1</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">What are Cookies</span>
            </a>
            <a 
              href="#how-use-cookies" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">2</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">How We Use Cookies</span>
            </a>
            <a 
              href="#essential-cookies" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">3</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Essential Cookies</span>
            </a>
            <a 
              href="#analytics-cookies" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">4</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Analytics Cookies</span>
            </a>
            <a 
              href="#preference-cookies" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">5</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Preference Cookies</span>
            </a>
            <a 
              href="#marketing-cookies" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">6</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Marketing Cookies</span>
            </a>
            <a 
              href="#third-party-cookies" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">7</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Third-Party Cookies</span>
            </a>
            <a 
              href="#managing-cookies" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">8</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Managing Cookies</span>
            </a>
            <a 
              href="#browser-settings" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">9</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Browser Settings</span>
            </a>
            <a 
              href="#mobile-devices" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">10</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Mobile Devices</span>
            </a>
            <a 
              href="#updates-policy" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">11</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Updates to Policy</span>
            </a>
            <a 
              href="#contact-us" 
              className="group block p-4 text-slate-700 hover:text-slate-900 rounded-xl transition-all border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full group-hover:bg-indigo-500 transition-colors"></span>
                <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">12</span>
              </div>
              <span className="font-medium group-hover:font-semibold transition-all">Contact Us</span>
            </a>
          </div>
        </div>

        {/* Cookie Policy Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:px-12">
          <div className="leading-relaxed">
            <h2 id="what-are-cookies" className="text-2xl font-bold text-slate-900 mt-12 mb-6 scroll-mt-24">1. What are Cookies</h2>
            <p className="mb-6 text-slate-700">
              Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the cookie. We use cookies and similar technologies for storing and honoring your preferences and settings, enabling you to sign in, and analyzing how our services perform.
            </p>

            <h2 id="how-use-cookies" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">2. How We Use Cookies</h2>
            <p className="mb-6 text-slate-700">
              DeepRubric uses cookies to provide a seamless grading experience. These technologies help us understand user behavior, tell us which parts of our website people have visited, and facilitate and measure the effectiveness of our platform features.
            </p>

            <h2 id="essential-cookies" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">3. Essential Cookies</h2>
            <p className="mb-6 text-slate-700">
              These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as:
            </p>
            <ul className="space-y-3 mb-8 text-slate-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong className="text-slate-900">Authentication:</strong> Keeping you signed into your DeepRubric account.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong className="text-slate-900">Security:</strong> Detecting and preventing malicious activity.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong className="text-slate-900">Preferences:</strong> Remembering your privacy and cookie settings.
              </li>
            </ul>

            <h2 id="analytics-cookies" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">4. Analytics Cookies</h2>
            <p className="mb-8 text-slate-700">
              We use these cookies to collect information about how visitors use our site. We use the information to compile reports and to help us improve the site. The cookies collect information in an anonymous form, including the number of visitors to the site and the pages they visited.
            </p>

            <h2 id="preference-cookies" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">5. Preference Cookies</h2>
            <p className="mb-8 text-slate-700">
              These cookies allow our website to remember choices you make when you use the service, such as remembering your language preference or your specific grading rubric settings to provide a more personalized experience.
            </p>

            <h2 id="marketing-cookies" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">6. Marketing Cookies</h2>
            <p className="mb-8 text-slate-700">
              DeepRubric does not sell your data to third parties. However, we may use limited marketing cookies to track the effectiveness of our own outreach campaigns and to ensure we aren't showing you duplicate advertisements for our own services.
            </p>

            <h2 id="third-party-cookies" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">7. Third-Party Cookies</h2>
            <p className="mb-8 text-slate-700">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, such as those provided by Google Analytics or Microsoft Azure.
            </p>

            <h2 id="managing-cookies" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">8. Managing Cookies</h2>
            <p className="mb-8 text-slate-700">
              Most web browsers allow some control of most cookies through the browser settings. You can choose to block or delete cookies, but please note that if you do so, certain features of the DeepRubric platform may no longer function correctly.
            </p>

            <h2 id="browser-settings" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">9. Browser Settings</h2>
            <p className="mb-8 text-slate-700">
              To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">www.allaboutcookies.org</a>.
            </p>

            <h2 id="mobile-devices" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">10. Mobile Devices</h2>
            <p className="mb-8 text-slate-700">
              Your mobile operating system may provide additional controls for cookies and tracking. You can usually find these in your "Settings" menu under "Privacy" or "Advertising."
            </p>

            <h2 id="updates-policy" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">11. Updates to This Policy</h2>
            <p className="mb-8 text-slate-700">
              We may update this Cookie Policy from time to time to reflect changes in the technologies we use. We will notify you by updating the "Last updated" date at the top of this page.
            </p>

            <h2 id="contact-us" className="text-2xl font-bold text-slate-900 mt-8 mb-6 scroll-mt-24">12. Contact Us</h2>
            <p className="mb-6 text-slate-700">
              If you have questions about our use of cookies, please contact us at:
            </p>
            <div className="space-y-3 text-slate-700">
              <p><strong>Email:</strong> <a href="mailto:privacy@deeprubric.com" className="text-indigo-600 hover:text-indigo-700">privacy@deeprubric.com</a></p>
              <p><strong>Address:</strong> DeepRubric Privacy Office, 123 Tech Street, San Francisco, CA 94107</p>
              <p><strong>Phone:</strong> <a href="tel:+15551234567" className="text-indigo-600 hover:text-indigo-700">+1 (555) 123-4567</a></p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Professional Academic Style */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Legal */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-600">
                <li><a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-indigo-600 transition-colors">Cookie Policy</a></li>
                <li><a href="/compliance" className="hover:text-indigo-600 transition-colors">Trust & Compliance</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Connect</h3>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-500 text-sm">
            © 2026 DeepRubric. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}