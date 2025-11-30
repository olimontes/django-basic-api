# api-django

Projeto simples em Django + Django REST Framework criado com a intenção de aprender os conceitos básicos de Django, serialização e construção de uma API REST.

**Objetivo**: experimentar criação de modelos, serializers e views (function-based) e expor endpoints REST para operações CRUD simples sobre um recurso `User`.

**Stack**
- Python + Django 5
- Django REST Framework
- SQLite (banco padrão do Django)

**Estrutura principal**
- `api_root/` — configurações do projeto Django (`settings.py`, `urls.py`, `wsgi`, `asgi`).
- `api_rest/` — app com o modelo da API e endpoints:
  - `models.py` — define o modelo `User` com campos: `user_nickname` (PK), `username`, `email`, `user_age`.
  - `serializer.py` — `UserSerializer` (ModelSerializer, usa `fields='__all__'`).
  - `views.py` — function-based views usando `@api_view`:
    - `get_users` (GET `/`) — retorna todos os usuários.
    - `get_by_nick` (GET `/user/<nick>`) — retorna um usuário por nickname.
    - `user_manager` (GET/POST/PUT/DELETE `/data/`) — gerencia buscas por query param, criação, atualização e exclusão.
  - `urls.py` — rotas da app: `""`, `user/<str:nick>`, `data/`.

**Dependências**
- Veja `requirements.txt` (Django, djangorestframework, django-cors-headers, etc.).

**Como rodar (Windows / PowerShell)**
1. Criar e ativar ambiente virtual (se ainda não existir):

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. Instalar dependências:

```powershell
pip install -r requirements.txt
```

3. Aplicar migrations:

```powershell
python manage.py migrate
```

4. (Opcional) criar superuser para acessar admin:

```powershell
python manage.py createsuperuser
```

5. Rodar o servidor de desenvolvimento:

```powershell
python manage.py runserver
```

O servidor ficará disponível por padrão em `http://127.0.0.1:8000/`.

**Endpoints principais**
- `GET /` — retorna lista de todos os usuários.
- `GET /user/<nick>` — retorna os dados do usuário com `user_nickname = <nick>`.
- `GET /data/?user=<nick>` — retorna o usuário pelo query param `user`.
- `POST /data/` — cria um novo usuário. JSON esperado (exemplo):

```json
{
  "user_nickname": "nick1",
  "username": "Nome Exemplo",
  "email": "exemplo@mail.com",
  "user_age": 30
}
```

- `PUT /data/` — atualiza um usuário. Envie todo o objeto (incluindo `user_nickname`).
- `DELETE /data/` — deleta um usuário; enviar JSON com `user_nickname` no corpo.

Exemplos com `curl`:

```bash
# Listar todos
curl http://127.0.0.1:8000/

# Buscar por nickname
curl http://127.0.0.1:8000/user/nick1

# Criar
curl -X POST http://127.0.0.1:8000/data/ -H "Content-Type: application/json" -d '{"user_nickname":"nick1","username":"Nome","email":"a@b.com","user_age":25}'

# Atualizar
curl -X PUT http://127.0.0.1:8000/data/ -H "Content-Type: application/json" -d '{"user_nickname":"nick1","username":"Nome Atualizado","email":"a@b.com","user_age":26}'

# Deletar
curl -X DELETE http://127.0.0.1:8000/data/ -H "Content-Type: application/json" -d '{"user_nickname":"nick1"}'
```

**Observações e limitações atuais**
- Não há autenticação/autorização configurada.
- Validações são as padrões do serializer; faltam validações específicas (ex.: checar unicidade de email, faixa de idade, formatos, etc.).
- Uso de `user_nickname` como chave primária string é intencional para aprendizado, mas em produção normalmente se usa `id` numérico.
- Views são function-based e fazem tratamento básico de erros; pode crescer para class-based views ou ViewSets para simplificar.

**Próximos passos sugeridos (para continuar aprendendo)**
- Refatorar para `ViewSet` + `Router` do DRF e usar `ModelViewSet`.
- Adicionar autenticação (Token, JWT ou Session) e permissões.
- Adicionar testes unitários e de integração para endpoints.
- Melhorar validação nos serializers e adicionar constraints no modelo (ex.: `unique=True` onde fizer sentido).
- Adicionar paginação, filtros e ordenação para listagem.
- Dockerizar a aplicação e adicionar CI (GitHub Actions) para rodar testes automaticamente.

**Como contribuir / usar**
- Clonar o repositório, criar branch com seu recurso/bugfix, abrir PR.
- Para dúvidas ou sugestões, abra uma issue descrevendo o objetivo.

---

Feito com propósito de estudo: focado em entender roteamento, modelos, serializers e operações CRUD com Django REST Framework. Boa continuação nos estudos! :rocket:
