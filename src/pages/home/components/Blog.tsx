import { useState } from "react";

type Entry = {
  id: string;
  category: "Código/Dev" | "Web Design" | "SEO Técnico" | "Caso de Estudo" | "Opinião";
  title: string;
  excerpt: string;
  date: string;
  read: string;
  image: string;
};

const entries: Entry[] = [
  {
    id: "b-01",
    category: "Caso de Estudo",
    title: "Como construí um site de restaurante em 2 semanas — e o que aprendi.",
    excerpt: "Os bastidores do desenvolvimento ágil, as decisões técnicas do código e a importância de interfaces diretas para a conversão de reservas locais.",
    date: "Jul 2026",
    read: "5 min",
    image: "https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "b-02",
    category: "SEO Técnico",
    title: "SEO básico para pequenas empresas: o que realmente importa.",
    excerpt: "Esquece as táticas complexas das agências. Aqui está como estruturar o código HTML e a velocidade de carregamento para ser encontrado de qualquer lugar do mundo.",
    date: "Jun 2026",
    read: "8 min",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "b-03",
    category: "Opinião",
    title: "Porque é que a maioria dos sites falham logo no primeiro scroll.",
    excerpt: "Uma análise honesta sobre a sobrecarga de informação, templates idênticos e a falta de foco nas necessidades reais do utilizador autónomo.",
    date: "Mai 2026",
    read: "3 min",
    image: "https://images.pexels.com/photos/1235706/pexels-photo-1235706.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const filters = ["Todos", "Código/Dev", "Web Design", "SEO Técnico", "Caso de Estudo", "Opinião"];

export default function Journal() {
  const [filter, setFilter] = useState("Todos");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = filter === "Todos" ? entries : entries.filter((e) => e.category === filter);
  const [feature, ...rest] = filtered;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section id="blog" className="relative bg-[#0F0E1A] text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-[#534AB7]/10 blur-3xl pointer-events-none"></div>

      <div className="relative px-6 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#02C39A]"></span>
              <span className="text-[11px] font-mono tracking-[0.18em] text-white/60 uppercase">
                • O BLOG · NOTAS DO DIGITAL
              </span>
            </div>
            <h2 className="font-serif text-[44px] md:text-[64px] lg:text-[76px] leading-[0.98] tracking-[-0.03em] text-balance">
              Notas diretas<br />
              <span className="italic text-white/55">do trabalho real.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[14px] md:text-[15px] leading-[1.65] text-white/65">
              Reflexões, tutoriais e diários de projeto — escritos por quem faz o trabalho, não por quem escreve sobre ele.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[12px] font-medium rounded-full transition-all border ${
                filter === f ? "bg-white text-neutral-900 border-white" : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {feature ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            <a href={`#${feature.id}`} className="lg:col-span-7 group block rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase text-[#02C39A]">
                  Destaque · {feature.category}
                </div>
              </div>
              <div className="p-6">
                <div className="text-[11px] font-mono text-white/50 uppercase">{feature.date} · {feature.read} de leitura</div>
                <h3 className="mt-2 font-serif text-[26px] md:text-[32px] leading-tight group-hover:text-[#02C39A] transition-colors">{feature.title}</h3>
                <p className="mt-2 text-[14px] text-white/65 leading-relaxed">{feature.excerpt}</p>
              </div>
            </a>

            <div className="lg:col-span-5 flex flex-col gap-4">
              {rest.map((e) => (
                <a key={e.id} href={`#${e.id}`} className="group grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-4 p-3 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <div className="relative rounded-xl overflow-hidden h-24 bg-neutral-800">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <div className="text-[10px] font-mono text-[#02C39A] uppercase">{e.category} · {e.read}</div>
                    <h4 className="mt-1 font-serif text-[16px] sm:text-[18px] leading-snug group-hover:text-[#02C39A] transition-colors line-clamp-2">{e.title}</h4>
                    <span className="text-[11px] text-white/40 mt-1">{e.date}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-white/40 py-12 border border-dashed border-white/10 rounded-2xl">Sem notas publicadas nesta categoria.</div>
        )}
      </div>
    </section>
  );
}