import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { headerWrapper } from './nav-wrapper.js';
import { navItem } from './nav-item.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}



const generateMenu = (links) => {
  const menuDivContainer = document.createElement('div');
  menuDivContainer.classList.add('container-content', 'button-options', 'has-menu');
  menuDivContainer.innerHTML = `
        <button type="button" role="button" class="acpl-button secondary icon left menu-button" aria-expanded="false">
            <i class="acpl-icon utility-hamburger-bars"></i>
            <span>Menu</span>
        </button>
       <div class="menu-content menu-links">
        <nav class="acpl-quick-links" aria-label="Main">
            <div class="content wide">
                <div class="heading container-content">
                    <label for="ql-browse-the-auckland-council-website">Browse the Auckland Council website</label>
                    <p>Find it quickly if you know what you want to do.</p>
                </div>
                <div class="links" id="ql-browse-the-auckland-council-website">
                    <div class="links-grouped">
                        <div id="rollup-undefined" class="acpl-rollup">
                            <ul class="three-col links-only unstyled">
                                ${Array.from(links).map((menuLink) => `
                                    <li>
                                        <div class="rollup-generic-link container-content">
                                            <h4 class="rollup-heading-link">
                                                <span class="main-heading-section">
                                                    <span class="heading">
                                                        <a href="${menuLink.href}" target="_self" title="${menuLink.title}" rel="noopener noreferrer">
                                                          <span class="acpl-icon-with-attribute right">
                                                            <span>${menuLink.title}</span>
                                                            <span class="acpl-no-break"></span>
                                                            <i class="acpl-icon utility-external-link"></i>
                                                          </span>
                                                        </a>
                                                    </span>
                                                </span>
                                            </h4>
                                        </div>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <button type="button" role="button" class="acpl-button icon left no-text close-menu" aria-label="Close menu">
          <i class="acpl-icon utility-cross"></i>
       </button>
    </div>
    `;
  const menuBtn = menuDivContainer.querySelector('.acpl-button');
  const menuBtnIcon = menuBtn.querySelector('i');
  const menuContainerDiv = menuDivContainer.querySelector('.menu-content');
  const closeMenuBtn = menuDivContainer.querySelector('.acpl-button.close-menu');

  const handleMenuClick = () => {
    menuBtn.classList.toggle('expanded');
    menuBtn.classList.toggle('secondary');
    menuContainerDiv.classList.toggle('open');
    menuBtnIcon.classList.toggle('utility-cross');
    menuBtnIcon.classList.toggle('utility-hamburger-bars');
  };
  menuBtn.addEventListener('click', handleMenuClick);
  closeMenuBtn.addEventListener('click', handleMenuClick);
  return menuDivContainer;
};

/**
 * Sets the indivual navigation item
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function createNavItem(link, template) {
  const tempNavItem = document.createElement('div');
  tempNavItem.innerHTML = template;

  // Select all <h5> elements within the template and update them
  const h5Elements = tempNavItem.querySelectorAll('h5');
  h5Elements.forEach(h5 => {
    h5.innerHTML = `<a href="${link.href}" title="${link.title}">${link.textContent}</a>`;
  });

  return tempNavItem.firstElementChild; // Return the completed nav item
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  console.log("***" + navPath);
  const fragment = await loadFragment(navPath);

  // clear the header
  block.textContent = '';

  // create the header structure
  const headerSection = document.createElement('div');
  headerSection.classList.add('top-headroom', 'headroom-wrapper');
  headerSection.innerHTML = headerWrapper;

  // populate the header content
  const navItemsDiv = headerSection.querySelector('.navigation');
  const contentNavLinks = fragment.querySelectorAll('p.acpl-rich-text-content:not(.button-container) a');
  contentNavLinks.forEach(link => {
    const decoratedNavItem = createNavItem(link, navItem); // Generate a nav item for each link
    navItemsDiv.appendChild(decoratedNavItem); // Append it to the container
  });

  const navItemsSecondaryDiv = headerSection.querySelector('.navigation-secondary');
  const contentSecondaryNavLinks = fragment.querySelectorAll('p.button-container.acpl-rich-text-content a');
  contentSecondaryNavLinks.forEach(link => {
    link.className = 'navigation-item';
    link.textContent = link.textContent.trim();
    navItemsSecondaryDiv.appendChild(link); // Append it to the container
  });

  // while (fragment.firstElementChild) contentDiv.append(fragment.firstElementChild);
  //
  // // set the correct header left/middle/right css
  // const classes = ['left', 'middle', 'right', 'menu'];
  // classes.forEach((c, i) => {
  //   const section = contentDiv.children[i];
  //   if (section) section.classList.replace('section', `header-${c}`);
  // });
  //
  // // -- process header left -- //
  // const headerLeft = headerSection.querySelector('.header-left');
  // const headerLeftImage = headerLeft.querySelector('img');
  // if (headerLeftImage) {
  //   headerLeft.classList.add('header-left-logo');
  //   headerLeft.querySelector('img').removeAttribute('width');
  //   headerLeft.querySelector('img').removeAttribute('height');
  // }
  //
  // // process header middle -- //
  // const headerMiddle = headerSection.querySelector('.header-middle');
  // headerMiddle.classList.add('has-search');
  // const searchLink = headerMiddle.querySelectorAll('a');
  //
  // const searchForm = document.createElement('form');
  // searchForm.classList.add('acpl-form-container');
  // searchForm.action = searchLink[0].getAttribute('href');
  // searchForm.innerHTML = `
  // <div class="acpl-search-box">
  //   <div class="search-box">
  //     <input class="acpl-textbox search-input rounded-corners" type="text"
  //       placeholder="${searchLink[0].innerHTML}"
  //       aria-label="${searchLink[0].innerHTML}"
  //       value=""/>
  //     <button type="button" role="button" class="acpl-button icon left no-text search-box-button" aria-label="Search">
  //       <i class="acpl-icon utility-magnify"></i><span class=""></span>
  //     </button>
  //   </div>
  // </div>`;
  //
  // // clear and add the content
  // headerMiddle.textContent = '';
  // headerMiddle.append(searchForm);
  //
  // // -- process header right -- //
  // const headerRight = headerSection.querySelector('.header-right');
  //
  // // -- process header menu -- //
  // const headerMenuSection = headerSection.querySelector('.header-menu');
  // const headerMenuLinks = headerMenuSection.querySelectorAll('.default-content-wrapper p a');
  // headerRight.append(generateMenu(headerMenuLinks));
  // headerMenuSection.remove();
  // // header right images
  // const headerRightParagraphs = headerRight.querySelectorAll('.default-content-wrapper p');
  // headerRightParagraphs.forEach((element, idx) => {
  //   const headerRightPicture = element.querySelector('picture');
  //   // header right logo
  //   if (idx === 0) {
  //     // create the div
  //     const headerRightLogo = document.createElement('div');
  //     headerRightLogo.classList.add('header-right-logo');
  //     // add the logo
  //     headerRightLogo.append(headerRightPicture);
  //     const img = headerRightLogo.querySelector('img');
  //     if (img) {
  //       img.removeAttribute('width');
  //       img.removeAttribute('height');
  //     }
  //     headerRight.append(headerRightLogo);
  //   }
  //
  //   // header right mobile logo
  //   if (idx === 1) {
  //     // create the div
  //     const mobHeaderRightLogo = document.createElement('div');
  //     mobHeaderRightLogo.classList.add('mobile-header-right-logo');
  //     // add the mobile logo
  //     mobHeaderRightLogo.append(headerRightPicture);
  //     const img = mobHeaderRightLogo.querySelector('img');
  //     if (img) {
  //       img.removeAttribute('width');
  //       img.removeAttribute('height');
  //     }
  //     headerLeft.append(mobHeaderRightLogo);
  //     // add the moble logo class
  //     contentDiv.classList.add('has-right-logo');
  //   }
  //   // remove paragraph container
  //   element.remove();
  // });
  block.append(headerSection);
}



