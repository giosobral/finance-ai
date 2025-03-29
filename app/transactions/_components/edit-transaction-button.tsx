"use client";

import { Pencil } from "lucide-react";

import { useState } from "react";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Button } from "@/app/_components/ui/button";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setDialogIsOpen(true)}>
        <Pencil />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
