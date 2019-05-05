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


## Demo Overview (gifs)
<p align="center" >
  <table align="center">
  <tr>
    <th>login</th>
    <th>chat room</th>
  </tr>
  <tr>
    <th><img src="demo/login_success.gif" width="320"/></th>
    <th><img src="demo/chat.gif" width="320"/></th>
  </tr>
   <tr>
      <th>register</th>
      <th>register (user exist)</th>
    </tr>
    <tr>
      <th><img src="demo/register_successv.gif" width="320"/></th>
      <th><img src="demo/register_exist.gif" width="320"/></th>
    </tr>
  </table>
</p>