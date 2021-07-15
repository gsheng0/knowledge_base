import {General, Database} from "./Util";

function init(){
    document.getElementById("search").addEventListener("keydown", (e) => {

        if(e.key === "Enter")
        {
            let searchTerm = document.getElementById("search").value;
            Database.searchForArticle(searchTerm, (articles) => {
                clearPage();
                console.log("Just cleared page");
                let titleElement = General.textElement("h1", "Search results for \"" + searchTerm + "\":");
                document.getElementById("title").appendChild(titleElement);
                let contentElement = document.getElementById("content");
                for(let i = 0; i < articles.length; i++){
                    let container = General.containerElement([]);
                
                    let titlePreviewElement = General.textElement("h3", articles[i].title);
                    container.appendChild(titlePreviewElement);

                    let filteredArticleText = preview(articles[i].content);

                    let articlePreviewElement = General.textElement("p", filteredArticleText);
                    container.appendChild(articlePreviewElement);
                    container.classList.add("border");
                    container.addEventListener("click", (e) => {
                        clearPage();
                        parseArticle(articles[i]);
                    });

                    contentElement.appendChild(container);
                }
            });
        }
    });

    document.getElementById("create").addEventListener("click", (e) => {
        clearPage();
        let titleContainer = document.getElementById("title");
        let contentContainer = document.getElementById("content");

        titleContainer.appendChild(General.textElement("h1", "Write an Article"));
        let articleTitleInput = General.inputElement("Article Title");
        let articleContentInput = General.textAreaElement("Article Content");
        let submitButton = General.buttonElement("Submit");

        submitButton.addEventListener("click", (e) => {
            submitButton.disabled = true;
            Database.uploadArticle({title: articleTitleInput.value, content: articleContentInput.value }, (reply) => {
                submitButton.disabled = false;
                articleTitleInput.value = "";
                articleContentInput.value = "";
            });
        });

        contentContainer.appendChild(articleTitleInput);
        contentContainer.appendChild(General.lineBreak());
        contentContainer.appendChild(articleContentInput);
        contentContainer.appendChild(submitButton);

        articleContentInput.addEventListener("keydown", (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                var start = articleContentInput.selectionStart;
                var end = articleContentInput.selectionEnd;
            
                articleContentInput.value = articleContentInput.value.substring(0, start) +
                  "\t" + articleContentInput.value.substring(end);
            
                articleContentInput.selectionStart =
                  articleContentInput.selectionEnd = start + 1;
            }

            if(e.key === "Enter"){

                // assuming 'articleContentInput' is textarea
        
                var cursorPos = articleContentInput.selectionStart;
                var curentLine = articleContentInput.value.substr(0, articleContentInput.selectionStart).split("\n").pop();
                var indent = curentLine.match(/^\s*/)[0];
                var value = articleContentInput.value;
                var textBefore = value.substring(0,  cursorPos );
                var textAfter  = value.substring( cursorPos, value.length );
        
                e.preventDefault(); // avoid creating a new line since we do it ourself
                articleContentInput.value = textBefore + "\n" + indent + textAfter;
                articleContentInput.selectionStart = cursorPos + indent.length + 1; // +1 is for the \n
            }
            
        })

    });
}

function parseArticle(article){
    var titleContainer = document.getElementById("title");
    var contentContainer = document.getElementById("content");

    titleContainer.appendChild(General.textElement("h1", article.title));
    contentContainer.appendChild(General.textElement("h5", article.date));
    
    let content = article.content;

    let index = 0;
    while(content.indexOf("<code>", index) !== -1){
        let tagIndex = content.indexOf("<code>", index);
        var segment, segmentElement;
        if(tagIndex !== index){
            segment = content.substring(index, tagIndex);
            let segmentIndex = 0;
            console.log(segment);
            console.log(segment.indexOf("\n", segmentIndex));
            while(segment.indexOf("\n", segmentIndex) !== -1){
                let segmentTagIndex = segment.indexOf("\n", segmentIndex);
                let innerSegment = segment.substring(segmentIndex, segmentTagIndex);
                let innerSegmentElement = General.textElement("p", innerSegment);
                let tabs = countTabs(innerSegment);
                innerSegmentElement.style.paddingLeft = tabs * 40 + "px";
                innerSegmentElement.style.lineHeight = "100%";
                contentContainer.appendChild(innerSegmentElement);

                segmentIndex = segmentTagIndex + 1;
            }
            let innerSegmentElement = General.textElement("p", segment.substring(segmentIndex));
            contentContainer.appendChild(innerSegmentElement);
            contentContainer.appendChild(General.lineBreak());
            index = tagIndex;
        }
        else {
            segment = content.substring(tagIndex + 6, content.indexOf("</code>", index));
            let segmentIndex = 0;
            while(segment.indexOf("\n", segmentIndex) !== -1){
                let segmentTagIndex = segment.indexOf("\n", segmentIndex);
                let innerSegment = segment.substring(segmentIndex, segmentTagIndex);
                let innerSegmentElement = General.textElement("code", innerSegment);
                let tabs = countTabs(innerSegment);
                innerSegmentElement.style.paddingLeft = tabs * 40 + "px";
                innerSegmentElement.classList.add("code");
                contentContainer.appendChild(innerSegmentElement);
                contentContainer.appendChild(General.lineBreak());
                segmentIndex = segmentTagIndex + 1;
            }
            let innerSegmentElement = General.textElement("code", segment.substring(segmentIndex));
            innerSegmentElement.classList.add("code");
            contentContainer.appendChild(innerSegmentElement);
            contentContainer.appendChild(General.lineBreak());
            index = content.indexOf("</code>", index) + 7;
        }
    }
    segment = content.substring(index);
    let segmentIndex = 0;
    while(segment.indexOf("\n", segmentIndex) !== -1){
        let segmentTagIndex = segment.indexOf("\n", segmentIndex);
        let innerSegment = segment.substring(segmentIndex, segmentTagIndex);
        let innerSegmentElement = General.textElement("p", innerSegment);
        let tabs = countTabs(innerSegment);

        innerSegmentElement.style.paddingLeft = tabs * 40 + "px";
        
        innerSegmentElement.style.lineHeight = "100%";
        contentContainer.appendChild(innerSegmentElement);
        segmentIndex = segmentTagIndex + 1;
    }
    let innerSegmentElement = General.textElement("p", segment.substring(segmentIndex));
    contentContainer.appendChild(innerSegmentElement);
    contentContainer.appendChild(General.lineBreak());
    let tabs  = countTabs(segment.substring(segmentIndex));
    innerSegmentElement.style.paddingLeft = tabs * 40 + "px";

}

function countTabs(line){
    let out = 0;
    let index  = 0;
    while(line.indexOf("\t", index) !== -1){
        out +=1;
        index = line.indexOf("\t", index) + 1;
    }
    return out;
}



function clearPage(){
    General.clearElement("title");
    General.clearElement("content");
}


function preview(str){
    let out = "";
    for(let i = 0; i < str.length; i++){
        if(str.charAt(i) === "\\"){
            i+=1;
        }
        else if(str.charAt(i) === "<"){
            if(str.charAt(i + 1) === "/"){
                i += 6;
            }
            else{
                i += 5;
            }
        }
        else{
            out += str.charAt(i);
        }
    }
    return out.substring(0, 50);
}
let testString = "<code>" + 
"public class HelloWorld \n" +
"{ \n" + 
"\tpublic static void main(String[] args)\n" + 
"\t{\n" + 
"\t\tSystem.out.println(\"Hello World\");\n" + 
"\t}\n" + 
"}</code>" + 
"Hi articleContentInput is a code break" + 
"<code>" + 
"public class HelloWorld \n" +
"{ \n" + 
"\tpublic static void main(String[] args)\n" + 
"\t{\n" + 
"\t\tSystem.out.println(\"Hello World\");\n" + 
"\t}\n" + 
"}</code>";

init();
