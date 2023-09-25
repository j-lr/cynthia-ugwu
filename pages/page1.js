/* eslint-disable indent */
import { clamp } from "../utils.js";

const textTranslateXOnHover = 3.8; // vw unit

let prevMouseX = 0;
let prevMouseY = 0;
const maxAngle = 8;
let deltaX = 0;
let timer;
let angle = 0;
let prevAnglePositive = false;
const hoverImg = {
    img: undefined,
    rotateAngle: 0,
    transX: 0,
    transY: 0,
};

function transformHoverImage() {
    if (!hoverImg.img) {
        return;
    }
    // eslint-disable-next-line no-undef
    const tl = gsap.timeline();
    tl.to(hoverImg.img, {
        translateX: hoverImg.transX,
        translateY: hoverImg.transY,
        duration: 0.55,
    });
    tl.to(
        hoverImg.img,
        {
            rotate: hoverImg.rotateAngle,
            duration: 0.97,
        },
        "<",
    );
}
export default function onPage1Loaded() {
    const row0 = document.getElementById("row0");
    const plugImg = document.getElementById("plugImg");
    const row1 = document.getElementById("row1");
    const ixperienceImg = document.getElementById("ixperienceImg");
    const row2 = document.getElementById("row2");
    const huduImg = document.getElementById("huduImg");
    const plugText = document.getElementById("plugText");
    const ixperienceText = document.getElementById("ixperienceText");
    const huduText = document.getElementById("huduText");
    const plugYear = document.getElementById("plugYear");
    const ixperienceYear = document.getElementById("ixperienceYear");
    const huduYear = document.getElementById("huduYear");

    if (
        row0 == null
        || row1 == null
        || row2 == null
        || plugImg == null
        || ixperienceImg == null
        || huduImg == null
        || plugText == null
        || ixperienceText == null
        || huduText == null
        || plugYear == null
        || ixperienceYear == null
        || huduYear == null
    ) {
        console.error(
            "All elements required for Page1 animations not found in DOM, so animations won't work ",
        );
        return;
    }

    function onPlugHoverEnter() {
        plugText.style.opacity = 0.5;
        plugYear.style.opacity = 0.5;
        plugText.style.transform = `translate(${textTranslateXOnHover}vw,${0}px)`;
        plugImg.classList.add("page1-img-visible");
    }

    function onPlugHoverLeave() {
        plugText.style.opacity = 1;
        plugYear.style.opacity = 1;
        plugText.style.transform = `translate(${0}px,${0}px)`;
        plugImg.classList.remove("page1-img-visible");
    }
    function onIxperienceHoverEnter() {
        ixperienceText.style.opacity = 0.5;
        ixperienceYear.style.opacity = 0.5;
        ixperienceText.style.transform = `translate(${textTranslateXOnHover}vw,${0}px)`;
        ixperienceImg.classList.add("page1-img-visible");
    }

    function onIxperienceHoverLeave() {
        ixperienceText.style.opacity = 1;
        ixperienceYear.style.opacity = 1;
        ixperienceImg.classList.remove("page1-img-visible");
        ixperienceText.style.transform = `translate(${0}px,${0}px)`;
    }
    function onHuduHoverEnter() {
        huduText.style.opacity = 0.5;
        huduYear.style.opacity = 0.5;
        huduText.style.transform = `translate(${textTranslateXOnHover}vw,${0}px)`;
        huduImg.classList.add("page1-img-visible");
    }

    function onHuduHoverLeave() {
        huduText.style.opacity = 1;
        huduYear.style.opacity = 1;
        huduImg.classList.remove("page1-img-visible");
        huduText.style.transform = `translate(${0}px,${0}px)`;
    }

    function manageHoverImageScrollAnimation(
        imageElement,
        transX,
        transY,
    ) {
        if (prevAnglePositive && angle < 0) {
            // direction changed, change angle direction
            hoverImg.img = imageElement;
            hoverImg.rotateAngle = -hoverImg.rotateAngle;
            hoverImg.transX = transX;
            hoverImg.transY = transY;

            transformHoverImage();
        } else {
            hoverImg.img = imageElement;
            hoverImg.rotateAngle = angle;
            hoverImg.transX = transX;
            hoverImg.transY = transY;

            transformHoverImage();
        }
    }

    window.addEventListener("mousemove", (e) => {
        clearTimeout(timer);
        const row0Rect = row0.getBoundingClientRect();
        const plugRect = plugImg.getBoundingClientRect();
        const row1Rect = row1.getBoundingClientRect();
        const ixperienceRect = ixperienceImg.getBoundingClientRect();
        const row2Rect = row2.getBoundingClientRect();
        const huduRect = huduImg.getBoundingClientRect();
        if (prevMouseX === 0) prevMouseX = e.clientX;
        if (prevMouseY === 0) prevMouseY = e.clientY;
        if (
            e.clientX >= row0Rect.left
            && e.clientX <= row0Rect.right
            && e.clientY >= row0Rect.top
            && e.clientY <= row0Rect.bottom
        ) {
            onPlugHoverEnter();
            const transY = e.clientY - row0Rect.top - plugRect.height;
            deltaX = e.clientX - prevMouseX;
            angle = clamp(deltaX / 20, -maxAngle, maxAngle);
            manageHoverImageScrollAnimation(plugImg, e.clientX, transY);
            prevAnglePositive = angle >= 0;
        } else {
            onPlugHoverLeave();
        }
        if (
            e.clientX >= row1Rect.left
            && e.clientX <= row1Rect.right
            && e.clientY >= row1Rect.top
            && e.clientY <= row1Rect.bottom
        ) {
            onIxperienceHoverEnter();
            const transY = e.clientY - row1Rect.top - ixperienceRect.height;
            deltaX = e.clientX - prevMouseX;
            angle = clamp(deltaX / 20, -maxAngle, maxAngle);
            manageHoverImageScrollAnimation(ixperienceImg, e.clientX, transY);
            prevAnglePositive = angle >= 0;
        } else {
            onIxperienceHoverLeave();
        }
        if (
            e.clientX >= row2Rect.left
            && e.clientX <= row2Rect.right
            && e.clientY >= row2Rect.top
            && e.clientY <= row2Rect.bottom
        ) {
            onHuduHoverEnter();
            const transY = e.clientY - row2Rect.top - huduRect.height;
            deltaX = e.clientX - prevMouseX;
            angle = clamp(deltaX / 20, -maxAngle, maxAngle);
            manageHoverImageScrollAnimation(huduImg, e.clientX, transY);
            prevAnglePositive = angle >= 0;
        } else {
            onHuduHoverLeave();
        }

        timer = setTimeout(() => {
            prevMouseX = e.clientX;
            hoverImg.rotateAngle = 0;
            transformHoverImage();
        }, 40);
    });
}
