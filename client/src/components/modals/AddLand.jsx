import React, { useState, useContext } from 'react';
import ModalLayout from '../ModalLayout';
import MetaInput from '../MetaInput';
import produce from "immer";
import useInfura from '../../utils/hooks/useInfura';
import { Web3Context } from '../../utils/contexts/Contract';

const Modal = ({ hide, setHide, setAddr }) => {
    const { contract, account } = useContext(Web3Context);
    const [itemsCount, setItemsCount] = useState(1);
    const [metadata, setMetaData] = useState({});
    const [status, setStatus] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { uploadFile } = useInfura();
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setStatus({ code: 0, text: "No file selected." });
            return;
        }
        if (name.length < 10 || name.length > 25) {
            setStatus({ code: 0, text: "Name must be between 10-25 characters." });
            return;
        }

        if (description.length < 30 || description.legth > 50) {
            setStatus({ code: 0, text: "Description must be between 30-50 characters." });
            return;
        }

        const jsonData = JSON.stringify({ name, description, metadata });
        const jsonHash = await uploadFile(jsonData);
        const photoHash = await uploadFile(file);

        await contract.methods.addLand(photoHash, jsonHash).send({ from: account }).then((res, err) => {
            if (res) {
                setStatus({ code: 1, text: "Land added successfully as: " + res.events.LandAdded.returnValues.landId });
                setMetaData({});
                setName("");
                setFile(null);
                setDescription("");

            } else if (err) {
                setStatus({ code: 0, text: "An error occured during transaction" });
            }
        });
    }


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const addItem = () => {
        setItemsCount(itemsCount + 1);
    }

    const removeItem = (id) => {
        let newData = produce(metadata, draft => {
            if (typeof (draft[id]) !== "undefined") {
                delete draft[id];
            }
        });

        const obj = {};
        for (let i = 0; i < Object.keys(newData).length; i++) {
            let current = Object.keys(newData)[i];
            obj[i] = newData[current];
        }

        setMetaData(obj);
        setItemsCount(itemsCount - 1);
    }

    const metadataChange = (value, id, type) => {

        let newData = produce(metadata, draft => {
            if (typeof (draft[id]) === "undefined") {
                draft[id] = {};
            }
            draft[id][type] = value
        });

        setMetaData(newData);
    }

    const renderItemList = () => {
        let list = [];
        for (let i = 0; i < itemsCount; i++) {
            list.push(<MetaInput key={i} count={itemsCount}
                metadata={metadata}
                handleChange={metadataChange}
                removeItem={removeItem} id={i}
                addItem={addItem} />)
        }
        return list;
    };

    return (
        !hide ? <ModalLayout>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex items-center justify-between p-3 text-2xl font-semibold border-b rounded-t-lg bg-gray-50 ">
                    Add Land
                    <button className='p-2 text-red-800 bg-red-200 rounded-lg hover:bg-red-300' onClick={() => setHide(true)} type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className='block max-h-[calc(90vh-230px)] overflow-scroll' >
                    <div className="p-3">
                        {status?.code === 0 && <div className="font-semibold text-sm text-red-500">{status.text}</div>}
                        {status?.code === 1 && <div className="font-semibold text-sm text-green-500">{status.text}</div>}
                        <label htmlFor='name' className="py-2">Name: </label>
                        <div>
                            <input type="text" id='name' name="name" onChange={(e) => setName(e.target.value)} value={name} required />
                        </div>

                        <div className="mt-2">
                            <label htmlFor='name' className="py-2">Description: </label>

                            <textarea type="text" className='min-h-[42px]' onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Enter Desription...' required />
                        </div>
                        <div className="mt-2">
                            <div className="relative">
                                <label className="bg-sky-50 block hover:bg-sky-100 border-dashed border-4 border-sky-800 p-4 text-center font-bold rounded">
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept='image/*'
                                        onChange={handleFileChange}
                                    />
                                    {file?.name ? file.name : 'Choose Image'}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="border-t px-3 pt-3">Metadata:</div>

                    {
                        renderItemList()
                    }
                </div>

                <div className="p-3 mt-3 border-t rounded-b-lg bg-gray-50">
                    <button type='submit' className='block w-auto px-8 py-2 ml-auto text-white rounded-lg bg-sky-800'>Submit</button>
                </div>
            </form>
        </ModalLayout> : null
    );
}

export default Modal;
