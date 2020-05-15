import PDFJS from 'pdfjs-dist';

PDFJS.GlobalWorkerOptions.workerSrc = './pdf.worker.js';
// PDFJS.GlobalWorkerOptions.workerSrc = './literally/js/vendors~pdfjsWorker.js';
// PDFJS.workerSrc = './literally/js/vendors~pdfjsWorker.js';

let winW = document.documentElement.clientWidth;
let pdfContainer = null;
let pdfInfo = {
    page: 0,
    totalPage: 0,
    url: "",
    data: null,
    loadedPages: []
};

/**
 * 通过url加载PDF文件
 * @param {HTMLElement} container PDF容器
 * @param {Object} data 要加载的pdf信息
 */
function loadPDF(container, { url, page = 1, onload = (() => {}) }) {
    // fetch().then(res => {

    // });
    pdfContainer = container;
    console.error("===> url: ", url, window);
    pdfInfo = {
        page,
        totalPage: 0,
        url,
        data: null,
        loadedPages: []
    };
    PDFJS.getDocument(/* { */url/* , 
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/',} */).then(function (pdf) {
        pdfInfo.totalPage = pdf.numPages;
        pdfInfo.data = pdf;
        console.error(pdf.numPages);
        for (let i = 1; i <= pdf.numPages; i++) {
            changePage(i, onload);
        }
        // changePage(page, onload);
    });
}

/**
 * 切换到PDF指定页数
 * @param {Number} page 页数
 * @param {Function} changed 切换完成的回调
 */
function changePage(page, changed) {
    if (page < 0) {
        return "The pdf page number must greater than 0!";
    } else if (page > pdfInfo.totalPage) {
        return `The pdf page number must less than ${pdfInfo.totalPage}!`;
    }
    let pageEle = document.getElementById(`pdf_page${page}`);
    if (!pageEle) {
        pageEle = document.createElement("div");
        // const pageCanvas = document.createElement("canvas");

        pageEle.classList.add("pdf-canvas");
        pageEle.id = `pdf_page${page}`;
        // pageEle.appendChild(pageCanvas);

        // pageCanvas.id = `pdf_canvas${page}`;
        
        // pageEle.appendChild(pageCanvas);

        pdfInfo.loadedPages.push(page);
        pdfInfo.loadedPages.sort();
        
        const index = pdfInfo.loadedPages.indexOf(page);

        if (index === pdfInfo.loadedPages.length - 1) {
            pdfContainer.appendChild(pageEle);
        } else {
            document.insertBefore(pageEle, document.getElementById(`pdf_page${pdfInfo.loadedPages[index + 1]}`));
        }
        // pdfContainer.insertAdjacentHTML("beforeend", `<div class="pdf-canvas" id="page${i}"><canvas id="pdf-canvas-${i}"></canvas></div>`);
    }
    console.error("===> pdfInfo.data: ", pdfInfo.data);
    return pdfInfo.data.getPage(page).then(function (data) {
        let viewport = data.getViewport(1);
        let scale = (winW / viewport.width).toFixed(2);
        console.error(data);
        // let scale = (pdfContainer.offsetWidth / viewport.width).toFixed(2);
        let scaledViewport = data.getViewport({ scale });
        // let canvas = document.getElementById(`pdf_canvas${page}`);
        // let context = canvas.getContext('2d');
        // context.translate(0.5, 0.5);
        console.error("===> viewport: ", scaledViewport);

        if (typeof changed === "function") changed(scaledViewport);

        // canvas.height = scaledViewport.height;
        // canvas.width = scaledViewport.width;
        // context.scale(1, 1);
        // context.scale(2, 2);

        const ratio = scaledViewport.width / scaledViewport.height;
        const pageDiv = document.querySelector(`#pdf_page${page}`);
        const { offsetWidth: width, offsetHeight: height } = pageDiv;
        if(height * ratio < width){
            pageDiv.style.width = Math.round(height * ratio) + "px";
            pageDiv.style.height =  Math.round(height) + "px";
        } else {
            pageDiv.style.width = Math.round(width) + "px";
            pageDiv.style.height = Math.round(width / ratio) + "px";
        }
        
        // let renderContext = {
        //     canvasContext: context,
        //     viewport: scaledViewport
        // };
        return data.getOperatorList().then(function (opList) {
            let svgGfx = new PDFJS.SVGGraphics(data.commonObjs, data.objs);
            // return data.render(renderContext).then();
            return svgGfx.getSVG(opList, viewport).then(function (svg) {
                pageDiv.appendChild(svg);
                // container.appendChild(svg);
                // document.querySelector('.scroll-content-info').style.width = document.querySelector('.pageContainer').getBoundingClientRect().width + 'px';
                // vm.$refs.scroll.refresh();
                // Util.setLoading(!1);
                // !vm.pdfWaterMark && Util.getUserInfo(vm.addWaterMarker);
            });
        });
    });
}

const pdf = {
    loadPDF,
    changePage,
}

export default pdf;