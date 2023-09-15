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
        onPage1Loaded();
    } catch (e) {
        console.log(e);
    }
}

function onPage1Loaded() {
    const row0 = document.getElementById("row0");
    const plugImg = document.getElementById("plugImg");
    const row1 = document.getElementById("row1");
    const ixperienceImg = document.getElementById("ixperienceImg");
    const row2 = document.getElementById("row2");
    const huduImg = document.getElementById("huduImg");

    if (
        row0 == null ||
        row1 == null ||
        row2 == null ||
        plugImg == null ||
        ixperienceImg == null ||
        huduImg == null
    ) {
        console.error(
            "All elements required for Page1 animations not found in DOM "
        );
        return;
    }

    if (row0 && plugImg) {
        function onPlugHoverEnter() {
            plugImg.style.display = "block";
            ixperienceImg.style.display = "none";
            huduImg.style.display = "none";
        }

        function onPlugHoverLeave() {
            plugImg.style.display = "none";
        }
        function onIxperienceHoverEnter() {
            plugImg.style.display = "none";
            ixperienceImg.style.display = "block";
            huduImg.style.display = "none";
        }

        function onIxperienceHoverLeave() {
            ixperienceImg.style.display = "none";
        }
        function onHuduHoverEnter() {
            plugImg.style.display = "none";
            ixperienceImg.style.display = "none";
            huduImg.style.display = "block";
        }

        function onHuduHoverLeave() {
            huduImg.style.display = "none";
        }

        window.addEventListener("mousemove", (e) => {
            const row0Rect = row0.getBoundingClientRect();
            const plugRect = plugImg.getBoundingClientRect();
            const row1Rect = row1.getBoundingClientRect();
            const ixperienceRect = ixperienceImg.getBoundingClientRect();
            const row2Rect = row2.getBoundingClientRect();
            const huduRect = huduImg.getBoundingClientRect();
            if (
                e.clientX >= row0Rect.left &&
                e.clientX <= row0Rect.right &&
                e.clientY >= row0Rect.top &&
                e.clientY <= row0Rect.bottom
            ) {
                onPlugHoverEnter();
                const transY = e.clientY - row0Rect.top - plugRect.height;
                plugImg.style.transform = `translate(${e.clientX}px,${transY}px)`;
            } else {
                onPlugHoverLeave();
            }
            if (
                e.clientX >= row1Rect.left &&
                e.clientX <= row1Rect.right &&
                e.clientY >= row1Rect.top &&
                e.clientY <= row1Rect.bottom
            ) {
                onIxperienceHoverEnter();
                const transY = e.clientY - row1Rect.top - ixperienceRect.height;
                ixperienceImg.style.transform = `translate(${e.clientX}px,${transY}px)`;
            } else {
                onIxperienceHoverLeave();
            }
            if (
                e.clientX >= row2Rect.left &&
                e.clientX <= row2Rect.right &&
                e.clientY >= row2Rect.top &&
                e.clientY <= row2Rect.bottom
            ) {
                onHuduHoverEnter();
                const transY = e.clientY - row2Rect.top - huduRect.height;
                huduImg.style.transform = `translate(${e.clientX}px,${transY}px)`;
            } else {
                onHuduHoverLeave();
            }
        });
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
            const posX = e.clientX + window.scrollX;
            const posY = e.clientY + window.scrollY;
            mouseCircle.style.transform = `translate(${posX}px, ${posY}px)`;
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
