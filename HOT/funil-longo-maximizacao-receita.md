# Funil Longo — Maximização de Receita por Lead
## Arquitetura Completa: Pré-Compra + Pós-Compra + Reengajamento
### Shark Bot — Documento Executivo

---

## Filosofia do Funil Longo

Um lead que chega pelo anúncio tem valor além da primeira compra.
A maioria dos funis para no PIX confirmado. Este funil trabalha o lead em 3 janelas:

| Janela | Duração | Objetivo |
|---|---|---|
| **Pré-compra** | 0 → 90min | Converter o não-pagador com ângulos alternados |
| **Pós-compra imediato** | 0 → 30min após pagamento | Escada de upsell enquanto a dopamina ainda age |
| **Pós-compra tardio** | D+1 → D+7 | Reengajar compradores com ofertas temáticas |

**Ticket médio alvo:** R$65–R$90 por lead convertido
**Receita adicional estimada vs. funil simples:** +60–80%

---

## FLOWCHART — VISUALIZAÇÃO COMPLETA

```mermaid
flowchart TD
    classDef entrada fill:#1a1a2e,stroke:#e94560,color:#fff
    classDef pos fill:#16213e,stroke:#4fc3f7,color:#fff
    classDef pre fill:#1a0a00,stroke:#ff7043,color:#fff
    classDef reeng fill:#001a0a,stroke:#66bb6a,color:#fff
    classDef pix fill:#263238,stroke:#ffd54f,color:#fff
    classDef fim fill:#212121,stroke:#78909c,color:#ccc

    ENTRADA["📱 ENTRADA<br/>R$14,90 · R$15,00 · R$27,97"]:::entrada
    BUMP["⚡ Order Bump<br/>+R$12 vídeo extra"]:::entrada
    PIX_MAIN["💳 Gerar PIX"]:::pix
    PAGO{Pagou?}:::entrada

    ENTRADA --> BUMP --> PIX_MAIN --> PAGO

    PAGO -->|✅ SIM| GRUPO
    PAGO -->|❌ NÃO| C1

    GRUPO["🔓 Grupo Temporário<br/>Acesso liberado"]:::pos
    DELAY["⏱ Atraso 30s"]:::pos
    U1["Upsell 1<br/>WhatsApp VIP · R$47"]:::pos
    U2["Upsell 2<br/>Pack do Mês · R$29"]:::pos
    U3["Upsell 3<br/>Personalizado · R$59"]:::pos
    ENCPG["🔒 Encerramento<br/>Link do canal"]:::pos

    GRUPO --> DELAY --> U1
    U1 -->|Sim| P47["PIX R$47"]:::pix --> ENCPG
    U1 -->|Não| U2
    U2 -->|Sim| P29["PIX R$29"]:::pix --> ENCPG
    U2 -->|Não| U3
    U3 -->|Sim| P59["PIX R$59"]:::pix --> ENCPG
    U3 -->|Não| ENCPG

    GRUPO -.->|broadcast| RD1
    RD1["📅 D+1 · Engajamento<br/>sem oferta"]:::reeng
    RD3["📅 D+3 · WhatsApp<br/>R$47,00"]:::reeng
    RD7["📅 D+7 · Pack Especial<br/>R$37,00"]:::reeng
    RD1 --> RD3 --> RD7

    C1["🔄 Ciclo 1 · +15min<br/>Bônus áudio · R$14,90"]:::pre
    C2["🔄 Ciclo 2 · +45min<br/>Curiosidade · R$14,90"]:::pre
    C3["🔄 Ciclo 3 · +90min<br/>Trial 48h · R$9,90"]:::pre
    C4["🔄 Ciclo 4 · +3h<br/>Pack avulso · R$4,90"]:::pre
    PACKUP["⬆️ Upgrade +R$10<br/>Vitalício"]:::pre
    FIM["🚪 Encerramento limpo"]:::fim

    C1 -->|Paga| GRUPO
    C1 -->|Não paga| C2
    C2 -->|Paga| GRUPO
    C2 -->|Não paga| C3
    C3 -->|Paga trial| GRUPO
    C3 -->|Não paga| C4
    C4 -->|Paga pack| PACKUP --> GRUPO
    C4 -->|Não paga| FIM
```

---

## VISÃO GERAL — DIAGRAMA COMPLETO

```
ENTRADA (3 botões)
  │
  ├── [PAGO] → ESCADA PÓS-COMPRA (5 nós)
  │                │
  │                └── REENGAJAMENTO D+1 / D+3 / D+7
  │
  └── [NÃO PAGOU]
        │
        ├── +15min → CICLO 1: mesmo produto, bônus
        ├── +45min → CICLO 2: ângulo emocional diferente
        ├── +90min → CICLO 3: produto diferente (trial 48h)
        └── +3h   → CICLO 4: produto mínimo (pack avulso)
              │
              └── ENCERRAMENTO LIMPO
```

---

## PARTE 1 — ENTRADA

### NÓ 1 — Mensagem de Abertura

```
[FOTO da modelo — expressão provocativa, roupa sugestiva]

Oi {{primeiro_nome}} 🥵 eu sou a [Nome] e tenho
só [X] aninhos...

🔥 +150 mídias que não posto em nenhuma rede
🎥 Vídeos caseiros sem corte
📸 Fotos que o Instagram derrubaria em segundos
💬 Acesso direto — respondo quem tá dentro

✅ Acesso vitalício — paga uma vez, fica pra sempre
⚠️ 7 dias de garantia

🚨 Preço especial só até às 23:59 de hoje 👇
```

```
[🎁 VITALÍCIO + ZAP 🔞 → R$27,97]
[📱 SÓ MEU WHATSAPP → R$15,00]
[🔓 ACESSO VITALÍCIO (73% OFF) → R$14,90]
```

---

### NÓ 2 — Order Bump (antes do PIX, planos B e C)

```
[FOTO BORRADA — diferente da abertura, corte na região central]

⚡ Espera antes de gerar o PIX

Tenho uma coisa que só aparece aqui, uma vez.

Esse vídeo aqui 👆 é o mais pedido do meu privado.
Faço ele uma vez por mês e nunca deixei sair daqui.

Adiciona junto com o seu acesso por só +R$12,00.
Depois dessa tela, some.

[+ Adicionar o vídeo por R$12 🔥]   → recalcula PIX
[Só o acesso mesmo]                  → mantém valor original
```

---

## PARTE 2 — ESCADA PÓS-COMPRA (Imediato)

*Disparada assim que PIX é confirmado. Sequência enquanto a euforia ainda age.*

---

### NÓ 3 — Grupo Temporário (Entrega Automática)

```
Bem-vindo ao privado 🔒

Aqui você encontra tudo que prometi — e mais.
Qualquer dúvida é só me chamar 🤍
```

*[Atraso: 30 segundos]*

---

### NÓ 4 — Upsell 1: WhatsApp VIP (R$47,00)

*Tom: íntimo, pós-compra, recompensa por ter entrado*

```
[ÁUDIO — 20s, voz suave, tom de surpresa boa]
"Ei... que bom que você entrou 🥺
Fico feliz mesmo quando aparece alguém novo aqui.
Tenho uma coisa pra te perguntar — mas só pergunto
pra quem já tá dentro, tá?"
```

```
Além desse canal, eu tenho um grupo no WhatsApp.

Lá é diferente.
Lá eu mando o que ainda não tô pronta pra postar
nem aqui. São conversas reais, de madrugada,
quando a cabeça tá mais solta 💭

São só 12 pessoas agora.
Quando encher, fecho sem avisar.

R$47,00 — uma vez. Sem mensalidade.
Eu adiciono você pessoalmente 🤍

[Quero entrar no WhatsApp 🤍]   → PIX R$47,00
[Agora não]                      → Upsell 2
```

---

### NÓ 5 — Upsell 2: Pack Temático do Mês (R$29,00)

*Disparado apenas para quem recusou o WhatsApp*

```
[GIF — movimento sugestivo, 3s, corte estratégico]

Tudo bem 😊

Antes de você ir curtir o canal —
tem uma coisa que faço uma vez por mês
e esse mês acabou de sair.

É um pack temático. Esse foi feito no [tema]:
📸 18 fotos em sequência
🎥 3 vídeos curtos temáticos
🎙️ 1 áudio de voz exclusivo do pack

Quem compra o pack do mês ganha antes
de qualquer pessoa do canal ver.

R$29,00 — acesso vitalício ao pack.

[Quero o pack do mês 🔥]   → PIX R$29,00
[Não, obrigado]             → Upsell 3
```

---

### NÓ 6 — Upsell 3: Conteúdo Personalizado (R$59,00)

*Disparado apenas para quem recusou os dois anteriores*
*Tom: exclusivo, "só você", GFE pesado*

```
[ÁUDIO — 15s, tom íntimo diferente, quase confidencial]
"Posso te falar uma coisa?
Eu faço isso pra muito pouca gente...
Mas você pareceu diferente desde que entrou."
```

```
Eu aceito pedidos personalizados.

Você me diz o que quer ver
— roupa específica, situação, tema —
e eu gravo só pra você.

Não vai pro canal. Não vai pro WhatsApp.
É só seu.

R$59,00 — entrega em até 24h no privado.

[Quero meu conteúdo personalizado 🎬]   → PIX R$59,00
[Não agora]                              → Encerramento pós-compra
```

---

### NÓ 7 — Encerramento Pós-Compra

```
Aproveita o canal 🔒🤍

Qualquer coisa é só me chamar aqui dentro.

→ [link do canal]
```

---

## PARTE 3 — REENGAJAMENTO TARDIO (D+1, D+3, D+7)

*Enviado via broadcast para compradores do canal. Configurar como Gatilho agendado no Shark Bot.*

---

### MENSAGEM D+1 — Conteúdo Novo (Engajamento)

*Objetivo: lembrar que estão dentro, criar hábito de abrir o canal*

```
[GIF — diferente de tudo anterior]

Oi, postei uma coisa nova hoje que não avisei
pra ninguém ainda 👀

Você é um dos primeiros a ver.
Vai lá no canal antes que eu avise pra todo mundo 🔒

→ [link do canal]
```

*Sem oferta. Só engajamento.*

---

### MENSAGEM D+3 — Upsell WhatsApp (segunda chance)

*Para quem não comprou o WhatsApp no pós-compra imediato*

```
[FOTO — nova, diferente de todas anteriores]

{{primeiro_nome}}, lembra que te falei do WhatsApp? 👀

Uma vaga abriu hoje.
Alguém saiu e eu ainda não reabri pra ninguém.

Se quiser entrar antes que eu poste no canal,
é só me responder aqui agora.

R$47,00 — mesmo valor de antes.

[Quero entrar no WhatsApp 🤍]   → PIX R$47,00
[Não tenho interesse]            → encerra sequência D+3
```

---

### MENSAGEM D+7 — Pack Especial "Só Pra Quem Tá Dentro"

*Para toda a base de compradores — oferta de recorrência*

```
[FOTO nova — melhor criativo disponível]

Faz uma semana que você tá no privado 🤍

Preparei uma coisa pra quem ficou esse tempo todo.

Pack especial de aniversário:
📸 25 fotos inéditas
🎥 5 vídeos (os melhores que já fiz)
🎙️ Áudio de 3 minutos — só pra quem tá dentro

R$37,00 — uma vez, fica pra sempre.

[Quero o pack de aniversário 🔥]   → PIX R$37,00
[Agora não]                         → encerra sequência D+7
```

---

## PARTE 4 — SEQUÊNCIA PRÉ-COMPRA (4 Ciclos)

*Para leads que chegaram mas não converteram. Cada ciclo usa um ângulo diferente — não só preço.*

---

### CICLO 1 — +15min | Ângulo: Bônus (mesmo preço)

```
[GIF — corte estratégico, arquivo diferente do pitch]

{{primeiro_nome}}, ainda tô aqui 👀

Seu acesso ainda tá guardado...

A maioria das pessoas que chegaram hoje
já tão dentro curtindo 🔥

Se você fechar agora, libero um áudio exclusivo
junto com o acesso — de graça 🎁
Não tá anunciado em lugar nenhum.

Valor continua R$14,90. Não muda.

[Fechar agora + áudio 🎁]   → mesmo PIX
[Não tenho interesse]        → Ciclo 2
```

---

### CICLO 2 — +45min | Ângulo: Emocional / Curiosidade

*Sem mencionar preço ainda — reativar a curiosidade original*

```
[FOTO BORRADA — nova, nunca usada antes]

Postei uma coisa nova hoje 👀

Só quem tá dentro viu.

Honestamente? É o melhor que já fiz.
E não vou postar em mais lugar nenhum.

Ainda dá tempo de entrar antes de eu fechar
as vagas de hoje.

[Quero entrar agora 🔒]   → mesmo PIX R$14,90
[Não quero]               → Ciclo 3
```

---

### CICLO 3 — +90min | Produto Diferente: Trial 48h (R$9,90)

*Muda o produto, não só o preço — reduz o risco percebido*

```
[VÍDEO — melhor criativo reservado para esse momento]

Tudo bem, entendo que pode não ser a hora.

Então vou fazer diferente:

Acesso completo por 48 horas por só R$9,90.
Sem mensalidade. Sem compromisso.
Só pra você ver se vale.

Se gostar — e vai gostar — tem o vitalício depois
por R$14,90. Mas nem precisa pensar nisso agora.

[Quero 48h por R$9,90 🔓]   → PIX R$9,90 (trial)
[Não]                        → Ciclo 4
```

---

### CICLO 4 — +3h | Produto Mínimo: Pack Avulso (R$4,90)

*Porta de entrada mínima — objetivo é converter, depois fazer upsell via canal*

```
[ÁUDIO — 10s, tom diferente, mais casual]
"Ei, última coisa que vou te mandar, prometo 😊"
```

```
Não quero perder você por causa do valor.

Então separei 10 fotos + 1 vídeo avulso.
Só pra você ter uma ideia do que tá no privado.

R$4,90. É o mínimo que consigo cobrar.

Se gostar, tem como fazer upgrade pro vitalício
por só mais R$10,00 depois.

[Quero o pack por R$4,90 📦]   → PIX R$4,90
[Não tenho interesse]           → Encerramento
```

*Após PIX R$4,90 confirmado: disparar UPSELL imediato para vitalício:*

```
Aqui está o seu pack 🔒 → [link do arquivo]

Curtiu? Tem muito mais no canal vitalício.

Por só +R$10,00 agora você garante acesso
a tudo pelo resto da vida.

[Upgrade vitalício por +R$10 🔓]   → PIX R$10,00
[Não, esse pack já tá ótimo]        → encerra
```

---

### ENCERRAMENTO FINAL (após Ciclo 4)

```
Tudo bem, sem pressão 😊

Se um dia quiser voltar, o link fica sempre
disponível na bio.

[sem mais mensagens para este contato]
```

---

## RESUMO FINANCEIRO — POTENCIAL POR LEAD

### Cenário: Lead converte no pitch (R$14,90)

| Etapa | Conversão estimada | Receita adicional |
|---|---|---|
| Entrada R$14,90 | — | R$14,90 |
| Order Bump +R$12 | 25% | R$3,00 |
| Upsell 1 WhatsApp R$47 | 15% | R$7,05 |
| Upsell 2 Pack mês R$29 | 10% | R$2,90 |
| Upsell 3 Personalizado R$59 | 5% | R$2,95 |
| Reengajamento D+3 / D+7 | 8% | R$3,36 |
| **Ticket médio real por lead** | | **~R$34,16** |

### Cenário: Lead converte via Ciclo 3 (R$9,90 trial)

| Etapa | Conversão estimada | Receita adicional |
|---|---|---|
| Trial R$9,90 | — | R$9,90 |
| Upgrade vitalício pós-trial | 30% | R$4,50 |
| Upsell WhatsApp (pós-upgrade) | 12% | R$5,64 |
| Reengajamento D+7 | 8% | R$2,96 |
| **Ticket médio real** | | **~R$23,00** |

---

## MAPA DE MÍDIAS NECESSÁRIAS

| Mídia | Onde usa | Qtd |
|---|---|---|
| Foto abertura (alta tensão) | Pitch inicial | 1 |
| Foto borrada #1 | Order Bump | 1 |
| Foto borrada #2 | Ciclo 2 pré-compra | 1 |
| GIF corte estratégico #1 | Pitch / Upsell 2 | 1 |
| GIF corte estratégico #2 | Ciclo 1 recuperação | 1 |
| Foto nova (alta qualidade) | D+3 e D+7 | 2 |
| Vídeo forte (melhor criativo) | Ciclo 3 downsell | 1 |
| Áudio boas-vindas (15s) | Roteiro 1 | 1 |
| Áudio íntimo WhatsApp (20s) | Upsell 1 | 1 |
| Áudio personalizado (15s) | Upsell 3 intro | 1 |
| Áudio encerramento pré-compra (10s) | Ciclo 4 | 1 |
| **Total** | | **12 arquivos** |

---

## CHECKLIST DE IMPLEMENTAÇÃO

### Fluxo Pré-Compra
- [ ] Nó entrada (foto + texto + 3 botões)
- [ ] Order Bump (foto borrada + 2 botões)
- [ ] 3 nós PIX (R$27,97 / R$15,00 / R$14,90)
- [ ] Smart Delay 15min → Ciclo 1 (GIF + bônus)
- [ ] Smart Delay 45min → Ciclo 2 (foto borrada 2 + ângulo curiosidade)
- [ ] Smart Delay 90min → Ciclo 3 (vídeo + trial R$9,90)
- [ ] Smart Delay 3h → Ciclo 4 (áudio + pack R$4,90)
- [ ] PIX R$9,90 (trial) com upsell automático pós-pagamento
- [ ] PIX R$4,90 (pack) com upsell automático pós-pagamento
- [ ] Mensagem de encerramento final

### Fluxo Pós-Compra
- [ ] Grupo Temporário (entrega automática)
- [ ] Atraso 30s
- [ ] Upsell 1: WhatsApp R$47,00 (áudio + PIX)
- [ ] Upsell 2: Pack do mês R$29,00 (GIF + PIX)
- [ ] Upsell 3: Personalizado R$59,00 (áudio + PIX)
- [ ] Encerramento pós-compra (link do canal)

### Reengajamento Tardio
- [ ] Gatilho agendado D+1 (GIF engajamento, sem oferta)
- [ ] Gatilho agendado D+3 (segunda chance WhatsApp)
- [ ] Gatilho agendado D+7 (pack especial R$37,00)

### Técnico
- [ ] Gatilho 00:00 → troca de preço (R$14,90 → R$29,90)
- [ ] Gatilho 08:00 → reverte para R$14,90
- [ ] Testar todos os paths: pago, trial, pack, abandono
- [ ] Verificar que Smart Delays disparam apenas 1x por usuário

---

*Funil longo v1.0 — 4 ciclos pré-compra + 3 upsells imediatos + 3 reengajamentos tardios*
*Ticket médio estimado: R$30–R$65 por lead convertido vs. R$14,90 no funil simples*
