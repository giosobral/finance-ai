"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/app/_components/ui/dialog";

import { Bot, Loader2 } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  month: string;
  userCanUseAiReport?: boolean;
}

const AiReportButton = ({ month, userCanUseAiReport }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          Relatório IA
          <Bot />
        </Button>
      </DialogTrigger>
      {userCanUseAiReport ? (
        <>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Relatório de IA(Teste)</DialogTitle>
              <DialogDescription>
                Use a Inteligência Artificial para obter um relatório sobre suas
                finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" className="rounded-full">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="rounded-full"
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    {"Gerando Relatório..."}
                  </>
                ) : (
                  "Gerar Relatório"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Relatório de IA(Teste)</DialogTitle>
              <DialogDescription>
                Você Precisa de assinar o Plano premium para gerar relatórios
                com IA
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" className="rounded-full">
                  Cancelar
                </Button>
              </DialogClose>
              <Button className="rounded-full" asChild>
                <Link href="/subscription">Assinar Plano premium</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default AiReportButton;
