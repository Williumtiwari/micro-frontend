declare module 'auth/AuthContext' {
  export interface AuthContextType {
    isAuthenticated: boolean;
    logout: () => void;
  }
  export const useAuth: () => AuthContextType;
  export const AuthProvider: React.FC<{ children: React.ReactNode }>;
}

declare module 'auth/ProtectedRoute' {
  export const ProtectedRoute: React.FC<{ children: React.ReactNode }>;
}

declare module 'auth/SignIn' {
  const SignIn: React.FC;
  export default SignIn;
} 