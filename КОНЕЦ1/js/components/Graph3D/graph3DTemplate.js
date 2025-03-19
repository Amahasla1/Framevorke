Template.prototype.graph3DTemplate = () => `
<select id = 'selectSurface'>
        <option value="cube">Кубик</option>
        <option value="thor">Бублик</option>
        <option value="sphere">Шар</option>
         <option value='cone'>Конус</option>

    </select>
<div class = 'result'>
<span id = 'FPS'></span>
<canvas id='canvas3D'></canvas>
</div>
`;