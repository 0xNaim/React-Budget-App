import { useBudgets } from '../../contexts/BudgetContext';
import BudgetCard from '../budget-card/BudgetCard';

const TotalBudgetCard = () => {
  const { budgets, expenses } = useBudgets();
  const amount = expenses?.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets?.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) return null;

  return <BudgetCard name='total' amount={amount} max={max} gray hideButtons />;
};

export default TotalBudgetCard;
