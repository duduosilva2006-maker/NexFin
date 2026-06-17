import {
  IonModal,
  IonHeader,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton
} from '@ionic/react';

import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Toast } from '@capacitor/toast';

import './TransactionModal.css';

interface Props {
  isOpen: boolean;
  onDidDismiss: () => void;
}

interface FamilyMember {
  name: string;
  email: string;
  income: number;
  color: string;
  initial: string;
  isAdmin: boolean;
}

const TransactionModal: React.FC<Props> = ({
  isOpen,
  onDidDismiss
}) => {
  const { addTransaction } = useAppContext();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Alimentação');

  const familyMembers: FamilyMember[] = JSON.parse(
    localStorage.getItem('nexfin_family') || '[]'
  );

  const [member, setMember] = useState(
    familyMembers.length > 0
      ? familyMembers[0].name
      : ''
  );

  const handleSave = async () => {
    if (
      !description ||
      !amount ||
      !member
    ) {
      alert(
        'Preencha todos os campos.'
      );
      return;
    }

    await addTransaction({
  description,
  amount: Number(amount),
  type,
  date: new Date().toLocaleDateString(
    'pt-BR'
  ),
  category,
  member,
  isInstallment: false
});

    await Toast.show({
      text: 'Transação salva com sucesso!'
    });

    setDescription('');
    setAmount('');
    setCategory('Alimentação');

    if (familyMembers.length > 0) {
      setMember(
        familyMembers[0].name
      );
    }

    onDidDismiss();
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      className="modal-custom"
    >
      <IonHeader className="ion-no-border">
        <IonTitle>
          Adicionar Transação
        </IonTitle>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem className="input-item">
          <IonLabel position="stacked">
            Tipo
          </IonLabel>

          <IonSelect
            value={type}
            onIonChange={e =>
              setType(e.detail.value)
            }
          >
            <IonSelectOption value="income">
              Receita
            </IonSelectOption>

            <IonSelectOption value="expense">
              Despesa
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem className="input-item">
          <IonLabel position="stacked">
            Valor (R$)
          </IonLabel>

          <IonInput
            type="number"
            placeholder="0,00"
            value={amount}
            onIonChange={e =>
              setAmount(
                e.detail.value || ''
              )
            }
          />
        </IonItem>

        <IonItem className="input-item">
          <IonLabel position="stacked">
            Descrição
          </IonLabel>

          <IonInput
            placeholder="Ex: Mercado"
            value={description}
            onIonChange={e =>
              setDescription(
                e.detail.value || ''
              )
            }
          />
        </IonItem>

        <IonItem className="input-item">
          <IonLabel position="stacked">
            Categoria
          </IonLabel>

          <IonSelect
            value={category}
            onIonChange={e =>
              setCategory(
                e.detail.value
              )
            }
          >
            <IonSelectOption value="Alimentação">
              🍔 Alimentação
            </IonSelectOption>

            <IonSelectOption value="Moradia">
              🏠 Moradia
            </IonSelectOption>

            <IonSelectOption value="Transporte">
              🚗 Transporte
            </IonSelectOption>

            <IonSelectOption value="Saúde">
              🏥 Saúde
            </IonSelectOption>

            <IonSelectOption value="Educação">
              📚 Educação
            </IonSelectOption>

            <IonSelectOption value="Lazer">
              🎮 Lazer
            </IonSelectOption>

            <IonSelectOption value="Assinaturas">
              📺 Assinaturas
            </IonSelectOption>

            <IonSelectOption value="Impostos">
              💰 Impostos
            </IonSelectOption>

            <IonSelectOption value="Outros">
              📦 Outros
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem className="input-item">
          <IonLabel position="stacked">
            Responsável
          </IonLabel>

          <IonSelect
            value={member}
            placeholder="Selecione"
            onIonChange={e =>
              setMember(
                e.detail.value
              )
            }
          >
            {familyMembers.map(
              (
                memberItem,
                index
              ) => (
                <IonSelectOption
                  key={index}
                  value={
                    memberItem.name
                  }
                >
                  {
                    memberItem.name
                  }
                </IonSelectOption>
              )
            )}
          </IonSelect>
        </IonItem>

        <IonButton
          expand="block"
          className="btn-salvar"
          onClick={handleSave}
          style={{
            marginTop: '25px',
            '--background':
              '#3880ff',
            '--border-radius':
              '12px',
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