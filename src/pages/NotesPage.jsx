import { useState, useEffect } from "react";

import ArticleList from "../components/ArticleList";
import EditArticleModal from "../components/EditArticleModal";
import SearchCriterialModal from "../components/SearchCriteriaModal";
import { KbRepo } from "../KbRepo";
import "../index.css";


function NotesPage(props) {
    const [articleList, setArticleList] = useState([]);   
    const [articleModalIsOpen, setArticleModalIsOpen] = useState(false);
    const [article, setArticle] = useState({});
    const [labelOptionList, setLabelOptionList] = useState([]);

    const [searchCriteria, setSearchCriteria] = useState("");
    const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

    function createLabelOptionListFromLabelList (articleLabelList) {
        return articleLabelList.map((e) => {
            return { value: e.id, label: e.articleLabel}
        });
    }

    useEffect(()=>{
            KbRepo.getMostRecentArticles(props.userId, 3, (dbArticleList) => {
                setArticleList(dbArticleList);
            });
            KbRepo.getMostRecentCriteria(props.userId, (criteria) => {
                setSearchCriteria(criteria.contentPattern);
            }); 
            KbRepo.getLabelList(props.userId, (dbLabelList)=>{ 
                console.log("[App] setting label list: ");
                console.log(dbLabelList);
                setLabelOptionList(createLabelOptionListFromLabelList(dbLabelList));
            });
        }, []); 


    /* --- create Article
        ------------------ */
    function newArticle() {
        var datetimestr = new Date().toISOString();
        setArticle({   
            id: "",
            title: "",
            textContent: "",
            labels: [],
            createOn: datetimestr, 
            updateOn: datetimestr,
            status: "new" 
        });
        setArticleModalIsOpen(true);
    }

    function editArticle(id) {       
        articleList.forEach((article)=>{
            if (article.id === id) {
                setArticle(article);
            }
        })
        setArticleModalIsOpen(true);
    }

    function deleteArticle(id) {
        console.log("[App]: deleting: " + id);
        var leftArticleList = 
        articleList.map((article)=>{ 
            if (article.id === id) {
                article.status = "deleted"; 
            }
            return article;
        });
        setArticleList(leftArticleList);
    }
    
    function applyArticleModal(event) {
        event.preventDefault();
        var modalId = event.target.id.value;
        var modalTitle = event.target.title.value;
        var modalContent = event.target.textContent.value;
        // debugger
        var modalSelectedLabels = [];
        const modalLabels = event.target.labels;
        if (modalLabels.length) {
            for (var i=0; i<modalLabels.length; i++) {
                modalSelectedLabels.push(modalLabels[i].value);
            }
        } else if (modalLabels.value) {
            modalSelectedLabels.push(modalLabels.value);
        }

        console.log("[App] applyArticleModel: ");
        console.log({title: modalTitle, textContent: modalContent, labels: modalSelectedLabels});
        if (modalTitle === "" || modalContent === "") {
            console.log("[App]: title or content can't be empty!");
            return;
        } else {
            if (modalId === "") {
                KbRepo.uuid("note", (newArticleId) => {
                    var articleToCreate = {...article, id: newArticleId, userId: props.userId, title: modalTitle, textContent: modalContent, labels: modalSelectedLabels};
                    console.log("[App] new article:");
                    console.log(articleToCreate);
                    setArticle(articleToCreate);
                    setArticleList(prevalue => { return [articleToCreate, ...prevalue]; });     
                });
            } else { // modify existing
                var newArticleList = articleList.map((articleToModify)=>{
                    if (articleToModify.id === modalId) {                        
                        articleToModify.title = modalTitle;
                        articleToModify.textContent = modalContent;
                        articleToModify.labels = modalSelectedLabels;
                        articleToModify.status = "modified";
                    }
                    console.log("[App] modified article:");
                    console.log(articleToModify);
                    return articleToModify; 
                });
                setArticleList(newArticleList);
            }
            setArticleModalIsOpen(false);
        }
    }

    function cancelArticleModal() {
        setArticleModalIsOpen(false);
        console.log("[App]: cancel from article Modal");
    }

    /* --- Search Article
        ------------------ */
    function searchArticle() { setSearchModalIsOpen(true); }

    function applySearchModal(event) {
        event.preventDefault();
        setSearchModalIsOpen(false);
        var inputCriteria = event.target.searchCriteriaField.value;
        retrieveArticles(inputCriteria);        
    }
    
    function cancelSearchModal() { setSearchModalIsOpen(false); }

    /* ------- db 
       ------- */
    function retrieveArticles(inputCriteria) {
        if (inputCriteria === "") {
            // inputCriteria = "WILL-NEVER-EXIST";
            inputCriteria = " ";
        }
        if (inputCriteria !== searchCriteria) {
            setSearchCriteria(inputCriteria);
            console.log("[App]: criteria:" + inputCriteria);
            KbRepo.searchForArticle(props.userId, inputCriteria, (dbArticleList) => {
                setArticleList(dbArticleList);
            });        
            KbRepo.updateCriteria({userId: props.userId, contentPattern: inputCriteria});
        }
    }

    function saveArticleChanges() {
        console.log("[App]: Saving articles......");
        const listToSave = articleList.filter((article) => article.status !== "deleted");        
        KbRepo.updateArticleList(listToSave, () => {
            console.log("[App] saved.")
            const newArticleList = listToSave.map((article) => {
                article.status = "intact";
                return article;
            }) 
            setArticleList(newArticleList);            
        });
    }

    function revertArticle() {
        console.log("[App]: revert changes pressed.");
        retrieveArticles(searchCriteria);
    }

    return <div>
        <center>
            <h1>My Notes</h1>
            { props.userId ?
                <div>
                    <button onClick={searchArticle}><h4>Search</h4>
                        </button>&nbsp;&nbsp;
                    <button onClick={newArticle}><h4>New</h4>
                        </button>&nbsp;&nbsp;
                    <button onClick={saveArticleChanges}><h4>Save</h4>
                        </button>&nbsp;&nbsp;
                    <button onClick={revertArticle}><h4>Revert</h4>
                        </button>&nbsp;
                </div>
                : <div><h4>login first!</h4></div>
            }    
            <ArticleList 
                articleListToShow={articleList} 
                labelOptionList={labelOptionList}
                onArticleEdit={editArticle}
                onArticleDelete={deleteArticle}
            />    
            <SearchCriterialModal  
                popup={searchModalIsOpen}
                onSubmit={applySearchModal}
                onCancel={cancelSearchModal}
                criteria={searchCriteria}
            />
            <EditArticleModal
                popup={articleModalIsOpen}
                articleToEdit={article}
                labelOptionList={labelOptionList}
                onSubmit={applyArticleModal}
                onCancel={cancelArticleModal}
            />
        </center>            
    </div>
}
export default NotesPage;