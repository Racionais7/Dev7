// Mock data para os slots - ORDENAÇÃO MANUAL FIXA (ESTRATÉGICA)
// A ordem abaixo é INTENCIONAL e parte da estratégia do produto
// NUNCA alterar a sequência - apenas pular jogos que não existem

export const providers = {
  pg: "PG Soft",
  pragmatic: "Pragmatic Play",
  spirit: "Spirit Gaming",
  tada: "Tada Gaming",
  revenge: "Revenge",
  fachai: "FA CHAI",
  jdb: "JDB"
};

// Links de cadastro por plataforma
export const platformLinks = {
  FGJOGO: "https://fgjogo7.com/?ch=230004&ic=140225696#/register",
  HGJOGO: "https://hgjogo7.com/en/?ch=110006&ic=140396339#/register"
};

// Imagem da plataforma FG JOGO
export const platformImage = "/assets/slots/platform-main.jpeg";

// ═══════════════════════════════════════════════════════════════════════════════
// ORDENAÇÃO MANUAL FIXA - NÃO ALTERAR A SEQUÊNCIA
// Se um jogo não existir, pular mas NUNCA mudar a ordem dos restantes
// ═══════════════════════════════════════════════════════════════════════════════

// PG SOFT - Ordem estratégica fixa (40 jogos totais)
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
  "Forge of Wealth",
  "Cruise Royale",
  "Crypto Gold",
  "Dead Man's Riches",
  "Flirting Scholar",
  "Forbidden Alchemy",
  "Kraken Gold Rush",
  "Legend of Hou Yi",
  "Legend of Perseus",
  "Legendary Monkey King",
  "Secrets of Cleopatra",
  "Shaolin Soccer",
  "Wings of Iguazu",
  "Yakuza Honor",
  "Zombie Outbreak",
  "Rio Fantasia",
  "Shark Bounty",
  "Oishi Delights",
  "Plushie Frenzy",
  "Museum Mystery"
];

// PRAGMATIC PLAY - Ordem estratégica fixa (50 jogos completos)
const PRAGMATIC_ORDER = [
  "Gates of Olympus",
  "Sweet Bonanza",
  "Sugar Rush",
  "Starlight Princess",
  "Big Bass Bonanza",
  "Gates of Olympus 1000",
  "Sweet Bonanza 1000",
  "Sugar Rush 1000",
  "Starlight Princess 1000",
  "Big Bass Bonanza 1000",
  "Gates of Olympus Super Scatter",
  "Sweet Bonanza Super Scatter",
  "Starlight Princess Super Scatter",
  "Gates of Olympus Xmas 1000",
  "Sweet Bonanza Xmas",
  "Zeus vs Hades - Gods of War",
  "Big Bass Splash",
  "Bigger Bass Bonanza",
  "Bigger Bass Splash",
  "Big Bass Secrets of the Golden Lake",
  "Big Bass Amazon Xtreme",
  "Big Bass - Keeping it Reel",
  "Big Bass Christmas – Frozen Lake",
  "Big Bass Floats My Boat",
  "Big Bass Mission Fishin",
  "Big Bass Reel Repeat",
  "Big Bass Xmas Xtreme",
  "Big Bass Vegas Double Down Deluxe",
  "Big Bass Bonanza 3 Reeler",
  "Big Bass Halloween 3",
  "Christmas Big Bass Bonanza",
  "Bigger Bass Blizzard - Christmas Catch",
  "Power of Merlin Megaways",
  "5 Lions Megaways",
  "5 Lions Megaways™ 2",
  "Gold Party",
  "Fortune of Olympus",
  "Gates of Hades",
  "Spirit of Adventure",
  "The Hand of Midas",
  "Fire Portals",
  "3 Buzzing Wilds",
  "Bee Keeper",
  "Angel vs Sinner",
  "Vampy Party",
  "Fangtastic Freespins",
  "Octobeer Fortunes",
  "O Vira-Lata Caramelo",
  "3 Dancing Monkeys",
  "8 Dragons",
  "8 Golden Dragon Challenge",
  "Argonauts",
  "Asgard",
  "Aztec Blaze",
  "Ghosts of Cai Shen 2",
  "Chicken Chase",
  "Chicken Drop",
  "Chilli Heat",
  "Chilli Heat Megaways",
  "Chilli Heat Spicy Spins",
  "Peppe's Pepperoni Pizza Plaza"
];

// TADA GAMING - Ordem estratégica fixa (jogos principais)
const TADA_ORDER = [
  "Crazy777",
  "Super ACE",
  "Zeus",
  "Money Coming 2",
  "Fortune Gems 2",
  "Golden Empire",
  "Lucky Coming",
  "Lucky Doggy",
  "Lucky Goldbricks",
  "Lucky Jaguar",
  "Lucky Jaguar 2",
  "Lucky Jaguar 500",
  "Lucky Macaw",
  "Magic Lamp",
  "Mayan Empire",
  "Medusa",
  "Mega Ace",
  "3 Lucky Baozhu",
  "Agent Ace",
  "Bubble Beauty",
  "Crazy Hunter",
  "Fortune Gems 3",
  "Fortune Hook",
  "Fortune Hook Boom",
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

// PG SOFT GAMES - Dados completos (22 jogos originais)
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
  },
  "Cruise Royale": {
    id: 23,
    name: "Cruise Royale",
    image: "/pg/Cruise Royale.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 88,
    category: "Luxury",
    provider: "pg"
  },
  "Crypto Gold": {
    id: 24,
    name: "Crypto Gold",
    image: "/pg/Crypto Gold.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 89,
    category: "Crypto",
    provider: "pg"
  },
  "Dead Man's Riches": {
    id: 25,
    name: "Dead Man's Riches",
    image: "/pg/Dead Man's Riches.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 87,
    category: "Pirate",
    provider: "pg"
  },
  "Flirting Scholar": {
    id: 26,
    name: "Flirting Scholar",
    image: "/pg/Flirting Scholar.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 92,
    category: "Asian",
    provider: "pg"
  },
  "Forbidden Alchemy": {
    id: 27,
    name: "Forbidden Alchemy",
    image: "/pg/Forbidden Alchemy.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 91,
    category: "Magic",
    provider: "pg"
  },
  "Kraken Gold Rush": {
    id: 28,
    name: "Kraken Gold Rush",
    image: "/pg/Kraken Gold Rush.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 90,
    category: "Ocean",
    provider: "pg"
  },
  "Legend of Hou Yi": {
    id: 29,
    name: "Legend of Hou Yi",
    image: "/pg/Legend of Hou Yi.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 93,
    category: "Asian",
    provider: "pg"
  },
  "Legend of Perseus": {
    id: 30,
    name: "Legend of Perseus",
    image: "/pg/Legend of Perseus.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 91,
    category: "Greek",
    provider: "pg"
  },
  "Legendary Monkey King": {
    id: 31,
    name: "Legendary Monkey King",
    image: "/pg/Legendary Monkey King.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 94,
    category: "Asian",
    provider: "pg"
  },
  "Secrets of Cleopatra": {
    id: 32,
    name: "Secrets of Cleopatra",
    image: "/pg/Secrets of Cleopatra.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 95,
    category: "Egyptian",
    provider: "pg"
  },
  "Shaolin Soccer": {
    id: 33,
    name: "Shaolin Soccer",
    image: "/pg/Shaolin Soccer.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 88,
    category: "Sports",
    provider: "pg"
  },
  "Wings of Iguazu": {
    id: 34,
    name: "Wings of Iguazu",
    image: "/pg/Wings of Iguazu.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 92,
    category: "Nature",
    provider: "pg"
  },
  "Yakuza Honor": {
    id: 35,
    name: "Yakuza Honor",
    image: "/pg/Yakuza Honor.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 93,
    category: "Asian",
    provider: "pg"
  },
  "Zombie Outbreak": {
    id: 36,
    name: "Zombie Outbreak",
    image: "/pg/Zombie Outbreak.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 91,
    category: "Horror",
    provider: "pg"
  },
  "Rio Fantasia": {
    id: 37,
    name: "Rio Fantasia",
    image: "/pg/Rio Fantasia.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 92,
    category: "Carnival",
    provider: "pg"
  },
  "Shark Bounty": {
    id: 38,
    name: "Shark Bounty",
    image: "/pg/Shark Bounty.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 90,
    category: "Fishing",
    provider: "pg"
  },
  "Oishi Delights": {
    id: 39,
    name: "Oishi Delights",
    image: "/pg/Oishi Delights.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 88,
    category: "Food",
    provider: "pg"
  },
  "Plushie Frenzy": {
    id: 40,
    name: "Plushie Frenzy",
    image: "/pg/Plushie Frenzy.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 89,
    category: "Cute",
    provider: "pg"
  },
  "Museum Mystery": {
    id: 41,
    name: "Museum Mystery",
    image: "/pg/Museum Mystery.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 94,
    category: "Mystery",
    provider: "pg"
  },
  "Alchemy Gold": {
    id: 42,
    name: "Alchemy Gold",
    image: "/pg/Alchemy Gold.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 90,
    category: "Magic",
    provider: "pg"
  },
  "Alibaba's Cave of Fortune": {
    id: 43,
    name: "Alibaba's Cave of Fortune",
    image: "/pg/Alibaba's Cave of Fortune.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 91,
    category: "Adventure",
    provider: "pg"
  },
  "Asgardian Rising": {
    id: 44,
    name: "Asgardian Rising",
    image: "/pg/Asgardian Rising.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 93,
    category: "Norse",
    provider: "pg"
  },
  "Bakery Bonanza": {
    id: 45,
    name: "Bakery Bonanza",
    image: "/pg/Bakery Bonanza.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 88,
    category: "Food",
    provider: "pg"
  },
  "Bali Vacation": {
    id: 46,
    name: "Bali Vacation",
    image: "/pg/Bali Vacation.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 89,
    category: "Travel",
    provider: "pg"
  },
  "Battleground Royale": {
    id: 47,
    name: "Battleground Royale",
    image: "/pg/Battleground Royale.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 90,
    category: "Action",
    provider: "pg"
  },
  "Bikini Paradise": {
    id: 48,
    name: "Bikini Paradise",
    image: "/pg/Bikini Paradise.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 87,
    category: "Beach",
    provider: "pg"
  },
  "Buffalo Win": {
    id: 49,
    name: "Buffalo Win",
    image: "/pg/Buffalo Win.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 88,
    category: "Animal",
    provider: "pg"
  },
  "Butterfly Blossom": {
    id: 50,
    name: "Butterfly Blossom",
    image: "/pg/Butterfly Blossom.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 89,
    category: "Nature",
    provider: "pg"
  },
  "Caishen Wins": {
    id: 51,
    name: "Caishen Wins",
    image: "/pg/Caishen Wins.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 91,
    category: "Asian",
    provider: "pg"
  },
  "Candy Bonanza": {
    id: 52,
    name: "Candy Bonanza",
    image: "/pg/Candy Bonanza.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 86,
    category: "Sweet",
    provider: "pg"
  },
  "Candy Burst": {
    id: 53,
    name: "Candy Burst",
    image: "/pg/Candy Burst.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 88,
    category: "Sweet",
    provider: "pg"
  },
  "Captain's Bounty": {
    id: 54,
    name: "Captain's Bounty",
    image: "/pg/Captain's Bounty.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 90,
    category: "Pirate",
    provider: "pg"
  },
  "Chocolate Deluxe": {
    id: 55,
    name: "Chocolate Deluxe",
    image: "/pg/Chocolate Deluxe.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 89,
    category: "Sweet",
    provider: "pg"
  },
  "Doomsday Rampage": {
    id: 56,
    name: "Doomsday Rampage",
    image: "/pg/Doomsday Rampage.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 92,
    category: "Action",
    provider: "pg"
  },
  "Diner Frenzy": {
    id: 57,
    name: "Diner Frenzy",
    image: "/pg/Diner Frenzy.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 87,
    category: "Food",
    provider: "pg"
  },
  "Inferno Mayhem": {
    id: 58,
    name: "Inferno Mayhem",
    image: "/pg/Inferno Mayhem.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 91,
    category: "Action",
    provider: "pg"
  },
  "Jack Frost's Winter": {
    id: 59,
    name: "Jack Frost's Winter",
    image: "/pg/Jack Frost's Winter.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 88,
    category: "Winter",
    provider: "pg"
  },
  "Jack the Giant Hunter": {
    id: 60,
    name: "Jack the Giant Hunter",
    image: "/pg/Jack the Giant Hunter.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 90,
    category: "Adventure",
    provider: "pg"
  },
  "Jewels of Prosperity": {
    id: 61,
    name: "Jewels of Prosperity",
    image: "/pg/Jewels of Prosperity.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 89,
    category: "Treasure",
    provider: "pg"
  },
  "Journey to the Wealth": {
    id: 62,
    name: "Journey to the Wealth",
    image: "/pg/Journey to the Wealth.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 92,
    category: "Adventure",
    provider: "pg"
  },
  "Jungle Delight": {
    id: 63,
    name: "Jungle Delight",
    image: "/pg/Jungle Delight.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 87,
    category: "Jungle",
    provider: "pg"
  },
  "Jurassic Kingdom": {
    id: 64,
    name: "Jurassic Kingdom",
    image: "/pg/Jurassic Kingdom.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 90,
    category: "Dinosaur",
    provider: "pg"
  },
  "Knockout Riches": {
    id: 65,
    name: "Knockout Riches",
    image: "/pg/Knockout Riches.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 88,
    category: "Sports",
    provider: "pg"
  },
  "Leprechaun Riches": {
    id: 66,
    name: "Leprechaun Riches",
    image: "/pg/Leprechaun Riches.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 91,
    category: "Irish",
    provider: "pg"
  },
  "Lucky Clover Lady": {
    id: 67,
    name: "Lucky Clover Lady",
    image: "/pg/Lucky Clover Lady.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 89,
    category: "Irish",
    provider: "pg"
  }
};

// PRAGMATIC PLAY GAMES - Dados completos (50 jogos)
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
  },
  "Sweet Bonanza Super Scatter": {
    id: 66,
    name: "Sweet Bonanza Super Scatter",
    image: "/images/pp/Sweet Bonanza Super Scatter.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 93,
    category: "Candy",
    provider: "pragmatic"
  },
  "Sweet Bonanza Xmas": {
    id: 67,
    name: "Sweet Bonanza Xmas",
    image: "/images/pp/Sweet Bonanza Xmas.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 91,
    category: "Candy",
    provider: "pragmatic"
  },
  "Bigger Bass Bonanza": {
    id: 68,
    name: "Bigger Bass Bonanza",
    image: "/images/pp/Bigger Bass Bonanza.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 89,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Bigger Bass Splash": {
    id: 69,
    name: "Bigger Bass Splash",
    image: "/images/pp/Bigger Bass Splash.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 88,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Big Bass Floats My Boat": {
    id: 70,
    name: "Big Bass Floats My Boat",
    image: "/images/pp/Big Bass Floats My Boat.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 86,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Big Bass Mission Fishin": {
    id: 71,
    name: "Big Bass Mission Fishin",
    image: "/images/pp/Big Bass Mission Fishin.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 87,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Big Bass Reel Repeat": {
    id: 72,
    name: "Big Bass Reel Repeat",
    image: "/images/pp/Big Bass Reel Repeat.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 85,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Big Bass Xmas Xtreme": {
    id: 73,
    name: "Big Bass Xmas Xtreme",
    image: "/images/pp/Big Bass Xmas Xtreme.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 88,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Big Bass Vegas Double Down Deluxe": {
    id: 74,
    name: "Big Bass Vegas Double Down Deluxe",
    image: "/images/pp/Big Bass Vegas Double Down Deluxe.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 90,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Big Bass Halloween 3": {
    id: 75,
    name: "Big Bass Halloween 3",
    image: "/images/pp/Big Bass Halloween 3.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 87,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Christmas Big Bass Bonanza": {
    id: 76,
    name: "Christmas Big Bass Bonanza",
    image: "/images/pp/Christmas Big Bass Bonanza.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 86,
    category: "Fishing",
    provider: "pragmatic"
  },
  "Bigger Bass Blizzard - Christmas Catch": {
    id: 77,
    name: "Bigger Bass Blizzard - Christmas Catch",
    image: "/images/pp/Bigger Bass Blizzard - Christmas Catch.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 89,
    category: "Fishing",
    provider: "pragmatic"
  },
  "5 Lions Megaways": {
    id: 78,
    name: "5 Lions Megaways",
    image: "/images/pp/5 Lions Megaways.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 88,
    category: "Asian",
    provider: "pragmatic"
  },
  "5 Lions Megaways™ 2": {
    id: 79,
    name: "5 Lions Megaways™ 2",
    image: "/images/pp/5 Lions Megaways™ 2.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 89,
    category: "Asian",
    provider: "pragmatic"
  },
  "Fortune of Olympus": {
    id: 80,
    name: "Fortune of Olympus",
    image: "/images/pp/Fortune of Olympus.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 90,
    category: "Greek",
    provider: "pragmatic"
  },
  "Gates of Hades": {
    id: 81,
    name: "Gates of Hades",
    image: "/images/pp/Gates of Hades.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 91,
    category: "Greek",
    provider: "pragmatic"
  },
  "Spirit of Adventure": {
    id: 82,
    name: "Spirit of Adventure",
    image: "/images/pp/Spirit of Adventure.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 86,
    category: "Adventure",
    provider: "pragmatic"
  },
  "The Hand of Midas": {
    id: 83,
    name: "The Hand of Midas",
    image: "/images/pp/The Hand of Midas.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 92,
    category: "Greek",
    provider: "pragmatic"
  },
  "Bee Keeper": {
    id: 85,
    name: "Bee Keeper",
    image: "/images/pp/Bee Keeper.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 85,
    category: "Nature",
    provider: "pragmatic"
  },
  "Vampy Party": {
    id: 86,
    name: "Vampy Party",
    image: "/images/pp/Vampy Party.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 87,
    category: "Halloween",
    provider: "pragmatic"
  },
  "Fangtastic Freespins": {
    id: 87,
    name: "Fangtastic Freespins",
    image: "/images/pp/Fangtastic Freespins.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 86,
    category: "Halloween",
    provider: "pragmatic"
  },
  "Octobeer Fortunes": {
    id: 88,
    name: "Octobeer Fortunes",
    image: "/images/pp/Octobeer Fortunes.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 88,
    category: "Festival",
    provider: "pragmatic"
  },
  "Peppe's Pepperoni Pizza Plaza": {
    id: 89,
    name: "Peppe's Pepperoni Pizza Plaza",
    image: "/images/pp/Peppe's Pepperoni Pizza Plaza.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 84,
    category: "Food",
    provider: "pragmatic"
  },
  "Ghosts of Cai Shen 2": {
    id: 96,
    name: "Ghosts of Cai Shen 2",
    image: "/images/pp/Ghosts of Cai Shen 2.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 94,
    category: "Asian",
    provider: "pragmatic"
  },
  "Chicken Chase": {
    id: 97,
    name: "Chicken Chase",
    image: "/images/pp/Chicken Chase.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 88,
    category: "Animal",
    provider: "pragmatic"
  },
  "Chicken Drop": {
    id: 98,
    name: "Chicken Drop",
    image: "/images/pp/Chicken Drop.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 96,
    category: "Animal",
    provider: "pragmatic"
  },
  "Chilli Heat": {
    id: 99,
    name: "Chilli Heat",
    image: "/images/pp/Chilli Heat.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 95,
    category: "Mexican",
    provider: "pragmatic"
  },
  "Chilli Heat Megaways": {
    id: 100,
    name: "Chilli Heat Megaways",
    image: "/images/pp/Chilli Heat Megaways.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 96,
    category: "Mexican",
    provider: "pragmatic"
  },
  "Chilli Heat Spicy Spins": {
    id: 101,
    name: "Chilli Heat Spicy Spins",
    image: "/images/pp/Chilli Heat Spicy Spins.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 95,
    category: "Mexican",
    provider: "pragmatic"
  },
  "3 Dancing Monkeys": {
    id: 90,
    name: "3 Dancing Monkeys",
    image: "/images/pp/3 Dancing Monkeys.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 96,
    category: "Animal",
    provider: "pragmatic"
  },
  "8 Dragons": {
    id: 91,
    name: "8 Dragons",
    image: "/images/pp/8 Dragons.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 95,
    category: "Dragon",
    provider: "pragmatic"
  },
  "8 Golden Dragon Challenge": {
    id: 92,
    name: "8 Golden Dragon Challenge",
    image: "/images/pp/8 Golden Dragon Challenge.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 96,
    category: "Dragon",
    provider: "pragmatic"
  },
  "Argonauts": {
    id: 93,
    name: "Argonauts",
    image: "/images/pp/Argonauts.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 95,
    category: "Greek",
    provider: "pragmatic"
  },
  "Asgard": {
    id: 94,
    name: "Asgard",
    image: "/images/pp/Asgard.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 96,
    category: "Norse",
    provider: "pragmatic"
  },
  "Aztec Blaze": {
    id: 95,
    name: "Aztec Blaze",
    image: "/images/pp/Aztec Blaze.jpg",
    bets: ["R$ 0,20", "R$ 0,40", "R$ 1,00"],
    basePayout: 95,
    category: "Aztec",
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
  "Lucky Coming": {
    id: 250,
    name: "Lucky Coming",
    image: "/images/tada/Lucky Coming.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 91,
    category: "Fortune",
    provider: "tada"
  },
  "Lucky Doggy": {
    id: 251,
    name: "Lucky Doggy",
    image: "/images/tada/Lucky Doggy.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 88,
    category: "Animal",
    provider: "tada"
  },
  "Lucky Goldbricks": {
    id: 252,
    name: "Lucky Goldbricks",
    image: "/images/tada/Lucky Goldbricks.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 90,
    category: "Gold",
    provider: "tada"
  },
  "Lucky Macaw": {
    id: 253,
    name: "Lucky Macaw",
    image: "/images/tada/Lucky Macaw.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 87,
    category: "Animal",
    provider: "tada"
  },
  "Magic Lamp": {
    id: 254,
    name: "Magic Lamp",
    image: "/images/tada/Magic Lamp.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 92,
    category: "Fantasy",
    provider: "tada"
  },
  "Mayan Empire": {
    id: 255,
    name: "Mayan Empire",
    image: "/images/tada/Mayan Empire.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 89,
    category: "Ancient",
    provider: "tada"
  },
  "Medusa": {
    id: 256,
    name: "Medusa",
    image: "/images/tada/Medusa.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 93,
    category: "Greek",
    provider: "tada"
  },
  "Mega Ace": {
    id: 257,
    name: "Mega Ace",
    image: "/images/tada/Mega Ace.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 91,
    category: "Cards",
    provider: "tada"
  },
  "3 Lucky Baozhu": {
    id: 258,
    name: "3 Lucky Baozhu",
    image: "/images/tada/3 Lucky Baozhu.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 94,
    category: "Asian",
    provider: "tada"
  },
  "Agent Ace": {
    id: 259,
    name: "Agent Ace",
    image: "/images/tada/Agent Ace.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 88,
    category: "Action",
    provider: "tada"
  },
  "Bubble Beauty": {
    id: 260,
    name: "Bubble Beauty",
    image: "/images/tada/Bubble Beauty.jpg",
    bets: ["R$ 0,20", "R$ 0,50", "R$ 1,00"],
    basePayout: 86,
    category: "Fantasy",
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

// REVENGE - Ordem estratégica fixa (12 jogos)
const REVENGE_ORDER = [
  "Fortune Mouse 2",
  "Treasures of Aztec Rewind",
  "Fortune Tiger 2",
  "Super Dragon Hatch",
  "Fortune Dragon 2",
  "Dragon Hatch Reborn",
  "Fortune Ox 2",
  "Fortune Chicken",
  "Fortune Monkey",
  "Fortune Horse",
  "Fortune Dog",
  "Fortune Goat"
];

// REVENGE GAMES - Dados completos (12 jogos)
const revengeGamesData = {
  "Fortune Mouse 2": {
    id: 301,
    name: "Fortune Mouse 2",
    image: "/images/revenge/Fortune Mouse 2.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 92,
    category: "Fortune",
    provider: "revenge"
  },
  "Treasures of Aztec Rewind": {
    id: 302,
    name: "Treasures of Aztec Rewind",
    image: "/images/revenge/Treasures of Aztec Rewind.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 93,
    category: "Aztec",
    provider: "revenge"
  },
  "Fortune Tiger 2": {
    id: 303,
    name: "Fortune Tiger 2",
    image: "/images/revenge/Fortune Tiger 2.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 94,
    category: "Fortune",
    provider: "revenge"
  },
  "Super Dragon Hatch": {
    id: 304,
    name: "Super Dragon Hatch",
    image: "/images/revenge/Super Dragon Hatch.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 95,
    category: "Dragon",
    provider: "revenge"
  },
  "Fortune Dragon 2": {
    id: 305,
    name: "Fortune Dragon 2",
    image: "/images/revenge/Fortune Dragon 2.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 93,
    category: "Fortune",
    provider: "revenge"
  },
  "Dragon Hatch Reborn": {
    id: 306,
    name: "Dragon Hatch Reborn",
    image: "/images/revenge/Dragon Hatch Reborn.jpg",
    bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"],
    basePayout: 96,
    category: "Dragon",
    provider: "revenge"
  },
  "Fortune Ox 2": {
    id: 307,
    name: "Fortune Ox 2",
    image: "/images/revenge/Fortune Ox 2.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 91,
    category: "Fortune",
    provider: "revenge"
  },
  "Fortune Chicken": {
    id: 308,
    name: "Fortune Chicken",
    image: "/images/revenge/Fortune Chicken.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 90,
    category: "Fortune",
    provider: "revenge"
  },
  "Fortune Monkey": {
    id: 309,
    name: "Fortune Monkey",
    image: "/images/revenge/Fortune Monkey.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 92,
    category: "Fortune",
    provider: "revenge"
  },
  "Fortune Horse": {
    id: 310,
    name: "Fortune Horse",
    image: "/images/revenge/Fortune Horse.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 91,
    category: "Fortune",
    provider: "revenge"
  },
  "Fortune Dog": {
    id: 311,
    name: "Fortune Dog",
    image: "/images/revenge/Fortune Dog.jpg",
    bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"],
    basePayout: 90,
    category: "Fortune",
    provider: "revenge"
  },
  "Fortune Goat": {
    id: 312,
    name: "Fortune Goat",
    image: "/images/revenge/Fortune Goat.jpg",
    bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"],
    basePayout: 93,
    category: "Fortune",
    provider: "revenge"
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

// FA CHAI - Ordem estratégica fixa (15 jogos)
const FACHAI_ORDER = [
  "Animal Racing",
  "Boxing Riches",
  "Chihuahua",
  "Chinese New Year",
  "Chinese New Year 2",
  "Chinese New Year Moreways",
  "Cowboys",
  "Crazy Buffalo",
  "Da Le Men",
  "Egypt Bonanza",
  "Fortune Egg",
  "Fortune Goddess",
  "Fortune Koi",
  "Fortune Money Boom",
  "Fortune Sheep",
  "Glory of Rome",
  "Gold Rush",
  "Golden Genie",
  "Golden Panther",
  "Grand Blue",
  "Happy Duo Bao",
  "Hot Pot Party",
  "Legend of Inca",
  "Lucky Fortunes",
  "Lucky Fortunes 3x3",
  "Luxury Golden Panther",
  "Magic Beans",
  "Merge Magic",
  "Night Market",
  "Night Market 2",
  "Panda Dragon Boat",
  "Poker Win",
  "Pong Pong Hu",
  "Queen of Inca",
  "Rich Man",
  "Robin Hood",
  "Roma Gladiatrix",
  "Sugar Bang Bang",
  "Super Elements",
  "Three Little Pigs",
  "Treasure Cruise",
  "Treasure Raiders",
  "War of the Universe",
  "Win Win Neko",
  "Zeus"
];

// FA CHAI GAMES - 45 jogos reais
const fachaiGamesData = {
  "Animal Racing": { id: 401, name: "Animal Racing", image: "/images/fachai/Animal Racing.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 88, category: "Racing", provider: "fachai" },
  "Boxing Riches": { id: 402, name: "Boxing Riches", image: "/images/fachai/Boxing Riches.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 91, category: "Sports", provider: "fachai" },
  "Chihuahua": { id: 403, name: "Chihuahua", image: "/images/fachai/Chihuahua.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 87, category: "Animal", provider: "fachai" },
  "Chinese New Year": { id: 404, name: "Chinese New Year", image: "/images/fachai/Chinese New Year.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 93, category: "Festival", provider: "fachai" },
  "Chinese New Year 2": { id: 405, name: "Chinese New Year 2", image: "/images/fachai/Chinese New Year 2.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 94, category: "Festival", provider: "fachai" },
  "Chinese New Year Moreways": { id: 406, name: "Chinese New Year Moreways", image: "/images/fachai/Chinese New Year Moreways.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 92, category: "Festival", provider: "fachai" },
  "Cowboys": { id: 407, name: "Cowboys", image: "/images/fachai/Cowboys.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 89, category: "Western", provider: "fachai" },
  "Crazy Buffalo": { id: 408, name: "Crazy Buffalo", image: "/images/fachai/Crazy Buffalo.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 90, category: "Animal", provider: "fachai" },
  "Da Le Men": { id: 409, name: "Da Le Men", image: "/images/fachai/Da Le Men.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 88, category: "Asian", provider: "fachai" },
  "Egypt Bonanza": { id: 410, name: "Egypt Bonanza", image: "/images/fachai/Egypt Bonanza.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 93, category: "Egyptian", provider: "fachai" },
  "Fortune Egg": { id: 411, name: "Fortune Egg", image: "/images/fachai/Fortune Egg.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 91, category: "Fortune", provider: "fachai" },
  "Fortune Goddess": { id: 412, name: "Fortune Goddess", image: "/images/fachai/Fortune Goddess.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 95, category: "Fortune", provider: "fachai" },
  "Fortune Koi": { id: 413, name: "Fortune Koi", image: "/images/fachai/Fortune Koi.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 89, category: "Fortune", provider: "fachai" },
  "Fortune Money Boom": { id: 414, name: "Fortune Money Boom", image: "/images/fachai/Fortune Money Boom.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 92, category: "Fortune", provider: "fachai" },
  "Fortune Sheep": { id: 415, name: "Fortune Sheep", image: "/images/fachai/Fortune Sheep.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 87, category: "Fortune", provider: "fachai" },
  "Glory of Rome": { id: 416, name: "Glory of Rome", image: "/images/fachai/Glory of Rome.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 94, category: "Historical", provider: "fachai" },
  "Gold Rush": { id: 417, name: "Gold Rush", image: "/images/fachai/Gold Rush.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 90, category: "Gold", provider: "fachai" },
  "Golden Genie": { id: 418, name: "Golden Genie", image: "/images/fachai/Golden Genie.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 93, category: "Fantasy", provider: "fachai" },
  "Golden Panther": { id: 419, name: "Golden Panther", image: "/images/fachai/Golden Panther.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 91, category: "Animal", provider: "fachai" },
  "Grand Blue": { id: 420, name: "Grand Blue", image: "/images/fachai/Grand Blue.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 88, category: "Ocean", provider: "fachai" },
  "Happy Duo Bao": { id: 421, name: "Happy Duo Bao", image: "/images/fachai/Happy Duo Bao.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 92, category: "Asian", provider: "fachai" },
  "Hot Pot Party": { id: 422, name: "Hot Pot Party", image: "/images/fachai/Hot Pot Party.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 87, category: "Food", provider: "fachai" },
  "Legend of Inca": { id: 423, name: "Legend of Inca", image: "/images/fachai/Legend of Inca.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 94, category: "Ancient", provider: "fachai" },
  "Lucky Fortunes": { id: 424, name: "Lucky Fortunes", image: "/images/fachai/Lucky Fortunes.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 90, category: "Fortune", provider: "fachai" },
  "Lucky Fortunes 3x3": { id: 425, name: "Lucky Fortunes 3x3", image: "/images/fachai/Lucky Fortunes 3x3.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 89, category: "Fortune", provider: "fachai" },
  "Luxury Golden Panther": { id: 426, name: "Luxury Golden Panther", image: "/images/fachai/Luxury Golden Panther.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 95, category: "Animal", provider: "fachai" },
  "Magic Beans": { id: 427, name: "Magic Beans", image: "/images/fachai/Magic Beans.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 88, category: "Fantasy", provider: "fachai" },
  "Merge Magic": { id: 428, name: "Merge Magic", image: "/images/fachai/Merge Magic.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 91, category: "Fantasy", provider: "fachai" },
  "Night Market": { id: 429, name: "Night Market", image: "/images/fachai/Night Market.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 96, category: "Asian", provider: "fachai" },
  "Night Market 2": { id: 430, name: "Night Market 2", image: "/images/fachai/Night Market 2.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 93, category: "Asian", provider: "fachai" },
  "Panda Dragon Boat": { id: 431, name: "Panda Dragon Boat", image: "/images/fachai/Panda Dragon Boat.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 90, category: "Festival", provider: "fachai" },
  "Poker Win": { id: 432, name: "Poker Win", image: "/images/fachai/Poker Win.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 87, category: "Cards", provider: "fachai" },
  "Pong Pong Hu": { id: 433, name: "Pong Pong Hu", image: "/images/fachai/Pong Pong Hu.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 89, category: "Asian", provider: "fachai" },
  "Queen of Inca": { id: 434, name: "Queen of Inca", image: "/images/fachai/Queen of Inca.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 94, category: "Ancient", provider: "fachai" },
  "Rich Man": { id: 435, name: "Rich Man", image: "/images/fachai/Rich Man.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 90, category: "Money", provider: "fachai" },
  "Robin Hood": { id: 436, name: "Robin Hood", image: "/images/fachai/Robin Hood.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 92, category: "Adventure", provider: "fachai" },
  "Roma Gladiatrix": { id: 437, name: "Roma Gladiatrix", image: "/images/fachai/Roma Gladiatrix.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 95, category: "Historical", provider: "fachai" },
  "Sugar Bang Bang": { id: 438, name: "Sugar Bang Bang", image: "/images/fachai/Sugar Bang Bang.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 88, category: "Sweet", provider: "fachai" },
  "Super Elements": { id: 439, name: "Super Elements", image: "/images/fachai/Super Elements.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 91, category: "Fantasy", provider: "fachai" },
  "Three Little Pigs": { id: 440, name: "Three Little Pigs", image: "/images/fachai/Three Little Pigs.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 87, category: "Fairy Tale", provider: "fachai" },
  "Treasure Cruise": { id: 441, name: "Treasure Cruise", image: "/images/fachai/Treasure Cruise.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 93, category: "Pirate", provider: "fachai" },
  "Treasure Raiders": { id: 442, name: "Treasure Raiders", image: "/images/fachai/Treasure Raiders.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 94, category: "Adventure", provider: "fachai" },
  "War of the Universe": { id: 443, name: "War of the Universe", image: "/images/fachai/War of the Universe.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 92, category: "Sci-Fi", provider: "fachai" },
  "Win Win Neko": { id: 444, name: "Win Win Neko", image: "/images/fachai/Win Win Neko.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 90, category: "Asian", provider: "fachai" },
  "Zeus": { id: 445, name: "Zeus", image: "/images/fachai/Zeus.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 95, category: "Greek", provider: "fachai" }
};

// JDB - Ordem estratégica fixa (15 jogos)
const JDB_ORDER = [
  "Banana Saga",
  "Beauty and the Kingdom",
  "Big Three Dragons",
  "Billionaire",
  "Birds Party",
  "Birds Party Deluxe",
  "Blossom of Wealth",
  "Book of Mystery",
  "Caishen Coming",
  "CooCoo Farm",
  "Double Wilds",
  "Dragon",
  "Dragon Soar",
  "Dragon Warrior",
  "Dragons Gate",
  "Dragons World",
  "Elemental Link Fire",
  "Elemental Link Water",
  "Flirting Scholar Tang",
  "Formosa Bear",
  "Fortune Horse",
  "Fortune Neko",
  "Fortune Treasure",
  "Four Treasures",
  "Fruity Bonanza",
  "Funky King Kong",
  "Glamorous Girl",
  "Go Lai Fu"
];

// JDB GAMES - 28 jogos reais
const jdbGamesData = {
  "Banana Saga": { id: 501, name: "Banana Saga", image: "/images/jdb/Banana Saga.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 89, category: "Adventure", provider: "jdb" },
  "Beauty and the Kingdom": { id: 502, name: "Beauty and the Kingdom", image: "/images/jdb/Beauty and the Kingdom.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 93, category: "Fantasy", provider: "jdb" },
  "Big Three Dragons": { id: 503, name: "Big Three Dragons", image: "/images/jdb/Big Three Dragons.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 91, category: "Dragon", provider: "jdb" },
  "Billionaire": { id: 504, name: "Billionaire", image: "/images/jdb/Billionaire.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 90, category: "Money", provider: "jdb" },
  "Birds Party": { id: 505, name: "Birds Party", image: "/images/jdb/Birds Party.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 87, category: "Animal", provider: "jdb" },
  "Birds Party Deluxe": { id: 506, name: "Birds Party Deluxe", image: "/images/jdb/Birds Party Deluxe.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 88, category: "Animal", provider: "jdb" },
  "Blossom of Wealth": { id: 507, name: "Blossom of Wealth", image: "/images/jdb/Blossom of Wealth.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 94, category: "Fortune", provider: "jdb" },
  "Book of Mystery": { id: 508, name: "Book of Mystery", image: "/images/jdb/Book of Mystery.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 92, category: "Adventure", provider: "jdb" },
  "Caishen Coming": { id: 509, name: "Caishen Coming", image: "/images/jdb/Caishen Coming.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 95, category: "Asian", provider: "jdb" },
  "CooCoo Farm": { id: 510, name: "CooCoo Farm", image: "/images/jdb/CooCoo Farm.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 86, category: "Farm", provider: "jdb" },
  "Double Wilds": { id: 511, name: "Double Wilds", image: "/images/jdb/Double Wilds.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 90, category: "Classic", provider: "jdb" },
  "Dragon": { id: 512, name: "Dragon", image: "/images/jdb/Dragon.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 93, category: "Dragon", provider: "jdb" },
  "Dragon Soar": { id: 513, name: "Dragon Soar", image: "/images/jdb/Dragon Soar.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 94, category: "Dragon", provider: "jdb" },
  "Dragon Warrior": { id: 514, name: "Dragon Warrior", image: "/images/jdb/Dragon Warrior.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 95, category: "Dragon", provider: "jdb" },
  "Dragons Gate": { id: 515, name: "Dragons Gate", image: "/images/jdb/Dragons Gate.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 91, category: "Dragon", provider: "jdb" },
  "Dragons World": { id: 516, name: "Dragons World", image: "/images/jdb/Dragons World.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 93, category: "Dragon", provider: "jdb" },
  "Elemental Link Fire": { id: 517, name: "Elemental Link Fire", image: "/images/jdb/Elemental Link Fire.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 92, category: "Fantasy", provider: "jdb" },
  "Elemental Link Water": { id: 518, name: "Elemental Link Water", image: "/images/jdb/Elemental Link Water.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 92, category: "Fantasy", provider: "jdb" },
  "Flirting Scholar Tang": { id: 519, name: "Flirting Scholar Tang", image: "/images/jdb/Flirting Scholar Tang.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 90, category: "Asian", provider: "jdb" },
  "Formosa Bear": { id: 520, name: "Formosa Bear", image: "/images/jdb/Formosa Bear.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 88, category: "Animal", provider: "jdb" },
  "Fortune Horse": { id: 521, name: "Fortune Horse", image: "/images/jdb/Fortune Horse.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 94, category: "Fortune", provider: "jdb" },
  "Fortune Neko": { id: 522, name: "Fortune Neko", image: "/images/jdb/Fortune Neko.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 91, category: "Fortune", provider: "jdb" },
  "Fortune Treasure": { id: 523, name: "Fortune Treasure", image: "/images/jdb/Fortune Treasure.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 93, category: "Fortune", provider: "jdb" },
  "Four Treasures": { id: 524, name: "Four Treasures", image: "/images/jdb/Four Treasures.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 90, category: "Treasure", provider: "jdb" },
  "Fruity Bonanza": { id: 525, name: "Fruity Bonanza", image: "/images/jdb/Fruity Bonanza.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 87, category: "Fruit", provider: "jdb" },
  "Funky King Kong": { id: 526, name: "Funky King Kong", image: "/images/jdb/Funky King Kong.jpg", bets: ["R$ 0,50", "R$ 2,00", "R$ 4,00"], basePayout: 89, category: "Animal", provider: "jdb" },
  "Glamorous Girl": { id: 527, name: "Glamorous Girl", image: "/images/jdb/Glamorous Girl.jpg", bets: ["R$ 0,50", "R$ 3,00", "R$ 4,00"], basePayout: 92, category: "Fantasy", provider: "jdb" },
  "Go Lai Fu": { id: 528, name: "Go Lai Fu", image: "/images/jdb/Go Lai Fu.jpg", bets: ["R$ 0,50", "R$ 2,50", "R$ 4,00"], basePayout: 95, category: "Asian", provider: "jdb" }
};

export const slotsData = {
  pg: getOrderedGames(PG_SOFT_ORDER, pgGamesData),
  pragmatic: getOrderedGames(PRAGMATIC_ORDER, pragmaticGamesData),
  spirit: getOrderedGames(SPIRIT_ORDER, spiritGamesData),
  tada: getOrderedGames(TADA_ORDER, tadaGamesData),
  revenge: getOrderedGames(REVENGE_ORDER, revengeGamesData),
  fachai: getOrderedGames(FACHAI_ORDER, fachaiGamesData),
  jdb: getOrderedGames(JDB_ORDER, jdbGamesData)
};

// Provider ranking priority (ordem de exibição)
export const providerRankingOrder = [
  { id: 'pg', name: 'PG Soft', rank: 1 },
  { id: 'pragmatic', name: 'Pragmatic Play', rank: 2 },
  { id: 'tada', name: 'Tada Gaming', rank: 3 },
  { id: 'spirit', name: 'Spirit Gaming', rank: 4 },
  { id: 'revenge', name: 'Revenge', rank: 5 },
  { id: 'fachai', name: 'FA CHAI', rank: 6 },
  { id: 'jdb', name: 'JDB', rank: 7 }
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
