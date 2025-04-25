"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dawn")
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
      const scrollPosition = window.scrollY + window.innerHeight / 3

      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(key)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (section: string) => {
    sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="UDAY Waldorf Inspired School" width={60} height={60} className="mr-2" />
            <span className="hidden md:inline-block text-xl font-serif text-stone-800">
              UDAY Waldorf Inspired School
            </span>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <button
              onClick={() => scrollToSection("dawn")}
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "dawn" ? "text-teal-600" : "text-stone-600 hover:text-teal-600",
              )}
            >
              Welcome
            </button>
            <button
              onClick={() => scrollToSection("morning")}
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "morning" ? "text-teal-600" : "text-stone-600 hover:text-teal-600",
              )}
            >
              Learning
            </button>
            <button
              onClick={() => scrollToSection("midday")}
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "midday" ? "text-teal-600" : "text-stone-600 hover:text-teal-600",
              )}
            >
              Rhythm
            </button>
            <button
              onClick={() => scrollToSection("afternoon")}
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "afternoon" ? "text-teal-600" : "text-stone-600 hover:text-teal-600",
              )}
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection("sunset")}
              className={cn(
                "text-sm font-medium transition-colors",
                activeSection === "sunset" ? "text-teal-600" : "text-stone-600 hover:text-teal-600",
              )}
            >
              Our Story
            </button>
            <Button
              onClick={() => scrollToSection("cta")}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full"
            >
              Admissions
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 space-y-3">
            <button
              onClick={() => scrollToSection("dawn")}
              className="block w-full text-left px-4 py-2 text-stone-800 hover:bg-teal-50 rounded-md"
            >
              Welcome
            </button>
            <button
              onClick={() => scrollToSection("morning")}
              className="block w-full text-left px-4 py-2 text-stone-800 hover:bg-teal-50 rounded-md"
            >
              Learning
            </button>
            <button
              onClick={() => scrollToSection("midday")}
              className="block w-full text-left px-4 py-2 text-stone-800 hover:bg-teal-50 rounded-md"
            >
              Rhythm
            </button>
            <button
              onClick={() => scrollToSection("afternoon")}
              className="block w-full text-left px-4 py-2 text-stone-800 hover:bg-teal-50 rounded-md"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection("sunset")}
              className="block w-full text-left px-4 py-2 text-stone-800 hover:bg-teal-50 rounded-md"
            >
              Our Story
            </button>
            <Button
              onClick={() => scrollToSection("cta")}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-full"
            >
              Admissions
            </Button>
          </div>
        )}
      </nav>

      {/* Dawn - Welcome Section */}
      <section
        ref={(el) => (sectionsRef.current.dawn = el)}
        className="min-h-screen pt-20 flex flex-col justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #e0f7fa 0%, #80cbc4 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[url('/images/texture-paper.png')] opacity-30 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1 text-left">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-800 mb-6">Welcome to UDAY</h1>
              <p className="text-xl md:text-2xl font-serif text-stone-700 mb-6 leading-relaxed">
                Where childhood blossoms naturally
              </p>
              <p className="text-lg text-stone-600 mb-8">
                UDAY, meaning 'sunrise', is Jaipur's first Waldorf-inspired school. We nurture the whole child through
                joyful learning, artistic expression, and deep connection with nature.
              </p>
              <Button
                onClick={() => scrollToSection("morning")}
                className="rounded-full bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg"
              >
                Start the Journey <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="order-1 md:order-2 relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-white/30 rounded-2xl backdrop-blur-sm"></div>
              <div className="relative p-6">
                <div className="relative h-64 md:h-96">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <path
                      d="M200,20 Q230,60 260,40 T320,60 T380,80 T350,120 T380,160 T350,200 T380,240 T350,280 T380,320 T320,340 T260,360 T200,380 T140,360 T80,340 T20,320 T50,280 T20,240 T50,200 T20,160 T50,120 T20,80 T80,60 T140,40 T200,20"
                      fill="#e0f7fa"
                      stroke="#80cbc4"
                      strokeWidth="2"
                    />
                    <circle cx="200" cy="200" r="120" fill="#fff" opacity="0.6" />
                    <g transform="translate(120, 120)">
                      <path
                        d="M80,0 C100,30 160,30 160,80 C160,130 100,160 80,200 C60,160 0,130 0,80 C0,30 60,30 80,0"
                        fill="#26a69a"
                        opacity="0.8"
                      />
                      <circle cx="80" cy="70" r="20" fill="#fff" opacity="0.6" />
                    </g>
                    <g transform="translate(150, 80)">
                      <path d="M0,0 Q50,20 100,0 Q100,50 50,100 Q0,50 0,0" fill="#4db6ac" opacity="0.5" />
                    </g>
                    <g transform="translate(80, 180)">
                      <path d="M0,0 Q30,40 60,0 Q60,30 30,60 Q0,30 0,0" fill="#4db6ac" opacity="0.5" />
                    </g>
                    <g transform="translate(220, 180)">
                      <path d="M0,0 Q20,30 40,0 Q40,20 20,40 Q0,20 0,0" fill="#4db6ac" opacity="0.5" />
                    </g>
                    <text x="200" y="200" textAnchor="middle" fill="#004d40" fontFamily="serif" fontSize="24">
                      UDAY
                    </text>
                    <text x="200" y="230" textAnchor="middle" fill="#00695c" fontFamily="serif" fontSize="12">
                      Waldorf Inspired School
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Morning - Learning Section */}
      <section ref={(el) => (sectionsRef.current.morning = el)} className="min-h-screen py-20 bg-white relative">
        <div className="absolute inset-0 bg-[url('/images/texture-paper.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-12 text-center">
            The Joy of Discovery
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-amber-50 rounded-2xl p-6 shadow-md transform transition-transform hover:scale-105">
              <div className="h-48 mb-4 rounded-xl overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Children painting"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2">Painting Emotions</h3>
              <p className="text-stone-600">
                Children express their inner world through watercolors, developing emotional intelligence alongside
                creativity.
              </p>
              <div className="mt-4 p-3 bg-white rounded-lg italic text-stone-500 text-sm">
                "When I paint, I can show how I feel without words." — Uday Student, Age 6
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 shadow-md transform transition-transform hover:scale-105">
              <div className="h-48 mb-4 rounded-xl overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Storytelling with puppets"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2">Storytelling Magic</h3>
              <p className="text-stone-600">
                Through puppetry and oral storytelling, children develop language skills and imagination simultaneously.
              </p>
              <div className="mt-4 p-3 bg-white rounded-lg italic text-stone-500 text-sm">
                "Stories help us understand the world and ourselves." — Uday Teacher
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 shadow-md transform transition-transform hover:scale-105">
              <div className="h-48 mb-4 rounded-xl overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Nature-based learning"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2">Nature's Mathematics</h3>
              <p className="text-stone-600">
                Children discover mathematical concepts through natural patterns, rhythms, and hands-on exploration.
              </p>
              <div className="mt-4 p-3 bg-white rounded-lg italic text-stone-500 text-sm">
                "I found Fibonacci spirals in the sunflower!" — Uday Student, Age 8
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => scrollToSection("midday")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white"
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
        <div className="absolute inset-0 bg-[url('/images/texture-paper.png')] opacity-20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-12 text-center">
            Rhythm and Play
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="h-64 md:h-96 relative">
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Children playing outdoors"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2">Outdoor Play</h3>
                <p className="text-stone-600">
                  Children develop physical coordination, social skills, and a deep connection with nature through daily
                  outdoor play.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg">
              <div className="h-64 md:h-96 relative">
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Story circle indoors"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2">Story Circle</h3>
                <p className="text-stone-600">
                  Daily rhythms include story time, where children gather to listen, imagine, and connect with timeless
                  wisdom.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-serif font-semibold text-stone-800 mb-4 text-center">Our Daily Rhythm</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 rounded-lg bg-amber-50">
                <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center mr-4">
                  <span className="text-amber-800 font-serif">8:30</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Morning Circle</h4>
                  <p className="text-sm text-stone-600">Songs, movement, and greetings to start the day</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-emerald-50">
                <div className="w-16 h-16 rounded-full bg-emerald-200 flex items-center justify-center mr-4">
                  <span className="text-emerald-800 font-serif">10:00</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Main Lesson</h4>
                  <p className="text-sm text-stone-600">Integrated learning through stories, art, and movement</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-sky-50">
                <div className="w-16 h-16 rounded-full bg-sky-200 flex items-center justify-center mr-4">
                  <span className="text-sky-800 font-serif">11:30</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Outdoor Play</h4>
                  <p className="text-sm text-stone-600">Free play in nature, gardening, and exploration</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-orange-50">
                <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center mr-4">
                  <span className="text-orange-800 font-serif">12:30</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Lunch & Rest</h4>
                  <p className="text-sm text-stone-600">Nutritious meal followed by quiet time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => scrollToSection("afternoon")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              Experience Our Community <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Afternoon - Community Section */}
      <section ref={(el) => (sectionsRef.current.afternoon = el)} className="min-h-screen py-20 bg-white relative">
        <div className="absolute inset-0 bg-[url('/images/texture-paper.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-12 text-center">
            Community and Care
          </h2>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-8">
              <Image
                src="/placeholder.svg?height=800&width=1600"
                alt="Community gathering"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
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
              <div className="bg-amber-50 rounded-xl p-5 shadow-md">
                <h3 className="text-lg font-serif font-semibold text-stone-800 mb-3">Parent Involvement</h3>
                <p className="text-stone-600 text-sm">
                  Parents actively participate in festivals, craft days, and community events, creating a village-like
                  atmosphere.
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-5 shadow-md">
                <h3 className="text-lg font-serif font-semibold text-stone-800 mb-3">Seasonal Celebrations</h3>
                <p className="text-stone-600 text-sm">
                  We honor the rhythm of the year through festivals that connect children to cultural traditions and
                  natural cycles.
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-5 shadow-md">
                <h3 className="text-lg font-serif font-semibold text-stone-800 mb-3">Wholesome Meals</h3>
                <p className="text-stone-600 text-sm">
                  Children help prepare nutritious, organic meals, learning about food, cooperation, and gratitude.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-6 text-center">What Parents Say</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100">
                <p className="text-stone-600 italic mb-4">
                  "I've never seen my child so joyful and engaged in learning. At UDAY, education isn't something that
                  happens to them—it's something they actively participate in with their whole being."
                </p>
                <p className="text-stone-800 font-medium">— Parent of a 7-year-old</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-amber-100">
                <p className="text-stone-600 italic mb-4">
                  "The difference in my child's confidence, creativity, and love for learning is remarkable. UDAY
                  doesn't just teach subjects—it nurtures the whole child."
                </p>
                <p className="text-stone-800 font-medium">— Parent of a 5-year-old</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => scrollToSection("sunset")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white"
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
        <div className="absolute inset-0 bg-[url('/images/texture-paper.png')] opacity-20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-12 text-center">The UDAY Story</h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
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

              <div className="rounded-2xl overflow-hidden shadow-lg">
                <div className="h-80 relative">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Founder Gurpreet"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="relative py-12">
              <div className="absolute left-0 right-0 h-1 bg-amber-200 top-1/2 transform -translate-y-1/2"></div>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 relative z-10">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500 mx-auto flex items-center justify-center mb-2 shadow-md">
                    <span className="text-white font-bold">2014</span>
                  </div>
                  <p className="text-sm text-stone-600">Founded with 4 children</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500 mx-auto flex items-center justify-center mb-2 shadow-md">
                    <span className="text-white font-bold">2016</span>
                  </div>
                  <p className="text-sm text-stone-600">First grade class</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500 mx-auto flex items-center justify-center mb-2 shadow-md">
                    <span className="text-white font-bold">2018</span>
                  </div>
                  <p className="text-sm text-stone-600">New campus</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500 mx-auto flex items-center justify-center mb-2 shadow-md">
                    <span className="text-white font-bold">2021</span>
                  </div>
                  <p className="text-sm text-stone-600">Expanded to Grade 5</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500 mx-auto flex items-center justify-center mb-2 shadow-md">
                    <span className="text-white font-bold">2025</span>
                  </div>
                  <p className="text-sm text-stone-600">Growing each year</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100 mt-8">
              <p className="text-xl text-stone-700 italic text-center">
                "I didn't build a school. I built what I wished existed for my own child—a place where education
                nurtures the head, heart, and hands in harmony."
              </p>
              <p className="text-stone-800 font-medium text-center mt-4">— Gurpreet, Founder</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => scrollToSection("cta")}
              className="rounded-full bg-teal-600 hover:bg-teal-700 text-white"
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
        <div className="absolute inset-0 bg-[url('/images/texture-paper.png')] opacity-30 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-6">
              Start Your Child's Journey
            </h2>
            <p className="text-xl text-stone-700 mb-12 max-w-2xl mx-auto">
              Join the UDAY family and give your child the gift of joyful, meaningful education that nurtures their
              whole being.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-4 text-center">
                  Book a Campus Visit
                </h3>
                <p className="text-stone-600 mb-6 text-center">
                  Experience the UDAY difference firsthand. Schedule a tour of our campus.
                </p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Schedule a Visit</Button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-4 text-center">
                  Speak to an Educator
                </h3>
                <p className="text-stone-600 mb-6 text-center">
                  Have questions about our approach? Connect with our experienced teachers.
                </p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Contact Us</Button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-100">
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-4 text-center">
                  Apply for Admission
                </h3>
                <p className="text-stone-600 mb-6 text-center">
                  Ready to join? Start the application process for the upcoming session.
                </p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Apply Now</Button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100">
              <h3 className="text-2xl font-serif font-semibold text-stone-800 mb-6 text-center">
                Why Waldorf Education?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 shrink-0">
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
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 shrink-0">
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
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 shrink-0">
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
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4 shrink-0">
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
