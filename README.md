# Desarrollo de Aplicaciones - UNQ - Segundo Cuatrimestre 2017

## Morfi Ya!

#### Introducción

Morfi Ya! es una Single Web Application que tiene como objetivo facilitar la interacción entre proveedores de viandas y potenciales clientes.


#### Tecnologías Utilizadas

Backend: NodeJS, Typescript, MongoDB, Chai
Frontend: VUE, Jasmine


#### Instalación

* Descargar NVM (Node Version Manager)

Para descargar nvm podemos usar Wget o cURL

Wget

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

cURL

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

Luego tenemos que instalar la version de Node que queramos usar, en nuestro caso vamos a usar la version 6.11.1 (NVM permite instalar varias versiones de Node e ir cambiandolas cuando queramos)

```
nvm install 6.11.1
nvm use 6.11.1
```

Luego necesitamos instalar TypeScript

```
npm install -g typescript
```

Una vez que tenemos la version de node que queremos y typescript, clonamos el repositorio y en el directorio root del repositorio tiramos el install

```
npm install
```

Con eso ya tenemos el proyecto instalado con todas sus dependencias

#### Uso

Para levantar tanto el server como buildear el frontend para ser servido tenemos varias opciones

Podemos buildear el proyecto y luego levantarlo desde la carpeta root

```
npm run build
npm run start
```

o podemos usar el siguiente script que se encarga de hacer eso en una sola linea

```
npm run all
```

#### Gestión de Proyecto

* Seguimiento de tareas generales en [**Trello**][trello-url]

[trello-url]:https://trello.com/desarrollodeaplicaciones4


#### Integración Contínua y Deploy

* Enlace al repositorio de [**Integración Contínua en Travis**][travis-url]
* Enlace al deploy de la [**aplicación en Heroku**][deploy-url]

[travis-url]:https://travis-ci.org/sgobotta/dapp-unq-grupo-f-2017
[deploy-url]:https://group-f-morfi-ya-node.herokuapp.com



TO-DO

- Armar carpeta documentation para que no queden todos esos archivos sueltos y para poner ahí toda la documentación
