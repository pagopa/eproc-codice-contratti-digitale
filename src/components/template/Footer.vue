<template>
    <footer class="it-footer mt-5">
        <div class="it-footer-main">
            <div class="container">
                <section>
                    <div class="row clearfix">
                        <div class="col-12 col-md-6">
                            <div class="it-brand-wrapper">
                                <div class="it-brand-text">
                                    <h5>Servizio Contratti Pubblici</h5>
                                    <a href="https://www.mit.gov.it/">
                                        <small><b>Ministero delle infrastrutture e dei trasporti</b>
                                            <svg class="icon ms-1 mb-1" aria-hidden="true">
                                                <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-external-link"'>
                                                </use>
                                            </svg>
                                        </small>
                                    </a>
                                </div>

                                <a class="mt-3" href="https://trasparenza.mit.gov.it/archivio13_strutture_0_14379.html">
                                    <small>Dipartimento per gli affari generali e ladigitalizzazione
                                        <svg class="icon ms-1 mb-1" aria-hidden="true">
                                            <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-external-link"'>
                                            </use>
                                        </svg>
                                    </small>
                                </a>
                                <a href="https://trasparenza.mit.gov.it/archivio13_strutture_-1_14302.html">
                                    <small>Direzione generale per la digitalizzazione
                                        <svg class="icon ms-1 mb-1" aria-hidden="true">
                                            <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-external-link"'>
                                            </use>
                                        </svg>
                                    </small>
                                </a>
                                <a
                                    href="https://trasparenza.mit.gov.it/archivio13_strutture-organizzative_0_14380_22_1.html">
                                    <small>Direzione generale per gli affari legali, societari e i contratti pubblici
                                        <svg class="icon ms-1 mb-1" aria-hidden="true">
                                            <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-external-link"'>
                                            </use>
                                        </svg>
                                    </small>
                                </a>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="h-100 d-flex flex-column justify-content-center text-md-end">
                                <b class="mt-0">PNRR</b><br>
                                <a
                                    href="https://www.mit.gov.it/comunicazione/news/attuazione-misure-del-piano-nazionale-di-ripresa-e-resilienza">
                                    <small>Supporto e accompagnamento alla digitalizzazione degli appalti pubblici
                                        <svg class="icon ms-1 mb-1" aria-hidden="true">
                                            <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-external-link"'>
                                            </use>
                                        </svg>
                                    </small>
                                </a>
                            </div>
                        </div>
                        <hr class="my-3">
                        <div class="row mb-4">
                            <a class="col-4 col-md-3 mt-2">
                                <img style="height:100%; width: 100%;" :src="this.$root.baseURL+ '/img/finanziato_unione_europea.png'">
                            </a>
                            <a href="https://www.mit.gov.it/" class="col-4 col-md-3 mt-2">
                                <img style="height:100%; width: 100%;" :src="this.$root.baseURL + '/img/mit.png'">
                            </a>
                            <a href="https://www.italiadomani.gov.it/content/sogei-ng/it/it/home.html" class="col-4 col-md-3 mt-2">
                                <img style="height:100%; width: 100%;" :src="this.$root.baseURL + '/img/italia_domani.png'">
                            </a>
                            <a href="https://www.itaca.org/nuovosito/index.asp" class="col-4 col-md-3 mt-2">
                                <img style="height:100%; width: 100%;" :src="this.$root.baseURL +'/img/itaca-logo.png'">
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div class="it-footer-small-prints clearfix">
            <div class="container">
                <div class="row text-white">
                    <ul class="it-footer-small-prints-list list-inline mb-0 d-flex flex-column flex-md-row col-12">
                        <li class="list-inline-item">
                            <a href="https://form.agid.gov.it/view/6f0fd560-758a-11ef-b1c9-45d731608e76#">
                                Dichiarazione di accessibilità <span class="visually-hidden">(link esterno su sito
                                    AgID)</span>
                                <svg class="icon ms-1 mb-1" aria-hidden="true">
                                    <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-external-link"'>
                                    </use>
                                </svg>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://www.mit.gov.it/privacy-cookie">Privacy e cookie
                                <svg class="icon ms-1 mb-1" aria-hidden="true">
                                    <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-external-link"'>
                                    </use>
                                </svg>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://www.mit.gov.it/note-legali">Note legali
                                <svg class="icon ms-1 mb-1" aria-hidden="true">
                                    <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-external-link"'>
                                    </use>
                                </svg>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://www.serviziocontrattipubblici.com/hub/it/contatti/">Contatti
                                <svg class="icon ms-1 mb-1" aria-hidden="true">
                                    <use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-external-link"'>
                                    </use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <small class="col-12 mb-2">In collaborazione con la Conferenza delle Regioni e delle Province autonome</small>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
a>img {
    object-fit: contain;
    max-height: 50px;
}


.icon {
    width: 18px !important;
    height: 18px !important;
    fill: #fff;
}
</style>

<script>
export default {
    name: 'FooterTemplate'
}
</script>