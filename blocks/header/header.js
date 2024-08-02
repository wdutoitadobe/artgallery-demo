import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

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

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // clear the header
  block.textContent = '';

  // create the header structure
  const headerSection = document.createElement('section');
  headerSection.classList.add('acpl-header-bar', 'primary');
  headerSection.innerHTML = `
  <div class="sticker">
    <div class="header-bar">
      <div class="content wide">
      </div>
    </div>
  </div>`;

  // populate the header content
  const contentDiv = headerSection.querySelector('.content');
  while (fragment.firstElementChild) contentDiv.append(fragment.firstElementChild);

  // set the correct header left/middle/right css
  const classes = ['left', 'middle', 'right'];
  classes.forEach((c, i) => {
    const section = contentDiv.children[i];
    if (section) section.classList.replace('section', `header-${c}`);
  });

  // -- process header left -- //
  const headerLeft = headerSection.querySelector('.header-left');
  const headerLeftImage = headerLeft.querySelector('img');
  if (headerLeftImage) {
    headerLeft.classList.add('header-left-logo');
    headerLeft.querySelector('img').removeAttribute('width');
    headerLeft.querySelector('img').removeAttribute('height');
  }

  // process header middle -- //

  // -- process header right -- //
  const headerRight = headerSection.querySelector('.header-right');
  const headerRightContent = headerRight.firstChild;
  const headerRightImages = headerRight.querySelectorAll('picture');
  console.log('pete images = '+headerRightImages.length)
  if (headerRightImages.length > 0) {
    for (const i in headerRightImages) {
      // header right logo
      if (i == 0) {
        // create the div
        const headerRightLogo = document.createElement('div');
        headerRightLogo.classList.add('header-right-logo');
        // add the logo
        headerRightLogo.append(headerRightImages[i]);
        headerRightLogo.querySelector('img').removeAttribute('width');
        headerRightLogo.querySelector('img').removeAttribute('height');
        headerRight.append(headerRightLogo);
      }

      // header right mobile logo
      if (i == 1) {
        // create the div
        const mobHeaderRightLogo = document.createElement('div');
        mobHeaderRightLogo.classList.add('mobile-header-right-logo');
        // add the mobile logo
        mobHeaderRightLogo.append(headerRightImages[i]);
        mobHeaderRightLogo.querySelector('img').removeAttribute('width');
        mobHeaderRightLogo.querySelector('img').removeAttribute('height');
        headerLeft.append(mobHeaderRightLogo);
        // add the moble logo class
        contentDiv.classList.add('has-right-logo');
      }
    }
  }
  

  // add to block
  block.append(headerSection);


  // // decorate nav DOM
  // block.textContent = '';
  // const nav = document.createElement('nav');
  // nav.id = 'nav';
  // while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // const classes = ['brand', 'sections', 'tools'];
  // classes.forEach((c, i) => {
  //   const section = nav.children[i];
  //   if (section) section.classList.add(`nav-${c}`);
  // });

  // const navBrand = nav.querySelector('.nav-brand');
  // const brandLink = navBrand.querySelector('.button');
  // if (brandLink) {
  //   brandLink.className = '';
  //   brandLink.closest('.button-container').className = '';
  // }

  // const navSections = nav.querySelector('.nav-sections');
  // if (navSections) {
  //   navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
  //     if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
  //     navSection.addEventListener('click', () => {
  //       if (isDesktop.matches) {
  //         const expanded = navSection.getAttribute('aria-expanded') === 'true';
  //         toggleAllNavSections(navSections);
  //         navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  //       }
  //     });
  //   });
  // }

  // // hamburger for mobile
  // const hamburger = document.createElement('div');
  // hamburger.classList.add('nav-hamburger');
  // hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
  //     <span class="nav-hamburger-icon"></span>
  //   </button>`;
  // hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  // nav.prepend(hamburger);
  // nav.setAttribute('aria-expanded', 'false');
  // // prevent mobile nav behavior on window resize
  // toggleMenu(nav, navSections, isDesktop.matches);
  // isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  // const navWrapper = document.createElement('div');
  // navWrapper.className = 'nav-wrapper';
  // navWrapper.append(nav);
  // block.append(navWrapper);
}
