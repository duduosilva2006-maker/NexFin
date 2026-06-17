import {
    IonPage,
    IonContent,
    IonInput,
    IonButton
  } from '@ionic/react';
  
  import { useState } from 'react';
  import { useHistory } from 'react-router';
  import { useAuth } from '../context/AuthContext';
  
  const Register: React.FC = () => {
    const { register } = useAuth();
  
    const history = useHistory();
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = async () => {
      const success = await register(
  name,
  email,
  password
);
  
      if (!success) {
        alert('Email já cadastrado');
        return;
      }
  
      alert('Conta criada com sucesso');
  
      history.push('/login');
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
      margin: '60px auto',
      textAlign: 'center'
    }}
  >
    <h1
      style={{
        color: '#3880ff',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}
    >
      Criar Conta
    </h1>

    <p
      style={{
        color: '#999',
        marginBottom: '30px'
      }}
    >
      Comece a organizar suas finanças
    </p>

    <IonInput
      fill="outline"
      label="Nome"
      labelPlacement="floating"
      value={name}
      onIonChange={(e) => setName(e.detail.value!)}
      style={{ marginBottom: '15px' }}
    />

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
      onClick={handleRegister}
      style={{
        height: '50px'
      }}
    >
      Cadastrar
    </IonButton>

    <IonButton
      fill="clear"
      expand="block"
      routerLink="/login"
    >
      Já tenho conta
    </IonButton>
  </div>
</IonContent>
      </IonPage>
    );
  };
  
  export default Register;