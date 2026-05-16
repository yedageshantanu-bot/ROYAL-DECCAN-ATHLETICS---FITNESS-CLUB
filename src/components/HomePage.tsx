"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import gsap from "gsap";
import {
  Activity,
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronUp,
  Clock,
  Dumbbell,
  Footprints,
  Map,
  MapPin,
  Medal,
  Menu,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Timer,
  Trophy,
  UsersRound,
  X,
  Zap
} from "lucide-react";
import clsx from "clsx";
import {
  academy,
  coaches,
  gallery,
  heroStats,
  images,
  navItems,
  pillars,
  pricing,
  programs,
  testimonials,
  whyChoose
} from "@/lib/data";

const iconMap = {
  Activity,
  Dumbbell,
  Footprints,
  Map,
  Medal,
  ShieldCheck,
  Timer,
  UsersRound
};

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".gsap-float", {
        y: -14,
        duration: 2.8,
        ease: "sine.inOut",
        stagger: 0.18,
        repeat: -1,
        yoyo: true
      });

      gsap.to(".gsap-sheen", {
        backgroundPosition: "220% center",
        duration: 8,
        ease: "none",
        repeat: -1
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative overflow-hidden">
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <TrainingPrograms />
      <WhyChooseUs />
      <Coaches />
      <Testimonials />
      <Gallery />
      <Schedule />
      <Fees />
      <Location />
      <Contact />
      <Footer />
      <FloatingActions />
      <BackToTop />
    </main>
  );
}

function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1050);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          data-loading-screen
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/10 bg-white/5 p-3 shadow-glow">
              <Image src="/logo.png.png" alt="Royal Deccan Athletics logo" fill sizes="96px" className="object-cover scale-110" priority />
            </div>
            <div className="h-1.5 w-44 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-royal via-gold to-royal"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.05, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[95] h-1 w-full origin-left bg-gradient-to-r from-royal via-gold to-royal"
      style={{ scaleX }}
    />
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 18);
  });

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-ink/90 shadow-2xl shadow-black/20 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="section-shell flex h-[var(--nav-height)] items-center justify-between">
        <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Royal Deccan home">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
            <Image src="/logo.png.png" alt="Royal Deccan Athletics logo" fill sizes="48px" className="object-cover scale-110" priority />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xl tracking-normal text-white sm:text-2xl">ROYAL DECCAN</span>
            <span className="block truncate text-[10px] font-bold uppercase tracking-[0.26em] text-gold">Athletics & Fitness</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:+91${academy.phone}`}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition hover:border-gold/60 hover:bg-gold hover:text-ink"
          >
            <Phone className="h-4 w-4 transition group-hover:scale-110" />
            Call Now
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white shadow-lg backdrop-blur lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-black/60" aria-label="Close menu" onClick={() => setOpen(false)} />
            <motion.aside
              className="absolute right-0 top-0 h-full w-[84vw] max-w-sm border-l border-white/10 bg-navy/95 p-5 shadow-2xl backdrop-blur-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-white">MENU</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8 grid gap-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-lg font-bold text-white transition hover:border-gold/50 hover:bg-gold hover:text-ink"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <MagneticButton href={academy.whatsapp} className="mt-7 w-full justify-center">
                Join Now <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.74], [1, 0.24]);

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden pb-12 pt-28 sm:items-center sm:py-32">
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <Image
          src={images.hero}
          alt="Indian boys sprinting during athletics training"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,38,0.56)_0%,rgba(7,19,38,0.72)_48%,#071326_100%)]" />
      <div className="absolute inset-0 sports-grid opacity-20" />
      <div className="gsap-float absolute left-5 top-28 h-28 w-28 rounded-full bg-royal/25 blur-3xl" />
      <div className="gsap-float absolute right-5 top-36 h-24 w-24 rounded-full bg-gold/20 blur-3xl sm:right-28" />
      <div className="gsap-float absolute bottom-24 left-1/3 h-20 w-20 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="section-shell relative z-10 grid items-end gap-8 lg:grid-cols-[1.05fr_0.7fr] lg:items-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.09 } } }} className="max-w-4xl">
          <motion.div
            variants={reveal}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-2 text-xs font-black uppercase tracking-[0.24em] text-gold shadow-gold"
          >
            <Sparkles className="h-4 w-4" />
            Kolhapur Elite Training Ground
          </motion.div>
          <motion.h1
            variants={reveal}
            className="hero-title text-balance font-display leading-[0.82] tracking-normal text-white"
          >
            BUILD STRENGTH. SPEED. DISCIPLINE.
          </motion.h1>
          <motion.p variants={reveal} className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-white/80 sm:text-xl sm:leading-8">
            Professional athletics and fitness training for children and teens aged 6-18, built around discipline, confidence,
            outdoor ground work and real physical progress.
          </motion.p>
          <motion.div variants={reveal} className="mt-7 flex gap-3">
            <MagneticButton href={academy.whatsapp} className="flex-1 px-4 text-xs sm:flex-none sm:px-6 sm:text-sm">
              Join Now <ArrowRight className="h-5 w-5" />
            </MagneticButton>
            <MagneticButton href="#gallery" variant="ghost" className="flex-1 px-4 text-xs sm:flex-none sm:px-6 sm:text-sm">
              <Play className="h-5 w-5 fill-current" /> Watch Training
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75 }}
          className="glass-panel premium-border rounded-[2rem] p-4"
        >
          <div className="grid grid-cols-2 gap-3">
            {heroStats.map((stat, index) => (
              <CounterCard key={stat.label} {...stat} delay={index * 0.08} />
            ))}
          </div>
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold text-ink">
                <Trophy className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-6 text-white/80">
                Training for athletics, police preparation, army preparation and lifetime fitness discipline.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CounterCard({
  value,
  suffix,
  label,
  delay = 0
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - start);
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [delay, inView, value]);

  return (
    <div ref={ref} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 transition hover:border-gold/40 hover:bg-white/[0.1]">
      <div className="font-display text-4xl leading-none text-white sm:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/60">{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <SectionGlow />
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal className="order-2 grid grid-cols-2 gap-4 lg:order-1">
          <ImageCard src={images.girls} alt="Girls warming up before athletics training" className="h-72" label="Confidence" />
          <ImageCard src={images.stretching} alt="Athletes doing mobility drills" className="mt-10 h-72" label="Mobility" />
          <div className="col-span-2 rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-royal text-white shadow-glow">
                <Zap className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-6 text-white/70">
                Early strength, better posture, sharper discipline and a mindset that carries into school, sport and life.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="About Royal Deccan"
            title="Fitness is not only for sport. It is a life skill."
            text="Children who learn movement, courage and discipline early carry those habits everywhere. At Royal Deccan Athletics & Fitness Club, students train with purpose: stronger bodies, sharper focus and the confidence to face police, army, sports and everyday fitness goals."
          />
          <Reveal delay={0.1}>
            <div className="mt-7 grid gap-4 text-white/70">
              <p className="leading-8">
                Our coaching blends professional guidance with a grounded, friendly environment. Every batch is designed for the
                6-18 age group, so young athletes learn safely while still being challenged to improve.
              </p>
              <p className="leading-8">
                For students dreaming of police, army or competitive athletics, fitness cannot wait until the exam form arrives.
                Discipline, stamina, strength, flexibility and confidence are built session by session.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.18} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Speed", "Strength", "Stamina", "Discipline"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gold" />
                <div className="text-sm font-black uppercase tracking-[0.16em] text-white">{item}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TrainingPrograms() {
  return (
    <section id="training" className="relative py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Training Programs"
          title="Built for speed, strength and real-world preparation."
          text="Every program is structured to create athletic movement, discipline and measurable progress without making training feel mechanical."
          centered
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <ProgramCard key={program.title} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program, index }: { program: (typeof programs)[number]; index: number }) {
  const Icon = iconMap[program.icon as keyof typeof iconMap] ?? Activity;

  return (
    <Reveal delay={index * 0.035}>
      <motion.article
        whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group h-full rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/10 backdrop-blur transition hover:border-royal/60 hover:bg-white/[0.075] hover:shadow-glow"
      >
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-royal/20 text-gold ring-1 ring-white/10 transition group-hover:bg-gold group-hover:text-ink">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-black text-white">{program.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/60">{program.description}</p>
      </motion.article>
    </Reveal>
  );
}

function WhyChooseUs() {
  return (
    <section id="programs" className="relative py-20 sm:py-28">
      <SectionGlow gold />
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Premium coaching with a grounded Kolhapur work ethic."
            text="Students need more than random drills. They need a coach who knows when to push, when to correct technique and how to keep confidence alive."
          />
          <Reveal className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Experienced Coaches",
              "Friendly Environment",
              "Discipline Focus",
              "Scientific Training",
              "Fitness + Confidence",
              "Outdoor Ground Training",
              "Age Specific Coaching",
              "Focus on Real Results"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-white/80">{item}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="glass-panel rounded-[2rem] p-5 sm:p-7">
          <div className="grid gap-6">
            {whyChoose.map((item, index) => (
              <ProgressBar key={item.label} item={item} delay={index * 0.12} />
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {pillars.map((pillar) => (
              <div key={pillar} className="rounded-3xl border border-white/10 bg-ink/30 p-4">
                <Star className="mb-3 h-5 w-5 fill-gold text-gold" />
                <div className="text-sm font-black uppercase tracking-[0.12em] text-white/75">{pillar}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProgressBar({ item, delay }: { item: (typeof whyChoose)[number]; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-white">{item.label}</span>
        <span className="font-display text-2xl text-gold">{item.value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-royal to-gold"
          initial={{ width: 0 }}
          animate={inView ? { width: `${item.value}%` } : { width: 0 }}
          transition={{ delay, duration: 0.85, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function Coaches() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Coaches"
          title="Strong guidance. Sharp standards. Human connection."
          text="The coaches set the tone: disciplined enough for results, encouraging enough for young students to keep showing up."
          centered
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {coaches.map((coach, index) => (
            <Reveal key={coach.name} delay={index * 0.12}>
              <motion.article
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-2xl shadow-black/20 transition hover:border-gold/40"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image src={coach.image} alt={`${coach.name} coaching placeholder`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <div className="inline-flex rounded-full bg-gold px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-ink">
                      Coach
                    </div>
                    <h3 className="mt-3 font-display text-4xl text-white">{coach.name}</h3>
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold">{coach.role}</p>
                  <p className="mt-4 leading-7 text-white/70">{coach.description}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 4700);
    return () => window.clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="What Parents & Students Say"
          title="Stories that sound like progress."
          text="No inflated review counts. Just realistic words from the families and students this academy is built to serve."
          centered
        />

        <Reveal className="mx-auto mt-12 max-w-4xl">
          <div className="glass-panel overflow-hidden rounded-[2rem] p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.author}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) setIndex((index + 1) % testimonials.length);
                  if (info.offset.x > 70) setIndex((index - 1 + testimonials.length) % testimonials.length);
                }}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.35 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-6 text-balance text-2xl font-black leading-tight text-white sm:text-4xl">
                  “{current.quote}”
                </blockquote>
                <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-white/50">{current.author}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((item, dotIndex) => (
                <button
                  key={item.author}
                  type="button"
                  aria-label={`Show testimonial ${dotIndex + 1}`}
                  onClick={() => setIndex(dotIndex)}
                  className={clsx("h-2.5 rounded-full transition-all", dotIndex === index ? "w-9 bg-gold" : "w-2.5 bg-white/20")}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Gallery"
          title="Training energy you can feel before you arrive."
          text="A cinematic look at sprint work, track sessions, kids fitness, stretching and outdoor conditioning."
          centered
        />
        <div className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-6 sm:overflow-visible sm:pb-0">
          {gallery.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 0.04}
              className={clsx(
                "min-w-[78%] snap-center sm:min-w-0",
                index === 0 || index === 5 ? "sm:col-span-3" : "sm:col-span-2",
                index === 1 || index === 6 ? "sm:col-span-3" : ""
              )}
            >
              <motion.figure
                whileHover={{ y: -6 }}
                className={clsx(
                  "group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]",
                  index === 0 || index === 5 ? "h-80" : "h-72"
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 78vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-90" />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-white backdrop-blur">
                  {item.label}
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="relative py-20 sm:py-28">
      <SectionGlow />
      <div className="section-shell">
        <SectionHeading
          eyebrow="Daily Schedule"
          title="Two focused batches. One serious training culture."
          text="Morning and evening sessions make it easier for students to stay consistent around school, studies and exam preparation."
          centered
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { title: "Morning Batch", time: "6:00 AM - 8:30 AM", icon: Clock },
            { title: "Evening Batch", time: "5:00 PM - 7:00 PM", icon: CalendarDays },
            { title: "Age Group", time: "6-18 Years", icon: UsersRound }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="premium-border rounded-[2rem] bg-white/[0.045] p-6 shadow-2xl shadow-black/20 transition hover:bg-white/[0.075] hover:shadow-glow">
                  <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-ink shadow-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 font-display text-4xl text-gold">{item.time}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Fees() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Fees"
          title="Simple placeholder plans for now."
          text="Pricing can be adjusted later. The design is ready for real academy plan details, admissions notes and offers."
          centered
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.1}>
              <motion.article
                whileHover={{ y: -10 }}
                className={clsx(
                  "h-full rounded-[2rem] border p-6 transition",
                  index === 1
                    ? "border-gold/60 bg-gold text-ink shadow-gold"
                    : "border-white/10 bg-white/[0.045] text-white hover:border-royal/60 hover:shadow-glow"
                )}
              >
                <p className={clsx("text-sm font-black uppercase tracking-[0.2em]", index === 1 ? "text-ink/70" : "text-gold")}>{plan.note}</p>
                <h3 className="mt-4 text-2xl font-black">{plan.name}</h3>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-display text-6xl leading-none">{plan.price}</span>
                  <span className="pb-2 text-sm font-bold opacity-70">/month</span>
                </div>
                <div className={clsx("my-6 h-px", index === 1 ? "bg-ink/20" : "bg-white/10")} />
                <ul className="grid gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-semibold">
                      <Check className="h-5 w-5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={academy.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={clsx(
                    "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.12em] transition",
                    index === 1
                      ? "bg-ink text-white hover:bg-ink/85"
                      : "bg-gold text-ink hover:shadow-gold"
                  )}
                >
                  Join Now
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Location"
            title="Train at Shivaji University Athletics Track, Kolhapur."
            text="A proper outdoor track and ground environment for students who need real running space, conditioning and disciplined batch training."
          />
          <Reveal className="mt-7 flex items-start gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-gold" />
            <p className="leading-7 text-white/75">{academy.address}</p>
          </Reveal>
        </div>
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30">
            <iframe
              title="Royal Deccan Athletics & Fitness Club Kolhapur map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8582176592777!2d74.2467911751085!3d16.683976922687798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc101e0fbee3d09%3A0xe0dd65f8b5e33bb7!2sROYAL%20DECCAN%20ATHLETICS%20%26%20FITNESS%20CLUB%20KOLHAPUR!5e0!3m2!1sen!2sin!4v1778923917696!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-20 pb-32 sm:py-28">
      <SectionGlow gold />
      <div className="section-shell">
        <div className="premium-border overflow-hidden rounded-[2.25rem] bg-navy/[0.64] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold">Contact</p>
              <h2 className="font-display text-[clamp(3.5rem,12vw,7.5rem)] leading-[0.85] text-white">
                READY TO TRAIN?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                Speak with the academy team, ask about batches, or visit the track to understand the right program for your child.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <MagneticButton href={`tel:+91${academy.phone}`}>
                  <Phone className="h-5 w-5" /> Call {academy.phone}
                </MagneticButton>
                <MagneticButton href={academy.whatsapp} variant="ghost">
                  WhatsApp <ArrowRight className="h-5 w-5" />
                </MagneticButton>
              </div>
            </div>
            <div className="grid gap-4">
              <ContactRow icon={<Phone className="h-5 w-5" />} title="Phone" text={academy.phone} href={`tel:+91${academy.phone}`} />
              <ContactRow icon={<MapPin className="h-5 w-5" />} title="Location" text={academy.address} />
              <a
                href={academy.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-gold/50 hover:bg-white/[0.04]"
              >
                <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl p-0.5 bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]">
                  <span className="flex h-full w-full items-center justify-center rounded-[0.7rem] bg-transparent">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.2" />
                      <circle cx="12" cy="12" r="3" fill="white" />
                      <circle cx="17.5" cy="6.5" r="0.9" fill="white" />
                    </svg>
                  </span>
                </span>
                <span>
                  <span className="block text-xs font-black uppercase tracking-[0.18em] text-gold">Instagram</span>
                  <span className="mt-1 block font-semibold text-white/75">@deccansportsclub</span>
                </span>
                <ArrowRight className="ml-auto h-5 w-5 text-white/40" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const quickLinks = ["Home", "About", "Training", "Gallery", "Contact"];

  return (
    <footer className="border-t border-white/10 bg-[#050b16] pb-28 pt-12 sm:pb-10">
      <div className="section-shell grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <Image src="/logo.png.png" alt="Royal Deccan Athletics logo" fill sizes="56px" className="object-cover scale-110" />
            </span>
            <div>
              <div className="font-display text-3xl text-white">ROYAL DECCAN</div>
              <div className="text-xs font-black uppercase tracking-[0.22em] text-gold">Athletics & Fitness Club</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-white/60">
            Premium athletics, fitness and physical preparation coaching for students aged 6-18 in Kolhapur.
          </p>
        </div>
        <FooterColumn title="Quick Links" items={quickLinks.map((link) => ({ label: link, href: `#${link.toLowerCase()}` }))} />
        <FooterColumn
          title="Training Programs"
          items={["Sprint Training", "Athletics Coaching", "Police Physical Prep", "Kids Fitness"].map((label) => ({
            label,
            href: "#training"
          }))}
        />
        <div>
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-white">Contact</h3>
          <div className="grid gap-3 text-sm font-semibold text-white/60">
            <a href={`tel:+91${academy.phone}`} className="hover:text-gold">
              +91 {academy.phone}
            </a>
            <a href={academy.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">
              Instagram
            </a>
            <span>{academy.location}, Maharashtra</span>
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-white/10 pt-5 text-sm text-white/40">
        Copyright © {new Date().getFullYear()} Royal Deccan Athletics & Fitness Club. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-white">{title}</h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <a key={item.label} href={item.href} className="text-sm font-semibold text-white/60 transition hover:text-gold">
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function FloatingActions() {
  const [showMobile, setShowMobile] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowMobile(latest > 360);
  });

  return (
    <>
      <a
        href={academy.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-4 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-[#25D366]/60 bg-ink shadow-2xl shadow-[#25D366]/30 transition hover:scale-105 sm:inline-flex"
      >
        <span className="relative h-8 w-8">
          <Image src="/WhatsApp_Logo.svg.png" alt="WhatsApp" fill sizes="32px" className="object-contain" />
        </span>
      </a>
      <AnimatePresence>
        {showMobile ? (
          <>
            <motion.a
              href={academy.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#25D366]/60 bg-ink shadow-2xl shadow-[#25D366]/30 sm:hidden"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
            >
              <span className="relative h-8 w-8">
                <Image src="/WhatsApp_Logo.svg.png" alt="WhatsApp" fill sizes="32px" className="object-contain" />
              </span>
            </motion.a>
            <motion.div
              className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-3 rounded-[1.5rem] border border-white/10 bg-ink/90 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl sm:hidden"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
            >
              <a href={`tel:+91${academy.phone}`} className="flex items-center justify-center gap-2 rounded-2xl bg-gold py-3 text-sm font-black text-ink">
                <Phone className="h-4 w-4" />
                Call
              </a>
              <a
                href={academy.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-royal py-3 text-sm font-black text-white"
              >
                Join Now
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShow(latest > 560);
  });

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 left-4 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-2xl backdrop-blur transition hover:bg-gold hover:text-ink sm:inline-flex"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false
}: {
  eyebrow: string;
  title: string;
  text: string;
  centered?: boolean;
}) {
  return (
    <Reveal className={clsx(centered && "mx-auto max-w-3xl text-center")}>
      <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
      <h2 className="text-balance font-display text-[clamp(3rem,10vw,6.5rem)] leading-[0.88] text-white">{title}</h2>
      <p className={clsx("mt-5 text-base leading-8 text-white/70 sm:text-lg", centered && "mx-auto max-w-2xl")}>{text}</p>
    </Reveal>
  );
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={reveal}
      transition={{ duration: 0.58, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  href,
  children,
  variant = "solid",
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18 });
  const springY = useSpring(y, { stiffness: 240, damping: 18 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect || window.matchMedia("(pointer: coarse)").matches) return;
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={clsx(
        "gsap-sheen inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black uppercase tracking-[0.14em] transition will-change-transform",
        variant === "solid"
          ? "bg-[linear-gradient(110deg,#FFB400,#ffe2a1,#114BFF,#FFB400)] bg-[length:220%_100%] text-ink shadow-gold hover:shadow-glow"
          : "border border-white/10 bg-white/[0.08] text-white backdrop-blur hover:border-gold/60 hover:bg-white/[0.14]",
        className
      )}
    >
      {children}
    </motion.a>
  );
}

function ImageCard({ src, alt, label, className }: { src: string; alt: string; label: string; className: string }) {
  return (
    <motion.figure whileHover={{ y: -8 }} className={clsx("group relative overflow-hidden rounded-[2rem] border border-white/10", className)}>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">
        {label}
      </figcaption>
    </motion.figure>
  );
}

function ContactRow({
  icon,
  title,
  text,
  href
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-royal/20 text-gold">{icon}</span>
      <span>
        <span className="block text-xs font-black uppercase tracking-[0.18em] text-gold">{title}</span>
        <span className="mt-1 block font-semibold leading-6 text-white/75">{text}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-gold/50 hover:bg-white/[0.09]">
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-4">{content}</div>;
}

function SectionGlow({ gold = false }: { gold?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-80 -translate-y-1/2 blur-3xl",
        gold ? "bg-[radial-gradient(circle,rgba(255,180,0,0.12),transparent_62%)]" : "bg-[radial-gradient(circle,rgba(17,75,255,0.14),transparent_62%)]"
      )}
    />
  );
}
