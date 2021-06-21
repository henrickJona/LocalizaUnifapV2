import React, {
    useState,
    createContext,
    useEffect,
    useContext,
    useCallback,
  } from 'react';
  import { Alert } from 'react-native';
  import Toast from 'react-native-simple-toast';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import api from '../services/api';
  
  interface IUser {
   
    nome: string;
    email: string;
    
  }
  
  interface Response {
    responseState: boolean;
    responseStatus: string;
  }
  
  interface IResponseFornecedor {
    user: IUser;
    token: string;
  }
  
  interface AuthContextData {
    signed: boolean;
    user: IUser | null;
    loading: boolean;
    logIn(nome: string, password: string): Promise<ILocalResponse>;
    logOut(): void;
    loadingApp: boolean;
  }
  
  interface ILocalResponse {
    informacao: string;
  }
  const AuthContext = createContext<AuthContextData>({} as AuthContextData);
  export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingApp, setLoadingApp] = useState(true);
    useEffect(() => {
      api.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.message === 'Network Error') {
            Alert.alert('Erro de conexão', 'Verifique sua internet');
          }
  
          return Promise.reject(error);
        },
      );
  
      async function loadData(): Promise<void> {
          console.log('teteeeeeeeeeeeeeeeeeeeeeeeeee')
        const userLoaded = await AsyncStorage.getItem(
          '@LocalizaUnifap:user',
        );
        const tokenLoaded = await AsyncStorage.getItem(
          '@LocalizaUnifap:token',
        );
  
        if (userLoaded && tokenLoaded) {
          api.defaults.headers.authorization = `Bearer ${tokenLoaded}`;
          setUser(JSON.parse(userLoaded));
        }
        setLoading(false);
        setLoadingApp(false);
      }
      loadData();
    }, []);
  
    
  
    const handleLogin = useCallback(
      async (cpfCnpj: string, password: string): Promise<ILocalResponse> => {
          
        setLoading(true);
        try {
          const response = await api.post<IResponseFornecedor>(
            `/session`,
            {
                email: cpfCnpj,
                password: password,
            },
          );
          
          
            const { user, token } = response.data;
            console.log(user,token)
            setUser(user);
            api.defaults.headers.authorization = `Bearer ${token}`;
  
            await AsyncStorage.setItem(
                '@LocalizaUnifap:user',
              JSON.stringify(user),
            );
            await AsyncStorage.setItem(
                '@LocalizaUnifap:token',
                token,
            );
            setLoading(false);
            return new Promise((resolve, reject) => {
              resolve({ informacao: 'Sucesso' });
            });
          
        } catch (error) {
          setLoading(false);
          console.log(error.response.data.error,'dfdfdfdf')
          return new Promise((resolve, reject) => {
            resolve({ informacao: error.response.data.error });
          });
          /* Toast.show(`${error.response.data.message}`, Toast.SHORT, ['UIAlertController']); */
          
        }
        /* setLoading(false);
        console.log('yyyyyyyyyyyyyyyyyyyyyyyyy');
        return new Promise((resolve, reject) => {
          resolve({ informacao: 3 });
        }); */
      },
      [],
    );
  
    function logOut(): void {
      AsyncStorage.clear().then(() => {
        setUser(null);
      });
    }
    return (
      <AuthContext.Provider
        value={{
          signed: !!user,
          user,
          logIn: handleLogin,
          logOut,
          loading,
          loadingApp,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    return context;
  }
  
  export default AuthContext;
  