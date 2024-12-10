export const headerWrapper = `
<div class="headroom headroom--unfixed headroom-disable-animation">
    <section class="header">
        <div class="header-inner || constrain-width"><a class="header-logo" href="/">
            <svg class="logo" viewBox="0 0 549 122"><title>Auckland Art Gallery</title>
                <use xlink:href="/static/assets/images/sprite.e0033e5444b18f41483d.svg#aag-logo"></use>
            </svg>
        </a>
            <div class="navigation-bar">
                <div class="navigation-actions">
                    <button class="navigation-toggle || icon-button || button default"><span
                            class="icon-button-inner"><span
                            class="icon-button-icon || hamburger-icon"><span></span><span></span><span></span><span></span></span></span>
                    </button>
                    <a class="icon-button || button default" href="/s">
                        <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="search" width="22"
                             height="22" class="icon" type="default"><title>Search</title>
                            <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#search"></use>
                        </svg>
                    </a>
                    <div class="social-sharing icon-only">
                        <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="share" width="20" height="20"
                             class="icon" type="default"><title>Share</title>
                            <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#share"></use>
                        </svg>
                        <div class="social-links right">
                            <button aria-label="twitter" class="react-share__ShareButton"
                                    style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;">
                                <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="twitter" width="20"
                                     height="20" class="icon" type="default"><title>Twitter</title>
                                    <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#twitter"></use>
                                </svg>
                            </button>
                            <button aria-label="facebook" class="react-share__ShareButton"
                                    style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;">
                                <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="facebook" width="20"
                                     height="20" class="icon" type="default"><title>Facebook</title>
                                    <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#facebook"></use>
                                </svg>
                            </button>
                            <button aria-label="pinterest" class="react-share__ShareButton"
                                    style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;">
                                <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="pinterest" width="20"
                                     height="20" class="icon" type="default"><title>Pinterest</title>
                                    <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#pinterest"></use>
                                </svg>
                            </button>
                            <button content="Auckland Art Gallery Toi o Tāmaki is the largest art institution in New Zealand, with a collection numbering over 15,000 works. These include major holdings of New Zealand historic, modern and contemporary art, and outstanding works by Māori and Pacific Island artists, as well as European painting, sculpture and print collections ranging in date from 1376 to the present day."
                                    aria-label="tumblr" class="react-share__ShareButton"
                                    style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;">
                                <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="tumblr" width="20"
                                     height="20" class="icon" type="default"><title>Tumblr</title>
                                    <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#tumblr"></use>
                                </svg>
                            </button>
                            <button aria-label="email" class="react-share__ShareButton"
                                    style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;">
                                <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="email" width="20"
                                     height="20" class="icon" type="default"><title>Email</title>
                                    <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#email"></use>
                                </svg>
                            </button>
                            <div class="arrow"></div>
                        </div>
                    </div>
                </div>
                <div class="navigation-bar-inner">
                    <nav class="navigation ">
<!--                        <div class="navigation-item">-->
<!--                            <div class="navigation-link desktop"><h5 class="label">Visit</h5></div>-->
<!--                            <button class="navigation-link mobile"><h5 class="label">Visit</h5></button>-->
<!--                            <div class="sub-navigation">-->
<!--                                <button class="sub-navigation-controls">-->
<!--                                    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="long-arrow"-->
<!--                                         width="20" height="20" class="icon" type="default"><title>Long Arrow</title>-->
<!--                                        <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#long-arrow"></use>-->
<!--                                    </svg>-->
<!--                                    <h5 class="current-item">Visit</h5></button>-->
<!--                                <h4 class="sub-navigation-title">Planning your visit</h4>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="navigation-item">-->
<!--                            <div class="navigation-link desktop"><h5 class="label">Art &amp; Ideas</h5></div>-->
<!--                            <button class="navigation-link mobile"><h5 class="label">Art &amp; Ideas</h5></button>-->
<!--                            <div class="sub-navigation">-->
<!--                                <button class="sub-navigation-controls">-->
<!--                                    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="long-arrow"-->
<!--                                         width="20" height="20" class="icon" type="default"><title>Long Arrow</title>-->
<!--                                        <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#long-arrow"></use>-->
<!--                                    </svg>-->
<!--                                    <h5 class="current-item">Art &amp; Ideas</h5></button>-->
<!--                                <h4 class="sub-navigation-title">Explore our collection</h4>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="navigation-item">-->
<!--                            <div class="navigation-link desktop"><h5 class="label">About</h5></div>-->
<!--                            <button class="navigation-link mobile"><h5 class="label">About</h5></button>-->
<!--                            <div class="sub-navigation">-->
<!--                                <button class="sub-navigation-controls">-->
<!--                                    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="long-arrow"-->
<!--                                         width="20" height="20" class="icon" type="default"><title>Long Arrow</title>-->
<!--                                        <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#long-arrow"></use>-->
<!--                                    </svg>-->
<!--                                    <h5 class="current-item">About</h5></button>-->
<!--                                <h4 class="sub-navigation-title">Find out more about us</h4>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="navigation-item">-->
<!--                            <div class="navigation-link desktop"><h5 class="label">Give &amp; Join</h5></div>-->
<!--                            <button class="navigation-link mobile"><h5 class="label">Give &amp; Join</h5></button>-->
<!--                            <div class="sub-navigation">-->
<!--                                <button class="sub-navigation-controls">-->
<!--                                    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="long-arrow"-->
<!--                                         width="20" height="20" class="icon" type="default"><title>Long Arrow</title>-->
<!--                                        <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#long-arrow"></use>-->
<!--                                    </svg>-->
<!--                                    <h5 class="current-item">Give &amp; Join</h5></button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="navigation-item"><a class="navigation-link"-->
<!--                                                        href="https://shop.aucklandartgallery.com/"><h5 class="label">-->
<!--                            Shop</h5></a></div>-->
<!--                        <div class="navigation-item desktop-only"><a class="navigation-link primary" href="/s">-->
<!--                            <svg viewBox="0 0 40 40" aria-hidden="true" focusable="true" name="search" width="25"-->
<!--                                 height="25" class="icon" type="default"><title>Search</title>-->
<!--                                <use xlink:href="/static/assets/images/sprite.5951385a21d003da0d50.svg#search"></use>-->
<!--                            </svg>-->
<!--                        </a></div>-->
                    </nav>
                    <div class="navigation-secondary">
                        <a class="navigation-item" href="/visit/visitor-information">
                            We're open every day from 10am — 5pm, except Christmas day
                        </a>
                        <a class="navigation-item" href="https://www.google.com/maps/search/?api=1&amp;query=Auckland+Art+Gallery+Toi+o+T%C4%81maki&amp;query_place_id=ChIJbUgSLvtHDW0RFXKLUva-kD4" target="_blank" rel="noreferrer">
                            Cnr Kitchener and Wellesley Streets
                        </a>
                        <a class="navigation-item" href="/about/contact-us">Contact us</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>`;
