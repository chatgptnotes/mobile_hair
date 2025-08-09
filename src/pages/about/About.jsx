import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common_components/navbar/Navbar'
import Footer from '../../components/common_components/footer/Footer'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Headz Hair Fixing</h1>
            <p className="text-xl leading-relaxed text-purple-100">
              Non-surgical hair restoration company founded in 2006 with 38+ branches globally, 
              serving over 100,000 customers with innovative American technology adapted for Indian conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Background */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Founding Story</h2>
                <p className="text-gray-600 mb-4">
                  Dileep Mohan founded Headz Hair Fixing in 2006 in Bangalore after working for an international 
                  hair fixing company. With his Professional Masters Degree and certification as a Wellness Consultant, 
                  he identified the need for an "Indian version" of hair fixing specifically adapted for Indian climatic conditions.
                </p>
                <p className="text-gray-600 mb-4">
                  His research revealed that people were "fed up trying unscientific treatments," leading him to focus 
                  on non-surgical solutions using American technology.
                </p>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <p className="text-purple-800 font-semibold">
                    From a single Bangalore outlet in 2006 to 38+ branches across multiple countries, 
                    serving over 100,000 customers in 15+ years.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-3xl font-bold text-purple-600">38+</div>
                    <div className="text-gray-600">Global Branches</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-3xl font-bold text-blue-600">100K+</div>
                    <div className="text-gray-600">Customers Served</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-3xl font-bold text-green-600">2006</div>
                    <div className="text-gray-600">Founded</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="text-3xl font-bold text-orange-600">15+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔗</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hair Bonding</h3>
                <p className="text-gray-600 text-sm">
                  Imported dermatologically tested adhesives to permanently attach hair patches with monthly maintenance.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🧵</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hair Weaving</h3>
                <p className="text-gray-600 text-sm">
                  Creating knot wefts in existing hair strands and interlocking hair patches with bi-monthly maintenance.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📎</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hair Clipping</h3>
                <p className="text-gray-600 text-sm">
                  Temporary, removable solutions using clips with no maintenance requirements.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hair Extensions</h3>
                <p className="text-gray-600 text-sm">
                  Permanent micro ring installations and temporary daily wear options in various styles and colors.
                </p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Immediate Transformation in Just 2 Hours</h3>
              <p className="text-lg opacity-90 mb-6">
                No surgery, no pain, no lifestyle disruption. You can swim, travel, and engage in sports post-procedure.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">✓ Non-Surgical</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">✓ Immediate Results</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">✓ No Lifestyle Changes</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">✓ Climate Adapted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Technology & Methods</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">American Technology Adapted for India</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1 mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">100% Indian Remy Hair:</strong>
                      <span className="text-gray-600"> Processed and treated for reuse, imported from South Korea</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1 mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Silicon-Based Patch Materials:</strong>
                      <span className="text-gray-600"> Mimic natural scalp with abundant air passage holes</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1 mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Advanced Micro Ring Weaving:</strong>
                      <span className="text-gray-600"> Replacing older clipping methods for better results</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1 mr-3">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Custom Manufacturing:</strong>
                      <span className="text-gray-600"> Matching original hair color and texture perfectly</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quality Materials</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Dermatologically Tested Adhesives</h4>
                    <p className="text-gray-600 text-sm">Safe, imported adhesives for permanent bonding procedures</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Temple Natural Remy Hair</h4>
                    <p className="text-gray-600 text-sm">Premium extensions with natural texture and appearance</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Polymer-Based Scalp Bases</h4>
                    <p className="text-gray-600 text-sm">Advanced materials for natural-looking hair systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pricing Structure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">Hair Services</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">₹15,000 - ₹70,000</div>
                <p className="text-green-700 text-sm mb-4">Depending on hair quality, coverage area, and materials</p>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Natural human hair (premium pricing)</li>
                  <li>• Machine-made options (lower cost)</li>
                  <li>• Custom coverage solutions</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Hair Extensions</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">From ₹9,000</div>
                <p className="text-blue-700 text-sm mb-4">Varies by length and density requirements</p>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Permanent micro ring installations</li>
                  <li>• Temporary daily wear options</li>
                  <li>• Various styles and colors</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-800 mb-4">Maintenance</h3>
                <div className="text-2xl font-bold text-orange-600 mb-2">₹900 - ₹1,500</div>
                <p className="text-orange-700 text-sm mb-4">Monthly maintenance services</p>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li>• Headz customers: ₹900 normal, ₹1,500 premium</li>
                  <li>• Outside customers: ₹1,100</li>
                  <li>• DIY maintenance kits available</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Affordable alternatives to expensive hair transplants (₹4,400-₹12,000 range)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Global Presence</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Headquarters</h3>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
                  <p className="text-gray-800 font-semibold mb-2">Bangalore, India</p>
                  <p className="text-gray-600 text-sm mb-2">
                    No.429, 2nd floor, 7th Main Road, HRBR Layout, Kalyan Nagar, Bangalore – 560043
                  </p>
                  <p className="text-gray-600 text-sm">
                    Phone: +91 98866 11110<br/>
                    Email: contactus@refixmyhair.com
                  </p>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Indian Locations</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Major Cities</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Mumbai</li>
                      <li>• Chennai</li>
                      <li>• Hyderabad</li>
                      <li>• Delhi</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Regional Coverage</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Kerala</li>
                      <li>• Karnataka</li>
                      <li>• Tamil Nadu</li>
                      <li>• 29+ locations</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">International Branches</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-800 mb-1">United Kingdom</h4>
                    <p className="text-sm text-red-700">London, Portsmouth</p>
                    <p className="text-xs text-red-600">159 Ryefield Ave, Uxbridge</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-1">United Arab Emirates</h4>
                    <p className="text-sm text-blue-700">Dubai, Sharjah, Abu Dhabi</p>
                    <p className="text-xs text-blue-600">Serving local markets and Indian diaspora</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-1">Kuwait</h4>
                    <p className="text-sm text-green-700">Dedicated branch with local staff</p>
                    <p className="text-xs text-green-600">Specialized for Middle East climate</p>
                  </div>
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white text-center">
                  <h4 className="text-xl font-bold mb-2">Market Coverage</h4>
                  <p className="text-sm opacity-90">
                    Operating in a $6.46 billion global market projected to reach $18.92 billion by 2030
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Leadership</h2>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl">👨‍💼</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Dileep Mohan</h3>
              <p className="text-lg text-purple-600 font-semibold mb-4">Concept Director & Founder</p>
              <div className="max-w-2xl mx-auto">
                <p className="text-gray-600 mb-4">
                  Professional Masters Degree holder and certified Wellness Consultant with extensive experience 
                  in international hair fixing companies. Founded Headz Hair Fixing in 2006 with a vision to 
                  create climate-adapted hair restoration solutions for Indian customers.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Professional Masters</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Wellness Consultant</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">18+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Look?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-purple-100">
            Join over 100,000 satisfied customers who have experienced our non-surgical hair restoration solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/trynow" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Try AI Hair Transformation
            </Link>
            <Link 
              to="/gallery" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About