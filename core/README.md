# Core

## Description

Core module of the project. Contains shared logic, types, and interfaces used by other parts of the repository.

## Requirements

- Node.js (recommended LTS version)
- npm (or compatible package manager)

## Installation

1. Install dependencies:

```
npm install
```

2. To publish locally, use the Verdaccio commands indicated above in this document.

## Build

Generate distribution artifacts:

```
npm run build
```

## Verdaccio

Install Verdaccio

```
npm install -g verdaccio
```

Run Verdaccio

```
verdaccio
```

Create user

```
npm adduser --registry http://localhost:4873/
```

Publish package

```
npm publish --registry http://localhost:4873/
```

Unpublish package

```
npm unpublish @fixlance/core@1.0.1 --force --registry http://localhost:4873/
```

## Install package

```
npm install @fixlance/core --registry http://localhost:4873/
```
