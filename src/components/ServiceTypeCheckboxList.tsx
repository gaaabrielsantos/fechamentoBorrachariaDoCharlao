import type { ChangeEvent } from 'react';
import type { SelectedServiceType, ServiceType } from '../types';
import { formatCurrencyBRL } from '../utils/currency';
import { suggestServicePlural } from '../utils/serviceDescription';

interface ServiceTypeCheckboxListProps {
  serviceTypes: ServiceType[];
  selectedServices: SelectedServiceType[];
  onChange: (selected: SelectedServiceType[]) => void;
}

const findSelected = (selectedServices: SelectedServiceType[], serviceTypeId: string) =>
  selectedServices.find((item) => item.serviceTypeId === serviceTypeId);

export default function ServiceTypeCheckboxList({
  serviceTypes,
  selectedServices,
  onChange,
}: ServiceTypeCheckboxListProps) {
  const toggleService = (service: ServiceType, checked: boolean) => {
    if (checked) {
      onChange([
        ...selectedServices,
        {
          serviceTypeId: service.id,
          name: service.name,
          nameSingular: service.nameSingular ?? service.name,
          namePlural: service.namePlural ?? suggestServicePlural(service.name),
          unitValue: service.unitValue,
          quantity: 1,
          subtotal: service.unitValue,
        },
      ]);
      return;
    }

    onChange(selectedServices.filter((item) => item.serviceTypeId !== service.id));
  };

  const changeQuantity = (serviceTypeId: string, event: ChangeEvent<HTMLInputElement>) => {
    const parsed = Number.parseInt(event.target.value, 10);
    const quantity = Number.isFinite(parsed) ? parsed : 0;

    onChange(
      selectedServices.map((item) =>
        item.serviceTypeId === serviceTypeId
          ? {
              ...item,
              quantity,
              subtotal: item.unitValue * quantity,
            }
          : item,
      ),
    );
  };

  return (
    <div className="service-type-list">
      {serviceTypes.length === 0 && <p>Nenhum tipo de serviço cadastrado.</p>}

      {serviceTypes.map((serviceType) => {
        const selected = findSelected(selectedServices, serviceType.id);
        const checked = Boolean(selected);

        return (
          <label key={serviceType.id} className="service-type-row">
            <div className="service-type-main">
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => toggleService(serviceType, event.target.checked)}
              />
              <span className="service-type-name">{serviceType.nameSingular ?? serviceType.name}</span>
            </div>

            <div className="service-type-meta service-type-qty">
              <span className="service-type-meta-label">Quantidade</span>
              <input
                type="number"
                min={1}
                value={selected?.quantity ?? 1}
                disabled={!checked}
                onChange={(event) => changeQuantity(serviceType.id, event)}
              />
            </div>

            <div className="service-type-meta service-type-subtotal">
              <span className="service-type-meta-label">Subtotal</span>
              <strong>{formatCurrencyBRL(selected?.subtotal ?? 0)}</strong>
            </div>
          </label>
        );
      })}
    </div>
  );
}
