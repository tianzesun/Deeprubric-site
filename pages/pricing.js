import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, X, Zap, Building2, Users } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individual educators getting started',
      features: [
        { name: 'Up to 3 courses', included: true },
        { name: '50 assignments per month', included: true },
        { name: 'AI rubric generation', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced AI feedback', included: false },
        { name: 'Custom branding', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false }
      ],
      cta: 'Get Started Free',
      popular: false,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      name: 'Professional',
      icon: Users,
      price: '$29',
      period: '/month',
      description: 'For educators who need more power and flexibility',
      features: [
        { name: 'Unlimited courses', included: true },
        { name: 'Unlimited assignments', included: true },
        { name: 'AI rubric generation', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Advanced AI feedback', included: true },
        { name: 'Custom rubric templates', included: true },
        { name: 'Bulk operations', included: true },
        { name: 'Export data', included: true }
      ],
      cta: 'Get Started Free',
      popular: true,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Enterprise',
      icon: Building2,
      price: 'Custom',
      period: 'pricing',
      description: 'For institutions and large departments',
      features: [
        { name: 'Everything in Professional', included: true },
        { name: 'Unlimited users', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'SSO/SAML authentication', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Custom AI model training', included: true },
        { name: 'SLA guarantee', included: true },
        { name: 'On-premise deployment option', included: true },
        { name: '24/7 phone support', included: true }
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-indigo-600 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your needs. All plans include a 14-day free trial with no credit card required.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`bg-white rounded-3xl shadow-xl overflow-hidden ${
                    plan.popular ? 'ring-4 ring-purple-600 transform lg:scale-105' : ''
                  } card-hover`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 font-semibold text-sm">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.gradient} mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                      <div className="mb-6">
                        <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                        {plan.period && (
                          <span className="text-gray-600 text-lg ml-2">{plan.period}</span>
                        )}
                      </div>

                      <a
                        href={plan.name === 'Enterprise' ? '/contact' : 'http://localhost:3002/login'}
                        className={`block w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                          plan.popular
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl'
                        }`}
                      >
                        {plan.cta}
                      </a>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Is there really a free plan?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes! Our Starter plan is free forever with no credit card required. It includes all core features with usage limits suitable for individual educators managing a few courses.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Can I switch plans anytime?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Absolutely! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, and we prorate billing accordingly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                What's included in the free trial?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                The 14-day free trial gives you full access to all Professional plan features with no credit card required. No automatic billing—you only pay if you decide to continue after the trial.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Do you offer educational institution discounts?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes! We offer special pricing for educational institutions, non-profits, and bulk licenses. Contact our sales team to discuss custom pricing for your organization.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Is my data secure and FERPA compliant?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Security is our top priority. GradeGenius is fully FERPA compliant with enterprise-grade encryption, regular security audits, and strict data privacy policies. Student data is never shared with third parties.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and wire transfers for Enterprise plans. Invoicing is available for institutional customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <a href="/contact" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg inline-block">
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
