import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { Circle } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-emerald-950 font-bold text-money hover:bg-emerald-950">
        <Circle className="mr-1 fill-money" size={10} />
        Ganho
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-red-950 font-bold text-danger hover:bg-red-950">
        <Circle className="mr-1 fill-danger" size={10} />
        Gasto
      </Badge>
    );
  }
  return (
    <Badge className="bg-muted text-white hover:bg-muted">
      <Circle className="mr-1 fill-white" size={10} />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
