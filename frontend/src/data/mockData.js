// Mock data para os slots - ORDENAÇÃO MANUAL FIXA (ESTRATÉGICA)
// A ordem abaixo é INTENCIONAL e parte da estratégia do produto
// NUNCA alterar a sequência - apenas pular jogos que não existem

export const providers = {
  pg: "PG Soft",
  pragmatic: "Pragmatic Play",
  spirit: "Spirit Gaming",
  tada: "Tada Gaming",
  revenge: "Revenge"
};

// Links de cadastro por plataforma - FG JOGO
export const platformLinks = {
  FGJOGO: "https://fgjogo7.com/?ch=230004&ic=140225696#/register"
};

// Imagem da plataforma FG JOGO
export const platformImage = "/assets/slots/platform-main.jpeg";

// ═══════════════════════════════════════════════════════════════════════════════
// ORDENAÇÃO MANUAL FIXA - NÃO ALTERAR A SEQUÊNCIA
// Se um jogo não existir, pular mas NUNCA mudar a ordem dos restantes
// ═══════════════════════════════════════════════════════════════════════════════

// PG SOFT - Ordem estratégica fixa (22 jogos)
const PG_SOFT_ORDER = [
  "Fortune Tiger",
  "Fortune Rabbit", 
  "Fortune Ox",
  "Fortune Mouse",
  "Fortune Dragon",
  "Fortune Snake",
  "Pinata Wins",
  "Double Fortune",
  "Wild Bounty Showdown",
  "Lucky Neko",
  "Wild Bandito",
  "Cocktail Nights",
  "Midas Fortune",
  "Ganesha Gold",
  "Dragon Hatch",
  "Cash Mania",
  "Anubis Wrath",
  "Lucky Piggy",
  "Circus Delight",
  "Dragon Hatch 2",
  "Diner Delights",
  "Forge of Wealth"
];

// PRAGMATIC PLAY - Ordem estratégica fixa
const PRAGMATIC_ORDER = [
  "Gates of Olympus",
  "Sugar Rush",
  "Sweet Bonanza",
  "Gold Party",
  "Big Bass Splash",
  "Gates of Olympus 1000",
  "Sugar Rush 1000",
  "Sweet Bonanza 1000",
  "Big Bass Bonanza 1000",
  "Gates of Olympus Xmas 1000",
  "Starlight Princess 1000",
  "Gates of Olympus Super Scatter",
  "3 Buzzing Wilds",
  "Zeus vs Hades - Gods of War",
  "Power of Merlin Megaways",
  "Big Bass Secrets of the Golden Lake",
  "Big Bass Bonanza",
  "Starlight Princess Super Scatter",
  "Big Bass Bonanza 3 Reeler",
  "Angel vs Sinner",
  "Big Bass Amazon Xtreme",
  "Big Bass Christmas – Frozen Lake",
  "Big Bass - Keeping it Reel",
  "Starlight Princess"
];

// TADA GAMING - Ordem estratégica fixa (jogos principais)
const TADA_ORDER = [
  "Crazy777",
  "Super ACE",
  "Zeus",
  "Money Coming 2",
  "Fortune Gems 2",
  "Golden Empire",
  "Lucky Jaguar 500",
  "Lucky Jaguar 2",
  "Crazy Hunter",
  "Fortune Gems 3",
  "Fortune Hook",
  "Fortune Hook Boom",
  "Lucky Jaguar",
  "Devil Fire Twins",
  "Money Coming Expanded Bets",
  "3 Lucky Piggy",
  "Golden Bank",
  "Fortune Gems 500",
  "Fortune Coins",
  "Fortune Coins 2",
  "3 Coin Treasures",
  "Clover Coins 4x4",
  "Clover Coins 3x3",
  "3 Coin Wild Horse",
  "3 Coin Golden OX",
  "Coin infinity Surge Reel",
  "Devil Fire 2",
  "Devil Fire"
];

// SPIRIT GAMING - Ordem estratégica fixa
const SPIRIT_ORDER = [
  "Tiger Fortune",
  "Rabbit Fortune",
  "Ox Fortune",
  "Mouse Fortune",
  "Wrath of Olympus",
  "Gems Fortune 2",
  "Coming Money",
  "Wild Buffalo",
  "God Of Wealth",
  "Gems Fortune",
  "Merry Christmas",
  "Ice Princess",
  "Carnival",
  "Joker Spin",
  "Wild Lion",
  "Ace Wild"
];

// ═══════════════════════════════════════════════════════════════════════════════
// DADOS DOS JOGOS (com todas as informações)
// ═══════════════════════════════════════════════════════════════════════════════

// PG SOFT GAMES - Dados completos (22 jogos com imagens corretas)
const pgGamesData = {
  "Fortune Tiger": {
    id: 1,
    name: "Fortune Tiger",
    image: "/pg/100402010.jpg",
    bets: ["R$ 0,80", "R$ 1,20", "R$ 4,80"],
    basePayout: 77,
    category: "Fortune",
    provider: "pg"
  },
  "Fortune Rabbit": {
    id: 2,
    name: "Fortune Rabbit",
    image: "/pg/100402089.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 2,50"],
    basePayout: 85,
    category: "Fortune",
    provider: "pg"
  },
  "Fortune Ox": {
    id: 3,
    name: "Fortune Ox",
    image: "/pg/100402059.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 2,50"],
    basePayout: 82,
    category: "Fortune",
    provider: "pg"
  },
  "Fortune Mouse": {
    id: 4,
    name: "Fortune Mouse",
    image: "/pg/100402009.jpg",
    bets: ["R$ 0,50", "R$ 3,50", "R$ 4,00"],
    basePayout: 87,
    category: "Fortune",
    provider: "pg"
  },
  "Fortune Dragon": {
    id: 5,
    name: "Fortune Dragon",
    image: "/pg/100402125.jpg",
    bets: ["R$ 0,50", "R$ 3,50", "R$ 4,00"],
    basePayout: 88,
    category: "Fortune",
    provider: "pg"
  },
  "Fortune Snake": {
    id: 6,
    name: "Fortune Snake",
    image: "/pg/100402146.jpg",
    bets: ["R$ 0,40", "R$ 3,60", "R$ 4,00"],
    basePayout: 85,
    category: "Fortune",
    provider: "pg"
  },
  "Pinata Wins": {
    id: 7,
    name: "Pinata Wins",
    image: "/pg/100402131.jpg",
    bets: ["R$ 0,50", "R$ 3,50", "R$ 4,00"],
    basePayout: 86,
    category: "Party",
    provider: "pg"
  },
  "Double Fortune": {
    id: 8,
    name: "Double Fortune",
    image: "/pg/100402064.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 84,
    category: "Fortune",
    provider: "pg"
  },
  "Wild Bounty Showdown": {
    id: 9,
    name: "Wild Bounty Showdown",
    image: "/pg/100402095.jpg",
    bets: ["R$ 0,40", "R$ 2,00", "R$ 4,00"],
    basePayout: 88,
    category: "Western",
    provider: "pg"
  },
  "Lucky Neko": {
    id: 10,
    name: "Lucky Neko",
    image: "/pg/100402065.jpg",
    bets: ["R$ 0,80", "R$ 1,20", "R$ 2,40"],
    basePayout: 79,
    category: "Asian",
    provider: "pg"
  },
  "Wild Bandito": {
    id: 11,
    name: "Wild Bandito",
    image: "/pg/100402058.jpg",
    bets: ["R$ 0,40", "R$ 3,60", "R$ 4,00"],
    basePayout: 77,
    category: "Western",
    provider: "pg"
  },
  "Cocktail Nights": {
    id: 12,
    name: "Cocktail Nights",
    image: "/pg/100402041.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 83,
    category: "Party",
    provider: "pg"
  },
  "Midas Fortune": {
    id: 13,
    name: "Midas Fortune",
    image: "/pg/100402106.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 86,
    category: "Mythical",
    provider: "pg"
  },
  "Ganesha Gold": {
    id: 14,
    name: "Ganesha Gold",
    image: "/pg/100402012.jpg",
    bets: ["R$ 0,40", "R$ 3,60", "R$ 4,00"],
    basePayout: 85,
    category: "Hindu",
    provider: "pg"
  },
  "Dragon Hatch": {
    id: 15,
    name: "Dragon Hatch",
    image: "/pg/100402056.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 2,50"],
    basePayout: 88,
    category: "Dragon",
    provider: "pg"
  },
  "Cash Mania": {
    id: 16,
    name: "Cash Mania",
    image: "/pg/100402130.jpg",
    bets: ["R$ 0,50", "R$ 3,50", "R$ 4,00"],
    basePayout: 83,
    category: "Money",
    provider: "pg"
  },
  "Anubis Wrath": {
    id: 17,
    name: "Anubis Wrath",
    image: "/pg/100402133.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 87,
    category: "Egyptian",
    provider: "pg"
  },
  "Lucky Piggy": {
    id: 18,
    name: "Lucky Piggy",
    image: "/pg/100402092.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 84,
    category: "Fortune",
    provider: "pg"
  },
  "Circus Delight": {
    id: 19,
    name: "Circus Delight",
    image: "/pg/100402042.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 82,
    category: "Party",
    provider: "pg"
  },
  "Dragon Hatch 2": {
    id: 20,
    name: "Dragon Hatch 2",
    image: "/pg/100402127.jpg",
    bets: ["R$ 0,50", "R$ 3,50", "R$ 4,00"],
    basePayout: 93,
    category: "Dragon",
    provider: "pg"
  },
  "Diner Delights": {
    id: 21,
    name: "Diner Delights",
    image: "/pg/100402091.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 85,
    category: "Food",
    provider: "pg"
  },
  "Forge of Wealth": {
    id: 22,
    name: "Forge of Wealth",
    image: "/pg/100402122.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 89,
    category: "Mythical",
    provider: "pg"
  }
};

// PRAGMATIC PLAY GAMES - Dados completos
const pragmaticGamesData = {
  "Gates of Olympus": {
    id: 16,
    name: "Gates of Olympus",
    image: "/images/pp/Gates of Olympus.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 89,
    category: "Greek",
    provider: "pragmatic"
  },
  "Sugar Rush": {
    id: 15,
    name: "Sugar Rush",
    image: "/images/pp/Sugar Rush.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 87,
    category: "Sweet",
    provider: "pragmatic"
  },
  "Sweet Bonanza": {
    id: 17,
    name: "Sweet Bonanza",
    image: "/images/pp/Sweet Bonanza.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 92,
    category: "Candy",
    provider: "pragmatic"
  },
  "Gates of Olympus 1000": {
    id: 28,
    name: "Gates of Olympus 1000",
    image: "/images/pp/Gates of Olympus 1000.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 92,
    category: "Greek",
    provider: "pragmatic"
  },
  "Sugar Rush 1000": {
    id: 37,
    name: "Sugar Rush 1000",
    image: "/images/pp/Sugar Rush 1000.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 91,
    category: "Sweet",
    provider: "pragmatic"
  },
  "Sweet Bonanza 1000": {
    id: 38,
    name: "Sweet Bonanza 1000",
    image: "/images/pp/Sweet Bonanza 1000.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 95,
    category: "Candy",
    provider: "pragmatic"
  },
  "Big Bass Bonanza": {
    id: 18,
    name: "Big Bass Bonanza",
    image: "/images/pp/Big Bass Bonanza.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 85,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Starlight Princess": {
    id: 14,
    name: "Starlight Princess",
    image: "/images/pp/Starlight Princess.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 94,
    category: "Fantasy",
    provider: "pragmatic"
  },
  "Wild West Duels": {
    id: 11,
    name: "Wild West Duels",
    image: "/assets/slots/wild-west-duels.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 89,
    category: "Western",
    provider: "pragmatic"
  },
  "The Dog House": {
    id: 12,
    name: "The Dog House",
    image: "/assets/slots/sweet-bonanza.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 88,
    category: "Animal",
    provider: "pragmatic"
  },
  "Wolf Gold": {
    id: 13,
    name: "Wolf Gold",
    image: "/assets/slots/wolf-gold.jpg",
    bets: ["R$ 0,25", "R$ 0,50", "R$ 1,00"],
    basePayout: 90,
    category: "Animal",
    provider: "pragmatic"
  },
  "Fruit Party": {
    id: 24,
    name: "Fruit Party",
    image: "/assets/slots/big-bass.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 86,
    category: "Fruit",
    provider: "pragmatic"
  },
  "Madame Destiny Megaways": {
    id: 26,
    name: "Madame Destiny Megaways",
    image: "/assets/slots/triple-jokers.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 87,
    category: "Fortune",
    provider: "pragmatic"
  },
  "O Vira-Lata Caramelo": {
    id: 35,
    name: "O Vira-Lata Caramelo",
    image: "/images/pp/O Vira-Lata Caramelo.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 89,
    category: "Animal",
    provider: "pragmatic"
  },
  "Fire Portals": {
    id: 36,
    name: "Fire Portals",
    image: "/images/pp/Fire Portals.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 94,
    category: "Fantasy",
    provider: "pragmatic"
  },
  "Gold Party": {
    id: 50,
    name: "Gold Party",
    image: "/images/pp/Gold Party.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 88,
    category: "Gold",
    provider: "pragmatic"
  },
  "Big Bass Splash": {
    id: 51,
    name: "Big Bass Splash",
    image: "/images/pp/Big Bass Splash.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 87,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Big Bass Bonanza 1000": {
    id: 52,
    name: "Big Bass Bonanza 1000",
    image: "/images/pp/Big Bass Bonanza 1000.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 91,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Gates of Olympus Xmas 1000": {
    id: 53,
    name: "Gates of Olympus Xmas 1000",
    image: "/images/pp/Gates of Olympus Xmas 1000.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 92,
    category: "Greek",
    provider: "pragmatic"
  },
  "Starlight Princess 1000": {
    id: 54,
    name: "Starlight Princess 1000",
    image: "/images/pp/Starlight Princess 1000.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 94,
    category: "Fantasy",
    provider: "pragmatic"
  },
  "Gates of Olympus Super Scatter": {
    id: 55,
    name: "Gates of Olympus Super Scatter",
    image: "/images/pp/Gates of Olympus Super Scatter.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 93,
    category: "Greek",
    provider: "pragmatic"
  },
  "3 Buzzing Wilds": {
    id: 56,
    name: "3 Buzzing Wilds",
    image: "/images/pp/3 Buzzing Wilds.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 86,
    category: "Animal",
    provider: "pragmatic"
  },
  "Zeus vs Hades - Gods of War": {
    id: 57,
    name: "Zeus vs Hades - Gods of War",
    image: "/images/pp/Zeus vs Hades - Gods of War.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 91,
    category: "Greek",
    provider: "pragmatic"
  },
  "Power of Merlin Megaways": {
    id: 58,
    name: "Power of Merlin Megaways",
    image: "/images/pp/Power of Merlin Megaways.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 89,
    category: "Fantasy",
    provider: "pragmatic"
  },
  "Big Bass Secrets of the Golden Lake": {
    id: 59,
    name: "Big Bass Secrets of the Golden Lake",
    image: "/images/pp/Big Bass Secrets of the Golden Lake.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 88,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Starlight Princess Super Scatter": {
    id: 60,
    name: "Starlight Princess Super Scatter",
    image: "/images/pp/Starlight Princess Super Scatter.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 95,
    category: "Fantasy",
    provider: "pragmatic"
  },
  "Big Bass Bonanza 3 Reeler": {
    id: 61,
    name: "Big Bass Bonanza 3 Reeler",
    image: "/images/pp/Big Bass Bonanza 3 Reeler.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 85,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Angel vs Sinner": {
    id: 62,
    name: "Angel vs Sinner",
    image: "/images/pp/Angel vs Sinner.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 90,
    category: "Fantasy",
    provider: "pragmatic"
  },
  "Big Bass Amazon Xtreme": {
    id: 63,
    name: "Big Bass Amazon Xtreme",
    image: "/images/pp/Big Bass Amazon Xtreme.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 87,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Big Bass Christmas – Frozen Lake": {
    id: 64,
    name: "Big Bass Christmas – Frozen Lake",
    image: "/images/pp/Big Bass Christmas – Frozen Lake.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 86,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Big Bass - Keeping it Reel": {
    id: 65,
    name: "Big Bass - Keeping it Reel",
    image: "/images/pp/Big Bass - Keeping it Reel.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 88,
    category: "Fishing",
    provider: "pragmatic"
  }
};

// TADA GAMING - Dados completos (50 jogos)
const tadaGamesData = {
  "Crazy777": {
    id: 200,
    name: "Crazy777",
    image: "/images/tada/Crazy777.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 88,
    category: "Classic",
    provider: "tada"
  },
  "Jackpot Fishing": {
    id: 201,
    name: "Jackpot Fishing",
    image: "/images/tada/Jackpot Fishing.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 85,
    category: "Fishing",
    provider: "tada"
  },
  "Bombing fishing": {
    id: 202,
    name: "Bombing fishing",
    image: "/images/tada/Bombing fishing.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 86,
    category: "Fishing",
    provider: "tada"
  },
  "Super ACE": {
    id: 203,
    name: "Super ACE",
    image: "/images/tada/Super ACE.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 90,
    category: "Cards",
    provider: "tada"
  },
  "Zeus": {
    id: 204,
    name: "Zeus",
    image: "/images/tada/Zeus.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 89,
    category: "Greek",
    provider: "tada"
  },
  "Money Coming 2": {
    id: 205,
    name: "Money Coming 2",
    image: "/images/tada/Money Coming 2.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 91,
    category: "Money",
    provider: "tada"
  },
  "Fortune Gems 2": {
    id: 206,
    name: "Fortune Gems 2",
    image: "/images/tada/Fortune Gems 2.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 88,
    category: "Gems",
    provider: "tada"
  },
  "Golden Empire": {
    id: 207,
    name: "Golden Empire",
    image: "/images/tada/Golden Empire.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 87,
    category: "Gold",
    provider: "tada"
  },
  "Lucky Jaguar 500": {
    id: 208,
    name: "Lucky Jaguar 500",
    image: "/images/tada/Lucky Jaguar 500.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 92,
    category: "Animal",
    provider: "tada"
  },
  "Lucky Jaguar 2": {
    id: 209,
    name: "Lucky Jaguar 2",
    image: "/images/tada/Lucky Jaguar 2.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 89,
    category: "Animal",
    provider: "tada"
  },
  "Crazy Hunter": {
    id: 210,
    name: "Crazy Hunter",
    image: "/images/tada/Crazy Hunter.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 86,
    category: "Action",
    provider: "tada"
  },
  "Fortune Gems 3": {
    id: 211,
    name: "Fortune Gems 3",
    image: "/images/tada/Fortune Gems 3.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 87,
    category: "Gems",
    provider: "tada"
  },
  "Fortune Hook": {
    id: 212,
    name: "Fortune Hook",
    image: "/images/tada/Fortune Hook.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 88,
    category: "Fishing",
    provider: "tada"
  },
  "Fortune Hook Boom": {
    id: 213,
    name: "Fortune Hook Boom",
    image: "/images/tada/Fortune Hook Boom.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 90,
    category: "Fishing",
    provider: "tada"
  },
  "Lucky Jaguar": {
    id: 214,
    name: "Lucky Jaguar",
    image: "/images/tada/Lucky Jaguar.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 85,
    category: "Animal",
    provider: "tada"
  },
  "Devil Fire Twins": {
    id: 215,
    name: "Devil Fire Twins",
    image: "/images/tada/Devil Fire Twins.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 89,
    category: "Fire",
    provider: "tada"
  },
  "Money Coming Expanded Bets": {
    id: 216,
    name: "Money Coming Expanded Bets",
    image: "/images/tada/Money Coming Expanded Bets.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 91,
    category: "Money",
    provider: "tada"
  },
  "3 Lucky Piggy": {
    id: 217,
    name: "3 Lucky Piggy",
    image: "/images/tada/3 Lucky Piggy.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 86,
    category: "Animal",
    provider: "tada"
  },
  "Golden Bank": {
    id: 218,
    name: "Golden Bank",
    image: "/images/tada/Golden Bank.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 88,
    category: "Gold",
    provider: "tada"
  },
  "Fortune Gems 500": {
    id: 219,
    name: "Fortune Gems 500",
    image: "/images/tada/Fortune Gems 500.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 92,
    category: "Gems",
    provider: "tada"
  },
  "Devil Fire 2": {
    id: 220,
    name: "Devil Fire 2",
    image: "/images/tada/Devil Fire 2.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 87,
    category: "Fire",
    provider: "tada"
  },
  "3 Coin Treasures": {
    id: 221,
    name: "3 Coin Treasures",
    image: "/images/tada/3 Coin Treasures.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 89,
    category: "Coins",
    provider: "tada"
  },
  "Devil Fire": {
    id: 222,
    name: "Devil Fire",
    image: "/images/tada/Devil Fire.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 85,
    category: "Fire",
    provider: "tada"
  },
  "Fortune Coins": {
    id: 228,
    name: "Fortune Coins",
    image: "/images/tada/Fortune Coins.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 86,
    category: "Coins",
    provider: "tada"
  },
  "Clover Coins 4x4": {
    id: 231,
    name: "Clover Coins 4x4",
    image: "/images/tada/Clover Coins 4x4.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 89,
    category: "Coins",
    provider: "tada"
  },
  "Fortune Coins 2": {
    id: 232,
    name: "Fortune Coins 2",
    image: "/images/tada/Fortune Coins 2.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 88,
    category: "Coins",
    provider: "tada"
  },
  "3 Coin Wild Horse": {
    id: 235,
    name: "3 Coin Wild Horse",
    image: "/images/tada/3 Coin Wild Horse.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 88,
    category: "Coins",
    provider: "tada"
  },
  "Clover Coins 3x3": {
    id: 240,
    name: "Clover Coins 3x3",
    image: "/images/tada/Clover Coins 3x3.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 88,
    category: "Coins",
    provider: "tada"
  },
  "3 Coin Golden OX": {
    id: 242,
    name: "3 Coin Golden OX",
    image: "/images/tada/3 Coin Golden OX.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 89,
    category: "Coins",
    provider: "tada"
  },
  "Coin infinity Surge Reel": {
    id: 243,
    name: "Coin infinity Surge Reel",
    image: "/images/tada/Coin infinity Surge Reel.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 91,
    category: "Coins",
    provider: "tada"
  }
};

// SPIRIT GAMING - Dados completos
const spiritGamesData = {
  "Tiger Fortune": {
    id: 100,
    name: "Tiger Fortune",
    image: "/spirit/103802003.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 88,
    category: "Fortune",
    provider: "spirit"
  },
  "Rabbit Fortune": {
    id: 101,
    name: "Rabbit Fortune",
    image: "/spirit/103802009.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 86,
    category: "Fortune",
    provider: "spirit"
  },
  "Ox Fortune": {
    id: 102,
    name: "Ox Fortune",
    image: "/spirit/103802004.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 85,
    category: "Fortune",
    provider: "spirit"
  },
  "Mouse Fortune": {
    id: 103,
    name: "Mouse Fortune",
    image: "/spirit/103802010.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 84,
    category: "Fortune",
    provider: "spirit"
  },
  "Wrath of Olympus": {
    id: 104,
    name: "Wrath of Olympus",
    image: "/spirit/103802005.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 90,
    category: "Greek",
    provider: "spirit"
  },
  "Gems Fortune 2": {
    id: 105,
    name: "Gems Fortune 2",
    image: "/spirit/103802036.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 87,
    category: "Gems",
    provider: "spirit"
  },
  "Coming Money": {
    id: 106,
    name: "Coming Money",
    image: "/spirit/103802035.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 83,
    category: "Money",
    provider: "spirit"
  },
  "Wild Buffalo": {
    id: 107,
    name: "Wild Buffalo",
    image: "/spirit/103802012.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 86,
    category: "Animal",
    provider: "spirit"
  },
  "God Of Wealth": {
    id: 108,
    name: "God Of Wealth",
    image: "/spirit/103802037.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 89,
    category: "Asian",
    provider: "spirit"
  },
  "Gems Fortune": {
    id: 109,
    name: "Gems Fortune",
    image: "/spirit/103802032.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 85,
    category: "Gems",
    provider: "spirit"
  },
  "Merry Christmas": {
    id: 110,
    name: "Merry Christmas",
    image: "/spirit/103802007.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 82,
    category: "Holiday",
    provider: "spirit"
  },
  "Ice Princess": {
    id: 111,
    name: "Ice Princess",
    image: "/spirit/103802001.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 84,
    category: "Fantasy",
    provider: "spirit"
  },
  "Carnival": {
    id: 112,
    name: "Carnival",
    image: "/spirit/103802008.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 81,
    category: "Party",
    provider: "spirit"
  },
  "Joker Spin": {
    id: 113,
    name: "Joker Spin",
    image: "/spirit/103802011.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 80,
    category: "Classic",
    provider: "spirit"
  },
  "Wild Lion": {
    id: 114,
    name: "Wild Lion",
    image: "/spirit/103802002.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 85,
    category: "Animal",
    provider: "spirit"
  },
  "Ace Wild": {
    id: 115,
    name: "Ace Wild",
    image: "/spirit/103802034.jpg",
    bets: ["R$ 0,50", "R$ 1,50", "R$ 3,00"],
    basePayout: 83,
    category: "Classic",
    provider: "spirit"
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// FUNÇÃO PARA ORDENAR JOGOS NA SEQUÊNCIA FIXA
// ═══════════════════════════════════════════════════════════════════════════════

function getOrderedGames(orderList, gamesData) {
  const orderedGames = [];
  
  // Percorrer a lista de ordem fixa
  for (const gameName of orderList) {
    if (gamesData[gameName]) {
      orderedGames.push(gamesData[gameName]);
    }
    // Se o jogo não existir, simplesmente pula (não altera a sequência)
  }
  
  // Adicionar jogos extras que não estão na lista de ordem (no final)
  for (const gameName of Object.keys(gamesData)) {
    if (!orderList.includes(gameName)) {
      orderedGames.push(gamesData[gameName]);
    }
  }
  
  return orderedGames;
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTAR DADOS ORDENADOS
// ═══════════════════════════════════════════════════════════════════════════════

export const slotsData = {
  pg: getOrderedGames(PG_SOFT_ORDER, pgGamesData),
  pragmatic: getOrderedGames(PRAGMATIC_ORDER, pragmaticGamesData),
  spirit: getOrderedGames(SPIRIT_ORDER, spiritGamesData),
  tada: getOrderedGames(TADA_ORDER, tadaGamesData),
  revenge: [] // Em breve
};

// Provider ranking priority (ordem de exibição)
export const providerRankingOrder = [
  { id: 'pg', name: 'PG Soft', rank: 1 },
  { id: 'pragmatic', name: 'Pragmatic Play', rank: 2 },
  { id: 'tada', name: 'Tada Gaming', rank: 3 },
  { id: 'spirit', name: 'Spirit Gaming', rank: 4 },
  { id: 'revenge', name: 'Revenge', rank: 5 }
];

// Função para gerar payout dinâmico
export const generateDynamicPayout = (basePayout) => {
  const variation = Math.random() * 42 + 55; // 55% a 97%
  return Math.round(variation);
};

// Função para gerar sinal do slot
export const generateSignal = (slot) => {
  // Pegar horário atual local da pessoa
  const now = new Date();
  
  // Gerar janela EXATAMENTE 3 MINUTOS depois de gerar o sinal
  const signalTime = new Date(now.getTime() + 3 * 60000); // Exatos 3 minutos
  
  // Janela dura APENAS 5 MINUTOS (não 15)
  const endTime = new Date(signalTime.getTime() + 5 * 60000); // 5 minutos de duração
  
  // Escolher aposta aleatória entre as 3 disponíveis
  const randomBetIndex = Math.floor(Math.random() * slot.bets.length);
  const selectedBet = slot.bets[randomBetIndex];
  
  const modes = ['Normal', 'Turbo'];
  const selectedMode = modes[Math.floor(Math.random() * modes.length)];
  
  // Calcular confiança baseada no RTP base do slot
  const baseConfidence = slot.basePayout;
  const confidenceVariation = Math.random() * 20 - 10; // -10 a +10
  const confidence = Math.max(60, Math.min(99, baseConfidence + confidenceVariation));

  return {
    id: Date.now(),
    slotId: slot.id,
    slotName: slot.name,
    timeWindow: {
      start: signalTime.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }),
      end: endTime.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      })
    },
    mode: selectedMode,
    recommendedBet: selectedBet,
    confidence: Math.round(confidence),
    generatedAt: now.getTime()
  };
};

// Função para verificar cooldown (10 minutos)
export const checkCooldown = (lastGenerationTime) => {
  const now = Date.now();
  const cooldownTime = 10 * 60 * 1000; // 10 minutos em ms
  const timePassed = now - lastGenerationTime;
  
  if (timePassed >= cooldownTime) {
    return { canGenerate: true, remainingTime: 0 };
  } else {
    return { 
      canGenerate: false, 
      remainingTime: cooldownTime - timePassed 
    };
  }
};

// Função para formatar tempo restante
export const formatRemainingTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
