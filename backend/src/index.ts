import server from './server';

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`Server is listening on ${port}`)
})
