import React from "react";
import "../index.css";
import Article from "./Article";

import { useState, useEffect } from "react";
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

    useEffect(()=>{
        Database.getMostRecentArticles(4, (dbArticleList) => {
            setArtcleList(dbArticleList);
        });        
    }, []);

    function retrieveList(event) {
        event.preventDefault();
        var inputCriteria = event.target.searchCriteriaField.value;
        console.log("criteria:" + inputCriteria);
        Database.searchForArticle(inputCriteria, (dbArticleList) => {
            setArtcleList(dbArticleList);
        });        
    }

    return (
        <div className='articleList'>
            <div>
                <form onSubmit={retrieveList}>
                    <input 
                        id="searchCriteriaField" 
                        name="searchCriteriaField" 
                        type="text"
                        placeholder="search critria" 
                    />
                    <br />
                    <button>retrieve</button>
                </form>
            </div>
            { articleList.map(Article) }
        </div>
     ) ;
};

export default ArticleList;