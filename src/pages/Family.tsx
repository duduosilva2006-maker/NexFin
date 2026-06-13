import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonProgressBar, IonAvatar, IonButton, IonIcon, IonModal, IonItem, IonLabel, IonInput } from '@ionic/react';
import { addOutline, star } from 'ionicons/icons';

const Family: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState([
    { name: 'João Silva', email: 'joao@email.com', income: 6300, expense: 3526.90, color: '#3880ff', initial: 'J', isAdmin: true },
    { name: 'Maria Silva', email: 'maria@email.com', income: 4800, expense: 1029.80, color: '#9d4edd', initial: 'M', isAdmin: true },
    { name: 'Pedro Silva', email: 'pedro@email.com', income: 0, expense: 860, color: '#ff9800', initial: 'P', isAdmin: false },
    { name: 'Ana Silva', email: 'ana@email.com', income: 0, expense: 680, color: '#e71d36', initial: 'A', isAdmin: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', income: 0, expense: 0 });

  const totalIncome = familyMembers.reduce((acc, m) => acc + m.income, 0);

  return (
    <IonPage>
      <IonHeader><IonToolbar style={{ '--background': '#000' }}><IonTitle>Família</IonTitle></IonToolbar></IonHeader>
      <IonContent style={{ '--background': '#000' }}>
        <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
          
          <div style={{ background: '#2563eb', padding: '30px', borderRadius: '20px', marginBottom: '25px', color: '#fff' }}>
            <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '5px' }}>Resumo Familiar</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{familyMembers.length} Membros</div>
            <div style={{ display: 'flex', gap: '50px', marginTop: '20px' }}>
              <div><div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Receitas Totais</div><div style={{ fontWeight: 'bold' }}>R$ {totalIncome.toLocaleString('pt-BR')}</div></div>
              <div><div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Despesas Totais</div><div style={{ fontWeight: 'bold' }}>R$ {familyMembers.reduce((acc, m) => acc + m.expense, 0).toLocaleString('pt-BR')}</div></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '20px' }}>
            {familyMembers.map((member, i) => (
              <div key={i} style={{ background: '#121212', padding: '20px', borderRadius: '15px', border: '1px solid #333' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <IonAvatar style={{ width: '50px', height: '50px', background: member.color }}>{member.initial}</IonAvatar>
                  <div style={{ marginLeft: '15px' }}>
                    <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        {member.name} {member.isAdmin && <IonIcon icon={star} style={{ marginLeft: '8px', color: '#ffcc00', fontSize: '0.9rem' }} />}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{member.email}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', padding: '0 5px' }}>
                  <div><div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Receitas</div><div style={{ color: '#2dd36f', fontWeight: 'bold' }}>R$ {member.income.toLocaleString('pt-BR')}</div></div>
                  <div style={{ textAlign: 'right' }}><div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Despesas</div><div style={{ color: '#eb445a', fontWeight: 'bold' }}>R$ {member.expense.toLocaleString('pt-BR')}</div></div>
                </div>

                {member.income > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IonProgressBar value={member.income / totalIncome} style={{ '--progress-background': member.color, height: '8px', borderRadius: '4px' }} />
                    <span style={{ fontSize: '0.8rem' }}>{Math.round((member.income / totalIncome) * 100)}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '30px', border: '2px dashed #333', padding: '20px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', opacity: 0.7 }} onClick={() => setShowModal(true)}>
            <IonIcon icon={addOutline} style={{ fontSize: '24px' }} />
            <div style={{ fontWeight: 'bold' }}>Adicionar Membro</div>
          </div>
        </div>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} style={{ '--height': '450px', '--width': '400px' }}>
          <IonContent style={{ padding: '20px' }}>
            <h2 style={{ padding: '0 20px' }}>Novo Membro</h2>
            <IonItem><IonLabel position="stacked">Nome</IonLabel><IonInput value={newMember.name} onIonChange={e => setNewMember({...newMember, name: e.detail.value!})} /></IonItem>
            <IonItem><IonLabel position="stacked">Email</IonLabel><IonInput value={newMember.email} onIonChange={e => setNewMember({...newMember, email: e.detail.value!})} /></IonItem>
            <IonItem><IonLabel position="stacked">Receita Inicial (R$)</IonLabel><IonInput type="number" value={newMember.income} onIonChange={e => setNewMember({...newMember, income: parseFloat(e.detail.value!) || 0})} /></IonItem>
            <IonItem><IonLabel position="stacked">Despesa Inicial (R$)</IonLabel><IonInput type="number" value={newMember.expense} onIonChange={e => setNewMember({...newMember, expense: parseFloat(e.detail.value!) || 0})} /></IonItem>
            <IonButton expand="block" style={{ marginTop: '20px' }} onClick={() => {
                setFamilyMembers([...familyMembers, { ...newMember, color: '#666', initial: newMember.name[0], isAdmin: false }]);
                setNewMember({ name: '', email: '', income: 0, expense: 0 });
                setShowModal(false);
            }}>Salvar</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Family;