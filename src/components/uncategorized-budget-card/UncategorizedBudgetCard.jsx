import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from '../../contexts/BudgetContext';
import BudgetCard from '../budget-card/BudgetCard';

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID)?.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return <BudgetCard name='uncategorized' amount={amount} gray {...props} />;
};

export default UncategorizedBudgetCard;
