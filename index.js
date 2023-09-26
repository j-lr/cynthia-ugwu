import onPage1Loaded from "./pages/page1.js";
import prepareMouseBlendMode from "./pages/mouse.js";

async function fetchHtmlPage(page) {
  const response = await fetch(page);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch html page ${page} with response status code ${response.status} 
                    and response status : ${response.statusText}`,
    );
  }
  const pageContent = await response.text();
  return pageContent;
}

function onProductDesignerAnimComplete() {
  const translationDuration = 1.25;
  const torontoTranslationDuration = 1.25;
  // eslint-disable-next-line no-undef
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
    "<",
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
    "<",
  );

  tl.from(
    ".freelance",
    {
      yPercent: -100,
      duration: translationDuration,
      "--landerPageClip": "100% ",
      ease: "power2.inOut",
    },
    "<",
  );
  tl.to(
    ".freelance",
    {
      opacity: 1,
      duration: 1.25,
    },
    "<",
  );
}
async function loadPage(pageUrl, htmlElement, elementID) {
  const html = await fetchHtmlPage(pageUrl);
  const element = document.createElement(htmlElement);
  element.id = elementID;
  element.innerHTML = html;
  document.body.appendChild(element);
}

function onLanderPageLoaded() {
  // eslint-disable-next-line no-undef
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

async function loadPages() {
  try {
    await loadPage("pages/lander.html", "div", "landerpage");
    onLanderPageLoaded();
    prepareMouseBlendMode();
  } catch (e) {
    console.log(e);
  }
  try {
    await loadPage("pages/page1.html", "div", "page1");
    onPage1Loaded();
    prepareMouseBlendMode();
  } catch (e) {
    console.log(e);
  }
  try {
    await loadPage("pages/page2.html", "div", "page2");
    prepareMouseBlendMode();
  } catch (e) {
    console.log(e);
  }
  try {
    await loadPage("pages/page3.html", "div", "page3");
    prepareMouseBlendMode();
  } catch (e) {
    console.log(e);
  }
  try {
    await loadPage("pages/footer.html", "div", "footer");
    prepareMouseBlendMode();
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPages();
});
