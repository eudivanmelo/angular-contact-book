# Agenda de Contatos

Uma aplicação simples e intuitiva para gerenciar contatos, desenvolvida em Angular.

## Sobre o Projeto

Este é um aplicativo de agenda de contatos que permite você:

- **Criar** novos contatos com nome e email
- **Editar** informações de contatos existentes
- **Deletar** contatos que não precisa mais
- **Buscar** contatos em tempo real
- **Salvar** automaticamente no navegador (localStorage)

O projeto utiliza:
- **Angular 21** como framework principal
- **PrimeNG** para componentes de interface
- **Tailwind CSS** para estilização

## Como Usar

### Instalação de dependências

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm start
```

Abra o navegador e acesse `http://localhost:4200/`. A aplicação recarrega automaticamente ao modificar os arquivos.

### Compilar para produção

```bash
npm run build
```

## Funcionalidades Principais

- **Adicionar Contato**: Clique no botão para abrir o formulário e adicione um novo contato
- **Editar Contato**: Clique em um contato para editá-lo
- **Deletar Contato**: Clique no botão de deletar para remover um contato
- **Buscar Contato**: Use a barra de busca para encontrar contatos por nome

## Armazenamento

Os contatos são salvos localmente no navegador usando `localStorage`. Isso significa que seus dados persistem mesmo após fechar e reabrir a aplicação.
