# Referência da implementação

## Registro e congelamento

`src/middleware.ts` usa `Set` para ordem estável e unicidade por identidade. `freeze()` guarda `[...]` em `#middlewareArray`; não congela fisicamente o objeto Set retornado por `all()`. As mutações através de `add`, `remove`, `clear` e `merge` verificam `#isFrozen`. O runner recebe o array snapshot.

## Execução serial

`src/runner.ts` mantém `#currentIndex`, executor, final handler e error handler privados. `#invoke` consome o próximo item e chama o executor com uma função `once`. O avanço é dirigido pelo middleware: não chamar `next` impede que os itens seguintes rodem.

## Propagação de erro

Sem error handler, a Promise/exceção do executor propaga. Com error handler, `#invokeWithErrorManagement` aplica `.catch(errorHandler)` a cada etapa; assim a falha pode ser tratada na etapa em que surgiu e a cadeia upstream pode continuar seu unwind. O erro handler pode rejeitar novamente.

## Cuidados decorrentes do desenho

- O runner é estado mutável e one-shot; índice não volta a zero.
- `next` limita cada etapa a uma continuação, mesmo que seja chamada mais de uma vez.
- Para manter a ordem async, o executor e os handlers devem retornar/aguardar as Promises.
- `all()` permite mutação externa sem as verificações de freeze; a execução existente continua baseada no snapshot.
- `run()` declara `Promise<any>` porque o retorno de final/error handler é propagado.
