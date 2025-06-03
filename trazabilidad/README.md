# 📘 Curso Blockchain  
## 🗓️ Junio 2025

---

### 👤 Autores


**Francisco Hernando Gallego**  
📧 [fhernando@uva.es](mailto:fhernando@uva.es)

**Diego Martín**  
📧 [diego.martin.andres@uva.es](mailto:diego.martin.andres@uva.es)  

---

### 📚 Fuentes

* 🔗 [Big Data UPF – Introducción a redes y visualización](http://pablobarbera.com/big-data-upf/html/02a-networks-intro-visualization.html)  
* 🌌 [Evelina Gabasova – Star Wars social network](http://evelinag.com/blog/2015/12-15-star-wars-social-network/)

---

### 📝 Descripción

En este manual exploraremos algunas de las principales funciones que ofrece **R** para el análisis y visualización de **grafos**, aplicadas al universo de *Star Wars* ⭐.

Trabajaremos con un grafo que representa las relaciones entre personajes de la película original de 1977 🎬, aunque puedes aplicar la misma metodología a otras entregas de la saga. Los datos necesarios se encuentran en el directorio `/data/` del repositorio.

A lo largo del documento aprenderás a:

* 📥 Leer y explorar datos de relaciones en R.  
* 🧩 Representar gráficamente redes sociales.  
* 🔍 Analizar la estructura del grafo y detectar patrones.

El objetivo es ofrecer una introducción práctica al análisis de redes sociales usando un caso icónico y reconocible, con herramientas que luego podrás aplicar a otros contextos.

---

### 🌐 ¿Dónde se aplican los grafos?

El análisis de grafos es una técnica muy potente utilizada en múltiples ámbitos, como:

* 👥 **Redes sociales**: entender relaciones entre usuarios, detectar comunidades o identificar influenciadores.  
* 🧬 **Biología**: representar redes metabólicas o interacciones entre proteínas.  
* 🚉 **Transporte**: optimizar rutas y analizar conexiones entre nodos (aeropuertos, estaciones, etc.).  
* 🛡️ **Ciberseguridad**: detectar estructuras maliciosas o patrones sospechosos.  
* 🎯 **Sistemas de recomendación**: como los usados por Netflix o Amazon, basados en grafos de usuarios-productos.

---

### 🔗 Aplicación al contexto de Blockchain

En el contexto que nos interesa —**las blockchains**— los grafos resultan especialmente útiles para visualizar y analizar el **flujo de transacciones** en una red descentralizada ⚙️.

En este caso:

* 🟢 **Nodos** del grafo → representan **wallets** o direcciones únicas.  
* ➡️ **Arcos dirigidos** → representan **transacciones** entre wallets.

Gracias a esta representación podemos:

* 👀 Detectar patrones de comportamiento.  
* 🧠 Identificar wallets centrales o *hubs*.  
* 🧭 Reconstruir rutas de transferencia.  
* 🔎 Rastrear el movimiento de activos digitales.

Esta visión transforma la blockchain —una base de datos distribuida— en una **red de interacciones** que se puede explorar visualmente y matemáticamente 🧠📊.


---

## 🛠️ Paso 0: Preparativos iniciales

Antes de comenzar a trabajar con R, necesitas tener instalados dos programas:

### 🔵 Instalar R

**R** es un lenguaje de programación especializado en análisis estadístico, visualización de datos y ciencia de redes, entre otros.

🔗 Descárgalo desde su sitio oficial:
👉 [https://cran.r-project.org](https://cran.r-project.org)

> 💡 Recomendación: Seguramente estés usando Windows, pero puedes usar el sistema operativo que quieras. Una vez elegido el SO, elige "install R for the firts time" y después pincha en algo como "Download R-4.5.0 for Windows (86 megabytes, 64 bit)"

Cuando lo tengas descargado, instálalo siguiendo las instrucciones del asistente. Puedes dejar las opciones por defecto en la instalación.

Puedes tratar de ejecutarlo, pero no es importante ya que vamos a usar RStudio, que es un entorno de desarrollo integrado (IDE) que facilita mucho el trabajo con R.

---

### 🟦 Instalar RStudio (opcional pero muy recomendable)

**RStudio** es un entorno de desarrollo integrado (IDE) para trabajar con R. Hace que escribir, depurar y visualizar datos sea mucho más cómodo y visual.

🔗 Descárgalo desde:
👉 [https://posit.co/download/rstudio-desktop](https://posit.co/download/rstudio-desktop)

> ✅ Usar RStudio no es obligatorio, pero mejora mucho la experiencia.

Si te fijas el primer paso que te pide en la web es decargar e instalar R, pero eso ya lo has debido de hacer en el paso anterior.

Cuando lo tengas descargado, instálalo siguiendo las instrucciones del asistente, aunque no te va a preguntar apenas nada.

Cuando le ejecutes, deja los valores por defecto.

---

## ⚙️ 0. Inicialización del entorno

Ahora sí, comenzamos con la inicialización de nuestro entorno de trabajo en R.

### 📦 0.1 Instalación de paquetes necesarios

```r
install.packages("igraph")
install.packages("qgraph")
```

> 📥 R te puede que te pregunte por el servidor CRAN desde el que descargar los paquetes. Elige uno en España si puedes (aunque cualquier otro también funciona bien).

---

### 📚 0.2 Carga de librerías

Una vez descargados los paquetes, los cargamos con:

```r
library(igraph)
library(qgraph)
```

---

### 📁 0.3 Establecer el directorio de trabajo

```r
setwd("C:\\trazabilidad\\")
```

📝 Notas:

* En el código anterior, debes cambiar `"C:\\trazabilidad\\"` por la ruta donde quieras tener el proyecto.
* La ruta debe ir entre comillas y usando doble barra invertida `\\`.
* Puedes cambiarlo manualmente en R o RStudio:

  * En español: `Archivo -> Cambiar dir`
  * En inglés: `File -> Change dir`

---

### 🗂️ 0.4 Estructura recomendada de directorios

En el directorio de trabajo, se recomienda crear una carpeta llamada [`data`](data/) donde guardaremos nuestros archivos de datos (por ejemplo, el fichero [`sw_4.csv`](data/sw_4.csv) de esta práctica).

### 🗂️ 0.5 Abre el fichero de entrada de datos

Puedes abrir el fichero de entrada de datos directamente desde RStudio. 

## 🛠️ Comandos básicos y útiles en R

En este apartado vamos a repasar algunos comandos fundamentales para trabajar con vectores en **R**. Estos comandos nos permitirán crear, visualizar y analizar estructuras de datos simples como los vectores.

---

### 🔢 Crear un vector

Para crear un vector en R, usamos la función `c()`, que permite concatenar elementos. Por ejemplo:

```r
x = c(2, 5, 101, 34, 22, 0, 13, 4, 77, 3, 5, 75, 100, 43)
````

Este comando crea un vector llamado `x` con 14 elementos numéricos.

---

### 🔍 Visualizar el contenido del vector

Una vez creado el vector, podemos ver su contenido simplemente escribiendo su nombre:

```r
x
```

Esto devolverá todos los elementos del vector.

---

### 📏 Contar el número de elementos

Para saber cuántos elementos tiene un vector, usamos la función `length()`:

```r
length(x)
```

En el ejemplo anterior, nos devolverá `14`, ya que ese es el número de elementos que contiene el vector `x`.

También se puede usar directamente con otros vectores:

```r
length(c("azul", "verde", "rojo", "blanco"))
```

Este comando devolverá `4`, ya que se han pasado cuatro elementos al vector.

---

> ℹ️ **Nota**: La función `length()` es muy útil para cualquier tipo de vector, ya sea numérico, de texto (caracteres), lógico, etc.

---

## 📊 Ordenar elementos en R

Para poder analizar los datos de forma más efectiva, muchas veces necesitamos ordenarlos. R nos proporciona una función muy sencilla para ello: `sort()`.

---

### 🔢 Orden ascendente

```r
sort(x)
````

Ordena los elementos del vector `x` de menor a mayor.

> **Nota**: El vector debe ser de un tipo ordenable (números, caracteres...).

#### 📌 Ejemplos

```r
sort(c(23, 32, 4, 1, 399, -4))
```

Devuelve:

```
-4   1   4  23  32 399
```

```r
sort(c("azul", "verde", "rojo", "blanco"))
```

Devuelve:

```
"azul" "blanco" "rojo" "verde"
```

> En el caso de cadenas de texto, el orden es alfabético.

---

### 🔻 Orden descendente

Si queremos que el orden sea de mayor a menor, añadimos el parámetro `decreasing = TRUE`:

```r
sort(x, decreasing = TRUE)
```

Esto invierte el orden del vector ordenado.

---

## 🔍 Operaciones básicas sobre conjuntos de datos en R

En este apartado vamos a repasar cómo inspeccionar elementos de un conjunto de datos y cómo obtener sus valores extremos (mínimos y máximos) usando funciones básicas de **R**.

---

### 📌 Visualizar los primeros y últimos elementos

A menudo, cuando trabajamos con grandes vectores o listas, queremos echar un vistazo rápido a los primeros o últimos elementos para comprobar su contenido.

#### 🧪 Mostrar los primeros 6 elementos

```r
head(x)
````

Donde `x` es un conjunto de elementos. Por defecto, `head()` muestra los **primeros 6 elementos** del vector.

**Ejemplo:**

```r
head(c(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25))
```

---

#### 🧪 Mostrar los últimos 6 elementos

```r
tail(x)
```

La función `tail()` muestra los **últimos 6 elementos** del conjunto `x`.

**Ejemplo:**

```r
tail(c(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25))
```

---

### 📈 Obtener el valor máximo y mínimo

Una de las operaciones más comunes al trabajar con datos numéricos es localizar el valor más alto y el más bajo de un conjunto.

#### 🔼 Obtener el valor máximo

```r
max(x)
```

Devuelve el **mayor valor** del conjunto `x`.

**Ejemplo:**

```r
max(c(4,5,76,4,45,75,23,34,98,65,54,-12,34,65,-7,65,-34))
```

---

#### 🔽 Obtener el valor mínimo

```r
min(x)
```

Devuelve el **menor valor** del conjunto `x`.

**Ejemplo:**

```r
min(c(4,5,76,4,45,75,23,34,98,65,54,-12,34,65,-7,65,-34))
```

---

## 🔄 Convertir un grafo dirigido a no dirigido

> 🧠 **Nota importante:**
> El fragmento de código de más abajo**no es un código funcional que puedas copiar y ejecutar directamente**. En este punto del manual, aún no hemos construido el grafo `net`, por lo que si lo ejecutas, dará error.
>
> Este es simplemente un **adelanto visual** de cómo será la operación para transformar un grafo dirigido a no dirigido cuando lo tengamos listo más adelante.


Una de las operaciones que podemos realizar sobre un grafo es **cambiar su forma**, es decir, convertirlo de **dirigido** a **no dirigido** (y viceversa). Esto puede ser útil, por ejemplo, si queremos ignorar el sentido de las interacciones entre personajes y centrarnos únicamente en que exista o no una relación entre ellos.

En **`igraph`**, esto puede hacerse fácilmente con la función `as_undirected()`.

```r
# Convertimos el grafo dirigido 'net' a uno no dirigido
g_nodirigido <- igraph::as_undirected(net, mode = 'collapse')
````

🔁 También podrías encontrar este código con otra variable para ilustrar la misma idea:

```r
g_dirigido <- igraph::as_undirected(net, mode = 'collapse')
```

📌 En esta transformación, el parámetro `mode = "collapse"` es especialmente relevante:

* **`"collapse"`** combina los arcos entre dos nodos en uno solo (por ejemplo, si A → B y B → A, quedará una sola arista A—B sin dirección).

# 🚀 ¡Comenzamos con la práctica!

Ya tenemos todo preparado, así que ahora sí... ¡arranca la práctica! Vamos a ir paso por paso analizando y visualizando la red de personajes de *Star Wars: Episodio IV*.

---

## 📥 1. Carga de los Datos

En esta primera etapa vamos a cargar un fichero `.csv` que contiene los datos necesarios para construir un grafo. Este fichero representa las interacciones entre personajes de la película *Star Wars: Episodio IV (1977)*.

Utilizaremos la función `read.csv()` de R, que nos permite leer un archivo de texto separado por comas y almacenarlo como un **data frame**, es decir, una tabla con filas y columnas.

```r
grafo_enCSV <- read.csv("directorios\\nombreFichero.csv")
````

🔁 **Ejemplo real aplicado a nuestro caso**:

```r
grafo_enCSV <- read.csv("data\\sw_4.csv")
```

Con este comando:

* Estamos accediendo al archivo `"data/sw_4.csv"`, que contiene los datos de la red de personajes.
* Los datos se cargan en una variable que llamamos `grafo_enCSV`.

Para comprobar que los datos se han cargado correctamente, basta con escribir el nombre de la variable en la consola de R:

```r
grafo_enCSV
```

Esto mostrará por pantalla el contenido de la tabla, que servirá de base para construir y analizar el grafo. Podemos explorar las columnas disponibles, los personajes involucrados y las conexiones entre ellos.

---

### 📦 2. Conversión del CSV a objeto `igraph`

Una vez que hemos cargado el fichero CSV en memoria con la variable `grafo_enCSV`, es necesario convertir esta estructura a un objeto de tipo `igraph`, que es el formato que R utiliza para operar con grafos.

```r
g <- graph_from_data_frame(d = grafo_enCSV, directed = FALSE)
````

Con esta instrucción:

* Usamos la función `graph_from_data_frame()` del paquete `igraph`.
* El parámetro `d` indica el *data frame* de entrada que contiene las relaciones del grafo (en este caso, `grafo_enCSV`).
* El parámetro `directed = FALSE` indica que el grafo es **no dirigido**, es decir, las relaciones no tienen un sentido (por ejemplo, una conversación entre dos personajes en Star Wars sin importar quién habló primero).

> 🔁 Si quisiéramos trabajar con un grafo dirigido, bastaría con cambiar `directed = TRUE`.

---

## 📊 3. Obtención de valores estadísticos del grafo

En este apartado aprenderemos a extraer información básica pero muy útil sobre la estructura del grafo: sus vértices (nodos), sus aristas (conexiones) y sus propiedades asociadas.

---

### 🔹 3.1 Vértices del grafo

```r
V(g)
````

Este comando nos permite acceder a los **vértices** del grafo `g`.
Devuelve una lista con los objetos de tipo vértice, que contienen tanto su nombre como otras propiedades asociadas.

---

### 🔹 3.2 Nombres de los vértices

```r
V(g)$name
```

En este caso accedemos **solo a los nombres** de los vértices, es decir, el texto asociado a cada nodo.
Esto es diferente de `V(g)`, que devuelve los objetos completos. Aquí solo obtenemos el vector de nombres, útil para visualizar o procesar etiquetas.

---

### 🔹 3.3 Aristas del grafo

```r
E(g)
```

Con este comando accedemos a las **aristas** del grafo. Cada arista conecta dos vértices, y este comando nos da la lista completa de ellas.

---

### 🔹 3.4 Peso de las aristas

```r
E(g)$weight
```

Si las aristas tienen un **peso asociado** (por ejemplo, el número de interacciones entre personajes en una red social), este comando nos permite acceder a esa información.

---

### 🔹 3.5 Matriz de adyacencia

```r
g[]
```

Esta notación compacta genera la **matriz de adyacencia** del grafo, una representación en forma de tabla donde:

* Las filas y columnas representan los nodos.
* Las celdas indican si hay conexión entre dos nodos (y con qué peso, si procede).

Esta matriz es especialmente útil para análisis matricial o para visualizar fácilmente las relaciones entre nodos.

---

### 📊 4. Medidas de centralidad y fuerza

En esta sección vamos a calcular distintas medidas que nos permiten entender mejor la **importancia o influencia de cada nodo** dentro de la red.

---

#### 🔹 4.0 Grado de los nodos

El **grado** de un nodo mide cuántas aristas (conexiones) tiene.  
* En un grafo **no dirigido**, es simplemente el número de enlaces.
* En un grafo **dirigido**, puede dividirse en:
  * **Grado de entrada** (`in-degree`)
  * **Grado de salida** (`out-degree`)

```r
degree(g)
````

Esto devolverá un vector con el número de conexiones que tiene cada nodo. Es una forma rápida de saber quién está más "conectado".

---

#### 🔹 4.1 Fuerza de los nodos

La **fuerza** es una extensión del grado que **tiene en cuenta los pesos** de las aristas (si existen). Es decir, en lugar de contar conexiones, suma el peso de todas las conexiones del nodo.

```r
strength(g)
```

Esto es útil cuando las relaciones tienen diferente intensidad, por ejemplo, en una red donde el peso representa el número de interacciones entre personajes.

¿Quieres verlo ordenado?

```r
sort(strength(g), decreasing = TRUE)
```

---

#### 🔹 4.2 Intermediación (*Betweenness*)

La **intermediación** mide cuántas veces un nodo está en el **camino más corto** entre otros dos nodos.

👉 Es un indicador de **poder de intermediación o control**, ya que estos nodos pueden actuar como "puentes" entre distintas partes de la red.

```r
betweenness(g)
```

Cuanto mayor sea este valor, más importante es el nodo como punto de paso en la red.

¿Quieres verlo ordenado?
```r
sort(betweenness(g), decreasing = TRUE)
```

---

#### 🔹 4.3 Cercanía (*Closeness*)

La **cercanía** mide cuán "cerca" está un nodo del resto de nodos de la red, es decir, la **distancia media mínima** desde ese nodo al resto.

```r
closeness(g)
```

Se recomienda utilizar la versión normalizada para facilitar la comparación:

```r
closeness(g, normalized=TRUE)
```

Esta métrica es útil para detectar nodos que, sin tener muchas conexiones, pueden acceder rápidamente al resto de la red.


Para verlo en orden descendente:

```r
sort(closeness(g, normalized=TRUE), decreasing = TRUE)
```

---

#### 🔹 4.4 Obtener el Eigenvector (o vector propio)

La **centralidad del vector propio** (`eigenvector centrality`) mide la influencia de un nodo en función de la importancia de sus vecinos. En otras palabras, un nodo tiene alta centralidad si está conectado con otros nodos que también son centrales.

Esta medida **solo se aplica a grafos no dirigidos**.

```r
eigen_centrality(g)$vector
````

Este comando devuelve un vector con los valores de centralidad del vector propio para cada nodo del grafo `g`.

Para verlo ordenado de mayor a menor:

```r
sort(eigen_centrality(g)$vector, decreasing = TRUE)
```

---

#### 🔹 4.5 Obtener el PageRank

La medida de **PageRank** es una variante de la centralidad del vector propio, famosa por ser la base del algoritmo original de Google. Considera no solo cuántos enlaces recibe un nodo, sino también la calidad de esos enlaces.

Funciona con grafos dirigidos y no dirigidos.

```r
page_rank(g)$vector
```

Este comando proporciona el vector de PageRank para cada nodo del grafo `g`.

Para verlo ordenado de mayor a menor:

```r
sort(page_rank(g)$vector, decreasing = TRUE)
```

---

#### 🔹 4.6 Obtener el Authority Score

El **Authority Score** es una medida introducida en el análisis de hiperenlaces (algoritmo HITS), pensada originalmente para la web. Un nodo tiene una **alta puntuación de autoridad** si muchos nodos importantes (hubs) apuntan hacia él.

```r
hits_scores(g)$authority
```

Este comando devuelve un vector con los valores de autoridad para cada nodo del grafo `g`.

Para verlo ordenado de mayor a menor:

```r
sort(hits_scores(g)$authority, decreasing = TRUE)
```

---

### 🔢 4.7 Obtener el **Hub Score**

La *puntuación de intermediador* o **hub score** es otra medida de centralidad, originalmente ideada para el análisis de la Web. Mientras que el *authority score* mide qué tan citado es un nodo, el **hub score** mide qué tan buen intermediario es.

Un nodo actúa como **hub** cuando apunta a muchos nodos que, a su vez, son importantes. Es decir, cuando enlaza a nodos con alta autoridad. Esta métrica es especialmente útil para identificar nodos que son **difusores de información**.

```r
hits_scores(g)$hub
````

📌 *Donde `g` es el grafo.*
📤 El resultado es un vector con la puntuación de hub para cada nodo del grafo.

Para verlo ordenado de mayor a menor:

```r
sort(hits_scores(g)$hub, decreasing = TRUE)
```

---

### 🧭 4.8 Obtener vecinos y vecinos de vecinos

Aunque no es una medida de centralidad como tal, **analizar la vecindad de un nodo** (y de sus vecinos) puede ofrecer **mucha información estructural** sobre su posición en la red. Esta técnica es muy útil para estudiar la influencia local de un nodo.

#### 👥 Obtener los vecinos directos

```r
neighbors(g, v = which(V(g)$name == "nombre"))
```

📌 *Donde `g` es el grafo y `"nombre"` es el nombre del nodo cuyo entorno queremos explorar.*
Devuelve los **nodos vecinos directos**, es decir, conectados por una única arista.

✅ *Ejemplo con el droide R2-D2:*

```r
neighbors(g, v = which(V(g)$name == "R2-D2"))
```

---

#### 🕸️ Obtener vecinos de vecinos (orden 2)

Para analizar **entornos más amplios**, podemos usar la función `ego()`, que permite obtener nodos dentro de una cierta distancia.

```r
ego(g, order = 2, nodes = which(V(g)$name == "nombre"))
```

📌 *Donde `order = 2` indica que queremos nodos a distancia ≤ 2 del nodo indicado.*
Devuelve una lista con los nodos que están a uno o dos pasos del nodo inicial.

✅ *Ejemplo con R2-D2:*

```r
ego(g, order = 2, nodes = which(V(g)$name == "R2-D2"))
```

Esto nos permitirá explorar el **contexto extendido** del personaje en la red de relaciones de la película.

---

## 🔎 5. Propiedades de la red

En esta sección analizamos algunas propiedades estructurales globales del grafo, que nos ayudan a comprender mejor su tamaño, su cohesión y cómo están distribuidas las conexiones. Concretamente, nos fijaremos en el **diámetro de la red** y en el **camino más largo** entre dos nodos.

---

### 📏 5.1 Diámetro de la red

El **diámetro** de un grafo es la distancia más larga (en número de aristas o peso total, si están ponderadas) entre dos nodos cualesquiera. Es decir, representa la **mayor distancia mínima** entre dos nodos conectados.

```r
diameter(g)
````

Este comando calcula por defecto el diámetro del grafo `g`, considerando las direcciones y los pesos si los hubiera.

#### 🔧 Modificadores útiles:

* `directed=FALSE` → trata el grafo como **no dirigido**, útil si analizamos relaciones recíprocas.
* `weights=NA` → **ignora los pesos** de las aristas, considerando únicamente el número de saltos.

#### 🧪 Ejemplo:

```r
diameter(g, directed=FALSE, weights=NA)
```

Este ejemplo calcularía el diámetro **más largo en número de aristas** en un grafo no dirigido, sin tener en cuenta ponderaciones.

---

### 🛣️ 5.2 Camino más largo (get\_diameter)

El **camino más largo más corto**, o simplemente `get_diameter`, nos devuelve **los nodos que forman el diámetro** calculado previamente. Es decir, no solo la longitud, sino el camino en sí.

```r
get_diameter(g)
```

Este comando devuelve el vector de nodos que componen el camino más largo encontrado dentro del grafo `g`.

#### 🔧 Modificadores útiles:

* `directed=FALSE` → ignora la dirección de las aristas.
* `weights=NA` → ignora los pesos asignados a las aristas.

#### 🧪 Ejemplo:

```r
get_diameter(g, directed=FALSE, weights=NA)
```

Este ejemplo extrae el camino más largo **basado en número de saltos**, sin considerar pesos ni direcciones.

---

Estas propiedades nos dan una idea del **tamaño efectivo** del grafo, es decir, cuán lejos están entre sí los nodos más alejados, y qué tan conectada está la red en su conjunto.

### 📐 5.3 Distancia media del grafo

La **distancia media** (o _average path length_) es la media de todas las distancias más cortas entre cada par de nodos del grafo. En otras palabras, nos dice **cuántos pasos, de media, se necesitan para ir de un nodo a otro** dentro de la red.

```r
mean_distance(g)
````

Este comando calcula la distancia media teniendo en cuenta si el grafo es dirigido o no.

#### 🔧 Modificadores útiles:

* `directed=FALSE` → calcula la distancia media **ignorando la dirección** de las aristas.

#### 🧪 Ejemplo:

```r
mean_distance(g, directed=FALSE)
```

Este ejemplo nos devuelve la distancia media entre nodos, asumiendo que el grafo es no dirigido.

> Esta medida es muy útil para estimar **la eficiencia de la red** en términos de transmisión de información o flujo entre nodos.

---

### 🔁 5.4 Reciprocidad entre nodos

La **reciprocidad** mide la proporción de relaciones **bidireccionales** en un grafo dirigido. Es decir, dado un enlace de `A → B`, ¿también existe `B → A`?

```r
reciprocity(g)
```

Este comando devuelve un valor entre 0 y 1:

* `0` indica que **ninguna relación** es recíproca.
* `1` indica que **todas las relaciones** tienen su vuelta correspondiente.

> Esta propiedad solo tiene sentido en **grafos dirigidos**, donde importa la dirección de las conexiones.

---

Estas métricas permiten obtener una imagen más precisa del comportamiento global del grafo. La **distancia media** nos indica su compacidad, mientras que la **reciprocidad** nos habla sobre la simetría en las relaciones.

### 6. 🔗 Clustering
El análisis de *clustering* o detección de comunidades en un grafo permite identificar grupos de nodos que están más densamente conectados entre sí que con el resto del grafo. Esta técnica es muy útil para entender la estructura interna de la red.

---

#### 6.1 🎯 Representación de los clusters del grafo

En este apartado vamos a detectar y visualizar las comunidades del grafo utilizando el algoritmo **Infomap**, uno de los más eficaces para detectar comunidades en redes complejas.  
> ⚠️ *Importante*: Este procedimiento **solo es válido para grafos no dirigidos**. Por tanto, lo primero será asegurarnos de convertir el grafo.

```r
# Convertimos el grafo a no dirigido si no lo era ya.
g_nodirigido <- igraph::as_undirected(g, mode = 'collapse')
````

El modo `'collapse'` fusiona aristas múltiples entre los mismos nodos, sumando sus pesos si existieran.

A continuación, descomponemos el grafo en sus componentes conexos y nos quedamos únicamente con el mayor de ellos. Esto es habitual para evitar errores en algoritmos de clustering que no manejan bien nodos desconectados.

```r
# Extraemos la componente conexa gigante
giant <- decompose(g_nodirigido)[[1]]
```

Una vez tenemos el grafo limpio, aplicamos el algoritmo Infomap, que intenta optimizar la codificación de trayectorias aleatorias por la red para identificar comunidades:

```r
# Calculamos los clusters con Infomap
comm <- cluster_infomap(giant)
```

Finalmente, representamos visualmente las comunidades dentro del grafo:

```r
# Dibujamos el grafo coloreando los clusters
plot(comm, giant)
```

Este diagrama mostrará los nodos agrupados según las comunidades detectadas, usando diferentes colores para distinguirlas. Es una manera muy intuitiva de visualizar la organización de la red y detectar posibles subgrupos de interés (alianzas, grupos afines, etc.).


### 6.2 Representación de los clusters del grafo según *betweenness*

Para este análisis, también necesitaremos trabajar con un **grafo no dirigido**, por lo que la variable de entrada será `g_nodirigido`.

El objetivo en este caso es detectar comunidades dentro del grafo utilizando el algoritmo de **Edge Betweenness**, una técnica basada en la eliminación progresiva de las aristas con mayor intermediación (*betweenness*), lo que permite identificar los “puentes” que conectan diferentes comunidades.

---

#### 🧮 Cálculo de los clusters mediante *edge betweenness*

```r
ceb <- cluster_edge_betweenness(g_nodirigido)
````

Esta instrucción calcula la partición del grafo basada en las aristas con mayor intermediación. Cuanto más alto sea el *betweenness* de una arista, más probable es que conecte diferentes comunidades. Eliminando esas aristas, el algoritmo va separando el grafo en grupos más cohesivos internamente.

---

#### 🌿 Visualización jerárquica de los grupos detectados

```r
dendPlot(ceb, mode = "hclust")
```

Esto dibuja un **dendrograma**, es decir, una representación jerárquica de cómo se agrupan los nodos. Permite observar la estructura de los clusters a diferentes niveles de agregación.

---

#### 🖼️ Representación gráfica del grafo con los clusters

```r
plot(ceb, g_nodirigido)
```

Esta línea genera un gráfico del grafo, donde los nodos se agrupan y colorean automáticamente según su pertenencia a cada comunidad detectada por el algoritmo. Es una forma muy intuitiva de visualizar la estructura modular del grafo.


### 🎨 7. Plotting (Diagramas)

En esta sección vamos a aprender cómo realizar diagramas más informativos y personalizados del grafo, utilizando el ejemplo de Star Wars. El objetivo es destacar ciertos aspectos de la red, como por ejemplo, la facción a la que pertenece cada personaje. Esto se logra mediante la asignación de colores a los nodos.

---

#### 🧑‍🚀 7.1 Discriminar por facción

Vamos a pintar los nodos del grafo con colores diferentes dependiendo de la facción a la que pertenezca cada personaje. Para ello:

---

##### 🧩 7.1.1 Definir las facciones y sus personajes

Primero, creamos tres listas que agrupan los personajes en función de su alineamiento en el universo Star Wars:

```r
lado_oscuro <- c("DARTH VADER","EMPEROR","NUTE GUNRAY","GENERAL GRIEVOUS", "TARKIN","PIETT","RUNE","BOBA FETT","LAMA SU","COUNT DOOKU","DARTH MAUL",
"JANGO FETT","DOFINE","PK-4","SENATOR ASK AAK","POGGLE","SUN RIT","FANG ZAR", "GIDDEAN DANU","MOTTI","OZZEL","NEEDA","JERJERROD")

lado_luminoso <- c("ANAKIN","LUKE","OBI-WAN","C-3PO","R2-D2","CHEWBACCA","HAN", "LEIA","PADME","QUI-GON","YODA","JAR JAR","LANDO","RED LEADER","WEDGE",
"BAIL ORGANA","CAPTAIN PANAKA","MACE WINDU","BIGGS","GOLD LEADER","RIC OLIE", "SHMI","OWEN","ADMIRAL ACKBAR","GOLD FIVE","RED TEN","RIEEKAN","CAPTAIN TYPHO", "ZEV","BRAVO TWO","BOSS NASS","GENERAL CEEL","TEY HOW","RUWEE", "CLONE COMMANDER CODY","CLONE COMMANDER GREE","KI-ADI-MUNDI","ODD BALL",
"MON MOTHMA","BERU","JANSON","BRAVO THREE","TARPALS","CLIEGG","JOBAL","SOLA", "PLO KOON","CAPTAIN ANTILLES","CAMIE","DODONNA","DERLIN","RABE","REY","POE")

neutral <- c("FODE/BEED","WATTO","SIO BIBBLE","JABBA","MAD MADDA","TAUN WE", "TC-14","KITSTER","DACK","SEBULBA","JIRA","VALORUM","WALD","GREEDO", "ORN FREE TAA","TION MEDON","ON MEDON","BIB FORTUNA","BOUSHH")
````

---

##### 🎯 7.1.2 Asignar colores a los nodos

Utilizamos la propiedad `color` de los vértices (`V`) para asignar un color distinto a cada grupo:

* 🔴 Rojo para el **lado oscuro**
* 🟡 Dorado para el **lado luminoso**
* ⚪ Gris para los **personajes neutrales**

Esto se aplica tanto al grafo dirigido original `g`, como a su versión no dirigida `g_nodirigido`:

```r
V(g)$color <- NA
V(g)$color[V(g)$name %in% lado_oscuro] <- "red"
V(g)$color[V(g)$name %in% lado_luminoso] <- "gold"
V(g)$color[V(g)$name %in% neutral] <- "grey60"

V(g_nodirigido)$color <- NA
V(g_nodirigido)$color[V(g_nodirigido)$name %in% lado_oscuro] <- "red"
V(g_nodirigido)$color[V(g_nodirigido)$name %in% lado_luminoso] <- "gold"
V(g_nodirigido)$color[V(g_nodirigido)$name %in% neutral] <- "grey60"
```

---

Este tipo de codificación por color es especialmente útil a la hora de visualizar la estructura de la red y detectar agrupamientos naturales, patrones de comunicación o aislamiento entre facciones.


#### 7.1.3 Representación del grafo con nodos pintados según facción

Una vez que hemos clasificado los personajes en facciones (por ejemplo, lado luminoso, lado oscuro, etc.), podemos proceder a visualizar el grafo.  

```r
plot(g)
plot(g_nodirigido)
````

Ambos comandos nos permiten visualizar el grafo completo, tanto en su versión dirigida (`g`) como no dirigida (`g_nodirigido`). En este punto, los nodos aparecerán coloreados según la asignación que hayamos hecho anteriormente para distinguir facciones.

> ⚠️ Sin embargo, la representación por defecto puede resultar poco clara o no resaltar suficientemente la información relevante.

En la siguiente sección aprenderemos cómo mejorar esta visualización para hacerla más informativa y estética: ajustaremos tamaños, colores, etiquetas, y distribución espacial para que los nodos destaquen según su facción o importancia en la red.

---

### 7.2 Modificadores de la función `plot`

La función `plot()` del paquete `igraph` en R permite una gran personalización visual de los grafos. A continuación, se explican algunos de los modificadores más útiles para mejorar la presentación del grafo y destacar la información relevante.

#### Principales modificadores:

- `vertex.label.color` → Color del texto que muestra el nombre del nodo.
- `vertex.label.cex` → Tamaño del texto del nombre del nodo (como factor de escala, por ejemplo `0.75` reduce el tamaño al 75% del valor por defecto).
- `edge.arrow.size` → Tamaño de la flecha que indica la dirección de las aristas (en grafos dirigidos).
- `edge.arrow.mode` → Controla si se muestran las flechas. Se puede anular con valores como `"-"` para ocultarlas.
- `edge.color` → Color de las aristas del grafo.

Estos parámetros se pueden combinar para obtener una visualización más clara y estética del grafo.

#### Ejemplo de uso:

```r
plot(g,
     vertex.label.color = "black",     # El texto de los nombres de los nodos será negro
     vertex.label.cex = 0.75,          # El tamaño del texto será un 75% del original
     edge.arrow.size = 0.25,           # Las flechas serán pequeñas
     edge.arrow.mode = "-",            # Se eliminan las flechas (ideal para grafos no dirigidos)
     edge.color = "grey20"             # Las aristas se dibujarán en un gris oscuro
)
````

> Este tipo de personalización resulta especialmente útil cuando tenemos muchos nodos o aristas, ya que nos permite reducir el ruido visual y resaltar la estructura del grafo.


### 7.3 Cambiar el diseño o distribución de los nodos en un grafo

En muchas ocasiones, puede ser útil cambiar la **disposición visual de los nodos** del grafo para facilitar la interpretación o mejorar la estética del diagrama. Para ello, podemos utilizar el modificador `layout`, que nos permite aplicar distintos algoritmos de distribución de nodos.

Estos algoritmos determinan **cómo se colocan los nodos en el espacio** (2D o 3D) y pueden dar lugar a representaciones muy distintas de la misma estructura.

Algunos de los valores posibles para `layout` son:

- `layout_randomly`: distribución completamente aleatoria.
- `layout_with_kk`: algoritmo de Kamada-Kawai, basado en distancias de grafos (ideal para estructuras con comunidades).
- `layout_on_sphere`: coloca los nodos sobre una esfera tridimensional.
- `layout_in_circle`: coloca todos los nodos formando un círculo.
- `layout_as_star`: organiza los nodos con uno central y el resto alrededor, como una estrella.

A continuación se muestra un ejemplo utilizando `layout_on_sphere`:

```r
plot( g,
      layout = layout_on_sphere,
      vertex.label.color = "black",
      vertex.label.cex = 0.75,
      edge.arrow.size = 0.25,
      edge.arrow.mode = "-",
      edge.color = "grey20"
)
````

> 📌 **Sugerencia:** cambia `layout_on_sphere` por otras alternativas (como `layout_with_kk` o `layout_in_circle`) para observar cómo varía la estructura visual del grafo.
> Esto puede ayudarte a **destacar patrones, comunidades o conexiones relevantes** dependiendo del objetivo del análisis.

---

### 7.4 Distribuciones basadas en algoritmos

Además de las distribuciones predeterminadas como `layout_on_sphere` o `layout_in_circle`, podemos generar **distribuciones más elaboradas** usando algoritmos diseñados específicamente para representar grafos de forma más clara y significativa.

Uno de los algoritmos más conocidos y utilizados para este propósito es **Fruchterman-Reingold**. Este algoritmo se basa en una simulación de fuerzas físicas (atracción y repulsión entre nodos) para colocar los vértices en el espacio de forma que se minimicen los cruces de aristas y se mantenga una disposición equilibrada.

---

#### 📌 Paso 1: Calcular la distribución Fruchterman-Reingold

Primero almacenamos en una variable la distribución generada por el algoritmo:

```r
dist <- igraph::layout_with_fr(g)
````

Aquí usamos el grafo `g` como entrada para calcular las posiciones de los nodos.

---

#### 📌 Paso 2: Pintar el grafo con la nueva distribución

Una vez obtenidas las posiciones, las usamos como parámetro del grafo para representarlo visualmente:

```r
plot( g,
      layout = dist,                  # Aplicamos la distribución calculada
      vertex.label.color= "black",   # Color de las etiquetas de los nodos
      vertex.label.cex= 0.75,        # Tamaño del texto de las etiquetas
      edge.arrow.size=0.25,          # Tamaño de las flechas
      edge.arrow.mode = "-",         # Modo de flecha (aquí desactivada)
      edge.color="grey20"            # Color de las aristas
)
```

> ✅ Este tipo de algoritmos ayudan a generar representaciones más legibles y útiles para análisis visuales, especialmente en redes densas o con muchas conexiones.

Puedes probar también con otros algoritmos similares como `layout_with_fr` (abreviatura del anterior) o `layout_with_drl` para comparar resultados.


### 7.5 Distribución refinada con Fruchterman-Reingold

Una vez explorado el algoritmo de **Fruchterman-Reingold** en su versión básica, podemos realizar una distribución más **refinada** de los nodos del grafo, controlando parámetros que ajustan la forma en la que se repelen y agrupan los nodos.

---

#### 🔹 Paso 1: Obtener la lista de aristas

Primero extraemos las aristas del grafo en forma de lista de pares (sin nombres, es decir, como índices numéricos de los nodos):

```r
e <- as_edgelist(g, names=FALSE)
````

---

#### 🔹 Paso 2: Calcular la nueva distribución

Usamos la función `qgraph.layout.fruchtermanreingold()` para calcular una **disposición más ajustada**, controlando tres parámetros principales:

* `vcount=g`: número de nodos del grafo.
* `area=8*(vcount(g)^2)`: define el área de expansión del grafo (más área = nodos más separados).
* `repulse.rad=(vcount(g)^3.1)`: determina el radio de repulsión entre nodos (nodos demasiado cercanos se repelen con más fuerza).

```r
dist2 <- qgraph.layout.fruchtermanreingold(
  e,
  vcount = vcount(g),
  area = 8 * (vcount(g)^2),
  repulse.rad = (vcount(g)^3.1)
)
```

---

#### 🔹 Paso 3: Dibujar el grafo con la nueva distribución

Finalmente, aplicamos esta distribución al grafo usando el parámetro `layout` dentro de la función `plot()`:

```r
plot(
  g,
  layout = dist2,  # Se añade aquí la nueva distribución
  vertex.label.color = "black",
  vertex.label.cex = 0.75,
  edge.arrow.size = 0.25,
  edge.arrow.mode = "-",
  edge.color = "grey20"
)
```

Esto generará un diagrama más equilibrado visualmente, especialmente útil cuando se trabaja con redes grandes o densas, ya que permite una lectura más clara de las relaciones.

---

### 7.6 Compatibilidad entre distribuciones y clusters

Una de las ventajas de trabajar con `igraph` y `qgraph` es que las distribuciones espaciales de los nodos (layouts) que hemos generado previamente —como la distribución refinada con el algoritmo de **Fruchterman-Reingold**— pueden integrarse perfectamente con otras representaciones gráficas, como los **clusters** o comunidades detectadas en la red.

En esta sección vamos a representar el grafo incorporando:

- La distribución `dist2` generada anteriormente para mejorar la legibilidad del grafo.
- La partición en clusters calculada previamente mediante *edge betweenness* (`ceb`), que permite colorear automáticamente cada grupo.

```r
plot( g,
      ceb,                     # Información de clusters detectados
      layout = dist2,          # Distribución refinada de nodos
      vertex.label.color= "black",
      vertex.label.cex= 0.75,
      edge.arrow.size=0.25,
      edge.arrow.mode = "-",   # Sin flechas
      edge.color="grey20"
      )
```

---

### 7.7 Tamaño de los nodos según métricas de centralidad

Una técnica útil para destacar información relevante en una red es **modificar el tamaño de los nodos** en función de alguna métrica de centralidad. De esta forma, los nodos más importantes visualmente resaltan respecto al resto.

Algunas de las métricas más utilizadas para este propósito son:

- **Closeness**: mide cuán cerca está un nodo del resto.
- **Betweenness**: mide cuántas veces un nodo actúa como puente en los caminos más cortos.
- **PageRank**: basada en el algoritmo de Google, mide la importancia del nodo en función de su conectividad.
- **Eigenvector centrality**: mide la influencia del nodo en base a la importancia de sus vecinos.

En este ejemplo, vamos a modificar el **tamaño de los nodos** usando la métrica de **closeness**.

> 🛠️ *Importante: siempre utilizaremos el grafo no dirigido `g_nodirigido` para estos análisis, ya que muchas métricas no están definidas o no tienen tanto sentido en grafos dirigidos.*

---

#### 7.7.1 Aplicación de Closeness al tamaño de los nodos

```r
V(g_nodirigido)$size = closeness(g_nodirigido, mode = "out") / valor
````

* La división entre `valor` es simplemente una forma de escalar visualmente los tamaños para que se ajusten bien al grafo.
* Ese `valor` se debe ajustar de forma empírica, probando hasta encontrar una escala que resulte visualmente informativa.

**Ejemplo 1: Ajuste empírico multiplicando por 2000**

```r
V(g_nodirigido)$size = closeness(g_nodirigido, mode = "out") * 2000
```

---

#### 7.7.2 Visualización del grafo

Una vez ajustado el tamaño de los nodos, podemos visualizar el grafo utilizando la distribución de nodos que prefiramos. En este caso usamos `dist2`, que es una distribución refinada (por ejemplo, obtenida con Fruchterman-Reingold).

```r
plot(
  g_nodirigido,
  layout = dist2,                 # Distribución previamente calculada
  vertex.label.color = "black",   # Color del texto de las etiquetas
  vertex.label.cex = 0.75,        # Tamaño del texto
  edge.arrow.size = 0.25,         # Tamaño de las flechas
  edge.arrow.mode = "-",          # Sin flechas (grafo no dirigido)
  edge.color = "grey20"           # Color de las aristas
)
```

> ℹ️ *Recuerda que también puedes experimentar con otras métricas cambiando la función `closeness(...)` por `betweenness(...)`, `page_rank(...)$vector`, etc.*

---

#### 7.7.2 Modificar el tamaño de los nodos según la centralidad de intermediación (*betweenness*)

En esta sección vamos a ajustar el **tamaño de los nodos** en función de su valor de **betweenness**, una medida de centralidad que nos indica cuántos caminos más cortos entre pares de nodos pasan por un nodo determinado. Es útil para identificar **nodos intermediarios clave**.

```r
V(g_nodirigido)$size = betweenness(g_nodirigido) / valor
````

🔧 El parámetro `valor` actúa como un **factor de escala**. Es necesario **probar con distintos valores** para encontrar una visualización adecuada y legible.

📌 Ejemplo práctico:

```r
V(g_nodirigido)$size = betweenness(g_nodirigido) / 10
```

Una vez asignados los tamaños, podemos visualizar el grafo con nuestra distribución personalizada:

```r
plot(g_nodirigido,
     layout = dist2,                  # Usamos la distribución refinada definida anteriormente
     vertex.label.color = "black",   # Color del texto de las etiquetas de los nodos
     vertex.label.cex = 0.75,        # Tamaño del texto de las etiquetas
     edge.arrow.size = 0.25,         # Tamaño de las flechas
     edge.arrow.mode = "-",          # Sin flechas (solo líneas)
     edge.color = "grey20"           # Color de las aristas
)
```

---

#### 7.7.3 Modificar el tamaño de los nodos según la centralidad de vector propio (*eigen\_centrality*)

Otra forma de resaltar los nodos importantes es usar su **centralidad de vector propio**, también conocida como **eigenvector centrality**. Esta medida no solo tiene en cuenta cuántas conexiones tiene un nodo, sino también **la importancia de los nodos con los que está conectado**.

```r
V(g_nodirigido)$size = eigen_centrality(g_nodirigido)$vector * valor
```

🔧 Nuevamente, `valor` es un factor de escala que debemos ajustar manualmente.

📌 Ejemplo práctico:

```r
V(g_nodirigido)$size = eigen_centrality(g_nodirigido)$vector * 50
```

Y lo representamos gráficamente con el mismo estilo visual:

```r
plot(g_nodirigido,
     layout = dist2,
     vertex.label.color = "black",
     vertex.label.cex = 0.75,
     edge.arrow.size = 0.25,
     edge.arrow.mode = "-",
     edge.color = "grey20"
)
```

🧠 **Nota:** Estas representaciones son muy útiles para identificar visualmente qué nodos son clave en la estructura de la red según distintos criterios de centralidad.

