# Referência da API pública

## Exports

- `@jeftelabs/middleware`: export default `Middleware`.
- `@jeftelabs/middleware/types`: `NextFn`, `FinalHandler`, `ErrorHandler` e `Executor`.

## `Middleware<MiddlewareFn>`

- `all(): Set<MiddlewareFn>` devolve o Set interno vivo. Use como leitura.
- `has(handler): boolean` verifica a presença pela identidade.
- `add(handler): this` adiciona ao fim; a mesma referência não duplica. Lança erro depois de congelado.
- `remove(handler): boolean` remove pela identidade; lança erro depois de congelado.
- `clear(): void` remove os itens; lança erro depois de congelado.
- `merge(other): void` percorre a outra pilha e adiciona itens ao fim, preservando deduplicação; lança erro se o destino estiver congelado.
- `freeze(): void` captura snapshot em array e torna mutações pelos métodos da classe inválidas. Repetir é seguro.
- `runner(): Runner<MiddlewareFn>` congela e cria runner a partir do snapshot.

## `Runner<MiddlewareFn>`

- `finalHandler(fn): this` configura o callback do fim normal; por padrão, apenas resolve.
- `errorHandler(fn): this` configura captura de erros e resolução pelo valor retornado.
- `run(executor): Promise<any>` inicia a execução e propaga o resultado do fim ou do tratamento de erro. Sem error handler, falhas rejeitam.

## Tipos de callback

- `NextFn = () => Promise<any> | any` avança uma vez para o próximo item.
- `FinalHandler = () => Promise<any>` é chamado ao consumir toda a cadeia.
- `ErrorHandler = (error: any) => Promise<any>` recebe erro da cadeia.
- `Executor<T> = (middleware: T, next: NextFn) => Promise<any>` define como chamar um item.

O generics do pacote deixa o tipo do handler a cargo da aplicação. O contexto não faz parte da API: passe-o pelo executor ou por closures.
