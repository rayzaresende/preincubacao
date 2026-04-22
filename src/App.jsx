import { useState, useEffect } from "react";

// ─── CORES AFYA ───────────────────────────────────────────────────────────────
const AFYA = {
  magenta:"#CE0058", azul:"#0057B8", cinza:"#EEEEEE", branco:"#FFFFFF", dark:"#333333",
  magentaLt:"#FFF0F5", magentaMd:"#F0ADC8", azulLt:"#EEF4FF", azulMd:"#B8CFED",
};

// ─── USUÁRIOS (login simples — altere aqui para adicionar usuários) ────────────
const USUARIOS = [
  { email: "admin@afya.com.br", senha: "afya2026", nome: "Administrador", role: "admin" },
  { email: "mentor@afya.com.br", senha: "mentor123", nome: "Mentor Afya", role: "mentor" },
  { email: "gestor@afya.com.br", senha: "gestor123", nome: "Gestor do Programa", role: "gestor" },
];

// ─── METODOLOGIA ──────────────────────────────────────────────────────────────
const METHODOLOGY = {
  fase1:{
    id:"fase1",label:"Fase 1",title:"Validação do Problema",
    color:AFYA.magenta,bg:AFYA.magentaLt,border:AFYA.magentaMd,
    etapas:[
      {
        id:"e0",num:"00",title:"Desk Research & Contextualização",duracao:"2–3 semanas",
        isNew:true,
        desc:"Pesquisa secundária antes de ir a campo. Compreenda o contexto do problema, mapeie o mercado, analise concorrentes e benchmarks usando fontes como relatórios, dados públicos, estudos e análise competitiva. Identifique gaps que orientarão a pesquisa primária.",
        subtopicos:["Definição do escopo e objetivos da pesquisa","Levantamento de fontes secundárias (relatórios, artigos, dados públicos)","Análise competitiva e benchmarking do mercado","Mapeamento do ecossistema e contexto regulatório","Síntese dos dados em insights preliminares","Identificação de gaps para pesquisa primária","Decomposição em níveis do problema (raso → profundo)","Matriz CSD preliminar — Certezas, Suposições, Dúvidas"],
        entregaveis:[
          {id:"e0_1",label:"Relatório de Desk Research (fontes secundárias analisadas)"},
          {id:"e0_2",label:"Análise competitiva com benchmarks do mercado"},
          {id:"e0_3",label:"Mapa do ecossistema e contexto do problema"},
          {id:"e0_4",label:"Matriz CSD inicial — Certezas, Suposições, Dúvidas"},
          {id:"e0_5",label:"Lista de gaps e hipóteses para pesquisa primária"},
        ],
        materiais:[
          {label:"🎓 Môre — Aula 5: Product Discovery (Parte 1)",url:"#more-aula5",tag:"more"},
          {label:"🎓 Môre — Aula 6: Product Discovery (Parte 2)",url:"#more-aula6",tag:"more"},
          {label:"🎓 Môre — Aula 1: Transformação Digital",url:"#more-aula1",tag:"more"},
          {label:"📄 Tudo sobre Validação — ACE",url:"#ace-validacao"},
          {label:"📄 O Problema — Material Complementar ACE",url:"#ace-problema"},
          {label:"📄 Dicionário de Startups — Ana Leticia Rico",url:"#dicionario"},
          {label:"📄 20 Reasons Startups Fail — CB Insights",url:"#cbinsights"},
        ],
        criterios:[],
      },
      {
        id:"e1",num:"01",title:"Identificação do Problema",duracao:"4 semanas",
        desc:"Identificar o problema específico com base na desk research. Formular hipóteses e organizar o que já se sabe vs. o que precisa ser investigado. Resista ao impulso de apresentar soluções.",
        subtopicos:["Qual é o problema exato? Contexto, variáveis e magnitude","Como os clientes lidam com esse problema hoje?","Por que é difícil de resolver? Barreiras estruturais","Decomposição em níveis: da superfície ao problema raiz","Tamanho do mercado afetado — TAM/SAM/SOM","Análise de alternativas existentes e suas limitações"],
        entregaveis:[
          {id:"e1_1",label:"PDE — Etapa 1 (hipóteses sobre o problema, contexto e benchmarking)"},
          {id:"e1_2",label:"Lean Canvas — blocos Problema e Alternativas Existentes"},
          {id:"e1_3",label:"Matriz CSD atualizada com dados da pesquisa"},
        ],
        materiais:[
          {label:"🎓 Môre — Aula 5: Identificação de Problemas e Decomposição",url:"#more-aula5",tag:"more"},
          {label:"🎓 Môre — Template Roteiro de Entrevistas",url:"#more-roteiro",tag:"more"},
          {label:"📄 Tudo sobre Validação — ACE",url:"#ace-validacao"},
          {label:"📄 O Problema — Material Complementar ACE",url:"#ace-problema"},
          {label:"📄 Lista de Yoda — Astella Investimentos",url:"#yoda"},
        ],
        criterios:[],
      },
      {
        id:"e2",num:"02",title:"Identificação do Segmento de Clientes",duracao:"4 semanas",
        desc:"Quem são as pessoas com esse problema? Use UX Research para identificar early adopters, criar personas e mapear comportamentos. Pessoas usuárias podem ser diferentes de clientes pagantes.",
        subtopicos:["Perfil demográfico, psicográfico e comportamental","Identificação e priorização de early adopters","Como os clientes resolvem o problema hoje (workarounds)","Criação de personas baseadas em dados reais","Mapa de empatia: o que pensa, sente, vê, faz","Jornada do usuário — linha do tempo de ações e sentimentos","Pontos de dor (pain points) e pontos de prazer","Job To Be Done: qual 'trabalho' o usuário contrata"],
        entregaveis:[
          {id:"e2_1",label:"PDE — Etapa 2 (segmento descrito com personas e mapa de empatia)"},
          {id:"e2_2",label:"Lean Canvas — blocos Segmento e Early Adopters"},
          {id:"e2_3",label:"Canvas Proposta de Valor — Perfil do Cliente (lado direito)"},
          {id:"e2_4",label:"Mapa de Jornada do Usuário inicial"},
        ],
        materiais:[
          {label:"🎓 Môre — Aula 7: UX Research (Paola Sales)",url:"#more-aula7",tag:"more"},
          {label:"🎓 Môre — Aula 8: Jornada do Usuário (Paola Sales)",url:"#more-aula8",tag:"more"},
          {label:"🎓 Môre — Template Roteiro de Entrevistas",url:"#more-roteiro",tag:"more"},
          {label:"📄 ICP — Apresentação ACE",url:"#ace-icp"},
          {label:"📄 Guia sobre Personas — ACE",url:"#ace-personas"},
          {label:"📄 Job-To-Be-Done — Apresentação ACE",url:"#ace-jtbd"},
          {label:"📄 Job-To-Be-Done — Material Complementar",url:"#ace-jtbd-comp"},
        ],
        criterios:[],
      },
      {
        id:"e3",num:"03",title:"Validação do Problema com Usuários",duracao:"6 semanas",
        banca:true,
        desc:"Pesquisa primária com usuários reais. Métodos qualitativos (entrevistas contextuais, observação) e quantitativos (questionários). Nunca apresente a solução durante a entrevista.",
        subtopicos:["Definição de objetivo e método (qualitativo x quantitativo)","Métodos: entrevistas contextuais, cliente oculto, user intercepts","Roteiro com perguntas abertas e empáticas","Espaço amostral: mínimo 20 entrevistas do segmento-alvo","10 boas práticas de entrevistas — Paola Sales / Môre","Registro e análise de padrões qualitativos","Síntese: frequência, intensidade e disposição a pagar","Mapa de Jornada do Usuário validado com dados reais","Atualização da Matriz CSD com aprendizados de campo"],
        entregaveis:[
          {id:"e3_1",label:"PDE — Etapa 3 (conclusão com relatório e padrões identificados)"},
          {id:"e3_2",label:"Relatório de Entrevistas (mín. 20 entrevistas com padrões)"},
          {id:"e3_3",label:"Quadro de Validação de Hipóteses (perseverar/pivotar)"},
          {id:"e3_4",label:"Lean Canvas — Problema e Segmento atualizados com dados"},
          {id:"e3_5",label:"Canvas Proposta de Valor — Dores e Ganhos validados"},
          {id:"e3_6",label:"Mapa de Jornada do Usuário completo (ações, sentimentos, pain points)"},
        ],
        materiais:[
          {label:"🎓 Môre — Aula 7: UX Research — Métodos e Boas Práticas",url:"#more-aula7",tag:"more"},
          {label:"🎓 Môre — Aula 8: Jornada do Usuário — Como Estruturar",url:"#more-aula8",tag:"more"},
          {label:"🎓 Môre — Template Roteiro de Entrevistas",url:"#more-roteiro",tag:"more"},
          {label:"📄 Pain Points — Apresentação ACE",url:"#ace-painpoints"},
          {label:"📄 Pain Points — Guia para Resolver Problemas",url:"#ace-pp-guia"},
          {label:"📄 Proposta de Valor — Apresentação ACE",url:"#ace-pv"},
          {label:"📄 Canvas Proposta de Valor (PDF)",url:"#ace-cvp-pdf"},
        ],
        criterios:["Early adopters identificados com hábitos documentados","Ao menos 1 problema must-have validado com 20+ entrevistas","Nível de dor mapeado: must-have / nice-to-have / don't need","Descrição de como os clientes resolvem o problema atualmente","Tamanho do mercado (SAM) estimado com premissas documentadas","Jornada do usuário mapeada com pontos de dor evidenciados"],
      },
    ],
  },
  fase2:{
    id:"fase2",label:"Fase 2",title:"Validação da Solução",
    color:AFYA.azul,bg:AFYA.azulLt,border:AFYA.azulMd,
    etapas:[
      {
        id:"e4",num:"04",title:"Ideação",duracao:"6 semanas",
        desc:"Transformar o aprendizado da Fase 1 em hipóteses de solução. Use a Opportunity Solution Tree para mapear oportunidades e conectar soluções a resultados desejados.",
        subtopicos:["Brainstorming e sessões de co-criação","Opportunity Solution Tree (resultado → oportunidades → soluções → experimentos)","Proposta de Valor Única (UVP)","Diferencial competitivo (Unfair Advantage)","Hipótese de modelo de negócios"],
        entregaveis:[
          {id:"e4_1",label:"PDE — Etapa 4 (proposta de valor, conceito, hipótese de modelo)"},
          {id:"e4_2",label:"Lean Canvas — Solução, UVP e Competência Essencial"},
          {id:"e4_3",label:"Canvas Proposta de Valor — Mapa de Valor (lado esquerdo)"},
          {id:"e4_4",label:"Opportunity Solution Tree no Miro"},
        ],
        materiais:[
          {label:"🎓 Môre — Aula 6: Geração de Ideias e Product Discovery 2",url:"#more-aula6",tag:"more"},
          {label:"🎓 Môre — Aula 3: Product Management — Estratégia",url:"#more-aula3",tag:"more"},
          {label:"📄 Modelo de Negócio — Apresentação ACE",url:"#ace-mn"},
          {label:"📄 Business Model Canvas",url:"#bmc"},
          {label:"📄 Startup Playbook — ACE",url:"#startup-playbook"},
        ],
        criterios:[],
      },
      {
        id:"e5",num:"05",title:"Prototipação / MVP",duracao:"12 semanas",
        desc:"Do protótipo de baixa fidelidade (papel, wireframe) ao MVP funcional. UX, UI, acessibilidade e UX Writing desde o início. O objetivo é aprendizado rápido com mínimo investimento.",
        subtopicos:["Protótipos de baixa vs. alta fidelidade","UX Design: fluxos, wireframes e layouts","UI Design: interfaces de sucesso, padrões visuais","Acessibilidade digital desde o início","UX Writing: microcopy centrado no usuário","Funcionalidades essenciais da UVP (evitar feature creep)","Ferramentas: Figma, Miro, InVision"],
        entregaveis:[
          {id:"e5_1",label:"PDE — Etapa 5 (funcionalidades, tecnologias, próximos passos)"},
          {id:"e5_2",label:"Protótipo / MVP (Figma, landing page ou MVP funcional)"},
          {id:"e5_3",label:"Lean Canvas atualizado com aprendizados da prototipação"},
        ],
        materiais:[
          {label:"🎓 Môre — Aula 9: Interfaces de Sucesso (Parte 1)",url:"#more-aula9",tag:"more"},
          {label:"🎓 Môre — Aula 10: Interfaces de Sucesso (Parte 2)",url:"#more-aula10",tag:"more"},
          {label:"🎓 Môre — Aula 11: Acessibilidade Digital",url:"#more-aula11",tag:"more"},
          {label:"🎓 Môre — Aula 12: UX Writing",url:"#more-aula12",tag:"more"},
          {label:"🎓 Môre — Prototipação (Guilhermo Reis)",url:"#more-proto",tag:"more"},
          {label:"📄 MVP — Material Complementar ACE",url:"#ace-mvp"},
          {label:"📄 UX Basics & Testes — ACE",url:"#ace-ux"},
        ],
        criterios:[],
      },
      {
        id:"e6",num:"06",title:"Validação da Solução",duracao:"8 semanas",
        desc:"Alcançar Product-Market Fit. Validar que a solução resolve o problema, que clientes desejam pagar e que o modelo de receita é viável. Use testes de usabilidade estruturados.",
        subtopicos:["Teste de usabilidade: moderado e não-moderado","Critérios de PMF: uso, pagamento, retenção","Métricas: taxa de sucesso nas tarefas, erros, tempo","Testes A/B para validação de hipóteses","Iteração baseada em evidências (pivô vs. perseverar)","Priorização de features: RICE Score"],
        entregaveis:[
          {id:"e6_1",label:"PDE — Etapa 6 (conclusão com evidências de PMF)"},
          {id:"e6_2",label:"Protótipo Validado com resultados de testes de usabilidade"},
          {id:"e6_3",label:"Quadro de Validação (hipóteses, critérios, decisões)"},
          {id:"e6_4",label:"Relatório de Entrevistas de Solução"},
          {id:"e6_5",label:"Lean Canvas atualizado (Solução, UVP, Canais, Receita)"},
        ],
        materiais:[
          {label:"🎓 Môre — Aula 13: Teste de Usabilidade e Prototipação",url:"#more-aula13",tag:"more"},
          {label:"🎓 Môre — Teste de Usabilidade (Guilhermo Reis)",url:"#more-usab",tag:"more"},
          {label:"🎓 Môre — Aula 4: Product Management — Gerenciamento",url:"#more-aula4",tag:"more"},
          {label:"📄 Jornada de Compra — Apresentação ACE",url:"#ace-jornada"},
          {label:"📄 Jornada de Compra — Template ACE",url:"#ace-jornada-template"},
        ],
        criterios:["Proposta de valor testada com clientes reais (que usaram e/ou pagaram)","Preço que os clientes estão dispostos a pagar foi determinado","Viabilidade de construir negócio sustentável foi avaliada","Modelo de receita validado (ao menos 1 transação real ou pré-venda)","Teste de usabilidade realizado com métricas documentadas"],
      },
    ],
  },
  fase3:{
    id:"fase3",label:"Fase 3",title:"Planejamento, Estruturação e Business Case",
    color:"#333333",bg:"#F8F8F8",border:"#CCCCCC",
    etapas:[
      {id:"e7",num:"07",title:"Aspectos Legais e Formalização",duracao:"6 semanas",desc:"Registrar marca, formalizar estrutura jurídica, equity e vesting.",subtopicos:[],
        entregaveis:[{id:"e7_1",label:"PDE — Etapa 7 (estrutura jurídica, PI, equipe formalizada)"},{id:"e7_2",label:"Contrato Social (CNPJ ativo)"},{id:"e7_3",label:"Certificado de Marca — INPI"},{id:"e7_4",label:"Relatório de Cargos e funções"},{id:"e7_5",label:"Canvas Jornada de Compras"}],
        materiais:[],criterios:[]},
      {id:"e8",num:"08",title:"Acesso ao Mercado",duracao:"8 semanas",desc:"Máquina de vendas e marketing. RICE Score para priorização de canais. Estratégia de go-to-market.",subtopicos:[],
        entregaveis:[{id:"e8_1",label:"PDE — Etapa 8 (go-to-market com canais RICE Score)"},{id:"e8_2",label:"Canvas Jornada de Compras finalizado"},{id:"e8_3",label:"Lean Canvas — Canais e Métricas"}],
        materiais:[{label:"📄 Processo de Venda — Série 5 Máquinas ACE",url:"#ace-vendas"},{label:"📄 Branding — Material Complementar ACE",url:"#ace-branding"},{label:"📄 Naming — Tabela ACE",url:"#ace-naming"}],
        criterios:[]},
      {id:"e9",num:"09",title:"Modelagem Econômico-Financeira",duracao:"8 semanas",desc:"TAM/SAM/SOM, DRE, Fluxo de Caixa, Valuation e North Star Metric.",subtopicos:[],
        entregaveis:[{id:"e9_1",label:"PDE — Etapa 9 (memorando com premissas)"},{id:"e9_2",label:"Modelagem Financeira (TAM/SAM/SOM, DRE, Fluxo de Caixa, Valuation)"},{id:"e9_3",label:"North Star Metric com Árvore de Métricas"},{id:"e9_4",label:"OKRs do próximo trimestre"},{id:"e9_5",label:"Lean Canvas — Custos e Receita"}],
        materiais:[{label:"📄 OpenView SaaS Benchmarks",url:"#saas"},{label:"📄 Fundraising — Valuation e Diluição ACE",url:"#ace-valuation"},{label:"📄 16 Counterintuitive Fundraising Lessons",url:"#fundraising"}],
        criterios:[]},
      {id:"e10",num:"10",title:"Business Case e Preparação para Investimento",duracao:"8 semanas",banca:true,
        desc:"Business Case completo: Sumário Executivo, Mercado, Solução, Modelagem, Investimento e Exit Strategy. Pitch validado.",subtopicos:[],
        entregaveis:[{id:"e10_1",label:"PDE — Etapa 10 (Business Case com 7 seções)"},{id:"e10_2",label:"Business Case (15–30 páginas)"},{id:"e10_3",label:"Lean Canvas Final (todos os 9 blocos)"},{id:"e10_4",label:"Modelagem Financeira completa"},{id:"e10_5",label:"Resumo Executivo (2 páginas)"},{id:"e10_6",label:"Pitch Deck (10–15 slides + vídeo)"},{id:"e10_7",label:"Press Release / FAQ"}],
        materiais:[],
        criterios:["Business Case completo com todas as 7 seções","Modelagem financeira revisada com premissas documentadas","Pitch validado com mentores e banca simulada","Resumo Executivo e Pitch Deck prontos","Exit Strategy com potenciais compradores identificados"]},
    ],
  },
};

const ALL_ETAPAS = Object.values(METHODOLOGY).flatMap(f=>f.etapas);

const OPORTUNIDADES = [
  {id:"op1",nome:"SEBRAE Inova",tipo:"Edital",prazo:"2026-06-30",status:"Aberto",desc:"Apoio a startups em fase inicial"},
  {id:"op2",nome:"Google for Startups",tipo:"Programa",prazo:"2026-07-15",status:"Aberto",desc:"Aceleração com créditos em nuvem"},
  {id:"op3",nome:"Inovação Aberta Afya",tipo:"Inovação Aberta",prazo:"2026-05-31",status:"Aberto",desc:"Programa interno Afya"},
  {id:"op4",nome:"Fundepar — Subvenção",tipo:"Fomento",prazo:"2026-08-01",status:"Em breve",desc:"Subvenção para tech em saúde"},
];

const MORE_MATERIAIS = [
  {aula:"Aula 1",title:"Transformação Digital",fase:"Fase 1 — Desk Research"},
  {aula:"Aula 3",title:"Product Management — Estratégia",fase:"Fase 2 — Ideação"},
  {aula:"Aula 4",title:"Product Management — Gerenciamento",fase:"Fase 2 — Validação"},
  {aula:"Aula 5",title:"Product Discovery Parte 1",fase:"Fase 1 — Desk Research"},
  {aula:"Aula 6",title:"Product Discovery Parte 2",fase:"Fase 1 — Desk Research"},
  {aula:"Aula 7",title:"UX Research — Paola Sales",fase:"Fase 1 — Validação"},
  {aula:"Aula 8",title:"Jornada do Usuário — Paola Sales",fase:"Fase 1 — Segmento"},
  {aula:"Aula 9",title:"Interfaces de Sucesso 1",fase:"Fase 2 — Prototipação"},
  {aula:"Aula 10",title:"Interfaces de Sucesso 2",fase:"Fase 2 — Prototipação"},
  {aula:"Aula 11",title:"Acessibilidade Digital",fase:"Fase 2 — MVP"},
  {aula:"Aula 12",title:"UX Writing",fase:"Fase 2 — MVP"},
  {aula:"Aula 13",title:"Teste de Usabilidade e Prototipação",fase:"Fase 2 — Validação"},
];

const INIT_PROJ = [
  {id:"p1",nome:"HealthTrack",equipe:"Rodrigo Santos, Ana Carvalho",unidade:"Afya Educacional",responsavel:"Rodrigo Santos",mentor:"Dr. Marcos Lima",fase:"fase1",etapaAtual:"e3",status:"Em andamento",maturidade:45,problema:"Gestão ineficiente de prontuários em clínicas de pequeno porte",dataEntrada:"2026-01-15",observacoes:"Equipe engajada. Precisam acelerar as entrevistas.",proximosPassos:"Completar 20 entrevistas até 15/05",linksDocs:[],entregaveisStatus:{},oportunidades:["op1","op3"],mentorias:[],historicoStatus:[{data:"2026-01-15",status:"Iniciado",obs:"Entrada no programa"},{data:"2026-02-10",status:"Em andamento",obs:"Concluiu Etapa 1"}]},
  {id:"p2",nome:"MedConnect",equipe:"Patricia Fonseca, Lucas Moura",unidade:"Afya Digital",responsavel:"Patricia Fonseca",mentor:"Dra. Clara Souza",fase:"fase2",etapaAtual:"e5",status:"Em andamento",maturidade:62,problema:"Dificuldade de comunicação entre médicos e pacientes pós-consulta",dataEntrada:"2025-11-01",observacoes:"MVP em construção.",proximosPassos:"Finalizar protótipo navegável até 30/04",linksDocs:[],entregaveisStatus:{},oportunidades:["op2"],mentorias:[],historicoStatus:[]},
  {id:"p3",nome:"ClinOps",equipe:"Felipe Dias",unidade:"Afya Residências",responsavel:"Felipe Dias",mentor:"Não definido",fase:"fase1",etapaAtual:"e0",status:"Travado",maturidade:15,problema:"Gestão operacional de residências médicas",dataEntrada:"2026-02-20",observacoes:"Founder solo. Iniciar pelo Desk Research.",proximosPassos:"Desk Research e ICP — agendar mentoria urgente",linksDocs:[],entregaveisStatus:{},oportunidades:[],mentorias:[],historicoStatus:[]},
];

const STATUS_OPTIONS = ["Em andamento","Travado","Em risco","Pronto para avançar","Aguardando banca","Concluído"];
const SC = {
  "Em andamento":{bg:AFYA.azulLt,text:"#1A3F80",dot:AFYA.azul},
  "Travado":{bg:AFYA.magentaLt,text:"#8B0035",dot:AFYA.magenta},
  "Em risco":{bg:"#FFFBEB",text:"#92400E",dot:"#F59E0B"},
  "Pronto para avançar":{bg:"#F0FAF4",text:"#166534",dot:"#22C55E"},
  "Aguardando banca":{bg:"#F5F3FF",text:"#5B21B6",dot:"#8B5CF6"},
  "Concluído":{bg:"#F0F9FF",text:"#0C4A6E",dot:"#0EA5E9"},
};

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────
const LS_KEY = "afya_projects_v1";
const SESSION_KEY = "afya_session_v1";

function loadProjects() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INIT_PROJ;
}

function saveProjects(projects) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(projects)); } catch {}
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveSession(user) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(user)); } catch {}
}

function clearSession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch {}
}

// ─── TELA DE LOGIN ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setErro("");
    setLoading(true);
    setTimeout(() => {
      const user = USUARIOS.find(u => u.email === email.trim().toLowerCase() && u.senha === senha);
      if (user) {
        saveSession(user);
        onLogin(user);
      } else {
        setErro("E-mail ou senha incorretos.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{
      minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:`linear-gradient(135deg, ${AFYA.dark} 0%, #1a1a2e 50%, #16213e 100%)`,
      fontFamily:"'DM Sans',Arial,sans-serif",
    }}>
      <div style={{
        background:"#fff", borderRadius:20, padding:"48px 40px", width:"100%", maxWidth:400,
        boxShadow:"0 32px 80px rgba(0,0,0,0.4)",
      }}>
        {/* Logo */}
        <div style={{textAlign:"center", marginBottom:36}}>
          <div style={{
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            width:56, height:56, borderRadius:16, background:AFYA.magenta,
            fontSize:24, fontWeight:900, color:"#fff", marginBottom:16,
            fontFamily:"'DM Mono',monospace",
          }}>A</div>
          <div style={{fontSize:11,fontWeight:800,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:3}}>Afya Inovação</div>
          <div style={{fontSize:22,fontWeight:800,color:AFYA.dark,lineHeight:1.2}}>Pré-Incubação</div>
          <div style={{fontSize:12,color:"#9CA3AF",marginTop:4}}>Sistema de Acompanhamento</div>
        </div>

        {/* Campos */}
        <div style={{marginBottom:14}}>
          <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>E-mail</label>
          <input
            type="email" value={email} onChange={e=>setEmail(e.target.value)}
            placeholder="seu@email.com"
            onKeyDown={e=>e.key==="Enter"&&handleLogin()}
            style={{
              width:"100%", boxSizing:"border-box", padding:"11px 14px",
              border:`1.5px solid ${erro?"#EF4444":"#E5E7EB"}`, borderRadius:10,
              fontSize:14, fontFamily:"inherit", outline:"none", color:AFYA.dark,
            }}
          />
        </div>
        <div style={{marginBottom:20}}>
          <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>Senha</label>
          <input
            type="password" value={senha} onChange={e=>setSenha(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e=>e.key==="Enter"&&handleLogin()}
            style={{
              width:"100%", boxSizing:"border-box", padding:"11px 14px",
              border:`1.5px solid ${erro?"#EF4444":"#E5E7EB"}`, borderRadius:10,
              fontSize:14, fontFamily:"inherit", outline:"none", color:AFYA.dark,
            }}
          />
        </div>

        {erro && (
          <div style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:13,color:"#DC2626",fontWeight:600}}>
            {erro}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width:"100%", padding:"13px", background:loading?"#9CA3AF":AFYA.magenta,
            border:"none", borderRadius:10, color:"#fff", cursor:loading?"not-allowed":"pointer",
            fontSize:14, fontWeight:800, fontFamily:"inherit", transition:"background 0.2s",
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* Dica de acesso */}
        <div style={{marginTop:24,padding:"12px 14px",background:"#F9FAFB",borderRadius:10,border:"1px solid #E5E7EB"}}>
          <div style={{fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Acessos disponíveis</div>
          {USUARIOS.map(u=>(
            <div key={u.email} style={{fontSize:11,color:"#6B7280",marginBottom:3,display:"flex",justifyContent:"space-between"}}>
              <span style={{fontWeight:600,color:AFYA.dark}}>{u.nome}</span>
              <span style={{fontFamily:"'DM Mono',monospace"}}>{u.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ATOMS ────────────────────────────────────────────────────────────────────
function Badge({status,sm}){
  const c=SC[status]||{bg:"#F3F4F6",text:"#374151",dot:"#6B7280"};
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,background:c.bg,color:c.text,padding:sm?"2px 8px":"4px 10px",borderRadius:20,fontSize:sm?11:12,fontWeight:700,fontFamily:"'DM Mono',monospace",whiteSpace:"nowrap"}}>
    <span style={{width:6,height:6,borderRadius:"50%",background:c.dot,flexShrink:0}}/>
    {status}
  </span>;
}

function Bar({val,col}){
  return <div style={{display:"flex",alignItems:"center",gap:8}}>
    <div style={{flex:1,height:5,borderRadius:3,background:"#E5E7EB",overflow:"hidden"}}>
      <div style={{width:`${val}%`,height:"100%",background:col||AFYA.magenta,borderRadius:3,transition:"width 0.4s"}}/>
    </div>
    <span style={{fontSize:11,fontWeight:700,color:"#374151",fontFamily:"'DM Mono',monospace",minWidth:30}}>{val}%</span>
  </div>;
}

function Modal({open,onClose,title,children}){
  if(!open)return null;
  return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(10,15,30,0.6)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:540,maxHeight:"85vh",overflow:"auto",boxShadow:"0 24px 60px rgba(0,0,0,0.25)"}}>
      <div style={{padding:"18px 24px",borderBottom:`2px solid ${AFYA.magenta}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:17,fontWeight:800,color:AFYA.dark}}>{title}</span>
        <button onClick={onClose} style={{border:"none",background:"none",cursor:"pointer",fontSize:22,color:"#9CA3AF",lineHeight:1}}>×</button>
      </div>
      <div style={{padding:24}}>{children}</div>
    </div>
  </div>;
}

function Inp({label,value,onChange,type="text",placeholder}){
  return <div style={{marginBottom:13}}>
    <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{label}</label>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",color:AFYA.dark}}
      onFocus={e=>e.target.style.borderColor=AFYA.magenta} onBlur={e=>e.target.style.borderColor="#E5E7EB"}/>
  </div>;
}
function Txta({label,value,onChange,rows=3,placeholder}){
  return <div style={{marginBottom:13}}>
    <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{label}</label>
    <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows} placeholder={placeholder}
      style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",color:AFYA.dark}}
      onFocus={e=>e.target.style.borderColor=AFYA.magenta} onBlur={e=>e.target.style.borderColor="#E5E7EB"}/>
  </div>;
}
function Sel({label,value,onChange,options}){
  return <div style={{marginBottom:13}}>
    <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{label}</label>
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{width:"100%",padding:"9px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",background:"#fff",color:AFYA.dark}}>
      {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
    </select>
  </div>;
}

// ─── NEW PROJECT ──────────────────────────────────────────────────────────────
function NewProjectModal({open,onClose,onSave}){
  const[f,setF]=useState({nome:"",equipe:"",unidade:"",responsavel:"",mentor:"",fase:"fase1",etapaAtual:"e0",status:"Em andamento",maturidade:0,problema:"",dataEntrada:new Date().toISOString().split("T")[0],observacoes:"",proximosPassos:"",linksDocs:[],entregaveisStatus:{},oportunidades:[],mentorias:[],historicoStatus:[]});
  const s=k=>v=>setF(p=>({...p,[k]:v}));
  const fOpts=Object.values(METHODOLOGY).map(f=>({value:f.id,label:f.title}));
  const eOpts=METHODOLOGY[f.fase]?.etapas.map(e=>({value:e.id,label:`${e.num} — ${e.title}`}))||[];
  return <Modal open={open} onClose={onClose} title="Adicionar Novo Projeto">
    <Inp label="Nome do Projeto *" value={f.nome} onChange={s("nome")} placeholder="Ex.: HealthTrack"/>
    <Inp label="Equipe / Integrantes" value={f.equipe} onChange={s("equipe")} placeholder="Ex.: João Silva, Maria Costa"/>
    <Inp label="Unidade / Origem" value={f.unidade} onChange={s("unidade")} placeholder="Ex.: Afya Educacional"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Inp label="Responsável" value={f.responsavel} onChange={s("responsavel")} placeholder="Nome"/>
      <Inp label="Mentor" value={f.mentor} onChange={s("mentor")} placeholder="Se definido"/>
    </div>
    <Txta label="Problema Central" value={f.problema} onChange={s("problema")} rows={2} placeholder="Descreva o problema que o projeto endereça"/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Sel label="Fase Inicial" value={f.fase} onChange={v=>{s("fase")(v);s("etapaAtual")(METHODOLOGY[v].etapas[0].id);}} options={fOpts}/>
      <Sel label="Status" value={f.status} onChange={s("status")} options={STATUS_OPTIONS}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Sel label="Etapa Inicial" value={f.etapaAtual} onChange={s("etapaAtual")} options={eOpts}/>
      <Inp label="Data de Entrada" value={f.dataEntrada} onChange={s("dataEntrada")} type="date"/>
    </div>
    <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
      <button onClick={onClose} style={{padding:"9px 18px",border:"1.5px solid #E5E7EB",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#374151"}}>Cancelar</button>
      <button onClick={()=>{if(!f.nome)return;onSave({...f,id:"p"+Date.now()});onClose();}}
        style={{padding:"9px 20px",border:"none",borderRadius:8,background:AFYA.magenta,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800}}>Adicionar Projeto</button>
    </div>
  </Modal>;
}

// ─── PROJECT DETAIL ───────────────────────────────────────────────────────────
function ProjectDetail({project,onBack,onUpdate}){
  const[activeE,setActiveE]=useState(null);
  const[editMode,setEditMode]=useState(false);
  const[form,setForm]=useState({...project});
  const[newLink,setNewLink]=useState({label:"",url:""});
  const[showLink,setShowLink]=useState(false);
  const s=k=>v=>setForm(p=>({...p,[k]:v}));
  const fase=METHODOLOGY[form.fase];

  const faseProgress=fid=>{
    const et=METHODOLOGY[fid].etapas;
    const tot=et.reduce((a,e)=>a+e.entregaveis.length,0);
    if(!tot)return 0;
    const done=et.reduce((a,e)=>a+e.entregaveis.filter(ev=>(form.entregaveisStatus||{})[ev.id]).length,0);
    return Math.round((done/tot)*100);
  };

  const toggleEv=id=>{
    const u={...form,entregaveisStatus:{...(form.entregaveisStatus||{}),[id]:!(form.entregaveisStatus||{})[id]}};
    setForm(u);onUpdate(u);
  };
  const addLink=()=>{
    if(!newLink.label||!newLink.url)return;
    const u={...form,linksDocs:[...(form.linksDocs||[]),{...newLink,id:Date.now()}]};
    setForm(u);onUpdate(u);setNewLink({label:"",url:""});setShowLink(false);
  };
  const updateStatus=st=>{
    const obs=window.prompt("Observação (opcional):")||"";
    const u={...form,status:st,historicoStatus:[...(form.historicoStatus||[]),{data:new Date().toISOString().split("T")[0],status:st,obs}]};
    setForm(u);onUpdate(u);
  };

  return <div style={{maxWidth:920,margin:"0 auto",paddingBottom:48}}>
    <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#6B7280",fontSize:13,padding:"16px 0",fontFamily:"inherit"}}>← Voltar para lista</button>
    <div style={{background:"#fff",borderRadius:16,border:`1.5px solid ${fase.border}`,padding:"24px 28px",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div>
          <h2 style={{fontSize:26,fontWeight:800,color:AFYA.dark,margin:"0 0 3px"}}>{form.nome}</h2>
          <p style={{fontSize:13,color:"#6B7280",margin:0}}>{form.unidade} · Entrada: {form.dataEntrada}</p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <Badge status={form.status}/>
          <select value={form.status} onChange={e=>updateStatus(e.target.value)} style={{fontSize:11,padding:"4px 8px",border:"1.5px solid #E5E7EB",borderRadius:8,background:"#F9FAFB",cursor:"pointer",color:"#374151"}}>
            {STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14,marginTop:18}}>
        {[["Responsável",form.responsavel],["Mentor",form.mentor||"Não definido"],["Equipe",form.equipe],["Fase",fase.title]].map(([k,v])=>(
          <div key={k}><div style={{fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3}}>{k}</div><div style={{fontSize:13,color:AFYA.dark,fontWeight:600}}>{v}</div></div>
        ))}
      </div>
      <div style={{marginTop:18}}>
        <div style={{fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Maturidade por Fase</div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          {Object.values(METHODOLOGY).map(f=>(
            <div key={f.id} style={{flex:1,minWidth:150}}>
              <div style={{fontSize:11,color:f.color,fontWeight:700,marginBottom:4}}>{f.label}</div>
              <Bar val={faseProgress(f.id)} col={f.color}/>
            </div>
          ))}
        </div>
      </div>
      <div style={{marginTop:16,padding:"10px 14px",background:AFYA.magentaLt,borderRadius:9,borderLeft:`3px solid ${AFYA.magenta}`}}>
        <div style={{fontSize:10,fontWeight:700,color:AFYA.magenta,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3}}>Problema Central</div>
        <p style={{fontSize:13,color:AFYA.dark,margin:0,lineHeight:1.6}}>{form.problema}</p>
      </div>
    </div>

    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:15,fontWeight:800,color:AFYA.dark}}>Observações & Próximos Passos</span>
        <button onClick={()=>editMode?(onUpdate(form),setEditMode(false)):setEditMode(true)}
          style={{border:`1.5px solid ${editMode?AFYA.magenta:"#E5E7EB"}`,background:editMode?AFYA.magenta:"#fff",color:editMode?"#fff":"#374151",padding:"5px 14px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700}}>
          {editMode?"Salvar":"Editar"}</button>
      </div>
      {editMode?<><Txta label="Observações" value={form.observacoes} onChange={s("observacoes")} rows={3}/><Txta label="Próximos Passos" value={form.proximosPassos} onChange={s("proximosPassos")} rows={2}/></>:
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {[["Observações",form.observacoes],["Próximos Passos",form.proximosPassos]].map(([l,v])=>(
            <div key={l}><div style={{fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>{l}</div><p style={{fontSize:13,color:"#374151",margin:0,lineHeight:1.6}}>{v||"—"}</p></div>
          ))}
        </div>}
    </div>

    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px",marginBottom:14}}>
      <h3 style={{fontSize:16,fontWeight:800,color:AFYA.dark,margin:"0 0 18px"}}>Jornada Metodológica Completa</h3>
      {Object.values(METHODOLOGY).map(fase=>(
        <div key={fase.id} style={{marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"8px 14px",background:fase.bg,borderRadius:10,border:`1px solid ${fase.border}`}}>
            <span style={{background:fase.color,color:"#fff",fontSize:10,fontWeight:800,padding:"2px 9px",borderRadius:12,fontFamily:"'DM Mono',monospace"}}>{fase.label}</span>
            <span style={{fontSize:14,fontWeight:800,color:fase.color}}>{fase.title}</span>
          </div>
          {fase.etapas.map(etapa=>{
            const tot=etapa.entregaveis.length;
            const done=etapa.entregaveis.filter(ev=>(form.entregaveisStatus||{})[ev.id]).length;
            const isCur=form.etapaAtual===etapa.id;
            const isOpen=activeE===etapa.id;
            return <div key={etapa.id} style={{marginBottom:7,borderRadius:10,border:`1.5px solid ${isCur?fase.color:"#E5E7EB"}`,overflow:"hidden",background:isCur?fase.bg:"#FAFAFA"}}>
              <button onClick={()=>setActiveE(isOpen?null:etapa.id)}
                style={{width:"100%",padding:"11px 16px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:fase.color,fontWeight:800}}>{etapa.num}</span>
                  <span style={{fontSize:13,fontWeight:700,color:AFYA.dark}}>{etapa.title}</span>
                  {isCur&&<span style={{fontSize:9,background:fase.color,color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:800}}>ATUAL</span>}
                  {etapa.isNew&&<span style={{fontSize:9,background:"#7C3AED",color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:800}}>NOVO</span>}
                  {etapa.banca&&<span style={{fontSize:9,background:"#F59E0B",color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:800}}>🏛 BANCA</span>}
                  {etapa.materiais?.some(m=>m.tag==="more")&&<span style={{fontSize:9,background:AFYA.magenta,color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:800}}>MÔRE</span>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:38,height:4,background:"#E5E7EB",borderRadius:2,overflow:"hidden"}}>
                      <div style={{width:tot?`${(done/tot)*100}%`:"0%",height:"100%",background:fase.color,borderRadius:2}}/>
                    </div>
                    <span style={{fontSize:11,color:"#6B7280",fontFamily:"'DM Mono',monospace"}}>{done}/{tot}</span>
                  </div>
                  <span style={{fontSize:13,color:"#9CA3AF"}}>{isOpen?"▲":"▼"}</span>
                </div>
              </button>
              {isOpen&&<div style={{padding:"0 16px 18px",borderTop:`1px solid ${isCur?fase.border:"#E5E7EB"}`}}>
                <p style={{fontSize:12,color:"#6B7280",lineHeight:1.7,margin:"12px 0 14px"}}>{etapa.desc}</p>
                {etapa.subtopicos&&etapa.subtopicos.length>0&&<div style={{marginBottom:14,padding:"10px 14px",background:"#F8F8F8",borderRadius:8,borderLeft:`3px solid ${fase.color}`}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Temas desta Etapa</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px"}}>
                    {etapa.subtopicos.map((t,i)=><div key={i} style={{fontSize:12,color:"#374151",display:"flex",gap:6}}><span style={{color:fase.color,fontWeight:800,flexShrink:0}}>·</span><span>{t}</span></div>)}
                  </div>
                </div>}
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Entregáveis</div>
                  {etapa.entregaveis.map(ev=>(
                    <label key={ev.id} style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",marginBottom:7,padding:"6px 8px",borderRadius:6,background:(form.entregaveisStatus||{})[ev.id]?"#F0FAF4":"transparent"}}>
                      <input type="checkbox" checked={!!(form.entregaveisStatus||{})[ev.id]} onChange={()=>toggleEv(ev.id)}
                        style={{marginTop:2,accentColor:fase.color,width:14,height:14,flexShrink:0}}/>
                      <span style={{fontSize:12,color:(form.entregaveisStatus||{})[ev.id]?"#9CA3AF":"#374151",textDecoration:(form.entregaveisStatus||{})[ev.id]?"line-through":"none",lineHeight:1.5}}>{ev.label}</span>
                    </label>
                  ))}
                </div>
                {etapa.criterios&&etapa.criterios.length>0&&<div style={{marginBottom:14,padding:"12px 14px",background:"#FFFBEB",borderRadius:8,border:"1px solid #FDE68A"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#92400E",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>✅ Critérios de Avanço / Banca</div>
                  {etapa.criterios.map((c,i)=><div key={i} style={{fontSize:12,color:"#92400E",marginBottom:4,display:"flex",gap:8}}><span style={{flexShrink:0}}>→</span><span>{c}</span></div>)}
                </div>}
                {etapa.materiais&&etapa.materiais.length>0&&<div>
                  <div style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Materiais de Apoio</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {etapa.materiais.map((m,i)=>(
                      <a key={i} href={m.url} style={{fontSize:11,padding:"4px 10px",borderRadius:12,textDecoration:"none",fontWeight:600,background:m.tag==="more"?AFYA.magentaLt:AFYA.azulLt,color:m.tag==="more"?AFYA.magenta:AFYA.azul,border:`1px solid ${m.tag==="more"?AFYA.magentaMd:AFYA.azulMd}`}}>{m.label}</a>
                    ))}
                  </div>
                  {etapa.materiais.some(m=>m.tag==="more")&&<div style={{marginTop:7,fontSize:10,color:"#9CA3AF",display:"flex",alignItems:"center",gap:4}}>
                    <span style={{background:AFYA.magenta,color:"#fff",padding:"1px 5px",borderRadius:6,fontSize:9,fontWeight:800}}>MÔRE</span>
                    <span>= Curso Design 50+ Môre Educação</span>
                  </div>}
                </div>}
              </div>}
            </div>;
          })}
        </div>
      ))}
    </div>

    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:15,fontWeight:800,color:AFYA.dark}}>Links & Documentos</span>
        <button onClick={()=>setShowLink(!showLink)} style={{border:`1.5px solid ${AFYA.magenta}`,background:AFYA.magenta,color:"#fff",padding:"5px 13px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700}}>+ Adicionar Link</button>
      </div>
      {showLink&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:8,marginBottom:12,alignItems:"flex-end"}}>
        {["Nome","URL"].map((lbl,idx)=>(
          <div key={lbl}><label style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:4}}>{lbl}</label>
            <input value={idx===0?newLink.label:newLink.url} onChange={e=>setNewLink(l=>idx===0?{...l,label:e.target.value}:{...l,url:e.target.value})}
              placeholder={idx===0?"Ex.: PDE Etapa 1":"https://..."}
              style={{width:"100%",padding:"8px 10px",border:"1.5px solid #E5E7EB",borderRadius:7,fontSize:12,boxSizing:"border-box"}}/></div>
        ))}
        <button onClick={addLink} style={{padding:"8px 14px",background:"#22C55E",border:"none",borderRadius:7,color:"#fff",cursor:"pointer",fontSize:14,fontWeight:800}}>✓</button>
      </div>}
      {(form.linksDocs||[]).length===0?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>Nenhum link adicionado ainda.</p>:
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {(form.linksDocs||[]).map(l=>(
            <div key={l.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"#F9FAFB",borderRadius:8}}>
              <a href={l.url} target="_blank" rel="noreferrer" style={{fontSize:13,color:AFYA.azul,textDecoration:"none",fontWeight:600}}>🔗 {l.label}</a>
              <button onClick={()=>{const u={...form,linksDocs:(form.linksDocs||[]).filter(x=>x.id!==l.id)};setForm(u);onUpdate(u);}} style={{border:"none",background:"none",cursor:"pointer",color:"#EF4444",fontSize:16}}>×</button>
            </div>
          ))}
        </div>}
    </div>

    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px",marginBottom:14}}>
      <h3 style={{fontSize:15,fontWeight:800,color:AFYA.dark,margin:"0 0 12px"}}>🌐 Oportunidades Externas</h3>
      {(form.oportunidades||[]).length===0?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>Nenhuma oportunidade vinculada.</p>:
        OPORTUNIDADES.filter(o=>(form.oportunidades||[]).includes(o.id)).map(o=>(
          <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:AFYA.azulLt,borderRadius:8,marginBottom:7,border:`1px solid ${AFYA.azulMd}`}}>
            <div><span style={{fontSize:13,fontWeight:700,color:AFYA.azul}}>{o.nome}</span><span style={{fontSize:11,color:"#6B7280",marginLeft:8}}>Prazo: {o.prazo}</span></div>
            <span style={{fontSize:11,background:AFYA.azulMd,color:AFYA.azul,padding:"2px 8px",borderRadius:10,fontWeight:700}}>{o.tipo}</span>
          </div>
        ))}
    </div>

    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px"}}>
      <h3 style={{fontSize:15,fontWeight:800,color:AFYA.dark,margin:"0 0 14px"}}>Histórico de Evolução</h3>
      {(form.historicoStatus||[]).length===0?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>Sem registros.</p>:
        <div style={{position:"relative",paddingLeft:24}}>
          <div style={{position:"absolute",left:8,top:0,bottom:0,width:2,background:AFYA.magentaMd}}/>
          {[...(form.historicoStatus||[])].reverse().map((h,i)=>(
            <div key={i} style={{position:"relative",marginBottom:12,paddingLeft:18}}>
              <div style={{position:"absolute",left:-14,top:4,width:8,height:8,borderRadius:"50%",background:AFYA.magenta}}/>
              <div style={{fontSize:11,color:"#9CA3AF",fontFamily:"'DM Mono',monospace"}}>{h.data}</div>
              <div style={{fontSize:13,fontWeight:700,color:AFYA.dark}}>{h.status}</div>
              {h.obs&&<div style={{fontSize:12,color:"#6B7280"}}>{h.obs}</div>}
            </div>
          ))}
        </div>}
    </div>
  </div>;
}

// ─── MENTORIAS ─────────────────────────────────────────────────────────────────
function MentoriasTab({projects,onUpdate}){
  const[showM,setShowM]=useState(false);
  const[f,setF]=useState({projetoId:projects[0]?.id||"",mentor:"",data:"",frequencia:"Quinzenal",presenca:"Presente",direcionamentos:"",pendencias:"",proximosPassos:""});
  const s=k=>v=>setF(p=>({...p,[k]:v}));
  const allM=projects.flatMap(p=>(p.mentorias||[]).map(m=>({...m,projetoNome:p.nome}))).sort((a,b)=>b.data.localeCompare(a.data));
  const semM=projects.filter(p=>{
    if(!(p.mentorias||[]).length)return true;
    const last=[...p.mentorias].sort((a,b)=>b.data.localeCompare(a.data))[0];
    return(new Date()-new Date(last.data))/86400000>21;
  });
  const save=()=>{
    const pr=projects.find(p=>p.id===f.projetoId);
    if(!pr)return;
    onUpdate({...pr,mentorias:[...(pr.mentorias||[]),{...f,id:Date.now()}]});
    setShowM(false);
  };
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div><h2 style={{fontSize:22,fontWeight:800,color:AFYA.dark,margin:0}}>Mentorias</h2><p style={{fontSize:13,color:"#6B7280",margin:"4px 0 0"}}>Registro e histórico de todas as mentorias</p></div>
      <button onClick={()=>setShowM(true)} style={{padding:"10px 18px",background:AFYA.magenta,border:"none",borderRadius:10,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800}}>+ Registrar Mentoria</button>
    </div>
    {semM.length>0&&<div style={{background:AFYA.magentaLt,border:`1.5px solid ${AFYA.magentaMd}`,borderRadius:12,padding:"14px 18px",marginBottom:20}}>
      <div style={{fontSize:12,fontWeight:800,color:AFYA.magenta,marginBottom:6}}>⚠ Projetos sem mentoria há mais de 21 dias</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{semM.map(p=><span key={p.id} style={{fontSize:12,background:AFYA.magentaMd,color:AFYA.magenta,padding:"2px 10px",borderRadius:10,fontWeight:700}}>{p.nome}</span>)}</div>
    </div>}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:24}}>
      {projects.map(p=>{
        const ms=[...(p.mentorias||[])].sort((a,b)=>b.data.localeCompare(a.data));
        return <div key={p.id} style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px"}}>
          <div style={{fontSize:15,fontWeight:800,color:AFYA.dark,marginBottom:3}}>{p.nome}</div>
          <div style={{fontSize:12,color:"#6B7280",marginBottom:12}}>Mentor: {p.mentor||"Não definido"}</div>
          {ms.length===0?<p style={{fontSize:12,color:AFYA.magenta,fontWeight:700,margin:0}}>Nenhuma mentoria registrada</p>:
            ms.slice(0,2).map(m=><div key={m.id} style={{padding:"8px 10px",background:"#F9FAFB",borderRadius:8,marginBottom:6}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:11,fontWeight:700,color:"#374151",fontFamily:"'DM Mono',monospace"}}>{m.data}</span>
                <span style={{fontSize:10,background:m.presenca==="Presente"?"#D1FAE5":"#FEE2E2",color:m.presenca==="Presente"?"#065F46":"#991B1B",padding:"1px 7px",borderRadius:10,fontWeight:800}}>{m.presenca}</span>
              </div>
              {m.direcionamentos&&<p style={{fontSize:12,color:"#6B7280",margin:0,lineHeight:1.4}}>{m.direcionamentos.slice(0,80)}{m.direcionamentos.length>80?"…":""}</p>}
            </div>)}
          <div style={{fontSize:11,color:"#9CA3AF",marginTop:5}}>{ms.length} mentoria(s)</div>
        </div>;
      })}
    </div>
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px"}}>
      <h3 style={{fontSize:15,fontWeight:800,color:AFYA.dark,margin:"0 0 14px"}}>Histórico Geral</h3>
      {allM.length===0?<p style={{fontSize:13,color:"#9CA3AF"}}>Nenhuma mentoria registrada.</p>:
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"2px solid #F3F4F6"}}>
            {["Projeto","Mentor","Data","Presença","Direcionamentos","Pendências"].map(h=>(
              <th key={h} style={{textAlign:"left",padding:"6px 10px",fontSize:10,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{allM.map((m,i)=>(
            <tr key={m.id} style={{borderBottom:"1px solid #F9FAFB",background:i%2===0?"#fff":"#FAFAFA"}}>
              <td style={{padding:"8px 10px",fontWeight:700,color:AFYA.dark}}>{m.projetoNome}</td>
              <td style={{padding:"8px 10px",color:"#374151"}}>{m.mentor}</td>
              <td style={{padding:"8px 10px",fontFamily:"'DM Mono',monospace",color:"#374151"}}>{m.data}</td>
              <td style={{padding:"8px 10px"}}><span style={{fontSize:10,background:m.presenca==="Presente"?"#D1FAE5":"#FEE2E2",color:m.presenca==="Presente"?"#065F46":"#991B1B",padding:"2px 8px",borderRadius:10,fontWeight:800}}>{m.presenca}</span></td>
              <td style={{padding:"8px 10px",color:"#6B7280",maxWidth:180}}>{(m.direcionamentos||"").slice(0,60)}{(m.direcionamentos||"").length>60?"…":""}</td>
              <td style={{padding:"8px 10px",color:m.pendencias?AFYA.magenta:"#9CA3AF",fontWeight:m.pendencias?700:400}}>{m.pendencias||"—"}</td>
            </tr>
          ))}</tbody>
        </table>}
    </div>
    <Modal open={showM} onClose={()=>setShowM(false)} title="Registrar Mentoria">
      <Sel label="Projeto" value={f.projetoId} onChange={s("projetoId")} options={projects.map(p=>({value:p.id,label:p.nome}))}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><Inp label="Mentor" value={f.mentor} onChange={s("mentor")} placeholder="Nome"/><Inp label="Data" type="date" value={f.data} onChange={s("data")}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><Sel label="Frequência" value={f.frequencia} onChange={s("frequencia")} options={["Semanal","Quinzenal","Mensal","Pontual"]}/><Sel label="Presença" value={f.presenca} onChange={s("presenca")} options={["Presente","Ausente","Parcial"]}/></div>
      <Txta label="Principais Direcionamentos" value={f.direcionamentos} onChange={s("direcionamentos")} rows={2} placeholder="O que foi discutido…"/>
      <Txta label="Pendências" value={f.pendencias} onChange={s("pendencias")} rows={2} placeholder="O que ficou pendente…"/>
      <Txta label="Próximos Passos" value={f.proximosPassos} onChange={s("proximosPassos")} rows={2} placeholder="Ações definidas…"/>
      <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
        <button onClick={()=>setShowM(false)} style={{padding:"9px 18px",border:"1.5px solid #E5E7EB",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#374151"}}>Cancelar</button>
        <button onClick={save} style={{padding:"9px 20px",border:"none",borderRadius:8,background:AFYA.magenta,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800}}>Salvar</button>
      </div>
    </Modal>
  </div>;
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardTab({projects,onViewProject,onAddProject}){
  const byS=s=>projects.filter(p=>p.status===s).length;
  const byF=f=>projects.filter(p=>p.fase===f).length;
  const avgM=projects.length?Math.round(projects.reduce((a,p)=>a+p.maturidade,0)/projects.length):0;
  const semMentor=projects.filter(p=>!p.mentor||p.mentor==="Não definido").length;
  const comOp=projects.filter(p=>(p.oportunidades||[]).length>0).length;
  const attention=projects.filter(p=>["Travado","Em risco"].includes(p.status));
  const ready=projects.filter(p=>["Pronto para avançar","Aguardando banca"].includes(p.status));
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div><h2 style={{fontSize:22,fontWeight:800,color:AFYA.dark,margin:0}}>Dashboard do Programa</h2><p style={{fontSize:13,color:"#6B7280",margin:"4px 0 0"}}>Visão gerencial de todos os projetos</p></div>
      <button onClick={onAddProject} style={{padding:"10px 18px",background:AFYA.magenta,border:"none",borderRadius:10,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800}}>+ Novo Projeto</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(135px,1fr))",gap:12,marginBottom:22}}>
      {[["◈","Total",projects.length,AFYA.dark],["▶","Em Andamento",byS("Em andamento"),AFYA.azul],["⚠","Travados",byS("Travado"),AFYA.magenta],["✅","Prontos p/ Avançar",byS("Pronto para avançar"),"#059669"],["📈","Maturidade Média",`${avgM}%`,"#7C3AED"],["🌐","Com Oportunidades",comOp,"#EA580C"]].map(([icon,label,val,col])=>(
        <div key={label} style={{background:"#fff",borderRadius:12,border:"1.5px solid #E5E7EB",padding:"15px 16px"}}>
          <div style={{fontSize:18,marginBottom:5}}>{icon}</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:24,fontWeight:800,color:col}}>{val}</div>
          <div style={{fontSize:11,color:"#6B7280",marginTop:2}}>{label}</div>
        </div>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:18}}>
      <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px"}}>
        <h3 style={{fontSize:15,fontWeight:800,color:AFYA.dark,margin:"0 0 14px"}}>Projetos por Fase</h3>
        {Object.values(METHODOLOGY).map(f=>(
          <div key={f.id} style={{marginBottom:11}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:12,color:f.color,fontWeight:700}}>{f.label} — {f.title}</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:800,color:AFYA.dark}}>{byF(f.id)}</span>
            </div>
            <div style={{height:6,background:"#F3F4F6",borderRadius:3,overflow:"hidden"}}>
              <div style={{width:projects.length?`${(byF(f.id)/projects.length)*100}%`:"0%",height:"100%",background:f.color,borderRadius:3}}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px"}}>
        <h3 style={{fontSize:15,fontWeight:800,color:AFYA.dark,margin:"0 0 14px"}}>Rotina de Acompanhamento</h3>
        {[["Projetos sem mentor",semMentor,semMentor>0,AFYA.magenta],["Projetos travados",byS("Travado"),byS("Travado")>0,"#F59E0B"],["Aguardando banca",byS("Aguardando banca"),false,"#8B5CF6"],["Sem nenhuma mentoria",projects.filter(p=>!(p.mentorias||[]).length).length,false,AFYA.azul]].map(([label,val,urg,col])=>(
          <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #F3F4F6"}}>
            <span style={{fontSize:12,color:urg?col:"#374151",fontWeight:urg?800:400}}>{urg?"⚠ ":""}{label}</span>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:15,fontWeight:800,color:urg?col:AFYA.dark}}>{val}</span>
          </div>
        ))}
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:18}}>
      <div style={{background:"#fff",borderRadius:14,border:`1.5px solid ${AFYA.magentaMd}`,padding:"18px 20px"}}>
        <h3 style={{fontSize:15,fontWeight:800,color:AFYA.magenta,margin:"0 0 12px"}}>🚨 Precisam de Atenção</h3>
        {attention.length===0?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>Nenhum projeto em atenção.</p>:attention.map(p=>(
          <div key={p.id} onClick={()=>onViewProject(p.id)} style={{padding:"8px 10px",background:AFYA.magentaLt,borderRadius:8,marginBottom:6,cursor:"pointer",border:`1px solid ${AFYA.magentaMd}`}}>
            <div style={{fontSize:13,fontWeight:800,color:AFYA.dark}}>{p.nome}</div>
            <div style={{fontSize:11,color:"#6B7280"}}>{(p.proximosPassos||"").slice(0,65)}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #6EE7B7",padding:"18px 20px"}}>
        <h3 style={{fontSize:15,fontWeight:800,color:"#059669",margin:"0 0 12px"}}>✅ Prontos para Avançar / Banca</h3>
        {ready.length===0?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>Nenhum pronto no momento.</p>:ready.map(p=>(
          <div key={p.id} onClick={()=>onViewProject(p.id)} style={{padding:"8px 10px",background:"#F0FAF4",borderRadius:8,marginBottom:6,cursor:"pointer",border:"1px solid #6EE7B7"}}>
            <div style={{fontSize:13,fontWeight:800,color:AFYA.dark}}>{p.nome}</div><Badge status={p.status} sm/>
          </div>
        ))}
      </div>
    </div>
    <div style={{background:AFYA.magentaLt,borderRadius:14,border:`1.5px solid ${AFYA.magentaMd}`,padding:"18px 20px",marginBottom:18}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <span style={{background:AFYA.magenta,color:"#fff",fontSize:11,fontWeight:800,padding:"3px 10px",borderRadius:10}}>MÔRE</span>
        <h3 style={{fontSize:15,fontWeight:800,color:AFYA.magenta,margin:0}}>Materiais do Curso Design 50+ — Môre Educação</h3>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
        {MORE_MATERIAIS.map(m=>(
          <div key={m.aula} style={{padding:"10px 12px",background:"#fff",borderRadius:8,border:`1px solid ${AFYA.magentaMd}`}}>
            <div style={{fontSize:10,fontWeight:800,color:AFYA.magenta,textTransform:"uppercase",letterSpacing:"0.07em"}}>{m.aula}</div>
            <div style={{fontSize:12,fontWeight:700,color:AFYA.dark,margin:"2px 0 3px"}}>{m.title}</div>
            <div style={{fontSize:10,color:"#6B7280"}}>{m.fase}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px",marginBottom:18}}>
      <h3 style={{fontSize:15,fontWeight:800,color:AFYA.dark,margin:"0 0 14px"}}>🌐 Oportunidades Externas & Editais</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
        {OPORTUNIDADES.map(op=>(
          <div key={op.id} style={{padding:"12px 14px",borderRadius:10,border:"1.5px solid #E5E7EB",background:"#F9FAFB"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
              <span style={{fontSize:13,fontWeight:800,color:AFYA.dark}}>{op.nome}</span>
              <span style={{fontSize:10,background:op.status==="Aberto"?"#D1FAE5":"#FEF3C7",color:op.status==="Aberto"?"#065F46":"#92400E",padding:"2px 8px",borderRadius:10,fontWeight:800,whiteSpace:"nowrap"}}>{op.status}</span>
            </div>
            <p style={{fontSize:11,color:"#6B7280",margin:"0 0 6px",lineHeight:1.5}}>{op.desc}</p>
            <div style={{fontSize:11}}><span style={{background:AFYA.azulLt,color:AFYA.azul,padding:"1px 7px",borderRadius:8,fontWeight:700}}>{op.tipo}</span><span style={{marginLeft:8,color:"#9CA3AF"}}>Prazo: {op.prazo}</span></div>
            <div style={{marginTop:5,fontSize:11,color:"#6B7280"}}>Para: {projects.filter(p=>(p.oportunidades||[]).includes(op.id)).map(p=>p.nome).join(", ")||"—"}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px"}}>
      <h3 style={{fontSize:15,fontWeight:800,color:AFYA.dark,margin:"0 0 14px"}}>Todos os Projetos</h3>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"2px solid #F3F4F6"}}>
            {["Projeto","Fase","Etapa Atual","Status","Maturidade","Mentor",""].map(h=><th key={h} style={{textAlign:"left",padding:"6px 10px",fontSize:10,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{h}</th>)}
          </tr></thead>
          <tbody>{projects.map((p,i)=>{
            const fase=METHODOLOGY[p.fase];
            const etapa=ALL_ETAPAS.find(e=>e.id===p.etapaAtual);
            return <tr key={p.id} style={{borderBottom:"1px solid #F9FAFB",background:i%2===0?"#fff":"#FAFAFA",cursor:"pointer"}} onClick={()=>onViewProject(p.id)}>
              <td style={{padding:"10px 10px",fontWeight:800,color:AFYA.dark}}>{p.nome}</td>
              <td style={{padding:"10px 10px"}}><span style={{fontSize:10,background:fase?.bg,color:fase?.color,border:`1px solid ${fase?.border}`,padding:"2px 8px",borderRadius:10,fontWeight:800}}>{fase?.label}</span></td>
              <td style={{padding:"10px 10px",color:"#374151"}}>{etapa?`${etapa.num} — ${etapa.title}`:"—"}</td>
              <td style={{padding:"10px 10px"}}><Badge status={p.status} sm/></td>
              <td style={{padding:"10px 10px",minWidth:100}}><Bar val={p.maturidade} col={fase?.color}/></td>
              <td style={{padding:"10px 10px",color:"#6B7280"}}>{p.mentor||"—"}</td>
              <td style={{padding:"10px 10px"}}><span style={{fontSize:11,color:AFYA.azul,fontWeight:800}}>Ver →</span></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>
  </div>;
}

// ─── PROJECTS LIST ─────────────────────────────────────────────────────────────
function ProjectsList({projects,onViewProject,onAddProject}){
  const[filter,setFilter]=useState("all");
  const filtered=filter==="all"?projects:projects.filter(p=>p.fase===filter||p.status===filter);
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div><h2 style={{fontSize:22,fontWeight:800,color:AFYA.dark,margin:0}}>Projetos</h2><p style={{fontSize:13,color:"#6B7280",margin:"4px 0 0"}}>Selecione um projeto para ver e atualizar a jornada completa</p></div>
      <button onClick={onAddProject} style={{padding:"10px 18px",background:AFYA.magenta,border:"none",borderRadius:10,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800}}>+ Novo Projeto</button>
    </div>
    <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
      {[["all","Todos"],["fase1","Fase 1"],["fase2","Fase 2"],["fase3","Fase 3"],["Travado","Travados"],["Pronto para avançar","Prontos"]].map(([val,label])=>(
        <button key={val} onClick={()=>setFilter(val)} style={{padding:"6px 14px",border:`1.5px solid ${filter===val?AFYA.magenta:"#E5E7EB"}`,borderRadius:20,background:filter===val?AFYA.magenta:"#fff",color:filter===val?"#fff":"#374151",cursor:"pointer",fontSize:12,fontWeight:500}}>{label}</button>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(275px,1fr))",gap:16}}>
      {filtered.map(p=>{
        const fase=METHODOLOGY[p.fase];
        const etapa=ALL_ETAPAS.find(e=>e.id===p.etapaAtual);
        return <div key={p.id} onClick={()=>onViewProject(p.id)}
          style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"20px",cursor:"pointer",transition:"box-shadow 0.2s,border-color 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 20px rgba(206,0,88,0.1)";e.currentTarget.style.borderColor=AFYA.magentaMd;}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="#E5E7EB";}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
            <span style={{fontSize:10,background:fase?.bg,color:fase?.color,border:`1px solid ${fase?.border}`,padding:"2px 9px",borderRadius:10,fontWeight:800}}>{fase?.label}</span>
            <Badge status={p.status} sm/>
          </div>
          <h3 style={{fontSize:17,fontWeight:800,color:AFYA.dark,margin:"0 0 4px"}}>{p.nome}</h3>
          <p style={{fontSize:12,color:"#6B7280",margin:"0 0 12px",lineHeight:1.5}}>{(p.problema||"").slice(0,85)}{(p.problema||"").length>85?"…":""}</p>
          <div style={{fontSize:11,color:"#9CA3AF",marginBottom:10}}>Etapa: <span style={{color:"#374151",fontWeight:700}}>{etapa?`${etapa.num} — ${etapa.title}`:"—"}</span></div>
          <Bar val={p.maturidade} col={fase?.color}/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:10}}>
            <span style={{fontSize:11,color:"#9CA3AF"}}>{p.responsavel}</span>
            <span style={{fontSize:11,color:AFYA.magenta,fontWeight:800}}>Ver projeto →</span>
          </div>
        </div>;
      })}
    </div>
  </div>;
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App(){
  const[user,setUser]=useState(()=>loadSession());
  const[tab,setTab]=useState("dashboard");
  const[projects,setProjects]=useState(()=>loadProjects());
  const[viewId,setViewId]=useState(null);
  const[showNew,setShowNew]=useState(false);

  // Salva no localStorage sempre que projetos mudam
  useEffect(()=>{ saveProjects(projects); },[projects]);

  const updProj=u=>setProjects(ps=>ps.map(p=>p.id===u.id?u:p));
  const addProj=p=>setProjects(ps=>[...ps,p]);
  const viewProj=id=>{setViewId(id);setTab("projetos");};
  const viewProj2=projects.find(p=>p.id===viewId);
  const handleLogout=()=>{ clearSession(); setUser(null); };

  if(!user) return <LoginScreen onLogin={setUser}/>;

  const TABS=[{id:"dashboard",icon:"▦",label:"Dashboard"},{id:"projetos",icon:"◈",label:"Projetos"},{id:"mentorias",icon:"◎",label:"Mentorias"}];

  return <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      *{box-sizing:border-box;}
      body{margin:0;font-family:'DM Sans',Arial,sans-serif;background:#F6F7FA;color:#333;}
      ::-webkit-scrollbar{width:6px;height:6px;}
      ::-webkit-scrollbar-track{background:#F3F4F6;}
      ::-webkit-scrollbar-thumb{background:#D1D5DB;border-radius:3px;}
    `}</style>
    <div style={{display:"flex",minHeight:"100vh"}}>
      {/* Sidebar */}
      <aside style={{width:228,background:AFYA.dark,color:"#fff",flexShrink:0,display:"flex",flexDirection:"column",padding:"0 0 20px",position:"sticky",top:0,height:"100vh",overflow:"auto"}}>
        <div style={{padding:"18px 20px 16px",borderBottom:`2px solid ${AFYA.magenta}`,background:AFYA.magenta}}>
          <div style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,0.75)",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:1}}>Afya Inovação</div>
          <div style={{fontSize:17,fontWeight:800,color:"#fff",lineHeight:1.2}}>Pré-Incubação</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",marginTop:2}}>Sistema de Acompanhamento</div>
        </div>
        <nav style={{padding:"16px 12px",flex:1}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>{setTab(t.id);if(t.id!=="projetos")setViewId(null);}}
              style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,marginBottom:4,background:tab===t.id?"rgba(206,0,88,0.2)":"transparent",border:`1.5px solid ${tab===t.id?AFYA.magenta:"transparent"}`,color:tab===t.id?"#fff":"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:13,fontWeight:tab===t.id?800:500,fontFamily:"inherit",textAlign:"left",transition:"all 0.15s"}}>
              <span style={{fontSize:15}}>{t.icon}</span>{t.label}
              {t.id==="projetos"&&<span style={{marginLeft:"auto",fontFamily:"'DM Mono',monospace",fontSize:11,background:"rgba(255,255,255,0.1)",padding:"1px 8px",borderRadius:10}}>{projects.length}</span>}
            </button>
          ))}
          <div style={{marginTop:22,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.1)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:10,paddingLeft:4}}>Fases</div>
            {Object.values(METHODOLOGY).map(f=>(
              <div key={f.id} style={{display:"flex",justifyContent:"space-between",padding:"5px 8px",fontSize:12,color:"rgba(255,255,255,0.4)"}}>
                <span>{f.label}</span>
                <span style={{fontFamily:"'DM Mono',monospace",color:f.id==="fase1"?AFYA.magentaMd:f.id==="fase2"?AFYA.azulMd:"#ccc",fontWeight:800}}>{projects.filter(p=>p.fase===f.id).length}</span>
              </div>
            ))}
          </div>
        </nav>
        {/* Usuário logado + Sair */}
        <div style={{padding:"12px 14px",borderTop:"1px solid rgba(255,255,255,0.1)",marginBottom:10}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginBottom:2}}>Logado como</div>
          <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:8}}>{user.nome}</div>
          <button onClick={handleLogout}
            style={{width:"100%",padding:"8px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>
            Sair
          </button>
        </div>
        <div style={{padding:"0 14px"}}>
          <button onClick={()=>setShowNew(true)}
            style={{width:"100%",padding:"11px",background:AFYA.magenta,border:"none",borderRadius:10,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800,fontFamily:"inherit"}}
            onMouseEnter={e=>e.target.style.opacity="0.85"} onMouseLeave={e=>e.target.style.opacity="1"}>
            + Novo Projeto
          </button>
        </div>
      </aside>
      <main style={{flex:1,padding:"28px 32px",overflow:"auto"}}>
        {tab==="dashboard"&&<DashboardTab projects={projects} onViewProject={viewProj} onAddProject={()=>setShowNew(true)}/>}
        {tab==="projetos"&&(viewProj2?<ProjectDetail project={viewProj2} onBack={()=>setViewId(null)} onUpdate={updProj}/>:<ProjectsList projects={projects} onViewProject={viewProj} onAddProject={()=>setShowNew(true)}/>)}
        {tab==="mentorias"&&<MentoriasTab projects={projects} onUpdate={updProj}/>}
      </main>
    </div>
    <NewProjectModal open={showNew} onClose={()=>setShowNew(false)} onSave={addProj}/>
  </>;
}
