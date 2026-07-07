import { useState } from "react";

type Entry = {
  id: string;
  category: "Essay" | "Field notes" | "Interview" | "Studio diary";
  title: string;
  excerpt: string;
  date: string;
  read: string;
  image: string;
  author: string;
};

const entries: Entry[] = [
  {
    id: "j-01",
    category: "Essay",
    title: "On color, and why we stopped fearing the loud ones.",
    excerpt:
      "A short, opinionated meditation on the year we threw out the gray palettes and started designing in the colors of fruit, sunsets and warning signs.",
    date: "May 18, 2026",
    read: "6 min",
    author: "Luca Marín",
    image:
      "https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "j-02",
    category: "Field notes",
    title: "Three days, four cafés and the rebrand we sketched on napkins.",
    excerpt:
      "Notes from a working trip to Mexico City — what happens when you take the laptops away and let the work happen between conversations.",
    date: "Apr 02, 2026",
    read: "4 min",
    author: "Mira Okafor",
    image:
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "j-03",
    category: "Interview",
    title: "Tea, type, and ten years of slow practice with Yui Tanabe.",
    excerpt:
      "Our type lead on how a childhood in Kyoto shaped her relationship with white space, and why she still draws every letterform by hand first.",
    date: "Mar 12, 2026",
    read: "9 min",
    author: "Studio",
    image:
      "https://images.pexels.com/photos/1235706/pexels-photo-1235706.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "j-04",
    category: "Studio diary",
    title: "What we shipped in May (and the one thing we killed).",
    excerpt:
      "A monthly round-up — three launches, two pitches, one tough creative decision we're still feeling good about.",
    date: "Jun 01, 2026",
    read: "3 min",
    author: "Soren Helm",
    image:
      "https://images.pexels.com/photos/1496192/pexels-photo-1496192.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const filters: Array<Entry["category"] | "All"> = [
  "All",
  "Essay",
  "Field notes",
  "Interview",
  "Studio diary",
];

export default function Blog() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = filter === "All" ? entries : entries.filter((e) => e.category === filter);
  const [feature, ...rest] = filtered;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section
      id="blog"
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative warm blob */}
      <div className="absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-[#FF6B3D]/20 blur-3xl pointer-events-none"></div>

      <div className="relative px-6 md:px-10 lg:px-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B3D] animate-pulse"></span>
              <span className="text-[11px] font-mono-tech tracking-[0.18em] text-white/60 uppercase">
                The journal · issue 12
              </span>
            </div>
            <h2 className="font-serif-display text-[44px] md:text-[64px] lg:text-[76px] leading-[0.98] tracking-[-0.03em] text-balance">
              Long-form notes
              <br />
              <span className="italic text-white/55">from the studio floor.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/65">
              Essays, interviews and studio diaries — written by the people who do
              the work, not the people who write about it.
            </p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[12px] font-medium rounded-full transition-all whitespace-nowrap border ${
                filter === f
                  ? "bg-white text-neutral-900 border-white"
                  : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10 hover:border-white/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Layout: featured + list */}
        {feature && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7">
            {/* Featured */}
            <a
              href={`#${feature.id}`}
              className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B3D]"></span>
                  <span className="text-[10.5px] font-mono-tech tracking-wider text-white/90 uppercase">
                    Featured · {feature.category}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-center gap-3 text-[11px] font-mono-tech tracking-wider text-white/55 uppercase">
                  <span>{feature.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30"></span>
                  <span>{feature.read} read</span>
                  <span className="w-1 h-1 rounded-full bg-white/30"></span>
                  <span>By {feature.author}</span>
                </div>
                <h3 className="mt-3 font-serif-display text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.02em]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[14px] md:text-[15px] leading-[1.65] text-white/65 max-w-xl">
                  {feature.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white border-b border-white/30 group-hover:border-white pb-0.5 transition-colors whitespace-nowrap">
                  Read the essay
                  <i className="ri-arrow-right-up-line text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                </span>
              </div>
            </a>

            {/* Right column */}
            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-5">
              {rest.map((e) => (
                <a
                  key={e.id}
                  href={`#${e.id}`}
                  className="group grid grid-cols-[112px_1fr] sm:grid-cols-[140px_1fr] gap-4 p-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all"
                >
                  <div className="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      draggable={false}
                    />
                  </div>
                  <div className="flex flex-col py-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10.5px] font-mono-tech tracking-wider text-white/55 uppercase">
                      <span>{e.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30"></span>
                      <span>{e.read}</span>
                    </div>
                    <h4 className="mt-1.5 font-serif-display text-[18px] sm:text-[20px] leading-snug tracking-[-0.01em] text-white group-hover:text-white">
                      {e.title}
                    </h4>
                    <span className="mt-auto text-[11px] text-white/45">
                      {e.date} · By {e.author}
                    </span>
                  </div>
                </a>
              ))}

              {filtered.length === 1 && (
                <div className="flex items-center justify-center text-center text-[13px] text-white/50 py-6 px-4 border border-dashed border-white/15 rounded-2xl">
                  No more entries in this category yet — check back soon.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Newsletter strip */}
        <div className="mt-16 md:mt-24 relative rounded-2xl overflow-hidden border border-white/10">
          <img
            src="https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Warm cream paper background"
            className="absolute inset-0 w-full h-full object-cover object-center"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30"></div>
          <div className="relative p-7 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-md">
              <div className="text-[11px] font-mono-tech tracking-[0.18em] text-white/65 uppercase mb-3">
                The dispatch · Monthly
              </div>
              <h3 className="font-serif-display text-[28px] md:text-[36px] leading-tight tracking-[-0.02em]">
                One quiet email a month.
                <span className="italic text-white/55"> No noise.</span>
              </h3>
              <p className="mt-2 text-[13px] md:text-[14px] text-white/70 leading-relaxed">
                The best long-read from the journal, plus one tiny thing we're
                obsessed with that month.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto md:min-w-[420px]"
            >
              <div className="flex-1 flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-5 pr-1.5 py-1.5">
                <i className="ri-mail-line text-white/55 text-base mr-2"></i>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="flex-1 bg-transparent text-[14px] text-white placeholder-white/45 outline-none py-1.5"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-white/90 text-neutral-900 text-[13px] font-medium px-4 py-2 rounded-full transition-colors whitespace-nowrap"
                >
                  Subscribe
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
              <div className="text-[11px] text-white/50 sm:ml-2 whitespace-nowrap">
                {subscribed ? (
                  <span className="text-emerald-400">
                    <i className="ri-check-line mr-1"></i>You're in.
                  </span>
                ) : (
                  <>2.4k readers · No spam.</>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}