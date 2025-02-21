<template>
	<div class="fixed-top bg-white">
		<div style="z-index:2000" class="it-header-slim-wrapper">
			<div class="container-xxl">
				<div class="row">
					<div class="col-12">
						<div class="it-header-slim-wrapper-content py-2">
							<a class="navbar-brand" href="https://www.governo.it/it">
								Governo Italiano
								<svg class="icon" aria-hidden="true">
									<use href="/bootstrap-italia/dist/svg/sprites.svg#it-external-link"></use>
								</svg>
							</a>
							<a href="https://www.serviziocontrattipubblici.com/Home/contatti">
								Contatti
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container pb-0 pt-2 pt-md-3 pb-md-3 d-none d-md-flex">
			<div class="row">
				<div class="col-12">
					<h1 class="title ps-lg-5 text-center text-md-start text-md-small">Supporto Giuridico</h1>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="d-flex flex-row d-md-none mt-2 m-0 p-0 justify-content-between">
				<button class="pointer border-0 bg-white" @click="this.openMenu = !this.openMenu">
					<svg class="icon" aria-hidden="true">
						<use
							:href="`/bootstrap-italia/dist/svg/sprites.svg#` + (this.openMenu ? 'it-close-big' : 'it-burger')">
						</use>
					</svg>
				</button>
				<h4 class="text-center title mb-0">Supporto Giuridico</h4>
				<div />
			</div>
		</div>
		<div :class="this.openMenu ? `mobile-menu` : `mx-0 mx-md-2 mx-lg-auto container d-none d-md-block`">
			<a class="menu-link p-2 px-3" href="https://www.serviziocontrattipubblici.it/">Home</a>
			<a class="menu-link p-2 px-3" href="https://www.serviziocontrattipubblici.com/Home/Consultazione">Consultazione Pareri</a>
			<a class="menu-link p-2 px-3" href="https://www.serviziocontrattipubblici.com/Home/HelpDeskPNRRPNC">Help Desk Appalti PNRR e PNC</a>
			<a class="menu-link p-2 px-3" href="https://www.serviziocontrattipubblici.com/home/AccessToService">Accesso al servizio</a>
		</div>
		<div class="bandiera mt-2">
			<div class="verde"></div>
			<div class="bianco"></div>
			<div class="rosso"></div>
		</div>
	</div>
</template>

<style scoped>
.mobile-menu {
	display: flex;
	height: calc(100vh);
	flex-direction: column !important;
}

.mobile-menu>a {
	margin-top: 1.4em;
	margin-left: 2em;
	flex-grow: 0;
	transition: opacity 0.3s ease-in-out 0s, color 0.3s ease-in-out 0s, background-color 0.3s ease-in-out 0s, text-decoration 0.3s ease-in-out 0s, top 0.3s ease-in-out 0s, right 0.3s ease-in-out 0s, bottom 0.3s ease-in-out 0s, left 0.3s ease-in-out 0s, width 0.3s ease-in-out 0s, max-width 0.3s ease-in-out 0s, height 0.3s ease-in-out 0s, max-height 0.3s ease-in-out 0s, padding-top 0.3s ease-in-out 0s, padding-right 0.3s ease-in-out 0s, padding-bottom 0.3s ease-in-out 0s, padding-left 0.3s ease-in-out 0s, box-shadow 0.3s ease-in-out 0s, border-color 0.3s ease-in-out 0s, transform 0.3s ease-in-out 0s;
}

.mobile-menu>a:hover {
	border-left: 2px solid #003366;
	background-color: transparent;
	color: #0066cc;
	margin-left: calc(2em - 2px);
}

.menu-link {
	color: #0066cc;
	font-weight: bold;
	text-decoration: none;
	transition: opacity 0.3s ease-in-out 0s, color 0.3s ease-in-out 0s, background-color 0.3s ease-in-out 0s, text-decoration 0.3s ease-in-out 0s, top 0.3s ease-in-out 0s, right 0.3s ease-in-out 0s, bottom 0.3s ease-in-out 0s, left 0.3s ease-in-out 0s, width 0.3s ease-in-out 0s, max-width 0.3s ease-in-out 0s, height 0.3s ease-in-out 0s, max-height 0.3s ease-in-out 0s, padding-top 0.3s ease-in-out 0s, padding-right 0.3s ease-in-out 0s, padding-bottom 0.3s ease-in-out 0s, padding-left 0.3s ease-in-out 0s, box-shadow 0.3s ease-in-out 0s, border-color 0.3s ease-in-out 0s, transform 0.3s ease-in-out 0s
}

.menu-link:hover {
	text-decoration: underline;
	background-color: #0066cc;
	color: #FFF;
}

.bandiera {
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-wrap: nowrap;
	align-items: stretch;
	justify-content: center;
	width: 100%;
	height: 5px;
	margin: 0;
	z-index: 0;
	left: 0;
	bottom: 0;
}

.verde {
	height: 5px;
	background: #009246;
	width: 33%;
	flex-grow: 1;
}

.bianco {
	height: 5px;
	background: #FFF;
	width: 33%;
	flex-grow: 1;
}

.rosso {
	height: 5px;
	background: #ce2b37;
	width: 33%;
	flex-grow: 1;
}

.title {
	font-weight: 700;
	font-style: 'normal';
	color: #0066cc;
}

h1.title {
	font-size: 37px;
}

.it-header-slim-wrapper {
	background-color: #003366
}

.it-header-slim-wrapper-content>a {
	font-size: 16px;
}
</style>

<script>
export default {
	name: "HeaderTemplate",
	data: () => {
		return {
			openMenu: false
		}
	},
	props: {},
	methods: {
		checkWidth() {
			if (document.documentElement.clientWidth > 767) {
				this.openMenu = false;
			}
		}
	},
	mounted() {
		this.checkWidth();
		window.addEventListener("resize", this.checkWidth);
	},
	unmounted() {
		window.removeEventListener("resize", this.checkWidth);
	}
}

</script>
