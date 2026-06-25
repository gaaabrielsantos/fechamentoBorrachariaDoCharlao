# 🏗️ Documentação de Arquitetura e Extensibilidade

## Visão Geral da Arquitetura

O projeto segue uma arquitetura modular e em camadas, facilitando manutenção e expansão futura.

```
┌─────────────────────────────────────────────────────────────┐
│                        App (Raiz)                           │
│                     (Coordenação)                           │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
    ┌─────────┐         ┌──────────────┐
    │ HomePage│         │  EditorPage  │
    └─────────┘         └──────────────┘
        │                     │
        │              ┌──────┴──────┐
        │              │             │
        ▼              ▼             ▼
    Components    Components   Services
    ┌─────────────────────┐
    │ • Header            │
    │ • MonthForm         │
    │ • DayBlock          │
    │ • ServiceCard       │
    │ • ServiceForm       │
    │ • SummaryPanel      │
    │ • ReportPreview     │
    └─────────────────────┘
           │
           ▼
    ┌──────────────────┐
    │ Utils & Services │
    │ • Currency       │
    │ • Date           │
    │ • Totals         │
    │ • Storage        │
    └──────────────────┘
```

## Camadas da Aplicação

### 1. **Camada de Apresentação (Components)**

Componentes React reutilizáveis e isolados:

- **Header.tsx**: Navegação e título
- **MonthForm.tsx**: Formulário de criação
- **DayBlock.tsx**: Container de um dia
- **ServiceCard.tsx**: Card individual de serviço
- **ServiceForm.tsx**: Formulário de entrada de serviço
- **SummaryPanel.tsx**: Painel de estatísticas
- **ReportPreview.tsx**: Modal de visualização

**Características:**
- Props bem definidas
- Estados locais com useState
- Funções callback para ações
- Sem lógica de negócio

### 2. **Camada de Páginas (Pages)**

Páginas que orquestram componentes:

- **Home.tsx**: Listagem de fechamentos (CRUD base)
- **Editor.tsx**: Edição de um fechamento

**Características:**
- Gerenciam estado da página
- Coordenam múltiplos componentes
- Chamam utils e services
- Tratam navegação

### 3. **Camada de Negócio (Utils & Services)**

Funções reutilizáveis independentes:

- **currency.ts**: Formatação e parsing de valores
- **date.ts**: Cálculos e validações de datas
- **totals.ts**: Cálculos de somas e estatísticas
- **storage.ts**: Persistência de dados

**Características:**
- Sem dependência de React
- Fáceis de testar
- Reutilizáveis em outras partes
- Lógica pura

### 4. **Camada de Tipos (Types)**

Definições TypeScript centralizadas:

```typescript
interface ServiceItem { ... }
interface DayGroup { ... }
interface MonthlyClosing { ... }
```

## Fluxo de Dados

### 1. Criação de Fechamento

```
App
 ├─ HomePage
 │  ├─ MonthForm (input)
 │  └─ saveClosing() ──→ Storage
 └─ onSelectClosing() → EditorPage
```

### 2. Adição de Serviço

```
EditorPage (state currentClosing)
 └─ DayBlock
    └─ ServiceForm (input)
       └─ onAddService(dayId, service)
          ├─ Adiciona ao state
          ├─ saveClosing() → Storage
          └─ Re-render com novo total
```

### 3. Cálculo de Totais

```
EditorPage/SummaryPanel
 └─ getClosingStats(closing)
    ├─ calculateMonthlyTotal()
    ├─ countTotalServices()
    ├─ countDaysWithServices()
    └─ Retorna ClosingStats
```

## Como Estender o Projeto

### Adicionar Nova Funcionalidade

#### 1. Adicionar Campo a um Serviço

**Passo 1**: Atualizar tipo
```typescript
// src/types/index.ts
interface ServiceItem {
  id: string;
  vehicle: string;
  plate: string;
  value: number;
  description: string;
  category?: string;  // ← Novo campo
}
```

**Passo 2**: Atualizar formulário
```typescript
// src/components/ServiceForm.tsx
const [category, setCategory] = useState('');

// Adicionar input
<input value={category} onChange={(e) => setCategory(e.target.value)} />

// Atualizar submit
const newService: ServiceItem = {
  ...
  category: category.trim(),
};
```

**Passo 3**: Atualizar card
```typescript
// src/components/ServiceCard.tsx
<span className="service-category">{service.category}</span>
```

#### 2. Adicionar Nova Página

**Passo 1**: Criar página
```typescript
// src/pages/Statistics.tsx
const StatisticsPage: React.FC<{ closing: MonthlyClosing }> = ({ closing }) => {
  return <div>Página de estatísticas</div>;
};

export default StatisticsPage;
```

**Passo 2**: Exportar
```typescript
// src/pages/index.ts
export { default as StatisticsPage } from './Statistics';
```

**Passo 3**: Integrar em App
```typescript
// src/App.tsx
const [page, setPage] = useState<'home' | 'editor' | 'stats'>('home');

// Adicionar rota
{page === 'stats' && <StatisticsPage closing={currentClosing} />}
```

#### 3. Integrar com API/Backend

**Passo 1**: Criar serviço
```typescript
// src/services/api.ts
const API_URL = 'https://api.exemplo.com';

export const fetchClosings = async () => {
  const response = await fetch(`${API_URL}/closings`);
  return response.json();
};

export const saveClosingToAPI = async (closing: MonthlyClosing) => {
  const response = await fetch(`${API_URL}/closings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(closing),
  });
  return response.json();
};
```

**Passo 2**: Atualizar storage
```typescript
// src/utils/storage.ts (modificado)
export const saveClosing = async (closing: MonthlyClosing) => {
  try {
    // Tentar salvar na API
    await saveClosingToAPI(closing);
  } catch {
    // Fallback para LocalStorage
    const closings = loadClosings();
    // ...
  }
};
```

#### 4. Adicionar Filtros/Busca

**Passo 1**: Adicionar estado
```typescript
// src/pages/Home.tsx
const [searchTerm, setSearchTerm] = useState('');

const filteredClosings = closings.filter(c =>
  c.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

**Passo 2**: Adicionar input
```typescript
<input
  type="text"
  placeholder="Buscar fechamento..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

#### 5. Adicionar Exportação em Excel

**Passo 1**: Instalar biblioteca
```bash
npm install xlsx
```

**Passo 2**: Criar utilitário
```typescript
// src/utils/export.ts
import * as XLSX from 'xlsx';

export const exportToExcel = (closing: MonthlyClosing) => {
  const ws = XLSX.utils.json_to_sheet(closing.days);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, closing.month);
  XLSX.writeFile(wb, `${closing.title}.xlsx`);
};
```

**Passo 3**: Usar em ReportPreview
```typescript
<button onClick={() => exportToExcel(closing)}>
  📥 Exportar Excel
</button>
```

## Padrões de Código

### 1. Nomeação de Componentes
- PascalCase para componentes: `ServiceCard.tsx`
- camelCase para funções: `calculateDayTotal()`
- UPPER_CASE para constantes: `API_URL`

### 2. Props Types
```typescript
interface ComponentProps {
  // Dados
  data: DataType;
  // Callbacks
  onAction: (param: Type) => void;
  // Estado
  isLoading?: boolean;
}
```

### 3. Estados Locais
```typescript
const [data, setData] = useState<Type>(initialValue);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### 4. Efeitos Colaterais
```typescript
useEffect(() => {
  // Código
}, [dependency]); // Sempre incluir dependências!
```

### 5. Funções Utilitárias
```typescript
// src/utils/example.ts
export const myFunction = (param: Type): ReturnType => {
  // Implementação pura
  return result;
};
```

## Boas Práticas

### ✅ Fazer
- ✅ Separar responsabilidades
- ✅ Usar tipos TypeScript
- ✅ Componentes pequenos e focados
- ✅ Reutilizar componentes
- ✅ Comentar lógica complexa
- ✅ Validar dados de entrada
- ✅ Tratar erros
- ✅ Testar componentes isolados

### ❌ Evitar
- ❌ Lógica de negócio em componentes
- ❌ `any` type (use `unknown` se necessário)
- ❌ Props aninhadas muito profundas (prop drilling)
- ❌ Estados não relacionados no mesmo useState
- ❌ Componentes gigantes
- ❌ Dependências circulares
- ❌ Mutations diretas de estado

## Testes (Futura Implementação)

### Estrutura Sugerida
```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
├── utils/
│   ├── currency.ts
│   └── currency.test.ts
```

### Exemplo de Teste
```typescript
// src/utils/__tests__/currency.test.ts
import { formatCurrency, parseCurrency } from '../currency';

describe('currency', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(110)).toBe('R$ 110,00');
  });

  it('should parse currency correctly', () => {
    expect(parseCurrency('R$ 110,00')).toBe(110);
  });
});
```

## Performance

### Otimizações Implementadas
- ✅ CSS-in-JS evitado (uso de CSS puro)
- ✅ Re-renders minimizados (componentes isolados)
- ✅ Sem bundle bloated (dependências mínimas)
- ✅ Lazy loading possível (arquivos pequenos)

### Possíveis Melhorias
- [ ] React.memo para componentes puros
- [ ] useMemo para cálculos pesados
- [ ] useCallback para callbacks estáveis
- [ ] Code splitting de páginas
- [ ] Infinite scroll para muitos fechamentos

## Segurança

### Já Implementado
- ✅ Validação de inputs
- ✅ Sanitização de valores
- ✅ Sem execução de código dinâmico

### Considerar para Produção
- [ ] HTTPS obrigatório
- [ ] CORS configurado
- [ ] Rate limiting na API
- [ ] Autenticação de usuário
- [ ] Criptografia de dados sensíveis

## Deploy

### Ambientes

**Desenvolvimento**
```bash
npm run dev
```

**Build de Produção**
```bash
npm run build
```

**Preview Pré-deploy**
```bash
npm run preview
```

### Deploy para Vercel
```bash
npm install -g vercel
vercel
```

### Deploy para Netlify
```bash
npm run build
# Arraste a pasta 'dist' para Netlify
```

---

**Última atualização**: Junho 2024
