# Visão da arquitetura

## Componentes

`Middleware<T>` registra handlers em um `Set<T>`. Isso preserva ordem de inserção e elimina referências duplicadas. A classe administra a configuração; não conhece o formato funcional nem injeta contexto.

`runner()` congela a configuração copiando o Set para um array e cria um `Runner<T>`. O executor fornecido pelo consumidor sabe como invocar cada handler. O runner controla o índice e fornece a função `next` para avançar serialmente.

## Fluxo

1. A aplicação registra handlers e, opcionalmente, combina pilhas.
2. A primeira chamada a `runner()` congela a pilha e captura um snapshot ordenado.
3. `run(executor)` seleciona o handler no índice atual e passa handler e `next` ao executor.
4. A continuação avança somente se o handler chamar `next()`; a chamada é protegida para avançar no máximo uma vez.
5. Ao esgotar os handlers, chama-se `finalHandler`; erros propagam ou são encaminhados ao `errorHandler`.

## Modelo de retorno

Com `await next()`, os handlers executam na descida e retomam em ordem inversa ao resolver a etapa seguinte. O pacote não cria contexto compartilhado: aplicações podem capturar um objeto no executor/closure e passá-lo aos seus handlers.

## Estado e limites

O snapshot do runner não muda depois do freeze. `all()` expõe o Set vivo e, portanto, deve ser tratado como leitura; mutação direta contorna as proteções e pode divergir do snapshot. Cada Runner mantém índice e executor próprios e não deve ser reutilizado nem executado em paralelo. Crie um novo via `Middleware.runner()` para cada execução.
