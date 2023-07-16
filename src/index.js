import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import {Database} from "./Util";

import ArticleList from "./components/ArticleList";

// const articleList = [
//     {
//         id: '1',
//         title: 'title1',
//         content: 'this is content 1',
//         labels: ['label1', 'label2'],
//         createOn: '2023-06-18T21:00:00.230338', 
//         updateOn: '2023-06-18T21:00:00.230338'
//     }
//     ,{
//         id: '2',
//         title: 'title2',
//         content: 'this is content 2',
//         labels: ['label3', 'label4'],
//         createOn: '2021-06-18T21:00:00.230338', 
//         updateOn: '2021-06-18T21:00:00.230338'
//     }
// ];

// function ArticleList() {
//    console.log(articleList);

//     return (
//             <div className='articleList'>
//                 {articleList.map(Article)}
//             </div>
//     ) ;
// }

// const Article = (article) => {
//     return (
//         <div className='article' key={article.id}>            
//             <Title title={article.title} />
//             <TagList labels={article.labels} />
//             <Timestamps createOn={article.createOn} updateOn={article.updateOn} />
//             <Content content={article.content} />
//         </div>
//     )
// }

// const Title = (article) => {
//     return (
//         <div className="title"><h2><b>{article.title}</b></h2></div>        
//     )
// }

// const TagList = (article) => {
//     return (
//         <div className="labelList" >
//             {article.labels.map(Tag)}
//         </div>
//     )
// }

// const Tag = (label) => {
//     return (
//         <div className="label" key={label}><h6><b>{label}</b></h6></div>
//     )
// }

// const Timestamps = (article) => {
//     return (
//         <div className="timeStamps">
//             <h6>Created: {article.createOn}</h6>
//             <h6>Last Updated: {article.updateOn}</h6>
//         </div>
//     )
// }

// const Content = (article) => {
//     return (
//         <div className="content">
//             <h5>{article.content.substring(0,64)}</h5>
//         </div>
//     )
// }

ReactDOM.render(<ArticleList />,    document.getElementById("root")) ;