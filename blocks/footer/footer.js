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
  const footer = document.createElement('div');

  const section = fragment.firstElementChild;
  const children = section.children;
  for (let i = 0; i < children.length; i++) {
    let childElement = children[i];
    if (childElement.classList.contains('default-content-wrapper')) {
      footer.append(decorateFooterButton(childElement));
    } else {
      const newDiv = document.createElement('div');
      newDiv.innerHTML = childElement.innerHTML;
      footer.append(newDiv);
    }
  }


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