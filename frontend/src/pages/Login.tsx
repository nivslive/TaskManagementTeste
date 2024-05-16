import React, { useEffect, useState } from 'react';
import styles from './Login.styles';
import authData from '../data/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth-slice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState<any>('');
  const [typeResponseMessage, setTypeResponseMessage] = useState<any>('success');
  const [responseMessageBool, setResponseMessageBool] = useState<boolean>(false);
  const selector = useSelector((store: any) => store);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (selector.auth.authenticated) {
  //     window.location.pathname = '/dashboard';
  //   }
  // }, [selector.auth.authenticated]);

  const submit = async () => {
    setResponseMessageBool(false);
    if(email.length === 0) {
      setResponseMessageBool(true);
      setTypeResponseMessage('error');
      setResponseMessage("Você não escreveu nada no email.");
      return;
    } else if(password.length === 0) {
      setResponseMessageBool(true);
      setTypeResponseMessage('error');
      setResponseMessage("Você não escreveu nada na senha.");
      return;
    } else if(password.length === 0 && email.length === 0) {
      setResponseMessageBool(true);
      setTypeResponseMessage('error');
      setResponseMessage("Você não escreveu nada na senha e no email.");
      return;
    }
    const requestData = { email, password };
    // try {
      authData.login(requestData).then( async (response: any) => {
        if(response.status === 401 || response.statusText === "Unauthorized") {
          setResponseMessageBool(true);
          setTypeResponseMessage('error');
          setResponseMessage('Desautorizado. Credenciais incorretas.');
        }

        if(response.ok) {
          return await response.json();
        }
    }).then(async (json) => {
        if(json && json.message) {
          setResponseMessageBool(true);
          setTypeResponseMessage('success');
          setResponseMessage(await json.message + ' Você será redirecionado para o dashboard..');
          setTimeout(() => {
              localStorage.setItem('bearer-token', json.token);
              dispatch(authActions.authenticate({ token: json.token }));
              window.location.pathname = '/dashboard';
          }, 2000);
        }
    });
    
  };

  const breakDefaultBehaviorOnSubmit = (e: any) => {
    e.preventDefault();
  };

  const setColorResponseMessage = () => {
    if(typeResponseMessage === 'success') {
      return 'text-success';
    }
    if(typeResponseMessage === 'error') {
      return 'text-danger';
    }
    return '';
  };
  return (
    <div className="App" style={styles.app}>
      <div className="login-container" style={styles.loginContainer}>
        <h2 style={styles.loginHeader}>Página de Login</h2>
        { responseMessageBool && <h6 className={setColorResponseMessage()}>{responseMessage}</h6>}
        <form onSubmit={breakDefaultBehaviorOnSubmit} className="login-form" style={styles.loginForm}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            style={styles.input}
          />

          <label htmlFor="password" style={styles.label}>
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            style={styles.input}
          />

          <button onClick={submit} type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
