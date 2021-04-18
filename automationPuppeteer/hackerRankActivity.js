let puppeteer = require("puppeteer");
let { codes } = require("./code");
let fs = require("fs");
//let { password, email } = require("../../../secrets");
let gtab;
console.log("before");

let browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args : ["--incognito", "--start-maximized"]
})
browserPromise
    .then(function (browserInstance) {
        let newTabPromise = browserInstance.newPage();
        return newTabPromise;
    }).then(function (newTab) {
        let loginPageWillBeopenedPromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        gtab = newTab;
        return loginPageWillBeopenedPromise;
    }).then(function () {
        let emailWillBeTypedPromise = gtab.type("#input-1", "baxos54992@zefara.com", { delay: 200 });
        return emailWillBeTypedPromise;
    }).then(function () {
        let passwordWillBeTypedPromise = gtab.type("#input-2", "amazonriver", { delay: 200 });
        return passwordWillBeTypedPromise;
    }).then(function () {
        let loginPageWillBeClickedPromise = gtab.click("button[data-analytics='LoginPassword']");
        return loginPageWillBeClickedPromise;
    }).then(function () {
        let clickIPKit = waitAndClick(".card-content h3[title='Interview Preparation Kit']");
        return clickIPKit;
    }).then(function () {
        let warmUpClick = waitAndClick("a[data-attr1='warmup']");
        return warmUpClick;
    }).then(function (url) {
        let url = gtab.url;
        let questionObj = codes[0];
        let fqsp = questionSolver(url, questionObj.soln, questionObj.qName);
        for (let i = 1; i < codes.length; i++){
            fqsp = then(function () {
                return questionSolver(url, codes[i].soln, codes[i].qName);
            })
        }
        return fqsp;
    }).then(function () {
        console.log("all questions submitted");
    })
    .catch(function (err) {
        console.log(err);
    })
    
//promise based function
function waitAndClick(selector){
    return new Promise(function (resolve, reject) {
        let selectorWaitPromise = gtab.waitForSelector(selector, { visible: true });
        selectorWaitPromise.then(function () {
            let selectorClickPromise = gtab.click(selector);
            return selectorClickPromise;
        }).then(function () {
            resolve();
        }).catch(function () {
            reject(err);
        })
    })
}

function questionSolver(modulepageUrl, code, questionName) {
    return new Promise(function (resolve, reject) {
        let reachedPageUrlPromise = gtab.goto(modulepageUrl);
        reachedPageUrlPromise
            .then(function () {
            function browserconsolerunFn(questionName){
                let allH4Elem = document.querySelectorAll("h4");
                let textArr = [];
                for (let i = 0; i < allH4Elem.length; i++){
                    let myQuestion = allH4Elem[i].innerText.split("\n")[0];
                    textArr.push(myQuestion);
                }
                let idx = textArr.indexOf(questionName);
                allH4Elem[idx].click();
            }
            let pageClickPromise = gtab.evaluate(browserconsolerunFN, questionName);
            return pageClickPromise;
            }).then(function () {
                let inputWillBeClickedPromise = waitAndClick(".custom-checkbox.inline");
                return inputWillBeClickedPromise;
            }).then(function () {
                let codeWillBeTypedPromise = gtab.type(".custominput", code);
                return codeWillBeTypedPromise;
            }).then(function () {
                let controlIsHoldPromise = gtab.Keyboard.down("Control");
                return controlIsHoldPromise;
            }).then(function () {
                let aWillBePressedPromise = gtab.Keyboard.press("a");
                return aWillBePressedPromise;
            }).then(function () {
                let cutPromise = gtab.Keyboard.press("x");
                return cutPromise;
            }).then(function () {
                let backspaceisPressedPromise = gtab.Keyboard.press("Backspace");
                return backspaceisPressedPromise;
            }).then(function () {
                let editorWillBeCLickedPromise = gtab.click(".monaco-editor.no-user-select.vs");
                return editorWillBeCLickedPromise;
            }).then(function () {
                let aIsPressedPromise = gtab.Keyboard.press("a");
                return aIsPressedPromise;
            }).then(function () {
                let pastePromise = gtab.Keyboard.press("v");
                return pastePromise;
            }).then(function () {
                let submitIsClickedPromise = gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
                return submitIsClickedPromise;
            })
            .then(function () {
                resolve();
        })
    })
}