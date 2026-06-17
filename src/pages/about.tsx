import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon
} from '@ionic/react';

import {
  informationCircleOutline,
  logoGithub,
  schoolOutline
} from 'ionicons/icons';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar
          style={{
            '--background': '#000',
            '--color': '#fff'
          }}
        >
          <IonTitle>Sobre</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        style={{
          '--background': '#000',
          '--color': '#fff'
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginTop: '30px'
          }}
        >
          <IonIcon
            icon={informationCircleOutline}
            style={{
              fontSize: '80px',
              color: '#3880ff'
            }}
          />

          <h1
            style={{
              marginTop: '15px',
              fontWeight: 'bold'
            }}
          >
            NexFin
          </h1>

          <p
            style={{
              opacity: 0.8
            }}
          >
            Controle financeiro familiar
          </p>
        </div>

        <div
          style={{
            marginTop: '40px',
            background: '#1e1e1e',
            padding: '20px',
            borderRadius: '15px'
          }}
        >
          <h2>Sobre o projeto</h2>

          <p>
            O NexFin é um aplicativo desenvolvido
            para auxiliar famílias no controle de
            receitas, despesas e acompanhamento
            financeiro dos membros cadastrados.
          </p>
        </div>

        <div
          style={{
            marginTop: '20px',
            background: '#1e1e1e',
            padding: '20px',
            borderRadius: '15px'
          }}
        >
          <h2>
            <IonIcon
              icon={schoolOutline}
              style={{
                marginRight: '8px'
              }}
            />
            Instituição
          </h2>

          <p>
            UNISUAM
          </p>

          <p>
            Turma: ADS0301M
          </p>

          <p>
            Curso: Análise e Desenvolvimento de Sistemas
          </p>
        </div>

        <div
          style={{
            marginTop: '20px',
            background: '#1e1e1e',
            padding: '20px',
            borderRadius: '15px'
          }}
        >
          <h2>
            <IonIcon
              icon={logoGithub}
              style={{
                marginRight: '8px'
              }}
            />
            Desenvolvedor
          </h2>

          <p>
            Eduardo Oliveira
          </p>

          <p>
            Projeto acadêmico desenvolvido em
            Ionic React.
          </p>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '40px',
            opacity: 0.6
          }}
        >
          Versão 1.0.0
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;