import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';
import { useAppContext } from '../context/AppContext';
import './Home.css';

const AllTransactions: React.FC = () => {
  const { transactions } = useAppContext();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Todas as Transações</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="transacoes-container">
          {transactions.map((t, index) => (
            <div className="item-transacao" key={index}>
              <div className={`icone-transacao ${t.type === 'expense' ? 'expense' : 'income'}`}>{t.type === 'expense' ? '▼' : '▲'}</div>
              <div className="detalhes">
                <p>{t.description}</p>
                <span>{t.date} • {t.category} • {t.member}</span>
              </div>
              <div className="valor-transacao">{t.type === 'expense' ? '-' : '+'} R$ {(t.amount || 0).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AllTransactions;