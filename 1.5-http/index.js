const http = require('http');
const url = require('url');
const randomId = require('node-random-id');

// БД
let stor = {
    operations: [
        {id: randomId.ranid(), amount: 50,},
        {id: randomId.ranid(), amount: 150,},
    ],
};

// получение всех операций
const getOperationsAll = (operations = []) => {
    let i = 1;
    let tmpTblCont = operations.map(({id, amount}) => {
        return `<tr>
                     <th>${i++}</th>
                     <th>${amount}</th>
                     <td>
                        <a class="btn btn-sm btn-primary" href="/update?id=${id}">обновить</a>
                        <a  class="btn btn-sm btn-danger" href="/delete?id=${id}">удалить</a>
                    </td>
                </tr>`
    }).join('');

    let tmpTbl = `<table  class="table table-striped table-sm  mt-3">
                      <thead>
                          <tr>
                              <th scope="col">#</th>
                              <th> сумма</th>
                              <th>действие</th>
                          </tr>
                      </thead>
                      <tbody>
                        ${tmpTblCont}
                      </tbody>
                  </table>`;

    return tmpTbl
};

const formCreate = () => {
    return `<form method="POST" action="/create">
                <input name="count" type="number" />
                <button class="btn btn-sm btn-success" type="submit">создать</button>
            </form>`;
};

const formUpdate = ({id, amount})=>{
    return `<form method="POST" action="/update?id=${id}">
                <input name="count" type="number" value="${amount}" />
                <button class="btn btn-sm btn-outline-success" type="submit">сохранить</button>
            </form>`;
};

const layoutStart = `<link rel="stylesheet" 
                     href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
                     integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
                     crossorigin="anonymous"
                     >
                     <div class='container pt-5'>`;
const layoutEnd = `</div>`;

const server = http.createServer((req, res) => {

    // получаем параметры запроса
    const urlParsed = url.parse(req.url, true);
    const {pathname, query} = urlParsed;
    const {method} = req;

    res.setHeader("Content-Type", "text/html; charset=utf-8;");

    if (pathname === '/') {
        res.write(layoutStart);
        res.write(`<h2>Операции</h2>`);
        res.write(`<a class="btn btn-sm btn-primary" href="/create">Добавить запись</a>`);
        res.write(getOperationsAll(stor.operations));
        res.write(layoutEnd);

    } else if (pathname === '/create') {
        if (method === 'GET') {
            res.write(layoutStart);
            res.write(`<h2>Новая запись</h2>`);
            res.write(formCreate());
            res.write(layoutEnd);

        } else if (method === 'POST') {
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString().split('=')[1];
                stor.operations.push({id: randomId.ranid(), amount: body,})
            });

            res.statusCode = 302;
            res.setHeader("Location", "/");
        }

    } else if (pathname === '/update') {
        if (method === 'GET') {
            let condidate = stor.operations.findIndex(el => el.id === query.id);
            const operation = stor.operations[condidate];

            res.write(layoutStart);
            res.write("<h2>Редактировать запись</h2>");
            res.write(formUpdate(operation));
            res.write(layoutEnd);

        } else if (method === 'POST') {
            if (query.id) {
                let body = [];
                req.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    body = Buffer.concat(body).toString().split('=')[1];
                    let condidate = stor.operations.findIndex(el => el.id === query.id);
                    if (condidate !== -1) {
                        stor.operations[condidate].amount = body;
                    }
                });

                res.statusCode = 302;
                res.setHeader("Location", "/");
            }
        }

    } else if (pathname === '/delete') {
        stor.operations = stor.operations.filter(el => el.id !== query.id)
        res.statusCode = 302;
        res.setHeader("Location", "/");

    } else {
        res.statusCode = 404;
        res.write(layoutStart);
        res.write(`<h2>404 | Not found</h2>`);
        res.write(layoutEnd);
    }

    res.end()
});

server.listen(3000, () => {
    console.log('Server is running...')
});