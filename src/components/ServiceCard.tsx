import { useState } from 'react';
import type { ServiceItem, ServiceType } from '../types';
import { formatCurrencyBRL } from '../utils/currency';
import { formatSelectedServiceLabel } from '../utils/serviceDescription';
import ServiceForm from './ServiceForm';

interface ServiceCardProps {
  service: ServiceItem;
  serviceTypes: ServiceType[];
  onEdit: (service: ServiceItem) => void;
  onDelete: (id: string) => void;
}

export default function ServiceCard({ service, serviceTypes, onEdit, onDelete }: ServiceCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <ServiceForm
        serviceTypes={serviceTypes}
        initial={service}
        submitLabel="Atualizar serviço"
        onSave={(updated) => {
          onEdit(updated);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <article className="service-row-card">
      <div>
        <span className="service-row-label">Veiculo</span>
        <strong>{service.vehicle || '-'}</strong>
      </div>
      <div>
        <span className="service-row-label">Placa</span>
        <strong>{service.plate || '-'}</strong>
      </div>
      <div>
        <span className="service-row-label">Descrição</span>
        <p>{service.description || '-'}</p>
      </div>
      <div>
        <span className="service-row-label">Itens</span>
        <p>
          {service.selectedServices.length > 0
            ? service.selectedServices.map((item) => formatSelectedServiceLabel(item)).join(' + ')
            : '-'}
        </p>
      </div>
      <div>
        <span className="service-row-label">Valor</span>
        <strong>{formatCurrencyBRL(service.value)}</strong>
      </div>
      <div className="service-row-actions">
        <button type="button" className="btn btn-ghost" onClick={() => setIsEditing(true)}>
          Editar
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(service.id)}>
          Excluir
        </button>
      </div>
    </article>
  );
}
