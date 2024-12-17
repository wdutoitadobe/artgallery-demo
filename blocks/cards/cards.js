import { createOptimizedPicture } from '../../scripts/aem.js';

function createElementWithClasses(elementType, ...classes) {
  const element = document.createElement(elementType);
  element.classList.add(...classes);
  return element;
}

function decorateDefaultCards(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}

function decorateTeaserCards(block) {
  block.classList.add('cards');
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('card-container');

  [...block.children].forEach((row) => {
    // Wrapper elements
    const cardWrapper = document.createElement('article');
    cardWrapper.classList.add('tile-event', 'tile-featured');
    const cardImgDiv = document.createElement('div');
    cardImgDiv.classList.add('card-image-wrapper');
    // const cardDetailsDiv = document.createElement('div');
    // cardDetailsDiv.classList.add('tile-details');

    //get the content columns
    const imgColumn = row.children[0];
    const mainTextColumn = row.children.item(1);
    const linkTagsColumn = row.children.item(2);

    //create the card wrapper anchor
    imgColumn.classList.add('tile-thumbnail');
    let cardMainAnchor = mainTextColumn.getElementsByTagName('a')[0];
    let clonedAnchor;
    if(cardMainAnchor){
      clonedAnchor = cardMainAnchor.cloneNode(true); // 'true' means deep clone (includes child nodes)
      clonedAnchor.textContent = '';
      clonedAnchor.classList.add('tile-thumbnail-link');
    } else {
      clonedAnchor = document.createElement('a');
      clonedAnchor.setAttribute('href', '#');
    }
    clonedAnchor.append(imgColumn); //cater for when there is no link

    const pictureCell = imgColumn.querySelector('picture');
    if(pictureCell){
      //move all the child elements into anchor element
      const pictureWrapperDiv = document.createElement('div');
      pictureWrapperDiv.classList.add('image-container', 'square');
      while (pictureCell.firstChild) {
        pictureWrapperDiv.appendChild(pictureCell.firstChild);
      }

      //create the overlay div
      pictureCell.classList.add('hover-area');
      const hoverOverlay = document.createElement('div');
      hoverOverlay.setAttribute('data-hover-text', 'true');
      pictureCell.appendChild(hoverOverlay);

      console.log(pictureCell.innerHTML);

      const imgTag = pictureWrapperDiv.querySelector('img');
      imgTag.classList.add('tile-thumbnail-image');

      pictureWrapperDiv.appendChild(pictureCell);
      clonedAnchor.append(pictureWrapperDiv);
    }

    cardImgDiv.append(clonedAnchor);
    cardWrapper.append(cardImgDiv);

    //setup the text section of the card
    mainTextColumn.classList.add('tile-details');
    const pTag = mainTextColumn.querySelector('p.button-container');

    if (pTag) {
      const h5Tag = document.createElement('h5');
      h5Tag.classList.add('tile-title');

      // // Copy attributes from <p> to <h5>
      // for (const attr of pTag.attributes) {
      //   h5Tag.setAttribute(attr.name, attr.value);
      // }

      // Move the inner content from <p> to <h5>
      while (pTag.firstChild) {
        h5Tag.appendChild(pTag.firstChild);
      }
      pTag.parentNode.replaceChild(h5Tag, pTag);
    }

    // Append to main div
    cardWrapper.append(mainTextColumn);
    cardsContainer.append(cardWrapper);
  });
  block.textContent = '';
  block.append(cardsContainer);
}

export default function decorate(block) {
  if (block.classList.contains('teaser')) {
    decorateTeaserCards(block);
  } else {
    decorateDefaultCards(block);
  }
}
