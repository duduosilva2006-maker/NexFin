import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';

import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

import {
  collection,
  addDoc,
  getDocs
} from 'firebase/firestore';

export interface Transaction {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
  member: string;
  isInstallment: boolean;
}

interface AppContextType {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {

  // 🔧 CORREÇÃO: mover para antes do useState
  const currentUser = JSON.parse(
    localStorage.getItem('nexfin_user_logged') || '{}'
  );

  const STORAGE_KEY =
    `nexfin_transactions_${currentUser.email || 'guest'}`;

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // 🔧 CORREÇÃO: agora STORAGE_KEY existe aqui
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        description: 'Salário',
        amount: 5000,
        type: 'income',
        date: '01/06/2026',
        category: 'Receita',
        member: 'João Silva',
        isInstallment: false
      },
      {
        description: 'Geladeira',
        amount: 180,
        type: 'expense',
        date: '19/06/2026',
        category: 'Outros',
        member: 'Maria Silva',
        isInstallment: false
      },
      {
        description: 'Amazon Prime',
        amount: 14.9,
        type: 'expense',
        date: '14/06/2026',
        category: 'Assinaturas',
        member: 'Maria Silva',
        isInstallment: false
      },
      {
        description: 'Notebook',
        amount: 250,
        type: 'expense',
        date: '14/06/2026',
        category: 'Outros',
        member: 'João Silva',
        isInstallment: false
      },
      {
        description: 'Internet',
        amount: 120,
        type: 'expense',
        date: '10/06/2026',
        category: 'Moradia',
        member: 'João Silva',
        isInstallment: false
      },
      {
        description: 'Escola',
        amount: 800,
        type: 'expense',
        date: '05/06/2026',
        category: 'Educação',
        member: 'Maria Silva',
        isInstallment: false
      },
      {
        description: 'Mercado',
        amount: 600,
        type: 'expense',
        date: '08/06/2026',
        category: 'Alimentação',
        member: 'João Silva',
        isInstallment: false
      },
      {
        description: 'Plano de Saúde',
        amount: 400,
        type: 'expense',
        date: '03/06/2026',
        category: 'Saúde',
        member: 'Maria Silva',
        isInstallment: false
      },
      {
        description: 'Combustível',
        amount: 350,
        type: 'expense',
        date: '07/06/2026',
        category: 'Transporte',
        member: 'João Silva',
        isInstallment: false
      },
      {
        description: 'Cinema',
        amount: 200,
        type: 'expense',
        date: '11/06/2026',
        category: 'Lazer',
        member: 'Maria Silva',
        isInstallment: false
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const auth = getAuth();
        const email = auth.currentUser?.email;

        if (!email) return;

        const snapshot = await getDocs(
          collection(db, `transactions_${email}`)
        );

        const data = snapshot.docs.map(
          doc => doc.data() as Transaction
        );

        if (data.length > 0) {
          setTransactions(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadTransactions();
  }, []);

  const addTransaction = async (t: Transaction) => {
    try {
      const auth = getAuth();
      const email = auth.currentUser?.email;

      if (!email) return;

      await addDoc(
        collection(db, `transactions_${email}`),
        t
      );

      setTransactions(prev => [t, ...prev]);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <AppContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }

  return context;
};