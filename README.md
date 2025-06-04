# BichoBit 🐾

BichoBit é um sistema de gestão para petshops que oferece uma solução completa para agendamento de serviços e visualização de dados. Na sua primeira versão, o sistema permite o agendamento de horários para serviços pet, com visualização de dashboards interativos e controle total sobre os agendamentos, proporcionando uma gestão eficiente e organizada do negócio.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React para desenvolvimento web
- **TypeScript** - Superset JavaScript com tipagem estática
- **Node.js** - Runtime JavaScript
- **TailwindCSS** - Framework CSS utilitário
- **Prisma** - ORM com PostgreSQL
- **Mongoose** - ODM para MongoDB
- **shadcn/ui** - Biblioteca de componentes
- **NextAuth.js** - Autenticação JWT

## ✨ Funcionalidades

- **Agendamento de Serviços**
  - Cadastro completo de animais e proprietários
  - Seleção de serviços específicos
  - Registro de observações importantes
  - Controle de horários disponíveis

- **Dashboard Interativo**
  - Visualização de estatísticas semanais
  - Gráficos de ocupação
  - Lista de agendamentos do dia
  - Métricas de desempenho

- **Sistema de Autenticação**
  - Login seguro com JWT
  - Proteção de rotas
  - Gerenciamento de sessão

- **Interface Responsiva**
  - Design moderno e intuitivo
  - Adaptação para diferentes dispositivos
  - Página 404 personalizada

## 📸 Screenshots

### Dashboard Principal
![Dashboard Principal](/public/images/home.png)
*Visão geral do sistema com estatísticas e gráficos*

### Listagem de Agendamentos
![Listagem](/public/images/listagem.png)
*Lista detalhada de todos os agendamentos*

### Cadastro de Agendamentos
![Cadastro](/public/images/agendamento.png)
*Formulário de agendamento*

### Telas de Autenticação, Cadastro e Not-Found
![Autenticação](/public/images/outraspaginas.png)
    *Telas de login, cadastro e página 404*

## 🔮 Planejamento Futuro

- **Controle Financeiro**
  - Integração com sistemas de pagamento
  - Relatórios financeiros
  - Controle de custos e receitas

- **Funcionalidades Avançadas**
  - Cadastramento em massa
  - Sistema de fidelidade
  - Integração com WhatsApp
  - App mobile

## 🛠️ Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/bichobit.git
```

2. Instale as dependências
```bash
cd bichobit
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Execute as migrações do banco de dados
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

O sistema estará disponível em `http://localhost:3000`


## 👥 Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
