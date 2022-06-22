import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from '../components/budget-card/BudgetCard';
import AddBudgetModal from '../components/budget-modal/AddBudgetModal';
import AddExpenseModal from '../components/expense-modal/AddExpenseModal';
import TotalBudgetCard from '../components/total-budget-card/TotalBudgetCard';
import UncategorizedBudgetCard from '../components/uncategorized-budget-card/UncategorizedBudgetCard';
import ViewExpensesModal from '../components/view-expenses-modal/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetContext';

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <Container>
      <Stack direction={'horizontal'} gap={'2'} className={'my-4'}>
        <h3 className={'me-auto'}>Budgets</h3>
        <Button variant={'primary'} onClick={() => setShowAddBudgetModal(true)}>
          Add Budgets
        </Button>
        <Button variant={'outline-primary'} onClick={openAddExpenseModal}>
          Add Expense
        </Button>
      </Stack>

      {!budgets.length && (
        <div className={'text-center'}>There are no budgets</div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        {budgets?.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
            />
          );
        })}

        <UncategorizedBudgetCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() =>
            setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />
        <TotalBudgetCard />
      </div>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />

      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />

      <ViewExpensesModal
        budgetId={viewExpenseModalBudgetId}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setViewExpenseModalBudgetId()}
      />
    </Container>
  );
};

export default App;
