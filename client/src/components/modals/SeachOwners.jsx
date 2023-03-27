import React, { useState } from 'react';
import ModalLayout from '../ModalLayout';
import { useNavigate } from "react-router-dom";

const Modal = ({ hide, setHide, setAddr }) => {

    const navigate = useNavigate();
    const [ethAddress, setEthAddress] = useState("")

    const submit = (e) => {
        e.preventDefault();
        navigate(`/owner/${ethAddress}`);
        setHide(true);
        setAddr(ethAddress);
        setEthAddress("");
    }

    return (
        !hide ? <ModalLayout>
            <form action="" onSubmit={(e) => submit(e)}>
                <div className="flex items-center justify-between p-3 text-2xl font-semibold border-b rounded-t-lg bg-gray-50 ">
                    Search Owner
                    <button className='p-2 text-red-800 bg-red-200 rounded-lg hover:bg-red-300' onClick={() => setHide(true)} type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-3">
                    <div className="py-2">Eth Address: </div>
                    <div>
                        <input type="text" name="eth_address" onChange={(e) => setEthAddress(e.target.value)} value={ethAddress} />
                    </div>
                </div>
                <div className="p-3 mt-3 border-t rounded-b-lg bg-gray-50">
                    <button type='submit' className='block w-auto px-8 py-2 ml-auto text-white rounded-lg bg-sky-800'>Submit</button>
                </div>
            </form>
        </ModalLayout> : null
    );
}

export default Modal;
