import axios from 'axios'

const baseUrl = "http://192.168.1.211:8080/";
const kbBaseUrl = baseUrl + "kb/";

export class KbRepo {
    static uuid(subject, onResp) {
        axios.get(baseUrl + "uniq-id?subject=" + subject).then(resp => {
            console.log("got uid: " + resp.data);
            onResp(resp.data);
        });
    }
    /* -------
       users 
       ------- */
    static loginAs (loginId, password, onResp) {
        axios.get(kbBaseUrl + "login?loginId=" + loginId + "&password=" + password).then(resp => {
            console.log("got userId: " + resp.data);
            onResp(resp.data);
        });
    }    
    static registerAs (email, loginId, password, onResp) {
        axios.get(kbBaseUrl + "register?email=" + email + "&loginId=" + loginId + "&password=" + password).then(resp => {
            console.log("got userId: " + resp.data);
            onResp(resp.data);
        });
    }    
    /* -------
       notes 
       ------- */
    static searchForArticle(userId, searchTerm, onResp){
        axios.get(kbBaseUrl + "search?userId=" + userId + "&query=" + searchTerm).then(resp => {
            console.log("[KbRepo] search userId=" + userId + ", query: " + searchTerm);
            console.log(resp.data);
            onResp(resp.data);
        }) 
    }

    static getMostRecentArticles(userId, n, onResp){
        axios.get(kbBaseUrl + "most-recent-articles?userId=" + userId + "&num=" + n).then(resp => {
            console.log("[KbRepo] most-recent-articles:  " + userId + ", " + n);
            console.log(resp.data);
            onResp(resp.data);
        })
    }

    static updateArticleList(articleList, onResp) {
        console.log("[KbRepo] starting update-article-list: ");
        console.log(articleList);  
        axios.post(kbBaseUrl + "update-article-list", articleList)
        .then(resp => {  onResp(resp.data);   });
    }
    
    /*  ---------------
        search criteria 
        --------------- */

    static updateCriteria(criteria) {
        console.log("[KbRepo] update-criteria: ")
        console.log(criteria);
        axios.post(kbBaseUrl + "update-criteria", criteria)
        .then(resp => {
            console.log(resp.data);  
        })
    }

    static getMostRecentCriteria(userid, onResp){
        axios.get(kbBaseUrl + "most-recent-criteria?userid=" + userid)
        .then(resp=>{ 
            onResp(resp.data);
            console.log("[KbRepo] most-recent-criteria of user_id: " + userid);
            console.log(resp.data)});
    }

    /*  -----------
        label list 
        ----------- */

    static getLabelList(userId, onResp) {
        axios.get(kbBaseUrl + "label-list?userId=" + userId).then(resp => {
            console.log("[KbRepo] got all labels from DB for userId " + userId + ": ");
            console.log(resp.data);
            onResp(resp.data);            
        });
    }

    static updateLabelList(labelList, onResp) {
        console.log("[KbRepo] updating label list: ")
        console.log(labelList);
        axios.post(kbBaseUrl + "update-label-list", labelList)
        .then(resp => { onResp(resp.data); });
    }

}