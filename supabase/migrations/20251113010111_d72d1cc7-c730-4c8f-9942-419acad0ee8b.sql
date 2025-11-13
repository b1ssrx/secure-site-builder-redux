-- Create roadmaps table
CREATE TABLE public.roadmaps (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create roadmap_topics table (for both topics and subtopics)
CREATE TABLE public.roadmap_topics (
  id TEXT PRIMARY KEY,
  roadmap_id TEXT NOT NULL REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  parent_topic_id TEXT REFERENCES public.roadmap_topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (tracks which roadmaps/roles user selected)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap_id TEXT NOT NULL REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, roadmap_id)
);

-- Create user_progress table (tracks completed topics)
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap_id TEXT NOT NULL REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL REFERENCES public.roadmap_topics(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  points INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_id)
);

-- Enable RLS
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for roadmaps (public read)
CREATE POLICY "Roadmaps are viewable by everyone"
  ON public.roadmaps FOR SELECT
  USING (true);

-- RLS Policies for roadmap_topics (public read)
CREATE POLICY "Roadmap topics are viewable by everyone"
  ON public.roadmap_topics FOR SELECT
  USING (true);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own roles"
  ON public.user_roles FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_roadmap_topics_roadmap_id ON public.roadmap_topics(roadmap_id);
CREATE INDEX idx_roadmap_topics_parent_id ON public.roadmap_topics(parent_topic_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_roadmap_id ON public.user_progress(roadmap_id);

-- Create triggers for updated_at
CREATE TRIGGER update_roadmaps_updated_at
  BEFORE UPDATE ON public.roadmaps
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_roadmap_topics_updated_at
  BEFORE UPDATE ON public.roadmap_topics
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial roadmap data
INSERT INTO public.roadmaps (id, title, description, color) VALUES
  ('frontend', 'Frontend Development', 'Master modern web development with HTML, CSS, JavaScript and frameworks', 'from-blue-500 to-cyan-500'),
  ('backend', 'Backend Development', 'Build scalable server-side applications', 'from-green-500 to-emerald-500'),
  ('devops', 'DevOps & Cloud', 'Deploy and manage applications at scale', 'from-orange-500 to-red-500'),
  ('ai', 'Artificial Intelligence', 'Machine learning and deep learning fundamentals', 'from-purple-500 to-pink-500');

-- Insert frontend topics
INSERT INTO public.roadmap_topics (id, roadmap_id, title, description, sort_order) VALUES
  ('html', 'frontend', 'HTML Fundamentals', 'Learn the building blocks of web pages', 1),
  ('css', 'frontend', 'CSS & Styling', 'Style and layout your web pages', 2),
  ('javascript', 'frontend', 'JavaScript', 'Add interactivity to your websites', 3),
  ('react', 'frontend', 'React', 'Build dynamic user interfaces', 4),
  ('typescript', 'frontend', 'TypeScript', 'Add type safety to JavaScript', 5);

-- Insert HTML subtopics
INSERT INTO public.roadmap_topics (id, roadmap_id, parent_topic_id, title, description, sort_order) VALUES
  ('html-basics', 'frontend', 'html', 'HTML Basics', 'Tags, elements, and document structure', 1),
  ('html-semantic', 'frontend', 'html', 'Semantic HTML', 'Meaningful markup for better accessibility', 2),
  ('html-forms', 'frontend', 'html', 'Forms & Input', 'User input and form validation', 3),
  ('html-media', 'frontend', 'html', 'Media Elements', 'Images, video, and audio', 4);

-- Insert CSS subtopics
INSERT INTO public.roadmap_topics (id, roadmap_id, parent_topic_id, title, description, sort_order) VALUES
  ('css-basics', 'frontend', 'css', 'CSS Fundamentals', 'Selectors, properties, and values', 1),
  ('css-flexbox', 'frontend', 'css', 'Flexbox Layout', 'One-dimensional layouts', 2),
  ('css-grid', 'frontend', 'css', 'CSS Grid', 'Two-dimensional layouts', 3),
  ('css-responsive', 'frontend', 'css', 'Responsive Design', 'Media queries and mobile-first approach', 4),
  ('css-animations', 'frontend', 'css', 'Animations & Transitions', 'Bring your designs to life', 5);

-- Insert JavaScript subtopics
INSERT INTO public.roadmap_topics (id, roadmap_id, parent_topic_id, title, description, sort_order) VALUES
  ('js-basics', 'frontend', 'javascript', 'JavaScript Basics', 'Variables, data types, and operators', 1),
  ('js-functions', 'frontend', 'javascript', 'Functions', 'Function declarations and arrow functions', 2),
  ('js-async', 'frontend', 'javascript', 'Async Programming', 'Promises, async/await', 3),
  ('js-dom', 'frontend', 'javascript', 'DOM Manipulation', 'Interact with HTML elements', 4),
  ('js-es6', 'frontend', 'javascript', 'Modern JavaScript', 'ES6+ features and best practices', 5);

-- Insert React subtopics
INSERT INTO public.roadmap_topics (id, roadmap_id, parent_topic_id, title, description, sort_order) VALUES
  ('react-basics', 'frontend', 'react', 'React Fundamentals', 'Components, props, and JSX', 1),
  ('react-hooks', 'frontend', 'react', 'React Hooks', 'useState, useEffect, and custom hooks', 2),
  ('react-router', 'frontend', 'react', 'React Router', 'Client-side routing', 3),
  ('react-state', 'frontend', 'react', 'State Management', 'Context API and Redux', 4);

-- Insert TypeScript subtopics
INSERT INTO public.roadmap_topics (id, roadmap_id, parent_topic_id, title, description, sort_order) VALUES
  ('ts-basics', 'frontend', 'typescript', 'TypeScript Basics', 'Types, interfaces, and generics', 1),
  ('ts-advanced', 'frontend', 'typescript', 'Advanced Types', 'Utility types and type guards', 2),
  ('ts-react', 'frontend', 'typescript', 'TypeScript with React', 'Typed components and props', 3);

-- Insert backend topics
INSERT INTO public.roadmap_topics (id, roadmap_id, title, description, sort_order) VALUES
  ('intro', 'backend', 'Introduction to Backend', 'Learn the basics of server-side programming', 1),
  ('nodejs', 'backend', 'Node.js', 'JavaScript runtime for server-side development', 2),
  ('express', 'backend', 'Express.js', 'Web application framework for Node.js', 3),
  ('database', 'backend', 'Databases', 'Store and manage data', 4),
  ('auth', 'backend', 'Authentication & Authorization', 'Secure your applications', 5);

-- Insert backend subtopics
INSERT INTO public.roadmap_topics (id, roadmap_id, parent_topic_id, title, description, sort_order) VALUES
  ('backend-basics', 'backend', 'intro', 'Backend Fundamentals', 'Client-server architecture', 1),
  ('http', 'backend', 'intro', 'HTTP Protocol', 'Request/response cycle', 2),
  ('node-basics', 'backend', 'nodejs', 'Node.js Basics', 'Modules, NPM, and event loop', 1),
  ('node-async', 'backend', 'nodejs', 'Async Patterns', 'Callbacks, promises, async/await', 2),
  ('node-streams', 'backend', 'nodejs', 'Streams & Buffers', 'Handle large data efficiently', 3),
  ('express-basics', 'backend', 'express', 'Express Fundamentals', 'Routing and middleware', 1),
  ('express-rest', 'backend', 'express', 'REST APIs', 'Build RESTful endpoints', 2),
  ('express-middleware', 'backend', 'express', 'Middleware', 'Request processing pipeline', 3),
  ('sql', 'backend', 'database', 'SQL Databases', 'PostgreSQL, MySQL', 1),
  ('nosql', 'backend', 'database', 'NoSQL Databases', 'MongoDB, Redis', 2),
  ('orm', 'backend', 'database', 'ORMs', 'Prisma, TypeORM', 3),
  ('auth-jwt', 'backend', 'auth', 'JWT', 'JSON Web Tokens', 1),
  ('auth-oauth', 'backend', 'auth', 'OAuth 2.0', 'Third-party authentication', 2),
  ('auth-session', 'backend', 'auth', 'Session Management', 'User sessions and cookies', 3);

-- Insert DevOps topics
INSERT INTO public.roadmap_topics (id, roadmap_id, title, description, sort_order) VALUES
  ('docker', 'devops', 'Docker', 'Containerize your applications', 1),
  ('kubernetes', 'devops', 'Kubernetes', 'Container orchestration', 2),
  ('cicd', 'devops', 'CI/CD', 'Automate your deployment pipeline', 3);

-- Insert DevOps subtopics
INSERT INTO public.roadmap_topics (id, roadmap_id, parent_topic_id, title, description, sort_order) VALUES
  ('docker-basics', 'devops', 'docker', 'Docker Basics', 'Images and containers', 1),
  ('docker-compose', 'devops', 'docker', 'Docker Compose', 'Multi-container applications', 2),
  ('k8s-basics', 'devops', 'kubernetes', 'K8s Fundamentals', 'Pods, services, deployments', 1),
  ('k8s-advanced', 'devops', 'kubernetes', 'Advanced K8s', 'Scaling and monitoring', 2),
  ('cicd-github', 'devops', 'cicd', 'GitHub Actions', 'Automated workflows', 1),
  ('cicd-jenkins', 'devops', 'cicd', 'Jenkins', 'Build automation', 2);

-- Insert AI topics
INSERT INTO public.roadmap_topics (id, roadmap_id, title, description, sort_order) VALUES
  ('ml-basics', 'ai', 'Machine Learning Basics', 'Introduction to ML concepts', 1),
  ('deep-learning', 'ai', 'Deep Learning', 'Neural networks and advanced architectures', 2),
  ('nlp', 'ai', 'Natural Language Processing', 'Process and understand human language', 3);

-- Insert AI subtopics
INSERT INTO public.roadmap_topics (id, roadmap_id, parent_topic_id, title, description, sort_order) VALUES
  ('ml-supervised', 'ai', 'ml-basics', 'Supervised Learning', 'Classification and regression', 1),
  ('ml-unsupervised', 'ai', 'ml-basics', 'Unsupervised Learning', 'Clustering and dimensionality reduction', 2),
  ('dl-nn', 'ai', 'deep-learning', 'Neural Networks', 'Feedforward networks', 1),
  ('dl-cnn', 'ai', 'deep-learning', 'CNN', 'Convolutional neural networks', 2),
  ('dl-rnn', 'ai', 'deep-learning', 'RNN & LSTM', 'Sequence models', 3),
  ('nlp-basics', 'ai', 'nlp', 'NLP Fundamentals', 'Tokenization, embeddings', 1),
  ('nlp-transformers', 'ai', 'nlp', 'Transformers', 'BERT, GPT architectures', 2);