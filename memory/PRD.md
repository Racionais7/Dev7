# Signal Analytics - PRD (Product Requirements Document)

## Original Problem Statement
Plataforma de sinais para slots de cassino online com estilo premium. A aplicação deve fornecer sinais comportamentais para jogos de diferentes provedores (PG Soft, Pragmatic Play, Tada Gaming, Spirit Gaming).

## Língua do Usuário
O usuário é brasileiro e prefere comunicação em **Português do Brasil**.

## Plataforma Atual
- **HG JOGO** - https://hgjogo7.com/en/?ch=110006&ic=140396339#/register

## Arquitetura
```
/app/
├── backend/         # FastAPI backend (configurado, não usado ativamente)
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── PlatformSelector.jsx   # Seletor de plataforma inicial
│   │   │   ├── ProviderSelector.jsx   # Launcher de provedores
│   │   │   ├── SignalGenerator.jsx    # Gerador de sinais com persistência
│   │   │   ├── SlotCard.jsx           # Cards de slots com estilo premium
│   │   │   ├── SlotGrid.jsx           # Grid de slots
│   │   │   ├── Header.jsx             # Cabeçalho
│   │   │   └── IntroAnimation.jsx     # Animação de entrada
│   │   ├── data/
│   │   │   └── mockData.js            # Dados mock de jogos
│   │   ├── App.js                     # Componente principal
│   │   └── ...
│   └── ...
└── ...
```

## O Que Foi Implementado

### Data: 06/04/2026 - Efeito de Órbita de Logos
- **Componente criado**: `OrbitingLogos.jsx` usando framer-motion
- **Funcionalidades**:
  - 9 logos de plataformas orbitando ao redor do Mario holográfico
  - Efeito de profundidade 3D (logos menores/mais transparentes quando "atrás")
  - Trilha de energia neon (roxo #7c3aed / azul #3b82f6)
  - Logos mantêm orientação vertical
  - 16 partículas de energia seguindo a órbita
  - Responsivo: raio de órbita adapta para mobile/tablet/desktop
- **Arquivos Atualizados**:
  - `/app/frontend/src/components/OrbitingLogos.jsx` - Novo componente
  - `/app/frontend/src/components/PlatformSelector.jsx` - Integração do componente

### Data: 06/04/2026 - Migração do Repositório
- **Repositório Original**: Racionais7/Dev7 (GitHub)
- **Ação**: Código clonado e migrado para ambiente Emergent
- **Status**: Site funcionando em https://site-reportorio.preview.emergentagent.com

### Funcionalidades Existentes
- Persistência de sinais com localStorage
- UI/UX Premium com estilo cinemático
- Sistema de cooldown de sinais
- Providers: PG Soft, Pragmatic Play, Spirit Gaming, Tada Gaming, Reeveme
- Animação de intro do Mario
- Botão do WhatsApp
- 200+ jogos disponíveis

## Tecnologias
- **Frontend**: React, Tailwind CSS, Craco
- **Backend**: FastAPI (configurado)
- **Database**: MongoDB (configurado, não usado)
- **State**: localStorage para persistência de sinais

## Próximas Tarefas / Backlog

### P0 (Alta Prioridade)
- Aguardando feedback do usuário sobre modificações

### P1 (Média Prioridade)
- Adicionar links clicáveis nos logos das plataformas

### P2 (Baixa Prioridade / Futura)
- Adicionar mais provedores de jogos
- Implementar backend real para sinais
- Sistema de login para usuários VIP

## Dados MOCKED
⚠️ **IMPORTANTE**: Todos os dados de jogos são mocked. Não há chamadas de API reais.

## URLs
- Frontend Preview: https://site-reportorio.preview.emergentagent.com
