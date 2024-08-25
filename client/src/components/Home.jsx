import React from 'react';
import Header from './Header';
import AddEntry from './AddEntry'


function Home(props) {
    return (
        <div>
            <Header />      
            <AddEntry />  
        </div>
    );
}

export default Home;