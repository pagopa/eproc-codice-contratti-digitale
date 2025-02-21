<template>
    <div class="it-hero-text-wrapper bg-dark pt-0">
        <h1>Codice dei Contratti Pubblici Digitalizzato</h1>
        <p class="d-none d-lg-block" v-if="!this.$route.fullPath.includes('section')">Il Codice Appalti digitalizzato consente la consultazione della
            regolamentazione nel settore degli acquisti pubblici in modalità interattiva abilitando
            gli utenti alla visione degli articoli sulla base della loro versione aggiornata. Lo
            strumento consente una ricerca per parola chiave, l’applicazione di filtri secondo un
            criterio temporale o, in alternativa, applicando il criterio del riferimento normativo.
            Inoltre, è possibile utilizzare una specifica funzionalità per confrontare in tempo
            reale il contenuto degli articoli sulla base delle modifiche apportate dalla normativa
            di settore.</p>
    </div>
</template>

<script>
export default {
    name: "HeroCard"
}
</script>