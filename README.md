# Punto de Venta
Después de analizar las indicaciones y la interfaz presentada, se encontraron los siguientes puntos a resaltar:
- El punto 2 (indicar si deben dividir las propinas) es un poco ambiguo, dado que aunque se indica en las instrucciones que es división entre empleados,
en la interfaz se prestaa a confusión que sea división equitativa entre clientes.
- Partiendo de las imágenes de la interfaz facilitadas, se pujede observar que en la parte inferior "Total Pagado" se actualiza inmediatamente en cuanto se añade un pago a la lista.
Esto, de nuevo, se puede prestar a confusión, dado que realmente el pago no se registra en el sistema hasta que se presiona el botón correspondiente de pago. Se podría cambiar a una leyenda
del tipo "Total a Pagar" dado que sigue siendo una acción en presente.
En cuanto a las funcionalidades presentadas:
- No se indica cómo se deben de presentar los recibos, por lo que se tomó la libertad de presentar la información en formato simple.
- El dinero en caja se actualiza y representa el total de los pagos registrados en efectivo.
- Si bien, el sistema se preparo para tener conexión a una base de datos, para este test se determinó manejar un archivo json, simplificando el proceso de subir la información al repositorio.
- Se usaron las tecnologías y lenguajes solicitados.
- Se incluye un video demo de las funciones implementadas.


## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/)