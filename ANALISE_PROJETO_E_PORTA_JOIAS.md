# Inventário visual e atualização do catálogo Nanyvendas

## Escopo e codebase

Projeto clonado de `lucasgab2230/nanyvendas`, branch `main`, commit inicial `873b343`. O catálogo principal da vitrine web é alimentado por `packages/web/src/api/catalog/products.ts`; `catalog.tsx` ordena e filtra produtos, `product-card.tsx` mostra o card, `product-modal.tsx` apresenta detalhes e o helper `whatsapp.ts` prepara a mensagem de pedido. As fotos são servidas da pasta `packages/web/public/images/`.

Foram revisadas todas as **35 imagens JPG** diretamente em `packages/web/public/images/images/`, exceto `20261004_192042.jpg` (porta-joias). As 35 restantes foram incorporadas uma vez cada, todas com caminho de imagem verificado. Os 14 itens de exemplo foram substituídos por 35 cadastros ligados às fotografias; a categoria extra ou registro de produto do porta-joias não foi criado. As descrições se limitam a formas, cores e detalhes que a foto deixa ver; composição, medidas, garantia e demais atributos não legíveis não foram presumidos.

## Resultado do inventário

| Foto (sufixo) | Produto cadastrado | Preço da etiqueta |
|---|---|---:|
| 192354 | Brinco Ponto de Luz Prateado | Consultar |
| 192429 | Brinco Nó Prateado | Consultar |
| 192734 | Brinco Pedra Azul | Consultar |
| 192809 | Brinco Losango Vazado | Consultar |
| 192844 | Brinco Coração Preto | Consultar |
| 192913 | Brinco Lua Crescente com Cristais | Consultar |
| 192931 | Brinco Laço Dourado | Consultar |
| 193025 | Brinco Coração Canelado | Consultar |
| 193038 | Brinco Gota Dourada | Consultar |
| 193102 | Brinco Estrela Dourada | Consultar |
| 193120 | Brinco Redondo com Cristais | Consultar |
| 193136 | Brinco Asa Escura | Consultar |
| 193159 | Brinco Coração com Cristais | Consultar |
| 193246 | Brinco Coração Preto Liso | Consultar |
| 193305 | Brinco Flor Dourada | Consultar |
| 193857 | Anel Dourado Largo | R$ 79,90 |
| 193936 | Anel Prateado Largo | R$ 89,90 |
| 193959 | Anel Dourado Liso | R$ 89,90 |
| 194050 | Anel Prateado com Pedras | R$ 69,90 |
| 195659 | Brinco Coração Gratidão | Consultar |
| 200109 | Pulseira Prateada com Cruzes | R$ 49,90 |
| 200148 | Pulseira Prateada Delicada | R$ 59,90 |
| 200219 | Pulseira de Corações Prateados | R$ 79,90 |
| 200240 | Colar com Pingente Lettering | R$ 59,90 |
| 200345 | Colar com Corações Dourados | R$ 69,90 |
| 200443 | Pulseira Dourada com Pedras Facetadas | R$ 79,90 |
| 200508 | Colar Prateado com Ponto de Luz | R$ 49,90 |
| 200539 | Colar com Pingente Figura Dourada | R$ 89,90 |
| 200608 | Colar Dourado com Laço e Pedras | R$ 69,90 |
| 200632 | Tornozeleira Feminina com Flor | R$ 59,90 |
| 201253 | Brinco Longo Preto e Dourado | R$ 42,90 |
| 201300 | Brinco Coração Vazado Dourado | R$ 24,90 |
| 201312 | Brinco Retangular Listrado | R$ 39,90 |
| 201318 | Brinco Cone Preto | R$ 44,90 |
| 201506 | Brinco Argola Coração Prateado | R$ 49,90 |

“Consultar” indica que não encontrei preço legível associado à peça na foto; não foi substituído por um preço estimado. O esquema de produto agora aceita `price: null`, e os cards e detalhes mostram **Consultar preço**. O botão do WhatsApp continua disponível e pergunta o valor para os itens sem etiqueta legível. A ordenação por preço mantém itens sem preço ao final.

## Verificações

A checagem de TypeScript (`tsc --noEmit -p packages/web/tsconfig.json`) passou. `git diff --check` passou. Um teste local confirmou 35 caminhos únicos para 35 arquivos existentes, sem imagens da pasta omitidas (fora o porta-joias). A build completa do Vite não foi executada com sucesso em uma tentativa anterior por dependência `tw-animate-css` ausente na resolução disponível; esse problema de configuração/dependência já existia independentemente do conteúdo do catálogo.
