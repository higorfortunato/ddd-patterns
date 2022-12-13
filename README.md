# DDD-Patterns

## Project

This project demonstrates the usage of the main concepts of Domain-Driven Design. Here we implemented a test suite considering a set operations with entities using sqlite3 memory database throught sequelize.

## Entities

Customer entity, Order entity, Order Item entity and Product entity with Address value object resulting in Customer aggregate, Order entity with Item entity in an one to many relationship and Item entity with Product entity together resulting in Order aggregate.

## Aggregates

Customer aggregate (Customer entity -> Address value object).
Order aggregate (Order entity -> Order item entity -> Product entity).

## Value Objects

Address value object.

## Domain Services

Order service and Product service.

## Repositories

Customer, Order and Product.

### 1. Configuring the project

```sh
npm install
```

### 2. Running the tests

```sh
npm test
```
