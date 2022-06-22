import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';
import { currencyFormatter, getProgressBarVariant } from '../../utils/utils';

const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpenseClick,
}) => {
  const classNames = [];
  if (amount > max) {
    classNames.push('bg-danger', ' bg-opacity-10', 'p-2');
  } else if (gray) {
    classNames.push('bg-light', 'p-2');
  } else {
    classNames.push('p-2');
  }

  return (
    <Card className={classNames.join(' ')}>
      <Card.Body>
        <Card.Title
          className={
            'd-flex justify-content-between align-items-baseline fw-normal mb-3'
          }
        >
          <div className={'me-2'}>{name}</div>
          <div className={'d-flex align-items-baseline'}>
            {currencyFormatter.format(amount)}
            {max && (
              <span className={'text-muted fs-6'}>
                /{currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
      </Card.Body>

      {max && (
        <ProgressBar
          className={'rounded-pill'}
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
      )}

      {!hideButtons && (
        <Stack direction={'horizontal'} gap={'2'} className={'mt-4'}>
          <Button
            variant={'outline-primary'}
            className={'ms-auto'}
            onClick={onAddExpenseClick}
          >
            Add Expense
          </Button>
          <Button onClick={onViewExpenseClick} variant={'outline-secondary'}>
            View Expenses
          </Button>
        </Stack>
      )}
    </Card>
  );
};

export default BudgetCard;
