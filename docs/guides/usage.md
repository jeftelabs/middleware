# Guia de uso

## Instalação

```sh
npm install @jeftelabs/middleware
# Bun
bun add @jeftelabs/middleware
```

Importe a classe default e o tipo `NextFn` pelo export `types`:

```ts
import Middleware from '@jeftelabs/middleware'
import type { NextFn } from '@jeftelabs/middleware/types'
```

## Escolha a forma dos handlers

O tipo genérico de `Middleware<Handler>` é definido pela aplicação. Pode ser uma função:

```ts
type Context = { values: string[] }
type Handler = (ctx: Context, next: NextFn) => void | Promise<void>

const pipeline = new Middleware<Handler>()
pipeline.add(async (ctx, next) => {
  ctx.values.push('before')
  await next()
  ctx.values.push('after')
})
```

Ou objeto/metadado com método executável:

```ts
type HandlerObject = {
  name: string
  handle(ctx: Context, next: NextFn): void | Promise<void>
}

const pipeline = new Middleware<HandlerObject>()
pipeline.add({ name: 'auth', handle: async (ctx, next) => { await next() } })
```

## Defina o executor

O executor converte o item de domínio em chamada. O pacote não injeta contexto automaticamente:

```ts
const ctx: Context = { values: [] }
const runner = pipeline.runner()

await runner.run((handler, next) => handler(ctx, next))
```

Para objetos:

```ts
await pipeline.runner().run((handler, next) => handler.handle(ctx, next))
```

Chame/retorne `next()` para continuar. Em handlers assíncronos use `await next()` se houver trabalho depois da cadeia; caso contrário o executor pode resolver antes de a cadeia descendente terminar. Cada callback `next` é idempotente: chamadas posteriores ao primeiro não avançam novamente.

## Modificar a cadeia

Antes do primeiro `runner()`:

```ts
pipeline.add(handler)
pipeline.has(handler) // boolean
pipeline.remove(handler) // boolean; true quando remove
pipeline.merge(otherPipeline) // adiciona no fim, sem duplicar identidade
pipeline.clear() // remove todos
pipeline.freeze() // impede modificações pela API
```

`runner()` congela automaticamente a pilha. Se precisar de variantes, construa cada pilha e faça merge antes de criar runners. Para outra execução da mesma pilha, peça outro runner; não reutilize nem execute em paralelo a mesma instância de runner.

## Encerramento e erros

Configure `.finalHandler(async () => ...)` para uma ação após todos os handlers chamarem `next()`. Configure `.errorHandler(async (error) => ...)` para converter erro em resposta/resolução e deixar os handlers upstream retomarem. O executor `run()` retorna uma Promise e propaga os valores de retorno do final/error handler; consulte [Finalização e erros](errors-and-final-handler.md).

## Entenda o freeze

`all()` retorna o próprio `Set` interno, não uma cópia. Trate-o como uma visualização de leitura. Alterações devem passar pelos métodos públicos antes do freeze. Depois do freeze, a lista de execução usa snapshot em array; mexer diretamente no Set pode deixar o que `all()` mostra diferente do que o runner executa.
