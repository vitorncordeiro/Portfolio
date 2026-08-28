/**
 * Vitows98 — Dados centralizados
 * Edite este arquivo para atualizar qualquer informação do portfólio.
 */
const DATA = {
  // ─── Informações pessoais ──────────────────────────────────────────────────
  name: "Vitor Natal Cordeiro",
  role: "Desenvolvedor Back-end Java | Spring Boot",
  email: "vitornc31@gmail.com",
  phone: "41 987144723",
  location: "Curitiba, PR",
  github: "https://github.com/vitorncordeiro",
  linkedin: "https://linkedin.com/in/vitor-natal-cordeiro",
  resumeUrl: "assets/documents/curriculo.pdf",

  // ─── Biografia (parágrafo curto para Sobre Mim) ───────────────────────────
  bio: [
    "Desenvolvedor Back-end Java com foco em Spring Boot e arquitetura de microsserviços.",
    "Experiência com APIs REST, RabbitMQ, Redis, Docker e ambientes em nuvem (AWS, GCP).",
    "Estagiário na Polícia Científica do Paraná, desenvolvendo sistemas para análises genéticas forenses.",
    "Graduando em Engenharia de Software pela PUC-PR."
  ],

  // ─── Experiência profissional ─────────────────────────────────────────────
  experience: [
    {
      company: "Polícia Científica do Paraná",
      role: "Desenvolvedor de Software — Estagiário",
      period: "Fev/2026 – Presente",
      highlights: [
        "Back-end Java/Spring Boot para análises genéticas forenses, aumentando eficiência de exames em 30%.",
        "Filas assíncronas com RabbitMQ, desacoplando serviços críticos do laboratório.",
        "Cobertura de ~92% com JUnit/Mockito em funcionalidades críticas.",
        "Cache com Redis (cache-aside) — tempo médio das requisições de 350ms.",
        "Geração automatizada de laudos técnicos em PDF com OpenHTMLtoPDF, reduzindo 60% do tempo manual.",
        "Integração com GCP via OpenFeign para armazenamento de documentos.",
        "Interface React.js (SPA) para consumo das APIs.",
        "Impressão direta via Sockets TCP/IP para impressoras de rede do laboratório."
      ],
      stack: ["Java", "Spring Boot", "Spring Security", "Spring Data JPA", "PostgreSQL", "RabbitMQ", "Redis", "OpenFeign", "Docker", "OpenHTMLtoPDF", "Thymeleaf", "TypeScript", "React.js", "GCP"]
    }
  ],

  // ─── Formação acadêmica ───────────────────────────────────────────────────
  education: [
    {
      degree: "Bacharelado em Engenharia de Software",
      institution: "Pontifícia Universidade Católica do Paraná (PUC-PR)",
      location: "Curitiba, PR",
      period: "Fev/2025 – Dez/2028 (previsto)"
    }
  ],

  // ─── Habilidades técnicas ─────────────────────────────────────────────────
  skills: {
    backend: ["Java 17", "Java 21", "Spring Boot", "API RESTful", "Microsserviços", "RabbitMQ", "Spring Security", "Spring Data JPA", "OpenFeign", "Maven", "Spring AI", "LLM Integration"],
    database: ["PostgreSQL", "SQL", "SQL Server", "MongoDB", "Redis"],
    testing: ["JUnit", "Mockito"],
    tools: ["Git", "GitHub", "GitLab", "IntelliJ IDEA"],
    infra: ["Docker", "Docker Compose", "Linux", "Scrum", "GCP", "AWS"],
    frontend: ["React.js", "TypeScript", "HTML", "CSS", "JavaScript"]
  },

  // ─── Wallpapers ───────────────────────────────────────────────────────────
  wallpapers: [
    { name: "Deserto",           file: "assets/wallpapers/desert.jpeg" },
    { name: "Paisagem",          file: "assets/wallpapers/landscape.jpg" },
    { name: "Paisagem Noturna",  file: "assets/wallpapers/landscape-nigh.jpg" },
    { name: "Céu",               file: "assets/wallpapers/sky.jpg" },
    { name: "Linux Kill Windows", file: "assets/wallpapers/linuxkillwindows.jpeg" }
  ],

  // ─── Projetos ─────────────────────────────────────────────────────────────
  projects: [
    {
      id: "sterna",
      name: "Sterna",
      exe: "Sterna.exe",
      icon: '<img src="./assets/icons/Earth (fixed).ico" style="width: 32px; height: 32px;">',
      github: "https://github.com/vitorncordeiro/Sterna",
      demoUrl: null, // preencher quando disponível
      description: "Sistema de consulta e recomendação de domínios com múltiplas fontes de dados e sugestões via IA.",
      problem: "Encontrar um domínio disponível é difícil: buscas tradicionais sugerem alternativas inteligentes além de outras extensões.",
      solution: "Sterna agrega WHOIS, RDAP e ICANN Zone Files para consultas rápidas e usa LLM para sugerir domínios semelhantes disponíveis.",
      stack: ["Java 21", "Spring Boot", "Spring Security", "OAuth2", "Redis", "MongoDB", "RabbitMQ", "Docker", "Spring AI", "React.js", "Playwright", "WHOIS", "RDAP", "ICANN Zone Files"],
      features: [
        "Consulta por WHOIS, RDAP e ICANN Zone Files",
        "Autenticação com Google OAuth2",
        "Cache-aside com Redis",
        "Sugestões de domínios via LLM (Spring AI)",
        "Processamento em lote + notificação por email via RabbitMQ",
        "Arquitetura orientada a eventos"
      ],
      architecture: "Sistema distribuído baseado em Spring Boot, RabbitMQ e Redis, com arquitetura orientada a eventos.",
      asciiPlaceholder: true, // ASCII da ave Sterna será fornecido
      asciiFile: null
    },
    {
      id: "dragons",
      name: "Dragons Inquiry",
      exe: "Dragons Inquiry.exe",
      icon: '<img src="./assets/icons/Minesweeper.ico" style="width: 32px; height: 32px;">',
      github: 'https://github.com/vitorncordeiro/DragonsInquiry', 
      demoUrl: null,
      description: "Jogo de aventura em CLI desenvolvido em Java puro, com narrativa em jornadas como 'A Odisseia', de Homero.",
      problem: "Projeto prático para dominar POO, lógica de programação e manipulação de I/O em Java.",
      solution: "Jogo de texto completo com sistema de save/load, trilha sonora e sistema de desafios — distribuível sem JDK.",
      stack: ["Java", "POO", "I/O"],
      features: [
        "Interface CLI completa",
        "Sistema de save/load via I/O",
        "Trilha sonora",
        "Sistema de desafios e narrativa",
        "Distribuição com JRE mínimo embutido",
        "Executa sem JDK instalado"
      ],
      highlight: "Distribuição com JRE mínimo — o jogo roda sem necessidade de JDK instalado no sistema do usuário.",
      videoUrl: null, // vídeo de gameplay a ser fornecido
      asciiPlaceholder: true,
      asciiFile: null
    },
    {
      id: "pidgeymail",
      name: "PidgeyMail",
      exe: "PidgeyMail.exe",
      icon: '<img src="./assets/icons/Internet Properties.ico" style="width: 32px; height: 32px;">',
      github: "https://github.com/vitorncordeiro/Pidgeymail",
      demoUrl: null,
      description: "Sistema distribuído de cadastro de usuários com microsserviços independentes comunicando-se via mensageria assíncrona.",
      problem: "Sistemas monolíticos acoplam responsabilidades distintas, dificultando escala e manutenção.",
      solution: "Três microsserviços independentes, cada um com seu próprio banco de dados, comunicando-se via RabbitMQ.",
      stack: ["Java 21", "Spring Boot", "Microsserviços", "RabbitMQ", "Spring Security", "Spring Data JPA", "Spring Mail", "Thymeleaf", "Docker"],
      services: [
        {
          name: "User Service",
          desc: "Cadastro de usuários — validação, persistência e publicação de eventos após registro."
        },
        {
          name: "Email Service",
          desc: "Consumidor independente para envio de e-mails de boas-vindas via SMTP."
        },
        {
          name: "Log Service",
          desc: "Consumidor independente para registro de auditoria dos eventos processados."
        }
      ],
      asciiPlaceholder: true,
      asciiFile: null
    },
    {
      id: "aladin",
      name: "Aladin",
      exe: "Aladin.exe",
      icon: '<img src="./assets/icons/Phone.ico" style="width: 32px; height: 32px;">',
      github: null, // preencher quando disponível
      demoUrl: null,
      description: "ESP32 como servidor HTTP com interface web e interpretação de comandos por voz via LLM para controle de dispositivos.",
      problem: "Automação residencial tradicional exige comandos exatos e fixos, sem flexibilidade natural de linguagem.",
      solution: "Usuário fala subjetivamente, a LLM interpreta a intenção e o ESP32 aciona o relé sem necessidade de comandos rígidos.",
      stack: ["ESP32", "C/C++", "HTTP Server", "LLM", "JavaScript", "HTML", "CSS"],
      flow: [
        "Usuário abre o microfone",
        "Fala uma frase subjetiva (ex: 'tá escuro aqui')",
        "Frase enviada para processamento",
        "LLM interpreta a intenção",
        "Backend toma a decisão",
        "ESP32 recebe o comando",
        "Relé é acionado",
        "Lâmpada liga/desliga"
      ],
      videoUrl: null, // vídeo de demonstração a ser fornecido
      asciiPlaceholder: true,
      asciiFile: null
    },
    {
      id: "jitor",
      name: "Jitor",
      exe: "Jitor.exe",
      icon: '<img src="./assets/icons/Manage your Server.ico" style="width: 32px; height: 32px;">',
      github: "https://github.com/vitorncordeiro/Jitor",
      demoUrl: null,
      description: "Servidor HTTP implementado do zero em Java puro, sem frameworks, explorando fundamentos de redes e concorrência.",
      problem: "Frameworks abstraem o funcionamento interno do HTTP — implementar do zero exige entender sockets, parsing e concorrência.",
      solution: "Servidor funcional com TCP server, parsing manual de requisições HTTP, roteamento e thread pool, coberto com testes.",
      stack: ["Java", "Sockets TCP", "Maven", "JUnit"],
      components: [
        "TCP Server (ServerSocket)",
        "HTTP Request Parser manual",
        "Roteamento interno",
        "Thread Pool fixo para concorrência",
        "Processamento de requests",
        "Respostas HTTP/1.1",
        "Servir páginas HTML"
      ],
      screenshotUrl: null, // screenshot a ser fornecido
      asciiPlaceholder: false
    }
  ]
};
