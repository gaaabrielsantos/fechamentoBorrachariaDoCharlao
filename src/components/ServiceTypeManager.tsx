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
    name: 'Alinhamento',
    nameSingular: 'alinhamento',
    namePlural: 'alinhamentos',
    unitValue: 80,
  },
  {
    id: crypto.randomUUID(),
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
    unitValue: 20,
  },
  {
    id: crypto.randomUUID(),
    name: 'Retirada de engate',
    nameSingular: 'retirada de engate',
    namePlural: 'retiradas de engate',
    unitValue: 35,
  },
  {
    id: crypto.randomUUID(),
    name: 'Rodizio de pneus e rodas',
    nameSingular: 'rodízio de pneus e rodas',
    namePlural: 'rodízios de pneus e rodas',
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
    const name = serviceName.trim();
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
          const name = value.trim();
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
          onChange={(event) => setServiceName(event.target.value)}
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
        <button type="button" className="btn btn-secondary" onClick={addType}>
          Adicionar tipo
        </button>
      </div>

      <div className="service-type-manager-list">
        {serviceTypes.map((serviceType) => (
          <div className="service-type-manager-row" key={serviceType.id}>
            <input
              value={serviceType.nameSingular ?? serviceType.name}
              onChange={(event) => editType(serviceType.id, 'name', event.target.value)}
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
