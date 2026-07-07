import { useState } from "react";

const steps = [
  {
    no: "01",
    title: "Listen",
    week: "Week 1 — 2",
    summary:
      "We start in your world. Long conversations, your team, your customers, your competitors. No briefs ping-ponged over email.",
    deliverables: ["Discovery workshop", "Audience interviews", "Brand audit", "Strategy memo"],
    icon: "ri-mic-line",
    accent: "#C7402E",
    image:
      "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    no: "02",
    title: "Frame",
    week: "Week 3 — 4",
    summary:
      "From the noise we draw a clear strategic line — a positioning, a voice, a creative platform sharp enough to build on.",
    deliverables: ["Positioning", "Brand voice", "Naming if needed", "Creative platform"],
    icon: "ri-compasses-2-line",
    accent: "#FF6B3D",
    image:
      "https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    no: "03",
    title: "Make",
    week: "Week 5 — 9",
    summary:
      "Studio time. Heads down. We design, animate, code, prototype — together with you, in shared files, weekly check-ins, no surprises.",
    deliverables: ["Identity system", "Motion direction", "Web & product", "Editorial assets"],
    icon: "ri-shape-line",
    accent: "#D9A86C",
    image:
      "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    no: "04",
    title: "Launch",
    week: "Week 10 — 12",
    summary:
      "We don't disappear at handover. We help you launch, train your team, write the documentation, and stay close for the first 90 days.",
    deliverables: ["Brand guidelines", "Launch campaign", "Team training", "90-day support"],
    icon: "ri-rocket-2-line",
    accent: "#7CC4D9",
    image:
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="process"
      className="relative bg-[#fafafa] text-neutral-900 py-24 md:py-32 overflow-hidden"
    >
      <div className="px-6 md:px-10 lg:px-14">
        {/* Eyebrow + headline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>
              <span className="text-[11px] font-mono-tech tracking-[0.18em] text-neutral-500 uppercase">
                The process · A 12-week arc
              </span>
            </div>
            <h2 className="font-serif-display text-[44px] md:text-[64px] lg:text-[76px] leading-[0.98] tracking-[-0.03em] text-balance">
              Slow craft,
              <br />
              <span className="italic text-neutral-400">on a fast clock.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-neutral-600">
              Every engagement follows the same four-act rhythm — soft on the
              outside, ruthless on the timeline. Tap a step to see what happens
              inside.
            </p>
          </div>
        </div>

        {/* Process layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7">
          {/* Step list */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.no}
                  onClick={() => setActive(i)}
                  className={`group text-left rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isActive
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-900 border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex items-center gap-5 px-5 md:px-7 py-5">
                    <div
                      className={`font-serif-display text-[36px] md:text-[44px] leading-none transition-colors ${
                        isActive ? "text-white" : "text-neutral-300"
                      }`}
                    >
                      {s.no}
                    </div>
                    <div
                      className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors ${
                        isActive ? "bg-white/10" : "bg-neutral-100"
                      }`}
                      style={isActive ? { backgroundColor: s.accent } : {}}
                    >
                      <i className={`${s.icon} text-lg ${isActive ? "text-white" : "text-neutral-700"}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-serif-display text-[24px] md:text-[28px] leading-none">
                          {s.title}
                        </h3>
                        <span
                          className={`text-[11px] font-mono-tech tracking-wider uppercase whitespace-nowrap ${
                            isActive ? "text-white/60" : "text-neutral-400"
                          }`}
                        >
                          {s.week}
                        </span>
                      </div>
                    </div>
                    <i
                      className={`ri-arrow-down-s-line text-xl transition-transform ${
                        isActive ? "rotate-180 text-white" : "text-neutral-400 group-hover:text-neutral-700"
                      }`}
                    ></i>
                  </div>

                  {/* Expandable detail */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-7 pb-6 -mt-1">
                        <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/75 max-w-xl">
                          {s.summary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {s.deliverables.map((d) => (
                            <span
                              key={d}
                              className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech tracking-wider uppercase bg-white/10 border border-white/15 text-white/85 px-3 py-1 rounded-full"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: s.accent }}
                              ></span>
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Image preview synced with active step */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl overflow-hidden bg-neutral-900 aspect-[4/5] lg:aspect-auto lg:h-[560px] relative">
              {steps.map((s, i) => (
                <img
                  key={s.no}
                  src={s.image}
                  alt={s.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                    i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                  draggable={false}
                />
              ))}
              {/* Overlay info */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-mono-tech tracking-wider text-white/65 uppercase">
                      Step · {steps[active].no} / 04
                    </div>
                    <div className="mt-1 font-serif-display text-[26px] md:text-[30px] text-white leading-tight">
                      {steps[active].title}
                    </div>
                  </div>
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 backdrop-blur-md"
                    style={{ backgroundColor: `${steps[active].accent}33` }}
                  >
                    <i className={`${steps[active].icon} text-lg text-white`}></i>
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="absolute top-5 left-5 right-5 flex gap-1.5">
                {steps.map((s, i) => (
                  <span
                    key={s.no}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      i <= active ? "bg-white" : "bg-white/25"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}