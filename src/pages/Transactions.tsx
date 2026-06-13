import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonChip, IonLabel, IonList, IonItem, IonIcon } from '@ionic/react';
import { useAppContext } from '../context/AppContext';
import { car, cart, home, gift, heart, flash, list, film, checkmarkCircle, business, cafe, fastFood, shirt, book } from 'ionicons/icons';

const Transactions: React.FC = () => {
 const { transactions } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + (t.amount || 0), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + (t.amount || 0), 0);

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'income') return t.type === 'income';
    if (filter === 'expense') return t.type === 'expense';
    return true;
  });

  // Mapeamento completo de ícones para cada categoria
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'alimentação': return fastFood;
      case 'padaria': return cafe;
      case 'lazer': return film;
      case 'moradia': return home;
      case 'transporte': return car;
      case 'assinaturas': return gift;
      case 'saúde': return heart;
      case 'energia elétrica': return flash;
      case 'educação': return book;
      case 'vestuário': return shirt;
      case 'outros': return list;
      case 'salário': return checkmarkCircle;
      default: return business;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#000', '--color': '#fff' }}>
          <IonTitle style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Transações</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding" style={{ '--background': '#000' }}>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <div style={{ flex: 1, background: '#1e1e1e', padding: '20px', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <p style={{ margin: 0, fontSize: '1rem', opacity: 0.7, color: '#fff' }}>Receitas</p>
            <h2 style={{ margin: 0, color: '#2dd36f', fontSize: '1.8rem', fontWeight: 'bold' }}>R$ {totalIncome.toFixed(2)}</h2>
          </div>
          <div style={{ flex: 1, background: '#1e1e1e', padding: '20px', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <p style={{ margin: 0, fontSize: '1rem', opacity: 0.7, color: '#fff' }}>Despesas</p>
            <h2 style={{ margin: 0, color: '#eb445a', fontSize: '1.8rem', fontWeight: 'bold' }}>R$ {totalExpense.toFixed(2)}</h2>
          </div>
        </div>

        <IonSearchbar 
          placeholder="Buscar transações..." 
          style={{ marginBottom: '15px', '--background': '#1e1e1e', '--color': '#fff', '--placeholder-color': 'rgba(255,255,255,0.5)', height: '60px' }} 
        />

        <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', paddingLeft: '5px' }}>
          <IonChip 
            color={filter === 'all' ? 'primary' : undefined} 
            onClick={() => setFilter('all')}
            style={{ fontSize: '1rem', padding: '12px 18px', background: filter === 'all' ? '#3880ff' : '#1e1e1e', color: '#fff' }}
          >
            <IonLabel>Todas</IonLabel>
          </IonChip>
          <IonChip 
            color={filter === 'income' ? 'primary' : undefined} 
            onClick={() => setFilter('income')}
            style={{ fontSize: '1rem', padding: '12px 18px', background: filter === 'income' ? '#3880ff' : '#1e1e1e', color: '#fff' }}
          >
            <IonLabel>Receitas</IonLabel>
          </IonChip>
          <IonChip 
            color={filter === 'expense' ? 'primary' : undefined} 
            onClick={() => setFilter('expense')}
            style={{ fontSize: '1rem', padding: '12px 18px', background: filter === 'expense' ? '#3880ff' : '#1e1e1e', color: '#fff' }}
          >
            <IonLabel>Despesas</IonLabel>
          </IonChip>
        </div>

        <IonList style={{ background: 'transparent' }}>
          {filteredTransactions.map((t, index) => (
            <IonItem 
              key={index} 
              lines="none" 
              style={{ '--background': '#1e1e1e', marginBottom: '12px', borderRadius: '12px', color: '#fff' }}
            >
              <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: t.type === 'expense' ? 'rgba(235, 68, 90, 0.2)' : 'rgba(45, 211, 111, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: t.type === 'expense' ? '#eb445a' : '#2dd36f'
                  }}>
                    <IonIcon icon={getCategoryIcon(t.category)} style={{ fontSize: '1.8rem' }} />
                  </div>
                  
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{t.description}</div>
                    <div style={{ fontSize: '1rem', opacity: 0.7 }}>{t.category} • {t.member}</div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ 
                    margin: 0,
                    fontWeight: 'bold',
                    fontSize: '1.4rem',
                    color: t.type === 'expense' ? '#eb445a' : '#2dd36f' 
                  }}>
                    {t.type === 'expense' ? '-' : '+'} R$ {(t.amount || 0).toFixed(2)}
                  </h3>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>{t.date}</div>
                </div>
              </div>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Transactions;