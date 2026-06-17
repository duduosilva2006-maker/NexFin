import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonProgressBar,
  IonAvatar,
  IonButton,
  IonIcon,
  IonModal,
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/react';

import { addOutline, star } from 'ionicons/icons';
import { useAppContext } from '../context/AppContext';
import { getAuth } from 'firebase/auth';

interface FamilyMember {
  name: string;
  email: string;
  income: number;
  color: string;
  initial: string;
  isAdmin: boolean;
}

const Family: React.FC = () => {
  const { transactions } = useAppContext();

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
  const email =
  getAuth().currentUser?.email || 'guest';

const saved = localStorage.getItem(
  `nexfin_family_${email}`
);

  if (saved) {
    return JSON.parse(saved);
  }

  return [
    {
      name: 'João Silva',
      email: 'joao@email.com',
      income: 6300,
      color: '#3880ff',
      initial: 'J',
      isAdmin: true
    },
    {
      name: 'Maria Silva',
      email: 'maria@email.com',
      income: 4800,
      color: '#9d4edd',
      initial: 'M',
      isAdmin: false
    }
  ];
});
const email =
  getAuth().currentUser?.email || 'guest';

localStorage.setItem(
  `nexfin_family_${email}`,
  JSON.stringify(familyMembers)
);

  const [showModal, setShowModal] = useState(false);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    income: 0
  });

  const totalIncome = familyMembers.reduce(
    (acc: number, m: FamilyMember) => acc + m.income,
    0
  );

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar
          style={{
            '--background': '#000'
          }}
        >
          <IonTitle>Família</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        style={{
          '--background': '#000'
        }}
      >
        <div
          style={{
            width: '100%',
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              background: '#2563eb',
              padding: '30px',
              borderRadius: '20px',
              marginBottom: '25px',
              color: '#fff'
            }}
          >
            <div
              style={{
                fontSize: '0.9rem',
                opacity: 0.8,
                marginBottom: '5px'
              }}
            >
              Resumo Familiar
            </div>

            <div
              style={{
                fontSize: '2rem',
                fontWeight: 'bold'
              }}
            >
              {familyMembers.length} Membros
            </div>

            <div
              style={{
                display: 'flex',
                gap: '50px',
                marginTop: '20px'
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    opacity: 0.8
                  }}
                >
                  Receitas Totais
                </div>

                <div
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  R$ {totalIncome.toLocaleString('pt-BR')}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    opacity: 0.8
                  }}
                >
                  Despesas Totais
                </div>

                <div
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  R$ {totalExpenses.toLocaleString('pt-BR')}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(450px, 1fr))',
              gap: '20px'
            }}
          >
            {familyMembers.map(
              (member: FamilyMember, i: number) => {
                const memberExpenses = transactions
                  .filter(
                    t =>
                      t.type === 'expense' &&
                      t.member === member.name
                  )
                  .reduce(
                    (acc, t) => acc + t.amount,
                    0
                  );

                const percentage =
                  totalExpenses > 0
                    ? memberExpenses / totalExpenses
                    : 0;

                return (
                  <div
                    key={i}
                    style={{
                      background: '#121212',
                      padding: '20px',
                      borderRadius: '15px',
                      border: '1px solid #333'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px'
                      }}
                    >
                      <IonAvatar
                        style={{
                          width: '50px',
                          height: '50px',
                          background: member.color
                        }}
                      >
                        {member.initial}
                      </IonAvatar>

                      <div
                        style={{
                          marginLeft: '15px'
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {member.name}

                          {member.isAdmin && (
                            <IonIcon
                              icon={star}
                              style={{
                                marginLeft: '8px',
                                color: '#ffcc00'
                              }}
                            />
                          )}
                        </div>

                        <div
                          style={{
                            fontSize: '0.8rem',
                            opacity: 0.6
                          }}
                        >
                          {member.email}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '15px'
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: '0.7rem',
                            opacity: 0.5
                          }}
                        >
                          Receitas
                        </div>

                        <div
                          style={{
                            color: '#2dd36f',
                            fontWeight: 'bold'
                          }}
                        >
                          R$ {member.income.toLocaleString('pt-BR')}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: '0.7rem',
                            opacity: 0.5
                          }}
                        >
                          Despesas
                        </div>

                        <div
                          style={{
                            color: '#eb445a',
                            fontWeight: 'bold'
                          }}
                        >
                          R$ {memberExpenses.toLocaleString('pt-BR')}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <IonProgressBar
                        value={percentage}
                        style={{
                          '--progress-background':
                            member.color,
                          height: '8px',
                          borderRadius: '4px'
                        }}
                      />

                      <span>
                        {Math.round(percentage * 100)}%
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <div
            style={{
              marginTop: '30px',
              border: '2px dashed #333',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setShowModal(true)}
          >
            <IonIcon
              icon={addOutline}
              style={{
                fontSize: '24px'
              }}
            />

            <div
              style={{
                fontWeight: 'bold'
              }}
            >
              Adicionar Membro
            </div>
          </div>
        </div>

        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        >
          <IonContent className="ion-padding">
            <h2>Novo Membro</h2>

            <IonItem>
              <IonLabel position="stacked">
                Nome
              </IonLabel>

              <IonInput
                value={newMember.name}
                onIonChange={e =>
                  setNewMember({
                    ...newMember,
                    name: e.detail.value || ''
                  })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Email
              </IonLabel>

              <IonInput
                value={newMember.email}
                onIonChange={e =>
                  setNewMember({
                    ...newMember,
                    email: e.detail.value || ''
                  })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Receita
              </IonLabel>

              <IonInput
                type="number"
                value={newMember.income}
                onIonChange={e =>
                  setNewMember({
                    ...newMember,
                    income: Number(e.detail.value) || 0
                  })
                }
              />
            </IonItem>

            <IonButton
              expand="block"
              style={{
                marginTop: '20px'
              }}
              onClick={() => {
                const updated: FamilyMember[] = [
                  ...familyMembers,
                  {
                    ...newMember,
                    color: '#666',
                    initial:
                      newMember.name.charAt(0).toUpperCase(),
                    isAdmin: false
                  }
                ];

                setFamilyMembers(updated);

                const email =
  getAuth().currentUser?.email || 'guest';

localStorage.setItem(
  `nexfin_family_${email}`,
  JSON.stringify(updated)
);

                setShowModal(false);

                setNewMember({
                  name: '',
                  email: '',
                  income: 0
                });
              }}
            >
              Salvar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Family;