![Alpine Dogs](./imgreadme/fotosite.png)

  </a>
</p>

---


## Sobre 

O site **Alpine Dogs** é uma aplicação web com design moderno que permite explorar centenas de raças de cães com imagens reais. O site utiliza a [Dog CEO API](https://dog.ceo/dog-api/) para buscar informações sobre diferentes raças e suas sub-raças, proporcionando uma experiência interativa e educativa.

O objetivo da aplicação é o uso da framework Alpine.JS, que permite e garante maior interação, otimização e praticidade ao projeto.

---

## Tecnologias utilizadas no projeto

[![My Skills](https://skillicons.dev/icons?i=html,css,js,alpinejs,github)](https://skillicons.dev)

---

## O que é a framework Alpine.js?

Alpine.js é um framework JavaScript leve (usa apenas 15kb) que oferece a reatividade e funcionalidades declarativas de frameworks maiores, mas com a simplicidade de usar diretamente no HTML. É perfeito para adicionar comportamento interativo a sites sem a necessidade de um processo de build complexo, como o utilizado no React.

### Principais características:
-  **Leve**: Apenas 15kb minificado
-  **Sem build**: Funciona diretamente no navegador
-  **Reativo**: Atualizações automáticas da interface
-  **Declarativo**: Lógica diretamente no HTML
-  **Fácil de aprender**: Sintaxe similar ao Vue.js

---

## Como experimentar o projeto

### Método 1: Download direto (Mais fácil para iniciantes)

1. **Baixe os arquivos**:
   - Clique no botão verde "Code" no GitHub
   - Selecione "Download ZIP"
   - Extraia o arquivo ZIP em uma pasta de sua escolha

2. **Abra o projeto**:
   - Navegue até a pasta extraída
   - Clique duas vezes no arquivo `index.html`
   - O site abrirá no seu navegador padrão

### Método 2: Usando Git (Para desenvolvedores)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/alpine-dogs.git

# Entre na pasta do projeto
cd alpine-dogs

# Abra no seu editor de código
code .

# Ou abra diretamente no navegador
start index.html  # Windows
open index.html   # Mac
xdg-open index.html # Linux
```

---

## Tutorial de uso Alpine.js 

### 1. Incluindo Alpine.js no seu projeto

Primeiro, você precisa incluir o Alpine.js no seu HTML. Existem duas formas:

#### Via CDN (mais fácil):
```html
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

#### Download local:
1. Baixe o arquivo do [site oficial](https://alpinejs.dev/)
2. Coloque na pasta do seu projeto
3. Inclua no HTML: `<script defer src="alpine.min.js"></script>`

### 2. Conceitos básicos do Alpine.js

#### x-data: Definindo dados reativos
```html
<!-- Cria um componente com dados -->
<div x-data="{ nome: 'João', idade: 25 }">
  <p x-text="nome"></p> <!-- Exibe: João -->
  <p x-text="idade"></p> <!-- Exibe: 25 -->
</div>
```

#### x-show: Mostrando/escondendo elementos
```html
<div x-data="{ visivel: true }">
  <button @click="visivel = !visivel">Toggle</button>
  <p x-show="visivel">Este texto aparece e desaparece!</p>
</div>
```

#### x-if: Renderização condicional
```html
<div x-data="{ logado: false }">
  <template x-if="logado">
    <p>Bem-vindo, usuário!</p>
  </template>
  <template x-if="!logado">
    <p>Faça login para continuar</p>
  </template>
</div>
```

#### x-for: Loops e listas
```html
<div x-data="{ frutas: ['maçã', 'banana', 'laranja'] }">
  <ul>
    <template x-for="fruta in frutas">
      <li x-text="fruta"></li>
    </template>
  </ul>
</div>
```

#### @click: Eventos de clique
```html
<div x-data="{ contador: 0 }">
  <button @click="contador++">Clique aqui</button>
  <p x-text="contador"></p>
</div>
```

### 3. Exemplo prático: Lista de tarefas

```html
<!DOCTYPE html>
<html>
<head>
    <title>Lista de Tarefas com Alpine.js</title>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
    <div x-data="{
        tarefas: [],
        novaTarefa: '',
        
        adicionarTarefa() {
            if (this.novaTarefa.trim()) {
                this.tarefas.push({
                    id: Date.now(),
                    texto: this.novaTarefa,
                    concluida: false
                });
                this.novaTarefa = '';
            }
        },
        
        removerTarefa(id) {
            this.tarefas = this.tarefas.filter(t => t.id !== id);
        }
    }">
        <h1>Minha Lista de Tarefas</h1>
        
        <!-- Formulário para adicionar tarefa -->
        <form @submit.prevent="adicionarTarefa()">
            <input 
                type="text" 
                x-model="novaTarefa" 
                placeholder="Digite uma nova tarefa..."
            >
            <button type="submit">Adicionar</button>
        </form>
        
        <!-- Lista de tarefas -->
        <ul>
            <template x-for="tarefa in tarefas" :key="tarefa.id">
                <li>
                    <input 
                        type="checkbox" 
                        x-model="tarefa.concluida"
                    >
                    <span 
                        x-text="tarefa.texto"
                        :class="{ 'line-through': tarefa.concluida }"
                    ></span>
                    <button @click="removerTarefa(tarefa.id)">
                        Remover
                    </button>
                </li>
            </template>
        </ul>
        
        <!-- Contador de tarefas -->
        <p x-text="`Total: ${tarefas.length} tarefas`"></p>
    </div>
</body>
</html>
```

### 4. Como funciona o Alpine Dogs

No nosso projeto, usamos Alpine.js para:

#### Gerenciar estado da aplicação:
```javascript
x-data="dogApp()" // Função que retorna o estado inicial
```

#### Mostrar estados de carregamento:
```html
<div x-show="loading" class="loading-state">
    <div class="spinner"></div>
    <p>Carregando raças de cães...</p>
</div>
```

#### Filtrar raças em tempo real:
```html
<input 
    type="text" 
    x-model="searchTerm" 
    placeholder="Buscar por uma raça..."
>
```

#### Renderizar lista de raças:
```html
<template x-for="breed in filteredBreeds" :key="breed.name">
    <div class="breed-card" @click="selectBreed(breed.name)">
        <h3 x-text="breed.name"></h3>
    </div>
</template>
```

