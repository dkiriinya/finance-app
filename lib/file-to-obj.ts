import axios from 'axios';

type Transaction = {
    date: Date;
    payee: string;
    amount: number;
};

type TransactionResult = {
    transactions: Transaction[];
    isSuccess: boolean;
};

type Props = {
    fileUrl: string;
};

export const extractTransactionsFromFile = async ({ fileUrl }: Props): Promise<TransactionResult> => {
    try {
        const response = await axios.get(fileUrl);
        const fileContent: string = response.data;

        
        const datePattern = /\b(\d{4}-\d{2}-\d{2})\s\d{2}:\d{2}:\d{2}\b/;
        const amountPattern = /([+-]?\d{1,3}(,\d{3})*(\.\d{2}))/g; 
        const completedPattern = /\bCompleted\b/; 
        const disclaimerPattern = /Disclaimer:.*?Balance/g; 

       
        const lines = fileContent.split('\n');

        const transactions: Transaction[] = [];
        let currentTransaction: Transaction | null = null;

        const pushTransaction = () => {
            if (currentTransaction && currentTransaction.payee && currentTransaction.amount) {
                currentTransaction.payee = currentTransaction.payee.replace(disclaimerPattern, '').trim();
                transactions.push({ ...currentTransaction });
            }
            currentTransaction = null;
        };

        lines.forEach((line: string) => {
            const dateMatch = line.match(datePattern);
            const amountMatch = line.match(amountPattern);

            if (dateMatch && amountMatch) {
                pushTransaction();

                const payeePart = line.split(dateMatch[0])[1]
                    .split(amountMatch[0])[0].replace(completedPattern, '').trim();

                const cleanedAmount = amountMatch[0].replace(/,/g, '');
                currentTransaction = {
                    date:new Date(`${dateMatch[1]} 00:00:00`),
                    payee: payeePart, 
                    amount: parseFloat(cleanedAmount), 
                };
            } else if (currentTransaction && !dateMatch && !amountMatch) {
                currentTransaction.payee += ' ' + line.trim();
            }
        });
        pushTransaction();
        return {transactions,isSuccess:true};
    } catch (err) {
        console.error("Error fetching file:", err);
        throw err; 
    }
};

