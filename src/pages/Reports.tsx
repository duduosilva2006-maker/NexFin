import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonProgressBar } from '@ionic/react';
import { downloadOutline } from 'ionicons/icons';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import html2pdf from 'html2pdf.js';
import { useAppContext } from '../context/AppContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Reports: React.FC = () => {
  const { transactions } = useAppContext();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + (t.amount || 0), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + (t.amount || 0), 0);
  const savedAmount = totalIncome - totalExpense;
  const expenses = transactions.filter(
    t => t.type === 'expense'
  );
  
  const categories = [
    'Alimentação',
    'Moradia',
    'Transporte',
    'Saúde',
    'Educação',
    'Lazer',
    'Assinaturas',
    'Impostos',
    'Outros'
  ];
  
  const chartData = categories.map(category => ({
    name: category,
    spent: expenses
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + (t.amount || 0), 0),
    total: 2000,
    color: '#3880ff'
  }));
  
  function handleExport() {
    const element = document.getElementById('report-content');
    const opt = {
      margin: 10,
      filename: 'relatorio.pdf',
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    } as any;
    if (element) html2pdf().set(opt).from(element).save();
  }

  return (
    <IonPage style={{ background: '#000' }}>
      <IonHeader>
        <IonToolbar style={{ '--background': '#000', '--border-width': '0' }}>
          <IonTitle style={{ color: '#fff' }}>Relatórios</IonTitle>
          <IonButton slot="end" fill="clear" onClick={handleExport} style={{ '--color': '#3880ff' }}>
            <IonIcon slot="start" icon={downloadOutline} /> Exportar
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent id="report-content" style={{ '--background': '#000' }}>
       <div
  style={{
    padding: '16px',
    maxWidth: '1400px',
    margin: '0 auto',
    color: '#fff'
  }}
>
          
          {/* Header Financeiro */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <div style={{ background: '#1e1e1e', padding: '15px', borderRadius: '12px', flex: 1 }}>
              <div style={{ fontSize: '0.7rem', color: '#999' }}>Receitas</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2dd36f' }}>R$ {totalIncome.toFixed(2)}</div>
            </div>
            <div style={{ background: '#1e1e1e', padding: '15px', borderRadius: '12px', flex: 1 }}>
              <div style={{ fontSize: '0.7rem', color: '#999' }}>Despesas</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#eb445a' }}>R$ {totalExpense.toFixed(2)}</div>
            </div>
            <div style={{ background: '#3880ff', padding: '15px', borderRadius: '12px', flex: 1 }}>
              <div style={{ fontSize: '0.7rem' }}>Economia</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>R$ {savedAmount.toFixed(2)}</div>
            </div>
          </div>

          {/* Orçamento por Categoria */}
          <div
  style={{
    background: '#171717',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    boxShadow: '0 0 20px rgba(0,0,0,0.3)'
  }}
>
  <h4
    style={{
      margin: '0 0 15px 0',
      fontSize: '1rem'
    }}
  >
    Orçamento por Categoria
  </h4>

  {chartData.map((item, i) => (
    <div key={i} style={{ marginBottom: '12px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          marginBottom: '4px'
        }}
      >
        <span>{item.name}</span>

        <span style={{ color: '#aaa' }}>
          R$ {item.spent.toFixed(2)}
        </span>
      </div>

      <IonProgressBar
        value={Math.min(item.spent / item.total, 1)}
        style={{
          '--progress-background': item.color,
          '--background': '#333',
          height: '6px'
        }}
      />
    </div>
  ))}
</div>

          {/* Evolução */}
          <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem' }}>Evolução Financeira</h4>
            <Line
  data={{
    labels: [
      'Jul/25','Ago/25','Set/25','Out/25',
      'Nov/25','Dez/25','Jan/26','Fev/26',
      'Mar/26','Abr/26','Mai/26','Jun/26'
    ],
    datasets: [
      {
        label: 'Poupado',
        data: [9800,10200,9900,10400,9800,11300,10200,10200,10200,10900,10200,11200],
        borderColor: '#3b9cff',
        backgroundColor: '#3b9cff',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  }}
  options={{
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#999',
          usePointStyle: true
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#999' },
        grid: {
          color: 'rgba(255,255,255,0.08)'
        }
      },
      y: {
        min: 0,
        max: 12000,
        ticks: {
          color: '#999',
          callback: (value) =>
            Number(value) >= 1000
              ? `${Number(value) / 1000} mil`
              : value
        },
        grid: {
          color: 'rgba(255,255,255,0.08)'
        }
      }
    }
  }}
/>

</div>
          {/* Categorias (Doughnut) */}
          <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '15px' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem' }}>Despesas por Categoria</h4>
            <div
  style={{
    width: '320px',
    height: '320px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
              <Doughnut data={{
                labels: chartData.map(c => c.name),
                datasets: [{ data: chartData.map(c => c.spent),backgroundColor: [
                  '#3880ff',
                  '#ff9800',
                  '#2dd36f',
                  '#eb445a',
                  '#9966ff',
                  '#ffce56',
                  '#00d4ff',
                  '#ff6384',
                  '#95a5a6'
                 ], borderWidth: 0 }]
              }} />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};


export default Reports;