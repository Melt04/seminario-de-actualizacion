# Seminario-de-actualizacion

- Repositorio con el trabajo sobre una simulacion de chat sobre HTTP(sin web socket)

# Configuraciones

- Dentro de la raiz del proyecto, vamos a encontrar 2 carpetas
- Web: Es donde se encuentra la interfaz de usuario y se puede lanzar desde cualquier navegador(o utilizar la extension de VSCode)
- Dentro de la ruta api, se encuentra el back

# Configuracion del BE

Para poder configurarlo se debe crear un archivo `.env` dentro de la raiz api:

```
touch .env
```

Luego copiar el contenido de el archivo `.example.env`(no modificar el contenido)

# Documentacion

- Se encuentra en la carpeta docs los siguientes datos
  -
  - Querys de creacion de db y sp

# Como correr el proyecto

Instalar dependecias dentro de la carpeta api:

```
npm i
```

Ejecutar el servidor dentro de la carpeta api:

```
npm start
```

Se necesita tener una db levantada para poder utilizar la API
