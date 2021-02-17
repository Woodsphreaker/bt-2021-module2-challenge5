import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface BallanceDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): BallanceDTO {
    const balance = this.getBalance();
    const transactions = {
      transactions: this.transactions,
      balance,
    };

    return transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, { value, type }) => {
        acc[type] += value;
        const { income, outcome } = acc;
        acc.total = income - outcome;
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
