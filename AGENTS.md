# Instruções para agentes — @jeftelabs/middleware

Leia este arquivo e [docs/README.md](docs/README.md) antes de alterar o projeto. Implementação, testes, benchmarks, `package.json`, lockfiles, CI e documentação são fontes de verdade.

## Escopo

`@jeftelabs/middleware` implementa a Chain of Responsibility (pipeline de middleware) para Node.js e Bun. `Middleware<T>` registra handlers únicos por identidade em ordem de inserção e cria runners congelando a coleção. `Runner<T>` chama um executor fornecido pelo consumidor e passa `next`, que avança a fila no máximo uma vez por handler. Suporta final handler e error handler configuráveis.

O pacote não define contexto, tipos de handler, roteamento HTTP, integração com framework, captura de erros por padrão nem concorrência dentro de um runner. O executor adapta cada item ao domínio da aplicação.

## Documentação obrigatória

É obrigatório criar ou atualizar documentação detalhada sempre que algo novo for criado ou qualquer parte do projeto for modificada: API, código, testes, exemplos, benchmarks/imagens, runtime, dependências, configuração, scripts, build, CI, release ou documentação. Atualize na mesma tarefa.

- Explique propósito, fluxo, entradas, saídas, efeitos, erros, limites e manutenção para humanos e agentes de IA.
- Organize páginas em `docs/` com guias, referências, arquitetura, planejamento e desenvolvimento conforme necessário.
- Registre toda página nova em `docs/README.md`; preserve links relativos válidos.
- Atualize README para mudanças de API, compatibilidade, execução ou benchmarks.
- Gere a imagem de benchmark a partir de medições reais atuais; documente comandos, ambiente e limites da comparação.

## Runtime e compatibilidade

- Mantenha suporte explícito a Node.js e Bun para a biblioteca, testes, benchmarks e build.
- Verifique `package.json`, lockfiles e workflows ao alterar runtime ou scripts.
- Mantenha ESM e imports TypeScript relativos com `.ts`, compatíveis com o build TypeScript atual.
- Não altere artefatos gerados (`build/`, `coverage/`, `node_modules/`) como fontes, exceto a imagem versionada `middleware_benchmarks.png` quando regenerada de forma documentada.

## Mapa do código

- `index.ts`: export default de `Middleware`.
- `src/middleware.ts`: armazenamento, mutações, merge, freeze e criação de runners.
- `src/runner.ts`: execução serial, semântica de `next`, handlers finais e erros.
- `src/types.ts`: `NextFn`, `Executor`, `FinalHandler`, `ErrorHandler`.
- `tests/`: contratos de coleção e execução.
- `benchmarks/index.ts`: comparação com `fastseries` em cadeia de quatro funções.
- `middleware_benchmarks.png`: visualização do benchmark; deve corresponder ao código/medidas atuais.

## Comandos e convenções

Confirme scripts reais em `package.json`. Execute os testes e typecheck nos dois runtimes quando alterar compatibilidade/runtime. Use `npm test`/script Bun equivalente e documente cada resultado. Preserve Conventional Commits e trabalho existente; não inclua secrets.
