# ⚡ Quick Start - Guia Rápido de Início

## 1️⃣ Instalação em 3 Passos

### Pré-requisito
- Node.js 16+ (download em https://nodejs.org/)

### Passos

```bash
# 1. Navegue até a pasta do projeto
cd FechamentoJobinho

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O navegador abrirá automaticamente em `http://localhost:5173`

## 2️⃣ Seu Primeiro Fechamento

### Criar

1. Clique em **"Começar"** ou **"+ Novo"**
2. Preencha os dados:
   - Nome: `Jobinho` (ou o nome que desejar)
   - Período: `01/09 à 30/09`
   - Mês: `Setembro`
3. Clique em **"Criar Fechamento"**

### Adicionar Dias

1. Na caixa de entrada "Adicionar Dia", digite: `02/09`
2. Clique em **"+ Adicionar Dia"**
3. O sistema detectará automaticamente "Terça-feira"
4. Repita para mais dias (03/09, 04/09, etc.)

### Adicionar Serviços

1. Dentro de um dia, clique em **"+ Adicionar Serviço"**
2. Preencha:
   - Veículo: `Prisma`
   - Placa: `FUY4738` (deixe em branco ou `-` se não tiver)
   - Valor: `110`
   - Descrição: `2 balanceamentos + alinhamento`
3. Clique em **"+ Adicionar Serviço"**

### Editar

- Clique em **"✎ Editar"** no card do serviço
- Modifique os campos
- Clique em **"✓"** para salvar ou **"✕"** para cancelar

### Deletar

- Clique em **"🗑 Deletar"** no card do serviço

### Relatório

1. Clique em **"📊 Visualizar Relatório"** na barra lateral
2. Revise todos os dados
3. Clique em **"🖨 Imprimir"** para gerar PDF
4. No navegador, use `Ctrl+P` ou `Cmd+P` para salvar como PDF

## 3️⃣ Carregar Dados de Exemplo

Abra o **console do navegador** (`F12` ou `Ctrl+Shift+I`) e execute:

```javascript
// Copiar e colar no console
const exampleData = {
  id: "1725292800000",
  title: "Jobinho",
  period: "01/09 à 30/09",
  month: "Setembro",
  days: [
    {
      id: "1",
      date: "02/09",
      weekday: "Terça-feira",
      services: [
        {
          id: "s1",
          vehicle: "Prisma",
          plate: "FUY4738",
          value: 110,
          description: "2 balanceamentos + alinhamento"
        }
      ]
    },
    {
      id: "2",
      date: "03/09",
      weekday: "Quarta-feira",
      services: [
        {
          id: "s2",
          vehicle: "Focus",
          plate: "PLG7576",
          value: 20,
          description: "1 montagem"
        }
      ]
    }
  ],
  createdAt: "2024-09-01T00:00:00.000Z",
  updatedAt: "2024-09-30T23:59:59.000Z"
};

localStorage.setItem('fechamento_jobinho_closings', JSON.stringify([exampleData]));
localStorage.setItem('fechamento_jobinho_current', JSON.stringify(exampleData));
location.reload();
```

## 4️⃣ Comandos Úteis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 5️⃣ Formatos Corretos

### Data
- Formato: `DD/MM`
- Exemplos: `02/09`, `31/12`, `01/01`

### Valor
- Número decimal: `110`, `110.00`, `110,00`
- Sistema converte automaticamente: `R$ 110,00`

### Placa
- Com placa: `FUY4738`
- Sem placa: `-` ou deixe em branco

## 6️⃣ Troubleshooting

### Erro: "npm: command not found"
- Instale Node.js em https://nodejs.org/
- Reinicie o terminal após instalar

### Porta 5173 já em uso
```bash
# Use outra porta
npm run dev -- --port 3000
```

### Dados não aparecem após atualizar
- Verifique em Ferramentas do Dev (F12) → Application → Local Storage
- Dados devem estar lá com as chaves `fechamento_jobinho_*`

### Layout estranho no mobile
- Tente redimensionar a janela do navegador
- Teste em modo Responsive Design (F12 → Toggle Device)

## 7️⃣ Próximos Passos

Após familiarizar-se com a aplicação:

1. **Explorar a documentação**
   - Leia [README.md](README.md) para mais detalhes
   - Veja [ARCHITECTURE.md](ARCHITECTURE.md) para estender o projeto

2. **Customizar**
   - Altere cores em `src/styles/components.css`
   - Adicione suas próprias funcionalidades
   - Integre com seu backend

3. **Fazer Deploy**
   - Execute `npm run build`
   - Faça upload da pasta `dist` para qualquer servidor web
   - Ou use Vercel/Netlify para deploy automático

## 📚 Recursos

| Recurso | Link |
|---------|------|
| React Docs | https://react.dev |
| TypeScript | https://www.typescriptlang.org |
| Vite | https://vitejs.dev |
| MDN Web Docs | https://developer.mozilla.org |

---

**Pronto para começar!** 🚀

Para dúvidas, verifique a seção [README.md](README.md) ou os arquivos de documentação.
