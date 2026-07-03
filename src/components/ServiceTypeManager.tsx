import { useState } from 'react';
import type { ServiceType } from '../types';
import { suggestServicePlural } from '../utils/serviceDescription';

interface ServiceTypeManagerProps {
  serviceTypes: ServiceType[];
  onChange: (serviceTypes: ServiceType[]) => void;
}

const defaultTypes: ServiceType[] = [
  {
    id: crypto.randomUUID(),
<<<<<<< HEAD
    name: 'Alinhamento',
    nameSingular: 'alinhamento',
    namePlural: 'alinhamentos',
=======
    name: 'ALINHAMENTO',
    nameSingular: 'ALINHAMENTO',
    namePlural: 'ALINHAMENTOS',
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
    unitValue: 80,
  },
  {
    id: crypto.randomUUID(),
<<<<<<< HEAD
    name: 'Balanceamento',
    nameSingular: 'balanceamento',
    namePlural: 'balanceamentos',
    unitValue: 25,
  },
  {
    id: crypto.randomUUID(),
    name: 'Conserto',
    nameSingular: 'conserto',
    namePlural: 'consertos',
    unitValue: 30,
  },
  {
    id: crypto.randomUUID(),
    name: 'Montagem',
    nameSingular: 'montagem',
    namePlural: 'montagens',
=======
    name: 'BALANCEAMENTO',
    nameSingular: 'BALANCEAMENTO',
    namePlural: 'BALANCEAMENTOS',
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
    unitValue: 20,
  },
  {
    id: crypto.randomUUID(),
<<<<<<< HEAD
    name: 'Retirada de engate',
    nameSingular: 'retirada de engate',
    namePlural: 'retiradas de engate',
=======
    name: 'CONSERTO',
    nameSingular: 'CONSERTO',
    namePlural: 'CONSERTOS',
    unitValue: 30,
  },
  {
    id: crypto.randomUUID(),
    name: 'MONTAGEM',
    nameSingular: 'MONTAGEM',
    namePlural: 'MONTAGENS',
    unitValue: 20,
  },
  {
    id: crypto.randomUUID(),
    name: 'RETIRADA DE ENGATE',
    nameSingular: 'RETIRADA DE ENGATE',
    namePlural: 'RETIRADAS DE ENGATE',
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
    unitValue: 35,
  },
  {
    id: crypto.randomUUID(),
<<<<<<< HEAD
    name: 'Rodizio de pneus e rodas',
    nameSingular: 'rodízio de pneus e rodas',
    namePlural: 'rodízios de pneus e rodas',
=======
    name: 'RODIZIO DE PNEUS E RODAS',
    nameSingular: 'RODIZIO DE PNEUS E RODAS',
    namePlural: 'RODIZIOS DE PNEUS E RODAS',
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
    unitValue: 70,
  },
];

export const buildDefaultServiceTypes = (): ServiceType[] =>
  defaultTypes.map((item) => ({ ...item, id: crypto.randomUUID() }));

export default function ServiceTypeManager({ serviceTypes, onChange }: ServiceTypeManagerProps) {
  const [serviceName, setServiceName] = useState('');
  const [unitValue, setUnitValue] = useState('0');

  const addType = () => {
    const value = Number.parseFloat(unitValue);
<<<<<<< HEAD
    const name = serviceName.trim();
=======
    const name = serviceName.trim().toUpperCase();
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
    if (!name || value < 0) return;

    onChange([
      ...serviceTypes,
      {
        id: crypto.randomUUID(),
        name,
        nameSingular: name,
        namePlural: suggestServicePlural(name),
        unitValue: value,
      },
    ]);

    setServiceName('');
    setUnitValue('0');
  };

  const removeType = (id: string) => onChange(serviceTypes.filter((item) => item.id !== id));

  const editType = (id: string, field: 'name' | 'unitValue', value: string) => {
    onChange(
      serviceTypes.map((item) => {
        if (item.id !== id) return item;

        if (field === 'name') {
<<<<<<< HEAD
          const name = value.trim();
=======
          const name = value.trim().toUpperCase();
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
          return {
            ...item,
            name,
            nameSingular: name,
            namePlural: suggestServicePlural(name),
          };
        }

        const nextValue = Number.parseFloat(value);
        const safe = Number.isNaN(nextValue) ? 0 : Math.max(0, nextValue);
        return { ...item, unitValue: safe };
      }),
    );
  };

  return (
    <div className="service-type-manager">
      <div className="service-type-create-row">
        <input
          value={serviceName}
<<<<<<< HEAD
          onChange={(event) => setServiceName(event.target.value)}
=======
          onChange={(event) => setServiceName(event.target.value.toUpperCase())}
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
          placeholder="Nome do tipo de serviço"
        />
        <input
          type="number"
          min={0}
          step="0.01"
          value={unitValue}
          onChange={(event) => setUnitValue(event.target.value)}
          placeholder="Valor unitário"
        />
<<<<<<< HEAD
        <button type="button" className="btn btn-secondary" onClick={addType}>
          Adicionar tipo
=======
        <button type="button" className="btn add-service-type-button" onClick={addType}>
          + Adicionar tipo
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
        </button>
      </div>

      <div className="service-type-manager-list">
        {serviceTypes.map((serviceType) => (
          <div className="service-type-manager-row" key={serviceType.id}>
            <input
              value={serviceType.nameSingular ?? serviceType.name}
<<<<<<< HEAD
              onChange={(event) => editType(serviceType.id, 'name', event.target.value)}
=======
              onChange={(event) => editType(serviceType.id, 'name', event.target.value.toUpperCase())}
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
              placeholder="Nome do tipo de serviço"
            />
            <input
              type="number"
              min={0}
              step="0.01"
              value={serviceType.unitValue}
              onChange={(event) => editType(serviceType.id, 'unitValue', event.target.value)}
            />
            <button type="button" className="btn btn-danger" onClick={() => removeType(serviceType.id)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
