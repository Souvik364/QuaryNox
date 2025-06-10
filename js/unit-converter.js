/**
 * QUARYNOX - Unit Converter Script
 * This file contains the functionality for the Unit Converter tool
 */

document.addEventListener('DOMContentLoaded', function() {
    initUnitConverter();
});

/**
 * Initialize Unit Converter Functionality
 */
function initUnitConverter() {
    // Get elements
    const unitConverterContainer = document.getElementById('unit-converter');
    
    // If the container doesn't exist, return
    if (!unitConverterContainer) return;
    
    // Get converter type tabs and content
    const converterTabs = document.querySelectorAll('.converter-tab');
    const converterContents = document.querySelectorAll('.converter-content');
    
    // Add event listeners to tabs
    converterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            converterTabs.forEach(t => t.classList.remove('active'));
            converterContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // Initialize each converter
    initLengthConverter();
    initWeightConverter();
    initTemperatureConverter();
    initAreaConverter();
    initVolumeConverter();
    initTimeConverter();
    initSpeedConverter();
    initDataConverter();
}

/**
 * Initialize Length Converter
 */
function initLengthConverter() {
    const lengthForm = document.getElementById('length-converter-form');
    if (!lengthForm) return;
    
    const lengthInput = document.getElementById('length-input');
    const lengthFromUnit = document.getElementById('length-from-unit');
    const lengthToUnit = document.getElementById('length-to-unit');
    const lengthResult = document.getElementById('length-result');
    const lengthSwapBtn = document.getElementById('length-swap-btn');
    const lengthClearBtn = document.getElementById('length-clear-btn');
    
    // Length conversion factors to meters
    const lengthFactors = {
        'mm': 0.001,
        'cm': 0.01,
        'm': 1,
        'km': 1000,
        'in': 0.0254,
        'ft': 0.3048,
        'yd': 0.9144,
        'mi': 1609.34
    };
    
    // Handle form submission
    lengthForm.addEventListener('submit', function(event) {
        event.preventDefault();
        convertLength();
    });
    
    // Handle input change
    lengthInput.addEventListener('input', convertLength);
    lengthFromUnit.addEventListener('change', convertLength);
    lengthToUnit.addEventListener('change', convertLength);
    
    // Handle swap button
    if (lengthSwapBtn) {
        lengthSwapBtn.addEventListener('click', function() {
            const tempUnit = lengthFromUnit.value;
            lengthFromUnit.value = lengthToUnit.value;
            lengthToUnit.value = tempUnit;
            convertLength();
        });
    }
    
    // Handle clear button
    if (lengthClearBtn) {
        lengthClearBtn.addEventListener('click', function() {
            lengthInput.value = '';
            lengthResult.textContent = '';
        });
    }
    
    // Length conversion function
    function convertLength() {
        if (!lengthInput.value) {
            lengthResult.textContent = '';
            return;
        }
        
        const inputValue = parseFloat(lengthInput.value);
        if (isNaN(inputValue)) {
            lengthResult.textContent = 'Please enter a valid number';
            return;
        }
        
        const fromUnit = lengthFromUnit.value;
        const toUnit = lengthToUnit.value;
        
        // Convert to meters, then to target unit
        const meters = inputValue * lengthFactors[fromUnit];
        const result = meters / lengthFactors[toUnit];
        
        // Format result based on magnitude
        let formattedResult;
        if (result < 0.01 || result > 10000) {
            formattedResult = result.toExponential(6);
        } else if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }
        
        lengthResult.textContent = `${formattedResult} ${toUnit}`;
    }
}

/**
 * Initialize Weight Converter
 */
function initWeightConverter() {
    const weightForm = document.getElementById('weight-converter-form');
    if (!weightForm) return;
    
    const weightInput = document.getElementById('weight-input');
    const weightFromUnit = document.getElementById('weight-from-unit');
    const weightToUnit = document.getElementById('weight-to-unit');
    const weightResult = document.getElementById('weight-result');
    const weightSwapBtn = document.getElementById('weight-swap-btn');
    const weightClearBtn = document.getElementById('weight-clear-btn');
    
    // Weight conversion factors to grams
    const weightFactors = {
        'mg': 0.001,
        'g': 1,
        'kg': 1000,
        'oz': 28.3495,
        'lb': 453.592,
        't': 1000000,
        'st': 6350.29
    };
    
    // Handle form submission
    weightForm.addEventListener('submit', function(event) {
        event.preventDefault();
        convertWeight();
    });
    
    // Handle input change
    weightInput.addEventListener('input', convertWeight);
    weightFromUnit.addEventListener('change', convertWeight);
    weightToUnit.addEventListener('change', convertWeight);
    
    // Handle swap button
    if (weightSwapBtn) {
        weightSwapBtn.addEventListener('click', function() {
            const tempUnit = weightFromUnit.value;
            weightFromUnit.value = weightToUnit.value;
            weightToUnit.value = tempUnit;
            convertWeight();
        });
    }
    
    // Handle clear button
    if (weightClearBtn) {
        weightClearBtn.addEventListener('click', function() {
            weightInput.value = '';
            weightResult.textContent = '';
        });
    }
    
    // Weight conversion function
    function convertWeight() {
        if (!weightInput.value) {
            weightResult.textContent = '';
            return;
        }
        
        const inputValue = parseFloat(weightInput.value);
        if (isNaN(inputValue)) {
            weightResult.textContent = 'Please enter a valid number';
            return;
        }
        
        const fromUnit = weightFromUnit.value;
        const toUnit = weightToUnit.value;
        
        // Convert to grams, then to target unit
        const grams = inputValue * weightFactors[fromUnit];
        const result = grams / weightFactors[toUnit];
        
        // Format result based on magnitude
        let formattedResult;
        if (result < 0.01 || result > 10000) {
            formattedResult = result.toExponential(6);
        } else if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }
        
        weightResult.textContent = `${formattedResult} ${toUnit}`;
    }
}

/**
 * Initialize Temperature Converter
 */
function initTemperatureConverter() {
    const tempForm = document.getElementById('temperature-converter-form');
    if (!tempForm) return;
    
    const tempInput = document.getElementById('temperature-input');
    const tempFromUnit = document.getElementById('temperature-from-unit');
    const tempToUnit = document.getElementById('temperature-to-unit');
    const tempResult = document.getElementById('temperature-result');
    const tempSwapBtn = document.getElementById('temperature-swap-btn');
    const tempClearBtn = document.getElementById('temperature-clear-btn');
    
    // Handle form submission
    tempForm.addEventListener('submit', function(event) {
        event.preventDefault();
        convertTemperature();
    });
    
    // Handle input change
    tempInput.addEventListener('input', convertTemperature);
    tempFromUnit.addEventListener('change', convertTemperature);
    tempToUnit.addEventListener('change', convertTemperature);
    
    // Handle swap button
    if (tempSwapBtn) {
        tempSwapBtn.addEventListener('click', function() {
            const tempUnit = tempFromUnit.value;
            tempFromUnit.value = tempToUnit.value;
            tempToUnit.value = tempUnit;
            convertTemperature();
        });
    }
    
    // Handle clear button
    if (tempClearBtn) {
        tempClearBtn.addEventListener('click', function() {
            tempInput.value = '';
            tempResult.textContent = '';
        });
    }
    
    // Temperature conversion function
    function convertTemperature() {
        if (!tempInput.value) {
            tempResult.textContent = '';
            return;
        }
        
        const inputValue = parseFloat(tempInput.value);
        if (isNaN(inputValue)) {
            tempResult.textContent = 'Please enter a valid number';
            return;
        }
        
        const fromUnit = tempFromUnit.value;
        const toUnit = tempToUnit.value;
        
        let result;
        
        // Convert to Celsius first
        let celsius;
        switch (fromUnit) {
            case 'C':
                celsius = inputValue;
                break;
            case 'F':
                celsius = (inputValue - 32) * 5/9;
                break;
            case 'K':
                celsius = inputValue - 273.15;
                break;
        }
        
        // Convert from Celsius to target unit
        switch (toUnit) {
            case 'C':
                result = celsius;
                break;
            case 'F':
                result = celsius * 9/5 + 32;
                break;
            case 'K':
                result = celsius + 273.15;
                break;
        }
        
        // Format result
        let formattedResult;
        if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = result.toFixed(2).replace(/\.?0+$/, '');
        }
        
        tempResult.textContent = `${formattedResult} °${toUnit}`;
    }
}

/**
 * Initialize Area Converter
 */
function initAreaConverter() {
    const areaForm = document.getElementById('area-converter-form');
    if (!areaForm) return;
    
    const areaInput = document.getElementById('area-input');
    const areaFromUnit = document.getElementById('area-from-unit');
    const areaToUnit = document.getElementById('area-to-unit');
    const areaResult = document.getElementById('area-result');
    const areaSwapBtn = document.getElementById('area-swap-btn');
    const areaClearBtn = document.getElementById('area-clear-btn');
    
    // Area conversion factors to square meters
    const areaFactors = {
        'mm2': 0.000001,
        'cm2': 0.0001,
        'm2': 1,
        'km2': 1000000,
        'in2': 0.00064516,
        'ft2': 0.092903,
        'yd2': 0.836127,
        'ac': 4046.86,
        'ha': 10000,
        'mi2': 2589988.11
    };
    
    // Handle form submission
    areaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        convertArea();
    });
    
    // Handle input change
    areaInput.addEventListener('input', convertArea);
    areaFromUnit.addEventListener('change', convertArea);
    areaToUnit.addEventListener('change', convertArea);
    
    // Handle swap button
    if (areaSwapBtn) {
        areaSwapBtn.addEventListener('click', function() {
            const tempUnit = areaFromUnit.value;
            areaFromUnit.value = areaToUnit.value;
            areaToUnit.value = tempUnit;
            convertArea();
        });
    }
    
    // Handle clear button
    if (areaClearBtn) {
        areaClearBtn.addEventListener('click', function() {
            areaInput.value = '';
            areaResult.textContent = '';
        });
    }
    
    // Area conversion function
    function convertArea() {
        if (!areaInput.value) {
            areaResult.textContent = '';
            return;
        }
        
        const inputValue = parseFloat(areaInput.value);
        if (isNaN(inputValue)) {
            areaResult.textContent = 'Please enter a valid number';
            return;
        }
        
        const fromUnit = areaFromUnit.value;
        const toUnit = areaToUnit.value;
        
        // Convert to square meters, then to target unit
        const squareMeters = inputValue * areaFactors[fromUnit];
        const result = squareMeters / areaFactors[toUnit];
        
        // Format result based on magnitude
        let formattedResult;
        if (result < 0.01 || result > 10000) {
            formattedResult = result.toExponential(6);
        } else if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }
        
        areaResult.textContent = `${formattedResult} ${toUnit}`;
    }
}

/**
 * Initialize Volume Converter
 */
function initVolumeConverter() {
    const volumeForm = document.getElementById('volume-converter-form');
    if (!volumeForm) return;
    
    const volumeInput = document.getElementById('volume-input');
    const volumeFromUnit = document.getElementById('volume-from-unit');
    const volumeToUnit = document.getElementById('volume-to-unit');
    const volumeResult = document.getElementById('volume-result');
    const volumeSwapBtn = document.getElementById('volume-swap-btn');
    const volumeClearBtn = document.getElementById('volume-clear-btn');
    
    // Volume conversion factors to liters
    const volumeFactors = {
        'ml': 0.001,
        'l': 1,
        'm3': 1000,
        'cm3': 0.001,
        'mm3': 0.000001,
        'in3': 0.0163871,
        'ft3': 28.3168,
        'gal': 3.78541,
        'qt': 0.946353,
        'pt': 0.473176,
        'cup': 0.236588,
        'oz': 0.0295735,
        'tbsp': 0.0147868,
        'tsp': 0.00492892
    };
    
    // Handle form submission
    volumeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        convertVolume();
    });
    
    // Handle input change
    volumeInput.addEventListener('input', convertVolume);
    volumeFromUnit.addEventListener('change', convertVolume);
    volumeToUnit.addEventListener('change', convertVolume);
    
    // Handle swap button
    if (volumeSwapBtn) {
        volumeSwapBtn.addEventListener('click', function() {
            const tempUnit = volumeFromUnit.value;
            volumeFromUnit.value = volumeToUnit.value;
            volumeToUnit.value = tempUnit;
            convertVolume();
        });
    }
    
    // Handle clear button
    if (volumeClearBtn) {
        volumeClearBtn.addEventListener('click', function() {
            volumeInput.value = '';
            volumeResult.textContent = '';
        });
    }
    
    // Volume conversion function
    function convertVolume() {
        if (!volumeInput.value) {
            volumeResult.textContent = '';
            return;
        }
        
        const inputValue = parseFloat(volumeInput.value);
        if (isNaN(inputValue)) {
            volumeResult.textContent = 'Please enter a valid number';
            return;
        }
        
        const fromUnit = volumeFromUnit.value;
        const toUnit = volumeToUnit.value;
        
        // Convert to liters, then to target unit
        const liters = inputValue * volumeFactors[fromUnit];
        const result = liters / volumeFactors[toUnit];
        
        // Format result based on magnitude
        let formattedResult;
        if (result < 0.01 || result > 10000) {
            formattedResult = result.toExponential(6);
        } else if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }
        
        volumeResult.textContent = `${formattedResult} ${toUnit}`;
    }
}

/**
 * Initialize Time Converter
 */
function initTimeConverter() {
    const timeForm = document.getElementById('time-converter-form');
    if (!timeForm) return;
    
    const timeInput = document.getElementById('time-input');
    const timeFromUnit = document.getElementById('time-from-unit');
    const timeToUnit = document.getElementById('time-to-unit');
    const timeResult = document.getElementById('time-result');
    const timeSwapBtn = document.getElementById('time-swap-btn');
    const timeClearBtn = document.getElementById('time-clear-btn');
    
    // Time conversion factors to seconds
    const timeFactors = {
        'ns': 1e-9,
        'μs': 1e-6,
        'ms': 0.001,
        's': 1,
        'min': 60,
        'h': 3600,
        'day': 86400,
        'week': 604800,
        'month': 2592000, // 30 days
        'year': 31536000, // 365 days
        'decade': 315360000,
        'century': 3153600000
    };
    
    // Handle form submission
    timeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        convertTime();
    });
    
    // Handle input change
    timeInput.addEventListener('input', convertTime);
    timeFromUnit.addEventListener('change', convertTime);
    timeToUnit.addEventListener('change', convertTime);
    
    // Handle swap button
    if (timeSwapBtn) {
        timeSwapBtn.addEventListener('click', function() {
            const tempUnit = timeFromUnit.value;
            timeFromUnit.value = timeToUnit.value;
            timeToUnit.value = tempUnit;
            convertTime();
        });
    }
    
    // Handle clear button
    if (timeClearBtn) {
        timeClearBtn.addEventListener('click', function() {
            timeInput.value = '';
            timeResult.textContent = '';
        });
    }
    
    // Time conversion function
    function convertTime() {
        if (!timeInput.value) {
            timeResult.textContent = '';
            return;
        }
        
        const inputValue = parseFloat(timeInput.value);
        if (isNaN(inputValue)) {
            timeResult.textContent = 'Please enter a valid number';
            return;
        }
        
        const fromUnit = timeFromUnit.value;
        const toUnit = timeToUnit.value;
        
        // Convert to seconds, then to target unit
        const seconds = inputValue * timeFactors[fromUnit];
        const result = seconds / timeFactors[toUnit];
        
        // Format result based on magnitude
        let formattedResult;
        if (result < 0.01 || result > 10000) {
            formattedResult = result.toExponential(6);
        } else if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }
        
        timeResult.textContent = `${formattedResult} ${toUnit}`;
    }
}

/**
 * Initialize Speed Converter
 */
function initSpeedConverter() {
    const speedForm = document.getElementById('speed-converter-form');
    if (!speedForm) return;
    
    const speedInput = document.getElementById('speed-input');
    const speedFromUnit = document.getElementById('speed-from-unit');
    const speedToUnit = document.getElementById('speed-to-unit');
    const speedResult = document.getElementById('speed-result');
    const speedSwapBtn = document.getElementById('speed-swap-btn');
    const speedClearBtn = document.getElementById('speed-clear-btn');
    
    // Speed conversion factors to meters per second
    const speedFactors = {
        'm/s': 1,
        'km/h': 0.277778,
        'mph': 0.44704,
        'ft/s': 0.3048,
        'knot': 0.514444,
        'mach': 340.29 // at sea level, 15°C
    };
    
    // Handle form submission
    speedForm.addEventListener('submit', function(event) {
        event.preventDefault();
        convertSpeed();
    });
    
    // Handle input change
    speedInput.addEventListener('input', convertSpeed);
    speedFromUnit.addEventListener('change', convertSpeed);
    speedToUnit.addEventListener('change', convertSpeed);
    
    // Handle swap button
    if (speedSwapBtn) {
        speedSwapBtn.addEventListener('click', function() {
            const tempUnit = speedFromUnit.value;
            speedFromUnit.value = speedToUnit.value;
            speedToUnit.value = tempUnit;
            convertSpeed();
        });
    }
    
    // Handle clear button
    if (speedClearBtn) {
        speedClearBtn.addEventListener('click', function() {
            speedInput.value = '';
            speedResult.textContent = '';
        });
    }
    
    // Speed conversion function
    function convertSpeed() {
        if (!speedInput.value) {
            speedResult.textContent = '';
            return;
        }
        
        const inputValue = parseFloat(speedInput.value);
        if (isNaN(inputValue)) {
            speedResult.textContent = 'Please enter a valid number';
            return;
        }
        
        const fromUnit = speedFromUnit.value;
        const toUnit = speedToUnit.value;
        
        // Convert to meters per second, then to target unit
        const metersPerSecond = inputValue * speedFactors[fromUnit];
        const result = metersPerSecond / speedFactors[toUnit];
        
        // Format result based on magnitude
        let formattedResult;
        if (result < 0.01 || result > 10000) {
            formattedResult = result.toExponential(6);
        } else if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }
        
        speedResult.textContent = `${formattedResult} ${toUnit}`;
    }
}

/**
 * Initialize Data Converter
 */
function initDataConverter() {
    const dataForm = document.getElementById('data-converter-form');
    if (!dataForm) return;
    
    const dataInput = document.getElementById('data-input');
    const dataFromUnit = document.getElementById('data-from-unit');
    const dataToUnit = document.getElementById('data-to-unit');
    const dataResult = document.getElementById('data-result');
    const dataSwapBtn = document.getElementById('data-swap-btn');
    const dataClearBtn = document.getElementById('data-clear-btn');
    
    // Data conversion factors to bytes
    const dataFactors = {
        'b': 0.125, // bit to byte
        'B': 1,     // byte
        'KB': 1024,
        'MB': 1048576,
        'GB': 1073741824,
        'TB': 1099511627776,
        'PB': 1125899906842624,
        'KiB': 1024,
        'MiB': 1048576,
        'GiB': 1073741824,
        'TiB': 1099511627776,
        'PiB': 1125899906842624
    };
    
    // Handle form submission
    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        convertData();
    });
    
    // Handle input change
    dataInput.addEventListener('input', convertData);
    dataFromUnit.addEventListener('change', convertData);
    dataToUnit.addEventListener('change', convertData);
    
    // Handle swap button
    if (dataSwapBtn) {
        dataSwapBtn.addEventListener('click', function() {
            const tempUnit = dataFromUnit.value;
            dataFromUnit.value = dataToUnit.value;
            dataToUnit.value = tempUnit;
            convertData();
        });
    }
    
    // Handle clear button
    if (dataClearBtn) {
        dataClearBtn.addEventListener('click', function() {
            dataInput.value = '';
            dataResult.textContent = '';
        });
    }
    
    // Data conversion function
    function convertData() {
        if (!dataInput.value) {
            dataResult.textContent = '';
            return;
        }
        
        const inputValue = parseFloat(dataInput.value);
        if (isNaN(inputValue)) {
            dataResult.textContent = 'Please enter a valid number';
            return;
        }
        
        const fromUnit = dataFromUnit.value;
        const toUnit = dataToUnit.value;
        
        // Convert to bytes, then to target unit
        const bytes = inputValue * dataFactors[fromUnit];
        const result = bytes / dataFactors[toUnit];
        
        // Format result based on magnitude
        let formattedResult;
        if (result < 0.01 || result > 10000) {
            formattedResult = result.toExponential(6);
        } else if (Number.isInteger(result)) {
            formattedResult = result.toString();
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }
        
        dataResult.textContent = `${formattedResult} ${toUnit}`;
    }
}