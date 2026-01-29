import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const people = [
  {
    name: 'Lene Hjortshøj',
    role: 'Co-Founder & CEO',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dennis Krongaard Mikkelsen',
    role: 'Co-Founder & CTO',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Andreas Lyngaa',
    role: 'Head of Regulatory Affairs',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lasse Lund',
    role: 'Head of Product',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Thomas Ferniss',
    role: 'Lead Compliance Analyst',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Herman Hansson',
    role: 'Director of Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];


function App() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section with animated background */}
        <section className="hero-bg min-h-screen flex items-center bg-zinc-50 dark:bg-zinc-950 relative ">
          <div className="max-w-6xl mx-auto px-6 pt-20 z-10 relative">
            <div className="max-w-3xl">
              
              {/* Badge */}
              <div className="text-sm inline-flex items-center bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-200 font-medium px-4 py-1.5 rounded-full mb-6 opacity-0 translate-y-5 animate-[fade-in-up_0.9s_ease-out_0.1s_forwards]
                          sm:text-sm
                          md:text-sm
                          lg:text-sm">
                Real-time Legislative Intelligence
              </div>

              {/* Headline */}
              <h1 className="text-[3.00rem] leading-[1.1] font-semibold tracking-tighter text-zinc-900 dark:text-white mb-8 opacity-0 translate-y-5 animate-[fade-in-up_0.9s_ease-out_0.3s_forwards]
                            sm:text-[3.00rem]
                            md:text-[3.75rem]
                            lg:text-[3.75rem]">
                Your single gateway to regulatory compliance
              </h1>

              {/* Description */}
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl opacity-0 translate-y-5 animate-[fade-in-up_0.9s_ease-out_0.5s_forwards]
                            sm:text-lg
                            md:text-xl
                            lg:text-xl">
                LexApp extracts structured data directly from official legislative APIs and delivers 
                focused, actionable legal content and metadata to compliance teams in banking, fintech, 
                technology, and other highly regulated sectors.
              </p>

              {/* Buttons */}
              <div className="mt-10 flex gap-4 opacity-0 translate-y-5 animate-[fade-in-up_0.9s_ease-out_0.7s_forwards]">
                <a href="#solutions" className="text-sm px-6 py-5 bg-navy hover:bg-navy/70 text-white rounded-2xl font-medium transition-colors
                                                sm:text-sm sm:px-6 sm:py-5
                                                md:text-base md:px-8 md:py-5
                                                lg:text-base lg:px-8 lg:py-5">
                  Explore Solutions
                </a>
                <a href="#contact" className="text-sm px-6 py-5 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 dark:text-white rounded-2xl font-medium transition-colors
                                              sm:text-sm sm:px-6 sm:py-5
                                              md:text-base md:px-8 md:py-5
                                              lg:text-base lg:px-8 lg:py-5">
                  Request a demo
                </a>
              </div>
            </div>
          </div>
          {/* Particle container */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>

            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
          </div>
        </section>


        {/* Solutions Section - Tailwind UI Style (Dark) */}
        <section id="solutions" className="overflow-hidden py-24 bg-white dark:bg-zinc-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">

              {/* Left Content */}
              <div className="lg:pt-4 lg:pr-8">
                <div className="lg:max-w-lg">
                  <p className="text-4xl mt-2  font-semibold tracking-tighter text-white
                                sm:text-4xl
                                md:text-5xl
                                lg:text-5xl
                              ">
                    Stay ahead of regulatory change
                  </p>
                  <p className="text-base/7 mt-6 text-zinc-400
                              sm:text-base/7
                              md:text-lg/8
                              lg:text-lg/8">
                    Purpose-built for compliance teams in banking, fintech, and technology companies.
                  </p>

                  <dl className="text-sm/6 mt-10 max-w-xl space-y-8 text-zinc-400 lg:max-w-none
                              sm:text-sm/6
                              md:text-base/7
                              lg:text-base/7">
                    <div className="relative pl-9">
                      <div className="w-4 h-4 absolute left-1 top-1 bg-white
                                      sm:w-4 sm:h-4
                                      md:w-4 md:h-4
                                      lg:w-5 lg:h-5"></div>
                      <dt className="inline font-semibold text-white">
                        Regulatory Monitoring
                      </dt>
                      <dd className="inline pl-2">
                        Real-time tracking of regulations, directives, delegated acts, RTS, ITS, and case law.
                      </dd>
                    </div>

                    <div className="relative pl-9">
                      <div className="w-4 h-4 absolute left-1 top-1 bg-white
                                      sm:w-4 sm:h-4 
                                      md:w-4 md:h-4
                                      lg:w-5 lg:h-5"></div>
                      <dt className="inline font-semibold text-white">
                        Daily Intelligence &amp; Alerts
                      </dt>
                      <dd className="inline pl-2">
                        Personalized notifications and daily digests on legislative changes relevant to your business.
                      </dd>
                    </div>

                    <div className="relative pl-9">
                      <div className="w-4 h-4 absolute left-1 top-1 bg-white
                                      sm:w-4 sm:h-4
                                      md:w-4 md:h-4
                                      lg:w-5 lg:h-5"></div>
                      <dt className="inline font-semibold text-white">
                        Structured Navigation
                      </dt>
                      <dd className="inline pl-2">
                        Intelligent table of contents, metadata tagging, cross-references, and advanced search.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Right Screenshot - exact Tailwind style */}
              <div className="relative">
                <img
                  alt="LexApp dashboard"
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                  width={2432}
                  height={1442}
                  className="w-[36rem] max-w-none rounded-xl shadow-2xl ring-1 ring-white/10 sm:w-[40rem] md:-ml-4 lg:-ml-0"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Services Section - Bento Grid Style */}
        <section id="services" className="bg-zinc-950 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <p className="text-3xl mx-auto mt-2 max-w-lg text-center font-semibold tracking-tighter text-white
                          sm:text-3xl
                          md:text-4xl
                          lg:text-5xl">
              Comprehensive compliance intelligence
            </p>

            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              
              {/* Large Left Card - Direct API Integration */}
              <div className="relative lg:row-span-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl will-change-transform">
                <div className="absolute inset-px rounded-lg bg-zinc-900 lg:rounded-l-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem+1px)] lg:rounded-l-[calc(2rem+1px)]">
                  <div className="px-7 pt-7 pb-0
                                sm:px-7 sm:pt-7 sm:pb-0 
                                md:px-8 md:pt-8 md:pb-0
                                lg:px-10 lg:pt-10 lg:pb-0">
                    <p className="text-lg/8 mt-2 font-medium tracking-tight text-white max-lg:text-center
                                sm:text-lg/8
                                md:text-lg/8
                                lg:text-lg/8">Direct API Integration</p>
                    <p className="text-sm/6 mt-2 max-w-lg text-zinc-400 max-lg:text-center
                              sm:text-sm/6
                              md:text-sm/6
                              lg:text-sm/6">
                      Automatic ingestion from official legislative sources across EU, UK, US, and major jurisdictions.
                    </p>
                  </div>
                  <div className="relative min-h-[280px] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                    <div className="absolute inset-x-8 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-zinc-700 bg-zinc-900">
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-[2rem]" />
              </div>

              {/* Top Right Card - Domain-Specific Filtering */}
              <div className="relative max-lg:row-start-1 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl will-change-transform">
                <div className="absolute inset-px rounded-lg bg-zinc-900 max-lg:rounded-t-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                  <div className="px-7 pt-7 pb-0
                                sm:px-7 sm:pt-7 sm:pb-0
                                md:px-8 md:pt-8 md:pb-0
                                lg:px-10 lg:pt-10 lg:pb-0">
                    <p className="text-lg/8 mt-2 font-medium tracking-tight text-white max-lg:text-center
                                sm:text-lg/8
                                md:text-lg/8
                                lg:text-lg/8">Domain-Specific Filtering</p>
                    <p className="text-sm/6 mt-2 max-w-lg text-zinc-400 max-lg:text-center
                                sm:text-sm/6
                                md:text-sm/6
                                lg:text-sm/6">
                      Tailored views for fintech, banking, payments, data protection, AI governance, and cybersecurity.
                    </p>
                  </div>
                  <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                    {/* <img
                      src="src/assets/service.jpg"
                      alt="Domain Filtering"
                      className="w-full max-lg:max-w-xs"
                    /> */}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-[2rem]" />
              </div>

              {/* Bottom Right Card - Metadata & Search */}
              <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl will-change-transform">
                <div className="absolute inset-px rounded-lg bg-zinc-900" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Metadata &amp; Search</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                      Rich metadata, effective dates, compliance deadlines, and advanced search capabilities.
                    </p>
                  </div>
                  <div className="flex flex-1 items-center max-lg:py-6 lg:pb-2">
                    {/* <img
                      src="src/assets/service.jpg"
                      alt="Metadata & Search"
                      className="h-[min(152px,40cqw)] object-cover"
                    /> */}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
              </div>

              {/* Large Right Card - Audit-Ready Exports */}
              <div className="relative lg:row-span-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl will-change-transform">
                <div className="absolute inset-px rounded-lg bg-zinc-900 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Audit-Ready Exports</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-zinc-400 max-lg:text-center">
                      Exportable reports, version history, and full compliance documentation trails.
                    </p>
                  </div>
                  <div className="relative min-h-[200px] w-full grow">
                    <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-zinc-900/60 outline outline-white/10">
                      <div className="flex bg-zinc-900 outline outline-white/5">
                        <div className="-mb-px flex text-sm/6 font-medium text-zinc-400">
                          <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                            Compliance Report.pdf
                          </div>
                          <div className="border-r border-zinc-600/10 px-4 py-2">Audit Trail.csv</div>
                        </div>
                      </div>
                      <div className="px-6 pt-6 pb-14"></div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
              </div>

            </div>
          </div>
        </section>

        {/* About Section - Leadership Team */}
        <section id="about" className="py-24 bg-white dark:bg-zinc-900">
          <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
            
            {/* Left Column - Text */}
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tighter text-zinc-900 dark:text-white 
                            sm:text-3xl
                            md:text-4xl 
                            lg:text-4xl">
                Meet the team
              </h2>
              <p className="text-base/7 mt-6  text-zinc-600 dark:text-zinc-400
                            sm:text-base/7
                            md:text-lg/8
                            lg:text-lg/8">
                We’re a team of regulatory experts, technologists, and compliance professionals 
                passionate about simplifying complex legislation for financial institutions and 
                technology companies.
              </p>
            </div>

            {/* Team Grid */}
            <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <img
                      alt={person.name}
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(person.name)}&backgroundColor=0A2540&textColor=ffffff&fontSize=42`}
                      className="size-16 rounded-full object-cover outline outline-2 -outline-offset-2 outline-zinc-100 dark:outline-zinc-800"
                    />
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                        {person.name}
                      </h3>
                      <p className="text-sm font-medium text-navy dark:text-blue-400">
                        {person.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-zinc-950 text-white">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4
                            sm:text-3xl
                            md:text-4xl
                            lg:text-4xl">Ready to simplify regulatory compliance?</h2>
              <p className="text-base/7 text-zinc-400
                            sm:text-base/7
                            md:text-lg/8
                            lg:text-lg/8">
                Join leading fintechs, banks, and technology companies already using LexApp
              </p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-10 md:p-12">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-600 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Work Email</label>
                    <input
                      type="email"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-600 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Company Name</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-blue-600 transition-colors"
                    placeholder="Acme Financial"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Message / Interest</label>
                  <textarea
                    rows={5}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-4 focus:outline-none focus:border-blue-600 transition-colors resize-y min-h-[120px]"
                    placeholder="Tell us about your compliance challenges or schedule a demo..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-zinc-950 font-medium py-4 rounded-2xl hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                >
                  Request a Demo
                  <span className="text-lg">→</span>
                </button>

                <p className="text-center text-xs text-zinc-500">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-500 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          © 2026 LexApp. All rights reserved.
        </div>
      </footer>

      {/* ← Add this once at the end */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        //theme={isDarkMode ? "dark" : "light"}
        //theme="colored"          // Looks great with dark mode
        // theme="dark"          // or use this if you prefer pure dark
      />

    </>
  );
}

export default App;