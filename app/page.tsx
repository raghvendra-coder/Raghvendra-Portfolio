"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  id: number;
  tag: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
};

const SKILL_CATEGORIES = [
  {
    icon: "fa-solid fa-code",
    cornerIcon: "fa-solid fa-code",
    variant: "",
    title: "Programming Languages",
    skills: [
      { name: "C++", note: "DSA, LeetCode" },
      { name: "Java" },
      { name: "Python" },
      { name: "JavaScript" },
      { name: "C" },
    ],
  },
  {
    icon: "fa-solid fa-desktop",
    cornerIcon: "fa-brands fa-react",
    variant: "",
    title: "Frontend Development",
    skills: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript (ES6+)" },
      { name: "React.js" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "Framer Motion" },
    ],
  },
  {
    icon: "fa-solid fa-server",
    cornerIcon: "fa-brands fa-node-js",
    variant: "",
    title: "Backend Development",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "MongoDB" },
      { name: "Mongoose" },
      { name: "JWT Authentication" },
      { name: "RBAC" },
      { name: "Swagger" },
      { name: "Multer" },
      { name: "Cloudinary" },
    ],
  },
  {
    icon: "fa-solid fa-brain",
    cornerIcon: "fa-solid fa-wand-magic-sparkles",
    variant: "red",
    title: "AI / GenAI",
    skills: [
      { name: "Python" },
      { name: "Gemini API" },
      { name: "Groq API" },
      { name: "OpenAI APIs" },
      { name: "LangChain" },
      { name: "Agentic AI" },
      { name: "Prompt Engineering" },
      { name: "AI-powered Applications" },
    ],
  },
  {
    icon: "fa-solid fa-database",
    cornerIcon: "fa-solid fa-database",
    variant: "",
    title: "Database",
    skills: [
      { name: "MongoDB" },
      { name: "MongoDB Atlas" },
      { name: "MongoDB Compass" },
      { name: "SQL" },
    ],
  },
  {
    icon: "fa-solid fa-toolbox",
    cornerIcon: "fa-brands fa-github",
    variant: "",
    title: "Developer Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Postman" },
      { name: "npm" },
      { name: "Swagger" },
    ],
  },
  {
    icon: "fa-solid fa-cloud",
    cornerIcon: "fa-solid fa-cloud",
    variant: "white",
    title: "Other Technologies",
    skills: [
      { name: "IoT" },
      { name: "Blockchain" },
      { name: "AWS (basic)" },
      { name: "RESTful Architecture" },
      { name: "Cisco Networking" },
    ],
  },
  {
    icon: "fa-solid fa-microchip",
    cornerIcon: "fa-solid fa-microchip",
    variant: "pink",
    title: "Core CS",
    skills: [
      { name: "Data Structures & Algorithms" },
      { name: "OOP" },
      { name: "Operating Systems" },
      { name: "DBMS" },
      { name: "Computer Networks" },
      { name: "Problem Solving" },
    ],
  },
];

const CERTIFICATIONS = [
  { title: "Oracle Certified Foundations Associate — Agentic AI", issuer: "Oracle University", date: "Sep 2026", icon: "fa-solid fa-award", variant: "red" },
  { title: "Introduction to Modern AI", issuer: "Cisco Networking Academy", date: "Sep 2026", icon: "fa-solid fa-network-wired", variant: "blue" },
  { title: "Find Insights with AI", issuer: "Cisco Networking Academy", date: "Sep 2026", icon: "fa-solid fa-chart-line", variant: "green" },
  { title: "Data Analytics Essentials", issuer: "Cisco Networking Academy", date: "Sep 2026", icon: "fa-solid fa-database", variant: "purple" },
  { title: "Web Development Fundamentals", issuer: "IBM SkillsBuild", date: "Aug 2025", icon: "fa-solid fa-globe", variant: "blue" },
  { title: "Technology Job Simulation (Coding & Development)", issuer: "Deloitte, via Forage", date: "Jun 2026", icon: "fa-solid fa-briefcase", variant: "green" },
  { title: "AI Tools, ChatGPT & Prompt Engineering", issuer: "Infosys Springboard", date: "2025", icon: "fa-solid fa-microchip", variant: "red" },
  { title: "5-Day Industry Training", issuer: "Netlink (Lumenore)", date: "Jun 2026", icon: "fa-solid fa-laptop-code", variant: "" },
];

const GITHUB_URL = "https://github.com/raghvendra-coder";
const LINKEDIN_URL = "https://www.linkedin.com/in/raghvendra-yadav-tech";
const EMAIL = "raghu2184885@gmail.com";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

export default function Home() {
  const [preloading, setPreloading] = useState(true);
  const [pct, setPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [projects, setProjects] = useState<Project[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<
    { type: "idle" | "loading" | "success" | "error"; message?: string }
  >({ type: "idle" });

  const timelineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  // Fetch projects from backend
  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  // Preloader
  useEffect(() => {
    if (reduceMotion) {
      setPreloading(false);
      return;
    }
    let n = 0;
    const int = setInterval(() => {
      n += Math.floor(Math.random() * 8) + 2;
      if (n >= 100) {
        n = 100;
        clearInterval(int);
      }
      setPct(n);
    }, 60);
    const t = setTimeout(() => {
      setPct(100);
      setPreloading(false);
    }, 1700);
    return () => {
      clearInterval(int);
      clearTimeout(t);
    };
  }, [reduceMotion]);

  // Headline word reveal after preload
  useEffect(() => {
    if (preloading) return;
    const words = document.querySelectorAll<HTMLElement>(".headline .word-inner");
    words.forEach((w, i) => {
      setTimeout(() => {
        w.style.transition = "transform 1.1s cubic-bezier(.22,.61,.36,1)";
        w.style.transform = "translateY(0)";
      }, reduceMotion ? 0 : i * 200);
    });
  }, [preloading, reduceMotion]);

  // Particle canvas
  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      const count = Math.min(90, Math.floor((W * H) / 22000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.4,
        });
      }
    }
    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function loop() {
      ctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (14000 - d2) / 14000;
          p.x += dx * f * 0.03;
          p.y += dy * f * 0.03;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(255,107,26,0.55)";
        ctx!.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx2 = p.x - q.x, dy2 = p.y - q.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist < 110) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(255,107,26,${0.12 * (1 - dist / 110)})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    }
    resize();
    loop();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion]);

  // Custom cursor
  useEffect(() => {
    if (reduceMotion || window.matchMedia("(hover:none)").matches) return;
    const dot = cursorDotRef.current, ring = cursorRingRef.current, label = cursorLabelRef.current;
    if (!dot || !ring || !label) return;
    let mx = 0, my = 0, rx = 0, ry = 0, lx = 0, ly = 0, raf = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      dot!.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    }
    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      lx += (mx - lx) * 0.14;
      ly += (my - ly) * 0.14;
      ring!.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      label!.style.transform = `translate(${lx}px,${ly + 52}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    const hoverEls = document.querySelectorAll("a,button,[data-hover],.skill-pill,.skill-card,.project-card,.certificate");
    const onEnter = () => ring!.classList.add("hover");
    const onLeaveEl = () => ring!.classList.remove("hover");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeaveEl);
    });

    const cursorEls = document.querySelectorAll("[data-cursor]");
    const enterHandlers: Array<() => void> = [];
    const leaveHandlers: Array<() => void> = [];
    cursorEls.forEach((el) => {
      const enter = () => {
        label!.textContent = el.getAttribute("data-cursor");
        label!.style.opacity = "1";
      };
      const leave = () => {
        label!.style.opacity = "0";
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      enterHandlers.push(() => el.removeEventListener("mouseenter", enter));
      leaveHandlers.push(() => el.removeEventListener("mouseleave", leave));
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeaveEl);
      });
      enterHandlers.forEach((fn) => fn());
      leaveHandlers.forEach((fn) => fn());
    };
  }, [reduceMotion, preloading, projects]);

  // Scroll progress + header scrolled + active nav
  useEffect(() => {
    function onScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const bar = document.getElementById("scrollProgress");
      if (bar) bar.style.width = (window.scrollY / h) * 100 + "%";
      setScrolled(window.scrollY > 20);

      let current = "home";
      document.querySelectorAll("section[id]").forEach((s) => {
        const el = s as HTMLElement;
        if (window.scrollY >= el.offsetTop - 140) current = el.id;
      });
      setActiveNav(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal (.reveal elements)
  useEffect(() => {
    if (preloading) return;
    const items = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("in"), i * 60);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [preloading, projects]);

  // Number counters
  useEffect(() => {
    if (preloading) return;
    const nums = document.querySelectorAll<HTMLElement>("[data-count]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.getAttribute("data-count") || "0", 10);
          const suffix = el.getAttribute("data-suffix") || "";
          const dur = 1400;
          const start = performance.now();
          function tick(now: number) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
          }
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    nums.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [preloading]);

  // 3D tilt for project/code/skill/cert cards
  useEffect(() => {
    if (reduceMotion) return;
    const cards = document.querySelectorAll<HTMLElement>(".project-card, .code-card, .skill-card, .certificate");
    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      let hovering = false;
      let tX = 0, tY = 0, cX = 0, cY = 0, raf: number | null = null;
      const MAX = 8;
      function loop() {
        cX += (tX - cX) * 0.14;
        cY += (tY - cY) * 0.14;
        card.style.transform =
          `perspective(1000px) rotateX(${cY}deg) rotateY(${cX}deg) ` +
          `translateY(${hovering ? -6 : 0}px) scale(${hovering ? 1.015 : 1})`;
        if (hovering || Math.abs(tX - cX) > 0.01 || Math.abs(tY - cY) > 0.01) {
          raf = requestAnimationFrame(loop);
        } else {
          raf = null;
          card.style.transform = "";
        }
      }
      function start() {
        if (!raf) raf = requestAnimationFrame(loop);
      }
      const onEnter = () => { hovering = true; start(); };
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        tX = ((x - r.width / 2) / (r.width / 2)) * MAX;
        tY = ((y - r.height / 2) / (r.height / 2)) * -MAX;
        card.style.setProperty("--mx", x + "px");
        card.style.setProperty("--my", y + "px");
        start();
      };
      const onLeave = () => { hovering = false; tX = 0; tY = 0; start(); };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [reduceMotion, projects]);

  // Certificate cards stagger reveal
  useEffect(() => {
    const cards = document.querySelectorAll(".certificate");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("in"), i * 80);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [preloading]);

  // Timeline draw
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.classList.add("drawn");
            io.unobserve(tl);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(tl);
    return () => io.disconnect();
  }, []);

  // Magnetic buttons
  useEffect(() => {
    if (reduceMotion || window.matchMedia("(hover:none)").matches) return;
    const els = document.querySelectorAll<HTMLElement>(".btn-solid, .hire-btn, .social-btn");
    const cleanups: Array<() => void> = [];
    els.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px) scale(1.04)`;
      };
      const onLeave = () => { el.style.transform = ""; };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [reduceMotion, preloading, projects]);

  // Live Demo: no real URL configured yet for any project (data/projects.json
  // has "demo": "#"). Rather than silently doing nothing or following a fake
  // link, intercept the click and tell the visitor the demo isn't live yet.
  // Once a real URL is added to a project's "demo" field, this lets the
  // normal link navigation through untouched.
  function handleDemoClick(e: React.MouseEvent<HTMLAnchorElement>, demoUrl: string) {
    if (!demoUrl || demoUrl === "#") {
      e.preventDefault();
      showToast("Live demo link coming soon");
    }
  }

  // GitHub: repo links aren't ready to share yet, and we were asked not to
  // invent one. Every click hits a small API route that intentionally
  // responds 400, and we surface that response to the visitor instead of
  // navigating anywhere.
  async function handleGithubClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects/github");
      const data = await res.json().catch(() => ({}));
      showToast(data.error ? `${data.error} (${res.status})` : `Request failed (${res.status})`);
    } catch {
      showToast("GitHub link is unavailable right now");
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus({ type: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormStatus({ type: "error", message: data.error || "Something went wrong." });
        return;
      }
      setFormStatus({        
        type: "success",
        message: "✓ Message sent successfully. I'll get back to you soon.",
      });

      setForm({ name: "", email: "", message: "" });

      showToast("Message sent ✓");

      setTimeout(() => {
        setFormStatus({ type: "idle" });
        }, 5000);
    } catch {
      setFormStatus({ type: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <>
      <div id="grain" />
      <canvas id="particles" ref={canvasRef} />
      <div id="scrollProgress" />

      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef} />
      <div className="cursor-label" ref={cursorLabelRef}>VIEW</div>

      {preloading && (
        <div id="preloader">
          <div className="pre-tag">PORTFOLIO / 2026</div>
          <div className="pre-logo">RAGHVENDRA</div>
          <div className="pre-bar" />
          <div className="pre-role">FULL-STACK DEVELOPER</div>
          <div className="pre-count">{pct}%</div>
        </div>
      )}

      {toast && <div id="toast" className="show">{toast}</div>}

      <header className={scrolled ? "scrolled" : ""}>
        <nav className="wrap">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="logo-mark">RY</div>
            RAGHVENDRA
          </div>
          <div className="nav-links">
            <a href="#home" className={activeNav === "home" ? "active" : ""}>Home</a>
            <a href="#about" className={activeNav === "about" ? "active" : ""}>About</a>
            <a href="#skills" className={activeNav === "skills" ? "active" : ""}>Skills</a>
            <a href="#projects" className={activeNav === "projects" ? "active" : ""}>Projects</a>
            <a href="#experience" className={activeNav === "experience" ? "active" : ""}>Experience</a>
            <a href="#certifications" className={activeNav === "certifications" ? "active" : ""}>Certifications</a>
            <a href="#contact" className={activeNav === "contact" ? "active" : ""}>Contact</a>
          </div>
          <a href="#contact" className="hire-btn" data-hover data-cursor="HIRE">Hire Me →</a>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section className="hero" id="home">
        <div className="section-num">01</div>
        <div className="wrap hero-grid">
          <div className="hero-text">
            <div className="status-pill">
              <span className="status-dot" />
              Available for internships &amp; full-time
            </div>
            <p className="script-line">Hi, I am</p>
            <h3 className="hero-name">Raghvendra Yadav</h3>
            <h1 className="headline">
              <span className="word"><span className="word-inner grad">Full-Stack</span></span><br />
              <span className="word"><span className="word-inner outline">Developer</span></span>
            </h1>
            <p className="hero-desc">
              Building <strong>scalable, AI-powered</strong> web applications with modern technologies. Passionate about problem-solving, clean code, and continuous learning.
            </p>
           <div className="social-row">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="social-btn" data-hover><span>in</span></a>
              <a href={GITHUB_URL} target="_blank" rel="noopener" className="social-btn" data-hover><span>GH</span></a>
            </div>
            <div className="cta-row">
              <a href="#contact" className="btn btn-solid" data-hover data-cursor="HIRE">Hire Me →</a>
              <a href="/Resume.pdf" className="btn btn-outline" data-hover data-cursor="CV" download>Download CV</a>
            </div>
            <div className="stats-bar">
              <div className="stat-h"><b data-count="3">0</b><span>Internships</span></div>
              <div className="stat-h"><b data-count="200" data-suffix="+">0</b><span>LeetCode Solved</span></div>
              <div className="stat-h"><b data-count="4">0</b><span>Projects Built</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="avatar-wrap">
              <div className="avatar-glow" />
              <div className="avatar-orbit" />
              <div className="avatar-core">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/raghvendra.jpg" alt="Raghvendra Yadav — Full-Stack Developer" className="avatar-img" />
                <div className="avatar-tint" />
                <div className="avatar-ring-inner" />
              </div>
              <div className="float-chip c1">React <b>•</b> Node</div>
              <div className="float-chip c2">MongoDB</div>
              <div className="float-chip c3">Gemini <b>AI</b></div>
              <div className="float-chip c4">Docker</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <span key={rep} style={{ display: "contents" }}>
              <span>MERN Stack</span>
              <span className="accent">AI Integration</span>
              <span>REST APIs</span>
              <span className="accent">Docker</span>
              <span>JWT Auth</span>
              <span className="accent">Cloud/DevOps</span>
              <span>React</span>
              <span className="accent">Node.js</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============ ABOUT ============ */}
      <section id="about">
        <div className="section-num">02</div>
        <div className="wrap">
          <p className="eyebrow reveal">About Me</p>
          <h2 className="reveal">Background &amp; <span className="accent">how I work</span></h2>

          <div className="about-grid">
            <div className="about-text reveal">
              <p>I&apos;m a <strong>Full-Stack Developer</strong> focused on building scalable web applications and AI-powered solutions. I work with React, Node.js, Express, MongoDB, and JavaScript, with a strong focus on clean code, problem-solving, and continuous learning.</p>
              <p>I&apos;ve completed multiple development internships and built projects like <strong>Swasth-AI</strong>, a full-stack platform integrating AI capabilities with secure authentication. I&apos;ve solved 200+ problems on LeetCode and I&apos;m currently exploring Docker, Cloud, and DevOps fundamentals.</p>
            </div>
            <div className="code-card reveal">
              <div className="code-head">
                <i></i><i></i><i></i>
                <span className="file">developer.js</span>
              </div>
              <div className="code-body">
                <span className="kw">const</span> <span className="key">developer</span> = {"{"}<br />
                &nbsp;&nbsp;name: <span className="str">&apos;Raghvendra Yadav&apos;</span>,<br />
                &nbsp;&nbsp;role: <span className="str">&apos;Full-Stack Developer&apos;</span>,<br />
                &nbsp;&nbsp;location: <span className="str">&apos;Bhopal, India&apos;</span>,<br />
                &nbsp;&nbsp;stack: [<span className="str">&apos;React&apos;</span>, <span className="str">&apos;Node&apos;</span>, <span className="str">&apos;Express&apos;</span>, <span className="str">&apos;MongoDB&apos;</span>],<br />
                &nbsp;&nbsp;currentlyLearning: <span className="str">&apos;Docker &amp; CI/CD&apos;</span>,<br />
                &nbsp;&nbsp;available: <span className="bool">true</span><br />
                {"};"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section id="skills">
        <div className="section-num">03</div>
        <div className="wrap">
          <div className="section-head-row">
            <div>
              <div className="section-label reveal">
                <span className="label-dot" />
                My Skills
              </div>
              <h2 className="reveal">Technical <span className="accent">Skills</span></h2>
              <p className="lead reveal">Technologies and tools I use to build modern web applications and scalable systems.</p>
            </div>
            <div className="learning-badge reveal">
              <span className="bolt">⚡</span>
              <span>Always Learning</span>
              <b>•</b>
              <span>Always Improving</span>
            </div>
          </div>

          <div className="skills-grid">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.title} className={"skill-card reveal" + (cat.variant ? " " + cat.variant : "")}>
                <div className="skill-header">
                  <div className="skill-icon"><i className={cat.icon} /></div>
                  <h3>{cat.title}</h3>
                  <span className="top-dot" />
                </div>
                <div className="skill-pills">
                  {cat.skills.map((s) => (
                    <span className="skill-pill" key={s.name}>
                      <i />
                      <span>{s.name}{"note" in s && s.note ? ` — ${s.note}` : ""}</span>
                    </span>
                  ))}
                </div>
                <div className="corner-icon"><i className={cat.cornerIcon} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section id="projects">
        <div className="section-num">04</div>
        <div className="wrap">
          <p className="eyebrow reveal">Portfolio</p>
          <h2 className="reveal">My Projects <span className="accent">Highlight</span></h2>

          <div className="projects-grid">
            {projects.map((p) => (
              <article className="project-card reveal" data-hover key={p.id}>
                <div className="project-thumb">
                  <div className="dots"><span></span><span></span><span></span></div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`${p.title} preview`} className="project-img" />
                </div>
                <p className="project-tag">{p.tag}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <div className="project-links">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener"
                    className="project-link"
                    data-hover
                    onClick={handleGithubClick}
                  >
                    <GithubIcon /> GitHub
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener"
                    className="project-link project-link-accent"
                    data-hover
                    onClick={(e) => handleDemoClick(e, p.demo)}
                  >
                    <ExternalIcon /> Live Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section id="experience">
        <div className="section-num">05</div>
        <div className="wrap">
          <p className="eyebrow reveal">Experience</p>
          <h2 className="reveal">Where I&apos;ve <span className="accent">worked</span></h2>

          <div className="tl" ref={timelineRef}>
            <div className="tl-item reveal">
              <div className="tl-date">Apr 2026 — May 2026</div>
              <div>
                <h3 className="tl-role">Backend Development Intern</h3>
                <p className="tl-co">SyntecxHub</p>
                <p className="tl-desc">Built RESTful APIs and CRUD operations using Node.js, Express.js &amp; MongoDB as part of a MERN stack internship. Integrated frontend and backend with React.js and tested APIs with Postman &amp; Git/GitHub. ISO 9001:2015 certified.</p>
              </div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-date">Aug 2025 — Sep 2025</div>
              <div>
                <h3 className="tl-role">Frontend Web Development Intern</h3>
                <p className="tl-co">ApexPlanet Software Pvt. Ltd.</p>
                <p className="tl-desc">Built modular, responsive UI components (HTML, CSS, JavaScript) across sprint-based tasks, following an Agile workflow with iterative code reviews.</p>
              </div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-date">Aug 2025 — Sep 2025</div>
              <div>
                <h3 className="tl-role">Frontend Web Development Intern</h3>
                <p className="tl-co">AICTE — Edunet Foundation</p>
                <p className="tl-desc">Built responsive web pages and reusable UI components as part of an AICTE-mentored virtual internship; applied DOM manipulation and CSS Flexbox for production-grade layouts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <section id="certifications">
        <div className="section-num">06</div>
        <div className="wrap">
          <div className="divider" />
          <div className="section-head-row">
            <div>
              <div className="section-label reveal">
                <span className="label-dot" />
                My Learning Journey
              </div>
              <h2 className="reveal">Training &amp; <span className="accent">Certifications</span></h2>
              <p className="lead reveal">Courses, certifications and programs I&apos;ve completed to enhance my skills and stay up to date.</p>
            </div>
            <div className="stats reveal">
              <div className="stat">
                <span className="stat-icon"><i className="fa-solid fa-book" /></span>
                <div>
                  <strong>{CERTIFICATIONS.length}+</strong>
                  <small>Certifications</small>
                </div>
              </div>
            </div>
          </div>

          <div className="cert-grid">
            {CERTIFICATIONS.map((c) => (
              <div className={"certificate" + (c.variant ? " " + c.variant : "")} key={c.title}>
                <div className="certificate-icon">
                  <i className={c.icon} />
                </div>
                <div className="certificate-content">
                  <h3>{c.title}</h3>
                  <div className="certificate-meta"><span>{c.issuer}</span><span>{c.date}</span></div>
                </div>
                <button type="button" className="arrow" aria-label="View certificate">↗</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact">
        <div className="section-num">07</div>
        <div className="wrap">
          <div className="contact-panel reveal">
            <div className="contact-grid">
              <div>
                <p className="eyebrow">Get in touch</p>
                <h2 className="contact-headline">Let&apos;s <span className="grad">work</span><br />together</h2>
                <p className="lead">Ready to bring your vision to life? Open to internships and full-time roles — let&apos;s build intelligent, high-performance software together.</p>

                <div className="contact-info-list">
                  <div className="contact-info-row" data-hover>
                    <div className="ci-icon">@</div>
                    <div>
                      <span className="ci-label">Email</span>
                      <a className="ci-value" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </div>
                  </div>
                  <div className="contact-info-row" data-hover>
                    <div className="ci-icon">GH</div>
                    <div>
                      <span className="ci-label">GitHub</span>
                      <a className="ci-value" href={GITHUB_URL} target="_blank" rel="noopener">
                        github.com/raghvendra-coder
                      </a>
                    </div>
                  </div>
                  <div className="contact-info-row" data-hover>
                    <div className="ci-icon">in</div>
                    <div>
                      <span className="ci-label">LinkedIn</span>
                      <a className="ci-value" href={LINKEDIN_URL} target="_blank" rel="noopener">
                        linkedin.com/in/raghvendra-yadav-tech
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text" id="name" required placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email" id="email" required placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message" required placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-solid" data-hover disabled={formStatus.type === "loading"}>
                  {formStatus.type === "loading" ? "Sending..." : "Send Message →"}
                </button>
                {formStatus.type === "success" && <div className="form-status success">{formStatus.message}</div>}
                {formStatus.type === "error" && <div className="form-status error">{formStatus.message}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap footer-inner">
          <div>© 2026 Raghvendra Yadav. All rights reserved.</div>
          <div className="footer-links">
            <a href="#home" data-hover>Top</a>
            <a href="#projects" data-hover>Projects</a>
            <a href="#contact" data-hover>Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
