const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/felipetop/Documents/claude skills/document-skills/pptx/scripts/html2pptx.js');
const fs = require('fs');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, 'slides');
const P = '/tmp/galpao_fotos'; // symlink without spaces
const OUTPUT = '/Users/felipetop/Documents/claude skills/Galpão/Apresentacao_Galpao_BR040.pptx';

if (!fs.existsSync(SLIDES_DIR)) fs.mkdirSync(SLIDES_DIR, { recursive: true });

// ─── SHARED CSS ──────────────────────────────────────────────────────────────
const base = `
  html { background: #0D1B2A; }
  body { width: 720pt; height: 405pt; margin: 0; padding: 0; display: flex; font-family: Arial, sans-serif; }
  .bar { width: 44pt; height: 3pt; background: #C9942A; margin-bottom: 13pt; flex-shrink: 0; }
  .sep { width: 210pt; height: 1pt; background: #2A4A6A; margin: 15pt 0; flex-shrink: 0; }
  ul { margin: 0; padding-left: 13pt; }
  li { line-height: 1.65; }
`;

// ─── SLIDE DEFINITIONS ────────────────────────────────────────────────────────
const slideHtml = [

// ── SLIDE 1 — CAPA ──────────────────────────────────────────────────────────
`<!DOCTYPE html><html><head><style>
${base}
body { background: #0D1B2A; }
.left { width: 370pt; flex-shrink: 0; height: 405pt; background: #0D1B2A; display: flex; flex-direction: column; justify-content: center; padding: 35pt 38pt; box-sizing: border-box; }
.right { width: 350pt; height: 405pt; }
</style></head><body>
<div class="left">
  <div class="bar"></div>
  <h1 style="color:#FFFFFF;font-size:27pt;font-family:Georgia,serif;margin:0 0 10pt 0;line-height:1.25;">COMPLEXO LOGÍSTICO<br>ESTRATÉGICO</h1>
  <p style="color:#C9942A;font-size:11pt;margin:0 0 2pt 0;">BR-040 × ARCO METROPOLITANO</p>
  <p style="color:#C9942A;font-size:10pt;margin:0;">Rio de Janeiro</p>
  <div class="sep"></div>
  <p style="color:#BDD5EA;font-size:8.5pt;margin:0 0 5pt 0;">10.000 m² de terreno &nbsp;·&nbsp; 6.000 m² construídos &nbsp;·&nbsp; Plug &amp; Play</p>
  <p style="color:#7A9BB8;font-size:8pt;margin:0;">Oportunidade a Consultar</p>
</div>
<div class="right">
  <img src="${P}/frentedogalpaoeentradadocaminhao2.jpeg" style="width:350pt;height:405pt;display:block;">
</div>
</body></html>`,

// ── SLIDE 2 — TESE DE INVESTIMENTO ──────────────────────────────────────────
`<!DOCTYPE html><html><head><style>
${base}
.left { width: 388pt; flex-shrink: 0; height: 405pt; background: #1B3A5C; display: flex; flex-direction: column; justify-content: center; padding: 28pt 32pt; box-sizing: border-box; }
.right { width: 332pt; height: 405pt; }
</style></head><body>
<div class="left">
  <div class="bar"></div>
  <h1 style="color:#FFFFFF;font-size:18pt;font-family:Georgia,serif;margin:0 0 9pt 0;line-height:1.3;">A Janela que o Mercado Logístico<br>do RJ Não Perdoa Fechar</h1>
  <p style="color:#BDD5EA;font-size:8.5pt;margin:0 0 13pt 0;line-height:1.55;">Ativos com essa combinação de localização, infraestrutura pronta e escala operacional são raros. Quando surgem, não ficam disponíveis por muito tempo.</p>
  <ul style="color:#FFFFFF;font-size:8.5pt;">
    <li>Região com demanda reprimida de galpões Classe A no Arco Metropolitano</li>
    <li>Infraestrutura 100% instalada — sem capex, operação inicia em dias</li>
    <li>Perfil ideal para e-commerce, indústria e operadores 3PL no Sudeste</li>
    <li>Escoamento RJ, SP e MG sem trânsito urbano — vantagem competitiva mensurável</li>
  </ul>
</div>
<div class="right">
  <img src="${P}/visaointernadogalpao.jpeg" style="width:332pt;height:405pt;display:block;">
</div>
</body></html>`,

// ── SLIDE 3 — LOCALIZAÇÃO ────────────────────────────────────────────────────
`<!DOCTYPE html><html><head><style>
${base}
body { background: #0D1B2A; }
.left { width: 388pt; flex-shrink: 0; height: 405pt; background: #0D1B2A; display: flex; flex-direction: column; justify-content: center; padding: 28pt 32pt; box-sizing: border-box; }
.right { width: 332pt; height: 405pt; }
</style></head><body>
<div class="left">
  <div class="bar"></div>
  <h1 style="color:#FFFFFF;font-size:20pt;font-family:Georgia,serif;margin:0 0 7pt 0;line-height:1.3;">No Cruzamento das<br>Principais Rotas do Sudeste</h1>
  <p style="color:#C9942A;font-size:8.5pt;margin:0 0 15pt 0;">Acesso imediato ao trevo da BR-040 com o Arco Metropolitano — o coração logístico do Rio de Janeiro</p>
  <ul style="color:#FFFFFF;font-size:8.5pt;">
    <li><b>Zero gargalo urbano:</b> saída direta para rodovias federais sem atravessar a cidade</li>
    <li><b>Triângulo de cobertura:</b> Rio de Janeiro, São Paulo e Minas Gerais pela mesma rota</li>
    <li><b>Redução de custo de frete:</b> entroncamento diminui distância média por entrega</li>
    <li><b>Estratégico para last-mile e cross-docking</b> na região metropolitana do RJ</li>
  </ul>
</div>
<div class="right">
  <img src="${P}/acessoimediatobr040+arcometropolitano.jpeg" style="width:332pt;height:405pt;display:block;">
</div>
</body></html>`,

// ── SLIDE 4 — INFRAESTRUTURA PRINCIPAL ──────────────────────────────────────
`<!DOCTYPE html><html><head><style>
${base}
body { background: #1B3A5C; }
.left { width: 385pt; flex-shrink: 0; height: 405pt; background: #1B3A5C; display: flex; flex-direction: column; justify-content: center; padding: 25pt 30pt; box-sizing: border-box; }
.right { width: 335pt; height: 405pt; display: flex; flex-direction: column; }
</style></head><body>
<div class="left">
  <div class="bar"></div>
  <h1 style="color:#FFFFFF;font-size:20pt;font-family:Georgia,serif;margin:0 0 6pt 0;line-height:1.3;">Pronto para Operar<br>na Primeira Semana</h1>
  <p style="color:#C9942A;font-size:8.5pt;margin:0 0 13pt 0;">5.000 m² que eliminam obras, adaptações e custos ocultos antes do primeiro dia</p>
  <ul style="color:#FFFFFF;font-size:8.5pt;">
    <li><b>Piso epóxi azul de alta tonelagem:</b> suporta maquinário pesado sem degradação</li>
    <li><b>Vão livre amplo:</b> flexível para estoque verticalizado, produção ou cross-docking</li>
    <li><b>Iluminação natural + artificial:</b> condições ideais em qualquer turno</li>
    <li><b>Pé direito generoso:</b> compatível com racks de alto nível e armazenagem verticalizada</li>
    <li><b>Galpão secundário de 1.000 m²:</b> expedição dedicada ou operação de apoio</li>
  </ul>
</div>
<div class="right">
  <img src="${P}/altura+estrutura+iluminacao.jpeg" style="width:335pt;height:265pt;display:block;">
  <img src="${P}/galpaosecundario.jpeg" style="width:335pt;height:140pt;display:block;">
</div>
</body></html>`,

// ── SLIDE 5 — ENERGIA E SEGURANÇA ───────────────────────────────────────────
`<!DOCTYPE html><html><head><style>
${base}
body { background: #0D1B2A; }
.left { width: 385pt; flex-shrink: 0; height: 405pt; background: #0D1B2A; display: flex; flex-direction: column; justify-content: center; padding: 25pt 30pt; box-sizing: border-box; }
.right { width: 335pt; height: 405pt; display: flex; flex-direction: column; }
</style></head><body>
<div class="left">
  <div class="bar"></div>
  <h1 style="color:#FFFFFF;font-size:18pt;font-family:Georgia,serif;margin:0 0 6pt 0;line-height:1.3;">Infraestrutura Crítica Já Instalada —<br>Isso Vale Mais do que Parece</h1>
  <p style="color:#C9942A;font-size:8.5pt;margin:0 0 13pt 0;">Dois ativos que protegem a operação e reduzem custos de implantação e seguro</p>
  <ul style="color:#FFFFFF;font-size:8.5pt;">
    <li><b>Subestação de energia própria:</b> maquinário de alta demanda sem filas na concessionária</li>
    <li><b>Sprinklers + Hidrantes completos:</b> AVCB facilitado, exigência regulatória atendida</li>
    <li><b>Redução direta no prêmio de seguro:</b> sistema ativo e homologado = risco menor</li>
    <li><b>Conformidade imediata:</b> alimentos, farmacêutico, químico e e-commerce de alto volume</li>
  </ul>
</div>
<div class="right">
  <img src="${P}/sprinkler.jpeg" style="width:335pt;height:270pt;display:block;">
  <img src="${P}/subestacaodeenergia.jpeg" style="width:335pt;height:135pt;display:block;">
</div>
</body></html>`,

// ── SLIDE 6 — LOGÍSTICA OPERACIONAL ─────────────────────────────────────────
`<!DOCTYPE html><html><head><style>
${base}
body { background: #1B3A5C; }
.left { width: 350pt; flex-shrink: 0; height: 405pt; background: #1B3A5C; display: flex; flex-direction: column; justify-content: center; padding: 25pt 28pt; box-sizing: border-box; }
.right { width: 370pt; height: 405pt; display: flex; flex-direction: column; }
.row { display: flex; flex-direction: row; }
</style></head><body>
<div class="left">
  <div class="bar"></div>
  <h1 style="color:#FFFFFF;font-size:18pt;font-family:Georgia,serif;margin:0 0 6pt 0;line-height:1.3;">Projetado para o Fluxo Real<br>de Alta Performance</h1>
  <p style="color:#C9942A;font-size:8.5pt;margin:0 0 13pt 0;">Cada metro do complexo pensado para quem move cargas com eficiência todos os dias</p>
  <ul style="color:#FFFFFF;font-size:8.5pt;">
    <li><b>Entrada frontal para carretas:</b> dimensionada para bi-trens sem risco de manobra</li>
    <li><b>Entrada lateral independente:</b> fluxos simultâneos de carga e descarga</li>
    <li><b>Pátio amplo para manobras:</b> múltiplas operações simultâneas sem congestionamento</li>
    <li><b>Casa de vigia integrada:</b> segurança 24h sem estrutura adicional</li>
    <li><b>Fluxo natural</b> entrada → armazenagem → expedição</li>
  </ul>
</div>
<div class="right">
  <img src="${P}/frentedogalpaoeentradadocaminhao2.jpeg" style="width:370pt;height:203pt;display:block;">
  <div class="row">
    <img src="${P}/entradalateral-fundos.jpeg" style="width:185pt;height:202pt;display:block;">
    <img src="${P}/patiopramanobra.jpeg" style="width:185pt;height:202pt;display:block;">
  </div>
</div>
</body></html>`,

// ── SLIDE 7 — ÁREA ADMINISTRATIVA ───────────────────────────────────────────
`<!DOCTYPE html><html><head><style>
${base}
body { background: #0D1B2A; }
.left { width: 385pt; flex-shrink: 0; height: 405pt; background: #0D1B2A; display: flex; flex-direction: column; justify-content: center; padding: 25pt 30pt; box-sizing: border-box; }
.right { width: 335pt; height: 405pt; }
</style></head><body>
<div class="left">
  <div class="bar"></div>
  <h1 style="color:#FFFFFF;font-size:20pt;font-family:Georgia,serif;margin:0 0 6pt 0;line-height:1.3;">Do Galpão à Sala de Reunião —<br>Tudo Pronto</h1>
  <p style="color:#C9942A;font-size:8.5pt;margin:0 0 13pt 0;">Estrutura de apoio completa para operação, gestão e reuniões com clientes</p>
  <ul style="color:#FFFFFF;font-size:8.5pt;">
    <li><b>Escritórios climatizados e equipados:</b> prontos para uso imediato, sem reforma</li>
    <li><b>Área administrativa completa:</b> recepção, salas operacionais, gestão integrada</li>
    <li><b>Integração física com o galpão:</b> deslocamento mínimo, produtividade máxima</li>
    <li><b>Custo zero de adaptação:</b> o que seria capex pós-mudança já está entregue</li>
  </ul>
</div>
<div class="right">
  <img src="${P}/areaadministrativa2.jpeg" style="width:335pt;height:405pt;display:block;">
</div>
</body></html>`,

// ── SLIDE 8 — RESUMO DO ATIVO ────────────────────────────────────────────────
// (table added via PptxGenJS after html2pptx)
`<!DOCTYPE html><html><head><style>
${base}
body { background: #0D1B2A; }
.left { width: 390pt; flex-shrink: 0; height: 405pt; background: #0D1B2A; display: flex; flex-direction: column; padding: 25pt 28pt 20pt 28pt; box-sizing: border-box; }
.right { width: 330pt; height: 405pt; }
</style></head><body>
<div class="left">
  <div class="bar"></div>
  <h1 style="color:#FFFFFF;font-size:19pt;font-family:Georgia,serif;margin:0 0 4pt 0;line-height:1.3;">Os Números que Definem<br>a Oportunidade</h1>
  <p style="color:#7A9BB8;font-size:8pt;margin:0;">Síntese objetiva para sua análise e seu time técnico</p>
</div>
<div class="right">
  <img src="${P}/altura+estrutura+iluminacao.jpeg" style="width:330pt;height:405pt;display:block;">
</div>
</body></html>`,

// ── SLIDE 9 — CTA / CONTATO ──────────────────────────────────────────────────
`<!DOCTYPE html><html><head><style>
${base}
body { background: #0D1B2A; }
.left { width: 380pt; flex-shrink: 0; height: 405pt; background: #0D1B2A; display: flex; flex-direction: column; justify-content: center; padding: 35pt 38pt; box-sizing: border-box; }
.right { width: 340pt; height: 405pt; }
</style></head><body>
<div class="left">
  <div class="bar"></div>
  <h1 style="color:#FFFFFF;font-size:24pt;font-family:Georgia,serif;margin:0 0 10pt 0;line-height:1.3;">Ativos como Este<br>Não Ficam no Mercado</h1>
  <p style="color:#BDD5EA;font-size:8.5pt;margin:0;line-height:1.6;">Este complexo reúne o que há de mais difícil de encontrar em conjunto: localização prime, infraestrutura 100% instalada e escala para operações de alto volume.</p>
  <div class="sep"></div>
  <p style="color:#C9942A;font-size:9pt;margin:0 0 8pt 0;"><b>Solicite uma visita técnica</b></p>
  <p style="color:#FFFFFF;font-size:9pt;margin:0 0 3pt 0;">[Nome do Responsável]</p>
  <p style="color:#BDD5EA;font-size:8.5pt;margin:0 0 2pt 0;">[Telefone / WhatsApp]</p>
  <p style="color:#BDD5EA;font-size:8.5pt;margin:0;">[E-mail]</p>
</div>
<div class="right">
  <img src="${P}/frentedogalpaoeentradadocaminhao2.jpeg" style="width:340pt;height:405pt;display:block;">
</div>
</body></html>`,

];

// ─── TABLE DATA FOR SLIDE 8 ───────────────────────────────────────────────────
function buildTable(slide) {
  const H = { fill: { color: '1B3A5C' }, color: 'FFFFFF', bold: true, fontSize: 8, align: 'left', valign: 'middle' };
  const L = { color: 'BDD5EA', fontSize: 8, align: 'left', valign: 'middle', fill: { color: '111F2E' } };
  const V = { color: 'FFFFFF', bold: true, fontSize: 8, align: 'left', valign: 'middle', fill: { color: '111F2E' } };
  const F = { fill: { color: 'C9942A' }, color: 'FFFFFF', bold: true, fontSize: 8.5, align: 'left', valign: 'middle' };

  const rows = [
    [{ text: 'ESPECIFICAÇÃO', options: H }, { text: 'DADO', options: H }],
    [{ text: 'Terreno total', options: L }, { text: '10.000 m²', options: V }],
    [{ text: 'Área construída', options: L }, { text: '6.000 m²', options: V }],
    [{ text: 'Galpão principal', options: L }, { text: '5.000 m²', options: V }],
    [{ text: 'Galpão secundário', options: L }, { text: '1.000 m²', options: V }],
    [{ text: 'Acesso rodoviário', options: L }, { text: 'BR-040 + Arco Metropolitano', options: V }],
    [{ text: 'Energia', options: L }, { text: 'Subestação própria', options: V }],
    [{ text: 'Combate a incêndio', options: L }, { text: 'Sprinklers + Hidrantes (AVCB)', options: V }],
    [{ text: 'Piso', options: L }, { text: 'Epóxi de alta tonelagem', options: V }],
    [{ text: 'Área administrativa', options: L }, { text: 'Climatizada e pronta para uso', options: V }],
    [{ text: 'CONDIÇÕES COMERCIAIS', options: F }, { text: 'A CONSULTAR', options: F }],
  ];

  slide.addTable(rows, {
    x: 0.35, y: 1.45, w: 5.05, h: 3.85,
    colW: [2.05, 3.0],
    rowH: 0.35,
    border: { pt: 0.5, color: '2A4A6A' },
    valign: 'middle',
  });
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  // Write HTML files
  slideHtml.forEach((html, i) => {
    fs.writeFileSync(path.join(SLIDES_DIR, `slide${i + 1}.html`), html, 'utf8');
  });
  console.log('✓ HTML files written');

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = 'Complexo Logístico Estratégico — BR-040 × Arco Metropolitano';
  pptx.author = 'Real Estate Logístico';

  for (let i = 0; i < slideHtml.length; i++) {
    const htmlFile = path.join(SLIDES_DIR, `slide${i + 1}.html`);
    console.log(`  Rendering slide ${i + 1}...`);
    const { slide } = await html2pptx(htmlFile, pptx);

    // Add table to slide 8
    if (i === 7) buildTable(slide);
  }

  await pptx.writeFile({ fileName: OUTPUT });
  console.log(`\n✓ Arquivo gerado: ${OUTPUT}`);
}

main().catch(err => { console.error('Erro:', err.message || err); process.exit(1); });
