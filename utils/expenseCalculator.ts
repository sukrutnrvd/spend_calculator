import { CalculationResult, ExpenseCalculation, Person } from "@/types";

export const calculateExpenses = (people: Person[]): CalculationResult => {
  if (people.length === 0) {
    return {
      totalExpense: 0,
      averagePerPerson: 0,
      transfers: [],
    };
  }

  const totalExpense = people.reduce((sum, person) => sum + person.expenses, 0);
  const averagePerPerson = totalExpense / people.length;

  // Her kişinin ne kadar fazla veya eksik ödediğini hesapla
  const balances = people.map((person) => ({
    id: person.id,
    name: person.name,
    balance: person.expenses - averagePerPerson,
  }));

  // Pozitif bakiyesi olanlar (fazla ödeyenler)
  const creditors = balances
    .filter((b) => b.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  // Negatif bakiyesi olanlar (eksik ödeyenler)
  const debtors = balances
    .filter((b) => b.balance < 0)
    .sort((a, b) => a.balance - b.balance);

  const transfers: ExpenseCalculation[] = [];

  let creditorIndex = 0;
  let debtorIndex = 0;

  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];

    const transferAmount = Math.min(
      Math.abs(creditor.balance),
      Math.abs(debtor.balance)
    );

    if (transferAmount > 0) {
      transfers.push({
        from: debtor.name,
        to: creditor.name,
        amount: transferAmount,
      });

      creditor.balance -= transferAmount;
      debtor.balance += transferAmount;

      if (Math.abs(creditor.balance) < 0.01) {
        creditorIndex++;
      }
      if (Math.abs(debtor.balance) < 0.01) {
        debtorIndex++;
      }
    } else {
      break;
    }
  }

  return {
    totalExpense,
    averagePerPerson,
    transfers,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(amount);
};
