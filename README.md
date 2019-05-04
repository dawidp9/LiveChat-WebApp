# ChatApp
## Usege 
```bash
$ npm install
$ npm-run-all build start
# or run with Nodemon
$ npm run dev
```

## Env example
.env file must be in root directory
```env
NODE_ENV=development

SERVER_PORT=8080
DB_CLUSTER=
DB_USER=
DB_PASS=
SESSION_SECRET=
```
in DB_* add your MongoDB credentials (local or Atlas)