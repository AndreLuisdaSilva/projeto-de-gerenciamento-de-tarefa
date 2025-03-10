import { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../services/ApiService"; 
import {jwtDecode} from "jwt-decode";

interface AuthContextModel {
  isAuthenticated: boolean;
  userName: string | null;
  userId: number | null;
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<string | undefined>;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
  children: React.ReactNode;
}

interface LoginResponse {
  access_token: string;
}

interface JwtPayload {
  exp: number; 
  userName?: string;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);


  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.exp * 1000 < Date.now(); 
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return true; 
    }
  };

  useEffect(() => {
      const loadStoredData = async () => {
        const token = localStorage.getItem("@projeto-fullstack:token");

        if (token && !isTokenExpired(token)) {
            try {
                const decoded: any = jwtDecode(token);
                if (decoded) {
                    setUserId(decoded.userId);
                    setUserName(decoded.userName);
                    setIsAuthenticated(true);
                } else {
                    console.error("Erro ao tentar obter userId do token");
                }
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                localStorage.removeItem("@projeto-fullstack:token");
            }
        } else {
            localStorage.removeItem("@projeto-fullstack:token");
        }
    };

    loadStoredData();
  }, []);

  const Login = useCallback(
    async (email: string, password: string): Promise<string | undefined> => {
      try {
        const response = await api.post<LoginResponse>("/auth/login", {
          email,
          password,
        });
        const { access_token } = response.data;
        
        if (access_token && !isTokenExpired(access_token)) {
            localStorage.setItem("@projeto-fullstack:token", access_token);
            const decoded: any = jwtDecode(access_token);
            if(decoded){
              setUserId(decoded.userId);
              setUserName(decoded.userName);
             } else {
              console.error("erro ao tentar obter userId do token")
            }
            setIsAuthenticated(true);
        } else {
          localStorage.removeItem("@projeto-fullstack:token"); 
        }
       
        return undefined;
      } catch (error: unknown) {
        console.error("Erro no login:", error);
        return "Erro ao realizar login. Verifique suas credenciais ou conexão.";
      }
    },
    []
  );

  const Register = useCallback(
    async (name: string, email: string, password: string): Promise<string | undefined> => {
      try {
        const response = await api.post("/auth/register", { name, email, password });
        console.log("Resposta da API:", response.data);
        return undefined;
      } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 409) {
            return "Este e-mail já está cadastrado.";
          }

          return data?.message || "Erro ao criar conta. Tente novamente.";
        }
        if(error.message){
          return error.message
        }

        console.error("Erro no registro:", error);
        return "Erro ao criar conta. Tente novamente.";
      }
    },
    []
);



  const Logout = useCallback(() => {
    localStorage.removeItem("@projeto-fullstack:token");
    setIsAuthenticated(false);
  }, []);


  return (  <AuthContext.Provider value={{ isAuthenticated, userId, userName, login: Login, logout: Logout, register: Register }}>
      {children}
    </AuthContext.Provider>
  );
};
