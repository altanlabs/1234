import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Invoice {
  [key: string]: unknown;
}

interface Provider {
  IdFiscal: string;
  IdProveedor: number;
  Nombre: string;
  Subcuenta: string | null;
}

const fieldsOrder = [
  "NombreFiscalEmisor", "IdFiscalEmisor", "IdProveedor", "Subcuenta",
  "Base1", "Cuota1", "Base2", "Cuota2", "Base3", "Cuota3",
  "RetencionIRPF", "Total", "Tipo"
];

export default function InvoiceEditor() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.altan.ai/galaxia/hook/t2Idrn');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setInvoices(data.facturas || []);
        setProviders(data.proveedores || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProviders(
      providers.filter(provider =>
        provider.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, providers]);

  const handleProviderSelect = (provider: Provider) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[currentIndex]['NombreFiscalEmisor'] = provider.Nombre;
    updatedInvoices[currentIndex]['IdFiscalEmisor'] = provider.IdFiscal;
    updatedInvoices[currentIndex]['IdProveedor'] = provider.IdProveedor;
    updatedInvoices[currentIndex]['Subcuenta'] = provider.Subcuenta || 'NOT FOUND';
    setInvoices(updatedInvoices);
    setSearchTerm("");
  };

  const handleFieldChange = (field: string, value: string) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[currentIndex][field] = value;
    setInvoices(updatedInvoices);
  };

  const saveInvoice = async () => {
    const invoice = invoices[currentIndex];
    try {
      const response = await fetch('https://api.altan.ai/galaxia/hook/1YFCnA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoice)
      });
      if (!response.ok) throw new Error('Failed to save invoice');
      const updatedInvoices = invoices.filter((_, index) => index !== currentIndex);
      setInvoices(updatedInvoices);
      if (updatedInvoices.length > 0) {
        setCurrentIndex(Math.min(currentIndex, updatedInvoices.length - 1));
      } else {
        alert('All invoices have been processed.');
      }
    } catch (error: any) {
      alert('Error saving invoice: ' + (error.message || error));
    }
  };

  const isSaveDisabled = () => {
    const invoice = invoices[currentIndex];
    const totalCheck = Math.abs(parseFloat(String(invoice.Total)) - (parseFloat(String(invoice.Base1)) + parseFloat(String(invoice.Base2)) + parseFloat(String(invoice.Base3)) + parseFloat(String(invoice.Cuota1)) + parseFloat(String(invoice.Cuota2)) + parseFloat(String(invoice.Cuota3)) - parseFloat(String(invoice.RetencionIRPF)))) < 0.01;
    const idProveedorValid = /^4\d{6}$/.test(String(invoice.IdProveedor));
    const subcuentaValid = /^6\d{6}$/.test(String(invoice.Subcuenta));
    return !(totalCheck && idProveedorValid && subcuentaValid);
  };

  const displayInvoice = (index: number) => {
    const invoice = invoices[index];
    const computedIVA1 = ((parseFloat(String(invoice.Cuota1)) || 0) / (parseFloat(String(invoice.Base1)) || 1)).toFixed(2);
    const computedIVA2 = ((parseFloat(String(invoice.Cuota2)) || 0) / (parseFloat(String(invoice.Base2)) || 1)).toFixed(2);
    const computedIVA3 = ((parseFloat(String(invoice.Cuota3)) || 0) / (parseFloat(String(invoice.Base3)) || 1)).toFixed(2);
    const computedIRPF = ((parseFloat(String(invoice.RetencionIRPF)) || 0) / (parseFloat(String(invoice.Base1)) || 1)).toFixed(2);
    const totalCheck = Math.abs(parseFloat(String(invoice.Total)) - (parseFloat(String(invoice.Base1)) + parseFloat(String(invoice.Base2)) + parseFloat(String(invoice.Base3)) + parseFloat(String(invoice.Cuota1)) + parseFloat(String(invoice.Cuota2)) + parseFloat(String(invoice.Cuota3)) - parseFloat(String(invoice.RetencionIRPF)))) < 0.01;

    return fieldsOrder.map((field) => {
      const value = String(invoice[field] ?? '');
      const isError = value === '' || value === 'NOT FOUND';
      return (
        <div key={field} className="form-field relative">
          <Label className="text-foreground">{field}</Label>
          <Input
            type="text"
            name={field}
            value={field === 'NombreFiscalEmisor' ? searchTerm || value : value}
            readOnly={false}
            className={`${isError ? 'border-red-500' : ''} bg-background text-foreground`}
            onChange={(e) => field === 'NombreFiscalEmisor' ? setSearchTerm(e.target.value) : handleFieldChange(field, e.target.value)}
          />
          {field === 'NombreFiscalEmisor' && searchTerm && (
            <div className="absolute z-10 bg-gray-800 border border-gray-600 w-full max-h-40 overflow-y-auto">
              {filteredProviders.map(provider => (
                <div
                  key={provider.IdProveedor}
                  className="p-2 cursor-pointer hover:bg-gray-700 text-white"
                  onClick={() => handleProviderSelect(provider)}
                >
                  {provider.Nombre}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }).concat([
      <div key="IVA1" className="computed-field">
        IVA1: {computedIVA1}
      </div>,
      <div key="IVA2" className="computed-field">
        IVA2: {computedIVA2}
      </div>,
      <div key="IVA3" className="computed-field">
        IVA3: {computedIVA3}
      </div>,
      <div key="IRPF" className="computed-field">
        IRPF: {computedIRPF}
      </div>,
      <div key="TotalCheck" className={`computed-field ${!totalCheck ? 'text-red-500' : ''}`}>
        Total Check: {totalCheck ? 'Correct' : 'Incorrect'}
      </div>
    ]);
  };

  if (loading) return <div className="text-center">Cargando...</div>;
  if (invoices.length === 0) return <div className="text-center">No invoices found.</div>;

  return (
    <div className="flex h-screen">
      <div className="flex-1 border-r">
        <iframe
          id="invoice-iframe"
          src={String(invoices[currentIndex]?.DocumentoMarcaAgua ?? "")}
          className="w-full h-full border-none"
        />
      </div>
      <div className="flex-1 p-6 overflow-y-auto bg-gray-900 text-white">
        <div className="flex justify-between mb-4">
          <div className="font-bold text-lg">Factura ID: {String(invoices[currentIndex]?.Id ?? '')}</div>
          <div className="space-x-2">
            <Button onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}>Previous</Button>
            <Button onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, invoices.length - 1))}>Next</Button>
          </div>
        </div>
        <form className="grid grid-cols-2 gap-4">
          {displayInvoice(currentIndex)}
        </form>
        <Button className="mt-4" onClick={saveInvoice} disabled={isSaveDisabled()}>Guardar Factura</Button>
      </div>
    </div>
  );
}
