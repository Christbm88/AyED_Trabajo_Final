

<img src="https://github.com/UNSA-MCC-2022/MCC_Algoritmos_2022/blob/main/logo_unsa.jpg" alt="UNSA" width="30%"/>

### Universidad Nacional de San Agustín <br/> Maestría en Ciencia de la Computación <br/>  Algoritmos y Estructura de Datos
<hr/>


# Practica 04

| DOCENTE | CARRERA | CURSO |
| :-: | :-: | :-: |
| Vicente Machaca Arceda | Maestría en Ciencia de la Computación | Algoritmos y Estructura de Datos |
<br/>

| PRÁCTICA | TEMA | DURACIÓN |
| :-: | :-: | :-: |
| 04 | KD Tree | 3 horas

## 1. Datos de los estudiantes
- Asmat Fuentes, Franz Rogger
- Esthela Espinoza, Fausto Danilo
- Ojeda Mamani, Abel Eberth
- Paredes Rodriguez, Raybert

## 2. Ejercicios

2.1. Cree un archivo _main.html_, este invocará a los archivos Javascript que vamos a crear. El archivo _p5.min.js_ es una librería para gráficos, la puede descargar de internet o se la puede pedir al profesor. En el archivo _quadtree.js_ estará todo el código de la estructura y en el archivo _sketch.js_ estará el código donde haremos pruebas del Quadtree.

```html
            <html>
            
            <head>
                <title> KD Tree </title>
                <script src="scripts/p5.min.js"> </script>
                <script src="scripts/kdtree.js"> </script>
                <script src="scripts/sketch.js"> </script>

                <style>
                    body{
                        font-family: Ubuntu, Arial, sans-serif;
                    }
                    .grid-container {
                        display: grid;
                        grid-template-columns: auto auto auto;
                        padding: 5px;
                    }
                    .grid-container>div {
                        text-align: center;
                        padding: 5px;
                    }
                </style>
            </head>
            
            <body>
                <div class="grid-container">
            		<div class="grid-item" style="vertical-align: middle;">
            			<img id="logoUnsa" src="img/logo_unsa.jpg" width="200" alt="UNSA">
            		</div>
            		<div class="grid-item">
            			<p style="font-size: 18px;font-weight: bold;">
            				Universidad Nacional de San Agust&iacute;n<br />
            				Maestr&iacute;a en Ciencias de la Computaci&oacute;n<br />
            				Algoritmos y Estructura de Datos<br />
            			</p>
            		</div>
            		<div class="grid-item">
            			<p style="font-size: 18px;font-weight: bold;">
                            Pr&aacute;ctica 04
            			</p>
                    </div>
            		<div class="grid-item">&nbsp;</div>
            		<div class="grid-item"><div id="QuadTreeCanvas"></div></div>
            		<div class="grid-item">&nbsp;</div>
            	</div>
            </body>
            </html>

```
        
2.2. Cree un archivo _kdtree.js_.

```javascript
  k = 2;
  
  class Node {
    constructor (point , axis ){
      this.point = point;
      this.left = null;
      this.right = null;
      this.axis = axis;
    }
  }
  
  function getHeight ( node ) { }
  function generate_dot ( node ) { }
  function build_kdtree ( points , depth = 0) { }
```

**Complete las funciones:**

- **build kdtree:** Construye el KD-Tree y retorna el nodo raiz.
    
```javascript
function build_kdtree(points, depth = 0) {
	var n = points.length;
	var axis = depth % k;

	if (n <= 0) {
		return  null;
	}

	if (n == 1) {
		return  new Node(points[0], axis)
	}

	var median = Math.floor(points.length / 2);
	points.sort(function (a, b) {
		return a[axis] - b[axis];
	});

	var left = points.slice(0, median);
	var right = points.slice(median + 1);
	var node = new Node(points[median].slice(0, k), axis);
	node.left = build_kdtree(left, depth + 1);
	node.right = build_kdtree(right, depth + 1);
 
	return node;
}
```
- **getHeight:** Retorna la altura del arbolt.
```javascript
function getHeight(node) {
	if (node == null)
		return  0;
	
	return max(1 + getHeight(node.left), 1 + getHeight(node.right));
}
```
- **generate dot:** Genera al árbol en formato dot
```javascript
function generate_dot(node) {
	var cad = '';
	if(node == null)
		return  '';

	if(node.left != null)
	{
		cad = cad + '"' + node.point.toString() + "\"";
		cad = cad + " -> " + '"' + node.left.point.toString() + '"' + ";" + "\n";
	}
	if(node.right != null)
	{
		cad = cad + "\"" + node.point.toString() + "\"";
		cad = cad + " -> " + '"' + node.right.point.toString() + '"' + ";" + "\n";
	}
	return cad + generate_dot(node.left) + generate_dot(node.right);
}
```

2.3. Cree un archivo sketch.js y evalue sus resultados.
        
```javascript

k = 2;
class Node {
	constructor(point, axis) {
		this.point = point;
		this.left = null;
		this.right = null;
		this.axis = axis;
	}
}
function getHeight(node) {
	if (node == null)
		return 0;
	return max(1 + getHeight(node.left), 1 + getHeight(node.right))
}

function generate_dot(node) { 
    var cad = '';
	if(node == null)
		return '';

	if(node.left!=null)
	{
		cad = cad + '"' + node.point.toString() + "\"";
		cad = cad + " -> " + '"' + node.left.point.toString() + '"' + ";" + "\n";
	}
	if(node.right!=null)
	{
		cad = cad + "\"" + node.point.toString() + "\"";
		cad = cad + " -> " + '"' + node.right.point.toString() + '"' + ";" + "\n";
	}
	return cad + generate_dot(node.left) + generate_dot(node.right);
}

function build_kdtree(points, depth = 0) {
	var n = points.length;
	var axis = depth % k;

	if (n <= 0) {
		return null;
	}
	if (n == 1) {
		return new Node(points[0], axis)
	}
	var median = Math.floor(points.length / 2);

	points.sort(function (a, b) {
		return a[axis] - b[axis];
	});

	var left = points.slice(0, median);
	var right = points.slice(median + 1);

	var node = new Node(points[median].slice(0, k), axis);
	node.left = build_kdtree(left, depth + 1);
	node.right = build_kdtree(right, depth + 1);

	return node;
}

function distanceSquared(point1, point2) {
	var distance = 0;
	for (var i = 0; i < k; i++)
		distance += Math.pow((point1[i] - point2[i]), 2);
	return Math.sqrt(distance);
}
//Pregunta 4
function closest_point_brute_force ( points , point ) {
    var PointCe = points[0];
	var DistanceMin = distanceSquared(points[0], point);
	for (var i = 1; i < points.length; i++) {
		var t = distanceSquared(points[i], point);
		if (DistanceMin > t) {
			PointCe = points[i];
			DistanceMin = t;
		}
	}
	return PointCe;
}
function naive_closest_point(node, point, depth = 0, best = null) {
	if (node != null) {
		var dis = distanceSquared(node.point, point);
		console.log(dis);
		if (best != null && distanceSquared(best, point) < dis) {
			return best;
		}
		else {
			if (node.point[node.axis] > point[node.axis]) {
				return naive_closest_point(node.left, point, depth + 1, node.point);
			}
			else {
				return naive_closest_point(node.right, point, depth + 1, node.point);
			}
		}
	}
	else {
		return best;
	}
}
function closer_point(point, p1, p2) {
	if (p2 == null) {
		return p1;
	}
	var distance = distanceSquared(p1.point, point);
	if (distance < distanceSquared(p2.point, point))
		return p1;
	return p2;

//Pregunta 7
function closest_point(node, point, depth = 0) {

	if (node === null)
		return null;
	var axis = depth % k;
	var next_branch = null;
	var opposite_branch = null;
	if (point[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}
	var best = closer_point(point, node, closest_point(next_branch, point, depth + 1));
	if (distanceSquared(point, best.point) > Math.abs(point[axis] - node.point[axis])) {
		best = closer_point(point, best, closest_point(opposite_branch, point, depth + 1));
	}

	return best;
}

//Pregunta 8
function KNN(points, point, K)
{
	var PointCe = [];
	var Result = [];
	var pointm=points[0];
	for (var i = 0; i < points.length; i++) 
	{
		var aux=distanceSquared(points[i],point);
		PointCe.push([aux,points[i]])
		//console.log(PointCe[i])

		PointCe.sort(function (a,b){
			return a[0]-b[0];
		});
	}
	for(var i = 0; i < PointCe.length; i++){
		Result.push(PointCe[i].slice(1,2));
	}
	console.log(Result.slice(0, k))
}

var p = 0;
//Pregunta 9
function range_query_circle(node, center, radio, queue, depth = 0) {
	if (node == null) {
		return null;
	}
	p += 1;
	console.log(p);
	var axis = node.axis;
	var next_branch = null;
	var opposite_branch = null;
	if (center[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}
	var best = closer_point(center, node, range_query_circle(next_branch, center, radio, queue, depth + 1));
	if (Math.abs(center[axis] - node.point[axis]) <= radio || distanceSquared(center, best.point) > Math.abs(center[axis] - node.point[axis])) {
		if (distanceSquared(center, node.point) <= radio) {
			queue.push(node.point);
		}
		best = closer_point(center, best, range_query_circle(opposite_branch, center, radio, queue, depth + 1));
	}

	return best;
}

//pregunta 10
function range_query_rect(node, center, hug, queue, depth = 0) {
	if (node == null) {
		return null;
	}
	p += 1;
	console.log(p);
	var axis = node.axis;
	var next_branch = null;
	var opposite_branch = null;
	if (center[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}
	var best = closer_point(center, node, range_query_rect(next_branch, center, hug, queue, depth + 1));
	if (Math.abs(center[axis] - node.point[axis]) <= hug[axis] * 2 || distanceSquared(center, best.point) > Math.abs(center[axis] - node.point[axis])) {
		if (Math.abs(center[0] - node.point[0]) <= hug[0] && Math.abs(center[1] - node.point[1]) <= hug[1]) {
			queue.push(node.point);
		}
		best = closer_point(center, best, range_query_rect(opposite_branch, center, hug, queue, depth + 1));
	}

	return best;
}

//pregunta 5
var data = [
    [40 ,70] ,
    [70 ,130] ,
    [90 ,40] ,
    [110 , 100] ,
    [140 ,110] ,
    [160 , 100]
];

var point = [140 ,90]; // query

//closest_point_brute_force ( data , point ) 
//naive_closest_point  ( data , point ) 
//fin pregunta 5

//pregunta 6
var data = [
	[40 ,70] ,
	[70 ,130] ,
	[90 ,40] ,
	[110 , 100] ,
	[140 ,110] ,
	[160 , 100] ,
	[150 , 30]
];

var point = [140 ,90]; // query
//closest_point_brute_force ( data , point ) 
//naive_closest_point  ( data , point ) 
//Fin pregunta 6

```
        
2.4. Implemente la función closest point brute force y naive closest point
        
```javascript
function closest_point_brute_force ( points , point ) {
	var PointCe = points[0];
	var DistanceMin = distanceSquared(points[0], point);
	for (var i = 1; i < points.length; i++) {
		var t = distanceSquared(points[i], point);
		if (DistanceMin > t) {
			PointCe = points[i];
			DistanceMin = t;
		}
	}
	return PointCe;
}

function naive_closest_point(node, point, depth = 0, best = null) {
	if (node != null) {
		var dis = distanceSquared(node.point, point);
		console.log(dis);
		if (best != null && distanceSquared(best, point) < dis) {
			return best;
		}
		else {
			if (node.point[node.axis] > point[node.axis]) {
				return naive_closest_point(node.left, point, depth + 1, node.point);
			}
			else {
				return naive_closest_point(node.right, point, depth + 1, node.point);
			}
		}
	}
	else {
		return best;
	}
}
```
2.5. Evalue el resultado de las dos funciones implementadas anteriormente con este conjunto de datos:
```javascript        
var data = [
	[40 ,70] ,
	[70 ,130] ,
	[90 ,40] ,
	[110 , 100] ,
	[140 ,110] ,
	[160 , 100]
];
```
        
2.6. Evalue el resultado de las dos funciones implementadas anteriormente con este conjunto de datos
        
```javascript
var data = [
	[40 ,70] ,
	[70 ,130] ,
	[90 ,40] ,
	[110 , 100] ,
	[140 ,110] ,
	[160 , 100] ,
	[150 , 30]
];
var point = [140 ,90]; // query
```
       
2.7. Ahora implemente la función closest point, siguiendo las recomendaciones dadas por el docente:
        
```javascript
function closest_point(node, point, depth = 0) {
	if (node === null)
		return  null;

	var axis = depth % k;
	var next_branch = null;
	var opposite_branch = null;

	if (point[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}

	var best = closer_point(point, node, closest_point(next_branch, point, depth + 1));
	if (distanceSquared(point, best.point) > Math.abs(point[axis] - node.point[axis])) {
		best = closer_point(point, best, closest_point(opposite_branch, point, depth + 1));
	}
	return best;
}      
```
        
2.8. Averigue e implemente una funcion KNN, que retorna los k puntos mas cercanos a un punto.
        
```javascript
function KNN(points, point, K) {
	var PointCe = [];
	var Result = [];
	var pointm=points[0];

	for (var i = 0; i < points.length; i++) {
		var aux=distanceSquared(points[i],point);
		PointCe.push([aux,points[i]])
		//console.log(PointCe[i])
		PointCe.sort(function (a, b){
			return a[0] -  b[0];
		});
	}
	for(var i = 0; i < PointCe.length; i++){
		Result.push(PointCe[i].slice(1,2));
	}
	console.log(Result.slice(0, k))
}
```
2.9. Implemente la función _range_query_circle_ del KD-Tree:
``` javascript
function range_query_circle(node, center, radio, queue, depth = 0) {
	if (node == null) {
		return  null;
	}
	p += 1;
	console.log(p);
	
	var axis = node.axis;
	var next_branch = null;
	var opposite_branch = null;

	if (center[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}
	var best = closer_point(center, node, range_query_circle(next_branch, center, radio, queue, depth + 1));
	if (Math.abs(center[axis] - node.point[axis]) <= radio || distanceSquared(center, best.point) > Math.abs(center[axis] - node.point[axis])) {
		if (distanceSquared(center, node.point) <= radio) {
			queue.push(node.point);
		}
		best = closer_point(center, best, range_query_circle(opposite_branch, center, radio, queue, depth + 1));
	}
	return best;
}
```
2.10. Implemente la función range query rec del KD-Tree, esta vez el range representa un rectángulo.
``` javascript
function range_query_rect(node, center, hug, queue, depth = 0) {
	if (node == null) {
		return  null;
	}
	p += 1;
	console.log(p);

	var axis = node.axis;
	var next_branch = null;
	var opposite_branch = null;
	
	if (center[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}
	
	var best = closer_point(center, node, range_query_rect(next_branch, center, hug, queue, depth + 1));

	if (Math.abs(center[axis] - node.point[axis]) <= hug[axis] * 2 || distanceSquared(center, best.point) > Math.abs(center[axis] - node.point[axis])) {
		if (Math.abs(center[0] - node.point[0]) <= hug[0] && Math.abs(center[1] - node.point[1]) <= hug[1]) {
			queue.push(node.point);
		}

		best = closer_point(center, best, range_query_rect(opposite_branch, center, hug, queue, depth + 1));
	}
	return best;
}
```

## 3. Repositorio

La implementación de los algoritmos y los datos utilizados es el siguiente:

https://github.com/UNSA-MCC-2022/AyED_Practica_04

## 4. Representación gráfica

Se realizó la implementación de la representación gráfica de los algoritmos indicados, esto se pueden visualizar en el siguiente enlace:

*KD Tree*

https://unsa-mcc-2022.github.io/AyED_Practica_04/index.html

*KD Tree Query*

https://unsa-mcc-2022.github.io/AyED_Practica_04/main.html

