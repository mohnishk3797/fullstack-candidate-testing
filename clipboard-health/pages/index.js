import React, {useEffect, useReducer} from 'react';
import Head from "next/head";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import Container from "../components/Container";
import {JobReducer, initialJobReducer} from '../reducer/JobReducer';
import AppContext from '../context/AppContext';
import {getAllJobs} from '../Api/JobsAPI';

export default function Home() {

    const [state, dispatch] = useReducer(JobReducer, initialJobReducer);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "START_REQUEST" });
            const response = await getAllJobs();
            if(response !== {}) {
                dispatch({ type: "RESPONSE_REQUEST", jobs: response})
            } else {
                dispatch({ type: "ERROR_REQUEST"})
            }
        }
        fetchData();
    },[])

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                <AppContext.Provider value={{state, dispatch}}>
                    <div className="mx-auto">
                        <SearchBar/>
                        <div className="flex p-3">
                            <SideBar/>
                            <Container/>
                        </div>
                    </div>
                </AppContext.Provider>
            </div>
        </div>
    );
}
