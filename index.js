document.addEventListener("DOMContentLoaded", function () {
    loadPages();
});

function loadPages() {
    loadPage("pages/lander.html", "div", "landerpage").then(function () {
        loadPage("pages/page1.html", "div", "page1").then(function () {
            loadPage("pages/page2.html", "div", "page2");
        });
    });
}

function loadPage(pageUrl, bodyElement, elementID) {
    return fetchHtmlPage(pageUrl).then(function (html) {
        const element = document.createElement(bodyElement);
        element.id = elementID;
        element.innerHTML = html;
        document.body.appendChild(element);
    });
}

function fetchHtmlPage(page) {
    return fetch(page)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch html page ${page} with response status code ${response.status} 
                    and response status : ${response.statusText}`
                );
            }
            return response.text();
        })
        .then(function (pageContent) {
            return pageContent;
        })
        .catch(function (err) {
            throw err;
        });
}
