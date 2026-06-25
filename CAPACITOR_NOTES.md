# Preparacao Para App Mobile (Capacitor)

Este projeto foi organizado para facilitar empacotamento futuro em Android/iOS.

## Pontos ja aplicados

- Layout responsivo orientado para tela vertical.
- Acoes principais com area de toque adequada no mobile.
- Persistencia local com `localStorage` (funciona em WebView/Capacitor).
- PWA com `manifest.json` e `service worker` basico.
- Regras de impressao separadas para relatorio/PDF.

## Recomendacoes para proximos passos

1. Instalar Capacitor no projeto:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "Fechamento Mensal" "br.com.fechamento.mensal"
```

2. Gerar build web e sincronizar:

```bash
npm run build
npx cap add android
npx cap add ios
npx cap sync
```

3. Abrir IDE nativa:

```bash
npx cap open android
npx cap open ios
```

## Boas praticas de compatibilidade

- Evitar APIs exclusivas de desktop.
- Evitar popups bloqueaveis; preferir modais no proprio React.
- Testar exportacao de PDF em dispositivo real e, se necessario, usar alternativa de compartilhar/imprimir.
- Manter fluxos principais em modo retrato.
- Preservar armazenamento local para uso offline inicial.
