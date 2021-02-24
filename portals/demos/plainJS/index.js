
let outlet = document.getElementById('outlet');



let tooltipElements = document.getElementsByClassName('article');



document.addEventListener('click', (e) => {
    // Tooltip handler
    if (e.target.classList.contains('visible-tooltip')) {
        return;
    }
    outlet.innerHTML = '';

    if (!e.target.classList.contains('tooltip')
    ) {
        return;
    }

    let id = e.target.dataset.tooltipId;

    let rect = e.target.getClientRects()[0];
    let x = rect.x + rect.width;
    let y = rect.y;

    addTooltip(id, x, y, outlet);
});

function addTooltip(id, x, y, outlet) {
    let element = document.createElement('div');

    element.classList.add('visible-tooltip');


    element.style.top = y +'px';
    element.style.left = x + 'px';
    element.style.position = 'relative';

    element.innerHTML = `
        This is a tooltip for element with id ${id}
    `;

    outlet.appendChild(element);
}

let a = document.getElementById('portal')

console.log(a)