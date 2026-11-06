import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  MapPin,
  Instagram,
  Clock,
  Search,
  Flame,
  Snowflake,
  ShieldCheck,
  Eye,
  X,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoImg from "@/assets/logo.png";
import fundoImg from "@/assets/fundo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adega do Chefe — Cardápio Digital" },
      {
        name: "description",
        content:
          "Consulte o catálogo de bebidas, destilados, combos e cervejas da Adega do Chefe. Produtos 100% originais e atendimento no balcão.",
      },
      { property: "og:title", content: "Adega do Chefe — Cardápio Digital" },
      {
        property: "og:description",
        content:
          "Consulte preços e disponibilidade de bebidas e combos da Adega do Chefe.",
      },
      { property: "og:image", content: "/logo.png" },
      { name: "theme-color", content: "#09090b" },
    ],
  }),
  component: Index,
});

const INSTAGRAM = "https://www.instagram.com/adega_docheff";
const ADDRESS = "Rua Principal da Adega, São Paulo - SP";

type Product = {
  id: string;
  name: string;
  desc: string;
  price: string;
  cat: string;
  image: string;
  volume: string;
  badge?: string;
  alcohol?: string;
  serving?: string;
  promo?: boolean;
};

const PRODUCTS: Product[] = [
  // COMBOS & COPÕES
  {
    id: "combo-jack",
    name: "Combo Jack Daniel's Tennessee",
    desc: "1 Garrafa Jack Daniel's 1L + 4 Red Bull Tradicionais 250ml + 1 Gelo de Coco especial + 4 Copões 700ml.",
    price: "R$ 199,90",
    cat: "Combos",
    volume: "1L + 4 Latas",
    image:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80",
    badge: "Mais Pedido",
    alcohol: "40% Vol.",
    serving: "Servir com gelo de coco e Red Bull no copão de 700ml",
    promo: true,
  },
  {
    id: "combo-red-label",
    name: "Combo Whisky Red Label",
    desc: "1 Garrafa Johnnie Walker Red Label 1L + 4 Energéticos Baly Tropical 473ml + 1 Gelo de Coco.",
    price: "R$ 149,90",
    cat: "Combos",
    volume: "1L + 4 Latas",
    image:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80",
    badge: "Destaque",
    alcohol: "40% Vol.",
    serving: "Ideal para resenha com amigos",
    promo: true,
  },
  {
    id: "copao-do-chefe",
    name: "Copão do Chefe 700ml",
    desc: "Whisky Cavalo Branco + Energético Tropical + Gelo de Melancia com Maracujá preparado na hora.",
    price: "R$ 25,00",
    cat: "Combos",
    volume: "700ml",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    badge: "Exclusivo",
    alcohol: "Mix Alcoólico",
    serving: "Servido montado e trincando de gelado",
    promo: true,
  },
  {
    id: "combo-tanqueray",
    name: "Kit Gin Tanqueray London Dry",
    desc: "1 Garrafa Tanqueray 750ml + 4 Latas Schweppes Tônica + Especiarias aromáticas (Zimbro e Hibisco).",
    price: "R$ 169,90",
    cat: "Combos",
    volume: "750ml + Tônicas",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    badge: "Premium",
    alcohol: "47.3% Vol.",
    serving: "Sirva em taça de gin com gelo e fatia de limão taiti",
  },
  {
    id: "combo-absolut",
    name: "Combo Vodka Absolut",
    desc: "1 Garrafa Absolut 1L + 4 Monster Mango Loco 473ml + 2 Gelos de Morango especiais.",
    price: "R$ 159,90",
    cat: "Combos",
    volume: "1L + 4 Latas",
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80",
    badge: "Tropical",
    alcohol: "40% Vol.",
    serving: "Combinação frutada e refrescante",
  },
  {
    id: "copao-gin-tropical",
    name: "Copão de Gin Tropical 700ml",
    desc: "Gin London Dry + Energético Tropical Baly + Gelo de Morango + Rodela de Limão Taiti.",
    price: "R$ 22,00",
    cat: "Combos",
    volume: "700ml",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    badge: "Refrescante",
    alcohol: "Mix Alcoólico",
    serving: "Preparado no balcão com guarnição",
  },

  // CERVEJAS
  {
    id: "heineken-longneck",
    name: "Heineken Long Neck 330ml",
    desc: "Cerveja puro malte verde icônica, servida trincando a -4°C na nossa câmara fria.",
    price: "R$ 11,99",
    cat: "Cervejas",
    volume: "330ml",
    image:
      "https://images.unsplash.com/photo-1618886614638-80e3c153d31a?auto=format&fit=crop&w=800&q=80",
    badge: "-4°C",
    alcohol: "5.0% Vol.",
    serving: "Temperatura ideal: -4°C a -2°C",
    promo: true,
  },
  {
    id: "corona-extra",
    name: "Corona Extra 330ml",
    desc: "Autêntica cerveja mexicana clara e ultra refrescante, servida acompanhada de fatia de limão.",
    price: "R$ 12,50",
    cat: "Cervejas",
    volume: "330ml",
    image:
      "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80",
    badge: "Com Limão",
    alcohol: "4.5% Vol.",
    serving: "Consumir com a fatia de limão no gargalo",
  },
  {
    id: "budweiser-longneck",
    name: "Budweiser Long Neck 330ml",
    desc: "A King of Beers. Cerveja lager maturada com madeira de faia para sabor marcante e limpo.",
    price: "R$ 9,99",
    cat: "Cervejas",
    volume: "330ml",
    image:
      "https://images.unsplash.com/photo-1608270114002-c9a9bf86498a?auto=format&fit=crop&w=800&q=80",
    badge: "Gelada",
    alcohol: "5.0% Vol.",
    serving: "Ideal para qualquer ocasião",
  },
  {
    id: "spaten-longneck",
    name: "Spaten Puro Malte 355ml",
    desc: "Tradicional receita de Munique desde 1397, puro malte com amargor equilibrado e espuma densa.",
    price: "R$ 10,50",
    cat: "Cervejas",
    volume: "355ml",
    image:
      "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=800&q=80",
    badge: "Puro Malte",
    alcohol: "5.2% Vol.",
    serving: "Receita de Munique",
  },
  {
    id: "amstel-lata",
    name: "Amstel Puro Malte 350ml",
    desc: "Receita europeia puro malte leve e refrescante na lata conservada no gelo.",
    price: "R$ 6,50",
    cat: "Cervejas",
    volume: "Lata 350ml",
    image:
      "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=800&q=80",
    badge: "Lata Trincando",
    alcohol: "4.6% Vol.",
    serving: "Conservada em gelo moído",
  },
  {
    id: "heineken-zero",
    name: "Heineken 0.0% Long Neck 330ml",
    desc: "Zero álcool, 100% puro malte. O mesmo sabor autêntico e refrescante sem teor alcoólico.",
    price: "R$ 11,99",
    cat: "Cervejas",
    volume: "330ml",
    image:
      "https://images.unsplash.com/photo-1618886614638-80e3c153d31a?auto=format&fit=crop&w=800&q=80",
    badge: "Sem Álcool",
    alcohol: "0.0% Vol.",
    serving: "Para quem não consome álcool ou é motorista da rodada",
  },

  // DESTILADOS
  {
    id: "jack-daniels-garrafa",
    name: "Whisky Jack Daniel's Old No. 7 1L",
    desc: "Tennessee Whiskey autêntico, filtrado gota a gota em carvão vegetal de bordo (Charcoal Mellowed).",
    price: "R$ 149,90",
    cat: "Destilados",
    volume: "Garrafa 1L",
    image:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80",
    badge: "Original",
    alcohol: "40% Vol.",
    serving: "Puro com gelo ou com energético de maçã verde",
    promo: true,
  },
  {
    id: "black-label-garrafa",
    name: "Whisky Johnnie Walker Black Label 1L",
    desc: "Blended Scotch Whisky 12 anos. Rico, encorpado e equilibrado com notas defumadas elegantes.",
    price: "R$ 179,90",
    cat: "Destilados",
    volume: "Garrafa 1L",
    image:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80",
    badge: "12 Anos",
    alcohol: "40% Vol.",
    serving: "Aprecie puro ou com pedras de gelo mineral",
  },
  {
    id: "red-label-garrafa",
    name: "Whisky Johnnie Walker Red Label 1L",
    desc: "O destilado escocês versátil e consagrado, excelente base para coquetéis e copões.",
    price: "R$ 109,90",
    cat: "Destilados",
    volume: "Garrafa 1L",
    image:
      "https://images.unsplash.com/photo-1582819509237-d5b75f20ff7a?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    alcohol: "40% Vol.",
    serving: "Excelente base para drinks e gelos aromatizados",
  },
  {
    id: "ballantines-finest",
    name: "Whisky Ballantine's Finest 1L",
    desc: "Scotch clássico suave com toques de mel e baunilha floral. Paladar equilibrado e redondo.",
    price: "R$ 94,90",
    cat: "Destilados",
    volume: "Garrafa 1L",
    image:
      "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80",
    badge: "Custo-Benefício",
    alcohol: "40% Vol.",
    serving: "Combina perfeitamente com gelo de coco",
  },
  {
    id: "chivas-12",
    name: "Whisky Chivas Regal 12 Anos 1L",
    desc: "Blend nobre de Speyside, notas de maçã madura, avelã tostada e caramelo amanteigado.",
    price: "R$ 169,90",
    cat: "Destilados",
    volume: "Garrafa 1L",
    image:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80",
    badge: "12 Anos",
    alcohol: "40% Vol.",
    serving: "Em copo baixo com esfera de gelo",
  },
  {
    id: "tanqueray-london-dry",
    name: "Gin Tanqueray London Dry 750ml",
    desc: "Quatro botânicos clássicos destilados em alambique tradicional: zimbro, semente de coentro, angélica e alcaçuz.",
    price: "R$ 129,90",
    cat: "Destilados",
    volume: "Garrafa 750ml",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    badge: "Botânicos",
    alcohol: "47.3% Vol.",
    serving: "Com tônica, gelo e twist de limão",
  },

  // ENERGÉTICOS & REFRIGERANTES
  {
    id: "redbull-tradicional",
    name: "Red Bull Energy Drink 250ml",
    desc: "O energético clássico de alta qualidade que te dá asas. Gelado na medida.",
    price: "R$ 11,50",
    cat: "Não Alcoólicos",
    volume: "Lata 250ml",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    badge: "Original",
    alcohol: "Sem Álcool",
    serving: "Consumo direto ou misturado a destilados",
  },
  {
    id: "redbull-tropical",
    name: "Red Bull Tropical Edition 250ml",
    desc: "Sabor marcante de frutas tropicais (maracujá, manga e toque cítrico).",
    price: "R$ 11,50",
    cat: "Não Alcoólicos",
    volume: "Lata 250ml",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    badge: "Tropical",
    alcohol: "Sem Álcool",
    serving: "Excelente combinação com Gin",
  },
  {
    id: "monster-energy-473",
    name: "Monster Energy Tradicional 473ml",
    desc: "O sabor intenso da lata preta e verde em dose dupla de energia.",
    price: "R$ 11,90",
    cat: "Não Alcoólicos",
    volume: "Lata 473ml",
    image:
      "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80",
    badge: "473ml",
    alcohol: "Sem Álcool",
    serving: "Consumir bem gelado",
  },
  {
    id: "coca-cola-lata",
    name: "Coca-Cola Original Lata 350ml",
    desc: "Refrigerante gaseificado tradicional trincando de gelado.",
    price: "R$ 5,50",
    cat: "Não Alcoólicos",
    volume: "Lata 350ml",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    badge: "Trincando",
    alcohol: "Sem Álcool",
    serving: "Gelada em lata",
  },
  {
    id: "agua-mineral-com-gas",
    name: "Água Mineral com Gás 500ml",
    desc: "Água purificada da fonte natural com gás carbônico para hidratação pura.",
    price: "R$ 4,00",
    cat: "Não Alcoólicos",
    volume: "500ml",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
    badge: "Hidratação",
    alcohol: "Sem Álcool",
    serving: "Fundamental entre as rodadas",
  },

  // GELOS DE SABOR & COPOS
  {
    id: "gelo-coco-200",
    name: "Gelo de Coco Natural 200ml",
    desc: "Bloco de gelo feito com 100% água de coco pura para derretimento lento no copão.",
    price: "R$ 4,50",
    cat: "Gelos & Acessórios",
    volume: "Bloco 200ml",
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    badge: "100% Coco",
    alcohol: "Sem Álcool",
    serving: "Indispensável para Whisky e Gin",
    promo: true,
  },
  {
    id: "gelo-maracuja",
    name: "Gelo Sabor Maracujá 200ml",
    desc: "Aroma e sabor cítrico marcante que vai soltando aos poucos no seu drink.",
    price: "R$ 5,00",
    cat: "Gelos & Acessórios",
    volume: "Bloco 200ml",
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    badge: "Frutado",
    alcohol: "Sem Álcool",
    serving: "Harmoniza com Gin e Tônica",
  },
  {
    id: "gelo-melancia",
    name: "Gelo Sabor Melancia 200ml",
    desc: "Sabor doce refrescante e visual avermelhado vibrante no copão.",
    price: "R$ 5,00",
    cat: "Gelos & Acessórios",
    volume: "Bloco 200ml",
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    badge: "Refrescante",
    alcohol: "Sem Álcool",
    serving: "Combinação explosiva com energéticos tropicais",
  },
  {
    id: "saco-gelo-5kg",
    name: "Saco de Gelo em Cubos 5kg",
    desc: "Cubos de gelo cristalino de água purificada e ozonizada com alta durabilidade térmica.",
    price: "R$ 18,00",
    cat: "Gelos & Acessórios",
    volume: "Pacote 5kg",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    badge: "5kg Filtrado",
    alcohol: "Sem Álcool",
    serving: "Para encher coolers, baldes e caixas térmicas",
  },
  {
    id: "copao-acrilico-700",
    name: "Copão do Chefe 700ml",
    desc: "Copo resistente em acrílico com a identidade oficial da Adega do Chefe. Reutilizável.",
    price: "R$ 8,00",
    cat: "Gelos & Acessórios",
    volume: "700ml",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    badge: "Oficial",
    alcohol: "Acessório",
    serving: "Ideal para montagem de copões",
  },

  // TABACARIA & CONVENIÊNCIA
  {
    id: "pod-ignite-v50",
    name: "Pod Ignite V50 (5000 Puffs)",
    desc: "Dispositivo descartável com 5000 puxadas e conector Type-C para recarga da bateria.",
    price: "R$ 89,90",
    cat: "Tabacaria",
    volume: "5000 Puffs",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    badge: "Ignite",
    alcohol: "Tabacaria",
    serving: "Consulte sabores em estoque",
    promo: true,
  },
  {
    id: "seda-smoking-master",
    name: "Seda Smoking King Size + Tips",
    desc: "Papel ultrafino de combustão lenta com piteiras inclusas.",
    price: "R$ 9,00",
    cat: "Tabacaria",
    volume: "Livreto 33 folhas",
    image:
      "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?auto=format&fit=crop&w=800&q=80",
    badge: "King Size",
    alcohol: "Tabacaria",
    serving: "Pronta entrega",
  },
  {
    id: "carvao-narguile",
    name: "Carvão de Coco Hexagonal 1kg",
    desc: "Fibra de coco 100% natural, sem cheiro, cinzas brancas e duração prolongada.",
    price: "R$ 38,00",
    cat: "Tabacaria",
    volume: "Caixa 1kg",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    badge: "Sem Cheiro",
    alcohol: "Tabacaria",
    serving: "Sessões duradouras",
  },

  // VINHOS & ESPUMANTES
  {
    id: "chandon-brut",
    name: "Espumante Chandon Réserve Brut 750ml",
    desc: "Aroma cítrico, flores brancas e notas elegantes de pão fresco. Acidez vívida para celebrações.",
    price: "R$ 119,90",
    cat: "Vinhos & Espumantes",
    volume: "750ml",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    badge: "Brut",
    alcohol: "11.8% Vol.",
    serving: "Servir entre 6°C e 8°C em taça flûte",
  },
  {
    id: "casillero-cabernet",
    name: "Vinho Casillero del Diablo Cabernet 750ml",
    desc: "Tinto chileno emblemático com aromas de cassis, ameixa preta e leve toque de carvalho americano.",
    price: "R$ 64,90",
    cat: "Vinhos & Espumantes",
    volume: "750ml",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    badge: "Chile",
    alcohol: "13.5% Vol.",
    serving: "Harmoniza com queijos, carnes e noites amenas",
  },
  {
    id: "pergola-tinto-suave",
    name: "Vinho Pérgola Tinto Suave 1L",
    desc: "Vinho de mesa nacional frutado e macio, clássico para quem aprecia sabor suave e adocicado.",
    price: "R$ 32,00",
    cat: "Vinhos & Espumantes",
    volume: "Garrafa 1L",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    badge: "Suave",
    alcohol: "10.2% Vol.",
    serving: "Pode ser consumido levemente refrigerado",
  },
];

const CATEGORIES = [
  "Todos",
  "Combos",
  "Cervejas",
  "Destilados",
  "Não Alcoólicos",
  "Gelos & Acessórios",
  "Tabacaria",
  "Vinhos & Espumantes",
];

function AgeVerification({ onPass }: { onPass: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/90 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl">
        {/* Subtle ambient light */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-amber-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/60 p-3 shadow-inner">
            <img
              src={logoImg}
              alt="Adega do Chefe"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold text-amber-300">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            Acesso Restrito
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Você tem 18 anos ou mais?
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xs">
            Este cardápio contém bebidas alcoólicas. A venda e o consumo de bebidas alcoólicas são proibidos para menores de 18 anos conforme a Lei nº 8.069.
          </p>

          <div className="mt-6 grid w-full grid-cols-2 gap-3">
            <a
              href="https://www.google.com"
              className="flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-xs font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              Sou menor
            </a>
            <button
              onClick={onPass}
              className="flex items-center justify-center rounded-xl gradient-btn px-4 py-3 text-xs font-bold text-zinc-950 shadow-md transition hover:scale-[1.02]"
            >
              Sim, tenho 18+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/10 bg-zinc-950 p-6 text-left shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar on mobile */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-zinc-800 sm:hidden" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Product Image Cover */}
        <div className="relative -mx-6 -mt-6 sm:-mt-6 h-60 overflow-hidden bg-zinc-900">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

          {product.badge && (
            <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
              {product.badge}
            </span>
          )}

          <div className="absolute bottom-3 left-6 right-6">
            <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase">
              {product.cat}
            </span>
            <h3 className="mt-0.5 text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Modal Info */}
        <div className="mt-5 space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed">{product.desc}</p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-3">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                Volume
              </span>
              <span className="font-semibold text-zinc-200">{product.volume}</span>
            </div>
            <div className="rounded-xl border border-white/5 bg-zinc-900/50 p-3">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                Graduação / Tipo
              </span>
              <span className="font-semibold text-amber-400">
                {product.alcohol || "Original"}
              </span>
            </div>
          </div>

          {product.serving && (
            <div className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-3.5 text-xs text-zinc-300">
              <span className="font-semibold text-amber-400 block mb-1">
                Recomendação da Casa:
              </span>
              {product.serving}
            </div>
          )}

          {/* Pricing & Availability */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                Valor para Consulta
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-amber">
                {product.price}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Disponível no Balcão
            </span>
          </div>

          {/* Consultation Note */}
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 p-3 text-center">
            <p className="text-[11px] text-zinc-400">
              Cardápio digital para consulta. Valores e estoque sujeitos a confirmação no estabelecimento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [ageVerified, setAgeVerified] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickFilter, setQuickFilter] = useState<"all" | "promo" | "beer" | "combos">("all");

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAgeVerified(localStorage.getItem("age-verified") === "1");
  }, []);

  const handlePassAge = () => {
    localStorage.setItem("age-verified", "1");
    setAgeVerified(true);
  };

  // GSAP Animations and ScrollTriggers
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal Animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".hero-anim"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
          }
        );
      }

      // 2. Info Cards Scroll Reveal
      const infoCards = document.querySelectorAll(".info-card");
      if (infoCards.length > 0) {
        gsap.fromTo(
          infoCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#info-section",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Filter products by category, search text, and quick filter
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchCat = activeCategory === "Todos" || item.cat === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.cat.toLowerCase().includes(q);

      let matchQuick = true;
      if (quickFilter === "promo") matchQuick = !!item.promo;
      if (quickFilter === "beer") matchQuick = item.cat === "Cervejas";
      if (quickFilter === "combos") matchQuick = item.cat === "Combos";

      return matchCat && matchSearch && matchQuick;
    });
  }, [activeCategory, searchQuery, quickFilter]);

  // Animate product cards on filter/search change
  useEffect(() => {
    if (!productsGridRef.current) return;
    const cards = productsGridRef.current.querySelectorAll(".product-item");
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 15, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        stagger: 0.03,
        ease: "power2.out",
      }
    );
  }, [filteredProducts]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#08080a] text-zinc-100 selection:bg-amber-500 selection:text-black font-sans"
    >
      {!ageVerified && <AgeVerification onPass={handlePassAge} />}

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Elegant Ambient Background with subtle gradient & noise */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[550px] w-full max-w-5xl bg-gradient-to-b from-amber-500/[0.07] via-orange-500/[0.03] to-transparent blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-amber-600/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Top Banner — Status bar */}
      <div className="relative z-40 border-b border-white/[0.05] bg-zinc-950/60 px-4 py-2 text-xs text-zinc-400 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-zinc-300">Aberto Agora</span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="hidden sm:inline text-zinc-400">Atendimento e Balcão</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="hidden md:inline text-zinc-500">Catálogo Digital Oficial</span>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 transition hover:text-amber-400"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>@adega_docheff</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-30 glass-nav transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/60 p-1.5 shadow-sm">
              <img
                src={logoImg}
                alt="Logo Adega do Chefe"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  ADEGA DO CHEFE
                </span>
              </div>
              <span className="block text-[10px] sm:text-[11px] font-medium text-zinc-400">
                Cardápio Digital de Consulta
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Localização</span>
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20"
            >
              <Instagram className="h-3.5 w-3.5 text-amber-400" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-8 pb-10 sm:pt-14 sm:pb-16">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="hero-anim inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Bebidas 100% Originais & Cervejas Trincando
          </div>

          <h1 className="hero-anim mt-4 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Cardápio Oficial da{" "}
            <span className="text-gradient-amber">Adega do Chefe</span>
          </h1>

          <p className="hero-anim mt-3 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Consulte disponibilidade de combos exclusivos, destilados lacrados, cervejas geladas e tabacaria para a sua resenha.
          </p>

          {/* Quick Benefit Chips */}
          <div className="hero-anim mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-zinc-900/40 px-3 py-2 text-zinc-300 backdrop-blur-sm">
              <Snowflake className="h-3.5 w-3.5 text-cyan-400" />
              <span>Cervejas a -4°C</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-zinc-900/40 px-3 py-2 text-zinc-300 backdrop-blur-sm">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              <span>Combos com Gelo de Sabor</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-zinc-900/40 px-3 py-2 text-zinc-300 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Garrafas Originais Lacradas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Catalog */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20">
        {/* Sticky Filters & Search HUD */}
        <div
          ref={filterBarRef}
          className="glass-panel highlight-edge rounded-2xl p-3 sm:p-4 mb-6 shadow-xl"
        >
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por cerveja, whisky, gin, energético, gelo..."
              className="w-full rounded-xl border border-white/5 bg-zinc-900/70 py-2.5 pl-10 pr-9 text-sm text-white placeholder-zinc-500 transition focus:border-amber-500/40 focus:bg-zinc-900/90 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-white/[0.05]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="h-3 w-3 text-amber-400" />
              Filtros:
            </span>

            <button
              onClick={() => setQuickFilter("all")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                quickFilter === "all"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              Todos ({PRODUCTS.length})
            </button>

            <button
              onClick={() => setQuickFilter("promo")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition flex items-center gap-1 ${
                quickFilter === "promo"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              <Flame className="h-3 w-3 text-amber-400" /> Mais Pedidos
            </button>

            <button
              onClick={() => setQuickFilter("combos")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition flex items-center gap-1 ${
                quickFilter === "combos"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              <Zap className="h-3 w-3 text-amber-400" /> Combos & Kits
            </button>

            <button
              onClick={() => setQuickFilter("beer")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition flex items-center gap-1 ${
                quickFilter === "beer"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              <Snowflake className="h-3 w-3 text-cyan-400" /> Cervejas
            </button>
          </div>

          {/* Categories Horizontal Carousel */}
          <div className="mt-3 -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setQuickFilter("all");
                  }}
                  className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                    active
                      ? "gradient-btn shadow-md text-zinc-950 font-bold"
                      : "border border-white/5 bg-zinc-900/60 text-zinc-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter Info Banner */}
        <div className="mb-4 flex items-center justify-between text-xs text-zinc-400 px-1">
          <span>
            Exibindo <strong className="text-zinc-200">{filteredProducts.length}</strong> itens disponíveis para consulta
          </span>
          <span className="hidden sm:inline text-zinc-500">
            Clique no card para especificações completas
          </span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center my-8">
            <p className="text-base font-semibold text-zinc-300">
              Nenhum produto encontrado para &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-1.5 text-xs text-zinc-500">
              Experimente buscar por outro nome ou selecione outra categoria acima.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Todos");
                setQuickFilter("all");
              }}
              className="mt-4 rounded-xl gradient-btn px-4 py-2 text-xs font-bold text-zinc-950"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div
            ref={productsGridRef}
            className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {filteredProducts.map((p) => (
              <article
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="product-item glass-card highlight-edge group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-900/80">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />

                  {/* Badge */}
                  {p.badge && (
                    <span className="absolute top-2.5 left-2.5 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-amber-300 backdrop-blur-md">
                      {p.badge}
                    </span>
                  )}

                  {/* Volume */}
                  <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300 backdrop-blur-md">
                    {p.volume}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-amber-400 uppercase block mb-1">
                      {p.cat}
                    </span>
                    <h3 className="font-semibold text-xs sm:text-sm text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[11px] sm:text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom row: Price and CTA */}
                  <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block font-medium">
                        Preço Balcão
                      </span>
                      <span className="text-base sm:text-lg font-bold tracking-tight text-gradient-amber">
                        {p.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] font-medium text-zinc-300 transition group-hover:bg-amber-500 group-hover:text-zinc-950 group-hover:border-amber-500">
                      <Eye className="h-3 w-3" />
                      <span className="hidden sm:inline">Ver</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Establishment Info Section */}
        <section id="info-section" className="mt-16 grid gap-4 sm:grid-cols-3">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
            target="_blank"
            rel="noreferrer"
            className="info-card glass-card highlight-edge group flex flex-col justify-between rounded-2xl p-5"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Localização</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  {ADDRESS}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 group-hover:underline">
              <span>Como chegar no Google Maps</span>
              <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
            </div>
          </a>

          <div className="info-card glass-card highlight-edge flex flex-col justify-between rounded-2xl p-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Horário de Funcionamento</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Segunda a Quinta: 14h às 02h <br />
                  Sexta e Sábado: 14h às 05h <br />
                  Domingo: 13h às 00h
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Atendimento presencial</span>
            </div>
          </div>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="info-card glass-card highlight-edge group flex flex-col justify-between rounded-2xl p-5"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Instagram Oficial</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Siga @adega_docheff para acompanhar os stories com ofertas diárias e novidades.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-400 group-hover:underline">
              <span>Acessar perfil @adega_docheff</span>
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </div>
          </a>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/[0.06] pt-8 pb-12 text-center text-xs text-zinc-500 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <img src={logoImg} alt="Adega do Chefe" className="h-7 w-auto opacity-75" />
            <span className="font-bold text-sm tracking-tight text-zinc-300">
              ADEGA DO CHEFE
            </span>
          </div>
          <p className="max-w-md mx-auto text-[11px] text-zinc-500 leading-relaxed">
            Cardápio online informativo para consulta de itens e preços no balcão. Imagens meramente ilustrativas. Preços e disponibilidade sujeitos a alteração sem aviso prévio.
          </p>
          <p className="text-[11px] text-zinc-600">
            A venda e o consumo de bebidas alcoólicas são proibidos para menores de 18 anos (Lei nº 8.069/1990). Beba com responsabilidade. Se beber, não dirija.
          </p>
        </footer>
      </main>
    </div>
  );
}
