import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  MapPin,
  Instagram,
  Clock,
  Search,
  Flame,
  Snowflake,
  Sparkles,
  ShieldCheck,
  Eye,
  X,
  Beer,
  Wine,
  Zap,
  Info,
  SlidersHorizontal,
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import fundoImg from "@/assets/fundo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adega do Chefe — Cardápio Digital (Visualização)" },
      {
        name: "description",
        content:
          "Cardápio online futurista da Adega do Chefe. Consulte bebidas, destilados, combos e cervejas trincando em tempo real.",
      },
      { property: "og:title", content: "Adega do Chefe — Cardápio Digital" },
      {
        property: "og:description",
        content:
          "Consulte preços e disponibilidade de bebidas e combos da Adega do Chefe.",
      },
      { property: "og:image", content: "/logo.png" },
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
    cat: "Combos do Chefe",
    volume: "1 Litro + 4 Latas",
    image:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80",
    badge: "🔥 O MAIS PEDIDO",
    alcohol: "40% Vol.",
    serving: "Servir com gelo de coco e Red Bull no copão de 700ml",
    promo: true,
  },
  {
    id: "combo-red-label",
    name: "Combo Whisky Red Label",
    desc: "1 Garrafa Johnnie Walker Red Label 1L + 4 Energéticos Baly Tropical 473ml + 1 Gelo de Coco.",
    price: "R$ 149,90",
    cat: "Combos do Chefe",
    volume: "1 Litro + 4 Latas",
    image:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80",
    badge: "⭐ FAVORITO DA GALERA",
    alcohol: "40% Vol.",
    serving: "Ideal para resenha com amigos",
    promo: true,
  },
  {
    id: "copao-do-chefe",
    name: "Copão do Chefe 700ml",
    desc: "Whisky Cavalo Branco + Energético Tropical + Gelo de Melancia com Maracujá preparado na hora.",
    price: "R$ 25,00",
    cat: "Combos do Chefe",
    volume: "700ml montado",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    badge: "⚡ HIT DA NOITE",
    alcohol: "Mix Alcoólico",
    serving: "Servido montado e trincando de gelado",
    promo: true,
  },
  {
    id: "combo-tanqueray",
    name: "Kit Gin Tanqueray London Dry",
    desc: "1 Garrafa Tanqueray 750ml + 4 Latas Schweppes Tônica + Especiarias aromáticas (Zimbro e Hibisco).",
    price: "R$ 169,90",
    cat: "Combos do Chefe",
    volume: "750ml + Tônicas",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    badge: "✨ PREMIUM",
    alcohol: "47.3% Vol.",
    serving: "Sirva em taça de gin com gelo e fatia de limão taiti",
  },
  {
    id: "combo-absolut",
    name: "Combo Vodka Absolut Neon",
    desc: "1 Garrafa Absolut 1L + 4 Monster Mango Loco 473ml + 2 Gelos de Morango especiais.",
    price: "R$ 159,90",
    cat: "Combos do Chefe",
    volume: "1 Litro + 4 Latas",
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80",
    badge: "🔥 VIBE TROPICAL",
    alcohol: "40% Vol.",
    serving: "Combinação adocicada e energética perfeita",
  },
  {
    id: "copao-gin-tropical",
    name: "Copão de Gin Tropical 700ml",
    desc: "Gin London Dry + Energético Tropical Baly + Gelo de Morango + Rodela de Limão Taiti.",
    price: "R$ 22,00",
    cat: "Combos do Chefe",
    volume: "700ml montado",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    badge: "REFRESCANTE",
    alcohol: "Mix Alcoólico",
    serving: "Preparado no balcão com guarnição",
  },

  // CERVEJAS
  {
    id: "heineken-longneck",
    name: "Heineken Long Neck 330ml",
    desc: "Cerveja puro malte verde icônica, servida trincando a -4°C na nossa estufa refrigerada.",
    price: "R$ 11,99",
    cat: "Cervejas",
    volume: "330ml",
    image:
      "https://images.unsplash.com/photo-1618886614638-80e3c153d31a?auto=format&fit=crop&w=800&q=80",
    badge: "❄️ ESTUPIDAMENTE GELADA",
    alcohol: "5.0% Vol.",
    serving: "Temperatura ideal: -4°C a -2°C",
    promo: true,
  },
  {
    id: "corona-extra",
    name: "Corona Extra com Limão 330ml",
    desc: "Autêntica cerveja mexicana clara e ultra refrescante, servida acompanhada de fatia de limão.",
    price: "R$ 12,50",
    cat: "Cervejas",
    volume: "330ml",
    image:
      "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80",
    badge: "🍋 COM LIMÃO",
    alcohol: "4.5% Vol.",
    serving: "Empurre a fatia de limão na garrafa e aproveite",
  },
  {
    id: "budweiser-longneck",
    name: "Budweiser Long Neck 330ml",
    desc: "A King of Beers. Cerveja lager envelhecida com madeira de faia para sabor marcante.",
    price: "R$ 9,99",
    cat: "Cervejas",
    volume: "330ml",
    image:
      "https://images.unsplash.com/photo-1608270114002-c9a9bf86498a?auto=format&fit=crop&w=800&q=80",
    badge: "❄️ GELADA",
    alcohol: "5.0% Vol.",
    serving: "Muito gelada para qualquer ocasião",
  },
  {
    id: "spaten-longneck",
    name: "Spaten Puro Malte 355ml",
    desc: "Cerveja alemã de Munique desde 1397, puro malte com amargor equilibrado e espuma cremosa.",
    price: "R$ 10,50",
    cat: "Cervejas",
    volume: "355ml",
    image:
      "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&w=800&q=80",
    badge: "PURO MALTE",
    alcohol: "5.2% Vol.",
    serving: "Tradicional receita de Munique",
  },
  {
    id: "amstel-lata",
    name: "Amstel Puro Malte Lata 350ml",
    desc: "Nascida em Amsterdã, receita puro malte leve e refrescante na lata trincando.",
    price: "R$ 6,50",
    cat: "Cervejas",
    volume: "350ml",
    image:
      "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=800&q=80",
    badge: "❄️ NO PONTO",
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
    badge: "0.0% ÁLCOOL",
    alcohol: "0.0% Vol.",
    serving: "Para o motorista da rodada ou quem não bebe álcool",
  },

  // DESTILADOS & WHISKIES
  {
    id: "jack-daniels-garrafa",
    name: "Whisky Jack Daniel's Old No. 7 1L",
    desc: "Autêntico Tennessee Whiskey, suavizado gota a gota por três metros de carvão vegetal de bordo.",
    price: "R$ 149,90",
    cat: "Destilados",
    volume: "Garrafa 1 Litro",
    image:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80",
    badge: "ORIGINAL LACRADO",
    alcohol: "40% Vol.",
    serving: "Puro com gelo ou misturado com refrigerante/energético",
    promo: true,
  },
  {
    id: "black-label-garrafa",
    name: "Whisky Johnnie Walker Black Label 1L",
    desc: "Blended Scotch Whisky 12 anos. Rico, complexo e incrivelmente equilibrado com notas defumadas.",
    price: "R$ 179,90",
    cat: "Destilados",
    volume: "Garrafa 1 Litro",
    image:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80",
    badge: "⭐ 12 ANOS",
    alcohol: "40% Vol.",
    serving: "Aprecie puro ou com pedras de gelo de água mineral",
  },
  {
    id: "red-label-garrafa",
    name: "Whisky Johnnie Walker Red Label 1L",
    desc: "O destilado escocês pioneiro da família Walker, feito para ser misturado em drinks vibrantes.",
    price: "R$ 109,90",
    cat: "Destilados",
    volume: "Garrafa 1 Litro",
    image:
      "https://images.unsplash.com/photo-1582819509237-d5b75f20ff7a?auto=format&fit=crop&w=800&q=80",
    badge: "MAIS VENDIDO",
    alcohol: "40% Vol.",
    serving: "Excelente base para copões com gelo saborizado",
  },
  {
    id: "ballantines-finest",
    name: "Whisky Ballantine's Finest 1L",
    desc: "Escocês clássico com notas de mel e baunilha, suave e macio no paladar.",
    price: "R$ 94,90",
    cat: "Destilados",
    volume: "Garrafa 1 Litro",
    image:
      "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80",
    badge: "CUSTO BENEFÍCIO",
    alcohol: "40% Vol.",
    serving: "Drink refrescante com gelo de coco e energético de maçã verde",
  },
  {
    id: "chivas-12",
    name: "Whisky Chivas Regal 12 Anos 1L",
    desc: "Blend nobre de Speyside, com notas de maçã madura, avelã e caramelo cremoso.",
    price: "R$ 169,90",
    cat: "Destilados",
    volume: "Garrafa 1 Litro",
    image:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80",
    badge: "PREMIUM",
    alcohol: "40% Vol.",
    serving: "Em copo baixo com esfera de gelo",
  },
  {
    id: "tanqueray-london-dry",
    name: "Gin Tanqueray London Dry 750ml",
    desc: "Quatro botânicos clássicos destilados em alambique de cobre tradicional: zimbro, coentro, angélica e alcaçuz.",
    price: "R$ 129,90",
    cat: "Destilados",
    volume: "Garrafa 750ml",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    badge: "GIN FAVORITO",
    alcohol: "47.3% Vol.",
    serving: "Excelente para Gin Tônica clássica",
  },
  {
    id: "vodka-absolut",
    name: "Vodka Absolut Original 1L",
    desc: "Produzida em Åhus, Suécia, a partir de trigo de inverno e água pura de poço profundo.",
    price: "R$ 104,90",
    cat: "Destilados",
    volume: "Garrafa 1 Litro",
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80",
    badge: "SUÉCIA",
    alcohol: "40% Vol.",
    serving: "Base pura e neutra para coquetéis e energéticos",
  },
  {
    id: "vodka-smirnoff",
    name: "Vodka Smirnoff No. 21 Red 998ml",
    desc: "Triplamente destilada e filtrada dez vezes em carvão mineral para máxima pureza.",
    price: "R$ 49,90",
    cat: "Destilados",
    volume: "Garrafa 998ml",
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80",
    badge: "CLÁSSICA",
    alcohol: "37.5% Vol.",
    serving: "Ideal para misturar com sucos e energéticos",
  },
  {
    id: "tequila-jose-cuervo",
    name: "Tequila José Cuervo Especial Ouro 750ml",
    desc: "Destilada de agave azul em Jalisco, envelhecida em carvalho para suavidade e cor dourada.",
    price: "R$ 139,90",
    cat: "Destilados",
    volume: "Garrafa 750ml",
    image:
      "https://images.unsplash.com/photo-1549416869-79a0ec2b2a63?auto=format&fit=crop&w=800&q=80",
    badge: "MÉXICO",
    alcohol: "38% Vol.",
    serving: "Dose com limão e sal ou no drink Margarita",
  },
  {
    id: "licor-jagermeister",
    name: "Licor de Ervas Jägermeister 700ml",
    desc: "Blend alemão secreto de 56 ervas, raízes, frutas e especiarias. Servido ultra gelado.",
    price: "R$ 134,90",
    cat: "Destilados",
    volume: "Garrafa 700ml",
    image:
      "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80",
    badge: "CONGELADO -18°C",
    alcohol: "35% Vol.",
    serving: "Em dose direta do freezer ou misturado com Red Bull (Jägerbomb)",
  },

  // ENERGÉTICOS & BEBIDAS SEM ÁLCOOL
  {
    id: "redbull-tradicional",
    name: "Red Bull Energy Drink 250ml",
    desc: "Vitaliza a mente e o corpo. A energia indispensável para a sua noite.",
    price: "R$ 11,99",
    cat: "Energéticos & Refrigerantes",
    volume: "Lata 250ml",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    badge: "⚡ ENERGIA TOTAL",
    alcohol: "Sem Álcool",
    serving: "Consumir bem gelado",
  },
  {
    id: "redbull-sabores",
    name: "Red Bull Editions Sabores 250ml",
    desc: "Edições especiais: Melancia (Red Edition), Tropical (Yellow Edition) e Pitaya.",
    price: "R$ 12,50",
    cat: "Energéticos & Refrigerantes",
    volume: "Lata 250ml",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    badge: "SABORES VARIADOS",
    alcohol: "Sem Álcool",
    serving: "Excelente acompanhamento para whisky e gin",
  },
  {
    id: "monster-energy",
    name: "Monster Energy Tradicional 473ml",
    desc: "Lata preta com garra verde, dose reforçada de taurina, cafeína e vitaminas do complexo B.",
    price: "R$ 12,99",
    cat: "Energéticos & Refrigerantes",
    volume: "Lata 473ml",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    badge: "473ML",
    alcohol: "Sem Álcool",
    serving: "Ultra gelado direto da lata",
  },
  {
    id: "monster-mango-loco",
    name: "Monster Energy Mango Loco 473ml",
    desc: "Combinação paradisíaca de sucos de frutas exóticas com o punch energético Monster.",
    price: "R$ 12,99",
    cat: "Energéticos & Refrigerantes",
    volume: "Lata 473ml",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    badge: "FAVORITO",
    alcohol: "Sem Álcool",
    serving: "Perfeito com vodkas e runs brancos",
  },
  {
    id: "baly-tropical-2l",
    name: "Energético Baly Tropical 2 Litros",
    desc: "O preferido dos jovens nos fins de semana. Muito volume para render com a galera toda.",
    price: "R$ 16,90",
    cat: "Energéticos & Refrigerantes",
    volume: "Garrafa 2 Litros",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    badge: "2 LITROS",
    alcohol: "Sem Álcool",
    serving: "Ideal para montagem de copões de 700ml",
    promo: true,
  },
  {
    id: "baly-maca-verde-2l",
    name: "Energético Baly Maçã Verde 2L",
    desc: "Sabor doce e azedinho marcante de maçã verde geladíssima.",
    price: "R$ 16,90",
    cat: "Energéticos & Refrigerantes",
    volume: "Garrafa 2 Litros",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    badge: "MAÇÃ VERDE",
    alcohol: "Sem Álcool",
    serving: "Combina demais com whisky e gin",
  },
  {
    id: "coca-cola-2l",
    name: "Coca-Cola Original 2 Litros",
    desc: "O refrigerante mais adorado do planeta, servido na temperatura ideal.",
    price: "R$ 14,00",
    cat: "Energéticos & Refrigerantes",
    volume: "Garrafa 2 Litros",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    badge: "FAMÍLIA",
    alcohol: "Sem Álcool",
    serving: "Sirva com bastante gelo e limão",
  },
  {
    id: "coca-cola-lata",
    name: "Coca-Cola Original Lata 350ml",
    desc: "Lata individual gelada para acompanhar seu momento.",
    price: "R$ 6,00",
    cat: "Energéticos & Refrigerantes",
    volume: "Lata 350ml",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    badge: "GELADA",
    alcohol: "Sem Álcool",
    serving: "Consumo imediato",
  },
  {
    id: "agua-mineral-crystal",
    name: "Água Mineral 500ml",
    desc: "Hidratação fundamental para a noite inteira. Com ou sem gás.",
    price: "R$ 4,00",
    cat: "Energéticos & Refrigerantes",
    volume: "500ml",
    image:
      "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=800&q=80",
    badge: "HIDRATE-SE",
    alcohol: "Sem Álcool",
    serving: "Beba água entre um drink e outro",
  },

  // GELOS DE SABOR & ACESSÓRIOS
  {
    id: "gelo-coco-puro",
    name: "Gelo de Coco Especial 200ml",
    desc: "Feito com água de coco concentrada natural, derrete aos poucos liberando o sabor ideal no copão.",
    price: "R$ 5,00",
    cat: "Gelos de Sabor",
    volume: "Bloco 200ml",
    image:
      "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=800&q=80",
    badge: "COCO NATURAL",
    alcohol: "Sem Álcool",
    serving: "Dobre o copo com whisky e complete com energético",
    promo: true,
  },
  {
    id: "gelo-maracuja",
    name: "Gelo de Maracujá com Pimenta 200ml",
    desc: "Sabor cítrico do maracujá com leve toque de especiarias. O segredo de um drink diferenciado.",
    price: "R$ 5,00",
    cat: "Gelos de Sabor",
    volume: "Bloco 200ml",
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    badge: "MARACUJÁ",
    alcohol: "Sem Álcool",
    serving: "Perfeito com Gin ou Whisky",
  },
  {
    id: "gelo-melancia",
    name: "Gelo de Melancia 200ml",
    desc: "Cor vermelha neon no copo e doçura na medida certa do início ao fim do copo.",
    price: "R$ 5,00",
    cat: "Gelos de Sabor",
    volume: "Bloco 200ml",
    image:
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    badge: "MELANCIA",
    alcohol: "Sem Álcool",
    serving: "Combinação explosiva com energético de maçã",
  },
  {
    id: "saco-gelo-5kg",
    name: "Saco de Gelo em Cubos Filtrado 5kg",
    desc: "Cubos de gelo cristalino de água purificada e ozonizada. Alta durabilidade na caixa térmica.",
    price: "R$ 18,00",
    cat: "Gelos de Sabor",
    volume: "Pacote 5kg",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    badge: "5 KG FILTRADO",
    alcohol: "Sem Álcool",
    serving: "Para encher coolers, baldes e caixas térmicas",
  },
  {
    id: "copao-acrilico-700",
    name: "Copão do Chefe 700ml Acrílico",
    desc: "Copo reforçado com a arte oficial da Adega do Chefe. Reutilizável e estiloso.",
    price: "R$ 8,00",
    cat: "Gelos de Sabor",
    volume: "700ml",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    badge: "COPO OFICIAL",
    alcohol: "Acessório",
    serving: "Ideal para preparar seus copões personalizados",
  },

  // TABACARIA & CONVENIÊNCIA
  {
    id: "pod-ignite-v50",
    name: "Pod Descartável Ignite V50 (5000 Puffs)",
    desc: "Dispositivo descartável premium com 5000 puxadas. Bateria recarregável via USB Type-C.",
    price: "R$ 89,90",
    cat: "Tabacaria",
    volume: "5000 Puffs",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    badge: "IGNITE OFICIAL",
    alcohol: "Tabacaria",
    serving: "Disponível nos sabores: Watermelon Ice, Icy Mint e Strawberry Kiwi",
    promo: true,
  },
  {
    id: "pod-elfbar-10000",
    name: "Pod ElfBar BC10000 (10.000 Puffs)",
    desc: "Display digital de bateria e essência, acabamento holográfico futurista e sabor intenso.",
    price: "R$ 109,90",
    cat: "Tabacaria",
    volume: "10.000 Puffs",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    badge: "10K PUFFS",
    alcohol: "Tabacaria",
    serving: "Sensor de bateria e líquido inteligente",
  },
  {
    id: "seda-smoking-master",
    name: "Seda Smoking King Size + Tips",
    desc: "Papel ultrafino de queima lenta com piteiras de papel inclusas na embalagem.",
    price: "R$ 9,00",
    cat: "Tabacaria",
    volume: "Livreto com 33 folhas",
    image:
      "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?auto=format&fit=crop&w=800&q=80",
    badge: "KING SIZE",
    alcohol: "Tabacaria",
    serving: "Pronta entrega",
  },
  {
    id: "isqueiro-clipper",
    name: "Isqueiro Clipper Recarregável",
    desc: "Isqueiro original recarregável a gás com pilão removível integrado.",
    price: "R$ 12,00",
    cat: "Tabacaria",
    volume: "Unidade",
    image:
      "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?auto=format&fit=crop&w=800&q=80",
    badge: "RECARREGÁVEL",
    alcohol: "Acessório",
    serving: "Modelos e estampas variadas",
  },
  {
    id: "carvao-narguile",
    name: "Carvão de Coco Hexagonal 1kg",
    desc: "100% fibra de coco natural, sem cheiro, cinzas brancas e duração de mais de 70 minutos.",
    price: "R$ 38,00",
    cat: "Tabacaria",
    volume: "Caixa 1kg",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    badge: "SEM CHEIRO",
    alcohol: "Tabacaria",
    serving: "Ideal para sessões de narguile",
  },

  // VINHOS & ESPUMANTES
  {
    id: "chandon-brut",
    name: "Espumante Chandon Réserve Brut 750ml",
    desc: "Aroma de frutas cítricas, flores brancas e notas de pão fresco. Acidez refrescante para comemorações.",
    price: "R$ 119,90",
    cat: "Vinhos & Espumantes",
    volume: "Garrafa 750ml",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    badge: "COMEMORAÇÃO",
    alcohol: "11.8% Vol.",
    serving: "Servir entre 6°C e 8°C em taça flûte",
  },
  {
    id: "casillero-cabernet",
    name: "Vinho Casillero del Diablo Cabernet 750ml",
    desc: "Tinto chileno emblemático do Vale Central. Notas de cassis, cereja preta e leve tostado de carvalho.",
    price: "R$ 64,90",
    cat: "Vinhos & Espumantes",
    volume: "Garrafa 750ml",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    badge: "CHILE",
    alcohol: "13.5% Vol.",
    serving: "Acompanha carnes, petiscos e noites mais frias",
  },
  {
    id: "pergola-tinto-suave",
    name: "Vinho Pérgola Tinto Suave 1L",
    desc: "Vinho de mesa nacional doce e frutado, muito consumido e adorado pelos jovens bem gelado.",
    price: "R$ 32,00",
    cat: "Vinhos & Espumantes",
    volume: "Garrafa 1 Litro",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    badge: "POPULAR",
    alcohol: "10.2% Vol.",
    serving: "Pode ser consumido com pedras de gelo",
  },
];

const CATEGORIES = [
  "Todos",
  "Combos do Chefe",
  "Cervejas",
  "Destilados",
  "Energéticos & Refrigerantes",
  "Gelos de Sabor",
  "Tabacaria",
  "Vinhos & Espumantes",
];

function AgeGate({ onOk }: { onOk: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-orange-500/40 bg-zinc-950 p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(255,107,0,0.25)]">
        {/* Glow corner decorations */}
        <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-orange-600/30 blur-2xl" />
        <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-amber-500/20 blur-2xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 opacity-75 blur-md group-hover:opacity-100 transition duration-500" />
            <img
              src={logoImg}
              alt="Adega do Chefe"
              className="relative h-28 w-28 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            VERIFICAÇÃO DE IDADE OBRIGATÓRIA
          </div>

          <h2 className="mt-4 font-display text-4xl tracking-wider text-white uppercase sm:text-5xl">
            Você tem 18 anos <br />
            <span className="text-orange-500">ou mais?</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xs">
            Este cardápio contém bebidas alcoólicas. A venda e o consumo são
            proibidos para menores de 18 anos conforme a Lei Federal nº 8.069.
          </p>

          <div className="mt-6 grid w-full grid-cols-2 gap-3">
            <a
              href="https://www.google.com"
              className="flex items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3.5 text-sm font-bold text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Sou menor
            </a>
            <button
              onClick={onOk}
              className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3.5 text-sm font-bold text-black shadow-[0_0_25px_rgba(255,107,0,0.5)] transition-all hover:scale-105 active:scale-95"
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
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-orange-500/40 bg-zinc-950 p-6 text-left shadow-[0_0_50px_rgba(255,107,0,0.3)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute top-4 right-4 z-20 rounded-full border border-zinc-800 bg-zinc-900/90 p-2 text-zinc-400 transition-colors hover:border-orange-500 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Product Image Header */}
        <div className="relative -mx-6 -mt-6 h-64 overflow-hidden bg-zinc-900 sm:h-72">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {product.badge && (
            <span className="absolute top-4 left-4 rounded-full border border-orange-500/40 bg-orange-500/90 px-3 py-1 text-xs font-black tracking-wider text-black shadow-lg">
              {product.badge}
            </span>
          )}

          <div className="absolute bottom-3 left-6 right-6">
            <span className="inline-block rounded-md bg-zinc-900/90 px-2.5 py-0.5 text-xs font-bold tracking-wider text-orange-400 uppercase">
              {product.cat}
            </span>
            <h3 className="mt-1 font-display text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="mt-4 space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed">{product.desc}</p>

          {/* Quick HUD Specs */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/70 p-2.5">
              <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">
                Volume / Embalagem
              </span>
              <span className="font-semibold text-zinc-200">{product.volume}</span>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/70 p-2.5">
              <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">
                Graduação / Tipo
              </span>
              <span className="font-semibold text-orange-400">
                {product.alcohol || "Original"}
              </span>
            </div>
          </div>

          {product.serving && (
            <div className="rounded-xl border border-orange-500/20 bg-orange-950/20 p-3 text-xs text-orange-200">
              <span className="font-bold text-orange-400 block mb-0.5">
                💡 Dica de Consumo do Chefe:
              </span>
              {product.serving}
            </div>
          )}

          {/* Price & Notice (Strictly Online Consultation Notice - No Buy Button!) */}
          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                Valor Unitário
              </span>
              <span className="font-display text-3xl text-orange-500 font-bold tracking-wider">
                {product.price}
              </span>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                DISPONÍVEL NO BALCÃO
              </span>
            </div>
          </div>

          {/* Cardápio Exclusivo para Consulta Notice */}
          <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-3 text-center">
            <p className="text-[11px] text-zinc-400">
              ⚡ <strong className="text-orange-400">Cardápio Informativo:</strong> Valores e produtos sujeitos a confirmação de estoque no balcão da Adega do Chefe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [ageOk, setAgeOk] = useState(true);
  const [activeCat, setActiveCat] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickFilter, setQuickFilter] = useState<"all" | "promo" | "beer" | "combos">("all");

  useEffect(() => {
    setAgeOk(localStorage.getItem("age-ok") === "1");
  }, []);

  const handleAgePass = () => {
    localStorage.setItem("age-ok", "1");
    setAgeOk(true);
  };

  // Filter products by category, search text, and quick filter
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      const matchCat = activeCat === "Todos" || item.cat === activeCat;

      // Text search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.cat.toLowerCase().includes(q);

      // Quick filter
      let matchQuick = true;
      if (quickFilter === "promo") matchQuick = !!item.promo;
      if (quickFilter === "beer") matchQuick = item.cat === "Cervejas";
      if (quickFilter === "combos") matchQuick = item.cat === "Combos do Chefe";

      return matchCat && matchSearch && matchQuick;
    });
  }, [activeCat, searchQuery, quickFilter]);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black">
      {!ageOk && <AgeGate onOk={handleAgePass} />}

      {/* Product Detail Modal for consultation */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Cyber Ambient Atmosphere Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src={fundoImg}
          alt=""
          className="h-full w-full object-cover object-center opacity-25 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-orange-600/15 blur-[120px]" />
        <div className="absolute bottom-1/3 left-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />
      </div>

      {/* Top Cyber Status Bar */}
      <div className="relative z-40 border-b border-orange-500/20 bg-zinc-950/80 px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-zinc-400 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-zinc-300 font-semibold uppercase">
              Adega Aberta
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:inline text-zinc-400">
              Cardápio Digital Atualizado
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-orange-400 font-bold hidden md:inline">
              ⚡ APENAS CONSULTA ONLINE
            </span>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-zinc-400 transition hover:text-orange-400"
            >
              <Instagram className="h-3.5 w-3.5 text-orange-500" />
              <span>@adega_docheff</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header Sticky */}
      <header className="sticky top-0 z-30 border-b border-orange-500/20 bg-black/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-orange-500/40 opacity-75 blur-sm group-hover:opacity-100 transition" />
              <img
                src={logoImg}
                alt="Logo Adega do Chefe"
                className="relative h-11 w-11 object-contain drop-shadow-[0_2px_10px_rgba(255,107,0,0.4)]"
              />
            </div>
            <div>
              <span className="font-display text-2xl tracking-wider text-white uppercase sm:text-3xl leading-none block">
                ADEGA DO <span className="text-orange-500">CHEFE</span>
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-semibold block">
                Cardápio Digital Oficial
              </span>
            </div>
          </div>

          {/* Social info pills */}
          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-orange-500/50 hover:text-white"
            >
              <MapPin className="h-3.5 w-3.5 text-orange-500" />
              <span>Como Chegar</span>
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Adega"
              className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-black"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Fundo Artwork and Mascot */}
      <section className="relative overflow-hidden pt-8 pb-10 sm:pt-14 sm:pb-16">
        {/* Street Artwork Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={fundoImg}
            alt="Fundo Adega do Chefe"
            className="h-full w-full object-cover object-top opacity-35 filter brightness-110 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
          {/* Neon Mascot Badge */}
          <div className="mx-auto flex flex-col items-center">
            <div className="relative animate-float">
              <div className="absolute -inset-4 rounded-full bg-orange-500/30 blur-2xl" />
              <img
                src={logoImg}
                alt="Mascote Adega do Chefe"
                className="relative h-36 w-auto drop-shadow-[0_15px_35px_rgba(255,107,0,0.5)] sm:h-48 md:h-56 object-contain"
              />
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-zinc-950/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-400 shadow-[0_0_20px_rgba(255,107,0,0.2)] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              CONSULTA EM TEMPO REAL · BEBIDAS ORIGINAIS
            </div>

            <h1 className="mt-4 font-display text-5xl font-black uppercase tracking-wider text-white sm:text-7xl md:text-8xl drop-shadow-lg">
              ADEGA DO <span className="text-orange-500 drop-shadow-[0_0_30px_rgba(255,107,0,0.8)]">CHEFE</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm sm:text-base text-zinc-300">
              O point oficial das melhores bebidas da quebrada. Confira nossos combos,
              cervejas trincando a -4°C, whiskies e insumos para sua resenha.
            </p>

            {/* Quick Status Chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs">
              <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-2 font-medium text-zinc-300 backdrop-blur-md">
                <Snowflake className="h-4 w-4 text-cyan-400" />
                <span>Cervejas Trincando</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-2 font-medium text-zinc-300 backdrop-blur-md">
                <Flame className="h-4 w-4 text-orange-500" />
                <span>Combos Exclusivos</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 py-2 font-medium text-zinc-300 backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Bebidas 100% Originais</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Interactive Catalog */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20">
        {/* Search & Filter HUD Bar */}
        <div className="rounded-3xl border border-orange-500/25 bg-zinc-950/90 p-4 shadow-[0_0_30px_rgba(255,107,0,0.12)] backdrop-blur-xl">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar bebida, whisky, cerveja, red bull, gelo..."
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 py-3.5 pl-12 pr-10 text-sm text-white placeholder-zinc-500 transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Badges */}
          <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="h-3 w-3 text-orange-500" />
              Destaques:
            </span>

            <button
              onClick={() => setQuickFilter("all")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                quickFilter === "all"
                  ? "bg-orange-500 text-black font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              Todos ({PRODUCTS.length})
            </button>

            <button
              onClick={() => setQuickFilter("promo")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition flex items-center gap-1 ${
                quickFilter === "promo"
                  ? "bg-orange-500 text-black font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              <Flame className="h-3 w-3" /> Mais Pedidos
            </button>

            <button
              onClick={() => setQuickFilter("combos")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition flex items-center gap-1 ${
                quickFilter === "combos"
                  ? "bg-orange-500 text-black font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              <Zap className="h-3 w-3" /> Combos
            </button>

            <button
              onClick={() => setQuickFilter("beer")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition flex items-center gap-1 ${
                quickFilter === "beer"
                  ? "bg-orange-500 text-black font-bold shadow-[0_0_15px_rgba(255,107,0,0.4)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              <Snowflake className="h-3 w-3" /> Cervejas Geladas
            </button>
          </div>

          {/* Category Horizontal Scrolling Pills */}
          <div className="mt-4 -mx-2 flex gap-2 overflow-x-auto px-2 pb-1 scrollbar-none">
            {CATEGORIES.map((c) => {
              const active = c === activeCat;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setActiveCat(c);
                    setQuickFilter("all");
                  }}
                  className={`shrink-0 rounded-2xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-[0_0_20px_rgba(255,107,0,0.5)] scale-105"
                      : "border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-orange-500/40 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Informative Notice (strictly online consultation) */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3.5 text-xs text-zinc-400 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <Info className="h-4 w-4 text-orange-400 shrink-0" />
            <span>
              Mostrando <strong className="text-white">{filteredProducts.length}</strong> itens disponíveis para visualização. Clique em qualquer card para ver a ficha completa.
            </span>
          </div>
          <span className="hidden md:inline text-[11px] font-semibold text-orange-400/80 uppercase tracking-wider">
            Consulte disponibilidade no balcão
          </span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-12 text-center">
            <p className="text-lg font-semibold text-zinc-300">
              Nenhuma bebida encontrada para &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Tente buscar por outro termo ou escolha uma das categorias acima.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCat("Todos");
                setQuickFilter("all");
              }}
              className="mt-4 rounded-full bg-orange-500 px-5 py-2 text-xs font-bold text-black"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p, i) => (
              <article
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                style={{ animationDelay: `${i * 35}ms` }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/60 hover:shadow-[0_10px_30px_rgba(255,107,0,0.25)] cursor-pointer"
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-900">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

                  {/* Badge */}
                  {p.badge && (
                    <span className="absolute top-2 left-2 rounded-full border border-orange-500/30 bg-black/80 px-2 py-0.5 text-[10px] font-black tracking-wider text-orange-400 backdrop-blur-md">
                      {p.badge}
                    </span>
                  )}

                  {/* Volume Pill */}
                  <span className="absolute bottom-2 right-2 rounded-md bg-black/85 px-1.5 py-0.5 text-[10px] font-bold text-zinc-300 backdrop-blur-md">
                    {p.volume}
                  </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col justify-between p-3.5">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-orange-500 uppercase block mb-1">
                      {p.cat}
                    </span>
                    <h3 className="font-semibold text-sm leading-snug text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Price Tag & Details Action (No Order Button) */}
                  <div className="mt-3.5 pt-3 border-t border-zinc-900 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 block uppercase">
                        Preço
                      </span>
                      <span className="font-display text-xl sm:text-2xl font-bold tracking-wide text-orange-500">
                        {p.price}
                      </span>
                    </div>

                    {/* View Details Icon */}
                    <div
                      className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-zinc-900/90 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all"
                      title="Ver detalhes do produto"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline text-[11px]">Ver</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Info & Location Section */}
        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 transition hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(255,107,0,0.15)]"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-3 text-orange-500">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Localização</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  {ADDRESS}
                </p>
              </div>
            </div>
            <span className="mt-4 text-xs font-bold text-orange-400 group-hover:underline">
              Abrir rota no Google Maps →
            </span>
          </a>

          <div className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-3 text-orange-500">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Horário de Funcionamento</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Seg a Qui: 14:00 às 02:00 <br />
                  Sex, Sáb e Vésperas: 14:00 às 05:00 <br />
                  Domingo: 13:00 às 00:00
                </p>
              </div>
            </div>
            <span className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Atendimento presencial no balcão
            </span>
          </div>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 transition hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(255,107,0,0.15)]"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-3 text-orange-500">
                <Instagram className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Acompanhe no Insta</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  @adega_docheff · Siga nossos stories para promoções relâmpago e novidades da semana.
                </p>
              </div>
            </div>
            <span className="mt-4 text-xs font-bold text-orange-400 group-hover:underline">
              Ver perfil no Instagram →
            </span>
          </a>
        </section>

        {/* Footer Warning & Legal */}
        <footer className="mt-14 border-t border-zinc-900 pt-8 pb-12 text-center text-xs text-zinc-500 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <img src={logoImg} alt="Adega do Chefe" className="h-8 w-auto opacity-70" />
            <span className="font-display text-lg tracking-wider text-zinc-400 uppercase">
              Adega do <span className="text-orange-500">Chefe</span>
            </span>
          </div>
          <p className="max-w-md mx-auto text-[11px] text-zinc-500">
            Cardápio online exclusivamente informativo para consulta de itens e valores no estabelecimento. 
            Imagens ilustrativas. Preços e disponibilidade sujeitos a alteração sem aviso prévio.
          </p>
          <p className="text-[11px] text-zinc-600">
            🔞 Beba com moderação. Venda e consumo proibidos para menores de 18 anos (Lei Federal 8.069/1990). Se beber, não dirija.
          </p>
        </footer>
      </main>
    </div>
  );
}