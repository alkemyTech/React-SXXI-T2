# Ong Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Implementacion Spinner
Se utilizó la librería Ant Design para implementar el componente Spinner
Se alteró el tamaño solo con el atributo size

---

Implementacion de componente Skeleton:

El atributo type es OPCIONAL y su valor puede ser cualquiera de estos tres (default es el valor por defecto):
<Skeleton type="button" />
<Skeleton type="input" />
<Skeleton type="avatar" />

El atributo size es OPCIONAL y su valor puede ser cualquiera de estos tres (default es el valor por defecto):
<Skeleton type="input" size="default" />
<Skeleton type="input" size="large" />
<Skeleton type="input" size="small" />

El atributo active es OPCIONAL y su valor puede ser TRUE o FALSE (false es el valor por defecto):
<Skeleton type="input" /> //false
<Skeleton type="input" active /> //true

El atributo block es OPCIONAL y su valor puede ser TRUE o FALSE (false es el valor por defecto):
<Skeleton type="input" /> //false
<Skeleton type="input" block /> //true

El atributo loading es OPCIONAL y su valor puede ser TRUE o FALSE (false es el valor por defecto):
<Skeleton type="input" /> //false
<Skeleton type="input" loading /> //true

---

#### `alertas`

Para crear una alerta, importar el servicio deseado (succesAlert, errorAlert y/o confirmAlert) de la carpeta Services.<br />
Una vez importada la alerta, completar con los parámetros deseados.
