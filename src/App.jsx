import { useState, useEffect, useRef } from "react";

// ─── USUÁRIOS (altere aqui para adicionar/remover usuários) ───────────────────
const USUARIOS = [
  { email: "admin@afya.com.br",   senha: "afya2026",   nome: "Administrador",       role: "admin"  },
  { email: "rayza@afya.com.br",   senha: "rayza123",   nome: "Rayza Resende",        role: "gestor" },
  { email: "mentor@afya.com.br",  senha: "mentor123",  nome: "Mentor Afya",          role: "mentor" },
];

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const LS_KEY  = "afya_proj_v2";
const SES_KEY = "afya_session_v2";
const loadProjects = () => { try { const r=localStorage.getItem(LS_KEY); if(r) return JSON.parse(r); } catch{} return null; };
const saveProjects = p => { try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch{} };
const loadSession  = () => { try { const r=sessionStorage.getItem(SES_KEY); if(r) return JSON.parse(r); } catch{} return null; };
const saveSession  = u => { try { sessionStorage.setItem(SES_KEY, JSON.stringify(u)); } catch{} };
const clearSession = () => { try { sessionStorage.removeItem(SES_KEY); } catch{} };

// ─── TELA DE LOGIN ────────────────────────────────────────────────────────────
function LoginScreen({onLogin}){
  const[email,setEmail]=useState("");
  const[senha,setSenha]=useState("");
  const[erro,setErro]=useState("");
  const[loading,setLoading]=useState(false);
  const A2={mg:"#CE0058",dark:"#1A2141"};
  const handle=()=>{
    setErro("");setLoading(true);
    setTimeout(()=>{
      const u=USUARIOS.find(u=>u.email===email.trim().toLowerCase()&&u.senha===senha);
      if(u){saveSession(u);onLogin(u);}else{setErro("E-mail ou senha incorretos.");}
      setLoading(false);
    },500);
  };
  return <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:`linear-gradient(135deg,${A2.dark} 0%,#1a1a2e 60%,#16213e 100%)`,fontFamily:"'DM Sans',Arial,sans-serif"}}>
    <div style={{background:"#fff",borderRadius:20,padding:"48px 40px",width:"100%",maxWidth:400,boxShadow:"0 32px 80px rgba(0,0,0,0.4)"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:52,height:52,borderRadius:14,background:A2.mg,fontSize:22,fontWeight:900,color:"#fff",marginBottom:14}}>A</div>
        <div style={{height:3,background:"linear-gradient(90deg,#CE0058,#6B2FC9,#0057B8)",borderRadius:2,marginBottom:16}}/>
        <div style={{fontSize:11,fontWeight:800,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:3}}>Afya Inovação</div>
        <div style={{fontSize:22,fontWeight:800,color:A2.dark}}>Pré-Incubação</div>
        <div style={{fontSize:12,color:"#9CA3AF",marginTop:4}}>Sistema de Acompanhamento</div>
      </div>
      <div style={{marginBottom:13}}>
        <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>E-mail</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" onKeyDown={e=>e.key==="Enter"&&handle()}
          style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",border:`1.5px solid ${erro?"#EF4444":"#E5E7EB"}`,borderRadius:10,fontSize:14,fontFamily:"inherit",outline:"none",color:A2.dark}}/>
      </div>
      <div style={{marginBottom:20}}>
        <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>Senha</label>
        <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handle()}
          style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",border:`1.5px solid ${erro?"#EF4444":"#E5E7EB"}`,borderRadius:10,fontSize:14,fontFamily:"inherit",outline:"none",color:A2.dark}}/>
      </div>
      {erro&&<div style={{background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:13,color:"#DC2626",fontWeight:600}}>{erro}</div>}
      <button onClick={handle} disabled={loading}
        style={{width:"100%",padding:"13px",background:loading?"#9CA3AF":A2.mg,border:"none",borderRadius:10,color:"#fff",cursor:loading?"not-allowed":"pointer",fontSize:14,fontWeight:800,fontFamily:"inherit"}}>
        {loading?"Entrando...":"Entrar"}
      </button>
      <div style={{marginTop:22,padding:"12px 14px",background:"#F9FAFB",borderRadius:10,border:"1px solid #E5E7EB"}}>
        <div style={{fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Acessos</div>
        {USUARIOS.map(u=><div key={u.email} style={{fontSize:11,color:"#6B7280",marginBottom:3,display:"flex",justifyContent:"space-between"}}>
          <span style={{fontWeight:600,color:A2.dark}}>{u.nome}</span>
          <span style={{fontFamily:"monospace"}}>{u.email}</span>
        </div>)}
      </div>
    </div>
  </div>;
}

// ─── AFYA BRAND ───────────────────────────────────────────────────────────────
const A = {
  mg: "#CE0058", az: "#0057B8", dark: "#1A2141", cinza: "#EEEEEE",
  branco: "#FFFFFF", navy: "#1A2141",
  mgLt: "#FFF0F5", mgMd: "#F0ADC8",
  azLt: "#EEF4FF", azMd: "#B8CFED",
  navyLt: "#F0F2F8",
};

// ─── METHODOLOGY ──────────────────────────────────────────────────────────────
const M = {
  fase1: {
    id:"fase1", label:"Fase 1", title:"Validação do Problema",
    color:A.mg, bg:A.mgLt, border:A.mgMd,
    etapas:[
      { id:"e0", num:"00", title:"Desk Research & Contextualização", dur:"2–3 sem", isNew:true,
        desc:"Pesquisa secundária antes de ir a campo. Mapeie o mercado, analise concorrentes e benchmarks, identifique gaps que orientarão a pesquisa primária.",
        subs:["Escopo e objetivos da pesquisa","Fontes secundárias (relatórios, artigos, dados públicos)","Análise competitiva e benchmarking","Mapeamento do ecossistema e contexto regulatório","Síntese em insights e identificação de gaps","Decomposição em níveis do problema (raso → profundo)","Matriz CSD preliminar — Certezas, Suposições, Dúvidas"],
        evs:[{id:"e0_1",l:"Relatório de Desk Research"},{id:"e0_2",l:"Análise competitiva com benchmarks"},{id:"e0_3",l:"Mapa do ecossistema"},{id:"e0_4",l:"Matriz CSD inicial"},{id:"e0_5",l:"Lista de gaps e hipóteses"}],
        mats:[{l:"🎓 Afya — Aula 5: Product Discovery (Parte 1)",t:"afya"},{l:"🎓 Afya — Aula 6: Product Discovery (Parte 2)",t:"afya"},{l:"🎓 Afya — Aula 1: Transformação Digital",t:"afya"},{l:"📄 Tudo sobre Validação — Afya"},{l:"📄 O Problema — Material Afya"},{l:"📄 20 Reasons Startups Fail — CB Insights"}], crits:[] },
      { id:"e1", num:"01", title:"Identificação do Problema", dur:"4 sem",
        desc:"Identificar o problema específico. Formular hipóteses e organizar o que já se sabe vs. o que precisa ser investigado.",
        subs:["Qual é o problema exato? Contexto e magnitude","Como os clientes lidam com isso hoje?","Barreiras estruturais para resolver","Decomposição do problema — da superfície ao raiz","TAM/SAM/SOM do mercado afetado","Análise de alternativas existentes"],
        evs:[{id:"e1_1",l:"PDE — Etapa 1 (hipóteses e benchmarking)"},{id:"e1_2",l:"Lean Canvas — Problema e Alternativas"},{id:"e1_3",l:"Matriz CSD atualizada"}],
        mats:[{l:"🎓 Afya — Aula 5: Identificação e Decomposição",t:"afya"},{l:"🎓 Afya — Template Roteiro de Entrevistas",t:"afya"},{l:"📄 O Problema — Material Afya"},{l:"📄 Lista de Yoda — Astella Investimentos"}], crits:[] },
      { id:"e2", num:"02", title:"Identificação do Segmento de Clientes", dur:"4 sem",
        desc:"Quem são as pessoas com esse problema? Identifique early adopters, crie personas e mapeie comportamentos.",
        subs:["Perfil demográfico, psicográfico e comportamental","Identificação e priorização de early adopters","Workarounds atuais dos clientes","Personas baseadas em dados reais","Mapa de empatia","Jornada do usuário","Job To Be Done"],
        evs:[{id:"e2_1",l:"PDE — Etapa 2 (personas e mapa de empatia)"},{id:"e2_2",l:"Lean Canvas — Segmento e Early Adopters"},{id:"e2_3",l:"Canvas Proposta de Valor — Perfil do Cliente"},{id:"e2_4",l:"Mapa de Jornada do Usuário inicial"}],
        mats:[{l:"🎓 Afya — Aula 7: UX Research (Paola Sales)",t:"afya"},{l:"🎓 Afya — Aula 8: Jornada do Usuário (Paola Sales)",t:"afya"},{l:"📄 ICP — Afya"},{l:"📄 Guia sobre Personas — Afya"},{l:"📄 Job-To-Be-Done — Afya"}], crits:[] },
      { id:"e3", num:"03", title:"Validação do Problema com Usuários", dur:"6 sem", banca:true,
        desc:"Pesquisa primária com usuários reais. Métodos qualitativos e quantitativos. Nunca apresente a solução — o objetivo é aprender.",
        subs:["Definição de objetivo e método","Entrevistas contextuais, cliente oculto, user intercepts","Roteiro com perguntas abertas e empáticas","Mínimo 20 entrevistas do segmento-alvo","10 boas práticas de entrevistas (Afya/Paola Sales)","Análise de padrões qualitativos","Síntese: frequência, intensidade, disposição a pagar"],
        evs:[{id:"e3_1",l:"PDE — Etapa 3 (relatório e padrões)"},{id:"e3_2",l:"Relatório de Entrevistas (mín. 20)"},{id:"e3_3",l:"Quadro de Validação (perseverar/pivotar)"},{id:"e3_4",l:"Lean Canvas — Problema e Segmento atualizados"},{id:"e3_5",l:"Canvas Proposta de Valor — Dores e Ganhos"},{id:"e3_6",l:"Mapa de Jornada do Usuário completo"}],
        mats:[{l:"🎓 Afya — Aula 7: UX Research",t:"afya"},{l:"🎓 Afya — Aula 8: Jornada do Usuário",t:"afya"},{l:"🎓 Afya — Template Roteiro de Entrevistas",t:"afya"},{l:"📄 Pain Points — Afya"},{l:"📄 Proposta de Valor — Afya"}],
        crits:["Early adopters identificados com hábitos documentados","Ao menos 1 problema must-have validado com 20+ entrevistas","Nível de dor: must-have / nice-to-have / don't need","Como clientes resolvem o problema atualmente","SAM estimado com premissas documentadas","Jornada mapeada com pontos de dor evidenciados"] },
    ]
  },
  fase2: {
    id:"fase2", label:"Fase 2", title:"Validação da Solução",
    color:A.az, bg:A.azLt, border:A.azMd,
    etapas:[
      { id:"e4", num:"04", title:"Ideação", dur:"6 sem",
        desc:"Transformar o aprendizado da Fase 1 em hipóteses de solução. Use a Opportunity Solution Tree.",
        subs:["Brainstorming e sessões de co-criação","Opportunity Solution Tree","Proposta de Valor Única (UVP)","Diferencial competitivo (Unfair Advantage)","Hipótese de modelo de negócios"],
        evs:[{id:"e4_1",l:"PDE — Etapa 4 (proposta de valor e conceito)"},{id:"e4_2",l:"Lean Canvas — Solução, UVP, Competência Essencial"},{id:"e4_3",l:"Canvas Proposta de Valor — Mapa de Valor"},{id:"e4_4",l:"Opportunity Solution Tree (Miro)"}],
        mats:[{l:"🎓 Afya — Aula 6: Product Discovery 2",t:"afya"},{l:"🎓 Afya — Aula 3: Product Management — Estratégia",t:"afya"},{l:"📄 Modelo de Negócio — Afya"},{l:"📄 Startup Playbook — Afya"}], crits:[] },
      { id:"e5", num:"05", title:"Prototipação / MVP", dur:"12 sem",
        desc:"Do protótipo de baixa fidelidade ao MVP funcional. UX, UI, acessibilidade e UX Writing desde o início.",
        subs:["Protótipos de baixa vs. alta fidelidade","UX Design: fluxos e wireframes","UI Design: interfaces de sucesso","Acessibilidade digital desde o início","UX Writing: microcopy centrado no usuário","Funcionalidades essenciais da UVP (evitar feature creep)"],
        evs:[{id:"e5_1",l:"PDE — Etapa 5 (funcionalidades e tecnologias)"},{id:"e5_2",l:"Protótipo / MVP (Figma ou MVP funcional)"},{id:"e5_3",l:"Lean Canvas atualizado"}],
        mats:[{l:"🎓 Afya — Aula 9: Interfaces de Sucesso 1",t:"afya"},{l:"🎓 Afya — Aula 10: Interfaces de Sucesso 2",t:"afya"},{l:"🎓 Afya — Aula 11: Acessibilidade Digital",t:"afya"},{l:"🎓 Afya — Aula 12: UX Writing",t:"afya"},{l:"🎓 Afya — Prototipação (Guilhermo Reis)",t:"afya"},{l:"📄 MVP — Afya"}], crits:[] },
      { id:"e6", num:"06", title:"Validação da Solução", dur:"8 sem", banca:true,
        desc:"Alcançar Product-Market Fit. Validar que a solução resolve o problema e que clientes desejam pagar.",
        subs:["Teste de usabilidade: moderado e não-moderado","Critérios de PMF: uso, pagamento, retenção","Métricas: taxa de sucesso, erros, tempo","Testes A/B","Iteração baseada em evidências","RICE Score para priorização"],
        evs:[{id:"e6_1",l:"PDE — Etapa 6 (evidências de PMF)"},{id:"e6_2",l:"Protótipo Validado com resultados de usabilidade"},{id:"e6_3",l:"Quadro de Validação (hipóteses e decisões)"},{id:"e6_4",l:"Relatório de Entrevistas de Solução"},{id:"e6_5",l:"Lean Canvas atualizado"}],
        mats:[{l:"🎓 Afya — Aula 13: Teste de Usabilidade",t:"afya"},{l:"🎓 Afya — Aula 4: Product Management",t:"afya"},{l:"📄 Jornada de Compra — Afya"}],
        crits:["Proposta de valor testada com clientes reais","Preço que os clientes estão dispostos a pagar determinado","Viabilidade de negócio sustentável avaliada","Modelo de receita validado (ao menos 1 transação ou pré-venda)","Teste de usabilidade com métricas documentadas"] },
    ]
  },
  fase3: {
    id:"fase3", label:"Fase 3", title:"Planejamento e Business Case",
    color:A.navy, bg:A.navyLt, border:"#C5CAE0",
    etapas:[
      { id:"e7", num:"07", title:"Aspectos Legais e Formalização", dur:"6 sem",
        desc:"Registrar marca, formalizar estrutura jurídica, equity e vesting.", subs:[],
        evs:[{id:"e7_1",l:"PDE — Etapa 7 (estrutura jurídica e PI)"},{id:"e7_2",l:"Contrato Social (CNPJ ativo)"},{id:"e7_3",l:"Certificado de Marca — INPI"},{id:"e7_4",l:"Relatório de Cargos e Funções"},{id:"e7_5",l:"Canvas Jornada de Compras"}],
        mats:[], crits:[] },
      { id:"e8", num:"08", title:"Acesso ao Mercado", dur:"8 sem",
        desc:"Máquina de vendas e marketing. RICE Score para priorização de canais. Go-to-market.", subs:[],
        evs:[{id:"e8_1",l:"PDE — Etapa 8 (go-to-market e RICE Score)"},{id:"e8_2",l:"Canvas Jornada de Compras finalizado"},{id:"e8_3",l:"Lean Canvas — Canais e Métricas"}],
        mats:[{l:"📄 Processo de Venda — Afya"},{l:"📄 Branding — Afya"},{l:"📄 Naming — Afya"}], crits:[] },
      { id:"e9", num:"09", title:"Modelagem Econômico-Financeira", dur:"8 sem",
        desc:"TAM/SAM/SOM, DRE, Fluxo de Caixa, Valuation e North Star Metric.", subs:[],
        evs:[{id:"e9_1",l:"PDE — Etapa 9 (memorando com premissas)"},{id:"e9_2",l:"Modelagem Financeira (TAM/SAM/SOM, DRE, FC, Valuation)"},{id:"e9_3",l:"North Star Metric com Árvore de Métricas"},{id:"e9_4",l:"OKRs do próximo trimestre"},{id:"e9_5",l:"Lean Canvas — Custos e Receita"}],
        mats:[{l:"📄 OpenView SaaS Benchmarks"},{l:"📄 Fundraising — Valuation e Diluição Afya"},{l:"📄 16 Counterintuitive Fundraising Lessons"}], crits:[] },
      { id:"e10", num:"10", title:"Business Case e Preparação para Investimento", dur:"8 sem", banca:true,
        desc:"Business Case completo seguindo roteiro Afya — 7 seções obrigatórias. Pitch validado com banca simulada.",
        subs:[
          "1. Sumário Executivo (1–2 páginas): origem, oportunidade, solução, planos de investimento",
          "2. Apresentação da Equipe: pessoas-chave, mini-currículo, dedicação, estrutura organizacional",
          "3. Apresentação do Mercado: TAM/SAM/SOM, cadeia de valor, concorrentes, diferencial competitivo, estratégia de entrada",
          "4. Apresentação da Solução: proposta de valor, tecnologia, TRL, technology roadmap",
          "5. Modelagem Econômico-Financeira: premissas, estimativas de receita, CAPEX, OPEX, DRE e Fluxo de Caixa",
          "6. Investimento: como será aplicado, resultados esperados nos 24 meses, tipo (equity/SAFE/subvenção), valuation pré-money",
          "7. Desinvestimento: potenciais compradores, evidências da tese, horizonte de exit",
        ],
        evs:[{id:"e10_1",l:"PDE — Etapa 10 (Business Case completo — 7 seções)"},{id:"e10_2",l:"Business Case (15–30 páginas)"},{id:"e10_3",l:"Lean Canvas Final (todos os 9 blocos)"},{id:"e10_4",l:"Modelagem Financeira completa"},{id:"e10_5",l:"Resumo Executivo (2 páginas)"},{id:"e10_6",l:"Pitch Deck (10–15 slides + vídeo)"},{id:"e10_7",l:"Press Release / FAQ"}],
        mats:[{l:"📄 Modelo Business Case — Afya"},{l:"📄 Roteiro Fundepar (referência)"},{l:"📄 Fundraising — Valuation e Diluição Afya"}],
        crits:["Business Case completo com todas as 7 seções","Modelagem financeira revisada com premissas documentadas","Pitch validado com mentores e banca simulada","Resumo Executivo e Pitch Deck prontos","Exit Strategy com potenciais compradores identificados"] },
    ]
  }
};

const ALL_ETAPAS = Object.values(M).flatMap(f => f.etapas);

const OPS = [
  {id:"op1",nome:"SEBRAE Inova",tipo:"Edital",prazo:"2026-06-30",status:"Aberto",desc:"Apoio a startups em fase inicial"},
  {id:"op2",nome:"Google for Startups",tipo:"Programa",prazo:"2026-07-15",status:"Aberto",desc:"Aceleração com créditos em nuvem"},
  {id:"op3",nome:"Inovação Aberta Afya",tipo:"Inovação Aberta",prazo:"2026-05-31",status:"Aberto",desc:"Programa interno Afya"},
  {id:"op4",nome:"Fundepar — Subvenção",tipo:"Fomento",prazo:"2026-08-01",status:"Em breve",desc:"Subvenção para tech em saúde"},
];

const STATUS_LIST = ["Em andamento","Travado","Em risco","Pronto para avançar","Aguardando banca","Concluído"];
const SC = {
  "Em andamento":{bg:A.azLt,text:"#1A3F80",dot:A.az},
  "Travado":{bg:A.mgLt,text:"#8B0035",dot:A.mg},
  "Em risco":{bg:"#FFFBEB",text:"#92400E",dot:"#F59E0B"},
  "Pronto para avançar":{bg:"#F0FAF4",text:"#166534",dot:"#22C55E"},
  "Aguardando banca":{bg:"#F5F3FF",text:"#5B21B6",dot:"#8B5CF6"},
  "Concluído":{bg:"#F0F9FF",text:"#0C4A6E",dot:"#0EA5E9"},
};

const INIT = [
  {id:"p_001",nome:"An\u00e1lise de anamnese m\u00e9dica com IA",responsavel:"Alex Fabiano Silva",telefone:"+55 38 99818-3505",email:"rayza.resende@afya.com.br",unidade:"Afya Montes Claros (MG)",equipe:"Alex Fabiano Silva",mentor:"Marcela",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:30,problema:"Software que transcreve voz e estrutura anamneses m\u00e9dicas usando LLMs. SaaS B2C.",dataEntrada:"2025-01-01",obs:"Desk Research feito. Pitch realizado.",prox:"Ampliar vis\u00e3o para outros p\u00fablicos al\u00e9m do m\u00e9dico.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_002",nome:"APP AVALIA S\u00caNIOR",responsavel:"Vit\u00f3ria Santa Br\u00edgida Silva",telefone:"+55 91 99924-9987",email:"rayza.resende@afya.com.br",unidade:"Afya Abaetetuba (PA)",equipe:"Vit\u00f3ria Santa Br\u00edgida Silva",mentor:"A definir",fase:"fase2",etapaAtual:"e4",status:"Travado",mat:35,problema:"App off-line para rastreio de s\u00edndromes geri\u00e1tricas em \u00e1reas sem internet. Relat\u00f3rios em PDF. Aplicativo B2G.",dataEntrada:"2025-01-01",obs:"Testaram em postos e casas de idosos. Sem mentor definido.",prox:"Retomar contato. Fup 17/11 pendente.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_003",nome:"EducaEnfe",responsavel:"Gabrielle Tatiane Silva Almeida",telefone:"+55 32 98508-8686",email:"rayza.resende@afya.com.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Gabrielle Tatiane Silva Almeida",mentor:"R\u00ea",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:28,problema:"Plataforma educacional para estudantes de enfermagem: simulados, gr\u00e1ficos, materiais pr\u00e1ticos. Aplicativo B2C.",dataEntrada:"2025-01-01",obs:"Desk Research feito. Pitch feito. Refer\u00eancia: R\u00f4mulo Passos.",prox:"Avan\u00e7ar na valida\u00e7\u00e3o com usu\u00e1rios.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_004",nome:"e-Gestante \u2014 Caderneta Online",responsavel:"Roberta de Sousa Gon\u00e7alves",telefone:"+55 61 98328-7483",email:"rayza.resende@afya.com.br",unidade:"Afya Pato Branco (PR)",equipe:"Roberta de Sousa Gon\u00e7alves",mentor:"Belle",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:32,problema:"Vers\u00e3o digital da caderneta da gestante com integra\u00e7\u00e3o ao e-SUS, lembretes e QR Code. Aplicativo B2G.",dataEntrada:"2025-01-01",obs:"Desk Research feito. Pitch feito.",prox:"Comparar com prontu\u00e1rio do SUS.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_005",nome:"EmoMap",responsavel:"Debora dos Santos Camargo",telefone:"+55 46 99931-8167",email:"rayza.resende@afya.com.br",unidade:"Afya Pato Branco (PR)",equipe:"Debora dos Santos Camargo",mentor:"Belle",fase:"fase2",etapaAtual:"e4",status:"Em andamento",mat:45,problema:"App de autogest\u00e3o emocional para acad\u00eamicos, com conex\u00e3o a profissionais e grupos terap\u00eauticos. Aplicativo B2B.",dataEntrada:"2025-01-01",obs:"Equipe com +18 meses de experi\u00eancia. Fup 17/11 feito.",prox:"Agendar Mentoria 2 \u2014 valida\u00e7\u00e3o com usu\u00e1rios avan\u00e7ada.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_006",nome:"Espermicida de eugenia brejoensis",responsavel:"Maria Fernanda Alves do Nascimento",telefone:"+55 87 98133-0904",email:"rayza.resende@afya.com.br",unidade:"Afya Garanhuns (PE)",equipe:"Maria Fernanda Alves do Nascimento",mentor:"A definir",fase:"fase2",etapaAtual:"e4",status:"Em andamento",mat:40,problema:"Gel contraceptivo \u00e0 base de \u00f3leo essencial natural, alternativa aos sint\u00e9ticos atuais. Produto Tecnol\u00f3gico B2B.",dataEntrada:"2025-01-01",obs:"MVP em valida\u00e7\u00e3o. Aguardando defini\u00e7\u00e3o de mentor.",prox:"Definir mentor de pesquisa urgente.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_007",nome:"GuidedBrand",responsavel:"Samuel Assis Lara",telefone:"+55 32 99972-3275",email:"rayza.resende@afya.com.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Samuel Assis Lara",mentor:"A definir",fase:"fase1",etapaAtual:"e1",status:"Travado",mat:15,problema:"Plataforma para ajudar pequenos neg\u00f3cios a constru\u00edrem sua marca via StoryBrand e IA. Aplicativo B2B.",dataEntrada:"2025-01-01",obs:"Passaram no Instituto TIM. Desist\u00eancia no processo atual.",prox:"Reengajar equipe \u2014 desist\u00eancia registrada no processo.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_008",nome:"HealthCloud",responsavel:"Ana Laura da Concei\u00e7\u00e3o Silva",telefone:"+55 32 99987-1008",email:"rayza.resende@afya.com.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Ana Laura da Concei\u00e7\u00e3o Silva",mentor:"A definir",fase:"fase1",etapaAtual:"e1",status:"Travado",mat:10,problema:"Plataforma para unificar informa\u00e7\u00f5es m\u00e9dicas e facilitar comunica\u00e7\u00e3o m\u00e9dico-fam\u00edlia. Aplicativo B2C.",dataEntrada:"2025-01-01",obs:"Desist\u00eancia no processo.",prox:"Tentativa de reengajamento necess\u00e1ria.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_009",nome:"HealthConnect",responsavel:"Gabriel M\u00e2nica Malfatti",telefone:"+55 49 99201-2264",email:"rayza.resende@afya.com.br",unidade:"Afya Pato Branco (PR)",equipe:"Gabriel M\u00e2nica Malfatti",mentor:"Michele",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:30,problema:"Plataforma de comunica\u00e7\u00e3o integrada com smartwatch e dashboards em hospitais. Hardware + Software B2B.",dataEntrada:"2025-01-01",obs:"Ideia surgiu no Ideathon. Desk Research feito. Pitch feito.",prox:"Avan\u00e7ar para valida\u00e7\u00e3o com usu\u00e1rios.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_010",nome:"Medlink \u2014 Comunica\u00e7\u00e3o Hospitalar",responsavel:"Paulo Henrique Vogel",telefone:"+55 49 99839-5091",email:"rayza.resende@afya.com.br",unidade:"Afya Pato Branco (PR)",equipe:"Paulo Henrique Vogel",mentor:"R\u00ea",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:32,problema:"Pulseiras inteligentes para conectar equipes hospitalares com localiza\u00e7\u00e3o e prioridade. Aplicativo B2B.",dataEntrada:"2025-01-01",obs:"Desk Research feito. Pitch agendado.",prox:"Marcar mentoria Diego / Totall \u2014 memorando de entendimento.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_011",nome:"MEDTRIVIUM",responsavel:"Samantha Tamara Silva",telefone:"+55 37 99801-2280",email:"rayza.resende@afya.com.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Samantha Tamara Silva",mentor:"Marcela",fase:"fase1",etapaAtual:"e1",status:"Travado",mat:20,problema:"Plataforma digital com banco de quest\u00f5es e flashcards para medicina (b\u00e1sico e cl\u00ednico). Aplicativo B2C.",dataEntrada:"2025-01-01",obs:"Fup 17/11 no desk research. Desist\u00eancia no pitch.",prox:"Reengajar \u2014 desist\u00eancia no pitch.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_012",nome:"Microsc\u00f3pio virtual Afya",responsavel:"Esther Lu\u00edza dos Reis",telefone:"+55 32 99166-1957",email:"rayza.resende@afya.com.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Esther Lu\u00edza dos Reis",mentor:"Michele",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:33,problema:"Banco digital de l\u00e2minas histol\u00f3gicas para estudo remoto de histologia. Aplicativo B2C.",dataEntrada:"2025-01-01",obs:"Refer\u00eancia: Histology Guide. 2\u00aa mentoria agendada.",prox:"Agendada 2\u00aa mentoria. Avaliar inclus\u00e3o de Patologia.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_013",nome:"Neuroconex\u00f5es e Natureza",responsavel:"Gabriel Silva",telefone:"+55 32 99868-1779",email:"rayza.resende@afya.com.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Gabriel Silva",mentor:"Michele",fase:"fase2",etapaAtual:"e4",status:"Em andamento",mat:42,problema:"Suplemento natural com Hericium erinaceus para neuroprote\u00e7\u00e3o e sa\u00fade mental. Produto Tecnol\u00f3gico B2C.",dataEntrada:"2025-01-01",obs:"MVP em valida\u00e7\u00e3o. PI pendente.",prox:"Verificar escrit\u00f3rio de propriedade intelectual (PI).",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_014",nome:"Onde Atende",responsavel:"Mauro Vinicius Lopes Camara",telefone:"+55 38 99182-8365",email:"rayza.resende@afya.com.br",unidade:"Afya Montes Claros (MG)",equipe:"Mauro Vinicius Lopes Camara",mentor:"Marcela",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:28,problema:"Plataforma para localizar hospitais e especialistas de plant\u00e3o. Aplicativo B2C.",dataEntrada:"2025-01-01",obs:"Desk Research feito. Pitch feito.",prox:"Avan\u00e7ar para entrevistas com usu\u00e1rios.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_015",nome:"pHbot",responsavel:"Jo\u00e3o Carlos Patella Clavero Fagundez",telefone:"+55 46 99106-9195",email:"rayza.resende@afya.com.br",unidade:"Afya Pato Branco (PR)",equipe:"Jo\u00e3o Carlos Patella Clavero Fagundez",mentor:"Michele",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:30,problema:"Dispositivo para monitoramento e corre\u00e7\u00e3o autom\u00e1tica da qualidade da \u00e1gua. Hardware + Software B2B.",dataEntrada:"2025-01-01",obs:"Desk Research feito. Pitch feito.",prox:"Alinhar proposta de projeto de pesquisa com incuba\u00e7\u00e3o.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_016",nome:"Plataforma OKRs Gamificados com IA",responsavel:"Jo\u00e3o Paulo Vieira Filho",telefone:"+55 46 99935-0329",email:"rayza.resende@afya.com.br",unidade:"Afya Pato Branco (PR)",equipe:"Jo\u00e3o Paulo Vieira Filho",mentor:"Dyego",fase:"fase1",etapaAtual:"e1",status:"Travado",mat:18,problema:"Sistema corporativo de metas e engajamento com gamifica\u00e7\u00e3o e IA. Aplicativo B2B.",dataEntrada:"2025-01-01",obs:"Equipe com todas as compet\u00eancias. Desist\u00eancia no pitch.",prox:"Desist\u00eancia no pitch \u2014 tentar reengajamento.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_017",nome:"Plataforma Digital COLO",responsavel:"Maria Eduarda de Paula Barbosa",telefone:"+55 32 99978-6332",email:"dyego.cantu@unidep.edu.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Maria Eduarda de Paula Barbosa",mentor:"Belle",fase:"fase2",etapaAtual:"e4",status:"Em andamento",mat:45,problema:"App para vigil\u00e2ncia digital de gestantes de risco, alertas autom\u00e1ticos para equipes de sa\u00fade. Aplicativo B2B.",dataEntrada:"2025-01-01",obs:"Derivado de TCC \u2014 prof. Douglas. 2\u00aa mentoria agendada.",prox:"Agendada 2\u00aa mentoria. Avan\u00e7ar para valida\u00e7\u00e3o.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_018",nome:"Plataforma inser\u00e7\u00e3o profissional sa\u00fade",responsavel:"Laisa Santos Teixeira",telefone:"+55 32 99985-8631",email:"rayza.resende@afya.com.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Laisa Santos Teixeira",mentor:"Belle",fase:"fase1",etapaAtual:"e1",status:"Travado",mat:12,problema:"App que conecta profissionais de sa\u00fade a empresas: vagas, cursos e networking. Aplicativo B2B.",dataEntrada:"2025-01-01",obs:"Desist\u00eancia no processo.",prox:"Desist\u00eancia registrada \u2014 verificar interesse em retorno.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_019",nome:"Portal Unificado de Exames QR",responsavel:"Adriano Uncini",telefone:"+55 46 98813-3759",email:"rayza.resende@afya.com.br",unidade:"Afya Pato Branco (PR)",equipe:"Adriano Uncini",mentor:"Michele",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:30,problema:"Plataforma unificada de exames com QR Code para solicita\u00e7\u00e3o, agendamento e resultados. SaaS B2B.",dataEntrada:"2025-01-01",obs:"Desk Research feito. Pitch feito.",prox:"Refer\u00eancia: NAV DASA. Avan\u00e7ar para valida\u00e7\u00e3o.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_020",nome:"Pulseira diagn\u00f3stico de infarto",responsavel:"Emanuel Nicolas Dias Pereira",telefone:"+55 31 99843-8036",email:"pedro.baptista@afya.com.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Emanuel Nicolas Dias Pereira",mentor:"R\u00ea",fase:"fase2",etapaAtual:"e4",status:"Travado",mat:35,problema:"Pulseira inteligente para diagn\u00f3stico precoce de infarto. Produto Tecnol\u00f3gico B2G.",dataEntrada:"2025-01-01",obs:"Fup 17/11 pendente. Mentor n\u00e3o confirmado.",prox:"Fup 17/11 pendente. Retomar contato urgente.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_021",nome:"Salva S\u00eanior",responsavel:"Alanna Cristina Gobbi",telefone:"+55 46 99974-7764",email:"rayza.resende@afya.com.br",unidade:"Afya Pato Branco (PR)",equipe:"Alanna Cristina Gobbi",mentor:"R\u00ea",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:32,problema:"Rel\u00f3gio inteligente para idosos: emerg\u00eancia, GPS, IA por voz e dados m\u00e9dicos pr\u00e9-cadastrados. Hardware + Software B2C.",dataEntrada:"2025-01-01",obs:"Ganhadores do Ideathon. Desk Research feito.",prox:"Pitch agendado. Avan\u00e7ar para valida\u00e7\u00e3o com usu\u00e1rios.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_022",nome:"SAMU Connect",responsavel:"Jana\u00edna",telefone:"+55 54 99966-0026",email:"pedro.baptista@afya.com.br",unidade:"Afya Pato Branco (PR)",equipe:"Jana\u00edna",mentor:"Marcela",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:28,problema:"App para wearables para idosos acionarem o SAMU com mais agilidade. Aplicativo B2G.",dataEntrada:"2025-01-01",obs:"Desk Research feito. Pitch feito.",prox:"Avan\u00e7ar para valida\u00e7\u00e3o com usu\u00e1rios.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_023",nome:"SemioHealth",responsavel:"Anderson Gon\u00e7alves dos Santos J\u00fanior",telefone:"+55 22 99998-6263",email:"rayza.resende@afya.com.br",unidade:"Afya Itaperuna (RJ)",equipe:"Anderson Gon\u00e7alves dos Santos J\u00fanior",mentor:"R\u00ea",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:30,problema:"App que treina estudantes de medicina em anamnese por simula\u00e7\u00f5es com feedback imediato. Aplicativo B2B.",dataEntrada:"2025-01-01",obs:"Ideia surgiu em aula. Pitch agendado.",prox:"Pitch agendado. Refer\u00eancia: Cardiopapers.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_024",nome:"Sistema de triagem Manchester",responsavel:"Mateus Costa Guimar\u00e3es",telefone:"+55 38 98817-8623",email:"rayza.resende@afya.com.br",unidade:"Afya Montes Claros (MG)",equipe:"Mateus Costa Guimar\u00e3es",mentor:"A definir",fase:"fase2",etapaAtual:"e4",status:"Travado",mat:25,problema:"Algoritmo baseado no Protocolo de Manchester para triagem automatizada em emerg\u00eancias. Aplicativo B2B.",dataEntrada:"2025-01-01",obs:"Pensar nos ganhos com a solu\u00e7\u00e3o. Desist\u00eancia.",prox:"Reengajar equipe \u2014 desist\u00eancia no processo.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_025",nome:"Sorriso Inteligente \u2014 Escova com IA",responsavel:"Ana Julia Nogueira",telefone:"+55 32 99903-5690",email:"rayza.resende@afya.com.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Ana Julia Nogueira",mentor:"Belle",fase:"fase2",etapaAtual:"e4",status:"Em andamento",mat:48,problema:"Escova infantil com IA e sensores para monitorar escova\u00e7\u00e3o, com feedback l\u00fadico e app para pais. Hardware + Software B2B.",dataEntrada:"2025-01-01",obs:"Participaram do Catalisa e Instituto TIM.",prox:"Pitch agendado. Avan\u00e7ar para desenvolvimento do MVP.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
  {id:"p_026",nome:"V\u00ednculo Ativo",responsavel:"Giovanna Egg Sousa Resende",telefone:"+55 32 99984-5975",email:"dyego.cantu@unidep.edu.br",unidade:"Afya S\u00e3o Jo\u00e3o Del Rei (MG)",equipe:"Giovanna Egg Sousa Resende",mentor:"Marcela",fase:"fase1",etapaAtual:"e1",status:"Em andamento",mat:28,problema:"Canal de humaniza\u00e7\u00e3o em UTIs pedi\u00e1tricas/neonatais para comunica\u00e7\u00e3o fam\u00edlia-equipe m\u00e9dica. Aplicativo B2C.",dataEntrada:"2025-01-01",obs:"Desk Research feito. Pitch agendado.",prox:"Pitch agendado. Avan\u00e7ar para valida\u00e7\u00e3o.",links:[],ev:{},ops:[],ments:[],hist:[{d:"2025-01-01",s:"Importado",o:"Importado do Laboratório de Ideias 2025"}],ciclo:"preincubacao_2025"},
];

// ─── ATOMS ────────────────────────────────────────────────────────────────────
function Badge({status,sm}){
  const c=SC[status]||{bg:"#F3F4F6",text:"#374151",dot:"#9CA3AF"};
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,background:c.bg,color:c.text,padding:sm?"2px 8px":"4px 11px",borderRadius:20,fontSize:sm?10:11,fontWeight:700,whiteSpace:"nowrap",letterSpacing:"0.02em"}}>
    <span style={{width:6,height:6,borderRadius:"50%",background:c.dot,flexShrink:0}}/>
    {status}
  </span>;
}
function Bar({val,col}){
  return <div style={{display:"flex",alignItems:"center",gap:8}}>
    <div style={{flex:1,height:4,borderRadius:2,background:"#E5E7EB",overflow:"hidden"}}>
      <div style={{width:`${val}%`,height:"100%",background:col||A.mg,borderRadius:2,transition:"width 0.5s ease"}}/>
    </div>
    <span style={{fontSize:11,fontWeight:700,color:"#374151",minWidth:28}}>{val}%</span>
  </div>;
}
function Modal({open,onClose,title,children,wide}){
  if(!open)return null;
  return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(10,15,30,0.65)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:16,width:"100%",maxWidth:wide?720:560,maxHeight:"92vh",overflow:"auto",boxShadow:"0 32px 80px rgba(0,0,0,0.3)"}}>
      <div style={{padding:"18px 24px",borderBottom:`2px solid ${A.mg}`,display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"#fff",zIndex:1}}>
        <span style={{fontSize:16,fontWeight:800,color:A.dark}}>{title}</span>
        <button onClick={onClose} style={{border:"none",background:"none",cursor:"pointer",fontSize:22,color:"#9CA3AF",lineHeight:1,padding:"0 4px"}}>×</button>
      </div>
      <div style={{padding:24}}>{children}</div>
    </div>
  </div>;
}
function Inp({label,value,onChange,type="text",placeholder,half}){
  return <div style={{marginBottom:12,width:half?"calc(50% - 6px)":"100%"}}>
    <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{label}</label>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",color:A.dark}}
      onFocus={e=>e.target.style.borderColor=A.mg} onBlur={e=>e.target.style.borderColor="#E5E7EB"}/>
  </div>;
}
function Txta({label,value,onChange,rows=3,placeholder}){
  return <div style={{marginBottom:12}}>
    <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{label}</label>
    <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows} placeholder={placeholder}
      style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",color:A.dark}}
      onFocus={e=>e.target.style.borderColor=A.mg} onBlur={e=>e.target.style.borderColor="#E5E7EB"}/>
  </div>;
}
function Sel({label,value,onChange,options}){
  return <div style={{marginBottom:12}}>
    <label style={{display:"block",fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:4}}>{label}</label>
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{width:"100%",padding:"9px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:13,fontFamily:"inherit",outline:"none",background:"#fff",color:A.dark}}>
      {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
    </select>
  </div>;
}

// ─── CICLOS ────────────────────────────────────────────────────────────────────
const CICLOS = [
  {v:"todos",             l:"Todos os Ciclos",          cor:"#6B7280",bg:"#F3F4F6"},
  {v:"preincubacao_2025", l:"Pré-Incubação 2025",       cor:"#92400E",bg:"#FEF3C7"},
  {v:"incubacao_2026",    l:"Incubação 2026",            cor:"#1A3F80",bg:"#EEF4FF"},
  {v:"preincubacao_2026", l:"Pré-Incubação 2026",       cor:"#CE0058",bg:"#FFF0F5"},
];
const cicloLabel = c => CICLOS.find(x=>x.v===c)?.l || c;
const cicloStyle = c => {
  const x = CICLOS.find(z=>z.v===c) || CICLOS[0];
  return {background:x.bg,color:x.cor,border:`1px solid ${x.cor}55`,padding:"2px 9px",borderRadius:10,fontSize:10,fontWeight:800,whiteSpace:"nowrap"};
};

// ─── EXPORT HELPERS ───────────────────────────────────────────────────────────
function exportPDF(projects){
  const rows = projects.map(p=>{
    const fase = M[p.fase];
    const etapa = ALL_ETAPAS.find(e=>e.id===p.etapaAtual);
    return `
      <tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:10px 12px;font-weight:700;color:#1A2141">${p.nome}</td>
        <td style="padding:10px 12px;color:#CE0058;font-weight:600">${fase?.label||""}</td>
        <td style="padding:10px 12px;color:#374151">${etapa?`${etapa.num} — ${etapa.title}`:""}</td>
        <td style="padding:10px 12px;color:#374151">${p.status}</td>
        <td style="padding:10px 12px">
          <div style="background:#E5E7EB;border-radius:2px;height:6px;width:80px">
            <div style="background:${fase?.color};height:100%;border-radius:2px;width:${p.maturidade}%"></div>
          </div>
          <span style="font-size:11px;color:#374151">${p.maturidade}%</span>
        </td>
        <td style="padding:10px 12px;color:#374151">${p.unidade}</td>
        <td style="padding:10px 12px;color:#374151">${p.responsavel}</td>
        <td style="padding:10px 12px;color:#0057B8">${p.email||""}</td>
        <td style="padding:10px 12px;color:#374151">${p.telefone||""}</td>
        <td style="padding:10px 12px;color:#374151">${p.mentor||""}</td>
        <td style="padding:10px 12px;color:#374151;max-width:200px">${(p.proximosPassos||"").slice(0,80)}</td>
      </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body{font-family:Arial,sans-serif;color:#333;margin:0;padding:24px}
  @media print{body{padding:0}@page{margin:20mm;size:A3 landscape}}
  .header{background:#CE0058;color:#fff;padding:20px 24px;border-radius:8px;margin-bottom:24px}
  .header h1{margin:0 0 4px;font-size:22px}
  .header p{margin:0;font-size:13px;opacity:0.85}
  table{width:100%;border-collapse:collapse;font-size:12px}
  thead tr{background:#CE0058;color:#fff}
  thead th{padding:10px 12px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap}
  tbody tr:hover{background:#FFF0F5}
  .footer{margin-top:24px;font-size:11px;color:#9CA3AF;text-align:right}
</style>
</head><body>
<div class="header">
  <h1>Afya Inovação — Programa de Pré-Incubação</h1>
  <p>Relatório de Projetos · Gerado em ${new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"})}</p>
</div>
<table>
  <thead><tr>
    <th>Projeto</th><th>Fase</th><th>Etapa Atual</th><th>Status</th><th>Maturidade</th>
    <th>Unidade</th><th>Responsável</th><th>E-mail</th><th>Telefone</th><th>Mentor</th><th>Próximos Passos</th>
  </tr></thead>
  <tbody>${rows}</tbody>
</table>
<div class="footer">Afya Inovação · Confidencial · Uso interno</div>
</body></html>`;

  const w = window.open("","_blank","width=1200,height=800");
  w.document.write(html);
  w.document.close();
  setTimeout(()=>w.print(),500);
}

function exportExcel(projects){
  const headers = ["Projeto","Ciclo","Fase","Etapa Atual","Status","Maturidade (%)","Unidade","Responsável","E-mail","Telefone","Mentor","Problema Central","Observações","Próximos Passos","Data de Entrada"];
  const rows = projects.map(p=>{
    const fase = M[p.fase];
    const etapa = ALL_ETAPAS.find(e=>e.id===p.etapaAtual);
    return [
      p.nome, cicloLabel(p.ciclo||"preincubacao_2026"), fase?.label||"", etapa?`${etapa.num} - ${etapa.title}`:"",
      p.status, p.maturidade, p.unidade, p.responsavel,
      p.email||"", p.telefone||"", p.mentor||"",
      p.problema||"", p.observacoes||"", p.proximosPassos||"", p.dataEntrada||""
    ];
  });

  const escape = v => {
    const s = String(v==null?"":v);
    if(s.includes(",")||s.includes("\n")||s.includes('"')) return `"${s.replace(/"/g,'""')}"`;
    return s;
  };

  const csv = [headers, ...rows].map(r=>r.map(escape).join(",")).join("\r\n");
  const BOM = "\uFEFF";
  const blob = new Blob([BOM+csv],{type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Afya_Preincubacao_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── NEW PROJECT MODAL ────────────────────────────────────────────────────────
function NewProjectModal({open,onClose,onSave}){
  const blank = {nome:"",equipe:"",unidade:"",responsavel:"",email:"",telefone:"",mentor:"",
    fase:"fase1",etapaAtual:"e0",status:"Em andamento",mat:0,problema:"",
    dataEntrada:new Date().toISOString().split("T")[0],obs:"",prox:"",ciclo:"preincubacao_2026",
    links:[],ev:{},ops:[],ments:[],hist:[],ciclo:"preincubacao_2026"};
  const[f,setF]=useState(blank);
  const s=k=>v=>setF(p=>({...p,[k]:v}));
  const fOpts=Object.values(M).map(f=>({value:f.id,label:f.title}));
  const eOpts=M[f.fase]?.etapas.map(e=>({value:e.id,label:`${e.num} — ${e.title}`}))||[];
  return <Modal open={open} onClose={onClose} title="Adicionar Novo Projeto" wide>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <div style={{gridColumn:"1/-1"}}><Inp label="Nome do Projeto *" value={f.nome} onChange={s("nome")} placeholder="Ex.: HealthTrack"/></div>
      <Inp label="Unidade / Origem" value={f.unidade} onChange={s("unidade")} placeholder="Ex.: Afya Educacional"/>
      <Inp label="Equipe / Integrantes" value={f.equipe} onChange={s("equipe")} placeholder="Ex.: João Silva, Maria Costa"/>
      <Inp label="Responsável Principal" value={f.responsavel} onChange={s("responsavel")} placeholder="Nome completo"/>
      <Inp label="E-mail do Responsável" value={f.email} onChange={s("email")} type="email" placeholder="email@afya.com.br"/>
      <Inp label="Telefone / WhatsApp" value={f.telefone} onChange={s("telefone")} placeholder="(11) 99999-9999"/>
      <Inp label="Mentor Responsável" value={f.mentor} onChange={s("mentor")} placeholder="Se já definido"/>
      <div style={{gridColumn:"1/-1"}}><Txta label="Problema Central" value={f.problema} onChange={s("problema")} rows={2} placeholder="Descreva o problema que o projeto endereça"/></div>
      <Sel label="Fase Inicial" value={f.fase} onChange={v=>{s("fase")(v);s("etapaAtual")(M[v].etapas[0].id);}} options={fOpts}/>
      <Sel label="Etapa Inicial" value={f.etapaAtual} onChange={s("etapaAtual")} options={eOpts}/>
      <Sel label="Status" value={f.status} onChange={s("status")} options={STATUS_LIST}/>
      <Inp label="Data de Entrada" value={f.dataEntrada} onChange={s("dataEntrada")} type="date"/>
      <div style={{gridColumn:"1/-1"}}>
        <Sel label="Ciclo / Turma" value={f.ciclo||"preincubacao_2026"} onChange={s("ciclo")} options={[
          {value:"preincubacao_2025",label:"Pré-Incubação 2025 (Lab. de Ideias)"},
          {value:"incubacao_2026",label:"Incubação 2026 (continuidade 2025)"},
          {value:"preincubacao_2026",label:"Pré-Incubação 2026 (novo ciclo)"},
        ]}/>
      </div>
    </div>
    <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8}}>
      <button onClick={onClose} style={{padding:"9px 18px",border:"1.5px solid #E5E7EB",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#374151"}}>Cancelar</button>
      <button onClick={()=>{if(!f.nome)return;onSave({...f,id:"p"+Date.now()});onClose();setF(blank);}}
        style={{padding:"9px 22px",border:"none",borderRadius:8,background:A.mg,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800}}>
        Adicionar Projeto
      </button>
    </div>
  </Modal>;
}

// ─── PROJECT DETAIL ───────────────────────────────────────────────────────────
function ProjectDetail({project,onBack,onUpdate}){
  const[ae,setAe]=useState(null);
  const[edit,setEdit]=useState(false);
  const[form,setForm]=useState({...project});
  const[newLink,setNewLink]=useState({label:"",url:""});
  const[showLink,setShowLink]=useState(false);
  const s=k=>v=>setForm(p=>({...p,[k]:v}));
  const fase=M[form.fase];

  const fprog=fid=>{
    const et=M[fid].etapas;
    const tot=et.reduce((a,e)=>a+e.evs.length,0);
    if(!tot)return 0;
    const done=et.reduce((a,e)=>a+e.evs.filter(ev=>(form.entregaveisStatus||{})[ev.id]).length,0);
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

  return <div style={{maxWidth:960,margin:"0 auto",paddingBottom:56}}>
    <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",color:"#6B7280",fontSize:13,padding:"16px 0",fontFamily:"inherit"}}>
      ← Voltar para lista
    </button>

    {/* Header card */}
    <div style={{background:"#fff",borderRadius:16,border:`1.5px solid ${fase.border}`,padding:"24px 28px",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,flexWrap:"wrap"}}>
            <span style={{fontSize:10,background:fase.bg,color:fase.color,border:`1px solid ${fase.border}`,padding:"2px 9px",borderRadius:10,fontWeight:800}}>{fase.label}</span>
            {form.ciclo&&<span style={cicloStyle(form.ciclo)}>{cicloLabel(form.ciclo)}</span>}
            <Badge status={form.status}/>
          </div>
          <h2 style={{fontSize:24,fontWeight:800,color:A.dark,margin:"0 0 3px"}}>{form.nome}</h2>
          <p style={{fontSize:13,color:"#6B7280",margin:0}}>{form.unidade} · Entrada: {form.dataEntrada}</p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <select value={form.status} onChange={e=>updateStatus(e.target.value)}
            style={{fontSize:11,padding:"5px 8px",border:"1.5px solid #E5E7EB",borderRadius:8,background:"#F9FAFB",cursor:"pointer",color:"#374151"}}>
            {STATUS_LIST.map(s=><option key={s}>{s}</option>)}
          </select>
          <button onClick={()=>exportPDF([form])} style={{padding:"7px 14px",background:A.az,border:"none",borderRadius:8,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700}}>
            📄 PDF
          </button>
        </div>
      </div>

      {/* Contato */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14,marginTop:18,paddingTop:16,borderTop:"1px solid #F3F4F6"}}>
        {[["Responsável",form.responsavel],["E-mail",form.email||"—"],["Telefone",form.telefone||"—"],["Mentor",form.mentor||"Não definido"],["Equipe",form.equipe]].map(([k,v])=>(
          <div key={k}>
            <div style={{fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3}}>{k}</div>
            <div style={{fontSize:12,color:k==="E-mail"?A.az:A.dark,fontWeight:500,wordBreak:"break-all"}}>{v}</div>
          </div>
        ))}
      </div>

      {/* Progresso */}
      <div style={{marginTop:18}}>
        <div style={{fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8}}>Maturidade por Fase</div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          {Object.values(M).map(f=>(
            <div key={f.id} style={{flex:1,minWidth:140}}>
              <div style={{fontSize:11,color:f.color,fontWeight:700,marginBottom:4}}>{f.label}</div>
              <Bar val={fprog(f.id)} col={f.color}/>
            </div>
          ))}
        </div>
      </div>

      {/* Problema */}
      <div style={{marginTop:16,padding:"10px 14px",background:A.mgLt,borderRadius:9,borderLeft:`3px solid ${A.mg}`}}>
        <div style={{fontSize:10,fontWeight:700,color:A.mg,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3}}>Problema Central</div>
        <p style={{fontSize:13,color:A.dark,margin:0,lineHeight:1.6}}>{form.problema}</p>
      </div>
    </div>

    {/* Obs & Próximos Passos */}
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:15,fontWeight:800,color:A.dark}}>Observações & Próximos Passos</span>
        <button onClick={()=>edit?(onUpdate(form),setEdit(false)):setEdit(true)}
          style={{border:`1.5px solid ${edit?A.mg:"#E5E7EB"}`,background:edit?A.mg:"#fff",color:edit?"#fff":"#374151",padding:"5px 14px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700}}>
          {edit?"Salvar":"Editar"}</button>
      </div>
      {edit
        ?<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12}}>
            <Inp label="E-mail" value={form.email||""} onChange={s("email")} type="email"/>
            <Inp label="Telefone" value={form.telefone||""} onChange={s("telefone")}/>
            <Inp label="Unidade" value={form.unidade||""} onChange={s("unidade")}/>
          </div>
          <Sel label="Ciclo / Turma" value={form.ciclo||"preincubacao_2026"} onChange={s("ciclo")} options={[
            {value:"preincubacao_2025",label:"Pré-Incubação 2025 (Lab. de Ideias)"},
            {value:"incubacao_2026",label:"Incubação 2026 (continuidade 2025)"},
            {value:"preincubacao_2026",label:"Pré-Incubação 2026 (novo ciclo)"},
          ]}/>
          <Txta label="Observações" value={form.observacoes} onChange={s("observacoes")} rows={3}/>
          <Txta label="Próximos Passos" value={form.proximosPassos} onChange={s("proximosPassos")} rows={2}/></>
        :<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {[["Observações",form.observacoes],["Próximos Passos",form.proximosPassos]].map(([l,v])=>(
            <div key={l}>
              <div style={{fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>{l}</div>
              <p style={{fontSize:13,color:"#374151",margin:0,lineHeight:1.6}}>{v||"—"}</p>
            </div>
          ))}
        </div>}
    </div>

    {/* Jornada Metodológica */}
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px",marginBottom:14}}>
      <h3 style={{fontSize:16,fontWeight:800,color:A.dark,margin:"0 0 18px"}}>Jornada Metodológica — 10 Etapas</h3>
      {Object.values(M).map(fase=>(
        <div key={fase.id} style={{marginBottom:22}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"8px 14px",background:fase.bg,borderRadius:10,border:`1px solid ${fase.border}`}}>
            <span style={{background:fase.color,color:"#fff",fontSize:10,fontWeight:800,padding:"2px 9px",borderRadius:12}}>{fase.label}</span>
            <span style={{fontSize:13,fontWeight:800,color:fase.color}}>{fase.title}</span>
          </div>
          {fase.etapas.map(etapa=>{
            const tot=etapa.evs.length;
            const done=etapa.evs.filter(ev=>(form.entregaveisStatus||{})[ev.id]).length;
            const isCur=form.etapaAtual===etapa.id;
            const isOpen=ae===etapa.id;
            return <div key={etapa.id} style={{marginBottom:7,borderRadius:10,border:`1.5px solid ${isCur?fase.color:"#E5E7EB"}`,overflow:"hidden",background:isCur?fase.bg:"#FAFAFA"}}>
              <button onClick={()=>setAe(isOpen?null:etapa.id)}
                style={{width:"100%",padding:"11px 16px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,color:fase.color,fontWeight:800}}>{etapa.num}</span>
                  <span style={{fontSize:13,fontWeight:700,color:A.dark}}>{etapa.title}</span>
                  {isCur&&<span style={{fontSize:9,background:fase.color,color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:800}}>ATUAL</span>}
                  {etapa.isNew&&<span style={{fontSize:9,background:"#7C3AED",color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:800}}>NOVO</span>}
                  {etapa.banca&&<span style={{fontSize:9,background:"#F59E0B",color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:800}}>🏛 BANCA</span>}
                  {etapa.mats?.some(m=>m.t==="afya")&&<span style={{fontSize:9,background:A.mg,color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:800}}>AFYA</span>}
                  <span style={{fontSize:10,color:fase.color,fontWeight:700}}>{etapa.dur}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:40,height:4,background:"#E5E7EB",borderRadius:2,overflow:"hidden"}}>
                      <div style={{width:tot?`${(done/tot)*100}%`:"0%",height:"100%",background:fase.color,borderRadius:2}}/>
                    </div>
                    <span style={{fontSize:11,color:"#6B7280"}}>{done}/{tot}</span>
                  </div>
                  <span style={{fontSize:13,color:"#9CA3AF"}}>{isOpen?"▲":"▼"}</span>
                </div>
              </button>
              {isOpen&&<div style={{padding:"0 16px 18px",borderTop:`1px solid ${isCur?fase.border:"#E5E7EB"}`}}>
                <p style={{fontSize:12,color:"#6B7280",lineHeight:1.7,margin:"12px 0 14px"}}>{etapa.desc}</p>
                {etapa.subs?.length>0&&<div style={{marginBottom:14,padding:"10px 14px",background:"#F8F8F8",borderRadius:8,borderLeft:`3px solid ${fase.color}`}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Temas desta Etapa</div>
                  <div style={{display:"grid",gridTemplateColumns:etapa.id==="e10"?"1fr":"1fr 1fr",gap:"4px 12px"}}>
                    {etapa.subs.map((t,i)=><div key={i} style={{fontSize:12,color:"#374151",display:"flex",gap:6}}><span style={{color:fase.color,fontWeight:800,flexShrink:0}}>·</span><span>{t}</span></div>)}
                  </div>
                </div>}
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Entregáveis</div>
                  {etapa.evs.map(ev=>(
                    <label key={ev.id} style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",marginBottom:7,padding:"6px 8px",borderRadius:6,background:(form.entregaveisStatus||{})[ev.id]?"#F0FAF4":"transparent"}}>
                      <input type="checkbox" checked={!!(form.entregaveisStatus||{})[ev.id]} onChange={()=>toggleEv(ev.id)}
                        style={{marginTop:2,accentColor:fase.color,width:14,height:14,flexShrink:0}}/>
                      <span style={{fontSize:12,color:(form.entregaveisStatus||{})[ev.id]?"#9CA3AF":"#374151",textDecoration:(form.entregaveisStatus||{})[ev.id]?"line-through":"none",lineHeight:1.5}}>{ev.l}</span>
                    </label>
                  ))}
                </div>
                {etapa.crits?.length>0&&<div style={{marginBottom:14,padding:"12px 14px",background:"#FFFBEB",borderRadius:8,border:"1px solid #FDE68A"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#92400E",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>✅ Critérios de Avanço / Banca</div>
                  {etapa.crits.map((c,i)=><div key={i} style={{fontSize:12,color:"#92400E",marginBottom:4,display:"flex",gap:8}}><span style={{flexShrink:0}}>→</span><span>{c}</span></div>)}
                </div>}
                {etapa.mats?.length>0&&<div>
                  <div style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Materiais de Apoio</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {etapa.mats.map((m,i)=>(
                      <span key={i} style={{fontSize:11,padding:"4px 10px",borderRadius:12,fontWeight:600,background:m.t==="afya"?A.mgLt:A.azLt,color:m.t==="afya"?A.mg:A.az,border:`1px solid ${m.t==="afya"?A.mgMd:A.azMd}`,cursor:"default"}}>{m.l}</span>
                    ))}
                  </div>
                </div>}
              </div>}
            </div>;
          })}
        </div>
      ))}
    </div>

    {/* Links */}
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px",marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:15,fontWeight:800,color:A.dark}}>Links & Documentos</span>
        <button onClick={()=>setShowLink(!showLink)} style={{border:`1.5px solid ${A.mg}`,background:A.mg,color:"#fff",padding:"5px 13px",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700}}>+ Adicionar</button>
      </div>
      {showLink&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:8,marginBottom:12,alignItems:"flex-end"}}>
        {["Nome","URL"].map((lbl,idx)=>(
          <div key={lbl}>
            <label style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.06em",display:"block",marginBottom:4}}>{lbl}</label>
            <input value={idx===0?newLink.label:newLink.url} onChange={e=>setNewLink(l=>idx===0?{...l,label:e.target.value}:{...l,url:e.target.value})}
              placeholder={idx===0?"Ex.: Business Case v1":"https://..."}
              style={{width:"100%",padding:"8px 10px",border:"1.5px solid #E5E7EB",borderRadius:7,fontSize:12,boxSizing:"border-box"}}/>
          </div>
        ))}
        <button onClick={addLink} style={{padding:"8px 14px",background:"#22C55E",border:"none",borderRadius:7,color:"#fff",cursor:"pointer",fontSize:14,fontWeight:800}}>✓</button>
      </div>}
      {(form.linksDocs||[]).length===0
        ?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>Nenhum link adicionado ainda.</p>
        :<div style={{display:"flex",flexDirection:"column",gap:6}}>
          {(form.linksDocs||[]).map(l=>(
            <div key={l.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"#F9FAFB",borderRadius:8}}>
              <a href={l.url} target="_blank" rel="noreferrer" style={{fontSize:13,color:A.az,textDecoration:"none",fontWeight:600}}>🔗 {l.label}</a>
              <button onClick={()=>{const u={...form,linksDocs:(form.linksDocs||[]).filter(x=>x.id!==l.id)};setForm(u);onUpdate(u);}} style={{border:"none",background:"none",cursor:"pointer",color:"#EF4444",fontSize:16}}>×</button>
            </div>
          ))}
        </div>}
    </div>

    {/* Histórico */}
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px"}}>
      <h3 style={{fontSize:15,fontWeight:800,color:A.dark,margin:"0 0 14px"}}>Histórico de Evolução</h3>
      {(form.historicoStatus||[]).length===0
        ?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>Sem registros.</p>
        :<div style={{position:"relative",paddingLeft:24}}>
          <div style={{position:"absolute",left:8,top:0,bottom:0,width:2,background:A.mgMd}}/>
          {[...(form.historicoStatus||[])].reverse().map((h,i)=>(
            <div key={i} style={{position:"relative",marginBottom:12,paddingLeft:18}}>
              <div style={{position:"absolute",left:-14,top:4,width:8,height:8,borderRadius:"50%",background:A.mg}}/>
              <div style={{fontSize:11,color:"#9CA3AF"}}>{h.data}</div>
              <div style={{fontSize:13,fontWeight:700,color:A.dark}}>{h.status}</div>
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
      <div><h2 style={{fontSize:22,fontWeight:800,color:A.dark,margin:0}}>Mentorias</h2><p style={{fontSize:13,color:"#6B7280",margin:"4px 0 0"}}>Registro de todas as mentorias do programa</p></div>
      <button onClick={()=>setShowM(true)} style={{padding:"10px 18px",background:A.mg,border:"none",borderRadius:10,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800}}>+ Registrar Mentoria</button>
    </div>
    {semM.length>0&&<div style={{background:A.mgLt,border:`1.5px solid ${A.mgMd}`,borderRadius:12,padding:"14px 18px",marginBottom:20}}>
      <div style={{fontSize:12,fontWeight:800,color:A.mg,marginBottom:6}}>⚠ Projetos sem mentoria há mais de 21 dias</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{semM.map(p=><span key={p.id} style={{fontSize:12,background:A.mgMd,color:A.mg,padding:"2px 10px",borderRadius:10,fontWeight:700}}>{p.nome}</span>)}</div>
    </div>}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:24}}>
      {projects.map(p=>{
        const ms=[...(p.mentorias||[])].sort((a,b)=>b.data.localeCompare(a.data));
        return <div key={p.id} style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px"}}>
          <div style={{fontSize:15,fontWeight:800,color:A.dark,marginBottom:2}}>{p.nome}</div>
          <div style={{fontSize:11,color:"#6B7280",marginBottom:4}}>{p.unidade}</div>
          <div style={{fontSize:12,color:"#6B7280",marginBottom:4}}>Responsável: <strong>{p.responsavel}</strong></div>
          {p.email&&<div style={{fontSize:11,color:A.az,marginBottom:8}}>✉ {p.email}</div>}
          <div style={{fontSize:12,color:"#6B7280",marginBottom:12}}>Mentor: {p.mentor||"Não definido"}</div>
          {ms.length===0?<p style={{fontSize:12,color:A.mg,fontWeight:700,margin:0}}>Nenhuma mentoria registrada</p>:
            ms.slice(0,2).map(m=><div key={m.id} style={{padding:"8px 10px",background:"#F9FAFB",borderRadius:8,marginBottom:6}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:11,fontWeight:700,color:"#374151"}}>{m.data}</span>
                <span style={{fontSize:10,background:m.presenca==="Presente"?"#D1FAE5":"#FEE2E2",color:m.presenca==="Presente"?"#065F46":"#991B1B",padding:"1px 7px",borderRadius:10,fontWeight:800}}>{m.presenca}</span>
              </div>
              {m.direcionamentos&&<p style={{fontSize:12,color:"#6B7280",margin:0,lineHeight:1.4}}>{m.direcionamentos.slice(0,80)}{m.direcionamentos.length>80?"…":""}</p>}
            </div>)}
          <div style={{fontSize:11,color:"#9CA3AF",marginTop:5}}>{ms.length} mentoria(s)</div>
        </div>;
      })}
    </div>
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 24px"}}>
      <h3 style={{fontSize:15,fontWeight:800,color:A.dark,margin:"0 0 14px"}}>Histórico Geral</h3>
      {allM.length===0?<p style={{fontSize:13,color:"#9CA3AF"}}>Nenhuma mentoria registrada.</p>:
        <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"2px solid #F3F4F6"}}>
            {["Projeto","Mentor","Data","Presença","Direcionamentos","Pendências"].map(h=>(
              <th key={h} style={{textAlign:"left",padding:"6px 10px",fontSize:10,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{allM.map((m,i)=>(
            <tr key={m.id} style={{borderBottom:"1px solid #F9FAFB",background:i%2===0?"#fff":"#FAFAFA"}}>
              <td style={{padding:"8px 10px",fontWeight:700,color:A.dark}}>{m.projetoNome}</td>
              <td style={{padding:"8px 10px",color:"#374151"}}>{m.mentor}</td>
              <td style={{padding:"8px 10px",color:"#374151"}}>{m.data}</td>
              <td style={{padding:"8px 10px"}}><span style={{fontSize:10,background:m.presenca==="Presente"?"#D1FAE5":"#FEE2E2",color:m.presenca==="Presente"?"#065F46":"#991B1B",padding:"2px 8px",borderRadius:10,fontWeight:800}}>{m.presenca}</span></td>
              <td style={{padding:"8px 10px",color:"#6B7280",maxWidth:180}}>{(m.direcionamentos||"").slice(0,60)}{(m.direcionamentos||"").length>60?"…":""}</td>
              <td style={{padding:"8px 10px",color:m.pendencias?A.mg:"#9CA3AF",fontWeight:m.pendencias?700:400}}>{m.pendencias||"—"}</td>
            </tr>
          ))}</tbody>
        </table>
        </div>}
    </div>
    <Modal open={showM} onClose={()=>setShowM(false)} title="Registrar Mentoria">
      <Sel label="Projeto" value={f.projetoId} onChange={s("projetoId")} options={projects.map(p=>({value:p.id,label:`${p.nome} (${p.unidade})`}))}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><Inp label="Mentor" value={f.mentor} onChange={s("mentor")} placeholder="Nome"/><Inp label="Data" type="date" value={f.data} onChange={s("data")}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><Sel label="Frequência" value={f.frequencia} onChange={s("frequencia")} options={["Semanal","Quinzenal","Mensal","Pontual"]}/><Sel label="Presença" value={f.presenca} onChange={s("presenca")} options={["Presente","Ausente","Parcial"]}/></div>
      <Txta label="Principais Direcionamentos" value={f.direcionamentos} onChange={s("direcionamentos")} rows={2} placeholder="O que foi discutido…"/>
      <Txta label="Pendências" value={f.pendencias} onChange={s("pendencias")} rows={2} placeholder="O que ficou pendente…"/>
      <Txta label="Próximos Passos" value={f.proximosPassos} onChange={s("proximosPassos")} rows={2} placeholder="Ações definidas…"/>
      <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
        <button onClick={()=>setShowM(false)} style={{padding:"9px 18px",border:"1.5px solid #E5E7EB",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#374151"}}>Cancelar</button>
        <button onClick={save} style={{padding:"9px 20px",border:"none",borderRadius:8,background:A.mg,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800}}>Salvar</button>
      </div>
    </Modal>
  </div>;
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardTab({projects,onViewProject,onAddProject,cicloFiltro,onCicloChange}){
  const proj = cicloFiltro&&cicloFiltro!=="todos" ? projects.filter(p=>p.ciclo===cicloFiltro) : projects;
  const byS=st=>proj.filter(p=>p.status===st).length;
  const byF=f=>proj.filter(p=>p.fase===f).length;
  const avgM=proj.length?Math.round(proj.reduce((a,p)=>a+(p.mat||p.maturidade||0),0)/proj.length):0;
  const attention=proj.filter(p=>["Travado","Em risco"].includes(p.status));
  const ready=proj.filter(p=>["Pronto para avançar","Aguardando banca"].includes(p.status));
  const semMentor=proj.filter(p=>!p.mentor||p.mentor==="Não definido").length;

  return <div>
    {/* ── Filtro de Ciclo ───────────────────────────────────────────────── */}
    <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
      {CICLOS.map(c=>(
        <button key={c.v} onClick={()=>onCicloChange(c.v)}
          style={{padding:"7px 16px",border:`2px solid ${cicloFiltro===c.v?c.cor:"#E5E7EB"}`,borderRadius:22,
            background:cicloFiltro===c.v?c.bg:"#fff",color:cicloFiltro===c.v?c.cor:"#6B7280",
            cursor:"pointer",fontSize:12,fontWeight:cicloFiltro===c.v?800:500,transition:"all .15s",
            boxShadow:cicloFiltro===c.v?`0 0 0 3px ${c.cor}22`:"none"}}>
          {c.l}
          <span style={{marginLeft:6,fontSize:11,background:"rgba(0,0,0,.06)",padding:"1px 6px",borderRadius:8}}>
            {c.v==="todos"?projects.length:projects.filter(p=>p.ciclo===c.v).length}
          </span>
        </button>
      ))}
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div>
        <h2 style={{fontSize:22,fontWeight:800,color:A.dark,margin:0}}>Dashboard do Programa</h2>
        {cicloFiltro&&cicloFiltro!=="todos"
          ?<p style={{fontSize:13,margin:"4px 0 0",color:CICLOS.find(c=>c.v===cicloFiltro)?.cor,fontWeight:700}}>● {cicloLabel(cicloFiltro)}</p>
          :<p style={{fontSize:13,color:"#6B7280",margin:"4px 0 0"}}>Todos os ciclos · {projects.length} projetos</p>
        }
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>exportExcel(projects)} style={{padding:"9px 16px",background:A.az,border:"none",borderRadius:9,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
          📊 Exportar Excel
        </button>
        <button onClick={()=>exportPDF(projects)} style={{padding:"9px 16px",background:"#374151",border:"none",borderRadius:9,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
          📄 Exportar PDF
        </button>
        <button onClick={onAddProject} style={{padding:"9px 16px",background:A.mg,border:"none",borderRadius:9,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700}}>
          + Novo Projeto
        </button>
      </div>
    </div>

    {/* KPIs */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,marginBottom:22}}>
      {[["◈","Total",proj.length,A.dark],["▶","Em Andamento",byS("Em andamento"),A.az],["⚠","Travados",byS("Travado"),A.mg],["✅","Prontos",byS("Pronto para avançar"),"#059669"],["📈","Maturidade Média",`${avgM}%`,"#7C3AED"],["🧑","Sem Mentor",semMentor,byS("Travado")>0?"#E57A00":A.dark]].map(([icon,label,val,col])=>(
        <div key={label} style={{background:"#fff",borderRadius:12,border:"1.5px solid #E5E7EB",padding:"14px 16px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
          <div style={{fontSize:18,marginBottom:6}}>{icon}</div>
          <div style={{fontSize:24,fontWeight:800,color:col}}>{val}</div>
          <div style={{fontSize:11,color:"#6B7280",marginTop:2}}>{label}</div>
        </div>
      ))}
    </div>

    {/* Distribuição + Rotina */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:18}}>
      <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px"}}>
        <h3 style={{fontSize:15,fontWeight:800,color:A.dark,margin:"0 0 14px"}}>Projetos por Fase</h3>
        {Object.values(M).map(f=>(
          <div key={f.id} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:12,color:f.color,fontWeight:700}}>{f.label} — {f.title}</span>
              <span style={{fontSize:12,fontWeight:800,color:A.dark}}>{byF(f.id)}</span>
            </div>
            <div style={{height:6,background:"#F3F4F6",borderRadius:3,overflow:"hidden"}}>
              <div style={{width:proj.length?`${(byF(f.id)/proj.length)*100}%`:"0%",height:"100%",background:f.color,borderRadius:3}}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px"}}>
        <h3 style={{fontSize:15,fontWeight:800,color:A.dark,margin:"0 0 14px"}}>Rotina de Acompanhamento</h3>
        {[["Projetos sem mentor",semMentor,semMentor>0,A.mg],["Projetos travados",byS("Travado"),byS("Travado")>0,"#F59E0B"],["Aguardando banca",byS("Aguardando banca"),false,"#8B5CF6"],["Sem nenhuma mentoria",projects.filter(p=>!(p.mentorias||[]).length).length,false,A.az]].map(([label,val,urg,col])=>(
          <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #F3F4F6"}}>
            <span style={{fontSize:12,color:urg?col:"#374151",fontWeight:urg?800:400}}>{urg?"⚠ ":""}{label}</span>
            <span style={{fontSize:15,fontWeight:800,color:urg?col:A.dark}}>{val}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Atenção + Prontos */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:18}}>
      <div style={{background:"#fff",borderRadius:14,border:`1.5px solid ${A.mgMd}`,padding:"18px 20px"}}>
        <h3 style={{fontSize:15,fontWeight:800,color:A.mg,margin:"0 0 12px"}}>🚨 Precisam de Atenção</h3>
        {attention.length===0?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>Nenhum projeto em atenção.</p>:attention.map(p=>(
          <div key={p.id} onClick={()=>onViewProject(p.id)} style={{padding:"8px 12px",background:A.mgLt,borderRadius:8,marginBottom:6,cursor:"pointer",border:`1px solid ${A.mgMd}`}}>
            <div style={{fontSize:13,fontWeight:800,color:A.dark}}>{p.nome} <span style={{fontSize:11,color:"#9CA3AF",fontWeight:400}}>· {p.unidade}</span></div>
            <div style={{fontSize:11,color:A.az}}>✉ {p.email||"—"}</div>
            <div style={{fontSize:11,color:"#6B7280"}}>{(p.proximosPassos||"").slice(0,60)}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #6EE7B7",padding:"18px 20px"}}>
        <h3 style={{fontSize:15,fontWeight:800,color:"#059669",margin:"0 0 12px"}}>✅ Prontos para Avançar / Banca</h3>
        {ready.length===0?<p style={{fontSize:13,color:"#9CA3AF",margin:0}}>Nenhum pronto no momento.</p>:ready.map(p=>(
          <div key={p.id} onClick={()=>onViewProject(p.id)} style={{padding:"8px 12px",background:"#F0FAF4",borderRadius:8,marginBottom:6,cursor:"pointer",border:"1px solid #6EE7B7"}}>
            <div style={{fontSize:13,fontWeight:800,color:A.dark}}>{p.nome}</div>
            <div style={{fontSize:11,color:A.az}}>✉ {p.email||"—"}</div>
            <Badge status={p.status} sm/>
          </div>
        ))}
      </div>
    </div>

    {/* Tabela todos */}
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px",marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <h3 style={{fontSize:15,fontWeight:800,color:A.dark,margin:0}}>Todos os Projetos</h3>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>exportExcel(projects)} style={{padding:"6px 12px",background:A.az,border:"none",borderRadius:7,color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}}>📊 Excel</button>
          <button onClick={()=>exportPDF(projects)} style={{padding:"6px 12px",background:"#374151",border:"none",borderRadius:7,color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}}>📄 PDF</button>
        </div>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"2px solid #F3F4F6"}}>
            {["Projeto","Unidade","Fase","Etapa","Status","Maturidade","Responsável","E-mail","Mentor",""].map(h=><th key={h} style={{textAlign:"left",padding:"6px 10px",fontSize:10,color:"#9CA3AF",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{h}</th>)}
          </tr></thead>
          <tbody>{proj.map((p,i)=>{
            const fase=M[p.fase];
            const etapa=ALL_ETAPAS.find(e=>e.id===p.etapaAtual);
            return <tr key={p.id} style={{borderBottom:"1px solid #F9FAFB",background:i%2===0?"#fff":"#FAFAFA",cursor:"pointer"}} onClick={()=>onViewProject(p.id)}>
              <td style={{padding:"10px 10px",fontWeight:800,color:A.dark}}>{p.nome}</td>
              <td style={{padding:"10px 10px",color:"#6B7280",fontSize:11}}>{p.unidade}</td>
              <td style={{padding:"10px 10px"}}><span style={{fontSize:10,background:fase?.bg,color:fase?.color,border:`1px solid ${fase?.border}`,padding:"2px 8px",borderRadius:10,fontWeight:800}}>{fase?.label}</span></td>
              <td style={{padding:"10px 10px",color:"#374151",maxWidth:160}}>{etapa?`${etapa.num} — ${etapa.title}`:""}</td>
              <td style={{padding:"10px 10px"}}><Badge status={p.status} sm/></td>
              <td style={{padding:"10px 10px",minWidth:100}}><Bar val={p.maturidade} col={fase?.color}/></td>
              <td style={{padding:"10px 10px",color:"#374151"}}>{p.responsavel}</td>
              <td style={{padding:"10px 10px",color:A.az,fontSize:11}}>{p.email||"—"}</td>
              <td style={{padding:"10px 10px",color:"#6B7280"}}>{p.mentor||"—"}</td>
              <td style={{padding:"10px 10px"}}><span style={{fontSize:11,color:A.az,fontWeight:800}}>Ver →</span></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>

    {/* Oportunidades */}
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"18px 20px"}}>
      <h3 style={{fontSize:15,fontWeight:800,color:A.dark,margin:"0 0 14px"}}>🌐 Oportunidades Externas & Editais</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
        {OPS.map(op=>(
          <div key={op.id} style={{padding:"12px 14px",borderRadius:10,border:"1.5px solid #E5E7EB",background:"#F9FAFB"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
              <span style={{fontSize:13,fontWeight:800,color:A.dark}}>{op.nome}</span>
              <span style={{fontSize:10,background:op.status==="Aberto"?"#D1FAE5":"#FEF3C7",color:op.status==="Aberto"?"#065F46":"#92400E",padding:"2px 8px",borderRadius:10,fontWeight:800,whiteSpace:"nowrap"}}>{op.status}</span>
            </div>
            <p style={{fontSize:11,color:"#6B7280",margin:"0 0 6px",lineHeight:1.5}}>{op.desc}</p>
            <div style={{fontSize:11}}><span style={{background:A.azLt,color:A.az,padding:"1px 7px",borderRadius:8,fontWeight:700}}>{op.tipo}</span><span style={{marginLeft:8,color:"#9CA3AF"}}>Prazo: {op.prazo}</span></div>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

// ─── PROJECTS LIST ─────────────────────────────────────────────────────────────
function ProjectsList({projects,onViewProject,onAddProject,cicloFiltro}){
  const[filter,setFilter]=useState("all");
  // Aplica primeiro o filtro de ciclo (vindo do App), depois os filtros internos
  const base = cicloFiltro && cicloFiltro!=="todos" ? projects.filter(p=>p.ciclo===cicloFiltro) : projects;
  const filtered = filter==="all" ? base : base.filter(p=>p.fase===filter||p.status===filter);
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div>
        <h2 style={{fontSize:22,fontWeight:800,color:A.dark,margin:0}}>Projetos</h2>
        {cicloFiltro&&cicloFiltro!=="todos"&&<p style={{fontSize:12,margin:"4px 0 0",color:CICLOS.find(c=>c.v===cicloFiltro)?.cor||"#6B7280",fontWeight:600}}>{cicloLabel(cicloFiltro)} · {base.length} projeto(s)</p>}
      </div>
      <button onClick={onAddProject} style={{padding:"10px 18px",background:A.mg,border:"none",borderRadius:10,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800}}>+ Novo Projeto</button>
    </div>
    <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
      {[["all","Todos"],["fase1","Fase 1"],["fase2","Fase 2"],["fase3","Fase 3"],["Travado","Travados"],["Pronto para avançar","Prontos"],["Em andamento","Ativos"]].map(([val,label])=>(
        <button key={val} onClick={()=>setFilter(val)} style={{padding:"6px 14px",border:`1.5px solid ${filter===val?A.mg:"#E5E7EB"}`,borderRadius:20,background:filter===val?A.mg:"#fff",color:filter===val?"#fff":"#374151",cursor:"pointer",fontSize:12,fontWeight:500}}>{label}</button>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(285px,1fr))",gap:16}}>
      {filtered.map(p=>{
        const fase=M[p.fase];
        const etapa=ALL_ETAPAS.find(e=>e.id===p.etapaAtual);
        return <div key={p.id} onClick={()=>onViewProject(p.id)}
          style={{background:"#fff",borderRadius:14,border:"1.5px solid #E5E7EB",padding:"20px",cursor:"pointer",transition:"box-shadow 0.2s,border-color 0.2s"}}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 4px 20px rgba(206,0,88,0.1)";e.currentTarget.style.borderColor=A.mgMd;}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="#E5E7EB";}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              <span style={{fontSize:10,background:fase?.bg,color:fase?.color,border:`1px solid ${fase?.border}`,padding:"2px 9px",borderRadius:10,fontWeight:800}}>{fase?.label}</span>
              {p.ciclo&&p.ciclo!=="preincubacao_2026"&&<span style={cicloStyle(p.ciclo)}>{cicloLabel(p.ciclo)}</span>}
            </div>
            <Badge status={p.status} sm/>
          </div>
          <h3 style={{fontSize:17,fontWeight:800,color:A.dark,margin:"0 0 2px"}}>{p.nome}</h3>
          <div style={{fontSize:11,color:"#9CA3AF",marginBottom:8}}>{p.unidade}</div>
          <p style={{fontSize:12,color:"#6B7280",margin:"0 0 10px",lineHeight:1.5}}>{(p.problema||"").slice(0,80)}{(p.problema||"").length>80?"…":""}</p>
          <div style={{fontSize:11,color:"#9CA3AF",marginBottom:6}}>Etapa: <span style={{color:"#374151",fontWeight:700}}>{etapa?`${etapa.num} — ${etapa.title}`:""}</span></div>
          <Bar val={p.maturidade} col={fase?.color}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
            <div>
              <div style={{fontSize:11,color:"#6B7280"}}>{p.responsavel}</div>
              {p.email&&<div style={{fontSize:10,color:A.az}}>{p.email}</div>}
            </div>
            <span style={{fontSize:11,color:A.mg,fontWeight:800}}>Ver →</span>
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
  const[projects,setProjects]=useState(()=>loadProjects()||INIT);
  const[viewId,setViewId]=useState(null);
  const[showNew,setShowNew]=useState(false);
  const[cicloFiltro,setCicloFiltro]=useState("todos");
  useEffect(()=>{ saveProjects(projects); },[projects]);
  const upd=u=>setProjects(ps=>ps.map(p=>p.id===u.id?u:p));
  const add=p=>setProjects(ps=>[...ps,p]);
  const view=id=>{setViewId(id);setTab("projetos");};
  const vp=projects.find(p=>p.id===viewId);
  if(!user) return <LoginScreen onLogin={u=>{saveSession(u);setUser(u);}}/>;
  const TABS=[{id:"dashboard",icon:"▦",label:"Dashboard"},{id:"projetos",icon:"◈",label:"Projetos"},{id:"mentorias",icon:"◎",label:"Mentorias"}];
  return <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700;800&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:'DM Sans',Arial,sans-serif;background:#F3F4F8;color:#1A2141}
      ::-webkit-scrollbar{width:5px;height:5px}
      ::-webkit-scrollbar-track{background:#F3F4F6}
      ::-webkit-scrollbar-thumb{background:#D1D5DB;border-radius:3px}
    `}</style>
    <div style={{display:"flex",minHeight:"100vh"}}>
      {/* Sidebar */}
      <aside style={{width:232,background:A.dark,flexShrink:0,display:"flex",flexDirection:"column",padding:"0 0 20px",position:"sticky",top:0,height:"100vh",overflow:"auto"}}>
        {/* Logo */}
        <div style={{padding:"0 0 0",background:A.mg}}>
          <div style={{padding:"20px 20px 18px"}}>
            <div style={{fontSize:9,fontWeight:800,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:2}}>Afya Inovação</div>
            <div style={{fontSize:18,fontWeight:800,color:"#fff",lineHeight:1.15}}>Pré-Incubação</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",marginTop:2}}>Sistema de Acompanhamento</div>
          </div>
          {/* degradê Afya */}
          <div style={{height:3,background:"linear-gradient(90deg,#CE0058 0%,#6B2FC9 50%,#0057B8 100%)"}}/>
        </div>
        <nav style={{padding:"16px 12px",flex:1}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>{setTab(t.id);if(t.id!=="projetos")setViewId(null);}}
              style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,marginBottom:4,background:tab===t.id?"rgba(206,0,88,0.2)":"transparent",border:`1.5px solid ${tab===t.id?A.mg:"transparent"}`,color:tab===t.id?"#fff":"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:13,fontWeight:tab===t.id?800:500,fontFamily:"inherit",textAlign:"left",transition:"all 0.15s"}}>
              <span style={{fontSize:15}}>{t.icon}</span>{t.label}
              {t.id==="projetos"&&<span style={{marginLeft:"auto",fontSize:11,background:"rgba(255,255,255,0.1)",padding:"1px 8px",borderRadius:10}}>{cicloFiltro&&cicloFiltro!=="todos"?projects.filter(p=>p.ciclo===cicloFiltro).length:projects.length}</span>}
            </button>
          ))}
          <div style={{marginTop:22,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.1)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:10,paddingLeft:4}}>Fases</div>
            {Object.values(M).map(f=>(
              <div key={f.id} style={{display:"flex",justifyContent:"space-between",padding:"5px 8px",fontSize:12,color:"rgba(255,255,255,0.4)"}}>
                <span>{f.label}</span>
                <span style={{color:f.color,fontWeight:800}}>{(cicloFiltro&&cicloFiltro!=="todos"?projects.filter(p=>p.ciclo===cicloFiltro):projects).filter(p=>p.fase===f.id).length}</span>
              </div>
            ))}
            {/* Ciclos summary */}
            <div style={{marginTop:12,paddingTop:10,borderTop:"1px solid rgba(255,255,255,.08)"}}>
              <div style={{fontSize:10,color:"rgba(255,255,255,.3)",textTransform:"uppercase",letterSpacing:".1em",fontWeight:700,marginBottom:8,paddingLeft:4}}>Ciclos</div>
              {CICLOS.filter(c=>c.v!=="todos").map(c=>(
                <button key={c.v} onClick={()=>setCicloFiltro(c.v)}
                  style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 8px",borderRadius:7,marginBottom:3,background:cicloFiltro===c.v?"rgba(255,255,255,.12)":"transparent",border:`1px solid ${cicloFiltro===c.v?"rgba(255,255,255,.25)":"transparent"}`,cursor:"pointer",fontFamily:"inherit"}}>
                  <span style={{fontSize:11,color:cicloFiltro===c.v?"#fff":"rgba(255,255,255,.4)",fontWeight:cicloFiltro===c.v?700:400}}>{c.l}</span>
                  <span style={{fontSize:11,color:c.cor,fontWeight:800,background:"rgba(255,255,255,.1)",padding:"1px 7px",borderRadius:8}}>{projects.filter(p=>p.ciclo===c.v).length}</span>
                </button>
              ))}
              {cicloFiltro!=="todos"&&<button onClick={()=>setCicloFiltro("todos")} style={{width:"100%",padding:"5px 8px",border:"none",background:"transparent",cursor:"pointer",color:"rgba(255,255,255,.3)",fontSize:11,textAlign:"left",fontFamily:"inherit"}}>← ver todos</button>}
            </div>
          </div>
          {/* Export buttons in sidebar */}
          <div style={{marginTop:16,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.1)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:10,paddingLeft:4}}>Exportar</div>
            <button onClick={()=>exportExcel(projects)} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"9px 12px",borderRadius:9,marginBottom:6,background:"rgba(0,87,184,0.2)",border:"1.5px solid rgba(0,87,184,0.4)",color:"rgba(184,207,237,0.9)",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>
              📊 Exportar Excel / CSV
            </button>
            <button onClick={()=>exportPDF(projects)} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"9px 12px",borderRadius:9,background:"rgba(255,255,255,0.08)",border:"1.5px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit"}}>
              📄 Exportar PDF / Imprimir
            </button>
          </div>
        </nav>
        <div style={{padding:"10px 14px",borderTop:"1px solid rgba(255,255,255,0.08)",marginBottom:8}}>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginBottom:2}}>Logado como</div>
          <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:8}}>{user.nome}</div>
          <button onClick={()=>{clearSession();setUser(null);}}
            style={{width:"100%",padding:"7px",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.13)",borderRadius:8,color:"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:11,fontFamily:"inherit",marginBottom:8}}>
            Sair
          </button>
        </div>
        <div style={{padding:"0 14px"}}>
          <button onClick={()=>setShowNew(true)}
            style={{width:"100%",padding:"11px",background:A.mg,border:"none",borderRadius:10,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:800,fontFamily:"inherit",transition:"opacity 0.15s"}}
            onMouseEnter={e=>e.target.style.opacity="0.85"} onMouseLeave={e=>e.target.style.opacity="1"}>
            + Novo Projeto
          </button>
        </div>
      </aside>
      <main style={{flex:1,padding:"28px 32px",overflow:"auto",minWidth:0}}>
        {tab==="dashboard"&&<DashboardTab projects={projects} onViewProject={view} onAddProject={()=>setShowNew(true)} cicloFiltro={cicloFiltro} onCicloChange={setCicloFiltro}/>}
        {tab==="projetos"&&(vp?<ProjectDetail project={vp} onBack={()=>setViewId(null)} onUpdate={upd}/>:<ProjectsList projects={projects} onViewProject={view} onAddProject={()=>setShowNew(true)} cicloFiltro={cicloFiltro}/>)}
        {tab==="mentorias"&&<MentoriasTab projects={projects} onUpdate={upd}/>}
      </main>
    </div>
    <NewProjectModal open={showNew} onClose={()=>setShowNew(false)} onSave={add}/>
  </>;
}
