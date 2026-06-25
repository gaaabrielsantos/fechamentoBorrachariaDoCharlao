import { useEffect, useState } from 'react';
import type { MonthlyClosing, SavedClosingRef, ServiceType } from './types';
import Header from './components/Header';
import HomePage from './pages/Home';
import HistoryPage from './pages/History';
import {
  deleteMonthlyClosing,
  listSavedClosings,
  loadMonthlyClosing,
  monthNameToNumber,
  monthNumberToName,
  updateMonthlyClosing,
  saveServiceTypes,
  loadServiceTypes,
} from './utils/monthlyStorage';
import { buildDefaultServiceTypes } from './components/ServiceTypeManager';
import './styles/global.css';
import './styles/themes.css';
import './styles/layout.css';
import './styles/header.css';
import './styles/forms.css';
import './styles/services.css';
import './styles/report.css';
import './styles/history.css';
import './styles/responsive.css';
import './styles/print.css';

type AppRoute = 'home' | 'history';

const defaultClosing = (year = new Date().getFullYear(), month = new Date().getMonth() + 1): MonthlyClosing => ({
  id: crypto.randomUUID(),
  title: 'Jobinho',
  periodStart: '',
  periodEnd: '',
  month: monthNumberToName(month),
  year,
  days: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const parsePath = (pathName: string): { route: AppRoute; year?: number; month?: number } => {
  const normalized = pathName.replace(/\/+$/, '') || '/';

  if (normalized === '/historicos') {
    return { route: 'history' };
  }

  const editMatch = normalized.match(/^\/fechamento\/(\d{4})\/(\d{1,2})$/);
  if (editMatch) {
    const year = Number.parseInt(editMatch[1], 10);
    const month = Number.parseInt(editMatch[2], 10);
    if (year >= 2020 && month >= 1 && month <= 12) {
      return { route: 'home', year, month };
    }
  }

  return { route: 'home' };
};

const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
};

export default function App() {
  const [route, setRoute] = useState<AppRoute>(parsePath(window.location.pathname).route);
  const [closing, setClosing] = useState<MonthlyClosing>(defaultClosing());
  const [savedClosings, setSavedClosings] = useState<SavedClosingRef[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);

  useEffect(() => {
    const loadFromPath = () => {
      const parsed = parsePath(window.location.pathname);
      setRoute(parsed.route);

      if (parsed.route === 'home') {
        const now = new Date();
        const year = parsed.year ?? now.getFullYear();
        const month = parsed.month ?? now.getMonth() + 1;
        const saved = loadMonthlyClosing(year, month);
        setClosing(saved ?? defaultClosing(year, month));
      }
    };

    loadFromPath();
    window.addEventListener('popstate', loadFromPath);

    const loadedTypes = loadServiceTypes();
    if (loadedTypes.length === 0) {
      const defaults = buildDefaultServiceTypes();
      setServiceTypes(defaults);
      saveServiceTypes(defaults);
    } else {
      setServiceTypes(loadedTypes);
    }

    setSavedClosings(listSavedClosings());

    return () => {
      window.removeEventListener('popstate', loadFromPath);
    };
  }, []);

  const handleChange = (next: MonthlyClosing) => {
    const normalized: MonthlyClosing = {
      ...next,
      createdAt: next.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setClosing(normalized);
    updateMonthlyClosing(normalized);
    setSavedClosings(listSavedClosings());
  };

  const resetCurrentMonth = () => {
    const month = monthNameToNumber(closing.month);
    deleteMonthlyClosing(closing.year, month);
    setClosing(defaultClosing(closing.year, month));
    setSavedClosings(listSavedClosings());
  };

  const handleOpenMonth = (year: number, month: number) => {
    const found = loadMonthlyClosing(year, month);
    setClosing(found ?? defaultClosing(year, month));
    setRoute('home');
    navigateTo(`/fechamento/${year}/${month}`);
  };

  const handleDeleteMonth = (year: number, month: number) => {
    const confirmed = window.confirm('Tem certeza de que deseja excluir este fechamento? Essa ação não poderá ser desfeita.');
    if (!confirmed) return;

    deleteMonthlyClosing(year, month);
    setSavedClosings(listSavedClosings());
    if (closing.year === year && closing.month === monthNumberToName(month)) {
      setClosing(defaultClosing(year, month));
    }

    if (window.location.pathname.includes(String(year)) && window.location.pathname.includes(String(month))) {
      navigateTo('/historicos');
      setRoute('history');
    }
  };

  const handleServiceTypesChange = (next: ServiceType[]) => {
    setServiceTypes(next);
    saveServiceTypes(next);
  };

  const goToHome = () => {
    navigateTo('/');
    setRoute('home');
  };

  return (
    <main className="app-container">
      <div className="no-print">
        <Header closing={closing} />
      </div>

      <div className="page-wrapper">
        <div className="content-container">
          {route === 'home' ? (
            <HomePage
              closing={closing}
              serviceTypes={serviceTypes}
              onServiceTypesChange={handleServiceTypesChange}
              onChange={handleChange}
              onResetCurrentMonth={resetCurrentMonth}
            />
          ) : (
            <HistoryPage
              savedClosings={savedClosings}
              onEdit={handleOpenMonth}
              onDelete={handleDeleteMonth}
              onGoToNew={goToHome}
            />
          )}
        </div>
      </div>
    </main>
  );
}
