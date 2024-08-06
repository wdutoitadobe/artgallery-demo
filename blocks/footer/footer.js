import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function createElementWithClasses(elementType, ...classes) {
  const element = document.createElement(elementType);
  element.classList.add(...classes);
  return element;
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
  footerButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.tabIndex = -1;
    document.body.focus();
  });
  return footerButton;
}

function decorateGroupLinks(footerColumns) {
  const footerColumnsChild = footerColumns.firstElementChild;

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
  const footerColumnsExisting = footerColumnsChild.firstElementChild.children;
  for (let i = 0; i < footerColumnsExisting.length; i += 1) {
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
    for (let j = 0; j < existingLinkList.children.length; j += 1) {
      // create new link using existing link's attributes and text
      const listItem = existingLinkList.children[j];
      const link = listItem.firstElementChild;
      const linkText = link.textContent;
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');
      link.setAttribute('class', '');
      link.innerHTML = `<span class="acpl-icon-with-attribute right">
                <span class="">
                  <span class="">${linkText}</span>
                </span>
                <span class="acpl-no-break"></span>
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

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  const sections = fragment.querySelectorAll('.section .default-content-wrapper');
  const socialMediaSection = sections[1];
  const disclaimerSection = sections[2];
  const logoSection = sections[3];
  const shieldSection = sections[4];

  // decorate footer DOM
  block.textContent = '';

  block.parentNode.classList.add('acpl-footer');

  const footer = document.createElement('div');

  const section = fragment.firstElementChild;
  const buttonDiv = section.children.item(0);
  const groupLinksDiv = section.children.item(1);

  footer.append(decorateFooterButton(buttonDiv));
  footer.append(decorateGroupLinks(groupLinksDiv));

  block.append(footer);

  // -- process disclaimer and shield -- //
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');
  footerBottom.innerHTML = `
  <div class="footer-bottom-container content wide">
    <div class="footer-left">
      <div class="acpl-social-media horizontal">
        ${Array.from(socialMediaSection.querySelectorAll('a')).map((element) => `
          <a class="unstyled" href="${element.href}" target="_blank" title="Follow us on ${element.title}" rel="noopener noreferrer">
            <span class="">
              <i class="acpl-icon app-${element.title === 'twitter' ? 'x' : element.title}"></i>
            </span>
          </a>
        `).join('')}
      </div>
    </div>
    <div class="footer-logo">
      ${Array.from(logoSection.querySelectorAll('picture')).map((picture) => {
        const img = logoSection.querySelector('img');
        img.classList.add('acpl-logo');
        img.removeAttribute('height');
        img.removeAttribute('width');
        return picture.innerHTML;
      })}  
    </div>
    <div class="footer-site-terms">
      <ul class="footer-site-terms-links unstyled">
        ${Array.from(disclaimerSection.querySelectorAll('p')).map((element) => {
          const anchor = element.querySelector('a');
          if (anchor) {
            return `
            <li>
                <a href="${anchor.href}" target="_blank">
                    <span>${anchor.title}</span>
                </a>
            </li>
          `;
          }
          return `
            <li>
                <span>${element.textContent}</span>
            </li>
          `;
        }).join('')}
      </ul>
      ${[shieldSection].map((element) => {
        const paragraphs = element.querySelectorAll('p.button-container');
        const shieldImageMetadata = paragraphs[0];
        const iframeMetadata = paragraphs[1];

        const picture = element.querySelector('picture');
        const img = picture.querySelector('img');
        img.setAttribute('alt', iframeMetadata.title);
        img.setAttribute('width', 40);
        img.setAttribute('height', 40);

        return `
        <a class="unstyled" href="${shieldImageMetadata.href}" target="_blank" title="${shieldImageMetadata.title}" rel="noopener noreferrer">
          <span class="">
            <i class="acpl-icon acpl-logo nz-govt"></i>
          </span>
        </a>
        <a class="unstyled" href="#" target="_self" rel="">
          <span>
            ${picture.innerHTML}
          </span>
        </a>
        <div class="acpl-modal shielded-modal" role="dialog" aria-modal="true">
          <div class="acpl-modal-dialog">
            <iframe src="${iframeMetadata.href}" sandbox="allow-forms allow-scripts allow-same-origin allow-popups" width="310" height="455" frameborder="0"></iframe>
            <button type="button" role="button" class="acpl-button secondary no-border icon left no-text acpl-modal-close" aria-label="Close image">
              <i class="acpl-icon utility-cross colored" style="background-color: rgb(115, 115, 113);"></i>
              <span class=""></span>
            </button>
          </div>
        </div>
      `;
  })}
    </div>
  </div>`;
  footer.append(footerBottom);
}
