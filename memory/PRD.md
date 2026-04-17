# Signal Analytics - PRD (Product Requirements Document)

## Original Problem Statement
Plataforma de sinais para slots de cassino online com estilo premium. A aplicação deve fornecer sinais comportamentais para jogos de diferentes provedores (PG Soft, Pragmatic Play, Tada Gaming, Spirit Gaming, Reeveme).

## Lingua do Usuario
O usuario e brasileiro e prefere comunicacao em **Portugues do Brasil**.

## Plataforma Atual
- **HG JOGO** - https://hgjogo7.com/en/?ch=110006&ic=140396339#/register
- **FG JOGO** - https://fgjogo7.com/?ch=230004&ic=140225696#/register

## Arquitetura
```
/app/
├── backend/         # FastAPI backend (configurado, endpoint basico)
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── PlatformSelector.jsx   # Seletor de plataforma inicial
│   │   │   ├── ProviderSelector.jsx   # Launcher de provedores
│   │   │   ├── SignalGenerator.jsx    # Gerador de sinais com persistencia
│   │   │   ├── SlotCard.jsx           # Cards de slots com estilo premium
│   │   │   ├── SlotGrid.jsx           # Grid de slots
│   │   │   ├── Header.jsx             # Cabecalho
│   │   │   ├── IntroAnimation.jsx     # Animacao de entrada
│   │   │   ├── OrbitingLogos.jsx      # Orbita de logos das plataformas
│   │   │   └── WhatsAppButton.jsx     # Botao WhatsApp flutuante
│   │   ├── data/
│   │   │   └── mockData.js            # Dados mock de jogos (200+)
│   │   ├── App.js                     # Componente principal
│   │   └── ...
│   └── ...
└── ...
```

## O Que Foi Implementado

### Data: 09/01/2026 - Restauracao do Repositorio
- **Acao**: Repositorio existente restaurado e configurado no ambiente Emergent
- **Fix**: Arquivos .env faltando - criados backend/.env e frontend/.env
- **Teste**: 100% pass - backend e frontend verificados (iteration_9.json)

### Data: 08/01/2026 - Bug Fix: Sobreposicao de Texto
- **Bug**: Texto "Analise profissional de padroes" estava sobrepondo com os logos orbitantes
- **Fix**: Aumentou min-height do hero section e margin-top do texto

### Data: 07/04/2026 - Efeito de Orbita Estilo JogoClub.vip
- **Componente atualizado**: OrbitingLogos.jsx

### Data: 06/04/2026 - Migracao do Repositorio
- **Repositorio Original**: Racionais7/Dev7 (GitHub)

### Funcionalidades Existentes
- Persistencia de sinais com localStorage
- UI/UX Premium com estilo cinematico (animacoes, hologramas, Mario 3D)
- Sistema de cooldown de sinais
- Providers: PG Soft, Pragmatic Play, Spirit Gaming, Tada Gaming, Reeveme
- Animacao de intro do Mario
- Botao do WhatsApp
- 200+ jogos disponiveis
- Seletor de plataforma (HG JOGO, FG JOGO)
- Gerador de sinais com graficos e dados em tempo real

## Tecnologias
- **Frontend**: React 19, Tailwind CSS, Craco, Framer Motion, Sonner
- **Backend**: FastAPI (configurado basico)
- **Database**: MongoDB (configurado, nao usado)
- **State**: localStorage para persistencia de sinais

## Proximas Tarefas / Backlog

### P0 (Alta Prioridade)
- Aguardando feedback do usuario

### P1 (Media Prioridade)
- Adicionar links clicaveis nos logos das plataformas

### P2 (Baixa Prioridade / Futura)
- Adicionar mais provedores de jogos
- Implementar backend real para sinais
- Sistema de login para usuarios VIP
- Analytics de uso dos sinais

## Dados MOCKED
IMPORTANTE: Todos os dados de jogos sao mocked. Nao ha chamadas de API reais.

## URLs
- Frontend Preview: https://4e4e49ff-46a9-49bc-8e91-b4336ef63b7c.preview.emergentagent.com
