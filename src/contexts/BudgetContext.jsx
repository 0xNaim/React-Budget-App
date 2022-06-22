import { createContext, useContext } from 'react';
import shortid from 'shortid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export const useBudgets = () => useContext(BudgetsContext);

export const BudgetsProveder = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const getBudgetExpenses = (budgetId) => {
    return expenses?.filter((expense) => expense.budgetId === budgetId);
  };

  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets?.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: shortid.generate(), name, max }];
    });
  };

  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: shortid.generate(), description, amount, budgetId },
      ];
    });
  };

  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses?.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets) => {
      return prevBudgets?.filter((budget) => budget.id !== id);
    });
  };

  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses?.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
