import React, { 
  createContext, 
  ReactNode, 
  useContext, 
  useState, 
  useEffect 
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

const { BASE_AUTH_URL } = process.env;
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: ReactNode
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

interface IAuthorizationResponse {
  params: {
    access_token: string;    
  },
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isLoading, setIsLoaging] = useState(true);
  const userStorageKey = '@gofinances:user';

  const signInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `${BASE_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      console.log(authUrl)

      const { params, type } = await AuthSession.startAsync({ 
        authUrl 
      }) as IAuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();
        const loggedUser = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        }

        setUser(loggedUser);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(loggedUser));
      }      

    } catch (error) {
      console.log(error)
      throw new Error(error as string);
    }
  }

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `http://ui-avatars.com/api/?name=${name}&length=1`

        const loggedUser = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        }

        setUser(loggedUser);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(loggedUser));
      }

    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  const signOut = async () => {
    setUser({} as IUser);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    const loadUserStorageData = async () => {
      const storagedUser = await AsyncStorage.getItem(userStorageKey);

      if (storagedUser) {
        const loggedUser = JSON.parse(storagedUser) as IUser;
        setUser(loggedUser);
      }
      setIsLoaging(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ user, signInWithGoogle, signInWithApple, signOut }}>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };