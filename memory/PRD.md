# Signal Analytics - PRD (Product Requirements Document)

## Original Problem Statement
Plataforma de sinais para slots de cassino online com estilo premium. A aplicação deve fornecer sinais comportamentais para jogos de diferentes provedores (PG Soft, Pragmatic Play, Tada Gaming, Spirit Gaming).

## Lingua do Usuario
O usuario e brasileiro e prefere comunicacao em **Portugues do Brasil**.

## Plataforma Atual
- **HG JOGO** - https://hgjogo7.com/en/?ch=110006&ic=140396339#/register

## Arquitetura
```
/app/
├── backend/         # FastAPI backend (configurado, nao usado ativamente)
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
│   │   │   └── OrbitingLogos.jsx      # Orbita de logos das plataformas
│   │   ├── data/
│   │   │   └── mockData.js            # Dados mock de jogos
│   │   ├── App.js                     # Componente principal
│   │   └── ...
│   └── ...
└── ...
```

## O Que Foi Implementado

### Data: 08/01/2026 - Bug Fix: Sobreposicao de Texto
- **Bug**: Texto "Analise profissional de padroes" estava sobrepondo com os logos orbitantes
- **Causa**: Container OrbitingLogos (~600px) excedia o container pai (~300px), logos se espalhavam sobre o texto
- **Fix**: Aumentou min-height do hero section (35vh->55vh, 40vh->60vh) e margin-top do texto (mt-6->mt-32/mt-40/mt-44)
- **Arquivo**: `/app/frontend/src/components/PlatformSelector.jsx`
- **Teste**: 100% pass - desktop e mobile verificados

### Data: 07/04/2026 - Efeito de Orbita Estilo JogoClub.vip
- **Componente atualizado**: `OrbitingLogos.jsx` - estilo limpo e profissional
- 9 logos posicionadas em pontos fixos do circulo
- Rotacao suave de 30 segundos
- 100% Responsivo: Desktop, tablet e mobile

### Data: 06/04/2026 - Migracao do Repositorio
- **Repositorio Original**: Racionais7/Dev7 (GitHub)
- **Acao**: Codigo clonado e migrado para ambiente Emergent

### Funcionalidades Existentes
- Persistencia de sinais com localStorage
- UI/UX Premium com estilo cinematico
- Sistema de cooldown de sinais
- Providers: PG Soft, Pragmatic Play, Spirit Gaming, Tada Gaming, Reeveme
- Animacao de intro do Mario
- Botao do WhatsApp
- 200+ jogos disponiveis

## Tecnologias
- **Frontend**: React, Tailwind CSS, Craco
- **Backend**: FastAPI (configurado)
- **Database**: MongoDB (configurado, nao usado)
- **State**: localStorage para persistencia de sinais

## Proximas Tarefas / Backlog

### P0 (Alta Prioridade)
- Aguardando feedback do usuario sobre modificacoes

### P1 (Media Prioridade)
- Adicionar links clicaveis nos logos das plataformas

### P2 (Baixa Prioridade / Futura)
- Adicionar mais provedores de jogos
- Implementar backend real para sinais
- Sistema de login para usuarios VIP

## Dados MOCKED
IMPORTANTE: Todos os dados de jogos sao mocked. Nao ha chamadas de API reais.

## URLs
- Frontend Preview: https://share-site-3.preview.emergentagent.com
