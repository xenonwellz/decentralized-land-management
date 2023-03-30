import React, { useContext, useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import LandCard from '../components/LandCard';
import { Web3Context } from '../utils/contexts/Contract';

const Home = () => {
    const { contract, account } = useContext(Web3Context);
    const [lands, setLands] = useState({});

    useEffect(() => {
        getLands();
    }, [])

    const getLands = async () => {
        const _lands = await contract.methods.getAllLands.call().call();

        const landObj = {};
        for (let i = 0; i < _lands.length; i++) {
            landObj[_lands[i]] = await contract.methods.lands(_lands[i]).call()
        }

        setLands(landObj);
    }


    return (
        <PageLayout>
            {Object.keys(lands).length > 0 ? <div className="grid grid-cols-5 gap-4">
                {Object.keys(lands).map(land =>
                    < LandCard key={land} land={lands[land]} id={land} />
                )}
            </div> : <div className="font-semibold text-center">No land to display.</div>}
        </PageLayout>
    );
}

export default Home;
