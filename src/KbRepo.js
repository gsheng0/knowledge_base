import axios from 'axios'

const baseUrl = "http://192.168.1.211:8080/kb/";

export class KbRepo {

    /* -------
       article 
       ------- */

    static getArticle(id, onResp){
        axios.get(baseUrl + "get?id=" + id).then(resp => {
            console.log("[KbRepo] get article id: " + id);
            console.log(resp.data);
            onResp(resp.data);
        })
    }

    static getAllArticles(onResp){
        axios.get(baseUrl + "view-all").then(resp => {
            console.log("[KbRepo] view-all");
            console.log(resp.data);
            onResp(resp.data);
        }) 
    }

    static searchForArticle(searchTerm, onResp){
        axios.get(baseUrl + "search?query=" + searchTerm).then(resp => {
            console.log("[KbRepo] search query: " + searchTerm);
            console.log(resp.data);
            onResp(resp.data);
        }) 
    }

    static getMostRecentArticles(n, onResp){
        axios.get(baseUrl + "most-recent-articles?num=" + n).then(resp => {
            console.log("[KbRepo] most-recent-articles:  " + n);
            console.log(resp.data);
            onResp(resp.data);
        })
    }

    static deleteArticle(id){
        axios.post(baseUrl + "delete", id)
        .then((resp) => {
            console.log("[KbRepo] delete id: " + id);
            console.log(resp.data);
        });
    }

    static uploadArticle(article, onResp){
        axios.post(baseUrl + "upload", article)
        .then(resp => {
            onResp(resp.data);
            console.log("[KbRepo] upload article: ");
            console.log(resp.data);            
        });
    }

    static updateArticle(article){
        axios.post(baseUrl + "update-article", article)
        .then(resp => {  
            console.log("[KbRepo] update-article: ");
            console.log(resp.data);  
         });
    }

    /*  ---------------
        search criteria 
        --------------- */

    static updateCriteria(criteria) {
        axios.post(baseUrl + "update-criteria", criteria)
        .then(resp => {
            console.log("[KbRepo] update-criteria: ", criteria);
            console.log(resp.data);  
        })
    }

    static getMostRecentCriteria(userid, onResp){
        axios.get(baseUrl + "most-recent-criteria?userid=" + userid)
        .then(resp=>{ 
            onResp(resp.data);
            console.log("[KbRepo] most-recent-criteria of user_id: " + userid);
            console.log(resp.data)});
    }

    /*  -----------
        label list 
        ----------- */

    static getLabelList(onResp) {
        axios.get(baseUrl + "label-list").then(resp => {
            console.log("[KbRepo] got all labels from DB: ")
            console.log(resp.data);
            onResp(resp.data);            
        });
    }

    static updateLabelList(labelList) {
        console.log("[KbRepo] updating label list: ")
        console.log(labelList);
        axios.post(baseUrl + "update-label-list", labelList)
        .then(resp => {        });
    }

    static updateLabel(label) {
        console.log("[KbRepo] updating label: ")
        console.log(label);
        axios.post(baseUrl + "update-label", label)
        .then(resp => {        });
    }

}