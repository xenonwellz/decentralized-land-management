import React from 'react';

const MetaInput = ({ count, addItem, removeItem, id, handleChange, metadata }) => {
    return (
        <div className="p-3">
            <input type="text" placeholder='key' id='name' value={metadata[id] ? metadata[id]?.name : ""} onChange={(e) => handleChange(e.target.value, id, "name")} required />
            <div className="flex items-center gap-3 mt-2">
                <textarea type="text" className='min-h-[42px]' placeholder='value' value={metadata[id] ? metadata[id]?.value : ""} onChange={(e) => handleChange(e.target.value, id, "value")} required />
                {count > 1 && id !== 0 ? <button className="bg-red-500 hover:bg-red-600 inline-block p-3 text-white rounded-xl" type='button' onClick={() => removeItem(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>

                </button>
                    : <button className="primary bg-sky-600 hover:bg-sky-700 inline-block p-3 text-white rounded-xl" type='button' onClick={() => addItem()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>}
            </div>
        </div>
    );
}

export default MetaInput;
