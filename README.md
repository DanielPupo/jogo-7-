# AstroLearn • BioLab

Jogo educacional de investigação para o 7º ano, inspirado nas dez fases do simulador de epidemia do PDF fornecido. Desenvolvido em HTML, CSS e JavaScript, sem instalação ou dependências obrigatórias.

## Jogar no computador

Abra `dist/index.html` no navegador. Para usar sem internet, a tipografia usa fontes alternativas disponíveis no dispositivo. Os demais recursos são locais. Computador, tablet e celular usam a mesma interface adaptável.

## O que está pronto

- Monstrinhos animados com contato, transmissão probabilística, máscaras, vacinação e recuperação.
- Um único jogo com roteiro guiado de dez etapas; as instruções acompanham o aluno sem trocar de simulação. Cada etapa concluída vale 100 XP.
- Laboratório livre, pausa, velocidades 1×/2×/4× e reinício.
- População, tamanho, infectados iniciais, porcentagens de máscaras/vacinas e regras configuráveis.
- Gráfico ao vivo, casos acumulados, pico e estados atuais.
- Diário local com observações, comparação e exportação CSV.
- Aplicação de proteção com mouse, toque ou lista de botões para teclado.
- Histórico e progresso neste navegador via localStorage (se permitido).
- Instruções e objetivos da etapa atual visíveis acima do laboratório, com tipografia ampliada.
- Tema escuro como padrão e alternância persistente entre tema escuro e claro.

## Integrar ao AstroLearn

Este pacote é independente: não modifica o frontend, backend ou banco atuais do TCC. Copie os quatro arquivos de `dist/` para uma pasta pública do frontend, por exemplo `public/jogos/biolab/`. Use um link `/jogos/biolab/index.html` ou um iframe:

```html
<iframe src="/jogos/biolab/index.html" title="AstroLearn BioLab" style="width:100%;height:100vh;border:0" allow="fullscreen"></iframe>
```

Os caminhos de CSS e scripts são relativos. Hospede todos juntos, preservando os nomes. O jogo não envia dados para servidor, não exige login e não faz chamada de API. O registro não é por aluno/conta: fica no navegador e origem em que o jogo foi aberto. Não há ranking de turma nem acompanhamento do professor no backend nesta versão. A exportação CSV permite entregar o diário.

## Mecânica e currículo

Ciências: transmissão, prevenção, recuperação e limites dos modelos. Matemática: probabilidade, porcentagens, gráficos e comparação. Tecnologia: eventos, parâmetros, condições e reprodução de cenários. Engenharia: testar intervenções. Artes: personagens, cores e narrativa. Não é um editor de blocos como Code.org: os eventos são configurados por controles de regras.

O roteiro de dez etapas usa sempre a mesma simulação: observar, criar 10 saudáveis + 1 doente, habilitar contágio, aplicar máscaras, variar população, observar recuperação, comparar máscaras, aplicar vacinas, explicar a descoberta no diário e exportar resultados. A etapa 7 exige testes de ao menos 8 segundos, diferença de duração de no máximo 1 segundo, mesma semente e parâmetros, alterando só máscaras iniciais e sem intervenções manuais.

## Modelo fictício

Os valores não representam uma doença real. Estados: S = saudável, I = doente, R = recuperado. Em contato (distância até dois raios), cada par I–S tem chance `1 - exp(-taxa × dt)` de infecção por passo. Taxa-base = 3/s; cada máscara multiplica por 0,35; vacinação do saudável multiplica por 0,15. Vacinar não cura doentes. Recuperados ficam protegidos no restante da execução. A recuperação pode ser desativada. O cálculo usa passos fixos de 1/60 s. A semente inicial é 42; novos cenários aleatórios podem ser gerados no diário. Mudanças na central reiniciam o experimento. Um teste termina em 120 segundos simulados.

## Arquivos

- `dist/index.html`: estrutura e textos.
- `dist/style.css`: visual e responsividade.
- `dist/engine.js`: motor da simulação.
- `dist/app.js`: desenho, missões, gráfico e diário.
- `tests/`: testes executáveis com Node.js, sem pacotes adicionais.

## Validar

```sh
node tests/engine.test.cjs
node tests/ui.test.cjs
```

Validação realizada: sintaxe JavaScript; conservação da população; limites; recuperação; prevenção; repetibilidade; efeito das proteções em 30 sementes; fluxos da interface por DOM simulado. A prévia visual em navegador não pôde ser executada nesta sessão devido a uma restrição de infraestrutura. Teste a apresentação no dispositivo da turma antes da aplicação em aula.
