import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';

  block.parentNode.classList.add('acpl-footer');

  const footer = document.createElement('div');

  const section = fragment.firstElementChild;
  const children = section.children;

  footer.append(decorateFooterButton(children[0]));
  footer.append(decorateGroupLinks(children[1].firstElementChild));

  block.append(footer);
}

function decorateFooterButton(footerButtonDiv) {

  const footerButton = document.createElement('button');

  const link = footerButtonDiv.firstElementChild.firstElementChild;
  const buttonTitle = link.textContent;

  footerButton.setAttribute('type', 'button');
  footerButton.setAttribute('role', 'button');

  footerButton.classList.add('acpl-button', 'icon', 'left', 'footer-button-to-top');
    footerButton.innerHTML = `
        <i class="acpl-icon utility-chevron"></i>
        <span>${buttonTitle}</span>`;
  return footerButton;
}

function decorateGroupLinks(footerColumns) {

  // create wrapping divs
  const footerTop = createElementWithClasses('div', 'footer-top');
  const footerContainer = createElementWithClasses('div', 'footer-container', 'content', 'wide');
  const footerContent = createElementWithClasses('div', 'footer-content', 'has-links-list');
  const footerLinksList = createElementWithClasses('div', 'footer-links-list', 'full');
  const footerLinksGroupWrapper = createElementWithClasses('div', 'footer-links-group-wrapper');

  footerTop.append(footerContainer);
  footerContainer.append(footerContent);
  footerContent.append(footerLinksList);
  footerLinksList.append(footerLinksGroupWrapper);

  // fetch the existing columns
  const footerColumnsExisting = footerColumns.firstElementChild.children;

  for (let i = 0; i < footerColumnsExisting.length; i++) {

    // create a new column
    const newColumn = document.createElement('div');
    newColumn.classList.add('footer-links-group');

    // fetch the existing column
    const existingColumn = footerColumnsExisting[i];

    // modify existing h3 to match expected output
    const existingColumnHeading = existingColumn.getElementsByTagName('h3')[0];
    existingColumnHeading.removeAttribute('id');
    existingColumnHeading.classList.add('mb-2');
    newColumn.append(existingColumnHeading);

    // fetch list of links
    const existingLinkList = existingColumn.getElementsByTagName('ul')[0];
    const newLinkList = document.createElement('ul');
    newLinkList.classList.add('footer-links', 'unstyled');

    for (let j = 0; j < existingLinkList.children.length; j++) {

      // create new link using existing link's attributes and text
      const listItem = existingLinkList.children[j];
      const link = listItem.firstElementChild;
      const linkText = link.textContent
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');
      link.setAttribute('class', '');
      link.innerHTML = `<span class="acpl-icon-with-attribute right">
                <span class="">
                  <span class="">${linkText}</span>
                </span>
                <span class="acpl-no-break">﻿</span>
                <i class="acpl-icon utility-external-link"></i>
              </span>`;

      // append to ul
      const newListItem = document.createElement('li');
      newListItem.append(link);
      newLinkList.append(newListItem);
    }

    newColumn.append(newLinkList);
    footerLinksGroupWrapper.append(newColumn);
  }

  return footerTop;
}

function createElementWithClasses(elementType, ...classes) {
  const element = document.createElement(elementType);
  element.classList.add(...classes);
  return element;
}