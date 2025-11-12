export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  subtopics?: RoadmapTopic[];
  resources?: string[];
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  color: string;
  topics: RoadmapTopic[];
}

export const roadmaps: Roadmap[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Master modern web development with HTML, CSS, JavaScript and frameworks",
    color: "from-blue-500 to-cyan-500",
    topics: [
      {
        id: "html",
        title: "HTML Fundamentals",
        description: "Learn the building blocks of web pages",
        subtopics: [
          { id: "html-basics", title: "HTML Basics", description: "Tags, elements, and document structure" },
          { id: "html-semantic", title: "Semantic HTML", description: "Meaningful markup for better accessibility" },
          { id: "html-forms", title: "Forms & Input", description: "User input and form validation" },
          { id: "html-media", title: "Media Elements", description: "Images, video, and audio" }
        ]
      },
      {
        id: "css",
        title: "CSS & Styling",
        description: "Style and layout your web pages",
        subtopics: [
          { id: "css-basics", title: "CSS Fundamentals", description: "Selectors, properties, and values" },
          { id: "css-flexbox", title: "Flexbox Layout", description: "One-dimensional layouts" },
          { id: "css-grid", title: "CSS Grid", description: "Two-dimensional layouts" },
          { id: "css-responsive", title: "Responsive Design", description: "Media queries and mobile-first approach" },
          { id: "css-animations", title: "Animations & Transitions", description: "Bring your designs to life" }
        ]
      },
      {
        id: "javascript",
        title: "JavaScript",
        description: "Add interactivity to your websites",
        subtopics: [
          { id: "js-basics", title: "JavaScript Basics", description: "Variables, data types, and operators" },
          { id: "js-functions", title: "Functions", description: "Function declarations and arrow functions" },
          { id: "js-async", title: "Async Programming", description: "Promises, async/await" },
          { id: "js-dom", title: "DOM Manipulation", description: "Interact with HTML elements" },
          { id: "js-es6", title: "Modern JavaScript", description: "ES6+ features and best practices" }
        ]
      },
      {
        id: "react",
        title: "React",
        description: "Build dynamic user interfaces",
        subtopics: [
          { id: "react-basics", title: "React Fundamentals", description: "Components, props, and JSX" },
          { id: "react-hooks", title: "React Hooks", description: "useState, useEffect, and custom hooks" },
          { id: "react-router", title: "React Router", description: "Client-side routing" },
          { id: "react-state", title: "State Management", description: "Context API and Redux" }
        ]
      },
      {
        id: "typescript",
        title: "TypeScript",
        description: "Add type safety to JavaScript",
        subtopics: [
          { id: "ts-basics", title: "TypeScript Basics", description: "Types, interfaces, and generics" },
          { id: "ts-advanced", title: "Advanced Types", description: "Utility types and type guards" },
          { id: "ts-react", title: "TypeScript with React", description: "Typed components and props" }
        ]
      }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Build scalable server-side applications",
    color: "from-green-500 to-emerald-500",
    topics: [
      {
        id: "intro",
        title: "Introduction to Backend",
        description: "Learn the basics of server-side programming",
        subtopics: [
          { id: "backend-basics", title: "Backend Fundamentals", description: "Client-server architecture" },
          { id: "http", title: "HTTP Protocol", description: "Request/response cycle" }
        ]
      },
      {
        id: "nodejs",
        title: "Node.js",
        description: "JavaScript runtime for server-side development",
        subtopics: [
          { id: "node-basics", title: "Node.js Basics", description: "Modules, NPM, and event loop" },
          { id: "node-async", title: "Async Patterns", description: "Callbacks, promises, async/await" },
          { id: "node-streams", title: "Streams & Buffers", description: "Handle large data efficiently" }
        ]
      },
      {
        id: "express",
        title: "Express.js",
        description: "Web application framework for Node.js",
        subtopics: [
          { id: "express-basics", title: "Express Fundamentals", description: "Routing and middleware" },
          { id: "express-rest", title: "REST APIs", description: "Build RESTful endpoints" },
          { id: "express-middleware", title: "Middleware", description: "Request processing pipeline" }
        ]
      },
      {
        id: "database",
        title: "Databases",
        description: "Store and manage data",
        subtopics: [
          { id: "sql", title: "SQL Databases", description: "PostgreSQL, MySQL" },
          { id: "nosql", title: "NoSQL Databases", description: "MongoDB, Redis" },
          { id: "orm", title: "ORMs", description: "Prisma, TypeORM" }
        ]
      },
      {
        id: "auth",
        title: "Authentication & Authorization",
        description: "Secure your applications",
        subtopics: [
          { id: "auth-jwt", title: "JWT", description: "JSON Web Tokens" },
          { id: "auth-oauth", title: "OAuth 2.0", description: "Third-party authentication" },
          { id: "auth-session", title: "Session Management", description: "User sessions and cookies" }
        ]
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Deploy and manage applications at scale",
    color: "from-orange-500 to-red-500",
    topics: [
      {
        id: "docker",
        title: "Docker",
        description: "Containerize your applications",
        subtopics: [
          { id: "docker-basics", title: "Docker Basics", description: "Images and containers" },
          { id: "docker-compose", title: "Docker Compose", description: "Multi-container applications" }
        ]
      },
      {
        id: "kubernetes",
        title: "Kubernetes",
        description: "Container orchestration",
        subtopics: [
          { id: "k8s-basics", title: "K8s Fundamentals", description: "Pods, services, deployments" },
          { id: "k8s-advanced", title: "Advanced K8s", description: "Scaling and monitoring" }
        ]
      },
      {
        id: "cicd",
        title: "CI/CD",
        description: "Automate your deployment pipeline",
        subtopics: [
          { id: "cicd-github", title: "GitHub Actions", description: "Automated workflows" },
          { id: "cicd-jenkins", title: "Jenkins", description: "Build automation" }
        ]
      }
    ]
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Machine learning and deep learning fundamentals",
    color: "from-purple-500 to-pink-500",
    topics: [
      {
        id: "ml-basics",
        title: "Machine Learning Basics",
        description: "Introduction to ML concepts",
        subtopics: [
          { id: "ml-supervised", title: "Supervised Learning", description: "Classification and regression" },
          { id: "ml-unsupervised", title: "Unsupervised Learning", description: "Clustering and dimensionality reduction" }
        ]
      },
      {
        id: "deep-learning",
        title: "Deep Learning",
        description: "Neural networks and advanced architectures",
        subtopics: [
          { id: "dl-nn", title: "Neural Networks", description: "Feedforward networks" },
          { id: "dl-cnn", title: "CNN", description: "Convolutional neural networks" },
          { id: "dl-rnn", title: "RNN & LSTM", description: "Sequence models" }
        ]
      },
      {
        id: "nlp",
        title: "Natural Language Processing",
        description: "Process and understand human language",
        subtopics: [
          { id: "nlp-basics", title: "NLP Fundamentals", description: "Tokenization, embeddings" },
          { id: "nlp-transformers", title: "Transformers", description: "BERT, GPT architectures" }
        ]
      }
    ]
  }
];
