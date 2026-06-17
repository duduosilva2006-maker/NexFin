import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonFab,
  IonFabButton,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  home,
  wallet,
  barChart,
  people,
  add,
  informationCircleOutline
} from 'ionicons/icons';

import '@ionic/react/css/core.css';
import './theme/variables.css';

import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import TransactionModal from './components/TransactionModal';
import About from './pages/about';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import AllTransactions from './pages/AllTransactions';
import Goals from './pages/Goals';
import Reports from './pages/Reports';
import Family from './pages/Family';
import ForgotPassword from './pages/ForgotPassword';

import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
setupIonicReact();

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const MainTabs: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <ProtectedRoute exact path="/home" component={Home} />

<ProtectedRoute
  exact
  path="/transactions"
  component={Transactions}
/>

<ProtectedRoute exact path="/reports" component={Reports} />

<ProtectedRoute exact path="/about" component={About} />

<ProtectedRoute exact path="/family" component={Family} />

<ProtectedRoute
  exact
  path="/all-transactions"
  component={AllTransactions}
/>

<ProtectedRoute exact path="/goals" component={Goals} />

<ProtectedRoute exact path="/feed" component={Feed} />

<Route exact path="/">
  <Redirect to="/login" />
</Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="feed" href="/feed">
  <IonIcon icon={barChart} />
  <IonLabel>Feed</IonLabel>
</IonTabButton>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Início</IonLabel>
          </IonTabButton>

          <IonTabButton tab="transactions" href="/transactions">
            <IonIcon icon={wallet} />
            <IonLabel>Gastos</IonLabel>
          </IonTabButton>

          <IonTabButton tab="reports" href="/reports">
            <IonIcon icon={barChart} />
            <IonLabel>Relatórios</IonLabel>
          </IonTabButton>

          <IonTabButton tab="family" href="/family">
  <IonIcon icon={people} />
  <IonLabel>Família</IonLabel>
</IonTabButton>

<IonTabButton tab="about" href="/about">
  <IonIcon icon={informationCircleOutline} />
  <IonLabel>Sobre</IonLabel>
</IonTabButton>
        </IonTabBar>
      </IonTabs>

     <IonFab
  vertical="bottom"
  horizontal="end"
  style={{
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    zIndex: 9999
  }}
>
        <IonFabButton onClick={() => setShowModal(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <TransactionModal
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
      />
    </>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} exact />

      <Route exact path="/home">
        <MainTabs />
      </Route>

      <Route exact path="/transactions">
        <MainTabs />
      </Route>

      <Route exact path="/reports">
        <MainTabs />
      </Route>

      <Route exact path="/family">
        <MainTabs />
      </Route>

      <Route exact path="/all-transactions">
        <MainTabs />
      </Route>

      <Route exact path="/goals">
        <MainTabs />
      </Route>
      <Route exact path="/feed">
  <MainTabs />
</Route>

      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/about">
  <MainTabs />
</Route>
    </IonRouterOutlet>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <IonApp>
          <IonReactRouter>
            <AppRoutes />
          </IonReactRouter>
        </IonApp>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;