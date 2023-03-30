import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { Web3Context } from '../utils/contexts/Contract';


const Land = () => {
    const { account, contract, web3 } = useContext(Web3Context);
    const { address } = useParams();
    const [status, setStatus] = useState({});
    const [land, setLand] = useState({});
    const [input, setInput] = useState("");
    const [json, setJson] = useState({ metadata: {} });

    const isInt = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    const buy = async () => {
        await contract.methods.buyLand(address).send({ from: account, value: land.price });
        setStatus({ code: 1, text: "Land purchased successfully." });
        init();
    }

    const transfer = async () => {
        if (web3.utils.isAddress(input)) {
            await contract.methods.transferLandOwnership(address, input).send({ from: account }).then(res => {
                setStatus({ code: 1, text: `You have now transferred this land to:${input}.` });
            });
            init();
            return;
        }
        setStatus({ code: 0, text: `Input is not a valid eth address.` });
    }

    const sell = async () => {
        if (isInt(input) && input > 0.1) {
            await contract.methods.sellLand(address, web3.utils.toWei(input, "ether")).send({ from: account }).then(res => {
                setStatus({ code: 1, text: `Land is now available for sale for :${input} ETH.` });
            });
            init();
            return;
        }

        if (input <= 0.1) {
            setStatus({ code: 0, text: `Price must be 0.1 ETH or more.` });
            return;
        }

        setStatus({ code: 0, text: `Input is not a valid integer for price.` });
    }

    const puttOffSale = async () => {
        await contract.methods.buyLand(address).send({ from: account, value: land.price });
        setStatus({ code: 1, text: "Land sale stopped successfully." });
        init();
    }

    const init = async () => {
        setInput("");
        const land = await contract.methods.lands(address).call();
        setLand(land);
        if (land.owner !== "0x0000000000000000000000000000000000000000") {
            const response = await fetch(`https://skywalker.infura-ipfs.io/ipfs/${land.jsonHash}`);
            try {
                const data = await response.json();
                setJson(data);
            } catch {
                setJson({ name: "Metadata Error", description: "Couldn't get or parse metadata.", metadata: {} })
            }
        }
    }


    useEffect(() => {
        init();
    }, []);


    return (
        <PageLayout>
            {land.owner !== "0x0000000000000000000000000000000000000000" ? <div className="max-w-screen-xl mx-auto py-20 px-8 bg-white rounded-xl shadow border">
                <div className="grid grid-cols-2 gap-x-8 items-center">
                    <div className="max-w-lg self-start">
                        <img
                            className="rounded-lg shadow-lg w-full"
                            src={`https://skywalker.infura-ipfs.io/ipfs/${land.photoHash}`}
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
                            <p className="text-lg text-gray-500">{web3.utils.fromWei(land.price, "ether")}</p>
                        </div> : null}
                        {
                            Object.keys(json.metadata).map(meta =>
                                <div className="mt-6 flex gap-2 items-center" key={meta}>
                                    <h3 className="text-lg font-medium text-gray-900 uppercase">{json.metadata[meta].name}:</h3>
                                    <p className="text-lg text-gray-500">{json.metadata[meta].value}</p>
                                </div>
                            )
                        }
                        <div className='mt-6'>
                            {status?.code === 0 && <div className="font-semibold mb-2 text-sm text-red-500">{status.text}</div>}
                            {status?.code === 1 && <div className="font-semibold mb-2 text-sm text-green-500">{status.text}</div>}
                            {land.owner?.toUpperCase() === account.toUpperCase() ? <input type="text" placeholder='Enter Amount to sell, Enter Eth Address to transfer ownership' value={input} onChange={(e) => setInput(e.target.value)} /> : null}
                        </div>
                        <div className="mt-2 flex gap-3">
                            {land.owner?.toUpperCase() !== account.toUpperCase() ? <>
                                {
                                    land?.isForSale ? <button
                                        className="flex font-semibold items-center justify-center p-3 text-white bg-sky-700 hover:bg-sky-800 rounded-md" onClick={buy}
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
                                    land?.isForSale ? <button onClick={puttOffSale}
                                        className="bg-yellow-700 hover:bg-yellow-800 text-white font-bold px-6 py-3 rounded-xl"
                                    >
                                        Put Off Sale
                                    </button> : <button onClick={sell} className='flex font-semibold items-center justify-center p-3 text-white bg-green-600 hover:bg-green-700 px-6 rounded-md'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                        </svg>
                                        Sell
                                    </button>
                                }<button onClick={transfer} className='flex font-semibold items-center justify-center p-3 text-white bg-red-600 hover:bg-red-700 px-6 rounded-md'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>

                                    Transfer Ownership
                                </button>
                            </>}

                        </div>
                    </div>
                </div>
            </div> : <div className='text-center font-semibold'>This land does not exist</div>}
        </PageLayout>
    );
}

export default Land;