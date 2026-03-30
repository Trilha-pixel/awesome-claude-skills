# Análise de Funil Concorrente + Versão Melhorada
## Baseado em Export FlexionPay — Adaptado para Shark Bot
### Documento Executivo — Uso Interno

---

## PARTE 1 — MAPEAMENTO DO FUNIL CONCORRENTE (FlexionPay)

### Estrutura Geral

**Plataforma:** FlexionPay (concorrente do Shark Bot — mesma lógica de nós visuais)
**Entrada:** 2 imagens + texto + 3 botões de preço simultâneos
**Ramificações principais:** 5 branches a partir da etapa de entrada

---

### Diagrama Completo do Funil Concorrente

```
┌─────────────────────────────────────────────────────────────┐
│                    ENTRADA (etapa 607)                       │
│   [IMAGEM 1] + [IMAGEM 2] + copy                            │
│                                                             │
│   [VITALÍCIO + ZAP → R$27,97]                               │
│   [WHATSAPP VIP   → R$15,99]                                │
│   [ACESSO 73% OFF → R$14,90]                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
          ┌────────────┼─────────────────────────────┐
          │            │                             │
          ▼            ▼                             ▼
   [PAGO - PIX    [NÃO PAGOU      [NÃO PAGOU      [NÃO PAGOU
   CONFIRMADO]    +1 min]         +5 min]          +5 min]
          │            │                             │
          │            ▼                             ▼
          │      UPSELL RÁPIDO               DOWNSELL VÍDEO
          │      R$9,99 (sem mídia)          -60% / -50%
          │            │                    (com vídeo)
          │            │                             │
          │            └──────────────┬──────────────┘
          │                           ▼
          │                  REMARKETING +5min
          │                  -20% / -40%
          │                           │
          │                  ┌────────┴────────┐
          │                  │                 │
          │                  ▼                 ▼
          │           LOOP RECURSIVO      GHOST NODE
          │           (etapas 14139→      +30min
          │           14142→14145...)     [vazio — drop silencioso]
          │
          ▼
   PÓS-COMPRA (etapa com etapa_export_id: null)
   ⚠️ DARK PATTERN — ver análise abaixo
```

---

### Loop de Remarketing Recursivo (Detalhe)

O funil concorrente usa um ciclo contínuo de degradação de preço que corre por 30+ minutos:

```
Ciclo 1 (etapas 14139 → 14142 → 14145):
  ├── UPSELL    +1min  →  R$9,99     (sem vídeo)
  ├── DOWNSELL  +5min  →  -60%/-50%  (com vídeo)
  └── REMARKETING +5min → -20%/-40%

Ciclo 2 (etapas 14148 → 14151 → 14154):
  └── (mesma estrutura, preços mais baixos)

Ciclo N → ... → piso R$6,99 (track rápido, ~2min)

Ghost Node (etapa 18919):
  └── DOWNSELL +30min → nó vazio, sem copy, sem plano
      → lead simplesmente sai do funil sem mensagem
```

**Tabela de Degradação de Preço:**

| Etapa | Delay | Tipo | Desconto | Preço aprox. |
|---|---|---|---|---|
| Entrada | — | Pitch | — | R$27,97 / R$15,99 / R$14,90 |
| Upsell rápido | +1min | Upsell | — | R$9,99 |
| Downsell 1 | +5min | Downsell | -60%/-50% | ~R$11,19 |
| Remarketing 1 | +5min | Remarketing | -20%/-40% | ~R$16,78 |
| Downsell 2 | +5min | Downsell | (recursivo) | menor |
| Remarketing 2 | +5min | Remarketing | (recursivo) | menor |
| Track rápido | +2min | Fast track | — | R$6,99 |
| Ghost drop | +30min | Vazio | — | — |

---

### Dark Pattern Identificado — NÃO REPLICAR

**Nó pós-compra (etapa_export_id: null):**

```
Mensagem enviada APÓS pagamento confirmado:

"🚨 ACESSO BLOQUEADO
Identificamos uma irregularidade no seu pagamento.
Para liberar o acesso você precisa fazer a ativação manual.
[BOTÃO: Fazer ativação — R$X,XX]
100% reembolsável caso não seja aprovado."

Escalada com ameaça de banimento de CPF.
```

**Por que existe:** Tenta fazer o comprador pagar uma segunda vez logo após confirmar o PIX.

**Por que NÃO usar:**
- Gera chargeback imediato quando o comprador percebe
- Denúncia de golpe no Telegram (bot banido)
- Reputação destruída
- Risco legal (estelionato)

---

## PARTE 2 — O QUE REPLICAR / O QUE MELHORAR / O QUE DESCARTAR

### ✅ Replicar (boas práticas identificadas)

| Prática | Motivo |
|---|---|
| 3 botões simultâneos na entrada | Não pré-seleciona o lead — ele escolhe sua intenção de gasto |
| Loop de remarketing recursivo | Cobre o Impulsivo que precisa de múltiplos toques antes de converter |
| Degradação progressiva de preço | Serve ao Impulsivo tardio (quem não pagou no primeiro impulso) |
| Media escalation (imagem → vídeo) | Guarda o criativo mais forte para quem mais precisou de convencimento |
| IDs de plano duplicados por branch | Permite atribuição de conversão por ramificação sem ferramenta externa |
| Drop silencioso ao final | Não insistir após X tentativas — evita bloqueio do bot |

### ⚡ Melhorar

| Problema no concorrente | Nossa versão |
|---|---|
| Upsell rápido (+1min) sem mídia | Adicionar [GIF] ou [FOTO] no upsell — cérebro precisa de âncora visual |
| Copy genérica no remarketing | Usar personalização `{{primeiro_nome}}` + tom GFE leve |
| Loop sem encerramento explícito | Botão "Não tenho interesse" ao final → encerra sem mais mensagens |
| Preço piso R$6,99 via fast track | Manter R$9,90 como piso — abaixo disso destrói percepção de valor |
| Ghost node ambíguo (sem copy, sem plano) | Substituir por mensagem de encerramento real |
| Falta de order bump na entrada | Adicionar order bump antes do PIX (+R$12 no conteúdo extra) |

### ❌ Descartar

| Elemento | Motivo |
|---|---|
| Dark pattern pós-compra ("ativação manual") | Chargeback + banimento + risco legal |
| 5 branches paralelas na entrada | Complexidade desnecessária — Shark Bot gerencia melhor com Smart Delay sequencial |
| Recursão além de 2 ciclos | Após 3 tentativas o lead esfriou — insistência vira spam |

---

## PARTE 3 — FUNIL MELHORADO (Nossa Versão — Shark Bot)

### Princípios da Versão Melhorada

1. **Entrada limpa com 3 botões** — mantido do concorrente
2. **Order bump antes do PIX** — adicionado (não tinha no concorrente)
3. **Remarketing com degradação controlada** — máximo 2 ciclos + drop explícito
4. **Piso de preço: R$9,90** — abaixo disso destrói valor percebido
5. **Media escalation** — imagem na entrada, vídeo/GIF no remarketing
6. **Encerramento com dignidade** — sem dark pattern, sem insistência infinita

---

### Diagrama do Funil Melhorado

```
┌───────────────────────────────────────────────────────────────┐
│                    ENTRADA — NÓ 1 SHARK BOT                   │
│   [FOTO da modelo] + copy urgência (deadline 23:59)           │
│                                                               │
│   [🎁 VITALÍCIO + ZAP → R$27,97]                              │
│   [MEU WHATSAPP    → R$15,00]                                 │
│   [ACESSO (73%OFF) → R$14,90]                                 │
└────────────────────────────┬──────────────────────────────────┘
                             │
                  ┌──────────▼──────────┐
                  │     ORDER BUMP      │
                  │  [FOTO BORRADA 2]   │
                  │  "+R$12 vídeo extra"│
                  │  (aparece antes PIX │
                  │  nos planos B e C)  │
                  └──────────┬──────────┘
                             │
                  ┌──────────▼──────────┐
                  │     GERAR PIX       │
                  │  (3 instâncias)     │
                  └──────────┬──────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
     [PAGAMENTO CONFIRMADO]        [SEM PAGAMENTO — 15min]
              │                             │
              ▼                             ▼
     GRUPO TEMPORÁRIO              RECUPERAÇÃO CICLO 1
     (acesso liberado)             ─────────────────────
              │                    [GIF — corte estratégico]
              ▼                    "Ainda tô aqui 👀"
         ATRASO 30s                bônus áudio exclusivo
              │                    R$14,90 (mesmo preço)
              ▼                    [Fechar + áudio] [Não quero]
         UPSELL                             │
         [ÁUDIO 20s íntimo]                 ▼
         WhatsApp VIP R$47,00      [SEM PAGAMENTO — 45min]
         [Quero entrar] [Agora não]          │
              │                             ▼
              ▼                    DOWNSELL CICLO 2
         ENCERRAMENTO              ──────────────────
         (link do canal)           [VÍDEO — melhor criativo]
                                   "Última chance"
                                   R$9,90 por 48h
                                   [Quero R$9,90] [Não]
                                             │
                                             ▼
                                    ENCERRAMENTO EXPLÍCITO
                                    "Tudo bem, sem pressão 😊
                                     Se quiser voltar é só
                                     acessar o link da bio."
                                    (sem mais mensagens)
```

---

### Configuração Nó a Nó — Versão Melhorada

#### Timing da Sequência de Recuperação

| Nó | Delay desde /start | Tipo | Preço | Mídia |
|---|---|---|---|---|
| Pitch inicial | 0 | Entrada | R$14,90 / R$15,00 / R$27,97 | Foto |
| Order Bump | imediato | Bump | +R$12 | Foto borrada 2 |
| Recuperação 1 | +15min | Smart Delay | R$14,90 (mesmo) | GIF |
| Downsell 1 | +45min | Smart Delay | R$9,90 | Vídeo |
| Encerramento | — | Drop explícito | — | Nenhuma |

**Máximo: 2 tentativas de recuperação. Depois: encerra.**

---

#### Nó de Recuperação Ciclo 1 (Smart Delay 15min)

```
[GIF — mesmo estilo de corte, arquivo diferente do pitch]

{{primeiro_nome}}, ainda tô aqui 👀

Seu acesso tá guardado por mais um pouquinho...

A maioria das pessoas que chegaram hoje já tão lá dentro
curtindo o conteúdo 🔥

Se você fechar agora, libero um áudio exclusivo junto —
de graça. Não tá anunciado em lugar nenhum.

[Botão 1] → Fechar agora + áudio 🎁   (exibe o mesmo PIX)
[Botão 2] → Não tenho interesse        (encerra o fluxo)
```

---

#### Nó de Downsell Ciclo 2 (Smart Delay 45min)

```
[VÍDEO — melhor criativo reservado para esse momento]

Oi, última mensagem, prometo 🥺

Sei que o valor pode ter travado.
Então vou fazer diferente:

Acesso por 48 horas completas por só R$ 9,90.
Sem mensalidade. Só pra você testar.

Se gostar (e vai gostar), tem opção vitalícia depois.

[Botão 1] → Quero 48h por R$9,90 🔓   (novo PIX R$9,90)
[Botão 2] → Não                        (encerra sem mais mensagens)
```

---

#### Encerramento Explícito (após "Não" no Ciclo 2)

```
Tudo bem, sem pressão 😊

Se um dia quiser entrar, o link fica na bio.

[sem mais mensagens — nunca disparar novamente para este usuário]
```

---

### Tabela: Concorrente vs. Nossa Versão

| Dimensão | Concorrente (FlexionPay) | Nossa Versão (Shark Bot) |
|---|---|---|
| Entry point | 3 botões + 2 imagens | 3 botões + 1 foto (mais limpo) |
| Order bump | Não tem | Sim — antes do PIX (+R$12) |
| Recuperação | Loop recursivo 30+ min | 2 ciclos máximos (15min + 45min) |
| Piso de preço | R$6,99 | R$9,90 |
| Media no remarketing | Vídeo tardio | GIF (ciclo 1) + Vídeo (ciclo 2) |
| Personalização | Nenhuma | {{primeiro_nome}} nos nós de recuperação |
| Encerramento | Ghost node (silêncio) | Mensagem explícita + drop limpo |
| Pós-compra dark pattern | ✅ Usa (fraude) | ❌ Não usa |
| Upsell pós-compra | Não documentado | Áudio íntimo → WhatsApp R$47,00 |
| Tracking por branch | IDs duplicados | Usar label de plano por botão |

---

## Checklist de Implementação no Shark Bot

- [ ] Configurar entrada com 3 botões (R$27,97 / R$15,00 / R$14,90)
- [ ] Configurar Order Bump nos planos B (R$15,00) e C (R$14,90)
- [ ] Configurar 3 nós PIX com os valores corretos
- [ ] Configurar Grupo Temporário para entrega automática
- [ ] Configurar Upsell pós-compra (áudio + WhatsApp R$47,00)
- [ ] Configurar Smart Delay 15min + Recuperação Ciclo 1 (GIF + bônus)
- [ ] Configurar Smart Delay 45min + Downsell Ciclo 2 (vídeo + R$9,90)
- [ ] Configurar mensagem de encerramento explícito (sem mais mensagens)
- [ ] Configurar Gatilho agendado (00:00 → R$14,90 sobe para R$29,90)
- [ ] Preparar mídias: 1 foto entrada, 2 fotos borradas, 2 GIFs, 1 vídeo forte, 2 áudios
- [ ] Testar fluxo completo (path pago + path de abandono)
- [ ] Verificar que nenhum nó dispara mais de 1x por usuário

---

*Análise concluída — funnel concorrente mapeado, melhorias documentadas, versão adaptada para Shark Bot pronta para implementação.*
