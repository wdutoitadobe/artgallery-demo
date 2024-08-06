import { createOptimizedPicture } from '../../scripts/aem.js';

function createElementWithClasses(elementType, ...classes) {
  const element = document.createElement(elementType);
  element.classList.add(...classes);
  return element;
}

function decorateLinkCards(block) {
  const blockDiv = document.createElement('div');
  [...block.children].forEach((row) => {
    // Wrapper elements
    const cardDiv = document.createElement('div');
    const linkDiv = row.children.item(0);
    const href = linkDiv.getElementsByTagName('a')[0].getAttribute('href');

    const newLinkElement = createElementWithClasses('a', 'card-link', 'unstyled');
    newLinkElement.href = href;
    newLinkElement.setAttribute('target', '_self');
    newLinkElement.setAttribute('rel', '');

    const outerSpan = document.createElement('span');
    newLinkElement.append(outerSpan);
    const outerDiv = createElementWithClasses('div', 'acpl-card', 'primary');
    outerSpan.append(outerDiv);
    const cardBodyDiv = createElementWithClasses('div', 'card-body');
    outerDiv.append(cardBodyDiv);
    const cardHeadingDiv = createElementWithClasses('div', 'card-heading');
    cardBodyDiv.append(cardHeadingDiv);
    const cardHeadingTitleDiv = createElementWithClasses('div', 'card-heading-title');
    cardHeadingDiv.append(cardHeadingTitleDiv);

    // Heading component
    const titleElement = createElementWithClasses('h3', 'card-title', 'overflow-wrap');
    const textDiv = row.children.item(1);
    const h3Text = textDiv.getElementsByTagName('h3')[0].textContent;
    titleElement.innerHTML = `
      <span class="acpl-content-type"></span>
                <span class="main-heading-section">
                  <span>
                    <span class="heading">
                      <span class="">${h3Text}</span>
                    </span>
                  </span>
                </span>`;
    cardHeadingTitleDiv.append(titleElement);

    // Paragraph component
    const pElement = textDiv.getElementsByTagName('p')[0];
    pElement.classList.add('acpl-rich-text-content', 'overflow-wrap');
    cardBodyDiv.append(pElement);

    // Append to main div
    cardDiv.append(newLinkElement);
    blockDiv.append(cardDiv);
  });
  block.textContent = '';
  block.append(blockDiv);
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

export default function decorate(block) {
  if (block.classList.contains('links')) {
    decorateLinkCards(block);
  } else {
    decorateDefaultCards(block);
  }
}
