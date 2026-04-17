# Signal Analytics - PRD (Product Requirements Document)

## Original Problem Statement
Plataforma de sinais para slots de cassino online com estilo premium. A aplicação deve fornecer sinais comportamentais para jogos de diferentes provedores.

## Lingua do Usuario
O usuario e brasileiro e prefere comunicacao em **Portugues do Brasil**.

## Plataformas
- **HG JOGO** - https://hgjogo7.com/en/?ch=110006&ic=140396339#/register
- **FG JOGO** - https://fgjogo7.com/?ch=230004&ic=140225696#/register

## Arquitetura
```
/app/
├── backend/         # FastAPI backend (configurado basico)
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── PlatformSelector.jsx   # Seletor de plataforma inicial
│   │   │   ├── ProviderSelector.jsx   # Launcher de provedores (7 tabs)
│   │   │   ├── SignalGenerator.jsx    # Gerador de sinais com persistencia
│   │   │   ├── SlotCard.jsx           # Cards de slots com estilo premium
│   │   │   ├── SlotGrid.jsx           # Grid de slots
│   │   │   ├── Header.jsx             # Cabecalho
│   │   │   ├── IntroAnimation.jsx     # Animacao de entrada
│   │   │   ├── OrbitingLogos.jsx      # Orbita de logos das plataformas
│   │   │   └── WhatsAppButton.jsx     # Botao WhatsApp flutuante
│   │   ├── data/
│   │   │   └── mockData.js            # Dados mock de jogos (230+)
│   │   ├── App.js                     # Componente principal
│   │   └── ...
│   └── ...
└── ...
```

## O Que Foi Implementado

### Data: 09/01/2026 - Adição de Provedores FA CHAI e JDB
- **Feature**: Adicionados 2 novos provedores de jogos: FA CHAI e JDB
- **FA CHAI**: 15 jogos mockados (Golden Land, Chinese New Year, Lucky Fortune Cat, etc.)
- **JDB**: 15 jogos mockados (Treasure King, Dragon Master, Lucky Diamond, etc.)
- **Logos**: Imagens fornecidas pelo usuario salvas em /frontend/public/providers/ e /assets/providers/
- **Arquivos atualizados**: mockData.js, ProviderSelector.jsx, PlatformSelector.jsx, SlotCard.jsx, SlotGrid.jsx, SignalGenerator.jsx
- **Total provedores**: 7 (PG Soft, Pragmatic Play, Tada, Spirit, Revenge, FA CHAI, JDB)

### Data: 09/01/2026 - Restauracao do Repositorio
- Arquivos .env criados (estavam faltando)
- Backend e frontend restaurados e funcionando

### Funcionalidades Existentes
- Persistencia de sinais com localStorage
- UI/UX Premium com estilo cinematico
- Sistema de cooldown de sinais
- 7 Provedores: PG Soft, Pragmatic Play, Spirit Gaming, Tada Gaming, Reeveme, FA CHAI, JDB
- Animacao de intro do Mario
- Botao do WhatsApp
- 230+ jogos disponiveis
- Seletor de plataforma (HG JOGO, FG JOGO)

## Tecnologias
- **Frontend**: React 19, Tailwind CSS, Craco, Framer Motion, Sonner
- **Backend**: FastAPI (configurado basico)
- **Database**: MongoDB (configurado, nao usado)
- **State**: localStorage para persistencia de sinais

## Proximas Tarefas / Backlog

### P0 (Alta Prioridade)
- Aguardando feedback do usuario

### P1 (Media Prioridade)
- Adicionar imagens reais dos jogos FA CHAI e JDB

### P2 (Baixa Prioridade)
- Implementar backend real para sinais
- Sistema de login para usuarios VIP

## Dados MOCKED
Todos os dados de jogos sao mocked. Imagens dos jogos FA CHAI e JDB sao paths mockados sem imagens reais.

## URLs
- Frontend Preview: https://4e4e49ff-46a9-49bc-8e91-b4336ef63b7c.preview.emergentagent.com
