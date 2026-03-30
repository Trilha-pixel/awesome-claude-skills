# MASTERPLAN EXECUTIVO
## Operação de Conteúdo +18 — Telegram · Privacy · OnlyFans
### Documento Confidencial — Uso Restrito aos Sócios

---

> **Objetivo deste documento**
> Apresentar a arquitetura completa da operação: quem é o cliente, como ele é encontrado,
> como é convertido e como a operação escala com o mínimo de intervenção manual.
> Cada seção foi construída sobre pesquisa de mercado, análise de concorrência e
> engenharia de persuasão aplicada ao comportamento real do consumidor brasileiro.

---

## ÍNDICE

1. [Mapeamento de Audiência — As 3 Buyer Personas](#seção-1)
2. [Engenharia Reversa de Tráfego — O que Funciona nos Anúncios](#seção-2)
3. [Protocolo de Copy — Os Roteiros Exatos do Bot](#seção-3)
4. [Arquitetura Técnica — N8N + Shark Bot Nó a Nó](#seção-4)
5. [Projeção Financeira](#projeção)
6. [Próximos Passos](#próximos-passos)

---

<a name="seção-1"></a>
# SEÇÃO 1 — Mapeamento de Audiência

## Premissa Estratégica

Operadores que tratam esse mercado como "venda de conteúdo" perdem para operadores que
entendem que estão vendendo **experiências emocionais**. A demanda não é por nudez —
é por atenção, exclusividade e a sensação de existir para alguém atraente.

Identificamos três arquiteturas psicológicas recorrentes no comprador brasileiro.
A operação é otimizada para a **Persona 2 (Impulsivo)** no topo de funil,
com o funil construído para capturar as demais no fundo.

---

## PERSONA 1 — O Fã Carente (GFE)

| Atributo | Detalhe |
|---|---|
| Idade | 22–38 anos |
| Estado civil | Solteiro recente, divorciado, ou relacionamento insatisfatório |
| O que compra | Conexão simulada, atenção personalizada, ilusão de ser especial |
| Nível de consciência | Alto — já conhece o mercado, a barreira é a justificativa interna |
| Ticket médio | Médio-alto (R$49–R$149/mês) |
| Janela de decisão | Horas a dias |

**Dor oculta:** Invisibilidade afetiva. Ele existe, mas não se sente visto.
O conteúdo da criadora é o proxy para uma conexão que ele não consegue estabelecer.

**Gatilhos principais:**
- Personalização pelo nome ("fiz esse vídeo pensando em você")
- Escassez de atenção ("atendo poucos por dia")
- Reciprocidade emocional (mensagem de voz antes da venda)

**Objeções no PIX:**
- "Vou ser bloqueado depois que pagar" → combater com prova social de atendimento pós-compra
- "É bot, ela não escreve pra mim" → humanização antes do link: voz, nome, resposta personalizada
- Vergonha de pagar → "PIX não aparece no extrato com nome"

**Produto ideal:** Acesso Vitalício + ZAP (R$27,98) — quer o canal direto, não só o conteúdo.

---

## PERSONA 2 — O Impulsivo / Curioso ⭐ PERSONA PRIORITÁRIA

| Atributo | Detalhe |
|---|---|
| Idade | 18–29 anos |
| Renda | R$1.500–R$4.000/mês |
| Como chega | Via anúncio ou meme — nunca ouviu falar da criadora antes |
| O que compra | Resolução da lacuna criada pelo hook — não compra a criadora, compra o fechamento do que o anúncio prometeu |
| Nível de consciência | Baixo — decisão 100% contextual |
| Ticket ideal | R$19,78–R$27,90 |
| Janela de decisão | **30–90 segundos** — depois disso, a vontade passa e ele não volta |

**Dor oculta:** Necessidade de saciar curiosidade interrompida. O cérebro humano tem compulsão
por completar informações incompletas. O anúncio cria o estado — o bot coleta a conversão.

**Gatilhos principais:**
- Preview truncado (GIF ou foto que corta antes do momento de maior tensão)
- Countdown real no bot ("seu acesso expira em 14:32")
- Prova social numérica ("487 pessoas acessaram essa semana")

**Objeções no PIX:**
- "Depois eu vejo" → nunca volta — combater com urgência real e bônus por tempo limitado
- Abandono silencioso → Smart Delay de 15min com nova oferta

**Produto ideal:** Acesso Vitalício imediato (R$19,78–R$27,90) — preço de entrada baixo,
sem fricção adicional. O ZAP não tem valor percebido para quem não conhece a criadora.

---

## PERSONA 3 — O Sugar Daddy / Provedor de Status

| Atributo | Detalhe |
|---|---|
| Idade | 35–60 anos |
| Renda | R$8.000–R$30.000+/mês |
| Como chega | Indicação, busca direta ou abordagem no perfil público |
| O que compra | Status, controle e admiração exclusiva — dinheiro é instrumento de poder |
| Nível de consciência | Muito alto — já gastou antes em contextos similares |
| Ticket médio | R$200–R$1.000+/mês |
| Janela de decisão | Dias a semanas |

**Dor oculta:** Assimetria de atenção. Ele percebe que pessoas mais jovens e atraentes
não o notariam fora de um contexto transacional. O pagamento nivela esse campo.

**Gatilhos principais:**
- Acesso restrito ("aceito 5 assinantes VIP por mês")
- Tratamento diferenciado nomeado antes da venda
- Discrição total ("sem rastros, sem exposição")

**Objeções no PIX:**
- "Quem garante que é real?" → vídeo personalizado pré-venda com nome dele
- "Não gosto de bot" → o bot é só a porta; a experiência real é no atendimento humano pós-pagamento

**Produto ideal:** Não converte em bot frio. Rota: bot captura o lead → operadora faz contato
humano no WhatsApp → PIX acontece por indicação direta.

---

## Matriz Comparativa

| Dimensão | Fã Carente | Impulsivo | Sugar Daddy |
|---|---|---|---|
| Motivação core | Conexão emocional | Descarga de curiosidade | Status e exclusividade |
| Janela de decisão | Horas / dias | 30–90 segundos | Dias / semanas |
| Ticket ideal | R$49–R$149/mês | R$19–R$39/pack | R$200–R$1.000+/mês |
| Principal objeção | Autenticidade | Custo imediato | Discrição e qualidade |
| Tom do copy | Íntimo e pessoal | Urgente e interrompido | Exclusivo e refinado |
| Canal prioritário | Telegram + DM | Reels / Stories → Bot | WhatsApp VIP |

---

<a name="seção-2"></a>
# SEÇÃO 2 — Engenharia Reversa de Tráfego

## Princípio Central

A Meta não proíbe sugestividade — proíbe explicitude. Anúncios duradouros nesse nicho
seguem uma regra: **a mente do espectador completa o que o anúncio não mostra**.
O compliance aprova. O algoritmo entrega. A conversão acontece fora da plataforma.

---

## Os 3 Ângulos Visuais que Convertem e Sobrevivem

### Ângulo A — POV Íntimo | Score de Longevidade: 9/10

**Descrição:** Mulher gravando a si mesma, câmera frontal, ambiente doméstico.
Olha diretamente para câmera. Roupas comuns ou lingerie leve.

**Especificações de produção:**
- Formato vertical 9:16, sem cortes de edição
- Sem trilha profissional — voz real ou som ambiente
- Duração: 7–12 segundos
- Último frame: tela escura com "link na bio" ou emoji 🔒

**Por que converte com o Impulsivo:** O POV cria falsa intimidade imediata.
O cérebro registra "ela está me olhando" antes de qualquer texto.

---

### Ângulo B — Meme com Tensão | Score de Longevidade: 8/10

**Descrição:** Template de meme reconhecível (dois painéis, reaction face) com copy
que cria curiosidade sem revelar. Parece conteúdo orgânico, não anúncio.

**Especificações:** Templates CapCut/Canva, texto coloquial, erro de digitação intencional,
CTA embutido: "link tá na bio antes que tire 👀"

**Por que converte:** É o formato nativo do feed do Impulsivo. O humor baixa a guarda
e a curiosidade fecha o loop cognitivo.

---

### Ângulo C — Blur + Cadeado | Score de Longevidade: 8/10

**Descrição:** Imagem estática com blur gaussiano na região central + emoji 🔒 sobreposto.
Rosto nítido, expressão provocativa. Texto: "só pra quem tá no privado".

**Por que converte:** Lacuna de informação em formato visual puro. O clique é quase
involuntário — resposta ao instinto de completar imagens incompletas.

---

## Vocabulário Seguro para Copy

| Bloqueado | Equivalente aprovado |
|---|---|
| "conteúdo adulto" | "conteúdo exclusivo" / "canal privado" |
| "nude" / "pelada" | "sem filtro" / "do jeito que sou" |
| "OnlyFans" | "plataforma exclusiva" / "meu perfil VIP" |
| "conteúdo +18" | "não é pra todo mundo" |
| "fotos íntimas" | "o que não posto aqui" |
| "Privacy" | "meu outro perfil" |

---

## As 4 Estruturas de Copy com Maior Longevidade

**Estrutura 1 — A Confissão** *(maior longevidade)*
> "Eu não deveria estar postando isso aqui..."
> "Tem coisa que não dá pra mostrar nesse perfil 🤫"

**Estrutura 2 — A Exclusão Invertida**
> "Não é pra qualquer um, então nem clica se não quiser ver"
> "Quem não aguenta, já sai"

**Estrutura 3 — A Prova Social Numérica**
> "Já são 2.300 no meu privado vendo o que não posto aqui"
> "Esse grupo tá quase cheio, ainda tem 8 vagas"

**Estrutura 4 — O Countdown Implícito**
> "Fica disponível só até hoje à noite"

---

## Fluxo de CTA — Regra Absoluta

**Nunca mencionar Telegram no criativo.** Fluxo obrigatório:

```
Anúncio Meta → Bio / Linktree → Bot Telegram
```

Bio padrão:
```
🔒 Conteúdo que não posto aqui
👇 Canal exclusivo
[link via Linktree → bot]
```

---

## Estratégia de Contingência de Contas

```
Conta A (ativa)     → Rodando com orçamento normal
Conta B (aquecendo) → Posts orgânicos há 30+ dias, sem anúncio ainda
Conta C (backup)    → Criada, verificada, sem histórico
```

Regras: Business Manager separado por conta · Cartão diferente por BM ·
Rotação de criativos a cada 7–10 dias.

---

<a name="seção-3"></a>
# SEÇÃO 3 — Protocolo de Copy do Funil Telegram

## Princípios de Copywriting para Bot

1. **Uma mensagem = uma ação** — cada nó tem um único objetivo
2. **Mídia antes do texto** — o cérebro processa imagem/áudio antes de ler
3. **Parágrafos curtos** — máximo 2 linhas no Telegram (leitura mobile)
4. **Emoji como pontuação visual** — quebra o bloco e direciona o olhar
5. **Botão = único caminho** — o usuário nunca deve se perguntar o que fazer

---

## ROTEIRO 1 — Boas-Vindas (/start)

**Objetivo:** Criar conexão imediata, gerar reciprocidade antes de qualquer oferta.

```
[ÁUDIO — 15s, voz suave, tom de surpresa boa]
"Oi! Que bom que você veio... não esperava te ver aqui tão cedo 🥺
Fica, porque eu separei uma coisa especial pra te mostrar."

[Atraso 1 segundo]

[FOTO BORRADA — rosto nítido, blur abaixo do pescoço, emoji 🔒 sobreposto]

Isso aqui é só um gostinho do que tá te esperando no meu privado 👀

Eu não posto isso em nenhum outro lugar.
Só quem tá dentro vê o restante.

Quer ver tudo? 🔥
```

**[BOTÃO]** `Quero ver 👀` → Roteiro 2

---

## ROTEIRO 2 — Pitch da Oferta Front-End (R$ 27,90)

**Objetivo:** Apresentar a oferta com ancoragem de valor + escassez + clareza total.

```
[GIF — 3 segundos, movimento sugestivo, corta antes de revelar]

Tá vendo esse GIF? 🔥

Isso é só 3 segundos do que tá no meu canal privado.

Lá dentro você encontra:

🔒 Conteúdo que nunca postei em nenhum lugar
📸 Fotos que não passariam no Instagram
🎥 Vídeos que eu faço só pra quem é do privado
💬 Respondo mensagem de quem tá dentro

E o acesso é vitalício — paga uma vez, fica pra sempre.

[Atraso 2 segundos]

O valor normal seria R$ 49,90.

Mas como você chegou agora, tô liberando por R$ 27,90 💥

Esse preço some quando você fechar essa janela.
```

**[BOTÃO 1]** `Quero acesso por R$ 27,90 🔒` → Gera PIX
**[BOTÃO 2]** `Como funciona?` → Mensagem explicativa → retorna ao PIX

---

## ROTEIRO 3 — Order Bump (antes do código PIX)

**Objetivo:** Aumentar ticket médio no momento de maior intenção de compra.

```
[FOTO BORRADA 2 — diferente da anterior]

Espera antes de gerar o PIX ⚡

Tenho uma oferta que só aparece uma vez.

[Atraso 1 segundo]

Esse vídeo aqui é o mais pedido do meu privado.
Nunca deixei disponível fora daqui.

Você pode adicionar ele agora, junto com o acesso,
por só +R$ 12,00.

Depois daqui, esse vídeo some do bot.
Não volta mais.
```

**[BOTÃO 1]** `Adicionar o vídeo por +R$ 12 🔥` → PIX R$ 39,90
**[BOTÃO 2]** `Só o acesso mesmo` → PIX R$ 27,90

---

## ROTEIRO 4 — Upsell de 1 Clique (pós-pagamento confirmado)

**Objetivo:** Vender WhatsApp VIP no pico de receptividade — logo após a primeira compra.

```
[ÁUDIO — 20s, tom íntimo, como mensagem de voz pessoal]
"Ei, que bom que você entrou 🥺 Fico feliz mesmo...
Tenho uma coisa pra te perguntar — você quer um contato mais próximo comigo?
Não é pra todo mundo que ofereço isso, mas você pareceu diferente..."

[Atraso 2 segundos]

Além do canal privado, eu tenho um grupo muito mais exclusivo no WhatsApp.

Lá é onde eu realmente converso.
Onde eu mando o que ainda não tô pronta pra postar em lugar nenhum.
Onde a gente tem uma relação de verdade 💭

São só 15 pessoas nesse grupo agora.
Quando encher, fecho e não abro mais tão cedo.

[Atraso 1 segundo]

O acesso é R$ 47,00 — uma vez, sem mensalidade.

Se quiser entrar, é só um clique aqui.
Eu já adiciono você pessoalmente 🤍
```

**[BOTÃO 1]** `Quero entrar no WhatsApp VIP 🤍` → PIX R$ 47,00
**[BOTÃO 2]** `Agora não` → Link do canal + encerra sem insistência

---

## ROTEIRO 5 — Recuperação de Carrinho (Smart Delay 15 minutos)

**Objetivo:** Resgatar o Impulsivo que viu o PIX mas não pagou.

```
[GIF — diferente dos anteriores, mesma mecânica de corte estratégico]

Oi, ainda tô aqui 👀

Seu acesso ainda tá reservado por mais um tempinho...

[Atraso 1 segundo]

Percebi que você não finalizou ainda.

A maioria das pessoas que chegaram aqui hoje já tão dentro.

[Atraso 1 segundo]

Se você pagar nos próximos 10 minutos,
eu libero um áudio exclusivo junto com o acesso.
Não tá anunciado em lugar nenhum — só pra quem tava em dúvida 🎁

Valor continua R$ 27,90. Não muda.
```

**[BOTÃO 1]** `Quero fechar agora + o áudio 🎁` → exibe o mesmo PIX
**[BOTÃO 2]** `Não tenho interesse` → encerra sem mais mensagens

---

<a name="seção-4"></a>
# SEÇÃO 4 — Arquitetura Técnica N8N + Shark Bot

> **Nota de campo:** operações lucrativas nesse mercado **não usam landing page intermediária**.
> O tráfego vai direto do anúncio para o bot. O aquecimento acontece dentro do próprio bot —
> na primeira mensagem, com foto da modelo + copy de oferta + botões de compra imediatos.

## Visão Geral das Camadas

| Camada | Ferramenta | Responsabilidade |
|---|---|---|
| Aquisição | Meta Ads | Clique direto para o bot — zero fricção |
| Conversão | Shark Bot (Telegram) | Pitch, pagamento e entrega |
| Automação | N8N | Webhook, liberação de acesso, upsell, relatórios |
| Controle | Google Sheets | Registro de compradores e métricas |

---

## Fluxo Técnico Completo

```
[META ADS]
 Foto da modelo + copy 1 linha · Link: t.me/[bot]?start=fb
      ↓ clique direto
[SHARK BOT — /start]
 Detecta origem · Registra primeiro_nome
      ↓
[SHARK BOT — Mensagem de Abertura]
 [FOTO] + Copy direto + Lista de conteúdo
 + Urgência de preço (deadline 23:59)
 ┌─────────────────────────────────┐
 │ BOTÃO: Vitalício + ZAP R$27,97  │
 │ BOTÃO: WhatsApp VIP R$15,00     │
 │ BOTÃO: Acesso 73%OFF R$14,90    │
 └─────────────────────────────────┘
      ↓ qualquer botão
[ORDER BUMP — antes do código PIX]
 Para planos sem ZAP: oferta de upgrade +R$12
      ↓
[PIX GERADO]
      │
      ├── [SEM PAGAMENTO — 15min]
      │    Smart Delay → Recuperação + bônus áudio
      │    [SEM PAGAMENTO — 45min]
      │    Oferta R$9,90 · encerra fluxo
      │
      └── [PAGAMENTO CONFIRMADO]
               ↓
          [N8N — Webhook Trigger]
          ├── IF: plano inclui ZAP?
          ├── Liberar acesso canal (API Telegram)
          ├── Registrar Google Sheets
          └── [30s] → Upsell WhatsApp R$47,00
                    ├── [Sim] → PIX R$47 → N8N repete
                    └── [Não] → Link canal + encerra
```

---

## Mensagem de Abertura do Bot (Nó Principal)

```
[FOTO — modelo, pose sugestiva, alta qualidade]

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

Botões simultâneos:
- `🎁 VITALÍCIO + ZAP 🔞 — R$ 27,97`
- `MEU WHATSAPP — R$ 15,00`
- `ACESSO VITALÍCIO (73% OFF) — R$ 14,90`

---

## Configuração do Webhook N8N

**Payload enviado pelo Shark Bot ao confirmar pagamento:**
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

**Ações do N8N após receber o webhook:**
1. IF: plano inclui ZAP? → definir tipo de acesso
2. Liberar acesso via API Telegram (invite link único)
3. Registrar comprador no Google Sheets
4. Aguardar 30 segundos
5. Disparar Upsell WhatsApp via Shark Bot API (para quem comprou sem ZAP)

---

## Estratégia de Preço — Deadline Diária

```
Até 23:59 → R$14,90 (entrada de impulso)
Após meia-noite → R$29,90 (preço padrão)
```

Configurar troca automática via nó **Gatilho agendado** no Shark Bot. A urgência com
prazo verificável é o principal acelerador de conversão para o Impulsivo.

---

## KPIs — Acompanhamento Semanal

| Métrica | Meta |
|---|---|
| CTR do anúncio | > 2,5% |
| CPL (custo por /start) | < R$2,00 |
| Taxa /start → botão clicado | > 60% |
| Taxa botão → PIX gerado | > 70% |
| Taxa PIX gerado → Pago | > 35% |
| Taxa Order Bump | > 25% |
| Taxa Recuperação (15min) | > 10% |
| Taxa Upsell WhatsApp | > 15% |
| Ticket médio | > R$28,00 |
| ROAS | > 3x |

---

<a name="projeção"></a>
# PROJEÇÃO FINANCEIRA

## Cenário Conservador — Mês 1

| Variável | Valor |
|---|---|
| Investimento em ads | R$1.500/mês |
| CPL estimado | R$3,00 |
| Leads gerados | 500 |
| Taxa de conversão final (pago / leads) | 14% (35% do PIX gerado × 40% que geram PIX) |
| Compradores front-end | 70 |
| Ticket médio (considerando bump e upsell) | R$38,00 |
| **Faturamento bruto estimado** | **R$2.660** |
| **ROAS** | **1,77x** |

## Cenário Realista — Mês 2 (otimização de criativos e funil)

| Variável | Valor |
|---|---|
| Investimento em ads | R$2.000/mês |
| CPL otimizado | R$2,20 |
| Leads gerados | 909 |
| Taxa de conversão final | 16% |
| Compradores front-end | 145 |
| Ticket médio | R$42,00 |
| **Faturamento bruto estimado** | **R$6.090** |
| **ROAS** | **3,04x** |

## Cenário Escala — Mês 3+

| Variável | Valor |
|---|---|
| Investimento em ads | R$5.000/mês |
| CPL otimizado | R$2,00 |
| Leads gerados | 2.500 |
| Taxa de conversão final | 18% |
| Compradores front-end | 450 |
| Ticket médio | R$45,00 |
| **Faturamento bruto estimado** | **R$20.250** |
| **ROAS** | **4,05x** |

> **Alavancas de crescimento:** Lookalike de compradores (mês 2+), teste A/B de criativos
> contínuo, adição de segunda criadora para escalar volume sem aumentar CPL.

---

<a name="próximos-passos"></a>
# PRÓXIMOS PASSOS — PLANO DE EXECUÇÃO

## Semana 1 — Fundação

- [ ] Configurar Shark Bot: mensagem de abertura com foto + 3 botões PIX
- [ ] Configurar Order Bump nos planos sem ZAP (+R$12)
- [ ] Configurar Smart Delay 15min e 45min (recuperação de carrinho)
- [ ] Configurar Gatilho de troca de preço à meia-noite (R$14,90 → R$29,90)
- [ ] Gravar mídias: 1 foto principal (abertura), 1 foto borrada (bump), 1 áudio (upsell), 1 GIF (recuperação)
- [ ] Configurar N8N: webhook + Google Sheets + liberação de acesso + disparo de upsell
- [ ] Testar fluxo completo do /start até liberação de acesso com número próprio

## Semana 2 — Lançamento

- [ ] Criar criativo principal: foto da modelo + copy 1 linha para Meta Ads
- [ ] Criar 2 variações (blur + meme) para rotação
- [ ] Link dos anúncios: `t.me/[bot]?start=fb` — sem landing page
- [ ] Subir campanhas com R$30/dia por conjunto de anúncios
- [ ] Monitorar CTR e CPL diariamente
- [ ] Ajustar copy do bot com base nos pontos de abandono (Stats do Shark Bot)

## Semana 3–4 — Otimização

- [ ] Pausar criativos com CPL > R$3,00
- [ ] Duplicar conjuntos com melhor desempenho
- [ ] Criar Conta B (aquecimento orgânico — sem anúncios ainda)
- [ ] Analisar taxa de order bump e upsell — ajustar copy se abaixo da meta
- [ ] Testar variação de preço de entrada (R$9,90 vs R$14,90)

## Mês 2 — Escala

- [ ] Aumentar budget dos conjuntos vencedores progressivamente (+20%/dia)
- [ ] Criar audiência lookalike 1% a partir de compradores (mínimo 50 conversões)
- [ ] Avaliar inclusão de segundo fluxo no bot para persona GFE (mensagem mais longa, foco em ZAP)
- [ ] Reunião de revisão de KPIs com sócios

---

## Estrutura de Arquivos deste Projeto

```
HOT/
├── masterplan-executivo.md          ← Este documento
├── CONTEXT.md                       ← Contexto e índice operacional
├── secao-2-engenharia-reversa-trafego.md
├── secao-3-protocolo-copy-funil-telegram.md
└── secao-4-arquitetura-funil-n8n-sharkbot.md
```

---

*Documento gerado em 30/03/2026 · Versão 1.0 · Confidencial*
*Para exportar em PDF: abrir no VS Code → extensão Markdown PDF → Export (pdf)*
