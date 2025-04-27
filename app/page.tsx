"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sections = [
  { 
    id: "home", 
    label: "Home",
    submenu: [
      { id: "rhythm", label: "Rhythm & Play" },
      { id: "teachers", label: "Know Our Teachers" },
      { id: "community", label: "Community & Care" },
      { id: "story", label: "The Uday Story" },
      { id: "application", label: "Application" }
    ]
  },
  { id: "pedagogy", label: "Pedagogy" },
  { id: "blogs", label: "Blogs" },
  { id: "podcasts", label: "Podcasts" },
  { id: "events", label: "Events" },
  { 
    id: "video-library", 
    label: "Video Library",
    submenu: [
      { id: "testimonials", label: "Testimonials" }
    ]
  },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [navBg, setNavBg] = useState("rgba(255, 255, 255, 0.8)")
  const [navBorder, setNavBorder] = useState("1px solid rgba(0, 0, 0, 0.1)")
  const [navVisible, setNavVisible] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)
  const sectionsRef = useRef<{
    home: HTMLDivElement | null
    pedagogy: HTMLDivElement | null
    blogs: HTMLDivElement | null
    podcasts: HTMLDivElement | null
    events: HTMLDivElement | null
    rhythm: HTMLDivElement | null
    teachers: HTMLDivElement | null
    community: HTMLDivElement | null
    story: HTMLDivElement | null
    application: HTMLDivElement | null
    'video-library': HTMLDivElement | null
    testimonials: HTMLDivElement | null
    cta: HTMLDivElement | null
  }>({
    home: null,
    pedagogy: null,
    blogs: null,
    podcasts: null,
    events: null,
    rhythm: null,
    teachers: null,
    community: null,
    story: null,
    application: null,
    'video-library': null,
    testimonials: null,
    cta: null
  })

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)

      // Set navigation visibility based on scroll position
      setNavVisible(position > 100)

      // Update active section
      const viewPosition = position + window.innerHeight / 3
      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (viewPosition >= sectionTop && viewPosition < sectionBottom) {
          setActiveSection(key)
        }
      })
      
      // Update nav background opacity based on scroll
      const opacity = Math.min(position / 200, 0.95)
      setNavBg(`rgba(255, 255, 255, ${opacity})`)
      setNavBorder(`1px solid rgba(0, 0, 0, ${opacity * 0.1})`)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to initialize
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (section: 'home' | 'pedagogy' | 'blogs' | 'podcasts' | 'events' | 'teachers' | 'story' | 'cta' | 'video-library' | 'testimonials' | 'rhythm' | 'community' | 'application') => {
    const element = sectionsRef.current[section];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = href.slice(1) as 'home' | 'pedagogy' | 'blogs' | 'podcasts' | 'events' | 'teachers' | 'story' | 'cta' | 'video-library' | 'testimonials' | 'rhythm' | 'community' | 'application';
      scrollToSection(section);
    }
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        style={{
          backgroundColor: navBg,
          borderBottom: navBorder,
        }}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            <div className="text-xl font-serif font-bold text-stone-800 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="UDAY Waldorf School Logo"
                  width={144}
                  height={144}
                  className="mr-2"
                />
              </Link>
            </div>

            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <div key={section.id} className="relative group">
                <button
                    onClick={() => {
                      if (!section.submenu) {
                        scrollToSection(section.id as keyof typeof sectionsRef.current);
                      }
                      setOpenSubmenu(openSubmenu === section.id ? null : section.id);
                    }}
                    className={`text-sm font-medium flex items-center ${
                    activeSection === section.id ? "text-amber-600" : "text-stone-600 hover:text-stone-800"
                  } transition-colors duration-300`}
                >
                  {section.label}
                    {section.submenu && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </button>
                  
                  {section.submenu && (
                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-white rounded-lg shadow-lg border border-stone-100 py-2">
                        {section.submenu.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              scrollToSection(item.id as keyof typeof sectionsRef.current);
                              setOpenSubmenu(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
                          >
                            {item.label}
                </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-stone-600 hover:text-stone-800 focus:outline-none"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 bg-white rounded-b-lg shadow-lg animate-fadeIn">
              <div className="flex flex-col space-y-1">
                {sections.map((section) => (
                  <div key={section.id}>
                  <button
                    onClick={() => {
                        if (!section.submenu) {
                          scrollToSection(section.id as keyof typeof sectionsRef.current);
                      setMobileMenuOpen(false);
                        } else {
                          setOpenSubmenu(openSubmenu === section.id ? null : section.id);
                        }
                    }}
                      className={`flex items-center justify-between w-full text-sm font-medium px-4 py-2 ${
                      activeSection === section.id 
                        ? "text-amber-600 bg-amber-50" 
                        : "text-stone-600 hover:text-stone-800 hover:bg-stone-50"
                      } transition-all duration-300`}
                  >
                    {section.label}
                      {section.submenu && (
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openSubmenu === section.id ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </button>
                    
                    {section.submenu && openSubmenu === section.id && (
                      <div className="bg-stone-50 px-2">
                        {section.submenu.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              scrollToSection(item.id as keyof typeof sectionsRef.current);
                              setMobileMenuOpen(false);
                              setOpenSubmenu(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
                          >
                            {item.label}
                  </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Dawn - Welcome Section */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionsRef.current.home = el
        }}
        className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Waldorf-inspired artistic background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <svg 
            className="w-full h-full"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Sky gradient */}
            <defs>
              <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffebc2" />
                <stop offset="100%" stopColor="#fed290" />
              </linearGradient>
              <radialGradient id="sun" cx="50%" cy="30%" r="30%" fx="50%" fy="30%">
                <stop offset="0%" stopColor="#ffda8a" />
                <stop offset="70%" stopColor="#f9b954" />
                <stop offset="100%" stopColor="#f9b954" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="rainbow1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff7878" />
                <stop offset="100%" stopColor="#ff9a78" />
              </linearGradient>
              <linearGradient id="rainbow2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffce79" />
                <stop offset="100%" stopColor="#fddd7e" />
              </linearGradient>
              <linearGradient id="rainbow3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#beffa8" />
                <stop offset="100%" stopColor="#85e37d" />
              </linearGradient>
              <linearGradient id="rainbow4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#90d2ff" />
                <stop offset="100%" stopColor="#73c2ff" />
              </linearGradient>
              <linearGradient id="rainbow5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d3a4ff" />
                <stop offset="100%" stopColor="#bb8dff" />
              </linearGradient>
            </defs>
            
            {/* Background */}
            <rect width="100%" height="100%" fill="url(#sky)" />
            
            {/* Sun */}
            <circle cx="50%" cy="30%" r="20%" fill="url(#sun)" className="animate-pulse" style={{animationDuration: '8s'}} />
            
            {/* Rainbow */}
            <path d="M250,500 C250,650 750,650 750,500" fill="none" stroke="url(#rainbow1)" strokeWidth="20" strokeLinecap="round" opacity="0.9" />
            <path d="M280,520 C280,650 720,650 720,520" fill="none" stroke="url(#rainbow2)" strokeWidth="20" strokeLinecap="round" opacity="0.9" />
            <path d="M310,540 C310,650 690,650 690,540" fill="none" stroke="url(#rainbow3)" strokeWidth="20" strokeLinecap="round" opacity="0.9" />
            <path d="M340,560 C340,650 660,650 660,560" fill="none" stroke="url(#rainbow4)" strokeWidth="20" strokeLinecap="round" opacity="0.9" />
            <path d="M370,580 C370,650 630,650 630,580" fill="none" stroke="url(#rainbow5)" strokeWidth="20" strokeLinecap="round" opacity="0.9" />
            
            {/* Trees */}
            <g transform="translate(150, 550)">
              <path d="M0,0 L0,-120 C10,-140 40,-140 50,-120 C60,-140 90,-140 100,-120 L100,0 Z" fill="#85b665" />
              <rect x="40" y="0" width="20" height="50" fill="#8b6e4e" />
            </g>
            <g transform="translate(750, 570)">
              <path d="M0,0 L0,-100 C10,-120 40,-120 50,-100 C60,-120 90,-120 100,-100 L100,0 Z" fill="#78a457" />
              <rect x="40" y="0" width="20" height="40" fill="#8b6e4e" />
            </g>
            
            {/* Flowers */}
            <g transform="translate(250, 650)">
              <circle cx="0" cy="0" r="15" fill="#ff9a9a" />
              <circle cx="5" cy="-5" r="5" fill="#ffce79" />
            </g>
            <g transform="translate(650, 670)">
              <circle cx="0" cy="0" r="12" fill="#ffb6d9" />
              <circle cx="4" cy="-4" r="4" fill="#ffce79" />
            </g>
            <g transform="translate(450, 680)">
              <circle cx="0" cy="0" r="10" fill="#a4c2ff" />
              <circle cx="3" cy="-3" r="3" fill="#ffce79" />
            </g>
            
            {/* Children silhouettes */}
            <g transform="translate(330, 620)">
              <circle cx="15" cy="15" r="15" fill="#8b6e4e" /> {/* head */}
              <path d="M15,30 L15,70 M0,45 L30,45 M5,80 L15,70 L25,80" stroke="#8b6e4e" strokeWidth="8" strokeLinecap="round" />
            </g>
            <g transform="translate(600, 630)">
              <circle cx="12" cy="12" r="12" fill="#8b6e4e" /> {/* head */}
              <path d="M12,24 L12,60 M0,40 L24,40 M4,70 L12,60 L20,70" stroke="#8b6e4e" strokeWidth="7" strokeLinecap="round" />
            </g>
            
            {/* Paintbrush */}
            <g transform="translate(380, 600) rotate(30)">
              <rect x="0" y="0" width="50" height="10" rx="2" fill="#e49b5f" />
              <rect x="-15" y="0" width="15" height="10" fill="#ff5555" />
            </g>
            
            {/* Grass */}
            <path d="M0,670 C200,650 300,680 500,670 C700,660 800,680 1000,670 L1000,800 L0,800 Z" fill="#9ed36a" />
            
            {/* Grass tufts */}
            <path d="M100,670 C110,640 120,670 130,640 C140,670 150,640 160,670" fill="none" stroke="#85b665" strokeWidth="3" />
            <path d="M400,670 C410,645 420,670 430,645 C440,670 450,645 460,670" fill="none" stroke="#85b665" strokeWidth="3" />
            <path d="M700,670 C710,640 720,670 730,640 C740,670 750,640 760,670" fill="none" stroke="#85b665" strokeWidth="3" />
            <path d="M900,670 C910,650 920,670 930,650 C940,670 950,650 960,670" fill="none" stroke="#85b665" strokeWidth="3" />
          </svg>
        </div>
        
        {/* Text overlay with centered content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-sm p-8 rounded-xl shadow-lg animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-amber-900 mb-6 leading-tight tracking-wide shadow-text">
              Where childhood awakens, naturally.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-sans text-stone-800 mb-12 animation-delay-200 max-w-2xl mx-auto">
              A Waldorf-inspired school in Jaipur nurturing joyful, whole-child learning.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animation-delay-300">
              <Button
                onClick={() => scrollToSection("pedagogy")}
                className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-64"
              >
                A Day At Uday <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                onClick={() => scrollToSection("events")}
                className="rounded-lg bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-64"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
        
        {/* Subtle nature elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150" fill="none" preserveAspectRatio="none" className="w-full h-auto">
            <path d="M0,96L60,85.3C120,75,240,53,360,64C480,75,600,117,720,122.7C840,128,960,96,1080,80C1200,64,1320,64,1380,64L1440,64L1440,150L1380,150C1320,150,1200,150,1080,150C960,150,840,150,720,150C600,150,480,150,360,150C240,150,120,150,60,150L0,150Z" 
                  fill="#ffffff" fillOpacity="0.8"/>
          </svg>
        </div>
      </section>

      {/* The UDAY Difference Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 text-center animate-fadeIn">
              The UDAY Difference: Where Learning Feels Like Home
            </h2>
            <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 animate-fadeIn animation-delay-200">
              At UDAY, we create an environment where children feel safe, loved, and free to explore their full potential.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fadeIn animation-delay-300">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-3 text-center">Nurturing Environment</h3>
                <p className="text-stone-600 text-center">
                  Our classrooms are designed to feel like a second home, with natural materials, warm colors, and spaces that encourage creativity and comfort.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fadeIn animation-delay-400">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-3 text-center">Individual Attention</h3>
                <p className="text-stone-600 text-center">
                  Small class sizes ensure that each child receives the personal attention they need to thrive and develop at their own pace.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fadeIn animation-delay-500">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-3 text-center">Community Spirit</h3>
                <p className="text-stone-600 text-center">
                  Parents, teachers, and children form a close-knit community that supports and celebrates each child's unique journey.
                </p>
              </div>
            </div>

            <div className="text-center mt-12 animate-fadeIn animation-delay-600">
              <Button
                onClick={() => scrollToSection("pedagogy")}
                className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Discover Our Approach <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Morning - Learning Section */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionsRef.current.pedagogy = el
        }}
        className="min-h-screen py-20 relative"
      >
        {/* Background texture removed */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 text-center animate-fadeIn">
            The Joy of Discovery
          </h2>
          <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 animate-fadeIn animation-delay-200">
            At UDAY, learning happens through exploration, creativity, and connection with the natural world.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-amber-50 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn animation-delay-200">
              <div className="h-48 mb-4 rounded-xl overflow-hidden relative group">
                <Image
                  src="https://images.unsplash.com/photo-1613950190144-4f2a84c75e8c"
                  alt="Children creating rainbow craft with paper hearts"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2">Painting Emotions</h3>
              <p className="text-stone-600">
                Children express their inner world through watercolors, developing emotional intelligence alongside
                creativity.
              </p>
              <div className="mt-4 p-3 bg-white rounded-lg italic text-stone-500 text-sm shadow-sm">
                "When I paint, I can show how I feel without words." — Uday Student, Age 6
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn animation-delay-300">
              <div className="h-48 mb-4 rounded-xl overflow-hidden relative group">
                <Image
                  src="https://images.unsplash.com/photo-1605627079912-97c3810a11a4"
                  alt="Child holding colorful paper for crafting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2">Storytelling Magic</h3>
              <p className="text-stone-600">
                Through puppetry and oral storytelling, children develop language skills and imagination simultaneously.
              </p>
              <div className="mt-4 p-3 bg-white rounded-lg italic text-stone-500 text-sm shadow-sm">
                "Stories help us understand the world and ourselves." — Uday Teacher
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn animation-delay-400">
              <div className="h-48 mb-4 rounded-xl overflow-hidden relative group">
                <Image
                  src="https://images.unsplash.com/photo-1511448962213-2f9bc14ed197"
                  alt="Children exploring in a forest"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2">Nature's Mathematics</h3>
              <p className="text-stone-600">
                Children discover mathematical concepts through natural patterns, rhythms, and hands-on exploration.
              </p>
              <div className="mt-4 p-3 bg-white rounded-lg italic text-stone-500 text-sm shadow-sm">
                "I found Fibonacci spirals in the sunflower!" — Uday Student, Age 8
              </div>
            </div>
          </div>

          <div className="text-center animate-fadeIn animation-delay-500">
            <Button
              onClick={() => scrollToSection("pedagogy")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Discover Our Rhythm <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Rhythm Section */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionsRef.current.rhythm = el
        }}
        className="min-h-screen py-20 relative bg-stone-50"
      >
        {/* Background texture removed */}
        <svg className="absolute left-0 top-0 h-20 w-full text-white" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 0 0 L 100 0 L 100 5 C 80 15, 70 35, 50 35 C 30 35, 20 15, 0 5 Z" fill="currentColor"></path>
        </svg>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 text-center animate-fadeIn">
            Rhythm and Play
          </h2>
          <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 animate-fadeIn animation-delay-100">
            Our days follow a natural rhythm that brings security and joy to children's lives.
          </p>

          {/* Slider Container */}
          <div className="relative overflow-hidden mb-16">
            {/* Slider Track */}
            <div className="flex transition-transform duration-500 ease-in-out" id="slider-track">
              {/* Card 1 */}
              <div className="w-1/2 flex-shrink-0 px-4">
                <div className="rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fadeIn animation-delay-200">
                  <div className="h-64 md:h-96 relative group">
                    <Image
                      src="https://images.unsplash.com/photo-1738440618035-ee494c4e66ee"
                      alt="Children playing outdoors"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-serif font-semibold mb-2">Outdoor Play</h3>
                      <p className="text-white/90 text-sm">
                        Daily time in nature builds physical strength and a deep connection with the natural world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-1/2 flex-shrink-0 px-4">
                <div className="rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fadeIn animation-delay-300">
                  <div className="h-64 md:h-96 relative group">
                    <Image
                      src="https://images.unsplash.com/photo-1542810634-71277d95dcbb"
                      alt="Children sitting in a story circle"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-serif font-semibold mb-2">Story Circle</h3>
                      <p className="text-white/90 text-sm">
                        Children gather to listen, imagine, and connect with timeless wisdom through storytelling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="w-1/2 flex-shrink-0 px-4">
                <div className="rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fadeIn animation-delay-300">
                  <div className="h-64 md:h-96 relative group">
                    <Image
                      src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9"
                      alt="Children doing art activities"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-serif font-semibold mb-2">Creative Expression</h3>
                      <p className="text-white/90 text-sm">
                        Art, music, and movement allow children to express themselves freely and joyfully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="w-1/2 flex-shrink-0 px-4">
                <div className="rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fadeIn animation-delay-300">
                  <div className="h-64 md:h-96 relative group">
                    <Image
                      src="https://images.unsplash.com/photo-1516627145497-ae6968895b74"
                      alt="Children engaged in sensory play"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-serif font-semibold mb-2">Sensory Discovery</h3>
                      <p className="text-white/90 text-sm">
                        Hands-on exploration engages all the senses and deepens learning experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10"
              onClick={() => {
                const track = document.getElementById('slider-track');
                if (track) {
                  const currentTransform = new WebKitCSSMatrix(getComputedStyle(track).transform).m41;
                  const slideWidth = track.offsetWidth / 2;
                  if (currentTransform < 0) {
                    track.style.transform = `translateX(${Math.min(currentTransform + slideWidth, 0)}px)`;
                  }
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10"
              onClick={() => {
                const track = document.getElementById('slider-track');
                if (track) {
                  const currentTransform = new WebKitCSSMatrix(getComputedStyle(track).transform).m41;
                  const slideWidth = track.offsetWidth / 2;
                  const maxScroll = -(track.scrollWidth - track.offsetWidth);
                  track.style.transform = `translateX(${Math.max(currentTransform - slideWidth, maxScroll)}px)`;
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              <button 
                className="w-3 h-3 rounded-full bg-stone-300 hover:bg-stone-400 transition-colors"
                onClick={() => {
                  const track = document.getElementById('slider-track');
                  if (track) track.style.transform = 'translateX(0)';
                }}
              ></button>
              <button 
                className="w-3 h-3 rounded-full bg-stone-300 hover:bg-stone-400 transition-colors"
                onClick={() => {
                  const track = document.getElementById('slider-track');
                  if (track) {
                    const slideWidth = track.offsetWidth / 2;
                    track.style.transform = `translateX(-${slideWidth}px)`;
                  }
                }}
              ></button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-100 animate-fadeIn animation-delay-400">
            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-6 text-center">Our Daily Rhythm</h3>
            
            {/* Scroll navigation tabs */}
            <div className="flex justify-center mb-6 space-x-2 sm:space-x-4">
              <button 
                className="px-4 py-2 rounded-lg bg-amber-200 text-amber-800 font-medium shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-300" 
                onClick={() => document.getElementById('rhythm-8-30')?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })}
              >
                8:30
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-emerald-200 text-emerald-800 font-medium shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-300" 
                onClick={() => document.getElementById('rhythm-10-00')?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })}
              >
                10:00
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-sky-200 text-sky-800 font-medium shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-sky-300" 
                onClick={() => document.getElementById('rhythm-11-30')?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })}
              >
                11:30
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-orange-200 text-orange-800 font-medium shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-300" 
                onClick={() => document.getElementById('rhythm-12-30')?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })}
              >
                12:30
              </button>
            </div>
            
            {/* Scroll indicators */}
            <div className="flex justify-center mb-2">
              <div className="flex space-x-2">
                <span className="text-amber-800">← Scroll →</span>
              </div>
            </div>
            
            {/* Horizontal scrollable container */}
            <div className="overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              <div className="flex space-x-6 min-w-max px-2">
                <div id="rhythm-8-30" className="flex-shrink-0 w-80 snap-center flex flex-col p-5 rounded-xl bg-amber-50/80 shadow-md transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center mr-4 shadow-md">
                      <span className="text-amber-800 font-serif font-medium">8:30</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800 text-lg">Morning Circle</h4>
                    </div>
                  </div>
                  <p className="text-stone-600">Songs, movement, and greetings to start the day</p>
                  <div className="mt-4 text-sm italic text-stone-500 bg-white/70 p-3 rounded-lg">
                    Children gather in a circle to sing seasonal songs, practice verses, and share greetings in different languages.
                  </div>
                </div>

                <div id="rhythm-10-00" className="flex-shrink-0 w-80 snap-center flex flex-col p-5 rounded-xl bg-emerald-50/80 shadow-md transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-200 flex items-center justify-center mr-4 shadow-md">
                      <span className="text-emerald-800 font-serif font-medium">10:00</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800 text-lg">Main Lesson</h4>
                    </div>
                  </div>
                  <p className="text-stone-600">Integrated learning through stories, art, and movement</p>
                  <div className="mt-4 text-sm italic text-stone-500 bg-white/70 p-3 rounded-lg">
                    Academic subjects come alive through storytelling, painting, drawing, and hands-on activities that engage multiple senses.
                  </div>
                </div>

                <div id="rhythm-11-30" className="flex-shrink-0 w-80 snap-center flex flex-col p-5 rounded-xl bg-sky-50/80 shadow-md transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-sky-200 flex items-center justify-center mr-4 shadow-md">
                      <span className="text-sky-800 font-serif font-medium">11:30</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800 text-lg">Outdoor Play</h4>
                    </div>
                  </div>
                  <p className="text-stone-600">Free play in nature, gardening, and exploration</p>
                  <div className="mt-4 text-sm italic text-stone-500 bg-white/70 p-3 rounded-lg">
                    Children develop physical strength, creativity, and social skills through unstructured outdoor time in our natural play spaces.
                  </div>
                </div>

                <div id="rhythm-12-30" className="flex-shrink-0 w-80 snap-center flex flex-col p-5 rounded-xl bg-orange-50/80 shadow-md transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center mr-4 shadow-md">
                      <span className="text-orange-800 font-serif font-medium">12:30</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-800 text-lg">Lunch & Rest</h4>
                    </div>
                  </div>
                  <p className="text-stone-600">Nutritious meal followed by quiet time</p>
                  <div className="mt-4 text-sm italic text-stone-500 bg-white/70 p-3 rounded-lg">
                    Children help prepare wholesome meals, practice gratitude, and enjoy a peaceful rest time with soft music and storytelling.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teachers Section */}
          <section
            ref={(el: HTMLDivElement | null) => {
              sectionsRef.current.teachers = el
            }}
            className="min-h-screen py-20 relative bg-stone-50"
          >
            <div className="container mx-auto px-4 py-16 relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 text-center animate-fadeIn">
                Know Our Teachers
              </h2>
              <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 animate-fadeIn animation-delay-200">
                Our dedicated teachers bring warmth, expertise, and a deep understanding of Waldorf education to create a nurturing learning environment.
              </p>

              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className="space-y-6 animate-fadeIn animation-delay-300">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">
                        Waldorf-Trained Educators
                      </h3>
                      <p className="text-stone-600 mb-4">
                        Our teachers are not just educators; they are artists, storytellers, and nurturers who understand the unique developmental stages of childhood. Each brings specialized Waldorf training and a deep commitment to holistic education.
                      </p>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 shrink-0">
                            <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-stone-600">Extensive training in Waldorf pedagogy and child development</p>
                        </li>
                        <li className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 shrink-0">
                            <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-stone-600">Ongoing professional development and mentorship</p>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">
                        Our Teaching Philosophy
                      </h3>
                      <p className="text-stone-600 mb-4">
                        We believe in creating an environment where learning happens naturally through experience, creativity, and connection. Our teachers guide children to discover their unique potential.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <h4 className="font-medium text-amber-800 mb-2">Storytelling</h4>
                          <p className="text-sm text-stone-600">Bringing subjects to life through narrative and imagination</p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <h4 className="font-medium text-amber-800 mb-2">Artistic Work</h4>
                          <p className="text-sm text-stone-600">Integrating arts into every subject</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Content */}
                  <div className="space-y-6 animate-fadeIn animation-delay-400">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                      <iframe 
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/tZmAX5adCl0"
                        title="Meet Our Teachers - UDAY Waldorf School"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-100">
                      <svg className="h-8 w-8 text-amber-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                      </svg>
                      <p className="text-lg text-stone-700 italic leading-relaxed">
                        "We don't just teach subjects; we nurture the whole child, helping them discover their unique gifts and potential."
                      </p>
                      <div className="flex items-center mt-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                          <span className="text-amber-800 font-serif font-semibold">M</span>
                        </div>
                        <p className="text-stone-800 font-medium">Maya, Lead Teacher</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center mt-12 animate-fadeIn animation-delay-500">
            <Button
              onClick={() => scrollToSection("events")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Experience Our Community <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionsRef.current.community = el
        }}
        className="min-h-screen py-20 relative"
      >
        {/* Background texture removed */}
        <svg className="absolute left-0 top-0 h-20 w-full" preserveAspectRatio="none" viewBox="0 0 100 100" style={{color: "#e6f7ff"}}>
          <path d="M 0 0 L 100 0 L 100 5 C 80 15, 70 35, 50 35 C 30 35, 20 15, 0 5 Z" fill="currentColor"></path>
        </svg>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 text-center animate-fadeIn">
            Community and Care
          </h2>
          <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 animate-fadeIn animation-delay-200">
            At UDAY, families, teachers, and children form a supportive village centered around holistic education.
          </p>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-8 animate-fadeIn animation-delay-200">
              <Image
                src="https://images.unsplash.com/photo-1594739393338-52c769b25328"
                alt="Parent and child cycling through a park"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-8">
                  <p className="text-white text-xl md:text-2xl font-serif italic">
                    "The community is our classroom, where parents and teachers work together to nurture each child's
                    unique potential."
                  </p>
                  <p className="text-white/80 mt-2">— Gurpreet, Founder</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-amber-50 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] animate-fadeIn animation-delay-300">
                <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-semibold text-stone-800 mb-3 text-center">Parent Involvement</h3>
                <p className="text-stone-600 text-center">
                  Parents actively participate in festivals, craft days, and community events, creating a village-like
                  atmosphere.
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] animate-fadeIn animation-delay-400">
                <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-semibold text-stone-800 mb-3 text-center">Seasonal Celebrations</h3>
                <p className="text-stone-600 text-center">
                  We honor the rhythm of the year through festivals that connect children to cultural traditions and
                  natural cycles.
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] animate-fadeIn animation-delay-500">
                <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif font-semibold text-stone-800 mb-3 text-center">Wholesome Meals</h3>
                <p className="text-stone-600 text-center">
                  Children help prepare nutritious, organic meals, learning about food, cooperation, and gratitude.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto animate-fadeIn animation-delay-500">
            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-6 text-center">What Parents Say</h3>

            {/* Horizontal Slider Container */}
            <div className="relative">
              {/* Scroll Container */}
              <div className="overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex space-x-6 min-w-max px-4">
                  {/* Testimonial Cards - Each card is now horizontally arranged */}
                  <div className="w-[400px] flex-shrink-0 bg-white rounded-xl p-6 shadow-lg border border-amber-100 transform transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-3 border-4 border-amber-100 shadow-lg">
                        <Image
                          src="/placeholder-user.jpg"
                          alt="Shikha"
                          width={192}
                          height={192}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h4 className="text-lg font-medium text-stone-800">Shikha Sharma</h4>
                      <p className="text-sm text-stone-500">Parent of a 7-year-old</p>
                    </div>
                <svg className="h-8 w-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <p className="text-stone-600 italic mb-4">
                  "I've never seen my child so joyful and engaged in learning. At UDAY, education isn't something that
                  happens to them—it's something they actively participate in with their whole being."
                </p>
                  </div>

                  {/* Repeat similar structure for other testimonials */}
                  <div className="w-[400px] flex-shrink-0 bg-white rounded-xl p-6 shadow-lg border border-amber-100 transform transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-3 border-4 border-amber-100 shadow-lg">
                        <Image
                          src="/placeholder-user.jpg"
                          alt="Rahul"
                          width={192}
                          height={192}
                          className="object-cover w-full h-full"
                        />
                </div>
                      <h4 className="text-lg font-medium text-stone-800">Rahul Verma</h4>
                      <p className="text-sm text-stone-500">Parent of a 5-year-old</p>
              </div>
                <svg className="h-8 w-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <p className="text-stone-600 italic mb-4">
                  "The difference in my child's confidence, creativity, and love for learning is remarkable. UDAY
                  doesn't just teach subjects—it nurtures the whole child."
                </p>
                  </div>

                  <div className="w-[400px] flex-shrink-0 bg-white rounded-xl p-6 shadow-lg border border-amber-100 transform transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-3 border-4 border-amber-100 shadow-lg">
                        <Image
                          src="/placeholder-user.jpg"
                          alt="Priya"
                          width={192}
                          height={192}
                          className="object-cover w-full h-full"
                        />
                </div>
                      <h4 className="text-lg font-medium text-stone-800">Priya Malhotra</h4>
                      <p className="text-sm text-stone-500">Parent of a 6-year-old</p>
              </div>
                    <svg className="h-8 w-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                    <p className="text-stone-600 italic mb-4">
                      "The way UDAY integrates art, music, and movement into learning is magical. My daughter comes home singing songs about math and telling stories about history."
                    </p>
            </div>

                  <div className="w-[400px] flex-shrink-0 bg-white rounded-xl p-6 shadow-lg border border-amber-100 transform transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-3 border-4 border-amber-100 shadow-lg">
                        <Image
                          src="/placeholder-user.jpg"
                          alt="Amit"
                          width={192}
                          height={192}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h4 className="text-lg font-medium text-stone-800">Amit Kapoor</h4>
                      <p className="text-sm text-stone-500">Parent of an 8-year-old</p>
                    </div>
                    <svg className="h-8 w-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                    <p className="text-stone-600 italic mb-4">
                      "What sets UDAY apart is how they respect each child's individual pace of development. My son has flourished in ways I never expected."
                    </p>
          </div>

                  <div className="w-[400px] flex-shrink-0 bg-white rounded-xl p-6 shadow-lg border border-amber-100 transform transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-48 h-48 rounded-full overflow-hidden mb-3 border-4 border-amber-100 shadow-lg">
                        <Image
                          src="/placeholder-user.jpg"
                          alt="Neha"
                          width={192}
                          height={192}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h4 className="text-lg font-medium text-stone-800">Neha Gupta</h4>
                      <p className="text-sm text-stone-500">Parent of twins, age 4</p>
                    </div>
                    <svg className="h-8 w-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                    </svg>
                    <p className="text-stone-600 italic mb-4">
                      "The community at UDAY is extraordinary. My twins have found a second home here, where their unique personalities are celebrated and nurtured."
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  if (container) {
                    container.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all z-10"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  if (container) {
                    container.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              <div className="text-amber-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span>Scroll to see more</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Video Button */}
            <div className="text-center mt-8">
            <Button
                onClick={() => scrollToSection('testimonials')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
                View Testimonial Videos
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionsRef.current.story = el
        }}
        className="min-h-screen py-20 relative bg-stone-50"
      >
        {/* Background texture removed */}
        <svg className="absolute left-0 top-0 h-12 w-full text-white" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 0 0 L 100 0 L 100 5 C 80 15, 70 35, 50 35 C 30 35, 20 15, 0 5 Z" fill="currentColor"></path>
        </svg>
        <div className="container mx-auto px-4 pt-4 pb-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-2 text-center animate-fadeIn">
            The UDAY Story
          </h2>
          <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-8 animate-fadeIn animation-delay-200">
            Our journey began with a simple wish - to create an education that nurtures the whole child.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div className="animate-fadeIn animation-delay-200">
                <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">A Mother's Vision</h3>
                <p className="text-stone-600 mb-4">
                  UDAY was founded because a mother, Gurpreet, wanted to give more meaningful and holistic education to
                  her child. When searching for schools for her daughter, she felt a deep disconnect between what the
                  existing education system had to offer and her own values.
                </p>
                <p className="text-stone-600 mb-4">
                  Her pursuit for an education system that aligned with her values led her to Waldorf, which taught to
                  the whole human being, encouraged greater social and moral responsibility, and allowed young children
                  to be children rather than forcing them into accelerated intellectualism.
                </p>
                <p className="text-stone-600">
                  Inspired by the philosophy, Gurpreet quit her corporate career and founded UDAY Waldorf Inspired
                  School of Jaipur in 2014.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 hover:shadow-2xl animate-fadeIn animation-delay-300">
                <div className="h-80 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6"
                    alt="Child reading at sunset symbolizing UDAY's vision"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h4 className="text-xl font-serif">The Vision</h4>
                    <p className="text-sm text-white/90">A holistic education that honors childhood</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative py-12 animate-fadeIn animation-delay-400">
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 top-1/2 transform -translate-y-1/2"></div>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 relative z-10">
                <div className="text-center transform transition-transform duration-500 hover:scale-110">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center mb-3 shadow-lg">
                    <span className="text-white font-bold">2014</span>
                  </div>
                  <p className="text-sm text-stone-700 font-medium">Founded with 4 children</p>
                </div>

                <div className="text-center transform transition-transform duration-500 hover:scale-110">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center mb-3 shadow-lg">
                    <span className="text-white font-bold">2016</span>
                  </div>
                  <p className="text-sm text-stone-700 font-medium">First grade class</p>
                </div>

                <div className="text-center transform transition-transform duration-500 hover:scale-110">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center mb-3 shadow-lg">
                    <span className="text-white font-bold">2018</span>
                  </div>
                  <p className="text-sm text-stone-700 font-medium">New campus</p>
                </div>

                <div className="text-center transform transition-transform duration-500 hover:scale-110">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center mb-3 shadow-lg">
                    <span className="text-white font-bold">2021</span>
                  </div>
                  <p className="text-sm text-stone-700 font-medium">Expanded to Grade 5</p>
                </div>

                <div className="text-center transform transition-transform duration-500 hover:scale-110">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto flex items-center justify-center mb-3 shadow-lg">
                    <span className="text-white font-bold">2025</span>
                  </div>
                  <p className="text-sm text-stone-700 font-medium">Growing each year</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-100 mt-8 animate-fadeIn animation-delay-500 transform transition-all duration-500 hover:shadow-2xl">
              <svg className="h-10 w-10 text-amber-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <p className="text-xl text-stone-700 italic text-center leading-relaxed">
                "I didn't build a school. I built what I wished existed for my own child—a place where education
                nurtures the head, heart, and hands in harmony."
              </p>
              <div className="flex items-center justify-center mt-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-3 shadow-md">
                  <span className="text-amber-800 font-serif font-semibold">G</span>
                </div>
                <p className="text-stone-800 font-medium">Gurpreet, Founder of UDAY</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fadeIn animation-delay-600">
            <Button
              onClick={() => scrollToSection("application")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Community <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionsRef.current.application = el
        }}
        className="min-h-screen py-20 relative"
        style={{
          background: "linear-gradient(to bottom, #e0f7fa 0%, #80cbc4 100%)",
        }}
      >
        {/* Background texture removed */}
        <svg className="absolute left-0 top-0 h-20 w-full" preserveAspectRatio="none" viewBox="0 0 100 100" style={{color: "#ffecd2"}}>
          <path d="M 0 0 L 100 0 L 100 5 C 80 15, 70 35, 50 35 C 30 35, 20 15, 0 5 Z" fill="currentColor"></path>
        </svg>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
                Start Your Child's Journey
              </h2>
              <p className="text-xl text-stone-700 mb-10 max-w-2xl mx-auto">
                Join the UDAY family and give your child the gift of joyful, meaningful education that nurtures their
                whole being.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-teal-100 animate-fadeIn animation-delay-200">
                <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-6">
                  Begin Your Application
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="parentName" className="block text-sm font-medium text-stone-700 mb-1">Parent's Name</label>
                      <input 
                        type="text" 
                        id="parentName" 
                        className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="childName" className="block text-sm font-medium text-stone-700 mb-1">Child's Name</label>
                      <input 
                        type="text" 
                        id="childName" 
                        className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Child's full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Your email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="childAge" className="block text-sm font-medium text-stone-700 mb-1">Child's Age</label>
                    <select 
                      id="childAge" 
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select age group</option>
                      <option value="3-4">3-4 years (Nursery)</option>
                      <option value="4-5">4-5 years (Kindergarten)</option>
                      <option value="5-6">5-6 years (Class 1)</option>
                      <option value="6-7">6-7 years (Class 2)</option>
                      <option value="7-8">7-8 years (Class 3)</option>
                      <option value="8-9">8-9 years (Class 4)</option>
                      <option value="9-10">9-10 years (Class 5)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Your Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Tell us about your child and what you're looking for in education"
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="consent" 
                      className="mt-1 rounded text-teal-600 focus:ring-teal-500 border-stone-300" 
                    />
                    <label htmlFor="consent" className="ml-2 text-sm text-stone-600">
                      I consent to receive information about UDAY Waldorf Inspired School and understand my data will be processed according to the privacy policy.
                    </label>
                  </div>

                  <div>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </div>

              <div className="space-y-6 animate-fadeIn animation-delay-300">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                    alt="Education symbolism with books and alphabet blocks"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 via-teal-900/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-serif mb-2">Why Choose UDAY?</h3>
                    <p className="text-white/90">A holistic approach to education that nurtures your child's full potential</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-teal-100 transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-stone-800 mb-1">Book a Visit</h4>
                    <p className="text-sm text-stone-600">
                      Tour our campus and experience our unique learning environment.
                    </p>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-teal-100 transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-stone-800 mb-1">Ask Questions</h4>
                    <p className="text-sm text-stone-600">
                      Schedule a call with our experienced educators.
                    </p>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-teal-100">
                  <h3 className="text-xl font-serif font-semibold text-stone-800 mb-4">
                    Why Waldorf Education?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center mr-4 shrink-0 shadow-md">
                        <span className="text-amber-800 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800 mb-1">Age-Appropriate Learning</h4>
                        <p className="text-sm text-stone-600">
                          Curriculum meets the developmental needs of each child at every stage.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center mr-4 shrink-0 shadow-md">
                        <span className="text-amber-800 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800 mb-1">Holistic Development</h4>
                        <p className="text-sm text-stone-600">
                          Education that nurtures intellectual, emotional, physical, and spiritual growth.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center mr-4 shrink-0 shadow-md">
                        <span className="text-amber-800 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800 mb-1">Arts Integration</h4>
                        <p className="text-sm text-stone-600">
                          Artistic activities are woven into all academic subjects, enhancing learning.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center mr-4 shrink-0 shadow-md">
                        <span className="text-amber-800 font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-800 mb-1">Connection with Nature</h4>
                        <p className="text-sm text-stone-600">
                          Regular outdoor experiences foster environmental stewardship and well-being.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Library Section */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionsRef.current['video-library'] = el
        }}
        className="min-h-screen py-20 relative bg-stone-50"
      >
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 text-center animate-fadeIn">
            Video Library
          </h2>
          <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 animate-fadeIn animation-delay-200">
            Explore our collection of videos showcasing the UDAY experience.
          </p>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">Featured Videos</h3>
                <div className="space-y-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/example1"
                      title="A Day at UDAY"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/example2"
                      title="Waldorf Education in Action"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-4">Video Categories</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Classroom Moments</h4>
                    <p className="text-sm text-stone-600">See our students in action</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Teacher Insights</h4>
                    <p className="text-sm text-stone-600">Learn from our educators</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Parent Stories</h4>
                    <p className="text-sm text-stone-600">Hear from our community</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Festivals</h4>
                    <p className="text-sm text-stone-600">Celebrate with us</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <section
              ref={(el: HTMLDivElement | null) => {
                sectionsRef.current.testimonials = el
              }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-6 text-center">Video Testimonials</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/example3"
                    title="Parent Testimonial - Shikha"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/example4"
                    title="Parent Testimonial - Rahul"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/images/logo.png"
                  alt="UDAY Waldorf Inspired School"
                  width={144}
                  height={144}
                  className="mr-2"
                />
                <span className="text-lg font-serif">UDAY Waldorf Inspired School</span>
              </div>
              <p className="text-stone-300 text-sm">
                Jaipur's first Waldorf-inspired school, nurturing children through holistic education since 2014.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-4">Contact Us</h4>
              <address className="text-stone-300 text-sm not-italic">
                A-85, Jai Jawan I, Off Tonk Road
                <br />
                Jaipur, Rajasthan
                <br />
                <br />
                Phone: 09828411114, 9509098960
                <br />
                Email: info@udayjaipur.com
              </address>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-4">Quick Links</h4>
              <ul className="text-stone-300 text-sm space-y-2">
                <li>
                  <Link href="#" className="hover:text-amber-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-amber-300">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-amber-300">
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-amber-300">
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-amber-300">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center hover:bg-amber-600"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center hover:bg-amber-600"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center hover:bg-amber-600"
                >
                  <span className="sr-only">YouTube</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <p className="text-stone-300 text-sm">
                Subscribe to our newsletter for updates on events and activities.
              </p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-stone-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm w-full"
                />
                <Button className="bg-amber-600 hover:bg-amber-700 rounded-l-none text-sm">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-stone-700 text-center text-stone-400 text-sm">
            <p>© {new Date().getFullYear()} UDAY Waldorf Inspired School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
