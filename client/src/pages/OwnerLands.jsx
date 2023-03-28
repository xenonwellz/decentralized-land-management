import React, { useContext, useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { useParams } from 'react-router-dom';
import LandCard from '../components/LandCard';
import { Web3Context } from '../utils/contexts/Contract';

const Available = () => {
    const { contract, account, web3 } = useContext(Web3Context);
    const [lands, setLands] = useState({});
    const { address } = useParams();

    useEffect(() => {
        if (web3.utils.isAddress(address)) {
            getLands();
        }
    }, [])

    const getLands = async () => {
        const _lands = await contract.methods.getLandsIdByAccount(address).call();

        const landObj = {};
        for (let i = 0; i < _lands.length; i++) {
            landObj[_lands[i]] = await contract.methods.lands(_lands[i]).call()
        }

        setLands(landObj);
    }


    return (
        <PageLayout>
            {web3.utils.isAddress(address) ? Object.keys(lands).length > 0 ? <div className="grid grid-cols-5 gap-4">
                {Object.keys(lands).map(land =>
                    < LandCard key={land} land={lands[land]} id={land} />
                )}
            </div> : <div className='text-center font-semibold'>This account has no land asset.</div> :
                <div className='font-semibold text-center'>Invalid ethereum address.</div>}
        </PageLayout>
    );
}

export default Available;
