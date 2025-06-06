Template.prototype.graph3DTemplate = () => `
<select id = 'selectSurface'>
        <option value="cube">Кубик</option>
        <option value="thor">Бублик</option>
        <option value="sphere">Шар</option>
        <option value="ellipsoid">Эллипсоид</option>
         <option value='cone'>Конус</option>
        <option value="kleinBottle">Бутылка Клейна</option>
        <option value='hyperbolicCylinder'>Гиперболический цилиндр</option>
        <option value='parabolicCylinder'>Параболический цилиндр</option>
        <option value='ellipticalCylinder'>Эллиптический цилиндр</option>
        <option value='singleLineHyperboloid'>Однополосной гиперболоид</option>
        <option value='twoLineHyperboloid'>Двуполосной гиперболоид</option>
        <option value='ellipticalParaboloid'>Эллиптический параболоид</option>
        <option value='hyperbolicParaboloid'> Гиперболический параболоид</option>
    </select>
<div id = custom>
    <label for="drawPoints">Нарисовать точки</label>
     <input class = 'customSurface' data-custom = 'drawPoints' type='checkbox' id='drawPoints' checked>

      <label for="drawEdges">Нарисовать ребра</label>
     <input class = 'customSurface' data-custom = 'drawEdges' type='checkbox' id='drawEdges' checked>
      
       <label for="drawPolygons">Нарисовать полигоны</label>
       <input class = 'customSurface' data-custom = 'drawPolygons' type='checkbox' id='drawPolygons' checked>

       <div>
      <label for = 'colorPoints'> Цвет точек</label>
      <input type='color' id = 'colorPoints'>
      
      <label for = 'colorEdges'> Цвет ребер</label>
      <input type='color' id = 'colorEdges'>

      <label for = 'colorPolygons'  >Цвет полигонов</label>
      <input type = 'color' id = 'colorPolygons' >
    </div>
</div> 

<div class = 'result'>
<span id = 'FPS'></span>
<canvas id='canvas3D'></canvas>
</div>
`;