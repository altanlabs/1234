import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Invoice {
  [key: string]: string | number;
}

const fieldsOrder = [
  "NombreFiscalEmisor", "IdFiscalEmisor", "IdProveedor", "Subcuenta",
  "Base1", "Cuota1", "Base2", "Cuota2", "Base3", "Cuota3",
  "RetencionIRPF", "Total", "Tipo"
];

export default function InvoiceEditor() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.altan.ai/galaxia/hook/t2Idrn');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setInvoices(data.facturas || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const displayInvoice = (index: number) => {
    const invoice = invoices[index];
    return fieldsOrder.map((field) => (
      <div key={field} className="form-field">
        <Label>{field}</Label>
        <Input type="text" name={field} defaultValue={invoice[field]} />
      </div>
    ));
  };

  if (loading) return <div className="text-center">Cargando...</div>;
  if (invoices.length === 0) return <div className="text-center">No invoices found.</div>;

  return (
    <div className="flex h-screen">
      <div className="flex-1 border-r">
        <iframe
          id="invoice-iframe"
          src={invoices[currentIndex]?.DocumentoMarcaAgua || ""}
          className="w-full h-full border-none"
        />
      </div>
      <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <div className="flex justify-between mb-4">
          <div className="font-bold text-lg">Status: {invoices[currentIndex]?.Status}</div>
          <div className="space-x-2">
            <Button onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}>Previous</Button>
            <Button onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, invoices.length - 1))}>Next</Button>
          </div>
        </div>
        <form className="grid grid-cols-2 gap-4">
          {displayInvoice(currentIndex)}
        </form>
        <Button className="mt-4" onClick={() => alert('Invoice saved!')}>Save Invoice</Button>
      </div>
    </div>
  );
}
