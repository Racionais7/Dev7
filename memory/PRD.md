# Super Mario AI - Signal Analytics Platform

## Problema Original (Jan 2026)
Cliente pediu modificações Mario-themed:
1. Tela de entrada (loading) deve ter Mario pixel art pulando e batendo em um bloco de tijolos
2. Trocar o holograma central (personagem azul/roxo) por um Mario pixel art animado
3. Manter o tema neon/escuro do resto do site

## Stack
- Frontend: React (CRA + Craco) em /app/frontend
- Backend: FastAPI em /app/backend
- DB: MongoDB
- Tailwind CSS

## O que foi implementado (2 de maio, 2026)

### Tela de Loading (IntroAnimation.jsx)
- Mario 8-bit pixel art pulando de baixo para cima (1.2s loop)
- Bloco de tijolo "?" em CSS pixel art (laranja/marrom com rebites e sombras pixeladas)
- Animação sincronizada: no pico do pulo (~42%), Mario bate no bloco; o bloco salta pra cima 10px; faíscas (✦ ★ ✦) aparecem
- Sombra do Mario que encolhe/cresce conforme pulo
- Barra de progresso pixelada vermelha (estilo Mario/NES) com brilho animado
- Título "SUPER MARIO AI" com sombra pixelada vermelha
- Star sparkles animados no fundo (referência Mario)

### Holograma Central (PlatformSelector.jsx)
- Substituído SVG cartoon antigo por imagem pixel art real do Mario 8-bit
- Efeito holográfico preservado via `filter: drop-shadow` (púrpura + azul)
- Animações existentes mantidas: mario-float, mario-breathe, mario-shimmer, glitch-spark, scanline
- `image-rendering: pixelated` para preservar o estilo retrô
- Os logos orbitais em volta (VGJOGO, DGJOGO, etc) continuam girando

### Assets
- `/app/frontend/public/assets/mario/mario-pixel-clean.png` - Pixel art Mario 441x745 (sem marca d'água, fundo transparente)
- Processamento: crop do watermark + conversão de pixels brancos para transparente

## Status
- ✅ Intro animation rendering and animating Mario jumping at brick
- ✅ Platform hologram replaced with pixel Mario
- ✅ Dark/neon theme preserved in rest of site
- ✅ Build successfully compiling, frontend running

## Novidades (2 fev 2026) — Easter eggs & HUD
### MarioHUD.jsx (novo)
- HUD clássico SMB no topo: `MARIO {score} | ×{coins} | WORLD 1-1 | TIME {countdown}`
- Moeda animada girando, pulso amarelo ao ganhar moedas
- Score drift passivo (+10 a cada 2.4s), TIME conta regressiva (reseta em 400)
- API global `window.__marioHUD.addCoins(n)` / `addScore(n)` para acoplamentos

### GoombaPatrol.jsx (novo)
- 3 Goombas patrulham o chão em 60fps (`requestAnimationFrame`)
- Clicar em Goomba → squish sprite + +1 moeda no HUD + respawn após 1.4s
- Sprites gerados via Python PIL em `/tmp/gen_goomba.py` → `goomba-1.png`, `goomba-2.png`, `goomba-squish.png`

### KonamiEasterEgg.jsx (novo)
- Sequência ↑↑↓↓←→←→BA dispara celebração 1-UP
- Chuva de 42 moedas pixel art caindo com rotação aleatória
- Banner "1-UP! +99 COINS" com animação de bounce
- +99 moedas no HUD + hint de progresso em canto inferior-esquerdo durante combo

### Integração (PlatformSelector.jsx)
- HUD renderizado acima do header
- GoombaPatrol e KonamiEasterEgg renderizados como overlays root
- MarioBlockEntrar.jsx dispara `addCoins(1)` em cada click (antes de navegar)

## Backlog / Future (P2)
- Refatorar `PlatformSelector.jsx` (~1450 linhas) em componentes menores
- Som de "boing" ao bater no bloco (opcional)
- Power-up mushroom caindo aleatoriamente do céu
- Fireball trail no cursor (modo gaming)
- Persistir score/moedas em localStorage entre sessões
