# Planejamento de manutenção

## Contratos que devem ser preservados ou alterados conscientemente

- Ordem dos handlers pela inserção e unicidade baseada em identidade.
- O avanço só ocorre mediante `next()` e cada `next` avança uma vez.
- Final handler roda apenas ao esgotar a cadeia; erros sem handler customizado propagam.
- Error handler customizado pode resolver com valor e permitir unwind upstream.
- Runner é de uso único; middleware congela ao solicitar runner.
- Tipos públicos e artefatos ESM devem permanecer coerentes com exports e build.
- Node.js e Bun são runtimes suportados e cobertos pelo workflow.

## Checklist para mudança

1. Identifique o contrato afetado em `src/`, `tests/`, `package.json` e workflow.
2. Atualize/adapte testes para os casos normais, limites e falhas.
3. Atualize guia/referência e índice de `docs/README.md`; mantenha README, `AGENTS.md` e `CLAUDE.md` alinhados.
4. Rode lint, testes, typecheck e build em Node e Bun quando houver impacto de compatibilidade ou execução.
5. Se o workload ou runtimes medidos mudarem, execute os dois benchmarks e regenere `middleware_benchmarks.png` e `docs/guides/benchmarks.md`.
6. Revise `git diff --check` e confirme que não há divergência entre API documentada e código.

## Questões para avaliação futura

- Considerar retornar cópia/iterador em `all()` para evitar mutação externa após freeze; isso altera API e deve ser tratado como mudança compatível deliberada.
- Considerar tipos de retorno mais precisos para handlers sem restringir callbacks assíncronos aceitos hoje.
- Avaliar cobertura dos caminhos síncronos e de rejeição para final handler, error handler e chamada repetida de `next`.
- Registrar versões de runtime e condições locais em cada atualização do benchmark; não converter um microbenchmark isolado em promessa geral de desempenho.
