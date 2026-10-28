# Documentação de @jeftelabs/middleware

Documentação para pessoas e agentes de IA que usam, integram ou mantêm o pacote. O código, testes, `package.json`, lockfiles, benchmark e workflows são a fonte de verdade; corrija as páginas no mesmo trabalho se houver divergência.

## Introdução e guias

- [Visão da arquitetura](architecture/overview.md) — camadas, ciclo da cadeia e sequência de retorno.
- [Guia de uso](guides/usage.md) — instalação, handlers, executor, contexto e ciclo de execução.
- [Final handler e tratamento de erros](guides/errors-and-final-handler.md) — encerramento normal, falhas e unwind upstream.
- [Benchmark](guides/benchmarks.md) — comando, workload, resultados atuais e limites de comparação.

## Referências

- [API pública](references/api.md) — exports, métodos, tipos, valores de retorno e mutabilidade.
- [Implementação interna](references/implementation.md) — freeze, `next`, tratamento de exceção e estado do runner.
- [Desenvolvimento e runtimes](references/development.md) — Node.js, Bun, scripts, build, testes e CI.

## Planejamento e manutenção

- [Planejamento de manutenção](planning/maintenance.md) — regras de compatibilidade, checklist e áreas para revisão.

## Mapa do código

| Caminho | Responsabilidade |
| --- | --- |
| `index.ts` | Export default de `Middleware` |
| `src/middleware.ts` | Registro, remoção, merge, freeze e criação de runner |
| `src/runner.ts` | Execução serial dos handlers, `next`, final handler e error handler |
| `src/types.ts` | Contratos de executor, handlers e callback `next` |
| `tests/` | Testes dos contratos e da ordem de execução |
| `benchmarks/index.ts` | Medição da cadeia frente a `fastseries` |
| `middleware_benchmarks.png` | Gráfico gerado das medições atuais em Node.js e Bun |

## Atualização obrigatória

Toda criação ou modificação do projeto exige documentação detalhada atualizada na mesma tarefa. Siga [AGENTS.md](../AGENTS.md) e [CLAUDE.md](../CLAUDE.md), atualize os links deste índice e regenere imagem/valores de benchmark quando mudar a carga ou implementar suporte a outro runtime.
