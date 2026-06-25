# 📋 Fechamento Mensal - Sistema de Controle de Serviços

Um webapp moderno para controle de fechamento mensal de serviços, desenvolvido com React e TypeScript. Substitui planilhas manuais por uma interface interativa com persistência local e relatórios automáticos.

## 🎯 Funcionalidades

- ✅ **Criar fechamentos mensais** com período e mês de referência
- ✅ **Adicionar dias** ao fechamento
- ✅ **Gerenciar serviços** com veículo, placa, valor e descrição
- ✅ **Cálculos automáticos** de totais por dia e mensal
- ✅ **Interface moderna em cards** editáveis e responsivos
- ✅ **Relatório visual** pronto para impressão/PDF
- ✅ **Persistência local** com LocalStorage
- ✅ **Design responsivo** para desktop e mobile
- ✅ **Validações** de dados e formatos

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação

1. **Clone o repositório ou navegue até a pasta do projeto:**
```bash
cd FechamentoJobinho
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse no navegador:**
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
```

A aplicação será compilada em `/dist` pronta para deploy.

## 📁 Estrutura do Projeto

```
FechamentoJobinho/
├── src/
│   ├── components/          # Componentes React reutilizáveis
│   │   ├── Header.tsx       # Cabeçalho da aplicação
│   │   ├── MonthForm.tsx    # Formulário de criação do fechamento
│   │   ├── DayBlock.tsx     # Bloco visual de um dia
│   │   ├── ServiceCard.tsx  # Card de um serviço
│   │   ├── ServiceForm.tsx  # Formulário de adição de serviço
│   │   ├── SummaryPanel.tsx # Painel de resumo/estatísticas
│   │   ├── ReportPreview.tsx# Visualização do relatório
│   │   └── index.ts         # Exports dos componentes
│   │
│   ├── pages/               # Páginas da aplicação
│   │   ├── Home.tsx         # Página inicial com listagem
│   │   ├── Editor.tsx       # Página de edição do fechamento
│   │   └── index.ts         # Exports das páginas
│   │
│   ├── types/               # Tipos TypeScript
│   │   └── index.ts         # Definições de tipos (ServiceItem, DayGroup, MonthlyClosing)
│   │
│   ├── utils/               # Funções utilitárias
│   │   ├── currency.ts      # Formatação de moeda brasileira
│   │   ├── date.ts          # Funções para datas e dias da semana
│   │   ├── totals.ts        # Cálculos de totais e estatísticas
│   │   ├── storage.ts       # Gerenciamento de LocalStorage
│   │   └── index.ts         # Exports de utilitários
│   │
│   ├── styles/              # Estilos CSS
│   │   ├── global.css       # Estilos globais e reset
│   │   ├── components.css   # Estilos dos componentes
│   │   └── pages.css        # Estilos das páginas
│   │
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Ponto de entrada
│
├── index.html               # HTML base
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração TypeScript
├── tsconfig.node.json       # Configuração TypeScript para Vite
├── vite.config.ts           # Configuração do Vite
├── .gitignore               # Git ignore
└── README.md                # Este arquivo
```

## 💡 Como Usar

### 1. Criar um Fechamento
1. Clique em "Começar" na página inicial
2. Preencha o nome do fechamento (ex: "Jobinho")
3. Informe o período (ex: "01/09 à 30/09")
4. Especifique o mês (ex: "Setembro")
5. Clique em "Criar Fechamento"

### 2. Adicionar Dias
1. Na página de edição, informe a data em formato DD/MM
2. Clique em "+ Adicionar Dia"
3. O sistema automaticamente identifica o dia da semana

### 3. Adicionar Serviços
1. Dentro de cada dia, clique em "+ Adicionar Serviço"
2. Preencha os dados:
   - **Veículo**: Modelo do veículo (obrigatório)
   - **Placa**: Placa do veículo (opcional, use "-" se não houver)
   - **Valor**: Valor do serviço em reais (obrigatório)
   - **Descrição**: Detalhes do serviço realizado
3. Clique em "+ Adicionar Serviço"

### 4. Editar Serviços
1. Clique no botão "✎ Editar" de um serviço
2. Modifique os dados conforme necessário
3. Clique em "✓" para salvar ou "✕" para cancelar

### 5. Visualizar Relatório
1. Clique em "📊 Visualizar Relatório" no painel lateral
2. Revise todos os dados organizados
3. Clique em "🖨 Imprimir" para gerar PDF ou impressão

## 🎨 Design e Interface

### Paleta de Cores
- **Azul**: #2563eb (Primário)
- **Verde**: #059669 (Destaque de valores)
- **Vermelho**: #ef4444 (Ações destrutivas)
- **Cinza**: #6b7280 (Secundário)
- **Fundo**: #f5f7fa

### Componentes Principais
- **Cards editáveis**: Interface intuitiva para edição inline
- **Painel lateral**: Resumo automático com estatísticas
- **Day Blocks**: Agrupamento visual por dia
- **Relatório modal**: Visualização de impressão profissional

## 📊 Dados e Persistência

Todos os dados são salvos automaticamente em **LocalStorage** do navegador. 

### Chaves de Storage
- `fechamento_jobinho_closings`: Lista de todos os fechamentos
- `fechamento_jobinho_current`: Fechamento atualmente editado

### Estrutura de Dados

```typescript
interface MonthlyClosing {
  id: string;
  title: string;              // Ex: "Jobinho"
  period: string;             // Ex: "01/09 à 30/09"
  month: string;              // Ex: "Setembro"
  days: DayGroup[];
  createdAt: string;          // ISO date
  updatedAt: string;          // ISO date
}

interface DayGroup {
  id: string;
  date: string;              // Formato: "DD/MM"
  weekday: string;           // Ex: "Segunda-feira"
  services: ServiceItem[];
}

interface ServiceItem {
  id: string;
  vehicle: string;           // Ex: "Prisma"
  plate: string;             // Ex: "FUY4738" ou "-"
  value: number;             // Em reais (decimal)
  description: string;       // Ex: "2 balanceamentos + alinhamento"
}
```

## 🔄 Migração de Dados

Para migrar dados de uma planilha existente para o sistema:

1. Use o arquivo de exemplo `/src/data/example.json` como referência
2. Exporte os dados da planilha em JSON
3. Adicione os dados ao LocalStorage através do console do navegador:

```javascript
const closings = [
  {
    id: Date.now().toString(),
    title: "Jobinho",
    period: "01/09 à 30/09",
    month: "Setembro",
    days: [/* ... */],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
localStorage.setItem('fechamento_jobinho_closings', JSON.stringify(closings));
```

## 🛠️ Desenvolvimento

### Adicionar Novos Componentes
1. Crie o arquivo em `src/components/NovoComponente.tsx`
2. Defina os props em TypeScript
3. Exporte em `src/components/index.ts`
4. Importe onde necessário

### Adicionar Novos Utilitários
1. Crie o arquivo em `src/utils/novo-util.ts`
2. Exporte as funções em `src/utils/index.ts`

### Modificar Estilos
- **Global**: `src/styles/global.css`
- **Componentes**: `src/styles/components.css`
- **Páginas**: `src/styles/pages.css`

### Substituir LocalStorage por API/Banco de Dados
Todos os acessos ao storage estão em `src/utils/storage.ts`. Basta substituir as funções:
- `saveClosings()` → chamada POST/PUT
- `loadClosings()` → chamada GET
- `saveCurrentClosing()` → sessão do servidor
- `loadCurrentClosing()` → sessão do servidor

## 📱 Suporte a Navegadores

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## 📝 Formatos Aceitos

### Valor
- Aceita números decimais (ex: 110.00, 110,00)
- Formatado automaticamente em R$ (ex: R$ 110,00)

### Data
- Formato: DD/MM (ex: 02/09, 31/12)
- Validação automática de dias e meses
- Dias da semana calculados automaticamente

### Placa
- Sem limite de caracteres
- Aceita "-" quando não houver placa
- Converte para maiúsculas automaticamente

## 🐛 Troubleshooting

### Dados não são salvos
- Verifique se o navegador permite LocalStorage
- Tente limpar cache e cookies
- Verifique se o modo incógnito está ativado (não suporta persistência)

### Cálculos incorretos
- Recarregue a página
- Verifique o formato dos valores

### Layout desalinhado em mobile
- Verifique a viewport no HTML
- Teste em diferentes resoluções

## 📄 Licença

Este projeto é fornecido como exemplo educacional.

## 👨‍💻 Desenvolvimento

Desenvolvido com:
- **React 18.2** - Biblioteca UI
- **TypeScript 5.2** - Linguagem tipada
- **Vite 5.0** - Build tool rápido
- **CSS3** - Estilos responsivos

## 💬 Suporte

Para dúvidas ou sugestões, verifique o código dos componentes que possuem comentários descritivos.

---

**Versão 1.0.0** | Último atualização: Junho 2024
