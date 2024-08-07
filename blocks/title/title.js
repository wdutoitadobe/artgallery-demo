export default async function decorate(block) {
    const paragraphs = block.querySelectorAll('p');
    const teReoContent = paragraphs[0];
    const titleContent = paragraphs[1];
    const icon = paragraphs[2];

    block.innerHTML = `
      <div class="main-heading-section-wrapper"> 
        <h1 class="with-icon">
          <span class="main-heading-section indent">
            <span class="heading-icon with-te-reo">
              <i class="acpl-icon ${icon.textContent}"></i>
            </span>
            <span>
              <span class="te-reo" lang="mi">${teReoContent.innerHTML}</span>
              <span class="heading">
                <span>${titleContent.innerHTML}</span>
              </span>
            </span>
          </span>
        </h1>
      </div>
    `;
}
