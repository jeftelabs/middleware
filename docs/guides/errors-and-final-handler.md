# Finalização e tratamento de erros

## Finalização normal

`Runner.finalHandler(handler)` define uma função sem argumentos chamada quando o índice ultrapassa o último middleware. Ela só acontece quando o fluxo chama `next()` até o fim. Se um handler não chamar `next()`, a cadeia termina naquele ponto e o final handler não roda.

```ts
const runner = pipeline.runner().finalHandler(async () => {
  console.log('cadeia concluída')
})

await runner.run((handler, next) => handler(context, next))
```

O handler final padrão apenas resolve. O valor retornado pelo final handler é propagado pela Promise retornada por `run()`.

## Erros sem error handler

Sem `errorHandler`, uma rejeição ou exceção do executor/middleware propaga para quem chamou `run()`. Trate-a na aplicação com `try/catch`.

```ts
try {
  await runner.run(executor)
} catch (error) {
  // A aplicação decide como registrar ou responder.
}
```

## Erros com error handler

`Runner.errorHandler(handler)` instala a captura da cadeia. O callback recebe o erro e seu resultado resolve a Promise da execução. Como cada chamada a `next()` devolve o resultado da próxima etapa, os handlers anteriores podem retomar depois de `await next()`.

```ts
const runner = pipeline.runner()
  .errorHandler(async (error) => ({ ok: false, error }))

const result = await runner.run(executor)
```

O error handler também pode rejeitar; essa rejeição segue ao chamador. Erros ocorridos antes da falha já podem ter produzido efeitos e não são revertidos automaticamente.

## Ordem e async

Use `return next()` ou `await next()` para ligar explicitamente a continuação. Com `await`, código antes de `next()` é executado na descida; código depois é executado no retorno. Chamar `next()` mais de uma vez pelo mesmo middleware só avança na primeira chamada.

Um `Runner` mantém o índice atual e é de uso único. Para outra execução, obtenha novo runner chamando `pipeline.runner()` novamente.
