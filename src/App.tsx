/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Menu,
  X,
  Send
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';
import Background3D from "./components/Background3D";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const mainRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About As", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "React (Learning)", "Tailwind CSS"],
    backend: ["Python", "Java", "Basic SQL"],
  };

  const projects = [
    {
      title: "Calculator App",
      description: "A fully functional calculator with a sleek dark themed UI. Built to master basic JavaScript logic and DOM manipulation.",
      tech: ["HTML", "CSS", "JS"],
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCFkpplNgxAlGCD5z1dUQ-an8OGtBwh-jvve0Bxs4RdrfCjAjx7NLodQ9Ax3bNzwpPhY9cL2AdVmXYXDHNyFMpsH0wUb1gaJBgOdMhSbX9jFB7bidTDpYHwMNTZnjnhb49AchUcjwzR1La8-oqBm5-vw8M66kyI1x5qYRm7vRgs2BKJDCMjNEGoDnroJMw/s800/WhatsApp%20Image%202026-03-29%20at%209.39.30%20AM%20(1).jpeg",
      id: "project-calc"
    },
    {
      title: "QR Code Scanner",
      description: "Experimental project that scans and generates QR codes in real-time. Explores the use of web APIs and third-party libraries.",
      tech: ["JavaScript", "Web APIs"],
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQct1a9HDkwYZTbzOz-QDC7rOGIfoApXSD1l4DJhq_CSbTWUWqWIazfR2h67eMhZbxg15vk-N9vyVdxEifB_zUqFJAplAYCsW2XCX2fIE2jmOsA0MJKvrIffolDi7WtX3xF2nakdMV51y5MTr-C3a3CHxuy633V83zCqGhR0eroEMkZQq8S7BWK0DXTTyc/s800/WhatsApp%20Image%202026-03-29%20at%209.39.30%20AM.jpeg",
      id: "project-qr"
    }
  ];

  useEffect(() => {
    // Smooth scrolling setup with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Load Animation
      const tl = gsap.timeline();
      
      // Navbar load
      tl.from(".nav-bar", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      });

      // Hero text reveal
      tl.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.5");

      // Text Split Animations
      const titles = gsap.utils.toArray<HTMLElement>('.split-text');
      titles.forEach(title => {
        const split = new SplitType(title, { types: 'chars,words' });
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
          },
          opacity: 0,
          y: 20,
          rotateX: -90,
          stagger: 0.02,
          duration: 0.8,
          ease: "back.out(1.5)"
        });
      });

      // 2. Scroll Animations Setup
      
      // About Section
      gsap.from(".about-text > *", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
      
      gsap.from(".about-code-card", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      });

      // Skills Section
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: "#skills",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });

      // Projects Section
      gsap.utils.toArray(".project-card").forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Contact Section
      gsap.from(".contact-content > *", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });

      // Form Section
      gsap.from(".form-card", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top 70%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-black font-sans">
      <Background3D />

      {/* Navigation */}
      <nav className="nav-bar fixed w-full z-50 bg-[#050505]/40 backdrop-blur-xl border-b border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-display font-bold tracking-tighter relative group">
            DH <span className="text-orange-500 transition-colors duration-300 group-hover:text-white">.</span>
            <div className="absolute -inset-2 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest font-semibold text-white/60 hover:text-orange-500 transition-all duration-300 hover:glow-effect"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white relative z-[60] bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-[#050505]/95 backdrop-blur-2xl z-[55] flex flex-col items-center justify-center gap-8 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-display font-black text-white hover:text-orange-500 hover:scale-110 transition-all duration-300 uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 py-28 md:py-32">
          {/* Glassmorphism gradient orbs */}
          <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-orange-500/15 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

          <div ref={heroTextRef} className="hero-content max-w-7xl mx-auto w-full relative z-10 pt-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 font-mono text-xs tracking-widest uppercase mb-6 rounded-full shadow-[0_0_20px_rgba(234,88,12,0.15)]">
                Hello, I am
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-display font-black leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl split-text text-white w-full">
                Dharmesh M <span className="text-orange-500 glow-text inline-block">.</span>
              </h1>
              <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-12 items-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white/80 uppercase tracking-wide">
                  Student & <br className="hidden lg:block"/><span className="italic font-display font-medium text-white shadow-white/10 drop-shadow-lg">Full Stack Enthusiast</span>
                </h2>
                <p className="max-w-md text-white/50 text-base md:text-lg glass-panel p-4 rounded-2xl">
                  Crafting digital experiences while navigating the challenges of 12th standard.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
                <a href="#contact" className="px-8 py-4 bg-orange-500 text-black font-extrabold uppercase tracking-wide text-sm rounded-full hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] active:scale-95 transition-all duration-300 text-center">
                  Get in touch
                </a>
                <a href="#projects" className="px-8 py-4 border border-white/20 glass-panel rounded-full hover:bg-white/10 transition-all duration-300 text-center uppercase tracking-wide text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  View Work
                </a>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[450px] shrink-0 mx-auto lg:mx-0 flex justify-center relative group">
              <div className="absolute inset-0 bg-orange-500/20 blur-[80px] lg:blur-[100px] group-hover:bg-orange-500/40 transition-colors duration-700 rounded-full" />
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiB2hHpol6tBfm0raTh9e_8Yqu1EpKGwcuiPjAymfqgfIPotyuj16EishJqZn6xBZuekVaPikAB_LkUTVFDcqb05mysD0SKTJ7D_IvXceH9aQTBmDes6UYO-pBZbSYMpxeRtD5y0Bt2eo83MmxNkTZrxYlOOr7UZ2Xq2I1g4OgcaGFfQ7HQb-g0RXq7d59T/s800/1000180182.jpg" 
                alt="Dharmesh M"
                className="w-full h-auto aspect-square object-cover rounded-full border-4 sm:border-8 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] z-10 group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-center">
              <div className="about-text">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black mb-8 drop-shadow-xl split-text">
                  Building the web, <br /> 
                  <span className="text-white/30 italic">one line at a time.</span>
                </h2>
                <div className="space-y-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl font-light">
                  <p>
                    I'm Dharmesh, a 12th-standard student at <span className="text-white font-medium drop-shadow-md">Annamalam School, Tamil Nadu</span>. 
                    My journey into tech started with a simple curiosity about how things work behind the screen.
                  </p>
                  <p>
                    Currently balancing school with a deep dive into frontend and backend technologies. 
                    My goal is to master the full stack and build applications that solve real-world problems.
                  </p>
                </div>
              </div>
              
              <div className="about-code-card relative group mt-10 md:mt-0">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  </div>
                  <div className="font-mono text-xs sm:text-sm space-y-3">
                    <p className="text-blue-400">class <span className="text-orange-400 font-bold">Dreamer</span> {"{"}</p>
                    <p className="pl-4 text-purple-400 font-medium italic">state = "Learning";</p>
                    <p className="pl-4 text-purple-400 font-medium italic">ambition = "Full Stack Dev";</p>
                    <p className="pl-4 text-white">constructor() {"{"}</p>
                    <p className="pl-8 text-green-400">this.passion = true;</p>
                    <p className="pl-4 text-white">{"}"}</p>
                    <p className="text-white">{"}"}</p>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-orange-500/20 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-white/5 border-y border-white/10 px-6 backdrop-blur-md relative z-10">
          <div className="absolute top-0 left-1/4 w-[30vw] h-[30vw] bg-orange-500/10 blur-[100px] -translate-y-1/2 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <h2 className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 split-text">My Toolkit</h2>
              <p className="text-white/40 max-w-xs uppercase tracking-[0.2em] text-[10px] font-bold pb-2">
                Continually expanding my knowledge in modern tech stacks.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Frontend */}
              <div className="skill-card p-8 sm:p-10 rounded-[2rem] glass-panel border border-white/10 hover:border-orange-500/30 transition-colors duration-500 group">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-500/20">
                    <Code2 size={28} />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.frontend.map(skill => (
                    <span key={skill} className="px-5 py-2.5 bg-[#050505]/60 shadow-inner border border-white/5 rounded-full text-sm text-white/80 font-medium hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/30 transition-all duration-300 cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="skill-card p-8 sm:p-10 rounded-[2rem] glass-panel border border-white/10 hover:border-orange-500/30 transition-colors duration-500 group">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-green-500/10 rounded-2xl text-green-400 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] border border-green-500/20">
                    <Terminal size={28} />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.backend.map(skill => (
                    <span key={skill} className="px-5 py-2.5 bg-[#050505]/60 shadow-inner border border-white/5 rounded-full text-sm text-white/80 font-medium hover:bg-green-500/10 hover:text-green-300 hover:border-green-500/30 transition-all duration-300 cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 md:py-40 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-20">
              <h2 className="text-5xl md:text-[5rem] leading-none font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-white split-text">Showcase</h2>
              <div className="hidden md:block h-[1px] flex-grow mx-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <p className="text-white/50 font-mono text-xs tracking-widest">(02) Selected Works</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
              {projects.map((project, idx) => (
                <div key={project.id} className="project-card group relative">
                  <div className="aspect-video glass-panel rounded-[2rem] sm:rounded-[3rem] mb-6 sm:mb-8 overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:border-orange-500/30">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] relative">
                      <img src={project.image} alt={project.title} className="absolute w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 mix-blend-overlay" />
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent group-hover:opacity-40 transition-opacity duration-700" />
                      <div className="text-center relative z-10 p-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 font-display font-black text-5xl sm:text-7xl uppercase tracking-tighter drop-shadow-xl select-none transition-all duration-700 group-hover:from-white/100 group-hover:to-white/50 group-hover:tracking-normal group-hover:scale-110 inline-block">
                          {project.title.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                    {/* Floating Tech Dots */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-wrap justify-end gap-2 p-2">
                      {project.tech.map(t => (
                        <div key={t} className="px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border border-white/10 shadow-lg text-white/80">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start gap-4 px-2 sm:px-6">
                    <div>
                      <h3 className="text-2xl sm:text-4xl font-display font-bold mb-3 sm:mb-4 group-hover:text-orange-400 transition-colors duration-300">{project.title}</h3>
                      <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md font-light">
                        {project.description}
                      </p>
                    </div>
                    <a 
                      href="#" 
                      id={project.id}
                      className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full glass-panel border border-white/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-black transition-all duration-500 hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]"
                    >
                      <ExternalLink size={24} className="group-hover:rotate-45 transition-transform duration-500" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 bg-white/5 border-y border-white/10 px-6 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <h2 className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 split-text">Education</h2>
              <p className="text-white/40 max-w-xs uppercase tracking-[0.2em] text-[10px] font-bold pb-2">
                My academic journey and qualifications.
              </p>
            </div>
            
            <div className="glass-panel p-8 sm:p-12 rounded-[2rem] border border-white/10 hover:border-orange-500/30 transition-colors duration-500 max-w-3xl">
              <div className="flex items-center gap-4 text-orange-500 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Terminal size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">Annamalam School</h3>
              </div>
              <div className="pl-16 space-y-2">
                <p className="text-xl font-medium text-white/80">12th Standard Student</p>
                <p className="text-orange-500/80 font-mono text-sm">Tamil Nadu, India</p>
                <p className="pt-4 text-white/60 font-light leading-relaxed">
                  Currently pursuing my higher secondary education while actively expanding my skill set in full-stack web development and programming.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 md:px-10 relative z-10">
          <div className="contact-content max-w-7xl mx-auto rounded-[2rem] sm:rounded-[3rem] bg-orange-500 p-8 sm:p-12 md:p-24 overflow-hidden relative group shadow-[0_30px_60px_-15px_rgba(234,88,12,0.4)]">
            <div className="absolute top-0 right-0 w-[150%] sm:w-[100%] md:w-[70%] lg:w-[50%] h-full bg-black/10 -skew-x-12 translate-x-[20%] group-hover:translate-x-[40%] transition-transform duration-[1.5s] pointer-events-none ease-out" />
            
            <div className="relative z-10 grid lg:grid-cols-[1fr_0.8fr] gap-12 md:gap-16 items-start">
              <div>
                <h2 className="text-5xl sm:text-6xl md:text-[6rem] font-display font-black text-black leading-[0.85] tracking-tighter mb-8 sm:mb-12 split-text">
                  Let's Build <br /> Something <span className="italic text-white">Cool.</span>
                </h2>
                <div className="flex flex-col gap-6 sm:gap-8">
                  <a href="mailto:dharmeshmd2010@gmail.com" className="flex items-center gap-5 sm:gap-6 group/item hover:-translate-y-1 transition-transform duration-300 w-fit">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black flex items-center justify-center text-orange-500 shadow-xl group-hover/item:scale-110 transition-transform duration-300 shrink-0">
                      <Mail size={24} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-black/60 uppercase tracking-widest text-[9px] sm:text-[10px] font-bold mb-1">Send an email</p>
                      <p className="text-lg sm:text-2xl font-bold text-black border-b-[3px] border-black/20 group-hover/item:border-white group-hover/item:text-white transition-colors duration-300 truncate pb-1">
                        dharmeshmd2010@gmail.com
                      </p>
                    </div>
                  </a>
                  <a href="tel:9976129079" className="flex items-center gap-5 sm:gap-6 group/item hover:-translate-y-1 transition-transform duration-300 w-fit">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black flex items-center justify-center text-orange-500 shadow-xl group-hover/item:scale-110 transition-transform duration-300 shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-black/60 uppercase tracking-widest text-[9px] sm:text-[10px] font-bold mb-1">Give a call</p>
                      <p className="text-lg sm:text-2xl font-bold text-black border-b-[3px] border-black/20 group-hover/item:border-white group-hover/item:text-white transition-colors duration-300 pb-1">
                        +91 99761 29079
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="form-card bg-[#0a0a0a] p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[50px]" />
                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-8 text-white relative z-10 flex items-center gap-3">
                  <Mail className="text-orange-500"/> Message Me
                </h3>
                
                <form className="relative z-10 flex flex-col gap-5" onSubmit={(e) => { 
                  e.preventDefault(); 
                  setFormStatus("submitting");
                  setTimeout(() => {
                    setFormStatus("success");
                    setTimeout(() => setFormStatus("idle"), 3000);
                  }, 1000);
                }}>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-2">Name</label>
                    <input type="text" placeholder="John Doe" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-colors" disabled={formStatus !== "idle"} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-2">Email</label>
                    <input type="email" placeholder="john@example.com" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-colors" disabled={formStatus !== "idle"} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-bold ml-2">Message</label>
                    <textarea placeholder="Hi Dharmesh, I'd like to collaborate..." required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-colors resize-none" disabled={formStatus !== "idle"} />
                  </div>
                  <button type="submit" disabled={formStatus !== "idle"} className="mt-2 w-full py-4 bg-white hover:bg-orange-500 hover:text-black text-black font-bold uppercase tracking-widest text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed">
                    {formStatus === "idle" && <><span className="relative top-[1px]">Send Message</span> <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></>}
                    {formStatus === "submitting" && <span className="animate-pulse">Sending...</span>}
                    {formStatus === "success" && <span className="text-green-600">Message Sent!</span>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 px-6 border-t border-white/10 bg-[#050505]/80 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-white/40 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-center md:text-left">
            <p>© 2024 Dharmesh M. All Rights</p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              <a href="#home" className="hover:text-orange-500 transition-colors duration-300">Home</a>
              <a href="#projects" className="hover:text-orange-500 transition-colors duration-300">Projects</a>
              <a href="#about" className="hover:text-orange-500 transition-colors duration-300">About</a>
            </div>
            <p className="flex items-center gap-2">
              Made with <span className="text-orange-500 animate-pulse text-lg">♥</span> in TN
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
