import {
  IonPage,
  IonContent,
  IonInput,
  IonButton
} from '@ionic/react';

import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const auth = getAuth();

  const handleRecover = async () => {
    if (!email) {
      alert('Digite seu email');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Enviamos um email para redefinir sua senha!');
    } catch {
      alert('Erro ao enviar email');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '400px', margin: '80px auto', textAlign: 'center' }}>
          <h2>Recuperar Senha</h2>

          <IonInput
            fill="outline"
            label="Email"
            labelPlacement="floating"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />

          <IonButton expand="block" onClick={handleRecover}>
            Enviar email
          </IonButton>

          <IonButton fill="clear" routerLink="/">
            Voltar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;