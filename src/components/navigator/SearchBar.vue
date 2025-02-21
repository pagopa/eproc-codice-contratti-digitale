<template>
	<Transition>
		<div v-if="this.loading" class="col-12 text-center mb-3">
			<div class="modal fade show mt-5" tabindex="-1" role="dialog" id="exampleModal"
				aria-labelledby="exampleModalTitle" style="display: block;" aria-modal="true" data-focus-mouse="false">
				<div class="modal-dialog" role="document">
					<div class="modal-content rounded shadow">
						<div class="modal-body">
							<p><b>Caricamento risultati in corso...</b></p>
							<div class="spinner-grow text-primary mb-3" role="status">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>

	<div class="px-4">
		<div class="mb-2 d-flex">
			<div class="row flex-grow-1">
				<div class="form-group mb-0 mt-5 col-12 col-lg-4">
					<label for="text-search" class="active">Filtra per contenuto:</label>
					<input @change="search" @keyup.enter="search" v-model="searchInput" type="text" class="form-control mb-3"
						id="text-search" name="text-search" placeholder="Ricerca per contenuti">
					<Transition>
						<a v-if="this.searchInput != ''" class="cpointer" @click="clearSearch">
							<svg class="icon icon-sm icon-primary">
								<use href="/bootstrap-italia/dist/svg/sprites.svg#it-funnel"></use>
							</svg>
							Ripristina filtro contenuto
						</a>
					</Transition>
				</div>
				<div class="form-group mb-0 mt-5 col-12 col-lg-4">
					<label for="date-search" class="active">Filtra per data:</label>
					<input @change="search" @keyup.enter="search" v-model="dateInput" class="form-control datepicker mb-3" type="date"
						id="date-search" name="date-search">
					<Transition>
						<a v-if="this.dateInput != ''" class="cpointer" @click="clearDate">
							<svg class="icon icon-sm icon-primary">
								<use href="/bootstrap-italia/dist/svg/sprites.svg#it-funnel"></use>
							</svg>
							Ripristina filtro per data
						</a>
					</Transition>
				</div>
				<div class="form-group mb-0 mt-5 col-12 col-lg-4 select-wrapper">
					<label for="dlgs" class="active">Filtra per validità decreto:</label>
					<select @change="search" @keyup.enter="search" v-model="dlgsInput" name="dlgs" class="select mb-3">
						<option value="">Tutti</option>
						<option v-for="dlgs in this.$root.dlgs"
							:value="dlgs.validity_end ?? this.currentDateToDlgsValue()" :key="dlgs.id">
							{{ dlgs.normative_reference }}
						</option>
					</select>
					<Transition>
						<a class="cpointer" v-if="this.dlgsInput != ''" @click="clearDlgs">
							<svg class="icon icon-sm icon-primary">
								<use href="/bootstrap-italia/dist/svg/sprites.svg#it-funnel"></use>
							</svg>
							Ripristina validità decreto
						</a>
					</Transition>
				</div>
			</div>
			<div class="d-flex">
				<button type="button" @click="search"
					class="my-auto btn btn-primary p-3 ms-4 shadow rounded-circle btn-lg">
					<svg class="icon icon icon-white">
						<use href="/bootstrap-italia/dist/svg/sprites.svg#it-search"></use>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<style>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.cpointer  {
	cursor: pointer;
}
</style>

<script>
import contents from '@/assets/data/contents.json'

export default {
	name: "SearchBar",
	data() {
		return {
			searchInput: "",
			dateInput: "",
			dlgsInput: "",
			loading: false
		}
	},
	props: {
		treeContainer: {
			type: Object,
			required: true
		}
	},
	mounted() {
        if (this.$route.params.version) {
            var currentDlgs = contents["dlgs"].filter((d) => {return d.id == this.$route.params.version})
            if (currentDlgs.length == 1) {
                currentDlgs = currentDlgs[0]
				if (!currentDlgs.validity_end) {
					currentDlgs.validity_end = this.currentDateToDlgsValue()
				}
                this.dlgsInput = currentDlgs.validity_end
				this.$nextTick(() => this.search())
            }
        }
	},
	methods: {
		currentDateToDlgsValue() {
			return (new Date()).toISOString().split('T')[0]
		},
		async clearSearch() {
			this.loading = true
			this.searchInput = "";
			this.treeContainer.contentTree.setUnfiltered()
			this.treeContainer.updateContentTree();
			this.loading = false
		},
		async clearDate() {
			this.loading = true
			this.dateInput = "";
			this.treeContainer.contentTree.setUnfiltered()
			this.treeContainer.updateContentTree();
			this.loading = false
		},
		async clearDlgs() {
			this.loading = true
			this.dlgsInput = "";
			this.treeContainer.contentTree.setUnfiltered()
			this.treeContainer.updateContentTree();
			this.loading = false
		},
		async search() {
			this.treeContainer.contentTree.setUnfiltered()
			this.loading = true
			if (this.searchInput != "" || this.dateInput != "" || this.dlgsInput != "") {
				if (this.dlgsInput != "") {
					await this.treeContainer.contentTree.progressiveSearch(this.searchInput, this.dlgsInput)
					this.treeContainer.updateContentTree()
					this.loading = false
					return
				}
				await this.treeContainer.contentTree.search(this.searchInput, this.dateInput)
			}
			this.treeContainer.updateContentTree()
			this.loading = false
		}
	}
}
</script>

<style></style>