import { createContext, useContext, useEffect, useState } from 'react';

import AuthenticationUtils from '../../utils/AuthenticationUtils';

const AuthContext = createContext();

function doLogin(onAuth) {
  return function ({ email, password }) {
    return performLogin({ email, password, onAuth });
  };
}

function doLogout(onAuth) {
  return function () {
    return performLogout(onAuth);
  };
}

function doSignup(onAuth) {
  return function ({ email, password, username }) {
    return performSignup({ email, password, username, onAuth });
  };
}

async function performLogin({ email, password, onAuth }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    AuthenticationUtils.setAuthenticationToken(data);

    onAuth({ loading: false, user: data?.token });
  } catch (err) {
    console.error(err);
  }
}

function performLogout(onAuth) {
  AuthenticationUtils.clearAuthenticationToken();
  onAuth({ loading: false, user: null });
}

async function performSignup({ email, password, username, onAuth }) {
  const params = { email, password, username, password_confirmation: password };
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    await performLogin({ email, password, onAuth });
  } catch (err) {
    console.error(err);
  }
}

export function useAuth() {
  const [auth, setAuth] = useContext(AuthContext);

  const login = doLogin(setAuth);
  const logout = doLogout(setAuth);
  const signup = doSignup(setAuth);

  return [auth, { login, logout, signup }];
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    loading: true,
    user: null,
  });

  useEffect(() => {
    const authentication = AuthenticationUtils.getAuthenticationToken();
    setAuth({ loading: false, user: authentication?.token });
  }, [auth.user]);

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
}
