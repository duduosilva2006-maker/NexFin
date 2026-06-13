import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext'; // CORRIGIDO PARA useAppContext
import './TransactionModal.css';
import { Toast } from '@capacitor/toast';
await Toast.show({
  text: 'Transação salva com sucesso!'
});

interface Props {
  isOpen: boolean;
  onDidDismiss: () => void;
}

const TransactionModal: React.FC<Props> = ({ isOpen, onDidDismiss }) => {
  // CORRIGIDO PARA USAR O HOOK CORRETO
  const { addTransaction } = useAppContext(); 
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Alimentação');
  const [member, setMember] = useState('');

  const handleSave = () => {
    if (!description || !amount) {
      alert('Preencha descrição e valor');
      return;
    }
  
    addTransaction({
      description,
      amount: Number(amount),
      type,
      date: new Date().toLocaleDateString('pt-BR'),
      category,
      member,
      isInstallment: false
    });
  
    setDescription('');
    setAmount('');
    setCategory('Alimentação');
  
    onDidDismiss();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss} className="modal-custom">
      <IonHeader className="ion-no-border">
      <IonTitle>Adicionar Transação</IonTitle>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem className="input-item">
          <IonLabel position="stacked">Tipo</IonLabel>
          <IonSelect value={type} onIonChange={e => setType(e.detail.value)}>
            <IonSelectOption value="income">Receita</IonSelectOption>
            <IonSelectOption value="expense">Despesa</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem className="input-item">
          <IonLabel position="stacked">Valor (R$)</IonLabel>
          <IonInput type="number" placeholder="0,00" onIonChange={e => setAmount(e.detail.value!)} />
        </IonItem>
        <IonItem className="input-item">
          <IonLabel position="stacked">Descrição</IonLabel>
          <IonInput placeholder="Ex: Aluguel" onIonChange={e => setDescription(e.detail.value!)} />
        </IonItem>
        <IonItem className="input-item">
  <IonLabel position="stacked">Categoria</IonLabel>
  <IonSelect value={category} onIonChange={e => setCategory(e.detail.value)}>
    <IonSelectOption value="Alimentação">🍔 Alimentação</IonSelectOption>
    <IonSelectOption value="Moradia">🏠 Moradia</IonSelectOption>
    <IonSelectOption value="Transporte">🚗 Transporte</IonSelectOption>
    <IonSelectOption value="Saúde">🏥 Saúde</IonSelectOption>
    <IonSelectOption value="Educação">📚 Educação</IonSelectOption>
    <IonSelectOption value="Lazer">🎮 Lazer</IonSelectOption>
    <IonSelectOption value="Assinaturas">📺 Assinaturas</IonSelectOption>
    <IonSelectOption value="Impostos">💰 Impostos</IonSelectOption>
    <IonSelectOption value="Outros">📦 Outros</IonSelectOption>
  </IonSelect>
</IonItem>
        <IonItem className="input-item">
        <IonLabel position="stacked">Responsável</IonLabel>
<IonInput
  placeholder="Ex: João"
  value={member}
  onIonChange={e => setMember(e.detail.value!)}
/>
        </IonItem>
        <IonButton
  expand="block"
  className="btn-salvar"
  onClick={handleSave}
  style={{
    marginTop: '25px',
    '--background': '#3880ff',
    '--border-radius': '12px',
    height: '52px',
    fontWeight: 'bold'
  }}
>
  Salvar Transação
</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default TransactionModal;