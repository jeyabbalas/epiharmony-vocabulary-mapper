import './style.css'
import vocabMapperLogo from '/epiHarmony-VM-logo.svg';
import githubLogo from '/github-mark.svg';


function ui(divID) {
    let divUI = divID ? document.getElementById(divID) : document.createElement('div');

    divUI.innerHTML = `
<!-- Header -->
<div id="header" class="mx-auto px-4 sm:px-10 py-2 border-b border-gray-500">
    <div class="flex items-center justify-between">
        <div class="flex items-center justify-start gap-2">
            <div class="flex items-center">
                <img src="${vocabMapperLogo}" class="h-16 w-16 gap-2" alt="pie logo" />
            </div>
            <div class="min-w-0 pl-3 flex-1">
                <h2 class="flex items-center text-2xl font-bold leading-7 text-gray-800 sm:text-2xl sm:tracking-tight">epiHarmony -<span class="text-indigo-700 pl-2">Vocabulary Mapper</span></h2>
            </div>
        </div>
      
        <div class="flex md:mt-0 md:ml-4 shrink-0">
            <a title="Source code" href="https://github.com/jeyabbalas/epiharmony-vocabulary-mapper">
                <img src="${githubLogo}" class="h-14 w-14" alt="github logo" />
            </a>
        </div>
    </div>
</div>


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
    container.className = 'p-4';

    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'relative overflow-x-auto sm:rounded-lg w-full border border-gray-800';

    // Create table
    const table = document.createElement('table');
    table.className = 'text-sm text-gray-500 w-full border-collapse';

    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
    <tr class="text-gray-50 uppercase bg-indigo-700 border border-indigo-800">
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
        const isFinalIndex = index === Object.keys(jsonSchema).length - 1;
        row.className = isFinalIndex ? 'bg-white hover:bg-indigo-50' : 'bg-white border-b hover:bg-indigo-50';

        // Select checkbox
        const cellSelect = document.createElement('td');
        const checkboxSelect = document.createElement('input');
        checkboxSelect.type = 'checkbox';
        checkboxSelect.checked = true;
        checkboxSelect.className = 'form-checkbox h-5 w-5 accent-indigo-700';
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
        checkboxMap.className = 'form-checkbox h-5 w-5 accent-indigo-700';
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
        cellDesc.textContent = value.description || '-';
        cellDesc.className = 'p-2';
        row.appendChild(cellDesc);

        // Additional information
        const cellInfo = document.createElement('td');
        cellInfo.className = 'p-2';

        if (Object.keys(value).length > 1) {
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Show more';
            toggleBtn.className = 'bg-indigo-700 hover:bg-indigo-600 text-white shadow-md px-2 py-1 rounded text-sm';

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