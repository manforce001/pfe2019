'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">bassem documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-6bb7d92b21e4be986d38fa1bc8d0950a"' : 'data-target="#xs-components-links-module-AdminModule-6bb7d92b21e4be986d38fa1bc8d0950a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-6bb7d92b21e4be986d38fa1bc8d0950a"' :
                                            'id="xs-components-links-module-AdminModule-6bb7d92b21e4be986d38fa1bc8d0950a"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AjouteClientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AjouteClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AjouteRucheRechComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AjouteRucheRechComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AjouterEmpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AjouterEmpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AjouterucheComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AjouterucheComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MaintenancerucheComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MaintenancerucheComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifierEmpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifierEmpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifierEmployeeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifierEmployeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RechARComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RechARComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RechMEComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RechMEComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RechSCComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RechSCComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RechSeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RechSeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SuppClientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SuppClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SupprimerEmpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SupprimerEmpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-33f43ab97b1d00b4a7b175782c2d8b2b"' : 'data-target="#xs-components-links-module-AppModule-33f43ab97b1d00b4a7b175782c2d8b2b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-33f43ab97b1d00b4a7b175782c2d8b2b"' :
                                            'id="xs-components-links-module-AppModule-33f43ab97b1d00b4a7b175782c2d8b2b"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClientModule.html" data-type="entity-link">ClientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ClientModule-fd2cf2a27478c2d227f6300fe897dff4"' : 'data-target="#xs-components-links-module-ClientModule-fd2cf2a27478c2d227f6300fe897dff4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ClientModule-fd2cf2a27478c2d227f6300fe897dff4"' :
                                            'id="xs-components-links-module-ClientModule-fd2cf2a27478c2d227f6300fe897dff4"' }>
                                            <li class="link">
                                                <a href="components/ClientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifierProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifierProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RucheComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RucheComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmployeeModule.html" data-type="entity-link">EmployeeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EmployeeModule-f7924b73171ed7c8a50ca97501ca7f6e"' : 'data-target="#xs-components-links-module-EmployeeModule-f7924b73171ed7c8a50ca97501ca7f6e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EmployeeModule-f7924b73171ed7c8a50ca97501ca7f6e"' :
                                            'id="xs-components-links-module-EmployeeModule-f7924b73171ed7c8a50ca97501ca7f6e"' }>
                                            <li class="link">
                                                <a href="components/EmployeeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmployeeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AlertComponent.html" data-type="entity-link">AlertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginAdminComponent.html" data-type="entity-link">LoginAdminComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginClientComponent.html" data-type="entity-link">LoginClientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapComponent.html" data-type="entity-link">MapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MapComponent-1.html" data-type="entity-link">MapComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent-1.html" data-type="entity-link">NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent-2.html" data-type="entity-link">NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavbarComponent-3.html" data-type="entity-link">NavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationComponent-1.html" data-type="entity-link">NotificationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationComponent-2.html" data-type="entity-link">NotificationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent.html" data-type="entity-link">SidebarComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddAlertService.html" data-type="entity-link">AddAlertService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AfficheListeRucheService.html" data-type="entity-link">AfficheListeRucheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AfficheListeService.html" data-type="entity-link">AfficheListeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AfficheListeService-1.html" data-type="entity-link">AfficheListeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AfficheListeService-2.html" data-type="entity-link">AfficheListeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AfficheUnService.html" data-type="entity-link">AfficheUnService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AfficheUnService-1.html" data-type="entity-link">AfficheUnService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AjouteRucheService.html" data-type="entity-link">AjouteRucheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AjouteService.html" data-type="entity-link">AjouteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AjouteService-1.html" data-type="entity-link">AjouteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Data.html" data-type="entity-link">Data</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EnvoyeNotificationService.html" data-type="entity-link">EnvoyeNotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetProfileService.html" data-type="entity-link">GetProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetProfileService-1.html" data-type="entity-link">GetProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetserviceService.html" data-type="entity-link">GetserviceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetSetListeService.html" data-type="entity-link">GetSetListeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListeNotificationService.html" data-type="entity-link">ListeNotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListeNotificationService-1.html" data-type="entity-link">ListeNotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModifierService.html" data-type="entity-link">ModifierService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModifProfileService.html" data-type="entity-link">ModifProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link">ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RechPlaceService.html" data-type="entity-link">RechPlaceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RemoveNotifService.html" data-type="entity-link">RemoveNotifService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SupprimeService.html" data-type="entity-link">SupprimeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SupprimeService-1.html" data-type="entity-link">SupprimeService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Client.html" data-type="entity-link">Client</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Employe.html" data-type="entity-link">Employe</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmployeForm.html" data-type="entity-link">EmployeForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ruche.html" data-type="entity-link">Ruche</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});