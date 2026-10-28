# Benchmark

## Reproduzir

Na raiz do repositório, com dependências instaladas:

```sh
npm run benchmark
bun run benchmark:bun
```

`benchmarks/index.ts` mede uma cadeia com quatro handlers síncronos que chamam `next()` e compara com uma série equivalente usando `fastseries`. O programa imprime o runtime, operações por segundo, margem de erro, amostras e o vencedor daquela execução.

## Resultado registrado

Medições locais de 2026-10-27, usando Node.js v26.10.0 e Bun 1.4.4:

| Runtime | `@jeftelabs/middleware` | `fastseries` | Resultado reportado |
| --- | ---: | ---: | --- |
| Node.js v26.10.0 | 3,689,343 ops/s (±0.40%, 87 runs) | 314,719 ops/s (±2.05%, 54 runs) | middleware |
| Bun 1.4.4 | 3,554,369 ops/s (±0.63%, 85 runs) | 407,777 ops/s (±4.40%, 67 runs) | middleware |

O gráfico [middleware_benchmarks.png](../../middleware_benchmarks.png) apresenta esses valores.

## Como interpretar

Esses números descrevem apenas o workload curto e síncrono implementado no arquivo de benchmark, na máquina e versões indicadas. O pacote retorna uma cadeia baseada em Promise/`next`, enquanto `fastseries` usa callback; portanto, a comparação é indicativa, não uma afirmação de desempenho universal ou uma comparação de APIs idênticas. Reexecute no ambiente alvo antes de tomar decisões de desempenho. Ao alterar workload/runtime, atualize o gráfico e esta página no mesmo commit.
