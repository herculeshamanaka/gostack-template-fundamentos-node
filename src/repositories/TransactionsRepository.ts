import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ListTransactionDTO {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsAndBalanceDTO {
  transactions: ListTransactionDTO[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getTransactions(): TransactionsAndBalanceDTO {
    const values: TransactionsAndBalanceDTO = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return values;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(trans => trans.type === 'income')
      .reduce((sum, trans) => {
        return sum + trans.value;
      }, 0);

    const outcome = this.transactions
      .filter(trans => trans.type === 'outcome')
      .reduce((sum, trans) => {
        return sum + trans.value;
      }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
