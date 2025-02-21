<template>
    <div :id="'quesito-'+id">
        <div class="card shadow rounded">
            <div class="card-header rounded d-flex justify-content-between bg-primary text-white">
                <b>Parere {{ id }}</b>
                <span>{{ convertDate(emission_date) }}</span>
            </div>
            <div class="card-body" style="overflow: auto;">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Argomenti</td>
                            <td class="opinion-data">
                                <span class="text-white bg-primary rounded p-2 me-2" v-for="argument in arguments" :key="argument">{{ argument }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Oggetto</td>
                            <td class="opinion-data"><b>{{ subject }}</b></td>
                        </tr>
                        <tr>
                            <td>Quesito</td>
                            <td class="opinion-data">{{ question }}</td>
                        </tr>
                        <tr>
                            <td>Risposta aggiornata</td>
                            <td class="opinion-data">{{ answer }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card:after {
    margin-top: 0 !important;
}
.opinion-data {
    max-width: 100%;
}
</style>

<script>
export default {
    name: "OpinionCard",
    props: {
        id: {
            type: String,
            required: true
        },
        emission_date: {
            type: String,
            required: true
        },
        arguments: {
            type: Array,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: false
        }
    },
    methods: {
        convertDate(dataString) {
            const data = new Date(dataString);
            const giorno = data.getDate();
            const mese = data.getMonth() + 1; 
            const anno = data.getFullYear();
            const dataFormattata = `${giorno.toString().padStart(2, '0')}/${mese.toString().padStart(2, '0')}/${anno}`;
            return dataFormattata;
        }
    }
}
</script>