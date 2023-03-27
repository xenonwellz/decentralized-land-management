import React from 'react';
import PageLayout from '../components/PageLayout';

const Home = () => {
    return (
        <PageLayout>
            <div className="grid grid-cols-5 gap-4">
                <div className="overflow-hidden bg-white rounded shadow-2xl">
                    <img className="w-full" src="https://picsum.photos/id/958/300/200" alt="Land for Sale" />
                    <div className="px-6 py-4">
                        <div className="mb-2 text-xl font-bold">Land for Sale</div>
                        <p className="text-base text-gray-700">
                            This beautiful piece of land is now available for sale. With stunning views and plenty of space, it's the perfect spot to build your dream home.
                        </p>
                    </div>
                    <div className="px-6 py-4">
                        <button className='flex items-center justify-center w-full p-3 text-gray-900 bg-gray-300 rounded-md'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>

                            Not For Sale
                        </button>
                    </div>
                </div>
                <div className="overflow-hidden bg-white rounded shadow-2xl">
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
                </div>
            </div>
        </PageLayout>
    );
}

export default Home;
