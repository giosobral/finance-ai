import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import SummaryCard from "./summary-card";
interface SummaryCardsProps {
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<Wallet />}
        title={"Saldo"}
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<TrendingUp size={16} className="text-money" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDown size={16} className="text-danger" />}
          title="Despesas"
          amount={expensesTotal}
        />
        <SummaryCard
          icon={<PiggyBank size={16} />}
          title="Investimento"
          amount={investmentsTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
