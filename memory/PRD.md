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

## Backlog / Future (P2)
- Som de "boing" ao bater no bloco (opcional)
- Adicionar moeda animada saindo do bloco após hit
- Star power-up aparecendo aleatoriamente no footer
