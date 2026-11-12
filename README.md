# estudos-sql-postgresql

Repositório de estudos de SQL e modelagem relacional com PostgreSQL.
Parte da trilha de formação Full Stack com foco em segurança defensiva.

---

## Ambiente

| Componente | Versão / Detalhe             |
| ---------- | ---------------------------- |
| **SGBD**   | PostgreSQL 18                |
| **SO**     | Ubuntu 26.04 LTS             |
| **Acesso** | SSH Tunnel via chave ed25519 |
| **Client** | DBeaver 26 (Community)       |
| **Banco**  | `estudodb`                   |
| **Role**   | `devuser` (sem superuser)    |

A porta 5432 não é exposta na rede — o acesso ao banco é feito exclusivamente via SSH tunnel, mantendo o princípio do menor privilégio.

---

## Progresso dos Módulos

| #  | Módulo                                    | Status |
| -- | ----------------------------------------- | ------ |
| 1  | Fundamentos de Banco de Dados             | ✅     |
| 2  | DDL — Criação de Estruturas               | ✅     |
| 3  | DML — Manipulação de Dados                | ✅     |
| 4  | Relacionamentos e SQL JOIN                | ✅     |
| 5  | Funções de Agregação                      | ✅     |
| 6  | Índices e Performance                     | ✅     |

---

## Estrutura

```
estudos-sql-postgresql/
├── schemas/
│   ├── blog.sql            # Sistema de blog (5 tabelas)
│   └── ecommerce.sql       # Sistema de e-commerce (6 tabelas)
├── diagrams/
│   ├── blog_erd.png         # Diagrama ER — Blog
│   └── ecommerce_erd.png    # Diagrama ER — E-commerce
├── docs/
│   ├── modulo4_relacionamentos_e_joins.pdf
│   ├── modulo5_funcoes_de_agregacao.pdf
│   └── modulo6_indices_performance.pdf
└── README.md
```

---

## Schemas

### Blog System (`schemas/blog.sql`)

Sistema de blog com usuários, posts, comentários e tags.

```
usuarios (1) ──< posts (N)
usuarios (1) ──< comentarios (N)
posts    (1) ──< comentarios (N)
posts   (N) >──< tags (N)  via post_tags
```

**Tabelas:** `usuarios`, `tags`, `posts`, `comentarios`, `post_tags`

---

### E-commerce System (`schemas/ecommerce.sql`)

Cadastro de clientes com endereços, telefones, produtos e pedidos.

```
customers (1) ──< addresses    (N)
customers (1) ──< phone_numbers(N)
customers (1) ──< orders       (N)
orders    (1) ──< order_items  (N)
products  (1) ──< order_items  (N)
```

**Tabelas:** `customers`, `products`, `addresses`, `phone_numbers`, `orders`, `order_items`

---

## Decisões de Modelagem

### ON DELETE CASCADE vs RESTRICT

| Relação                   | Estratégia | Motivo                                  |
| ------------------------- | ---------- | --------------------------------------- |
| customer → addresses      | CASCADE    | Endereço não existe sem cliente         |
| customer → phone\_numbers | CASCADE    | Telefone não existe sem cliente         |
| customer → orders         | RESTRICT   | Pedido tem valor histórico e fiscal     |
| product → order\_items    | RESTRICT   | Não se apaga produto que já foi vendido |
| order → order\_items      | CASCADE    | Item não existe sem o pedido            |

### `unit_price` em `order_items`

O preço é gravado no momento da compra, separado do `price` em `products`. Se o produto mudar de preço depois, o histórico financeiro do pedido permanece correto.

### `tax_id` em vez de `cpf`

Nomenclatura agnóstica ao país — compatível com projetos internacionais e com o Django ORM.

### `is_active` (soft delete)

Clientes e produtos não são deletados do banco — apenas desativados. Preserva integridade referencial e histórico de pedidos.

---

## Como executar

```bash
# Conectar ao banco (sempre com -h localhost para evitar Peer Authentication)
psql -h localhost -U devuser -d estudodb

# Executar um schema
psql -h localhost -U devuser -d estudodb -f schemas/blog.sql
psql -h localhost -U devuser -d estudodb -f schemas/ecommerce.sql
```

---

## Convenções

| Item              | Padrão                            |
| ----------------- | --------------------------------- |
| PK                | `GENERATED ALWAYS AS IDENTITY`    |
| Dinheiro          | `NUMERIC(10,2)`                   |
| Soft delete       | `is_active BOOLEAN DEFAULT true`  |
| FK nomeada        | `fk_<tabela>_<coluna>`            |
| Unique nomeada    | `uq_<tabela>_<coluna>`            |
| Check nomeada     | `chk_<tabela>_<campo>`            |
| Índice nomeado    | `idx_<tabela>_<coluna(s)>`        |
| Nomes de objetos  | Inglês                            |
| Docs / comentários| Português                         |

---

## Próximos passos

- [ ] Integração com Django ORM (models e migrations)
