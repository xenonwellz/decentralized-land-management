import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { Web3Context } from '../utils/contexts/Contract';


const Land = () => {
    const { account, contract } = useContext(Web3Context);
    const { address } = useParams();
    const [land, setLand] = useState({});
    const [json, setJson] = useState({});

    const getLandInfo = async () => {
        init();
    }

    const init = async () => {
        const land = await contract.methods.lands(address).call();
        setLand(land);
        const response = await fetch(`https://skywalker.infura-ipfs.io/ipfs/${land.photoHash}`);
        try {
            const data = await response.json();
            setJson(data);
        } catch {
            setJson({ name: "Metadata Error", description: "Couldn't get or parse metadata.", metadata: {} })
        }
    }


    useEffect(() => {
        getLandInfo();
    }, []);



    return (
        <PageLayout>
            <div className="max-w-screen-xl mx-auto py-20 px-8 bg-white rounded-xl shadow border">
                <div className="grid grid-cols-2 gap-x-8 items-center">
                    <div className="max-w-lg self-start">
                        <img
                            className="rounded-lg shadow-lg w-full"
                            src="https://picsum.photos/id/958/300/200"
                            alt="Product"
                        />
                    </div>
                    <div className="">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            {json.name}
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            {json.description}
                        </p>
                        {land.isForSale ? <div className="mt-6 flex gap-2 items-center">
                            <h3 className="text-lg font-medium text-gray-900 uppercase">Price:</h3>
                            <p className="text-lg text-gray-500">{land.price}</p>
                        </div> : null}
                        <div className="mt-6 flex gap-3">
                            {land.owner.toUpperCase !== account.toUpperCase ? <>
                                {
                                    land.isForSale ? <button
                                        className="bg-sky-700 hover:bg-sky-800 text-white font-bold px-6 py-3 rounded-xl"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                        </svg>
                                        Buy Asset
                                    </button> : <button className='flex font-semibold items-center justify-center p-3 text-white bg-gray-600 rounded-md'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                        Unavailable For Purchase
                                    </button>
                                }
                            </> : <>
                                {
                                    land.isForSale ? <button
                                        className="bg-yellow-700 hover:bg-sky-800 text-white font-bold px-6 py-3 rounded-xl"
                                    >
                                        Put Off Sale
                                    </button> : <button className='flex font-semibold items-center justify-center p-3 text-white bg-green-600 hover:bg-green-700 px-6 rounded-md'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                        </svg>
                                        Sell
                                    </button>
                                }<button className='flex font-semibold items-center justify-center p-3 text-white bg-red-600 hover:bg-red-700 px-6 rounded-md'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>

                                    Transfer Ownership
                                </button>
                            </>}

                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default Land;