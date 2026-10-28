# Desenvolvimento e runtimes

## Requisitos e instalação

O projeto é ESM TypeScript e valida compatibilidade com Node.js e Bun. Instale dependências usando o gerenciador correspondente:

```sh
npm ci
bun install --frozen-lockfile
```

## Comandos

| Objetivo | Node.js/npm | Bun |
| --- | --- | --- |
| Lint + testes | `npm test` | `bun run test:bun` |
| Testes sem lint | `npm run quick:test` | `bun run quick:test:bun` |
| Tipos | `npm run typecheck` | `bun run typecheck` |
| Build | `npm run build` | `bun run build:bun` |
| Benchmark | `npm run benchmark` | `bun run benchmark:bun` |

O workflow `.github/workflows/checks.yml` executa Node e Bun em pull requests. O build gera ESM em `build/` e declarações TypeScript. O script de testes usa `bin/test.ts`; Node carrega-o com `@jeftelabs/exec`, Bun executa TypeScript diretamente.

## Alterações e documentação

Leia `AGENTS.md` antes de editar. Toda mudança em comportamento, export, runtime, build, teste, benchmark ou instruções exige atualização detalhada da documentação correspondente e do índice `docs/README.md`. Alterações que afetem compatibilidade devem rodar testes, typecheck e build em Node e Bun.
