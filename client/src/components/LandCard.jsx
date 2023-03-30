import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Web3Context } from '../utils/contexts/Contract';
// import {axios} from a

const LandCard = ({ land, id }) => {

    const { account } = useContext(Web3Context);
    const [json, setJson] = useState({});

    // https://skywalker.infura-ipfs.io/ipfs/QmWRKdYm7MNu4vik28oVLE19SRhe1qx7966V3tCatykdn4

    const init = async () => {
        const response = await fetch(`https://skywalker.infura-ipfs.io/ipfs/${land.jsonHash}`);
        try {
            const data = await response.json();
            setJson(data);
        } catch {
            setJson({ name: "Metadata Error", description: "Couldn't get or parse metadata." })
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="overflow-hidden bg-white rounded shadow-2xl grid grid-rows-1 flex-col">
            <div className="max-h-[200px] overflow-hidden">
                <img className="w-full" src={`https://skywalker.infura-ipfs.io/ipfs/${land.photoHash}`} alt="Land for Sale" />
            </div>
            <div className="px-6 py-4 w-full flex-shrink">
                <div className="mb-2 text-xl font-bold">{json?.name}</div>
                <p className="text-base text-gray-700">
                    {json?.description}
                </p>
            </div>
            <div className="px-6 py-4 justify-self-end w-full">
                {land.owner.toUpperCase() !== account.toUpperCase() ? <Link to={"/land/" + id} className='flex font-semibold items-center justify-center w-full p-3 text-white bg-sky-800 rounded-md'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    View Asset
                </Link> :
                    <Link to={"/land/" + id} className='flex font-semibold items-center justify-center w-full p-3 text-white bg-green-600 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Manage Asset
                    </Link>}
            </div>
            {/* <div className="overflow-hidden bg-white rounded shadow-2xl">
                    <img className="w-full" src="https://picsum.photos/id/958/300/200" alt="Land for Sale" />
                    <div className="px-6 py-4">
                        <div className="mb-2 text-xl font-bold">Land for Sale</div>
                        <p className="text-base text-gray-700">
                            This beautiful piece of land is now available for sale. With stunning views and plenty of space, it's the perfect spot to build your dream home.
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <button className='flex items-center justify-center w-full p-3 text-white rounded-md bg-sky-800'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='inline-block mr-2' width="1em" height="1em">
                                <path fill="currentColor" d="M19,7H18V6a3,3,0,0,0-3-3H5A3,3,0,0,0,2,6H2V18a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V10A3,3,0,0,0,19,7ZM5,5H15a1,1,0,0,1,1,1V7H5A1,1,0,0,1,5,5ZM20,15H19a1,1,0,0,1,0-2h1Zm0-4H19a3,3,0,0,0,0,6h1v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8.83A3,3,0,0,0,5,9H19a1,1,0,0,1,1,1Z"></path>
                            </svg>
                            3 ETH
                        </button>
                    </div>
                </div> */}
        </div >
    );
}

export default LandCard;
