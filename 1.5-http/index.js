const http = require('http')
const url = require('url')
const randomId = require('node-random-id')

/**
 * База данных
 * @type {Object}
 */
let database = {
  operations: [
    { id: randomId.ranid(), amount: 50 },
    { id: randomId.ranid(), amount: 150 },
  ],
}

/**
 * @param {Array} [operations]
 * @return {String}
 */
const getAllOperationsComponent = (operations = []) => {
  let tableRows = operations.map(({ id, amount }, index) => {
    return (`
        <tr>
          <th>${++index}</th>
          <th>${amount}</th>
            <td>
              <a class="btn btn-sm btn-primary" href="/update?id=${id}">обновить</a>
              <a class="btn btn-sm btn-danger" href="/delete?id=${id}">удалить</a>
            </td>
        </tr>
       `)
  }).join('')

  return (`
    <table class="table table-striped table-sm  mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th>сумма</th>
          <th>действие</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `)
}

/**
 * @return {String}
 */
const getFormCreateComponent = () => (`
  <form
    method="POST"
    action="/create"
  >
  <input
    name="count"
    type="number"
  />
    <button
      class="btn btn-sm btn-success"
      type="submit"
    >
      создать
    </button>
  </form>
`)

/**
 * @param {String} id
 * @param {String} amount
 * @return {String}
 */
const getFormUpdateComponent = ({ id, amount }) => (`
  <form
    method="POST"
    action="/update?id=${id}"
  >
    <input
      name="count" 
      type="number"
      value="${amount}"
    />
    <button
      class="btn btn-sm btn-outline-success" 
      type="submit"
    >
      сохранить
    </button>
  </form>
`)

/**
 * @type {String}
 */
const layoutStart = (`
  <link
    rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
    crossorigin="anonymous"
  />
    <div class='container pt-5'>
`)

/**
 * @type {String}
 */
const layoutEnd = `</div>`

/**
 * @see https://nodejs.org/docs/latest-v14.x/api/http.html#http_http_createserver_options_requestlistener
 * @example
 ```
 http.createServer([options][, requestListener])
 ```
 * The requestListener is a function which is automatically added to the 'request' event.
 *
 * @type {http.Server}
 */
const server = http.createServer((req, res) => {

  // получаем параметры запроса
  const urlParsed = url.parse(req.url, true)
  const { pathname, query } = urlParsed
  const { method } = req

  res.setHeader('Content-Type', 'text/html; charset=utf-8;')

  // route '/'
  if (pathname === '/') {
    res.write(layoutStart)
    res.write(`<h2>Операции</h2>`)
    res.write(`<a class="btn btn-sm btn-primary" href="/create">Добавить запись</a>`)
    res.write(getAllOperationsComponent(database.operations))
    res.write(layoutEnd)

    // route '/create'
  } else if (pathname === '/create') {
    if (method === 'GET') {
      res.write(layoutStart)
      res.write(`<h2>Новая запись</h2>`)
      res.write(getFormCreateComponent())
      res.write(layoutEnd)

    } else if (method === 'POST') {
      let body = []
      req
        .on('data', (chunk) => {
          body.push(chunk)
        })
        .on('end', () => {
          body = Buffer.concat(body).toString().split('=')[1]
          database.operations.push({ id: randomId.ranid(), amount: body })
        })

      // '302 Found' redirect status response code indicates that the resource
      // requested has been temporarily moved to the URL given by the Location header.
      res.statusCode = 302
      res.setHeader('Location', '/')
    }

    // route '/update'
  } else if (pathname === '/update') {
    if (method === 'GET') {
      let operationIndex = database.operations.findIndex(el => el.id === query.id)
      const operation = database.operations[operationIndex]

      res.write(layoutStart)
      res.write('<h2>Редактировать запись</h2>')
      res.write(getFormUpdateComponent(operation))
      res.write(layoutEnd)

    } else if (method === 'POST') {
      if (query.id) {
        let body = []
        req
          .on('data', (chunk) => {
            body.push(chunk)
          })
          .on('end', () => {
            body = Buffer.concat(body).toString().split('=')[1]
            let operationIndex = database.operations.findIndex(el => el.id === query.id)
            if (operationIndex !== -1) {
              database.operations[operationIndex].amount = body
            }
          })

        res.statusCode = 302
        res.setHeader('Location', '/')
      }
    }

    // route '/delete'
  } else if (pathname === '/delete') {
    database.operations = database.operations.filter(el => el.id !== query.id)
    res.statusCode = 302
    res.setHeader('Location', '/')

    // route anything else
  } else {
    // '404 Not Found' client error response code indicates that the server
    // can't find the requested resource.
    res.statusCode = 404
    res.write(layoutStart)
    res.write(`<h2>404 | Not found</h2>`)
    res.write(layoutEnd)
  }

  res.end()
})

/**
 * @see https://nodejs.org/docs/latest-v14.x/api/http.html#http_server_listen
 * Starts the HTTP server listening for connections.
 */
server.listen(3000, () => {
  console.log('Server is running, go to http://localhost:3000/')
})
