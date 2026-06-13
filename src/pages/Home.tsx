import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRouterLink } from '@ionic/react';
import { useAppContext } from '../context/AppContext';
import './Home.css';

// Imports para o gráfico
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';
import { Network } from '@capacitor/network';
import { useEffect, useState } from 'react';

// Registra os componentes necessários
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Home: React.FC = () => {
  const [connectionStatus, setConnectionStatus] =
useState('Verificando...');
  const { user } = useAuth();
  useEffect(() => {
  const checkNetwork = async () => {
    const status = await Network.getStatus();

    setConnectionStatus(
      status.connected ? 'Online' : 'Offline'
    );
  };

  checkNetwork();
}, []);
  const { transactions } = useAppContext();

  const totalBalance = transactions.reduce((acc, t) => t.type === 'income' ? acc + (t.amount || 0) : acc - (t.amount || 0), 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + (t.amount || 0), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + (t.amount || 0), 0);
  
  // Valores calculados conforme visual no Figma
  const savedAmount = totalIncome - totalExpense; 
  const monthlyGoal = 3000.00;
  const metaEconomiaPercent = Math.round((savedAmount / monthlyGoal) * 100); 

  // Lógica para agrupar despesas por categoria para o gráfico
  const expenses = transactions.filter(t => t.type === 'expense');
  const categories = Array.from(new Set(expenses.map(t => t.category)));
  const categoryData = categories.map(cat => 
    expenses.filter(t => t.category === cat).reduce((acc, t) => acc + (t.amount || 0), 0)
  );

  const chartData = {
    labels: categories,
    datasets: [{
      data: categoryData,
      backgroundColor: [
        '#2196F3', // Moradia
        '#9C27B0', // Educação
        '#4CAF50', // alimentação
        '#F44336', // Saúde
        '#FF9800', // Transporte
        '#00BCD4', // Assinaturas
        '#E91E63', // Lazer
        '#607D8B'  // Outros
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#bdbdbd',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 12
          }
        }
      }
    }
  };
  const lineData = {
    labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{ data: [8000, 8500, 8200, 9000, 8800, 9500, 9200, 9100, 9300, 9600, 9400, 10000], borderColor: '#3880ff', tension: 0.4 }]
  };
const goals = JSON.parse(
  localStorage.getItem('my_goals') || '[]'
);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar><IonTitle>NexFin</IonTitle></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ margin: 0, fontSize: '2.2rem' }}>
  Olá, {user?.name || 'Usuário'}!
</h2>
          <p style={{ margin: '5px 0', fontSize: '1.3rem', opacity: 0.7 }}>Gerencie suas finanças familiares</p>
        </div>

        {/* Card Azul Atualizado com Poupado, Meta Mensal e Meta de Economia */}
        <div className="card-saldo-azul" style={{ padding: '20px', background: '#3880ff', borderRadius: '15px', color: 'white' }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>Saldo total da família</p>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 20px 0' }}>R$ {totalBalance.toFixed(2)}</h1>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div><p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>Receitas</p><p style={{ margin: 0, fontSize: '1.2rem' }}>R$ {totalIncome.toFixed(2)}</p></div>
            <div><p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>Despesas</p><p style={{ margin: 0, fontSize: '1.2rem' }}>R$ {totalExpense.toFixed(2)}</p></div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div><p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>Poupado</p><p style={{ margin: 0, fontSize: '1.2rem' }}>R$ {savedAmount.toFixed(2)}</p></div>
            <div><p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>Meta Mensal</p><p style={{ margin: 0, fontSize: '1.2rem' }}>R$ {monthlyGoal.toFixed(2)}</p></div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <p style={{ margin: 0 }}>Meta de Economia</p>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{metaEconomiaPercent}%</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', height: '8px', borderRadius: '4px' }}>
              <div style={{ background: '#fff', width: `${Math.min(metaEconomiaPercent, 100)}%`, height: '100%', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>

<div
  className="transacoes-container"
  style={{
    marginTop: '20px',
    padding: '20px'
  }}
>
  <h3>Status da Rede</h3>

  <p>
    Conexão atual:
    <strong> {connectionStatus}</strong>
  </p>
</div>

{/* Evolução Financeira */}
        <div className="transacoes-container" style={{ padding: '20px', marginTop: '30px' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Evolução Financeira (12 meses)</h3>
          <div style={{ maxHeight: '250px' }}>
            <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        {/* Gráfico de Despesas */}
        <div
  className="transacoes-container"
  style={{
    padding: '20px',
    marginTop: '30px'
  }}
>
  <h3
    style={{
      fontSize: '1.8rem',
      marginBottom: '20px'
    }}
  >
    Despesas por Categoria
  </h3>

  <div
  style={{
    width: '100%',
    maxWidth: '650px',
    height: '400px',
    margin: '0 auto'
  }}
>
    <Doughnut
      data={chartData}
      options={chartOptions}
    />
  </div>
</div>

        {/* Transações Recentes */}
        <div className="transacoes-container" style={{ marginTop: '30px', padding: '20px' }}>
          <div className="header-transacoes">
            <h3 style={{ fontSize: '1.8rem' }}>Transações Recentes</h3>
            <IonRouterLink routerLink="/transactions" style={{ fontSize: '1.1rem' }}>Ver todas</IonRouterLink>
          </div>
          {transactions.slice(0, 3).map((t, index) => (
            <div className="item-transacao" key={index} style={{ padding: '20px 0' }}>
              <div className={`icone-transacao ${t.type === 'expense' ? 'expense' : 'income'}`} style={{ fontSize: '1.5rem' }}>{t.type === 'expense' ? '▼' : '▲'}</div>
              <div className="detalhes">
                <p style={{ fontSize: '1.2rem' }}>{t.description}</p>
                <span style={{ fontSize: '1rem' }}>{t.date} • {t.category} • {t.member}</span>
              </div>
              <div className="valor-transacao" style={{ fontSize: '1.2rem' }}>{t.type === 'expense' ? '-' : '+'} R$ {(t.amount || 0).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Metas Financeiras */}
        <div className="transacoes-container" style={{ marginTop: '30px', padding: '20px', marginBottom: '60px' }}>
          <div className="header-transacoes">
            <h3 style={{ fontSize: '1.8rem' }}>Metas Financeiras</h3>
            <IonRouterLink routerLink="/goals" style={{ fontSize: '1.1rem' }}>Ver todas</IonRouterLink>
          </div>
         {goals.map((goal: any, index: number) => (
            <div className="item-transacao" key={index} style={{ marginBottom: '20px', padding: '10px 0' }}>
              <div className="detalhes" style={{ width: '100%' }}>
                <p style={{ fontSize: '1.2rem' }}>{goal.name}</p>
                <div style={{ background: '#333', height: '10px', borderRadius: '5px', marginTop: '10px' }}>
                  <div style={{ background: goal.color, height: '100%', width: `${goal.progress}%`, borderRadius: '5px' }}></div>
                </div>
                <span style={{ fontSize: '1rem' }}>Progresso: {goal.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;