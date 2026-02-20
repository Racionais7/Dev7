# MG Jogos - Contrato de API e Integração Frontend/Backend

## 📋 Resumo do Sistema

O sistema MG Jogos é uma plataforma de sinais inteligentes para slots PG Soft que oferece:
- 10 slots específicos da PG com dados dinâmicos
- Sistema de geração de sinais com cooldown de 10 minutos
- RTPs que atualizam a cada 3 minutos (55-97%)
- Interface responsiva com animações profissionais

## 🎰 Slots Implementados

1. **Fortune Tiger** - Apostas: R$ 0,80, R$ 1,20, R$ 4,80
2. **Fortune Ox** - Apostas: R$ 0,50, R$ 1,00, R$ 3,00
3. **Fortune Rabbit** - Apostas: R$ 0,50, R$ 3,00, R$ 4,00
4. **Dragon Hatch** - Apostas: R$ 0,50, R$ 1,50, R$ 5,00
5. **Lucky Neko** - Apostas: R$ 0,80, R$ 1,20, R$ 2,40
6. **Treasures of Aztec** - Apostas: R$ 0,80, R$ 2,40, R$ 4,00
7. **Mahjong Ways 1** - Apostas: R$ 1,20, R$ 1,60, R$ 8,00
8. **Mahjong Ways 2** - Apostas: R$ 1,20, R$ 1,60, R$ 3,20
9. **Caishen Wins** - Apostas: R$ 0,40, R$ 3,60, R$ 4,00
10. **Wild Bandito** - Apostas: R$ 0,40, R$ 0,80, R$ 1,20

## 💾 Dados Mockados no Frontend (mockData.js)

### Estrutura dos Slots
```javascript
{
  id: number,
  name: string,
  image: string (Unsplash URLs),
  bets: string[] (valores específicos por slot),
  basePayout: number (RTP base),
  category: string (Fortune, Dragon, Lucky, etc.)
}
```

### Sistema de Sinais Mockado
- **Horários**: Gerados dinamicamente (fuso horário do usuário)
- **Modo**: Turbo ou Normal (aleatório)
- **Aposta recomendada**: Uma das apostas disponíveis do slot
- **Confiança**: 80-100% (aleatório)
- **Cooldown**: 10 minutos salvos no localStorage

### RTPs Dinâmicos
- Atualizam a cada 3 minutos automaticamente
- Variação: 55% a 97%
- Cores baseadas no valor (verde ≥90%, amarelo ≥80%, laranja ≥70%, vermelho <70%)

## 🔄 Funcionalidades Frontend Atuais

### ✅ Implementado com Mock Data
1. **Lista de slots** com imagens, categorias e RTPs dinâmicos
2. **Geração de sinais** com animação de carregamento
3. **Sistema de cooldown** com timer visual
4. **Persistência** via localStorage (sem backend)
5. **Design responsivo** com animações suaves
6. **Indicators de status** em tempo real

### 🔍 Elementos Visuais
- Header com logo MG Jogos e status online
- Hero section com gradientes e animações
- Grid de slots responsivo (1-5 colunas)
- Cards com hover effects e status indicators
- Página de geração de sinal profissional
- Footer com informações da plataforma

## 🚀 API Endpoints para Backend (Futuro)

### Slots Management
```
GET /api/slots
- Retorna lista completa dos 10 slots com RTPs atuais

GET /api/slots/:id/rtp
- Retorna RTP atual de um slot específico

PUT /api/slots/:id/rtp
- Atualiza RTP de um slot (sistema interno)
```

### Signal Generation
```
POST /api/signals/generate
Body: { slotId: number, userId?: string }
Response: {
  slotId: number,
  timeWindow: { start: string, end: string },
  mode: "Turbo" | "Normal",
  recommendedBet: string,
  confidence: number,
  generatedAt: timestamp
}

GET /api/signals/cooldown/:slotId/:userId?
Response: {
  canGenerate: boolean,
  remainingTime: number (ms)
}
```

### Analytics (Opcional)
```
POST /api/analytics/signal-used
Body: { slotId: number, signalId: string, success: boolean }

GET /api/analytics/stats
Response: { precision: number, totalSignals: number, activeUsers: number }
```

## 📱 Armazenamento Local (localStorage)

### Chaves Utilizadas
- `lastSignal_${slotId}`: Timestamp da última geração
- `signal_${slotId}`: Dados do último sinal gerado
- `user_preferences`: Configurações do usuário

## 🎨 Design System

### Cores Principais
- **Roxo**: #8b5cf6, #7c3aed, #6d28d9 (gradientes primários)
- **Dourado**: #f59e0b, #d97706, #b45309 (CTAs e destaques)
- **Preto/Cinza**: #000000, #1a1a2e, #16213e (backgrounds)

### Componentes Visuais
- Cards com gradientes e borders dinâmicos
- Botões com animações hover e active
- Status indicators com cores semafóricas
- Animações suaves (300ms cubic-bezier)

## 🔄 Integração Frontend/Backend

### Substituições Necessárias
1. **mockData.js** → APIs reais
2. **localStorage** → Sessões de usuário
3. **timers locais** → Cooldowns do servidor
4. **RTPs estáticos** → Dados em tempo real

### Pontos de Integração
- `SlotGrid.jsx`: Substituir slotsData por API call
- `SignalGenerator.jsx`: Conectar geração com backend
- `SlotCard.jsx`: RTPs dinâmicos via WebSocket/polling
- **Sistema de usuários**: Implementar identificação única

## ⚠️ Considerações de Produção

### Segurança
- Validar cooldowns no backend
- Rate limiting para geração de sinais
- Logs de auditoria para sinais gerados

### Performance
- Cache de RTPs (3 minutos)
- Pagination de slots (se expandir)
- CDN para imagens dos slots

### Compliance
- Avisos de jogo responsável
- Restrições de idade (+18)
- Limites de apostas recomendadas

## 📊 Métricas de Sucesso

### Frontend Atual
- ✅ Carregamento rápido (<2s)
- ✅ Interface responsiva (mobile/desktop)
- ✅ Animações fluidas (60fps)
- ✅ Funcionalidades completas sem backend

### Próximos Passos
- Implementação de backend FastAPI
- Sistema de usuários/sessões
- Dados em tempo real via WebSocket
- Analytics de uso dos sinais