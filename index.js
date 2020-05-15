import pdf from "./utils";

// let winW = document.documentElement.clientWidth;

pdf.loadPDF(document.querySelector(".pdf-container"), {
    url: "https://rddoccdndemows.roadofcloud.com:443/upload/20191230_095304_qbijhsgc.pdf", // /upload/20191220_114026_fulyompv.pdf
    page: 1,
    onload: (...args) => {
        console.log(args);
    }
});
// pdfjsLib.getDocument("https://rddoccdndemows.roadofcloud.com:443/upload/20191220_114026_fulyompv.pdf"/* "./helloworld.pdf" */).then(function (pdf) {
//     const pdfContainer = document.querySelector(".pdf-container");
//     console.error("===> pdf: ", pdf);
//     let pageNum = pdf.numPages;
//     for (let i = 1; i <= 10/* pageNum */; i++) {
//         pdfContainer.insertAdjacentHTML("beforeend", `<div class="pdf-canvas" id="page${i}"><canvas id="pdf-canvas-${i}"></canvas></div>`);
//         pdf.getPage(i).then(function (page) {
//             let viewport = page.getViewport(1);
//             let scale = (winW / viewport.width).toFixed(2);
//             let scaledViewport = page.getViewport({ scale });
//             let canvas = document.getElementById(`pdf-canvas-${i}`);
//             let context = canvas.getContext('2d');
//             console.error("===> viewport: ", scaledViewport);
//             canvas.height = scaledViewport.height;
//             canvas.width = scaledViewport.width;

//             const ratio = scaledViewport.width / scaledViewport.height;
//             const pageDiv = document.querySelector(`#page${i}`);
//             const { offsetWidth: width, offsetHeight: height } = pageDiv;
//             if(height * ratio < width){
//                 pageDiv.style.width = Math.round(height * ratio) + "px";
//                 pageDiv.style.height =  Math.round(height) + "px";
//             } else {
//                 pageDiv.style.width = Math.round(width) + "px";
//                 pageDiv.style.height = Math.round(width / ratio) + "px";
//             }
            
//             let renderContext = {
//                 canvasContext: context,
//                 viewport: scaledViewport
//             };
//             page.render(renderContext).then(function () {});
//         })
//     }
// }, function (reason) {
//     console.error(reason)
// });