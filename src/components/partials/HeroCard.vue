<template>
    <div class="it-hero-text-wrapper bg-dark pt-0">
        <h1>Codice dei Contratti Pubblici Digitalizzato</h1>
        <p class="d-none d-lg-block" v-if="!this.$route.fullPath.includes('section')">
            Il Codice dei Contratti pubblici digitalizzato (Digit-APP), in Funzionalità Beta, permette la consultazione del D.lgs. 36/2023 ss.mmi. in modalità interattiva. Il nuovo strumento consente di confrontare le versioni degli articoli del Codice in base alle modifiche apportate dal D.lgs. 209/2024, effettuare ricerche semantiche e visualizzare i pareri resi dal Servizio Supporto giuridico del MIT per una completa fruizione del Codice digitale. </p>
    </div>
</template>

<script>
export default {
    name: "HeroCard"
}
</script>