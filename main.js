import localforage from 'https://cdn.skypack.dev/localforage@1.10.0?min';

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

<!-- Data upload -->
<div id="data-upload-panel" class="mx-4 my-4 py-4 px-4 border border-gray-400 rounded-md">
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
                    <label for="source-schema-url" class="block font-medium text-sm text-indigo-900">File URL</label>
                    <input type="url" id="source-schema-url" name="source-schema-url" class="block rounded-sm w-full border-0 p-1 mb-1 bg-indigo-100 text-sm text-indigo-900 placeholder:text-indigo-500 focus:outline-none focus:ring-0 focus:border-0" placeholder="Enter URL" required>
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
                    <label for="target-schema-url" class="block font-medium text-sm text-indigo-900">File URL</label>
                    <input type="url" id="target-schema-url" name="target-schema-url" class="block rounded-sm w-full border-0 p-1 mb-1 bg-indigo-100 text-sm text-indigo-900 placeholder:text-indigo-500 focus:outline-none focus:ring-0 focus:border-0" placeholder="Enter URL" required>
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
            <svg class="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
                        <label for="mapping-url" class="block font-medium text-sm text-indigo-900">File URL</label>
                        <input type="url" id="mapping-url" name="mapping-url" class="block rounded-sm w-full border-0 p-1 mb-1 bg-indigo-100 text-sm text-indigo-900 placeholder:text-indigo-500 focus:outline-none focus:ring-0 focus:border-0" placeholder="Enter URL" required>
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
<div id="llm-config-panel" class="mx-4 my-4 py-4 px-4 border border-gray-400 rounded-md">
    <!-- Title -->
    <h1 class="pl-4 pb-6 pt-2 text-xl font-bold text-indigo-900">Step 2: Configure LLM</h1>
    
    <div class="inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
    </div>
</div>


<!-- Map source concepts to target concepts -->
<div id="map-panel" class="mx-4 my-4 py-4 px-4 border border-gray-400 rounded-md">
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
const scrollToContainer = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({behavior: 'smooth'});
    }
};


ui('app');


// Step 1: Upload schemas
const sourceSchemaUpload = document.getElementById('source-schema-upload');
const targetSchemaUpload = document.getElementById('target-schema-upload');
const mappingUpload = document.getElementById('mapping-upload');

const sourceSchemaURL = document.getElementById('source-schema-url');
const targetSchemaURL = document.getElementById('target-schema-url');
const mappingURL = document.getElementById('mapping-url');

const sourceSchemaErrorMessage = document.getElementById('source-schema-error-message');
const targetSchemaErrorMessage = document.getElementById('target-schema-error-message');
const mappingErrorMessage = document.getElementById('mapping-error-message');

const resetData = document.getElementById('reset-data');
const submitData = document.getElementById('submit-data');


const parseJsonFile = async (file) => {
    const fileText = await file.text();
    return JSON.parse(fileText);
};


const fetchJsonData = async (url, container) => {
    const response = await fetch(url);
    if (!response.ok) {
        displayError(`Network response was not ok: ${response.statusText}`, container)
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
};


// Custom error classes
class SourceSchemaError extends Error {
    constructor(message) {
        super(message);
        this.name = "SourceSchemaError";
    }
}

class TargetSchemaError extends Error {
    constructor(message) {
        super(message);
        this.name = "TargetSchemaError";
    }
}

class MappingError extends Error {
    constructor(message) {
        super(message);
        this.name = "MappingError";
    }
}


const validateSchema = (schema) => {
    // Schema should be an object
    if (!schema || typeof schema !== 'object') {
        return false;
    }

    // Schema should contain "properties" key
    if (!schema.properties || typeof schema.properties !== 'object') {
        return false;
    }

    // Schema should contain at least one property
    if (!Object.keys(schema.properties).length) {
        return false
    }

    return true;
};


const handleSchemaProcessing = async (schemaType, uploadElement, urlElement, errorMessageElement) => {
    if (!uploadElement.files.length && !urlElement.value) {
        if (schemaType === 'source') {
            throw new SourceSchemaError(`${schemaType} schema is required.`);
        } else if (schemaType === 'target') {
            throw new TargetSchemaError(`${schemaType} schema is required.`);
        }
    }

    let schema;
    try {
        if (urlElement.value) {
            schema = await fetchJsonData(urlElement.value, errorMessageElement);
            uploadElement.value = '';
        } else {
            schema = await parseJsonFile(uploadElement.files[0]);
            urlElement.value = '';
        }
    } catch (error) {
        if (schemaType === 'source') {
            throw new SourceSchemaError(`Error fetching or parsing ${schemaType} schema: ${error.message}`);
        } else if (schemaType === 'target') {
            throw new TargetSchemaError(`Error fetching or parsing ${schemaType} schema: ${error.message}`);
        }
    }

    if (!validateSchema(schema)) {
        if (schemaType === 'source') {
            throw new SourceSchemaError(`Invalid ${schemaType} schema.`);
        } else if (schemaType === 'target') {
            throw new TargetSchemaError(`Invalid ${schemaType} schema.`);
        }
    }

    await localforage.setItem(`${schemaType}Schema`, schema);
};


const validateMapping = (mapping) => {
    // Mapping should be an object
    if (!mapping || typeof mapping !== 'object') {
        return false;
    }

    // Mapping should contain both keys: "nodes" and "edges"
    if (!mapping.nodes || !mapping.edges) {
        return false;
    }

    // Both "nodes" and "edges" should be arrays
    if (!Array.isArray(mapping.nodes) || !Array.isArray(mapping.edges)) {
        return false;
    }

    // If "nodes" array is not empty, it should contain objects and the objects must have both keys: "id" and "group"
    if (mapping.nodes.length && !mapping.nodes.every(node => typeof node === 'object' && node.id && node.group)) {
        return false;
    }

    // If "edges" array is not empty, it should contain objects and the objects must have both keys: "source" and "target"
    if (mapping.edges.length && !mapping.edges.every(edge => typeof edge === 'object' && edge.source && edge.target)) {
        return false;
    }

    return true;
};


const handleMappingProcessing = async (uploadElement, urlElement, errorMessageElement) => {
    if (!uploadElement.files.length && !urlElement.value) {
        const initMapping = {
            "nodes": [],
            "edges": []
        }
        await localforage.setItem('mapping', initMapping);
        return;
    }

    let mapping;
    try {
        if (urlElement.value) {
            mapping = await fetchJsonData(urlElement.value, errorMessageElement);
        } else {
            mapping = await parseJsonFile(uploadElement.files[0]);
        }
    } catch (error) {
        throw new MappingError(`Error fetching or parsing the mapping file: ${error.message}`);
    }

    if (!validateMapping(mapping)) {
        throw new MappingError('Invalid mapping.');
    }

    await localforage.setItem('mapping', mapping);
};


const displayError = (message, container) => {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('bg-red-50', 'border', 'border-red-300', 'text-red-800', 'px-2', 'py-1', 'rounded', 'relative', 'text-sm', 'mt-2');
    errorMessage.innerHTML = `<strong class="font-bold">Error:</strong> ${message}`;
    container.appendChild(errorMessage);
};


const displaySuccess = (message, container) => {
    const successMessage = document.createElement('div');
    successMessage.classList.add('bg-green-50', 'border', 'border-green-300', 'text-green-800', 'px-2', 'py-1', 'rounded', 'relative', 'text-sm', 'mt-2');
    successMessage.innerHTML = `<strong class="font-bold">Success:</strong> ${message}`;
    container.appendChild(successMessage);
};


const setButtonState = (button, isLoading, originalHTML = null) => {
    if (isLoading) {
        const currentHTML = button.innerHTML;
        button.innerHTML = `
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Loading...
        `;
        button.disabled = true;
        return currentHTML;
    } else {
        button.innerHTML = originalHTML;
        button.disabled = false;
    }
};


function updateAppUrl(sourceUrl, targetUrl, mappingUrl) {
    // Base URL + required parameters
    let newUrl = `${window.location.origin}${window.location.pathname}?sourceSchemaUrl=${encodeURIComponent(sourceUrl)}&targetSchemaUrl=${encodeURIComponent(targetUrl)}`;

    // Optional parameter
    if (mappingUrl) {
        newUrl += `&mappingUrl=${encodeURIComponent(mappingUrl)}`;
    }

    // Update the URL in the browser
    window.history.replaceState(null, '', newUrl);
}


const resetAppUrl = () => {
    window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);
};


submitData.addEventListener('click', async () => {
    const originalHTML = setButtonState(submitData, true);

    try {
        clearContainers([sourceSchemaErrorMessage, targetSchemaErrorMessage, mappingErrorMessage]);
        // Note: in the future, send warning to the user if data already exists in local forage
        await localforage.clear();
        resetAppUrl();

        await handleSchemaProcessing('source', sourceSchemaUpload, sourceSchemaURL, sourceSchemaErrorMessage);
        await handleSchemaProcessing('target', targetSchemaUpload, targetSchemaURL, targetSchemaErrorMessage);
        await handleMappingProcessing(mappingUpload, mappingURL, mappingErrorMessage);

        updateAppUrl(sourceSchemaURL.value, targetSchemaURL.value, mappingURL.value);
        displaySuccess('Source schema loaded successfully.', sourceSchemaErrorMessage);
        displaySuccess('Target schema loaded successfully.', targetSchemaErrorMessage);
        if (mappingURL.value || mappingUpload.files.length) {
            displaySuccess('Mapping loaded successfully.', mappingErrorMessage);
        }
    } catch (error) {
        if (error instanceof SourceSchemaError) {
            displayError(error.message, sourceSchemaErrorMessage);
        } else if (error instanceof TargetSchemaError) {
            displayError(error.message, targetSchemaErrorMessage);
        } else if (error instanceof MappingError) {
            displayError(error.message, mappingErrorMessage);
        } else {
            console.error(error);
        }
    } finally {
        setButtonState(submitData, false, originalHTML);
    }
});


resetData.addEventListener('click', () => {
    // TODO
});


// App loaded through URL parameterization
window.addEventListener('DOMContentLoaded', async () => {
    // TODO
});


function clearContainers(containers) {
    containers.forEach(container => {
        container.innerHTML = '';
    });
}


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