// Mock authentication utilities
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

const STORAGE_KEY = 'step2code_session';
const USERS_KEY = 'step2code_users';

export const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const register = (email: string, password: string, username: string, fullName: string): { success: boolean; error?: string } => {
  const users = getStoredUsers();
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already registered' };
  }
  
  if (users.find(u => u.username === username)) {
    return { success: false, error: 'Username already taken' };
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    username,
    fullName,
  };

  users.push(newUser);
  saveUsers(users);

  // Store password separately (in real app, this would be hashed on server)
  const passwords = JSON.parse(localStorage.getItem('step2code_passwords') || '{}');
  passwords[email] = password;
  localStorage.setItem('step2code_passwords', JSON.stringify(passwords));

  return { success: true };
};

export const login = (identifier: string, password: string): { success: boolean; error?: string; user?: User } => {
  const users = getStoredUsers();
  const passwords = JSON.parse(localStorage.getItem('step2code_passwords') || '{}');

  const user = users.find(u => u.email === identifier || u.username === identifier);
  
  if (!user) {
    return { success: false, error: 'Invalid credentials' };
  }

  if (passwords[user.email] !== password) {
    return { success: false, error: 'Invalid credentials' };
  }

  const session: AuthSession = {
    user,
    token: `token_${Date.now()}`,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

  return { success: true, user };
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getSession = (): AuthSession | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  const session: AuthSession = JSON.parse(stored);
  
  if (session.expiresAt < Date.now()) {
    logout();
    return null;
  }

  return session;
};

export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};
