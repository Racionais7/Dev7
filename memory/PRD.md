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

### Data: 14/02/2026

#### Persistência de Sinais (Bug Fix - P0)
- **Problema**: Sinais eram regenerados ao navegar entre páginas
- **Solução Implementada**:
  - Sinais agora são identificados por `provider_id + game_id`
  - Armazenamento completo em localStorage com:
    - `createdAt`: timestamp de criação
    - `expiresAt`: timestamp de expiração da janela
    - `cooldownEndsAt`: timestamp do fim do cooldown
    - `cyclePhase`, `deadSpinCount`, `lastBonusDistance`: estado do ciclo
  - Estados são inicializados diretamente do localStorage no `useState`
  - Timer continua de onde parou ao retornar ao jogo
  - Novo sinal só é gerado quando o cooldown anterior termina

#### UI/UX Premium (Concluído)
- Provider Panel: Launcher limpo com logos de provedores
- Slot Cards: Estilo "cinemático" com botão JOGAR vermelho profundo
- Signal Generator: UI ação-orientada com instruções claras
- Timing estável: 5s countdown inicial, 60s cooldown entre sinais
- Turbo mode automático (não selecionável pelo usuário)
- "Melhor horário" baseado em análise de ciclo

#### Branding & Conteúdo
- Logos estilizados para PG Soft e Pragmatic Play
- Remoção de jogos específicos do TADA (Mines, Jackpot Fishing, etc.)

## Tecnologias
- **Frontend**: React, Tailwind CSS, Craco
- **Backend**: FastAPI (configurado)
- **Database**: MongoDB (configurado, não usado)
- **State**: localStorage para persistência de sinais

## Próximas Tarefas / Backlog

### P0 (Alta Prioridade)
- Nenhuma tarefa pendente de alta prioridade

### P1 (Média Prioridade)
- Adicionar mais slots com tema de moedas ao provedor TADA (solicitado pelo usuário)

### P2 (Baixa Prioridade / Futura)
- Refatorar SignalGenerator.jsx em hooks customizados (useSignalTimer, useSignalPersistence)
- Considerar backend real para sinais
- Adicionar mais provedores

## Dados MOCKED
⚠️ **IMPORTANTE**: Todos os dados de jogos são mocked em `frontend/src/data/mockData.js`. Não há chamadas de API reais para dados de jogos ou sinais.

## URLs de Preview
- Frontend: https://slot-advisor.preview.yourserver.com
