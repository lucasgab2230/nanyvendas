# Nany — design e experiência

## Direção

Vitrine acolhedora para a Eliane, em Guarapuava, com foco em **encontrar uma peça e iniciar uma conversa pelo WhatsApp**. A experiência anterior, escura e com muitos blocos antes do catálogo, deu lugar a uma apresentação clara, navegação curta e ações legíveis no celular.

Não simula um checkout, estoque em tempo real, reserva ou pagamento on-line. As informações comerciais são confirmadas com a loja.

## Identidade visual

- Fundo marfim `#FCFAF7`, superfícies creme `#F4EEE5`, texto carvão `#34312C`.
- Terracota `#9B523B` para ações e títulos em itálico; verde `#286447` para o WhatsApp.
- Tons secundários escurecidos para garantir contraste dos textos, verificados com axe.
- **Cormorant Garamond** para títulos e marca; **Jost** para interface e corpo. Fontes locais, sem depender de serviços externos.
- Fotografia verdadeira: nenhuma imagem gerada substitui os produtos. A maleta continua como apresentação, sem virar item à venda.
- Arcos, linhas delicadas e cantos discretos fazem a ligação entre o hero e as outras seções. Não há animação obrigatória para revelar conteúdo.

Estilos organizados em `packages/web/src/web/styles/`: base/tokens, cabeçalho, hero, catálogo, seções, diálogos, coleções e adaptações para tablet/celular. `styles.css` compõe esses arquivos e importa o Tailwind.

## Hierarquia

1. Faixa local e cabeçalho compacto: semijoias, vestuário, lingerie e como comprar.
2. Hero com uma semijoia real, acesso direto à vitrine e ajuda da Eliane.
3. Catálogo: busca → preço → categoria/ordenação → peças → carregar mais.
4. Outras coleções, como comprar, apresentação da loja, perguntas e contato final.

No computador, a grade tem quatro colunas; em telas intermediárias, três; no celular, duas. A página não usa `overflow-x: hidden` para disfarçar problemas de largura. Os testes incluem 320, 390, 768, 1024 e 1440 px.

## Fluxos principais

### Descobrir e pedir uma peça

Busca local sem distinção de acentos/maiúsculas e com múltiplas palavras. Filtros podem ser combinados e limpos; valores sob consulta ficam ao final da ordenação de preços. A URL preserva busca, categoria, faixa e ordem. As categorias sem produtos não são oferecidas como filtros.

A cliente abre o detalhe, pode ampliar a foto e pedir pelo WhatsApp com referência e preço quando informado. Links `/?peca=slug` abrem diretamente a peça; links inválidos têm recuperação, e voltar no navegador fecha o detalhe aberto pela vitrine.

### Escolher várias peças

O coração salva IDs locais. A seleção sempre busca nome, foto e valor no catálogo atual; dados antigos e IDs removidos não se tornam ofertas. O painel apresenta subtotal em centavos, separa itens sob consulta, permite remover peças e prepara uma única mensagem.

O site informa claramente que a seleção não faz reserva. O armazenamento pode ser bloqueado sem derrubar a experiência; nesse caso ela continua válida durante a visita.

### Compartilhar

Compartilhamento nativo quando suportado; cópia do link em contexto seguro; campo manual selecionável quando o navegador não oferece essas APIs. Os links diretos compartilháveis são das semijoias publicadas.

### Vestuário e lingerie

Páginas próprias, com estado real da coleção e consulta contextual pelo WhatsApp. Não criam fotos, preços ou promessas. O componente compartilhado também pode exibir produtos tipados quando forem aprovados e cadastrados.

## Acessibilidade e resiliência

- HTML em `pt-BR`, título e descrição por página, link para pular ao conteúdo.
- Botões com rótulos e estados `aria-pressed`; busca e selects com nomes acessíveis.
- `dialog.showModal()` mantém o fundo inerte; o componente controla o ciclo de Tab, Escape, clique fora e devolução de foco. Fechar permanece visível durante a rolagem.
- Menu de celular como disclosure, com Escape e fechamento ao navegar ou tocar fora.
- FAQ usa `details`/`summary`, sem depender de JavaScript para expandir respostas.
- Mensagens de estado sem bloquear a navegação. Estados de carregamento, erro com nova tentativa, busca vazia, seleção vazia e produto inexistente.
- Fotos responsivas com tamanhos estáveis, carregamento sob demanda e fallback para original/aviso. Variantes quadradas preservam a imagem inteira, sem recortar etiquetas na vitrine e nos detalhes.
- `prefers-reduced-motion` desativa transições, animações e rolagem suave.
- Testes de navegador exercitam desktop e celular, incluindo auditoria automática WCAG A/AA da vitrine, do detalhe e da seleção. Ainda é recomendável validar com a Eliane no aparelho que ela usa.

## Arquitetura da experiência

A consulta `useCatalog()` é compartilhada pelo hero, catálogo e seleção com TanStack Query. As 35 peças são pequenas como dados; busca e filtros ocorrem em memória, sem requisição a cada toque. A grade começa com 12 itens e oferece mais 12 por vez, mantendo as fotos restantes fora do carregamento inicial.

WhatsApp e formatação monetária ficam em `lib/whatsapp.ts`; filtros em `lib/catalog.ts`; persistência e subtotal em `lib/selection.ts`. O servidor Node de produção entrega arquivos e API pela mesma origem, assim como a prévia de desenvolvimento.
