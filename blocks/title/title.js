export default async function decorate(block) {
    if (block.classList.contains('view-all')) {
        decorateViewAllBanner(block);
    } else {
        //stub
    }
}

function decorateViewAllBanner(block) {
    const blockRoot = block.querySelectorAll('div');
    const elementsWrapper = blockRoot[1];

    let headingContent;
    let linkContent;
    let hrefContent;

    if (elementsWrapper) {
        const contentElements = Array.from(elementsWrapper.children);

        if (contentElements[0]) {
            headingContent = contentElements[0].textContent;
        }

        if (contentElements[1]) {
            const linkElement = contentElements[1].querySelector('a');
            if (linkElement) {
                linkContent = linkElement.textContent;
                if (linkElement.hasAttribute('href')) {
                    hrefContent = linkElement.getAttribute('href');
                }
            }
        }
    }

    block.innerHTML = `
        <div class="tile-block || content-set">
            <h2 class="tile-block-title || featured-row">${headingContent}<a class="button || default || tiny" href="${hrefContent}">${linkContent}</a></h2>
            <div class="tile-block-inner"></div>
        </div>
    `;

}

function getElementContent(elementArray, index) {
    let contentText;
    if (typeof elementArray[index] === 'undefined') {
        contentText = contentElements[index].textContent;
    }

    return contentText;
}

// <div>
//     <div data-align="center">
//         <h2 id="current-exhibitions">CURRENT EXHIBITIONS</h2>
//         <h2 id="view-all"><a href="https://www.aucklandartgallery.com/search/exhibitions?date-range=today" title="View All">View All</a></h2>
//     </div>
// </div>

