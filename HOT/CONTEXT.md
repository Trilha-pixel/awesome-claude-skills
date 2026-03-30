# Projeto HOT — Manual de Operações: Negócio de Conteúdo +18

## Visão Geral do Projeto
Manual estratégico para operação de venda de conteúdo adulto nas plataformas OnlyFans, Privacy e Telegram (venda direta via bot). Documento voltado para apresentação a sócio operacional.

## Foco Atual
**Persona prioritária: O Impulsivo / Curioso** — toda a próxima fase do manual é centrada nessa persona.

## Estrutura do Manual (Capítulos Planejados)
- [x] **Capítulo 1** — Mapeamento de Audiência (Buyer Personas)
- [x] **Seção 2** — Engenharia Reversa de Tráfego (padrões de anúncio Meta)
- [x] **Seção 3** — Protocolo de Copy do Funil Telegram (roteiros exatos dos 5 nós do bot)
- [x] **Seção 4** — Arquitetura Técnica N8N + Shark Bot (nó a nó)
- [x] **Masterplan Executivo** — documento unificado, pronto para PDF

---

## Capítulo 1 — Buyer Personas

### Persona 1: O Fã Carente (GFE — Girlfriend Experience)
- **Idade:** 22–38 anos | Solteiro ou relacionamento insatisfatório
- **O que compra:** Conexão simulada, atenção personalizada, ilusão de ser especial
- **Ticket médio:** Médio-alto
- **Gatilhos:** Exclusividade nomeada, escassez de atenção, reciprocidade emocional, validação do desejo
- **Objeções no PIX/bot:** Medo de ser bloqueado, suspeita de golpe, vergonha de pagar
- **Ângulo de ad:** "Conexão real em um mundo de perfis falsos" — tom íntimo, vídeo estilo stories pessoal

### Persona 2: O Impulsivo / Curioso ⭐ PERSONA PRIORITÁRIA

- **Idade:** 18–29 anos | Qualquer estado civil
- **Renda:** R$1.500–R$4.000/mês (inclui universitários com mesada)
- **Como chega:** Via anúncio ou meme compartilhado — nunca ouviu falar da criadora antes
- **O que compra:** Resolução da lacuna criada pelo hook. Não compra a criadora — compra o fechamento do que o anúncio prometeu. Dor oculta: necessidade de saciar a curiosidade interrompida.
- **Janela de decisão:** 30–90 segundos. Depois disso, a vontade passa e ele não volta.
- **Ticket ideal no bot:** R$19,78 (PIX "Acesso Vitalício imediato") — qualquer centavo a mais quebra o impulso
- **Nível de consciência:** Baixo — não pesquisou, não conhece a criadora, decisão 100% contextual
- **Gatilho principal:** Preview (5–8s de conteúdo ou imagem de alta tensão) + contador regressivo no bot
- **Objeções reais:**
  - "Depois eu vejo" → abandona e nunca volta (combater com urgência real)
  - "R$19 é caro pra algo que não conheço" → falta de prova antes do pagamento
  - "Deve ser golpe" → desconfiança estrutural com bots de Telegram
  - Abandono silencioso → sequência de reengajamento: 45min depois, oferta de R$14,90
- **Ângulo de ad:** Interrupção de padrão — hook abrupto, copy elíptico ("Eu não deveria estar mostrando isso aqui..."), Reels/Stories verticais sem texto longo
- **Targeting Meta Ads:** Humor adulto, memes, entretenimento — não targeting óbvio de conteúdo adulto
- **Comportamento no funil Shark Bot:** Clica no botão R$19,78. Não converte no R$27,98 (ZAP não tem valor percebido para quem não conhece a criadora)
- **Order Bump:** Após PIX R$19,78 confirmado → oferecer upgrade para + ZAP por R$12 a mais (momento de maior receptividade)

### Persona 3: O Sugar Daddy / Provedor de Status
- **Idade:** 35–60 anos | Renda média-alta a alta
- **O que compra:** Status, controle, admiração exclusiva — dinheiro é instrumento de poder
- **Ticket médio:** Alto (R$200–R$1.000+/mês)
- **Gatilhos:** Acesso restrito/curadoria, tratamento diferenciado, admiração percebida, discrição
- **Objeções no PIX/bot:** Autenticidade da criadora, aversão a bot, experiências ruins anteriores
- **Ângulo de ad:** "Escassez de qualidade" — estética elevada, copy de exclusão, CTA "Verificar disponibilidade"

---

## Regras Operacionais de Facebook Ads (Meta)
- **Nunca mencionar conteúdo adulto explicitamente** no criativo ou copy — conta banida
- Objetivo do anúncio: gerar clique para Telegram/bio — conversão acontece fora da plataforma
- Usar contas com histórico limpo + criativos em rotação
- Targeting indireto: humor adulto, memes, entretenimento (Persona 2); luxo, viagens, carros premium (Persona 3)

## Plataformas Operacionais
| Plataforma | Uso |
|---|---|
| OnlyFans | Assinatura recorrente, público internacional |
| Privacy | Assinatura recorrente, mercado brasileiro |
| Telegram (bot) | Venda direta de packs, atendimento VIP, funil de conversão |
| Facebook / Instagram Ads | Aquisição de tráfego — topo de funil |

## Tom e Posicionamento do Material
- Linguagem: profissional, executiva, voltada para conversão
- Audiência do documento: sócio operacional
- Foco: psicologia do consumidor + estratégia de marketing, não produção de conteúdo

---

## Funil Operacional (Shark Bot — sharkbot.com.br)
**Modelo real confirmado por análise de concorrência: sem landing page. Face Ads → direto para o bot.**

Estrutura revisada:
```
Meta Ads (foto da modelo + copy 1 linha)
  ↓ link direto: t.me/[bot]?start=fb
/start → Mensagem de Abertura (foto + copy + 3 botões simultâneos)
  ├── PIX R$14,90 — Acesso Vitalício (73% OFF, deadline 23:59)
  ├── PIX R$27,97 — Vitalício + ZAP
  └── PIX R$15,00 — Só WhatsApp VIP
        ↓ (todos com Order Bump antes do código PIX)
  PIX gerado → Aguarda pagamento
  ├── Confirmado → N8N webhook → libera acesso → Upsell WhatsApp R$47,00
  └── 15min sem pagar → Smart Delay → Recuperação + bônus áudio
```

- Estratégia de preço: deadline diária às 23:59 (R$14,90 → R$29,90 após meia-noite)
- Nós disponíveis: Atraso, Smart Delay, Gatilho (agendado para troca de preço), Randomizer, Go To, Upsell, Downsell, Grupo Temporário, Order Bump

## Arquivos do Projeto
- `CONTEXT.md` — este arquivo (contexto geral do projeto)
- `secao-2-engenharia-reversa-trafego.md` — padrões de anúncio Meta, copy seguro, CTA para Telegram, contingência de contas
- `secao-3-protocolo-copy-funil-telegram.md` — roteiros exatos dos 5 nós: /start, pitch, order bump, upsell WhatsApp, recuperação de carrinho
- `secao-4-arquitetura-funil-n8n-sharkbot.md` — arquitetura técnica nó a nó, webhook N8N, pre-sell quiz, KPIs
- `masterplan-executivo.md` — documento unificado com projeção financeira e plano de execução, pronto para PDF
