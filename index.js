"use strict";

document.addEventListener("DOMContentLoaded", function () {
    loadPages();
});

async function loadPages() {
    try {
        await loadPage("pages/lander.html", "div", "landerpage");
        onLanderPageLoaded();
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

function onLanderPageLoaded() {
    window.addEventListener("mousemove", function (e) {
        if (mouseCircle) {
            mouseCircle.style.transform = `translate(${e.clientX}px, 
            ${e.clientY}px)`;
            mouseCircle.style.display = "block";
        }
    });

    const tl = gsap.timeline({
        onStart: () => {
            document.querySelector(".product").style.opacity = 1;
            document.querySelector(".designer").style.opacity = 1;
        },
        onComplete: () => {
            onProductDesignerAnimComplete();
        },
    });

    tl.from(".product", {
        yPercent: 100,
        duration: 1.25,
        "--landerPageClip": "50% ",
    });
    tl.from(".designer", {
        yPercent: 100,
        duration: 0.95,
        delay: -0.81,
        "--landerPageClip": "100% ",
    });
}

function onProductDesignerAnimComplete() {
    const translationDuration = 1.25;
    const torontoTranslationDuration = 1.25;
    const tl = gsap.timeline({
        onStart: () => {
            document.querySelector(".navbar").style.opacity = 1;
        },
    });
    tl.to(".toronto", {
        opacity: 1,
        duration: 2,
    });
    tl.from(
        ".toronto",
        {
            yPercent: 100,
            duration: torontoTranslationDuration,
            landerPageClip: "100% ",
            ease: "power2.inOut",
        },
        "<"
    );
    tl.to(".footer", {
        opacity: 1,
        duration: 2,
    });
    tl.from(
        ".navbar",
        {
            yPercent: -100,
            duration: translationDuration,
            "--landerPageClip": "100% ",
            ease: "power2.inOut",
        },
        "<"
    );

    tl.from(
        ".freelance",
        {
            yPercent: -100,
            duration: translationDuration,
            "--landerPageClip": "100% ",
            ease: "power2.inOut",
        },
        "<"
    );
    tl.to(
        ".freelance",
        {
            opacity: 1,
            duration: 1.25,
        },
        "<"
    );
}
