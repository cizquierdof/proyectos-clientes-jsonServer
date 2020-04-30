# Aplicación React con backend json server

Ejercicio con una base de datos de proyectos y clientes usando com backend json server.

## Se necesitan

- Json server: npm i 
- Axios: npm i -s axios
- react-router-dom: npm i -s react-router-dom

Json servere arranca por defecto en el mismo puerto que react, el 3000 por lo que hay que hacer elegir otro. Para arrancarlo en el 4000:

```shell
json-server --watch db.json --port 4000
```