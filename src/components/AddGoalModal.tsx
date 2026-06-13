import { useState } from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonSegment, IonSegmentButton, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { airplane, home, car, school, heart, shield, gift, trendingUp, wallet, sparkles } from 'ionicons/icons';

interface Props {
  isOpen: boolean;
  onDidDismiss: () => void;
  onAddGoal: (goal: any) => void;
}

const AddGoalModal: React.FC<Props> = ({ isOpen, onDidDismiss, onAddGoal }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [term, setTerm] = useState('Curto');
  const [selectedIcon, setSelectedIcon] = useState(home);
  const icons = [airplane, home, car, school, heart, shield, gift, trendingUp, wallet, sparkles];

  const handleSave = () => {
    onAddGoal({ title, amount, currentAmount, term, icon: selectedIcon });
    setTitle(''); setAmount(''); setCurrentAmount('');
    onDidDismiss();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss} className="custom-modal">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nova Meta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Campos com estilo mais limpo e arredondado */}
        <IonItem lines="none" style={{ '--background': '#1e1e1e', borderRadius: '15px', marginBottom: '10px' }}>
          <IonLabel position="stacked" style={{ color: '#aaa' }}>Título</IonLabel>
          <IonInput value={title} onInput={(e: any) => setTitle(e.target.value)} placeholder="Ex: Viagem" />
        </IonItem>

        <IonItem lines="none" style={{ '--background': 'transparent', marginBottom: '10px' }}>
          <IonLabel position="stacked" style={{ color: '#aaa', marginBottom: '10px' }}>Ícone</IonLabel>
          <IonGrid>
            <IonRow>
              {icons.map((icon, i) => (
                <IonCol key={i} size="2" onClick={() => setSelectedIcon(icon)}>
                  <IonIcon 
                    icon={icon} 
                    style={{ color: selectedIcon === icon ? '#3880ff' : 'white', fontSize: '24px', cursor: 'pointer', background: selectedIcon === icon ? '#333' : 'transparent', padding: '5px', borderRadius: '8px' }} 
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonItem>

        <IonItem lines="none" style={{ '--background': '#1e1e1e', borderRadius: '15px', marginBottom: '10px' }}>
          <IonLabel position="stacked" style={{ color: '#aaa' }}>Prazo</IonLabel>
          <IonSegment value={term} onIonChange={(e: any) => setTerm(e.detail.value)} mode="ios">
            <IonSegmentButton value="Curto"><IonLabel>Curto</IonLabel></IonSegmentButton>
            <IonSegmentButton value="Médio"><IonLabel>Médio</IonLabel></IonSegmentButton>
            <IonSegmentButton value="Longo"><IonLabel>Longo</IonLabel></IonSegmentButton>
          </IonSegment>
        </IonItem>

        <IonItem lines="none" style={{ '--background': '#1e1e1e', borderRadius: '15px', marginBottom: '10px' }}>
          <IonLabel position="stacked" style={{ color: '#aaa' }}>Valor da Meta</IonLabel>
          <IonInput type="number" value={amount} onInput={(e: any) => setAmount(e.target.value)} placeholder="0.00" />
        </IonItem>

        <IonItem lines="none" style={{ '--background': '#1e1e1e', borderRadius: '15px', marginBottom: '10px' }}>
          <IonLabel position="stacked" style={{ color: '#aaa' }}>Valor Atual (Opcional)</IonLabel>
          <IonInput type="number" value={currentAmount} onInput={(e: any) => setCurrentAmount(e.target.value)} placeholder="0.00" />
        </IonItem>

        <IonButton expand="block" style={{ marginTop: '20px', '--border-radius': '15px' }} onClick={handleSave}>
          Criar Meta
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default AddGoalModal;