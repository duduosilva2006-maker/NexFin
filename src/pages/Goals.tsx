import { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonBackButton, IonButtons, IonGrid, IonRow, IonCol,
  IonCard, IonCardContent, IonIcon, IonSegment,
  IonSegmentButton, IonLabel
} from '@ionic/react';
import { add, home } from 'ionicons/icons';
import './Home.css';
import AddGoalModal from '../components/AddGoalModal';
import { Toast } from '@capacitor/toast';
import { getAuth } from 'firebase/auth';

interface Goal {
  name: string;
  category: string;
  progress: number;
  current: number;
  target: number;
  deadline: string;
  color: string;
  icon: any;
}

const colors = ['#2dd36f', '#3880ff', '#a35aff', '#ffc409', '#eb445a'];

const Goals: React.FC = () => {

  const currentUser = JSON.parse(
    localStorage.getItem('nexfin_user_logged') || '{}'
  );

  const GOALS_KEY =
    `my_goals_${currentUser.email || 'guest'}`;

  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('Todas');

  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem(GOALS_KEY);

    return savedGoals ? JSON.parse(savedGoals) : [
      {
        name: 'Viagem em Família',
        category: 'Curto Prazo',
        progress: 40,
        current: 3200,
        target: 8000,
        deadline: 'dez. de 2026',
        color: '#2dd36f',
        icon: home
      }
    ];
  });

  localStorage.setItem(
    GOALS_KEY,
    JSON.stringify(goals)
  );

  const handleAddGoal = async (newGoal: any) => {
    const current = Number(newGoal.currentAmount) || 0;
    const target = Number(newGoal.amount);
    const calculatedProgress = target > 0 ? (current / target) * 100 : 0;

    const goalToAdd: Goal = {
      name: newGoal.title,
      category: newGoal.term + ' Prazo',
      progress: Math.min(calculatedProgress, 100),
      current,
      target,
      deadline: 'dez. 2026',
      color: '#3880ff',
      icon: newGoal.icon
    };

    setGoals([...goals, goalToAdd]);

    await Toast.show({
      text: 'Meta criada com sucesso!'
    });
  };

  const filteredGoals =
    filter === 'Todas'
      ? goals
      : goals.filter(g => g.category === filter);

  const totalProgress =
    goals.length > 0
      ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)
      : 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Metas Financeiras</IonTitle>

          <IonButtons slot="end" onClick={() => setShowModal(true)}>
            <div style={{ background: '#3880ff', borderRadius: '50%', padding: '6px', marginRight: '10px', display: 'flex' }}>
              <IonIcon icon={add} style={{ fontSize: '20px', color: 'white' }} />
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonCard style={{ background: '#3880ff', color: 'white', marginBottom: '20px', borderRadius: '15px' }}>
          <IonCardContent>
            <p style={{ margin: 0, opacity: 0.9 }}>Progresso Geral</p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '5px 0' }}>{totalProgress}%</h2>
            <div style={{ background: 'rgba(0,0,0,0.3)', height: '6px', borderRadius: '3px' }}>
              <div style={{ background: 'white', height: '100%', width: `${totalProgress}%`, borderRadius: '3px' }} />
            </div>
          </IonCardContent>
        </IonCard>

        <IonSegment value={filter} onIonChange={e => setFilter(e.detail.value as string)} mode="ios">
          <IonSegmentButton value="Todas"><IonLabel>Todas</IonLabel></IonSegmentButton>
          <IonSegmentButton value="Curto Prazo"><IonLabel>Curto</IonLabel></IonSegmentButton>
          <IonSegmentButton value="Médio Prazo"><IonLabel>Médio</IonLabel></IonSegmentButton>
          <IonSegmentButton value="Longo Prazo"><IonLabel>Longo</IonLabel></IonSegmentButton>
        </IonSegment>

        <IonGrid>
          <IonRow>
            {filteredGoals.map((goal, index) => (
              <IonCol size="12" key={index}>
                <IonCard style={{ background: '#1e1e1e', color: 'white', borderRadius: '15px' }}>
                  <IonCardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <IonIcon icon={goal.icon} style={{ fontSize: '30px', marginRight: '15px', color: goal.color }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ fontWeight: 'bold', margin: 0 }}>{goal.name}</h3>
                        <span style={{ fontSize: '0.8rem', color: goal.color }}>
                          {Math.round(goal.progress)}%
                        </span>
                      </div>

                      <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{goal.category}</p>

                      <div style={{ background: '#333', height: '6px', borderRadius: '3px', margin: '5px 0' }}>
                        <div style={{ background: goal.color, height: '100%', width: `${goal.progress}%`, borderRadius: '3px' }} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span>Atual: <strong>R$ {goal.current.toLocaleString()}</strong></span>
                        <span>Meta: <strong>R$ {goal.target.toLocaleString()}</strong></span>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <AddGoalModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          onAddGoal={handleAddGoal}
        />

      </IonContent>
    </IonPage>
  );
};

export default Goals;