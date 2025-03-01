import React, { useState } from 'react';


const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const [isScientific, setIsScientific] = useState(true);
    const [isNewNumber, setIsNewNumber] = useState(true);

    const handleNumber = (num) => {
        if (isNewNumber) {
            setDisplay(num);
            setIsNewNumber(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const handleOperator = (op) => {
        setEquation(display + op);
        setIsNewNumber(true);
    };

    const handleFunction = (fn) => {
        let value = parseFloat(display);
        switch (fn) {
            case 'sin':
                value = Math.sin(value);
                break;
            case 'cos':
                value = Math.cos(value);
                break;
            case 'tan':
                value = Math.tan(value);
                break;
            case 'π':
                value = Math.PI;
                break;
            case 'log':
                value = Math.log10(value);
                break;
            case 'ln':
                value = Math.log(value);
                break;
            case '√':
                value = Math.sqrt(value);
                break;
            case 'e':
                value = Math.E;
                break;
            default:
                break;
        }
        setDisplay(value.toString());
        setIsNewNumber(true);
    };

    const calculate = () => {
        try {
            const result = new Function('return ' + equation + display)();
            setDisplay(result.toString());
            setEquation('');
            setIsNewNumber(true);
        } catch (error) {
            setDisplay('Error');
        }
    };

    const clear = () => {
        setDisplay('0');
        setEquation('');
        setIsNewNumber(true);
    };

    const scientificButtons = [
        ['sin', 'cos', 'tan', 'π'],
        ['log', 'ln', '√', 'e'],
        ['(', ')', '^', '!'],
    ];

    const basicButtons = [
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
    ];

    return (
        <div className=" mx-auto  bg-gray-800 rounded-2xl p-3 shadow-lg">
            <div className="bg-gray-900 p-3 rounded-lg mb-5 text-right text-white">
                <div className="text-sm text-gray-500 min-h-5">{equation}</div>
                <div className="text-3xl mt-1">{display}</div>
            </div>

            <div className="bg-gray-700 text-white p-2 text-center rounded mb-5 cursor-pointer" onClick={() => setIsScientific(!isScientific)}>
                {isScientific ? 'Basic' : 'Scientific'}
            </div>

            <div className=" gap-2 flex flex-col">
                {isScientific && (
                    <div className="mb-2 bg-gray-700 p-2 rounded-lg">
                        {scientificButtons.map((row, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                {row.map((btn) => (
                                    <button
                                        key={btn}
                                        className="flex-1 p-1 bg-gray-600 text-white text-sm rounded-lg transition transform hover:opacity-80 active:scale-95"
                                        onClick={() => handleFunction(btn)}
                                    >
                                        {btn}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                <div>
                    {basicButtons.map((row, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                            {row.map((btn) => {
                                if (btn === '=') {
                                    return (
                                        <button key={btn} className="flex-2 p-4 bg-orange-500 text-white rounded-lg transition transform hover:opacity-80 active:scale-95" onClick={calculate}>
                                            {btn}
                                        </button>
                                    );
                                }
                                return (
                                    <button
                                        key={btn}
                                        className={`flex-1 p-4 rounded-lg transition transform hover:opacity-80 active:scale-95 ${/\d|\./.test(btn) ? 'bg-gray-600 text-white' : 'bg-orange-500 text-white'}`}
                                        onClick={() => {
                                            if (/\d|\./.test(btn)) handleNumber(btn);
                                            else if (btn === '=') calculate();
                                            else handleOperator(btn);
                                        }}
                                    >
                                        {btn}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <button className="p-4 bg-red-500 text-white rounded-lg transition transform hover:opacity-80 active:scale-95 col-span-4" onClick={clear}>
                    AC
                </button>
            </div>
        </div>
    );
};

export default Calculator;
