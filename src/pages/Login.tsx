import {
    IonPage,
    IonContent,
    IonInput,
    IonButton
  } from '@ionic/react';
  
  import { useState } from 'react';
  import { useHistory } from 'react-router';
  import { useAuth } from '../context/AuthContext';
  
  const Login: React.FC = () => {
    const { login } = useAuth();
  
    const history = useHistory();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      const success = login(email, password);
  
      if (success) {
        history.push('/home');
      } else {
        alert('Email ou senha inválidos');
      }
    };
  
    return (
      <IonPage>
        <IonContent
  className="ion-padding"
  style={{
    '--background': '#0f1117'
  }}
>
  <div
    style={{
      maxWidth: '400px',
      margin: '80px auto',
      textAlign: 'center'
    }}
  >
    <h1
      style={{
        color: '#3880ff',
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}
    >
      NexFin
    </h1>

    <p
      style={{
        color: '#999',
        marginBottom: '40px'
      }}
    >
      Controle financeiro da sua família
    </p>

    <IonInput
      fill="outline"
      label="Email"
      labelPlacement="floating"
      value={email}
      onIonChange={(e) => setEmail(e.detail.value!)}
      style={{ marginBottom: '15px' }}
    />

    <IonInput
      fill="outline"
      type="password"
      label="Senha"
      labelPlacement="floating"
      value={password}
      onIonChange={(e) => setPassword(e.detail.value!)}
      style={{ marginBottom: '20px' }}
    />

    <IonButton
      expand="block"
      onClick={handleLogin}
      style={{
        height: '50px'
      }}
    >
      Entrar
    </IonButton>

    <IonButton
      fill="clear"
      expand="block"
      routerLink="/register"
    >
      Criar Conta
    </IonButton>
  </div>
</IonContent>
      </IonPage>
    );
  };
  
  export default Login;