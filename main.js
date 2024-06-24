import './style.css'
import vocabMapperLogo from '/epiHarmony-VM-logo.svg';
import githubLogo from '/github-mark.svg';


function ui(divID) {
    let divUI = divID ? document.getElementById(divID) : document.createElement('div');

    divUI.innerHTML = `
<!-- Header -->
<div id="header" class="mx-auto px-4 sm:px-10 py-2 border-b border-gray-400">
    <div class="flex items-center justify-between">
        <div class="flex items-center justify-start gap-2">
            <div class="flex items-center">
                <img src="${vocabMapperLogo}" class="h-12 sm:h-16 w-12 sm:w-16 gap-2" alt="epiharmony vacabulary mapper logo" />
            </div>
            <div class="min-w-0 pl-2 sm:pl-4 flex-1">
                <h2 class="flex items-center text-xl font-bold leading-7 text-indigo-900 sm:text-3xl sm:tracking-tight">epiHarmony</h2>
                <p class="text-indigo-700 text-sm font-medium sm:text-md">Vocabulary Mapper</p>
            </div>
        </div>
      
        <div class="flex md:mt-0 md:ml-4 shrink-0">
            <a title="Source code" href="https://github.com/jeyabbalas/epiharmony-vocabulary-mapper">
                <img src="${githubLogo}" class="h-10 sm:h-14 w-10 sm:w-14" alt="github logo" />
            </a>
        </div>
    </div>
</div>

<!-- Configuration -->
<div class="mx-4 my-4 py-4 px-4 border border-gray-400 rounded-md">
    <!-- Title -->
    <h1 class="pl-4 pb-6 pt-2 text-xl font-bold text-indigo-900">Step 1: Upload schemas</h1>
    
    <div class="inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
    </div>
    
    <!-- Flex container for panels and logo -->
    <div class="flex items-center justify-between my-4">
        <!-- Source schema upload -->
        <div id="source-schema-panel" class="relative py-2 w-[46%]">
            <h2 class="absolute transform left-4 -translate-y-1/2 px-2 font-bold text-indigo-900 bg-white whitespace-nowrap">Source schema</h2>
            <div class="rounded-md border border-gray-400 p-2 flex flex-col items-center pt-6">
                <!-- Source schema file upload -->
                <div class="relative rounded-t-md px-1.5 pb-1.5 pt-1.5 w-full ring-1 ring-inset ring-gray-400 focus-within:z-10 focus-within:ring-2">
                    <label for="source-schema-upload" class="block font-medium text-sm text-indigo-900">File upload</label>
                    <input type="file" id="source-schema-upload" name="source-schema-upload" class="block rounded-sm w-full p-1 mb-1 bg-indigo-100 text-sm text-indigo-900 placeholder:text-indigo-500 focus:outline-none focus:ring-0 focus:border-0" accept=".json" required>
                </div>
                
                <!-- or -->
                <div class="relative w-full my-1">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-400"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <span class="bg-white px-2 text-gray-900">or</span>
                    </div>
                </div>
                
                <!-- Source schema URL input -->
                <div class="relative rounded-md rounded-t-none px-1.5 pb-1.5 pt-1.5 w-full ring-1 ring-inset ring-gray-400 focus-within:z-10 focus-within:ring-2">
                    <label for="source-data-url" class="block font-medium text-sm text-indigo-900">File URL</label>
                    <input type="url" id="source-data-url" name="source-data-url" class="block rounded-sm w-full border-0 p-1 mb-1 bg-indigo-100 text-sm text-indigo-900 placeholder:text-indigo-500 focus:outline-none focus:ring-0 focus:border-0" placeholder="Enter URL" required>
                </div>
                
                <!-- Source schema error message container -->
                <div id="source-schema-error-message"></div>
            </div>
        </div>

        <!-- Logo -->
        <div class="flex items-center justify-center w-[8%]">
            <img src="${vocabMapperLogo}" class="h-12 sm:h-14 w-12 sm:w-14" alt="epiharmony vocabulary mapper logo" />
        </div>

        <!-- Target schema upload -->
        <div id="target-schema-panel" class="relative py-2 w-[46%]">
            <h2 class="absolute transform left-4 -translate-y-1/2 px-2 font-bold text-indigo-900 bg-white whitespace-nowrap">Target schema</h2>
            <div class="rounded-md border border-gray-400 p-2 flex flex-col items-center pt-6">
                <!-- Target schema file upload -->
                <div class="relative rounded-t-md px-1.5 pb-1.5 pt-1.5 w-full ring-1 ring-inset ring-gray-400 focus-within:z-10 focus-within:ring-2">
                    <label for="target-schema-upload" class="block font-medium text-sm text-indigo-900">File upload</label>
                    <input type="file" id="target-schema-upload" name="target-schema-upload" class="block rounded-sm w-full p-1 mb-1 bg-indigo-100 text-sm text-indigo-900 placeholder:text-indigo-500 focus:outline-none focus:ring-0 focus:border-0" accept=".json" required>
                </div>
                
                <!-- or -->
                <div class="relative w-full my-1">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-400"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <span class="bg-white px-2 text-gray-900">or</span>
                    </div>
                </div>
                
                <!-- Target schema URL input -->
                <div class="relative rounded-md rounded-t-none px-1.5 pb-1.5 pt-1.5 w-full ring-1 ring-inset ring-gray-400 focus-within:z-10 focus-within:ring-2">
                    <label for="target-data-url" class="block font-medium text-sm text-indigo-900">File URL</label>
                    <input type="url" id="target-data-url" name="target-data-url" class="block rounded-sm w-full border-0 p-1 mb-1 bg-indigo-100 text-sm text-indigo-900 placeholder:text-indigo-500 focus:outline-none focus:ring-0 focus:border-0" placeholder="Enter URL" required>
                </div>
                
                <!-- Target schema error message container -->
                <div id="target-schema-error-message"></div>
            </div>
        </div>
    </div>
    
    <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
            <span class="bg-white px-2 text-gray-500">
            <svg class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            </span>
        </div>
    </div>
    
    <div class="py-4">
        <div class="flex justify-center gap-2">
            <!-- Mapping upload -->
            <div id="mapping-panel" class="relative py-2 px-10 w-[80%] sm:w-[46%]">
                <h2 class="absolute transform left-14 -translate-y-1/2 px-2 font-bold text-indigo-900 bg-white whitespace-nowrap">Mapping (optional)</h2>
                <div class="rounded-md border border-gray-400 p-2 flex flex-col items-center pt-6">
                    <!-- Mapping file upload -->
                    <div class="relative rounded-t-md px-1.5 pb-1.5 pt-1.5 w-full ring-1 ring-inset ring-gray-400 focus-within:z-10 focus-within:ring-2">
                        <label for="mapping-upload" class="block font-medium text-sm text-indigo-900">File upload</label>
                        <input type="file" id="mapping-upload" name="mapping-upload" class="block rounded-sm w-full p-1 mb-1 bg-indigo-100 text-sm text-indigo-900 placeholder:text-indigo-500 focus:outline-none focus:ring-0 focus:border-0" accept=".json" required>
                    </div>
                    
                    <!-- or -->
                    <div class="relative w-full my-1">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-400"></div>
                        </div>
                        <div class="relative flex justify-center">
                            <span class="bg-white px-2 text-gray-900">or</span>
                        </div>
                    </div>
                    
                    <!-- Mapping URL input -->
                    <div class="relative rounded-md rounded-t-none px-1.5 pb-1.5 pt-1.5 w-full ring-1 ring-inset ring-gray-400 focus-within:z-10 focus-within:ring-2">
                        <label for="mapping-data-url" class="block font-medium text-sm text-indigo-900">File URL</label>
                        <input type="url" id="mapping-data-url" name="mapping-data-url" class="block rounded-sm w-full border-0 p-1 mb-1 bg-indigo-100 text-sm text-indigo-900 placeholder:text-indigo-500 focus:outline-none focus:ring-0 focus:border-0" placeholder="Enter URL" required>
                    </div>
                    
                    <!-- Mapping error message container -->
                    <div id="mapping-error-message"></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
    </div>
    
    <!-- Reset and submit buttons -->
    <div class="pt-4">
        <div class="flex justify-center gap-2">
            <button id="reset-data" class="rounded-md border border-black bg-red-700 text-base text-white py-1 px-3 font-medium shadow-md hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-white">Reset</button>
            <button id="submit-data" class="rounded-md border border-black bg-indigo-700 text-base text-white py-1 px-3 font-medium shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-1 focus:ring-white">Load</button>
        </div>
    </div>
</div>


<!-- LLM Configuration -->
<div class="mx-4 my-4 py-4 px-4 border border-gray-400 rounded-md">
    <!-- Title -->
    <h1 class="pl-4 pb-6 pt-2 text-xl font-bold text-indigo-900">Step 2: Configure LLM</h1>
    
    <div class="inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
    </div>
</div>


<!-- Map source concepts to target concepts -->
<div class="mx-4 my-4 py-4 px-4 border border-gray-400 rounded-md">
    <!-- Title -->
    <h1 class="pl-4 pb-6 pt-2 text-xl font-bold text-indigo-900">Step 3: Map source concepts to target concepts</h1>
    
    <div class="inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
    </div>
</div>
<div id="nearest-neighbors" class="p-4"></div>
     `;
}


// User interface
ui('app');


// Data setup


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
        cellSelect.className = 'p-1 text-center';
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
        cellMap.className = 'p-1 text-center';
        row.appendChild(cellMap);

        // Serial number
        const cellNo = document.createElement('td');
        cellNo.textContent = (index + 1).toString();
        cellNo.className = 'p-1';
        row.appendChild(cellNo);

        // Variable name
        const cellName = document.createElement('td');
        cellName.textContent = key;
        cellName.className = 'font-medium text-gray-900 p-1';
        row.appendChild(cellName);

        // Description
        const cellDesc = document.createElement('td');
        cellDesc.textContent = value.description || '-';
        cellDesc.className = 'p-1';
        row.appendChild(cellDesc);

        // Additional information
        const cellInfo = document.createElement('td');
        cellInfo.className = 'p-1';

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