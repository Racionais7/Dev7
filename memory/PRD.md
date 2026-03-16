# Signal Analytics - PRD (Product Requirements Document)

## Original Problem Statement
Plataforma de sinais para slots de cassino online com estilo premium. A aplicação deve fornecer sinais comportamentais para jogos de diferentes provedores (PG Soft, Pragmatic Play, Tada Gaming, Spirit Gaming).

## Língua do Usuário
O usuário é brasileiro e prefere comunicação em **Português do Brasil**.

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

### Data: 01/03/2026 - Atualização de Logotipos
- **Alteração**: Substituição dos logotipos de plataformas no footer
- **Logos Removidos**: AGJOGO, BGJOGO, FGJOGO, HGJOGO (e outros)
- **Logos Adicionados**: MGJOGO, EGJOGO, WGJOGO, YGJOGO, DGJOGO
- **Arquivos Atualizados**:
  - `/app/frontend/src/components/PlatformSelector.jsx` - Array platformLogos atualizado
  - `/app/frontend/public/assets/platforms/` - Novas imagens salvas
- **Grid Ajustado**: De 9 colunas para 5 colunas no footer

### Data: 14/02/2026 - Funcionalidades Anteriores
- Persistência de sinais com localStorage
- UI/UX Premium com estilo cinemático
- Sistema de cooldown de sinais
- Providers: PG Soft, Pragmatic Play, Spirit Gaming, Tada Gaming, Reeveme

## Tecnologias
- **Frontend**: React, Tailwind CSS, Craco
- **Backend**: FastAPI (configurado)
- **Database**: MongoDB (configurado, não usado)
- **State**: localStorage para persistência de sinais

## Próximas Tarefas / Backlog

### P0 (Alta Prioridade)
- Nenhuma tarefa pendente

### P1 (Média Prioridade)
- Adicionar links clicáveis nos logos das plataformas

### P2 (Baixa Prioridade / Futura)
- Adicionar mais provedores de jogos
- Implementar backend real para sinais

## Dados MOCKED
⚠️ **IMPORTANTE**: Todos os dados de jogos são mocked. Não há chamadas de API reais.

## URLs
- Frontend Preview: https://github-portfolio-17.preview.emergentagent.com
