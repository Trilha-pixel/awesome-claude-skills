# Seção 4: Arquitetura do Funil — N8N + Shark Bot
## Mapeamento Técnico Nó a Nó da Operação Completa
### Documento Executivo — Uso Interno

---

## Correção de Premissa — Sem Pre-Sell Page

> **Nota de campo:** análise de concorrentes ativos no mercado brasileiro confirma que
> operações lucrativas nesse nicho **não usam landing page intermediária**. O tráfego vai
> direto do anúncio para o bot. O aquecimento acontece dentro do próprio bot — na primeira
> mensagem, com foto da modelo + copy de oferta + botões de compra imediatos.
>
> Pre-sell pages adicionam fricção, aumentam CPL e são desnecessárias quando o criativo
> do anúncio já entrega o lead pré-aquecido pelo próprio contexto.

---

## Visão Geral da Arquitetura Revisada

| Camada | Ferramenta | Responsabilidade |
|---|---|---|
| **Aquisição** | Meta Ads | Gerar clique direto para o bot |
| **Conversão** | Shark Bot (Telegram) | Pitch, pagamento e entrega |
| **Automação** | N8N | Webhook, liberação de acesso, upsell, relatórios |
| **Controle** | Google Sheets | Registro de compradores e métricas |

---

## Fluxo Completo — Jornada do Lead (Versão Real)

```
┌─────────────────────────────────────────────────────────┐
│                   JORNADA DO LEAD                       │
└─────────────────────────────────────────────────────────┘

[1] FACEBOOK / INSTAGRAM ADS
     Criativo: foto da modelo + copy de curiosidade
     CTA: link direto → t.me/[bot]?start=fb
      ↓ clique
[2] SHARK BOT — /start
     Mensagem de boas-vindas (foto + copy + oferta + botões)
      ↓ botão de compra
[3] SHARK BOT — Order Bump (antes do código PIX)
      ↓ escolha do plano
[4] SHARK BOT — PIX gerado
      ↓ confirmação bancária
[5] N8N — Webhook de Aprovação
     Libera acesso + registra + aguarda 30s
      ↓
[6] SHARK BOT — Upsell (WhatsApp VIP)
      ↓ (se não pagou em 15min)
[7] SHARK BOT — Smart Delay + Recuperação de Carrinho
```

---

## CAMADA 1 — Meta Ads (Topo de Funil)

### NÓ 1 — Facebook / Instagram Ads

**Objetivo:** Gerar clique que abre o bot diretamente — zero fricção intermediária.

**Link de destino do anúncio:**
```
https://t.me/[username_do_bot]?start=fb
```
O parâmetro `?start=fb` permite identificar origem dentro do Shark Bot para análise.

**Configuração técnica:**
- Objetivo de campanha: **Tráfego** (link clicks)
- Sem pixel de conversão no destino — o Telegram não permite rastreamento da Meta
- Orçamento inicial: R$30–R$50/dia por conjunto de anúncios
- Rotação de criativos a cada 7–10 dias

**Criativos recomendados (ver Seção 2):**

| Formato | Descrição | Score |
|---|---|---|
| Vídeo POV íntimo | Câmera frontal, 7–12s, olha pra câmera | 9/10 |
| Estático blur + cadeado | Foto da modelo com área central desfocada | 8/10 |
| Meme com tensão | Template reconhecível, copy elíptico | 8/10 |

**Segmentação:**
```
Público frio:
  Interesses: Humor, Entretenimento, Memes, Reels virais
  Idade: 18–34 · País: Brasil
  Exclusão: quem já interagiu com o perfil

Público quente (retargeting — fase 2):
  Engajamento com o perfil nos últimos 30 dias
  Lookalike 1% de compradores (mínimo 50 conversões para ativar)
```

**Insight de concorrência:**
O anúncio mais eficiente nesse nicho é uma **foto da modelo com copy de 1 linha** +
emoji de cadeado no CTA. Sem vídeo, sem texto longo, sem explicação do produto.
A curiosidade é suficiente para o clique — o bot faz o resto.

---

## CAMADA 2 — Shark Bot (Conversão)

### NÓ 2 — /start + Mensagem de Abertura

**Trigger:** Usuário abre o bot pelo link do anúncio.
**Objetivo:** Entregar a oferta completa na primeira mensagem — sem nós de boas-vindas
separados, sem aquecimento longo. O Impulsivo já chegou aquecido pelo anúncio.

**Configuração no Shark Bot:**
- Nó: **Início** → imediatamente **Mensagem Composta**
- Registrar `{{primeiro_nome}}` para personalização

**Estrutura da Mensagem Composta de Abertura:**

```
[FOTO — modelo em pose sugestiva, não explícita, alta qualidade]

Oi {{primeiro_nome}} 🥵 eu sou a [Nome] e tenho
só [idade] aninhos, mas já faço coisas que você
nem imagina... 🔞

🔥 +100 MÍDIAS EXCLUSIVAS
🔥 VÍDEOS CASEIROS
🔥 CONTEÚDO SEM FILTRO
🔥 O QUE NÃO POSTO EM NENHUMA REDE
🔥 ACESSO VITALÍCIO — paga uma vez, fica pra sempre

⚠️ 7 Dias de Garantia — não gostou, devolvemos tudo

🚨 VIP por apenas R$ 14,90 até às 23:59 de hoje!
Depois o valor sobe para R$ 29,90.
Aproveita antes que aumente 🙈👇
```

**Botões (múltiplos — exibidos ao mesmo tempo):**

| Botão | Valor | Plano |
|---|---|---|
| 🎁 VITALÍCIO + ZAP 🔞 | R$ 27,97 | Acesso ao canal + WhatsApp |
| MEU WHATSAPP | R$ 15,00 | Só o WhatsApp VIP |
| ACESSO VITALÍCIO (73% OFF) | R$ 14,90 | Só o canal privado |

**Por que múltiplos botões na mesma tela:**
Análise de concorrentes mostra que apresentar 3 opções de preço simultaneamente aumenta
o ticket médio geral — o usuário ancora no preço do meio e percebe o mais caro como
referência de valor. O mais barato converte o Impulsivo que hesitaria com qualquer
valor mais alto.

---

### NÓ 3 — Order Bump (Mensagem antes do código PIX)

**Configuração:** Campo "Mensagem antes do código" dentro de cada nó PIX.

Aplicar para os planos R$14,90 e R$15,00:

```
[FOTO BORRADA — diferente da abertura, nova imagem]

Espera antes de gerar o PIX ⚡

Só dessa vez: adiciona o ZAP por +R$ 12,00
e você terá acesso direto ao meu WhatsApp pessoal.

Depois daqui essa oferta some.
```

**Botão 1:** `Sim, quero o ZAP também (+R$12)` → recalcula PIX
**Botão 2:** `Só o plano mesmo` → mantém PIX original

---

### NÓ 4 — Aguardando Pagamento

O Shark Bot monitora o PIX. Dois caminhos:

```
Pagamento confirmado → N8N Webhook → NÓ 6 (Liberação + Upsell)
Sem pagamento em 15min → NÓ 5 (Smart Delay + Recuperação)
```

---

### NÓ 5 — Smart Delay + Recuperação de Carrinho

**Configuração Smart Delay:**
```
Tempo: 15 minutos após geração do PIX
Condição: usuário NÃO pagou
Execução: apenas 1 vez por usuário
```

**Mensagem de recuperação:**

```
[GIF — movimento sugestivo, corta antes de revelar]

Oi, ainda tô aqui 👀

Seu acesso ainda tá reservado...

A maioria das pessoas que chegaram aqui hoje
já tão dentro do meu privado.

Se você fechar agora, eu libero um áudio
exclusivo junto com o acesso — de graça 🎁

Valor continua R$ 14,90. Não muda.
```

**Botão 1:** `Quero fechar + o áudio 🎁` → exibe o mesmo PIX
**Botão 2:** `Não tenho interesse` → encerra sem mais mensagens

**Segundo disparo (45 minutos — opcional):**
```
Condição: ainda não pagou
Oferta: R$ 9,90 por 24h apenas
Execução: 1 vez, encerra o fluxo independente da resposta
```

---

## CAMADA 3 — N8N (Webhook e Automação)

### NÓ 6 — Webhook de Aprovação de Pagamento

**Trigger:** Shark Bot envia POST ao N8N ao confirmar pagamento.

**URL do webhook (cadastrar no nó PIX do Shark Bot):**
```
https://[seu-n8n].app/webhook/pagamento-aprovado
```

**Payload recebido:**
```json
{
  "user_id": "123456789",
  "first_name": "João",
  "valor_pago": 14.90,
  "plano": "Acesso Vitalício",
  "timestamp": "2026-03-30T22:50:00Z",
  "origem": "fb"
}
```

**Fluxo N8N:**

```
[Webhook Trigger]
      ↓
[IF] — plano inclui ZAP?
      ↓ Sim                    ↓ Não
[Set] plano = canal + zap   [Set] plano = canal
      ↓                          ↓
      └──────────┬───────────────┘
                 ↓
     [HTTP Request] → API Telegram
     Liberar acesso ao canal privado (invite link)
                 ↓
     [HTTP Request] → Google Sheets
     Registrar: Data | Nome | User ID | Valor | Plano | Origem
                 ↓
     [Wait] — 30 segundos
                 ↓
     [HTTP Request] → Shark Bot API
     Disparar mensagem de Upsell (NÓ 7)
```

**Nó de erro obrigatório:**
Adicionar nó **Error Trigger** → envia mensagem no seu Telegram pessoal informando
falha no webhook com o user_id afetado para resolução manual.

---

### NÓ 7 — Liberação de Acesso + Disparo do Upsell

**Ação A — Liberar acesso via API Telegram:**
```
Endpoint: POST https://api.telegram.org/bot[TOKEN]/createChatInviteLink
Parâmetros:
  chat_id: [ID do canal privado]
  member_limit: 1
  expire_date: 0 (sem expiração — acesso vitalício)
```

**Ação B — Registrar comprador no Google Sheets:**
```
Aba: Compradores
Colunas: Data | Nome | User_ID | Valor | Plano | Origem | Status
```

**Ação C — Upsell WhatsApp (30s após confirmação):**

Mensagem disparada via Shark Bot API para quem comprou o plano sem ZAP:

```
[ÁUDIO — 20s, tom íntimo, como mensagem de voz pessoal]
"Ei, que bom que você entrou... fico feliz mesmo 🥺
Tenho uma coisa pra te perguntar — quer um contato mais próximo comigo?
Não ofereço isso pra todo mundo, mas você pareceu diferente..."

Além do canal, tenho um grupo exclusivo no WhatsApp.

Lá eu mando o que ainda não tô pronta
pra postar em lugar nenhum.
São só 15 pessoas. Quando encher, fecho.

R$ 47,00 — uma vez, sem mensalidade.
Eu adiciono você pessoalmente 🤍
```

**Botão 1:** `Quero entrar no WhatsApp 🤍` → PIX R$47,00 → N8N repete o fluxo
**Botão 2:** `Agora não` → envia link do canal + encerra

---

## Diagrama Técnico Completo (Versão Revisada)

```
META ADS
│  Foto da modelo + copy 1 linha + emoji 🔒
│  Link: t.me/[bot]?start=fb
│
▼
SHARK BOT — /start
│  Detecta origem · Registra primeiro_nome
│
▼
SHARK BOT — Mensagem de Abertura
│  [FOTO] + Copy direto + Lista de conteúdo
│  + Urgência de preço (deadline 23:59)
│
│  ┌─────────────────────────────────┐
│  │ BOTÃO: Vitalício + ZAP R$27,97  │
│  │ BOTÃO: WhatsApp VIP R$15,00     │
│  │ BOTÃO: Acesso 73%OFF R$14,90    │
│  └─────────────────────────────────┘
│
▼ (qualquer botão)
ORDER BUMP (antes do código PIX)
│  Para planos sem ZAP: oferta de upgrade +R$12
│
▼
PIX GERADO
│
├── [SEM PAGAMENTO — 15min]
│    Smart Delay → Recuperação
│    [GIF] + bônus áudio exclusivo
│    └── [SEM PAGAMENTO — 45min]
│         Oferta R$9,90 · encerra fluxo
│
└── [PAGAMENTO CONFIRMADO]
         ↓
    N8N — Webhook Trigger
    ├── IF: plano inclui ZAP?
    ├── Liberar acesso canal (API Telegram)
    ├── Registrar Google Sheets
    └── [30s] → Upsell WhatsApp
              ├── [Sim] → PIX R$47 → N8N repete
              └── [Não] → Link canal + encerra
```

---

## Estratégia de Preço — Baseada em Concorrência

O mercado opera com dois modelos complementares:

**Modelo 1 — Deadline Diária (mais agressivo):**
```
R$14,90 até às 23:59 → sobe para R$29,90
```
Cria urgência real com prazo verificável. O bot deve atualizar o preço automaticamente
à meia-noite via nó Gatilho agendado no Shark Bot.

**Modelo 2 — Ancoragem Estática (mais conservador):**
```
"Valor normal R$49,90 → hoje R$27,90"
```
Sem deadline, mas com ancoragem forte. Mais simples de operar, menor conversão de impulso.

**Recomendação:** começar com o Modelo 1 (deadline às 23:59) para maximizar conversão
do Impulsivo. Migrar para Modelo 2 após escalar volume e estabilizar operação.

---

## Checklist de Implementação (Revisado)

### Shark Bot
- [ ] Criar fluxo com nó Início → Mensagem Composta (foto + copy + 3 botões)
- [ ] Configurar 3 nós PIX (R$14,90 · R$27,97 · R$15,00)
- [ ] Configurar Order Bump nos planos sem ZAP
- [ ] Configurar nó PIX de upsell pós-compra (R$47,00)
- [ ] Cadastrar URL do webhook N8N em todos os nós PIX
- [ ] Configurar Smart Delay 15min (condição: não pagou)
- [ ] Configurar Smart Delay 45min (condição: ainda não pagou)
- [ ] Configurar Gatilho agendado para troca de preço à meia-noite (se usar Modelo 1)
- [ ] Testar fluxo completo com número próprio

### N8N
- [ ] Criar Webhook Trigger com URL única + autenticação por header
- [ ] Construir IF node para separar planos (com ZAP / sem ZAP)
- [ ] Conectar Google Sheets (aba Compradores)
- [ ] Configurar HTTP Request → API Telegram (invite link)
- [ ] Configurar HTTP Request → Shark Bot API (disparo do upsell)
- [ ] Adicionar Error Trigger → notificação no Telegram pessoal
- [ ] Testar com payload simulado antes de ativar

### Meta Ads
- [ ] Criar criativo: foto da modelo + copy 1 linha
- [ ] Criar 2 variações adicionais (blur + meme)
- [ ] Link de destino: `t.me/[bot]?start=fb`
- [ ] Configurar segmentação (18–34, BR, Entretenimento)
- [ ] Ativar com R$30/dia · escalar após 3 dias com ROAS positivo

---

## KPIs Revisados (Sem Pre-Sell)

| Métrica | Onde medir | Meta |
|---|---|---|
| CTR do anúncio | Meta Ads | > 2,5% |
| CPL (custo por /start) | Meta Ads | < R$2,00 |
| Taxa /start → botão clicado | Shark Bot Stats | > 60% |
| Taxa botão clicado → PIX gerado | Shark Bot Stats | > 70% |
| Taxa PIX gerado → Pago | Shark Bot Stats | > 35% |
| Taxa Order Bump | Shark Bot Stats | > 25% |
| Taxa Recuperação (15min) | Shark Bot Stats | > 10% |
| Taxa Upsell WhatsApp | Shark Bot Stats | > 15% |
| Ticket médio | Google Sheets | > R$28,00 |
| ROAS | Manual | > 3x |

---

*Seção 4 concluída (v2 — sem pre-sell page) · Ver Masterplan Executivo*
