import React from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from "lucide-react";
import { toast } from 'sonner';

type DataRow = {
  date: string;
  category: string;
  payee: string;
  amount: number;
  notes: string;
  account: string;
};

type Props = {
  data: {
    date: string;
    category: string | null; 
    payee: string;
    amount: number;
    notes: string | null; 
    account: string;
  }[];
};

export const ExportButton = ({ data }: Props) => {
  const disabled = data.length === 0;

  const filterColumns = () => {
    const selectedColumns = ["date", "category", "payee", "amount", "notes", "account"];

    const filteredData: Partial<DataRow>[] = data.map(row => {
      const filteredRow: Partial<DataRow> = {};
      selectedColumns.forEach(col => {
        filteredRow[col as keyof DataRow] = row[col as keyof typeof row] as any;
      });
      return filteredRow;
    });

    const csvContent = Papa.unparse(filteredData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    saveAs(blob, 'Exported_SpreadSheet.csv');
  };

  return (
    <Button onClick={filterColumns} size="sm" className="w-full lg:w-auto" disabled={disabled}>
      <DownloadIcon className="size-4 mr-2" />
      Export
    </Button>
  );
};
