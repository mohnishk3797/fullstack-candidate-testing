import React, { useContext } from 'react';
import Post from '../Post';
import AppContext from '../../context/AppContext';

const FilterResults = () => {
    const { state } = useContext(AppContext);
    return (
        <div className="m-3">
            {state.jobs.length > 0 && state.jobs.map((post, index) => <Post post={post} key={`post-key-${index}`} />)}
        </div>
    );
};

export { FilterResults as default}