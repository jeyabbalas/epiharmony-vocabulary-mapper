import './style.css'


function ui(divID) {
    let divUI = divID ? document.getElementById(divID) : document.createElement('div');

    divUI.innerHTML = `
<div id="nearest-neighbors"></div>
     `;
}


ui('app');

const exampleJson = {
    "name": {type: ["string", "null"], "description": "Name of the person"},
    "age": {type: ["number", "null"], "description": "Age of the person"},
    "address": {
        "type": "object",
        "description": "Address of the person",
        "properties": {
            "street": {"type": "string"},
            "city": {"type": "string"}
        }
    },
    "phoneNumber": {
        "type": ["string", "null"],
        "description": "The phone number of the person",
        "pattern": "^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$"
    }
};

generateJsonSchemaUI('nearest-neighbors', exampleJson);

console.log(`Selected keys:`, getSelectedKeys('nearest-neighbors'));
console.log(`Selected keys (select):`, getSelectedKeys('nearest-neighbors', 'select'));
console.log(`Selected keys (map):`, getSelectedKeys('nearest-neighbors', 'map'));

// Programmatically select keys
setMapCheckboxes('nearest-neighbors', ['age', 'address']);
console.log(`After modification: selected keys (map):`, getSelectedKeys('nearest-neighbors', 'map'));


function generateJsonSchemaUI(containerId, jsonSchema) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }
    container.innerHTML = "";

    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'relative overflow-x-auto p-4 w-full';

    // Create table
    const table = document.createElement('table');
    table.className = 'text-sm text-gray-500 w-full border-collapse';

    // Create table header
    const thead = document.createElement('thead');
    thead.className = 'text-gray-700 bg-gray-200 border';
    thead.innerHTML = `
    <tr>
      <th class="p-2 text-center">Select</th>
      <th class="p-2 text-center">Map</th>
      <th class="p-2 text-left">No.</th>
      <th class="p-2 text-left">Variable name</th>
      <th class="p-2 text-left">Description</th>
      <th class="p-2 text-left">Additional information</th>
    </tr>
  `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    // Populate table rows
    Object.entries(jsonSchema).forEach(([key, value], index) => {
        const row = document.createElement('tr');
        row.className = 'bg-white border hover:bg-gray-50';

        // Select checkbox
        const cellSelect = document.createElement('td');
        const checkboxSelect = document.createElement('input');
        checkboxSelect.type = 'checkbox';
        checkboxSelect.checked = true;
        checkboxSelect.className = 'form-checkbox h-5 w-5 text-blue-600';
        checkboxSelect.dataset.key = key;
        checkboxSelect.dataset.type = 'select';
        cellSelect.appendChild(checkboxSelect);
        cellSelect.className = 'p-2 text-center';
        row.appendChild(cellSelect);

        // Map checkbox
        const cellMap = document.createElement('td');
        const checkboxMap = document.createElement('input');
        checkboxMap.type = 'checkbox';
        checkboxMap.checked = false;
        checkboxMap.className = 'form-checkbox h-5 w-5 text-green-600';
        checkboxMap.dataset.key = key;
        checkboxMap.dataset.type = 'map';
        cellMap.appendChild(checkboxMap);
        cellMap.className = 'p-2 text-center';
        row.appendChild(cellMap);

        // Serial number
        const cellNo = document.createElement('td');
        cellNo.textContent = (index + 1).toString();
        cellNo.className = 'p-2';
        row.appendChild(cellNo);

        // Variable name
        const cellName = document.createElement('td');
        cellName.textContent = key;
        cellName.className = 'font-medium text-gray-900 p-2';
        row.appendChild(cellName);

        // Description
        const cellDesc = document.createElement('td');
        cellDesc.textContent = value.description || '';
        cellDesc.className = 'p-2';
        row.appendChild(cellDesc);

        // Additional information
        const cellInfo = document.createElement('td');
        cellInfo.className = 'p-2';

        if (Object.keys(value).length > 1) {
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Show more';
            toggleBtn.className = 'bg-blue-500 hover:bg-blue-600 text-white shadow-md px-2 py-1 rounded text-sm';

            const infoContent = document.createElement('div');
            infoContent.className = 'mt-2 hidden';
            infoContent.appendChild(createTree(value));

            toggleBtn.addEventListener('click', () => {
                infoContent.classList.toggle('hidden');
                toggleBtn.textContent = infoContent.classList.contains('hidden') ? 'Show more' : 'Hide';
            });

            cellInfo.appendChild(toggleBtn);
            cellInfo.appendChild(infoContent);
        }

        row.appendChild(cellInfo);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    container.appendChild(tableWrapper);
}


function createTree(obj) {
    const ul = document.createElement('ul');
    ul.className = 'list-disc pl-4';

    Object.entries(obj).forEach(([key, value]) => {
        if (key !== 'description') {
            const li = document.createElement('li');
            li.className = 'mb-1';

            if (typeof value === 'object' && value !== null) {
                li.textContent = `${key}:`;
                li.appendChild(createTree(value));
            } else {
                li.textContent = `${key}: ${JSON.stringify(value)}`;
            }

            ul.appendChild(li);
        }
    });

    return ul;
}


function getSelectedKeys(containerId, type = 'both') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return {select: [], map: []};
    }

    let checkboxes;
    if (type === 'both') {
        checkboxes = container.querySelectorAll('input[type="checkbox"]');
    } else {
        checkboxes = container.querySelectorAll(`input[type="checkbox"][data-type="${type}"]`);
    }

    const selectedKeys = {
        select: [],
        map: []
    };

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            if (checkbox.dataset.type === 'select' && (type === 'both' || type === 'select')) {
                selectedKeys.select.push(checkbox.dataset.key);
            } else if (checkbox.dataset.type === 'map' && (type === 'both' || type === 'map')) {
                selectedKeys.map.push(checkbox.dataset.key);
            }
        }
    });

    if (type === 'select') {
        return selectedKeys.select;
    } else if (type === 'map') {
        return selectedKeys.map;
    }

    return selectedKeys;
}


function setMapCheckboxes(containerId, keysToMap) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }

    const checkboxes = container.querySelectorAll('input[type="checkbox"][data-type="map"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = keysToMap.includes(checkbox.dataset.key);
    });
}