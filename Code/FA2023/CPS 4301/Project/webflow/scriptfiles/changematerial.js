document.addEventListener('DOMContentLoaded', () => {
    const model = document.querySelector('#model');
    const colorPicker = document.getElementById('colorPicker');
    const materialSelector = document.getElementById('materialSelector');

    // Function to change material and color
    function changeMaterialAndColor(color, materialType) {
        // Remove the existing material component
        model.removeAttribute('material');

        // Re-add the material component with new settings
        switch (materialType) {
            case 'standard':
            model.setAttribute('material', `color: ${color}; side: double; metalness: 0.5; roughness: 0.5;`);
            break;
        case 'lambert':
            model.setAttribute('material', `color: ${color}; side: double;`);
            break;
        case 'flat':
            model.setAttribute('material', `color: ${color}; side: double; shader: flat;`);
            break;
        default:
            model.setAttribute('material', `color: ${color}; side: double;`);
            break;
    }
}

    // Event listener for color picker
    colorPicker.addEventListener('input', function(event) {
        const currentMaterialType = materialSelector.value;
        changeMaterialAndColor(event.target.value, currentMaterialType);
    });

    // Event listener for material selector
    materialSelector.addEventListener('change', function(event) {
        const currentColor = colorPicker.value;
        changeMaterialAndColor(currentColor, event.target.value);
    });
});



// push3