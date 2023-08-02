# Speedometro
Um aplicativo de speedometro para rastrear a velocidade de deslocamento em tempo real e gravar informações sobre as corridas.

## Funcionalidades

* Iniciar e parar o rastreamento da velocidade usando os botões "START" e "STOP".
*	Mostrar a velocidade atual em tempo real.
*	Exibir detalhes de corridas anteriores, incluindo localização, velocidade máxima, distância percorrida, duração da corrida e o trajeto percorrido no mapa.

## Como Usar

1.	Abra o arquivo index.html em um navegador da web.
2.	Clique no botão + para ser redirecionado para a página do Speedometro.
3.	Clique no botão "START" para iniciar o rastreamento da velocidade.
4.	O aplicativo exibirá a velocidade atual em quilômetros por hora (km/h).
5.	Clique no botão "STOP" para parar o rastreamento e gravar a corrida.
6.	As corridas realizadas serão mostradas na tela inicial, clique nela para ver detalhes e em “DELETE” para excluí-la.

## Estrutura do Projeto

*	**index.html:** A página inicial que exibe a lista de corridas gravadas e permite iniciar uma nova corrida.
*	**speed.html:** A página para rastrear a velocidade em tempo real e gravar as corridas.
*	**detail.html:** A página de detalhes de uma corrida gravada, exibindo informações sobre a corrida e um mapa com o trajeto percorrido.
* **style.css:** A folha de estilos que define a aparência visual das páginas.
*	**storage.js:** Contém funções para armazenar, recuperar e gerenciar os dados das corridas no armazenamento local.
*	**dataManager.js:** Contém funções para processar dados das corridas, como cálculo de distância, velocidade máxima, duração etc.
*	**index.js, speed.js, detail.js:** Arquivos JavaScript responsáveis pela lógica das respectivas páginas.

## Lógica do App

O aplicativo permite iniciar o rastreamento da velocidade em tempo real usando o navegador e gravar as informações das corridas no armazenamento local. As corridas gravadas são exibidas na página inicial, onde os usuários podem clicar para ver os detalhes de uma corrida específica, incluindo informações sobre a distância percorrida, duração, velocidade máxima e um mapa mostrando o trajeto.
