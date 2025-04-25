"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sections = [
  { id: "dawn", label: "Welcome" },
  { id: "morning", label: "Learning" },
  { id: "midday", label: "Rhythm" },
  { id: "afternoon", label: "Community" },
  { id: "sunset", label: "Our Story" },
  { id: "cta", label: "Admissions" },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dawn")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [navBg, setNavBg] = useState("rgba(255, 255, 255, 0.8)")
  const [navBorder, setNavBorder] = useState("1px solid rgba(0, 0, 0, 0.1)")
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({
    dawn: null,
    morning: null,
    midday: null,
    afternoon: null,
    sunset: null,
    cta: null,
  })

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)

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

  const scrollToSection = (section: string) => {
    sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <div className="relative">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollPosition > 50 ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-5'}`}
        style={{
          backgroundColor: navBg,
          borderBottom: navBorder,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="text-xl font-serif font-bold text-stone-800 flex items-center">
              <span className="text-amber-600 mr-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M12,2L1,21H23L12,2M12,6L19.5,18H4.5L12,6Z" />
                </svg>
              </span>
              UDAY
            </div>

            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium ${
                    activeSection === section.id ? "text-amber-600" : "text-stone-600 hover:text-stone-800"
                  } transition-colors duration-300`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-stone-600 hover:text-stone-800 focus:outline-none"
                aria-label="Open mobile menu"
              >
                {mobileMenuOpen ? (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 bg-white rounded-b-lg shadow-lg animate-fadeIn">
              <div className="flex flex-col space-y-3 pb-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      scrollToSection(section.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-sm font-medium px-4 py-2 ${
                      activeSection === section.id 
                        ? "text-amber-600 bg-amber-50" 
                        : "text-stone-600 hover:text-stone-800 hover:bg-stone-50"
                    } transition-all duration-300 rounded-md`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Dawn - Welcome Section */}
      <section
        ref={(el) => (sectionsRef.current.dawn = el)}
        className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #FFF3E0 0%, #FFCC80 100%)",
        }}
      >
        {/* Animated sunrise effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-30%] left-1/2 transform -translate-x-1/2 w-[150%] h-[150%] rounded-[100%] bg-gradient-to-t from-amber-400/70 via-amber-300/40 to-transparent animate-pulse" style={{animationDuration: '8s'}}></div>
        </div>
        
        {/* Soft clouds */}
        <div className="absolute top-1/4 left-0 w-[40%] h-24 rounded-full bg-white/20 blur-2xl"></div>
        <div className="absolute top-1/3 right-10 w-[35%] h-20 rounded-full bg-white/20 blur-2xl"></div>
        
        {/* Text overlay with centered content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-stone-800 mb-6 animate-fadeIn leading-tight tracking-wide">
              Where childhood awakens, naturally.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-sans text-stone-700 mb-12 animate-fadeIn animation-delay-200 max-w-2xl mx-auto">
              A Waldorf-inspired school in Jaipur nurturing joyful, whole-child learning.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fadeIn animation-delay-300">
              <Button
                onClick={() => scrollToSection("morning")}
                className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-64"
              >
                Start the Journey <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                onClick={() => scrollToSection("sunset")}
                className="rounded-lg bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-64"
              >
                Why Waldorf?
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

      {/* Morning - Learning Section */}
      <section ref={(el) => (sectionsRef.current.morning = el)} className="min-h-screen py-20 bg-white relative">
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
              onClick={() => scrollToSection("midday")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Discover Our Rhythm <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Midday - Rhythm Section */}
      <section
        ref={(el) => (sectionsRef.current.midday = el)}
        className="min-h-screen py-20 relative"
        style={{
          background: "linear-gradient(to bottom, #e6f7ff 0%, #ffffff 100%)",
        }}
      >
        {/* Background texture removed */}
        <svg className="absolute left-0 top-0 h-20 w-full text-white" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 0 0 L 100 0 L 100 5 C 80 15, 70 35, 50 35 C 30 35, 20 15, 0 5 Z" fill="currentColor"></path>
        </svg>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 text-center animate-fadeIn">
            Rhythm and Play
          </h2>
          <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 animate-fadeIn animation-delay-200">
            Our days follow a natural rhythm that brings security and joy to children's lives.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
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

          <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-100 animate-fadeIn animation-delay-400">
            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-6 text-center">Our Daily Rhythm</h3>
            <div className="space-y-6">
              <div className="flex items-center p-4 rounded-xl bg-amber-50/80 shadow-sm transform transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center mr-4 shadow-md">
                  <span className="text-amber-800 font-serif font-medium">8:30</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800 text-lg">Morning Circle</h4>
                  <p className="text-stone-600">Songs, movement, and greetings to start the day</p>
                </div>
              </div>

              <div className="flex items-center p-4 rounded-xl bg-emerald-50/80 shadow-sm transform transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full bg-emerald-200 flex items-center justify-center mr-4 shadow-md">
                  <span className="text-emerald-800 font-serif font-medium">10:00</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800 text-lg">Main Lesson</h4>
                  <p className="text-stone-600">Integrated learning through stories, art, and movement</p>
                </div>
              </div>

              <div className="flex items-center p-4 rounded-xl bg-sky-50/80 shadow-sm transform transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full bg-sky-200 flex items-center justify-center mr-4 shadow-md">
                  <span className="text-sky-800 font-serif font-medium">11:30</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800 text-lg">Outdoor Play</h4>
                  <p className="text-stone-600">Free play in nature, gardening, and exploration</p>
                </div>
              </div>

              <div className="flex items-center p-4 rounded-xl bg-orange-50/80 shadow-sm transform transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center mr-4 shadow-md">
                  <span className="text-orange-800 font-serif font-medium">12:30</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800 text-lg">Lunch & Rest</h4>
                  <p className="text-stone-600">Nutritious meal followed by quiet time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fadeIn animation-delay-500">
            <Button
              onClick={() => scrollToSection("afternoon")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Experience Our Community <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Afternoon - Community Section */}
      <section ref={(el) => (sectionsRef.current.afternoon = el)} className="min-h-screen py-20 bg-white relative">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
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

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100 transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                <svg className="h-8 w-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <p className="text-stone-600 italic mb-4">
                  "I've never seen my child so joyful and engaged in learning. At UDAY, education isn't something that
                  happens to them—it's something they actively participate in with their whole being."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <span className="text-amber-800 font-serif">S</span>
                  </div>
                  <p className="text-stone-800 font-medium">Shikha, parent of a 7-year-old</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100 transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                <svg className="h-8 w-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <p className="text-stone-600 italic mb-4">
                  "The difference in my child's confidence, creativity, and love for learning is remarkable. UDAY
                  doesn't just teach subjects—it nurtures the whole child."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <span className="text-amber-800 font-serif">R</span>
                  </div>
                  <p className="text-stone-800 font-medium">Rahul, parent of a 5-year-old</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fadeIn animation-delay-600">
            <Button
              onClick={() => scrollToSection("sunset")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Discover Our Story <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Sunset - Origin Story Section */}
      <section
        ref={(el) => (sectionsRef.current.sunset = el)}
        className="min-h-screen py-20 relative"
        style={{
          background: "linear-gradient(to bottom, #ffffff 0%, #ffecd2 100%)",
        }}
      >
        {/* Background texture removed */}
        <svg className="absolute left-0 top-0 h-20 w-full text-white" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 0 0 L 100 0 L 100 5 C 80 15, 70 35, 50 35 C 30 35, 20 15, 0 5 Z" fill="currentColor"></path>
        </svg>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 text-center animate-fadeIn">
            The UDAY Story
          </h2>
          <p className="text-lg text-stone-600 text-center max-w-3xl mx-auto mb-12 animate-fadeIn animation-delay-200">
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
              onClick={() => scrollToSection("cta")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Community <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => (sectionsRef.current.cta = el)}
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

      {/* Footer */}
      <footer className="bg-stone-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/images/logo.png"
                  alt="UDAY Waldorf Inspired School"
                  width={50}
                  height={50}
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
