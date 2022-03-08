let idTextArea = "_chatText";
let titles = ['est', 'del', 'done', 'res', 'pen'];

window.addEventListener('load', function() {
    console.log('page is fully loaded');
    //console.log(this.document.querySelector(`#${idText}`));
}, false);

window.addEventListener('hashchange', function() {
    //let textArea = document.querySelector(`#${idText}`);
    let m = GetTitleTemplate("est");
    console.log(m);

    function GetTitleTemplate(text){
        return titles.map(title => title.includes(text));
    }
}, false);

function GetTitleTemplate(text){
    return titles.some(title => title.includes(text));
}

function CreatePopupSnippets () {
    let element = document.createElement('div');
    let innerHtml = ``;
    element.innerHTML = innerHtml;
    element.classList.add("")
    element.style()
    return element;
}

function LoadSnippets () {

}

function GetTemplateSnippets(text){
    switch (text) {
        case "est":
            return `[Estimate]
            ■ Project:
            ■ Task:
            ■ Process:
            ■ Redmine: none
            ■ File:
            ■ Sheet:
            ■ Start:
            ■ End:
            ■ Total:
            Thanks!`;

        case "del":
            return `[Delayed]
            ■ Project:
            ■ Task:
            ■ Process:
            ■ Redmine:
            ■ Remain (H):
            ■ % Completed:
            ■ Re-Estimate:
            + Start (Date & Time):
            + End (Date & Time):
            + Spent time:
            + Time:
            + Total (H):
            ■ Reason:
            ■ Temp Result:
            Thanks!`;
        
        case "res":
            return `[Re-Start]
            ■ Project: 
            ■ Task: 
            ■ Process: 
            ■ Redmine: None 
            ■ Remain (H): H
            ■ Re-Start (Time): H
            ■ End (Date & Time): H
            Thanks!`;
        
        case "pen":
            return `[Pending]
            ■ Project: 
            ■ Task: 
            ■ Process:
            ■ Redmine: 
            ■ % Completed: %
            ■ Remain: H
            ■ Reason: ưu tiên task 
            ※ Cập nhật thông số vào file EST: Đã cập nhật
            Thanks!`;

        case "done":
            return `[Done task]
            ■ Project: 
            ■ Task:
            ■ Process: 
            ■ Redmine: none
            ■ Total:  H
            ■ Late(H):  H
            ■ Result:
            - 
            ※ Cập nhật thông số vào file EST: Đã cập nhật
            Thanks!`;

        case "send":
            return `Mình gửi bản shelve
            ------------------------------------
            ■ Project:
            ■ Task:
            ■ Redmine:
            ■ Result:
                Get latest & Build All: [OK]
                Account: 
                Shelve name: 
            ------------------------------------
            Thanks!`;
    
        default:
            return '';
    }
}