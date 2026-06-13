import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';

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
  addTransaction: (t: Transaction) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('nexfin_transactions');

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
      'nexfin_transactions',
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (t: Transaction) => {
    setTransactions(prev => [t, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        addTransaction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useAppContext deve ser usado dentro de um AppProvider'
    );
  }

  return context;
};