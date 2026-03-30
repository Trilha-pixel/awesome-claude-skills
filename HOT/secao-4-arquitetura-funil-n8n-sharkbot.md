# Seção 4: Arquitetura do Funil — Shark Bot
## Mapeamento Técnico Nó a Nó da Operação Completa
### Documento Executivo — Uso Interno

---

## Visão Geral

O Shark Bot funciona como orquestrador completo do funil — sem ferramentas externas.
Cada etapa da jornada do lead é um nó conectado visualmente no painel.
A aprovação do PIX, a entrega de acesso e o disparo de upsell acontecem todos
dentro da mesma plataforma, de forma automática.

**Stack da operação:**

| Camada | Ferramenta |
|---|---|
| Aquisição | Meta Ads (link direto para o bot) |
| Funil completo | Shark Bot (todos os nós) |
| Entrega de acesso | Nó **Grupo Temporário** (Shark Bot nativo) |
| Upsell pós-compra | Nó **Upsell** (Shark Bot nativo) |
| Recuperação | Nó **Smart Delay** (Shark Bot nativo) |

---

## Nós Disponíveis no Shark Bot (Referência)

| Categoria | Nó | Função |
|---|---|---|
| Lógica & Fluxo | Atraso | Pausa entre mensagens (segundos) |
| Lógica & Fluxo | Smart Delay | Aguarda X tempo → age só se condição for verdadeira |
| Lógica & Fluxo | Gatilho | Ação agendada (ex: troca de preço à meia-noite) |
| Lógica & Fluxo | Randomizer | Divide tráfego em variações (teste A/B) |
| Lógica & Fluxo | Go To | Redireciona para outro ponto do fluxo |
| Pagamento | Gerar PIX | Cria cobrança e monitora pagamento |
| Pagamento | Order Bump | Oferta adicional antes do código PIX |
| Sequências | Upsell | Mensagem e nova oferta após pagamento confirmado |
| Sequências | Downsell | Oferta alternativa para quem recusou |
| Entrega | Grupo Temporário | Adiciona o comprador ao canal/grupo privado automaticamente |

---

## Fluxo Completo — Nó a Nó

```
┌─────────────────────────────────────────────────────┐
│                  FLUXO SHARK BOT                    │
└─────────────────────────────────────────────────────┘

[NÓ 1] INÍCIO
 Trigger: usuário abre o bot (link do anúncio)
      ↓
[NÓ 2] MENSAGEM COMPOSTA — Abertura
 [FOTO] + Copy + Urgência de preço + 3 botões PIX
      ↓
 ┌────────────────────────────────────────────┐
 │ Botão A: Vitalício + ZAP  → R$27,97        │
 │ Botão B: WhatsApp VIP     → R$15,00        │
 │ Botão C: Acesso (73% OFF) → R$14,90        │
 └────────────────────────────────────────────┘
      ↓ (cada botão abre seu próprio nó PIX)
[NÓ 3] ORDER BUMP
 Campo "Mensagem antes do código" do nó PIX
 Para Botões B e C (sem ZAP): oferta de upgrade +R$12
      ↓
[NÓ 4] GERAR PIX
 Valor de acordo com o plano escolhido
 Monitora confirmação automaticamente
      │
      ├── [PAGAMENTO CONFIRMADO]
      │         ↓
      │   [NÓ 5] GRUPO TEMPORÁRIO
      │    Adiciona o usuário ao canal privado
      │    Duração: Vitalício
      │         ↓
      │   [NÓ 6] ATRASO — 30 segundos
      │         ↓
      │   [NÓ 7] UPSELL
      │    [ÁUDIO íntimo] + Oferta WhatsApp R$47,00
      │    ├── [Sim] → novo nó GERAR PIX R$47,00
      │    │         → confirmado: GRUPO TEMPORÁRIO (WhatsApp)
      │    └── [Não] → GO TO: mensagem de encerramento
      │
      └── [SEM PAGAMENTO — 15min]
                ↓
          [NÓ 8] SMART DELAY (15 minutos)
           Condição: não pagou
                ↓
          [NÓ 9] MENSAGEM COMPOSTA — Recuperação
           [GIF] + Bônus áudio + mesmo PIX
           ├── [Fechar agora] → exibe PIX novamente
           └── [Não quero] → encerra fluxo
                ↓
          [NÓ 10] SMART DELAY (45 minutos)
           Condição: ainda não pagou
                ↓
          [NÓ 11] DOWNSELL
           Oferta final: R$9,90 por 24h
           Encerra fluxo independente da resposta
```

---

## Configuração Detalhada de Cada Nó

### NÓ 1 — Início
```
Trigger: Quando o usuário inicia
Ação imediata: disparar NÓ 2
```

---

### NÓ 2 — Mensagem Composta (Abertura)

**Componentes da Mensagem Composta:**
```
Elemento 1: Texto
"Oi {{primeiro_nome}} 🥵 eu sou a [Nome] e tenho
só [idade] aninhos, mas já faço coisas que você
nem imagina... 🔞

🔥 +100 MÍDIAS EXCLUSIVAS
🔥 VÍDEOS CASEIROS
🔥 CONTEÚDO SEM FILTRO
🔥 O QUE NÃO POSTO EM NENHUMA REDE
🔥 ACESSO VITALÍCIO — paga uma vez, fica pra sempre

⚠️ 7 Dias de Garantia — não gostou, devolvemos tudo

🚨 VIP por apenas R$ 14,90 até às 23:59 de hoje!
Depois sobe para R$ 29,90. Aproveita antes 🙈👇"

Elemento 2: Imagem
[foto da modelo — arquivo enviado no painel]

Elemento 3: Botões
[🎁 VITALÍCIO + ZAP 🔞 — R$ 27,97] → NÓ PIX A
[MEU WHATSAPP — R$ 15,00]           → NÓ PIX B
[ACESSO VITALÍCIO (73% OFF) — R$ 14,90] → NÓ PIX C
```

---

### NÓ 3 — Order Bump (configurado dentro de cada nó PIX)

Campo "Mensagens Personalizadas → Mensagem antes do código":

```
[FOTO BORRADA — diferente da abertura]

Espera antes de gerar o PIX ⚡
Tenho uma oferta que só aparece uma vez.

Esse conteúdo aqui é o mais pedido do meu privado.
Você pode adicionar agora por só +R$ 12,00.
Depois daqui some. Não volta mais.

[Botão 1] → Adicionar por +R$12 🔥   (recalcula valor do PIX)
[Botão 2] → Só o plano mesmo         (mantém valor original)
```

**Aplicar nos nós PIX B (R$15,00) e PIX C (R$14,90).**
No PIX A (R$27,97 com ZAP) o Order Bump não é necessário — já inclui o acesso completo.

---

### NÓ 4 — Gerar PIX (3 instâncias)

**PIX A — Vitalício + ZAP:**
```
Nome do Plano: Acesso Vitalício + ZAP
Valor: R$ 27,97
Duração do Acesso: Vitalício
Formato: Bloco de código
QR Code: ✓ | Copia e Cola: ✓
Mostrar Plano Antes do PIX: ✗
```

**PIX B — WhatsApp VIP:**
```
Nome do Plano: Meu WhatsApp
Valor: R$ 15,00
Duração do Acesso: Vitalício
Formato: Bloco de código
```

**PIX C — Acesso Vitalício (entrada):**
```
Nome do Plano: Acesso Vitalício
Valor: R$ 14,90
Duração do Acesso: Vitalício
Formato: Bloco de código
```

---

### NÓ 5 — Grupo Temporário (Entrega de Acesso)

```
Canal/Grupo: [ID do canal privado]
Duração: Vitalício (sem expiração)
Mensagem de boas-vindas:
  "Bem-vindo ao privado 🔒
   Aqui você encontra tudo que prometi.
   Qualquer dúvida é só me chamar 🤍"
```

**Este nó é ativado automaticamente pelo Shark Bot quando o PIX é confirmado.**
Não requer nenhuma ação manual.

---

### NÓ 6 — Atraso (30 segundos)

Pausa entre a entrega do acesso e o disparo do upsell.
Timing ideal: o comprador ainda está na euforia pós-pagamento.

---

### NÓ 7 — Upsell (WhatsApp VIP)

```
[ÁUDIO — 20s, tom íntimo]
"Ei, que bom que você entrou... fico feliz mesmo 🥺
Tenho uma coisa pra te perguntar.
Quer um contato mais próximo comigo?
Não ofereço isso pra todo mundo..."

Além do canal, tenho um grupo exclusivo no WhatsApp.
Lá é onde eu realmente converso 💭
São só 15 pessoas. Quando encher, fecho.

R$ 47,00 — uma vez, sem mensalidade.
Eu adiciono você pessoalmente 🤍

[Botão 1] → Quero entrar no WhatsApp 🤍  (novo nó PIX R$47,00)
[Botão 2] → Agora não                    (GO TO: encerramento)
```

**Configuração do nó Upsell no Shark Bot:**
- Ativar após confirmação de pagamento de qualquer PIX (exceto o PIX A que já inclui ZAP)
- Para PIX A: pular o Upsell e ir direto para Grupo Temporário + encerramento

---

### NÓ 8 — Smart Delay (Recuperação 15 minutos)

```
Tempo de espera: 15 minutos
Condição: usuário NÃO confirmou pagamento
Executar: apenas 1 vez por usuário
```

---

### NÓ 9 — Mensagem Composta (Recuperação de Carrinho)

```
[GIF — diferente dos anteriores, mesmo estilo de corte estratégico]

Oi, ainda tô aqui 👀
Seu acesso ainda tá reservado...

A maioria das pessoas que chegaram hoje já tão dentro.

Se você fechar agora, eu libero um áudio exclusivo
junto com o acesso — de graça 🎁

Valor continua o mesmo. Não muda.

[Botão 1] → Quero fechar + o áudio 🎁   (exibe o mesmo PIX)
[Botão 2] → Não tenho interesse          (encerra fluxo)
```

---

### NÓ 10 — Smart Delay (45 minutos)

```
Tempo de espera: 45 minutos após /start
Condição: usuário ainda NÃO pagou
Executar: apenas 1 vez por usuário
```

---

### NÓ 11 — Downsell (Oferta Final)

```
Última chance antes de encerrar o fluxo.

🚨 Tô liberando acesso por R$ 9,90 só hoje.
Amanhã esse valor não existe mais.

[Botão 1] → Quero por R$ 9,90           (novo nó PIX R$9,90)
[Botão 2] → Não                         (encerra sem mais mensagens)
```

---

### Nó Extra — Gatilho Agendado (Troca de Preço)

```
Horário: 00:00 todos os dias
Ação: atualizar valor do PIX C de R$14,90 para R$29,90
      atualizar texto do botão para "ACESSO VITALÍCIO — R$ 29,90"
Reverter: às 08:00 — voltar para R$14,90 e atualizar copy de urgência
```

Isso cria a urgência da deadline noturna de forma automática e recorrente.

---

## Diagrama Visual Resumido

```
INÍCIO
  ↓
MENSAGEM DE ABERTURA
  [foto] [copy] [3 botões]
  │         │         │
PIX A     PIX B     PIX C
R$27,97   R$15,00   R$14,90
  │      (bump)   (bump)
  │         │         │
  └────┬────┘─────────┘
       ↓ PAGO
  GRUPO TEMPORÁRIO (acesso liberado)
       ↓
  ATRASO 30s
       ↓
  UPSELL → PIX R$47,00
  (pular se veio do PIX A)
       │
       └── NÃO PAGOU (qualquer PIX)
                ↓
           SMART DELAY 15min
                ↓
           RECUPERAÇÃO + bônus áudio
                ↓
           SMART DELAY 45min
                ↓
           DOWNSELL R$9,90
                ↓
           ENCERRA
```

---

## Checklist de Implementação

- [ ] Criar fluxo no Shark Bot com todos os nós na sequência acima
- [ ] Configurar Mensagem Composta de abertura (foto + texto + 3 botões)
- [ ] Configurar 3 nós PIX (R$27,97 · R$15,00 · R$14,90)
- [ ] Configurar Order Bump nos PIX B e C (campo "Mensagem antes do código")
- [ ] Configurar nó Grupo Temporário com ID do canal privado
- [ ] Configurar nó Upsell com áudio + PIX R$47,00
- [ ] Configurar Smart Delay de 15min (condição: não pagou)
- [ ] Configurar Smart Delay de 45min (condição: ainda não pagou)
- [ ] Configurar nó Downsell com PIX R$9,90
- [ ] Configurar Gatilho agendado para troca de preço à meia-noite
- [ ] Testar fluxo completo com número próprio do /start até entrega no canal

---

## KPIs para Acompanhamento (Shark Bot Stats)

| Métrica | Meta |
|---|---|
| CTR do anúncio (Meta Ads) | > 2,5% |
| Taxa /start → botão clicado | > 60% |
| Taxa botão → PIX gerado | > 70% |
| Taxa PIX gerado → Pago | > 35% |
| Taxa Order Bump | > 25% |
| Taxa Upsell WhatsApp | > 15% |
| Taxa Recuperação (15min) | > 10% |
| Ticket médio | > R$28,00 |
| ROAS | > 3x |

---

*Seção 4 concluída (v3 — 100% Shark Bot, sem ferramentas externas)*
