# Central Core

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Recommended Extensions

- Prettier - Code formatter
- ESLint

## Project setup

### Using Docker (Recommended)

1. There is a `docker-compose.yml` file in the root of the project to build a PostgreSQL database and Redis.

```bash
$ docker compose up -d
```

2. Install dependencies

```bash
$ yarn install
```

3. Initialize Prisma and Run migrations.

```bash
# Generate Prisma Client
$ yarn prisma:generate
```

```bash
# Run migrations
$ yarn prisma:migrate
```

4. Populate the database with mock data (optional).

```bash
# Run populate script
$ yarn script:populate-db
```

## Compile and run the project

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# debug mode
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Create a new migration

```bash
# to generate a new migration based on schema changes
$ yarn prisma:migrate <migration-name>
```

It is highly recommended to always review the generated SQL before applying migrations. Prisma's migration system can be quite invasive; instead of performing an efficient RENAME COLUMN, it might choose to DELETE the existing column and CREATE a new one. This approach can lead to unintended data loss, especially if columns contain critical information.

## Commit Message Format

This project uses conventional commit messages enforced by Husky. All commit messages must follow this format:

```
[type]: [subject]
```

**Rules:**
- All lowercase
- Subject must start with a verb
- Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Examples:**
```bash
feat: add user authentication
fix: resolve database connection issue
docs: update readme installation steps
refactor: simplify error handling logic
```

## Deployment

Not defined yet.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
