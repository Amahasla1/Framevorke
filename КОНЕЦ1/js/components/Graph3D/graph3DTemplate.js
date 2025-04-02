Template.prototype.graph3DTemplate = () => `
<select id = 'selectSurface'>
        <option value="cube">Кубик</option>
        <option value="thor">Бублик</option>
        <option value="sphere">Шар</option>
        <option value='cone'>Конус</option>
        <option value="ellipsoid">Мяч США</option>
        <option value="ellipticalCylinder">Цилиндр</option>
        <option value='parabolicCylinder'>Параболический цилиндр</option>

    </select>
<div class = 'result'>
<span id = 'FPS'></span>
<canvas id='canvas3D'></canvas>
</div>
`;