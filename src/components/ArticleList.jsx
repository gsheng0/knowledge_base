import React from "react";
import "../index.css";
import Article from "./Article";

import { useState } from "react";
import {Database} from "../Util";

function ArticleList () {
    const [articleList, setArtcleList] = useState([
        // {
        //     id: '1',
        //     title: 'title1',
        //     content: 'asdf',
        //     labels: ['label1', 'label2'],
        //     createOn: '2023-06-18T21:00:00.230338', 
        //     updateOn: '2023-06-18T21:00:00.230338'
        // }
    ]);

    const [searchCriteria, setSearchCriteria] = useState("");

    function onSearchCriteriaChange(event) {
        let inputCriteria = event.target.value;
        setSearchCriteria(inputCriteria);
        event.preventDefault();
    }

    function retrieveList(event) {
        Database.searchForArticle(searchCriteria, (dbArticleList) => {
            setArtcleList(dbArticleList);
        });        
        event.preventDefault();
    }

    return (
        <div className='articleList'>
            <div>
                <form>
                    <input 
                        name="searchCriteria" 
                        placeholder="search critria" 
                        value={searchCriteria} 
                        onChange={onSearchCriteriaChange} />
                    <button onClick={retrieveList}>retrieve</button>
                </form>
            </div>
            { articleList.map(Article) }
        </div>
     ) ;
};

export default ArticleList;