# Signal Analytics - PRD

## O Que Foi Implementado

### Data: 01/05/2026 - Provedora Micro Gaming adicionada
- 8ª provedora adicionada: **Micro Gaming** (48 jogos reais extraídos do nandabets.com.br/VG)
- Logo da Micro Gaming adicionada em `/assets/providers/microgaming.png` e `/providers/microgaming.png`
- 48 imagens dos slots baixadas em `/images/microgaming/{1-49}.png` (sem o 23)
- Aparece em:
  - Tela inicial → grid de provedoras (barra inferior, agora 8 cards)
  - Tela inicial → footer providers (8 logos)
  - Plataforma VG JOGO → ProviderSelector (8 abas: PG, Pragmatic, Tada, Spirit, Revenge, FA CHAI, JDB, **Micro Gaming**)
- Grid atualizado para `lg:grid-cols-8` em ambos os componentes (PlatformSelector e ProviderSelector)
- SlotCard atualizado para mostrar "Micro Gaming" como provider name

### Data: 09/01/2026 - JDB jogos reais (28 jogos)
- 28 jogos JDB

### Data: 09/01/2026 - FA CHAI jogos reais (45 jogos)
- 45 jogos FA CHAI

### Provedores e jogos (todos com nomes reais)
- PG Soft: 40 jogos | Pragmatic Play: 50+ jogos | Tada Gaming: 40+ jogos
- Spirit Gaming: 16 jogos | Revenge: 12 jogos
- FA CHAI: 45 jogos | JDB: 28 jogos | **Micro Gaming: 48 jogos**
- Total: 280+ jogos (8 provedoras)

## URLs
- Frontend: https://gaming-slots-hub-3.preview.emergentagent.com

## Dados MOCKED
- Nomes e imagens dos jogos: REAIS (extraídos do nandabets.com.br)
- Sinais e RTPs: gerados aleatoriamente no frontend
