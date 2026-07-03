<<<<<<< HEAD
import { useMemo, useState } from 'react';
=======
import { useEffect, useMemo, useRef, useState } from 'react';
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
import type { SelectedServiceType, ServiceItem, ServiceType } from '../types';
import { calculateSelectedServicesTotal, generateServiceDescription } from '../utils/serviceDescription';
import ServiceTypeCheckboxList from './ServiceTypeCheckboxList';
import SelectedServiceSummary from './SelectedServiceSummary';

interface ServiceFormProps {
  serviceTypes: ServiceType[];
  initial?: ServiceItem;
  submitLabel?: string;
  onSave: (service: ServiceItem) => void;
  onCancel?: () => void;
}

const emptyService = {
  vehicle: '',
  plate: '',
  description: '',
};

export default function ServiceForm({
  serviceTypes,
  initial,
  onSave,
  onCancel,
  submitLabel = 'Salvar serviço',
}: ServiceFormProps) {
<<<<<<< HEAD
  const [vehicle, setVehicle] = useState(initial?.vehicle ?? emptyService.vehicle);
  const [plate, setPlate] = useState(initial?.plate === '-' ? '' : (initial?.plate ?? emptyService.plate));
=======
  const vehicleInputRef = useRef<HTMLInputElement>(null);
  const [vehicle, setVehicle] = useState((initial?.vehicle ?? emptyService.vehicle).toUpperCase());
  const [plate, setPlate] = useState(
    (initial?.plate === '-' ? '' : (initial?.plate ?? emptyService.plate)).toUpperCase(),
  );
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
  const [selectedServices, setSelectedServices] = useState<SelectedServiceType[]>(initial?.selectedServices ?? []);
  const [description, setDescription] = useState(
    initial?.description ?? generateServiceDescription(initial?.selectedServices ?? []),
  );
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(Boolean(initial));
  const [error, setError] = useState('');

  const totalValue = useMemo(
    () => calculateSelectedServicesTotal(selectedServices),
    [selectedServices],
  );

<<<<<<< HEAD
=======
  useEffect(() => {
    vehicleInputRef.current?.focus();
  }, []);

>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
  const handleSelectedServicesChange = (next: SelectedServiceType[]) => {
    setSelectedServices(next);
    if (!isDescriptionTouched) {
      setDescription(generateServiceDescription(next));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedServices.length === 0) {
      setError('Selecione pelo menos um tipo de serviço.');
      return;
    }

    if (selectedServices.some((item) => item.quantity <= 0)) {
      setError('Quantidade deve ser maior que zero para todos os itens.');
      return;
    }

    if (selectedServices.some((item) => item.unitValue < 0)) {
      setError('Valor unitário não pode ser negativo.');
      return;
    }

    const built: ServiceItem = {
      id: initial?.id ?? crypto.randomUUID(),
<<<<<<< HEAD
      vehicle: vehicle.trim() || '-',
      plate: plate.trim() || '-',
=======
      vehicle: vehicle.trim().toUpperCase() || '-',
      plate: plate.trim().toUpperCase() || '-',
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
      selectedServices,
      value: totalValue,
      description: description.trim() || generateServiceDescription(selectedServices),
    };

    setError('');
    onSave(built);

    if (!initial) {
      setVehicle('');
      setPlate('');
      setSelectedServices([]);
      setDescription('');
      setIsDescriptionTouched(false);
    }
  };

  return (
    <form className="card service-form-card" onSubmit={handleSubmit}>
      <div className="grid-2">
        <div className="field">
          <label htmlFor="service-vehicle">Veiculo</label>
          <input
            id="service-vehicle"
<<<<<<< HEAD
            value={vehicle}
            onChange={(event) => setVehicle(event.target.value)}
=======
            ref={vehicleInputRef}
            className="vehicle-input"
            value={vehicle}
            onChange={(event) => setVehicle(event.target.value.toUpperCase())}
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
            placeholder="Ex.: Prisma, Gol, Civic"
          />
        </div>

        <div className="field">
          <label htmlFor="service-plate">Placa</label>
          <input
            id="service-plate"
<<<<<<< HEAD
=======
            className="plate-input"
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
            value={plate}
            onChange={(event) => setPlate(event.target.value.toUpperCase())}
            placeholder="FUY4738"
          />
        </div>
      </div>

      <ServiceTypeCheckboxList
        serviceTypes={serviceTypes}
        selectedServices={selectedServices}
        onChange={handleSelectedServicesChange}
      />

      <SelectedServiceSummary selectedServices={selectedServices} />

      <div className="field">
        <label htmlFor="service-description">Descrição do serviço</label>
        <textarea
          id="service-description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setIsDescriptionTouched(true);
          }}
          placeholder="Ex.: 2 balanceamentos + alinhamento"
        />
      </div>

      {error && <p className="field-error">{error}</p>}

      <div className="form-actions-row">
        <button type="submit" className="btn btn-primary service-form-submit">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost service-form-cancel" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
