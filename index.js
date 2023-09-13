document.addEventListener("DOMContentLoaded", function () {
    loadPages();

    window.addEventListener("mousemove", function (e) {
        // mouseCircle is already loaded while fetching page
        if (mouseCircle) {
            mouseCircle.style.transform = `translate(${e.clientX}px, 
            ${e.clientY}px)`;
        }
    });
});

async function loadPages() {
    try {
        await loadPage("pages/lander.html", "div", "landerpage");
    } catch (e) {
        console.log(e);
    }
    try {
        await loadPage("pages/page1.html", "div", "page1");
    } catch (e) {
        console.log(e);
    }
    try {
        await loadPage("pages/page2.html", "div", "page2");
    } catch (e) {
        console.log(e);
    }
}

async function loadPage(pageUrl, htmlElement, elementID) {
    try {
        const html = await fetchHtmlPage(pageUrl);
        const element = document.createElement(htmlElement);
        element.id = elementID;
        element.innerHTML = html;
        document.body.appendChild(element);
    } catch (err) {
        throw err;
    }
}

async function fetchHtmlPage(page) {
    try {
        const response = await fetch(page);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch html page ${page} with response status code ${response.status} 
                    and response status : ${response.statusText}`
            );
        }
        const pageContent = await response.text();
        return pageContent;
    } catch (err) {
        throw err;
    }
}
