import type { MonthlyClosing } from '../types';
import ClosingInfoForm from './ClosingInfoForm';

interface MonthFormProps {
  onSubmit: (closing: MonthlyClosing) => void;
  initialData: MonthlyClosing;
}

export default function MonthForm({ onSubmit, initialData }: MonthFormProps) {
  return <ClosingInfoForm closing={initialData} onChange={onSubmit} />;
}
