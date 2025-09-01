Weather Wise 🌦️
<br>

Weather Wise é uma aplicação web moderna e intuitiva para consulta de previsão do tempo. Desenvolvida com as mais recentes tecnologias do ecossistema JavaScript, oferece uma experiência de usuário limpa, rápida e responsiva, permitindo que os usuários obtenham informações meteorológicas detalhadas de qualquer lugar do mundo.

<br>

✨ Funcionalidades
Busca em Tempo Real: Pesquise o clima de qualquer cidade do mundo.

Dados Detalhados: Obtenha informações sobre temperatura, sensação térmica, umidade, velocidade do vento e índice UV.

Previsão Estendida: Visualize a previsão do tempo para os próximos 5 dias.

Geolocalização: Permita que o site identifique sua localização atual para mostrar o clima local automaticamente.

Contas de Usuário: Sistema de login e cadastro para uma experiência personalizada.

Localizações Favoritas: Salve suas cidades preferidas para acesso rápido.

Dicas Inteligentes: Receba sugestões com base no clima atual.

Design Responsivo: Interface adaptável para uma ótima experiência em desktops, tablets e celulares.

Modo Escuro (Dark Mode): Tema visual para conforto em ambientes com pouca luz.

<br>

🚀 Tecnologias Utilizadas
Este projeto foi construído utilizando as seguintes tecnologias:

Next.js - Framework React para produção.

React - Biblioteca para construção de interfaces de usuário.

TypeScript - Superset de JavaScript que adiciona tipagem estática.

Tailwind CSS - Framework de CSS utility-first para estilização rápida.

Firebase - Plataforma para autenticação de usuários e armazenamento de dados (Firestore).

Weather API - API para fornecimento dos dados meteorológicos.

<br>

⚙️ Como Executar o Projeto
Siga os passos abaixo para executar o projeto em seu ambiente local.

1. Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:

Node.js (versão 18 ou superior)

Git

2. Clone o repositório
Bash

git clone https://github.com/duwalace/Weather-Wise.git
cd Weather-Wise
3. Instale as dependências
Bash

npm install
4. Configure as variáveis de ambiente
Crie um arquivo chamado .env.local na raiz do projeto e adicione as seguintes variáveis. Você pode usar o arquivo .env.example (se houver) como base.

Snippet de código

# Configuração do Firebase (encontre no console do seu projeto Firebase)
NEXT_PUBLIC_FIREBASE_API_KEY=sua_chave_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_id_aqui
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id_aqui

# Chave da API de Clima (ex: OpenWeatherMap)
NEXT_PUBLIC_WEATHER_API_KEY=sua_chave_da_api_de_clima
5. Rode a aplicação
Bash

npm run dev
A aplicação estará disponível para acesso em seu navegador em http://localhost:3000.

<br>

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

(Ação: Crie um arquivo chamado LICENSE no seu repositório e coloque o texto da licença MIT dentro dele.)

<br>

👨‍💻 Autor
Feito por Walace
