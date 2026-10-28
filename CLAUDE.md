# Orientações para Claude e agentes de IA

As instruções canônicas estão em [AGENTS.md](./AGENTS.md). Comece pelo índice [docs/README.md](./docs/README.md) e consulte as páginas relevantes antes de alterar o pacote.

Este repositório contém `@jeftelabs/middleware`, uma implementação independente de framework da Chain of Responsibility. A biblioteca registra uma lista ordenada de handlers genéricos; o executor fornecido pelo consumidor invoca os handlers e `next()` continua a cadeia. O projeto suporta Node.js e Bun. Não é servidor HTTP nem fornece contexto, roteamento ou adaptadores de framework.

## Documentação obrigatória

É extremamente obrigatório criar ou atualizar documentação detalhada toda vez que algo novo for criado ou qualquer parte do projeto for modificada. Isso abrange código, API, tipos, testes, exemplos, benchmarks e imagem, dependências, runtimes, lockfiles, configuração, scripts, build, CI e documentos. Conclua a atualização na mesma tarefa.

- Explique comportamento observável, sequência de execução, entradas/saídas, efeitos colaterais, erros, limites e manutenção para humanos e IAs.
- Organize a documentação em `docs/` como guias, referências, arquitetura, planejamento e desenvolvimento.
- Registre cada documento novo em `docs/README.md`.
- Mantenha README, imagem de benchmark e scripts coerentes com os arquivos atuais.
- Benchmarks devem ser reproduzíveis e apresentar ambiente, comparação e limites; não reutilize números antigos como se fossem atuais.

## Semântica que não pode ser presumida

- `Middleware.add` armazena handlers em `Set`; duplicatas por identidade não entram duas vezes.
- `runner()` congela a pilha. Depois disso `add`, `remove`, `clear` e `merge` lançam erro.
- A cadeia progride quando o executor chama `next`; cada callback `next` avança uma única vez. Se handler não chama `next`, encerra o caminho sem executar os próximos nem `finalHandler`.
- `finalHandler` roda ao consumir a fila inteira com sucesso.
- Sem `errorHandler`, rejeições/erros propagam até `run`; com um handler configurado, o erro é entregue ao handler e o fluxo de retorno pode continuar para handlers upstream. O handler downstream após o que falhou não é automaticamente retomado.
- Runner representa uma execução; não assuma que o mesmo objeto `Runner` possa executar chamadas concorrentes/reentrantes.

Leia `docs/architecture/overview.md`, `docs/references/api.md` e `docs/references/development.md` para detalhes. Sempre valide exemplos contra implementação e testes.
