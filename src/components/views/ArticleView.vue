<template>
	<section class="it-hero-wrapper py-4">
		<div class="container-fluid">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<BreadcrumbNode :article="this.localArticle" :section="undefined" />
						<div class="it-hero-text-wrapper bg-dark pt-0 pb-0">
							<h1>Dettaglio Articolo</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<div class="container mt-5">
		<div class="row">
			<div class="col-12">
				<h1>{{ localArticle.activeVersion.title ?? localArticle.title }}</h1>

				<label class="active" for="dateStandard"><b>Stai visualizzando l'articolo valido al:</b></label>
				<input @change="changeDate($event)" class="form-control" type="date" id="dateStandard"
					name="dateStandard">

				<div class="mt-2" v-if="localArticle.versions.length > 1">
					<a href="#" class="" @click="this.versioning.show = !this.versioning.show">
						Confronta versioni
					</a>
					<br class="d-md-none pt-md-none">
					<div>
						<Transition>
							<div v-if="this.versioning.show" class="d-flex">
								<div class="row flex-grow-1">
									<div class="form-group mb-0 mt-5 col-12 col-md-6 select-wrapper">
										<label for="dlgs" class="active">Confronta versione decreto: </label>
										<select v-model="this.versioning.v1" name="dlgs" class="select mb-3">
											<option value="">Seleziona...</option>
											<option
												v-for="version in this.localArticle.versions.filter((x) => x.id != this.versioning.v2)"
												:value="version.id" :key="version.id">
												{{ version.normative_reference }}
											</option>
										</select>
									</div>
									<div class="form-group mb-0 mt-5 col-12 col-md-6 select-wrapper">
										<label for="dlgs" class="active">con:</label>
										<select v-model="this.versioning.v2" name="dlgs" class="select mb-3">
											<option value="">Seleziona...</option>
											<option
												v-for="version in this.localArticle.versions.filter((x) => x.id != this.versioning.v1)"
												:value="version.id" :key="version.id">
												{{ version.normative_reference }}
											</option>
										</select>
									</div>
								</div>
								<button type="button" @click="compare()"
									:class="'my-auto btn btn-primary p-3 ms-4 shadow rounded-circle btn-lg ' + ((this.versioning.v1 !== '' && this.versioning.v2 !== '') ? '' : 'disabled')">
									<svg class="icon icon icon-white">
										<use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-exchange-circle"'></use>
									</svg>
								</button>
							</div>
						</Transition>
					</div>
				</div>
				<div class="dropdown p-2 bg-white shadow-sm mt-4 rounded d-md-flex justify-content-between">
					<div class="d-flex flex-row flex-grow-1 justify-content-between">
						<div v-if="this.versioning.from">
							<a class="dropdown-toggle text-break" type="button" @click="clearCompare"
								aria-expanded="false">
								<svg class="icon icon-primary">
									<use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-close"'></use>
								</svg>
								<span>
									{{ this.versioning.from }}
								</span>
								<svg class="icon icon-primary icon-sm">
									<use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-arrow-right"'></use>
								</svg>
								<span>
									{{ this.versioning.to }}
								</span>
							</a>
						</div>
						<div v-else>
							<a class="dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown"
								aria-expanded="false">
								<svg class="icon icon-primary fixed-icon">
									<use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-expand"'></use>
								</svg>
								<span style="white-space:pre-wrap" class="text-break">
									{{ localArticle.activeVersion.normative_reference }} valido dal {{
							this.defaultDateFormatter.format(localArticle.activeVersion.validity_start) }} {{
							!isToday(localArticle.activeVersion.validity_end) ? "al " +
								this.defaultDateFormatter.format(localArticle.activeVersion.validity_end) : '' }}
								</span>
							</a>
							<ul class="dropdown-menu">
								<li v-for="version in localArticle.versions" :key="version.id">
									<button class="dropdown-item text-primary" @click="this.setArticleVersion(version)"
										:class="version.id == localArticle.activeVersion.id ? 'text-muted disabled' : ''">Versione
										{{ version.normative_reference }}</button>
								</li>
							</ul>
						</div>
					</div>

					<a v-if="this.opinions.length > 0" class="dropdown-toggle" type="button" data-bs-toggle="dropdown"
						aria-expanded="false">
						<svg class="icon icon-primary">
							<use :href='this.$root.baseURL + "/bootstrap-italia/dist/svg/sprites.svg#it-expand"'></use>
						</svg>
						Sono presenti pareri
						<span class="badge bg-danger ms-2">{{ this.opinions.length }}</span>
					</a>
					<ul class="dropdown-menu">
						<li v-for="opinion in this.opinions" :key="opinion.id">
							<button type="button" href="#" @click="this.scrollToElement('#quesito-' + opinion.id)"
								class="dropdown-item text-primary">{{ opinion.subject }}</button>
						</li>
					</ul>
				</div>

				<hr class="my-0">
				<div v-if="this.versioning.diff || this.versioning.diff2">
					<div v-html="this.versioning.diff" class="p-4 shadow rounded" />
				</div>
				<div v-else>
					<div id="article-content" class="p-4 shadow rounded" v-html="this.content" />
				</div>
			</div>
			<div class="mt-5">
				<div class="mt-3" v-for="opinion in this.opinions" :key="opinion.id">
					<OpinionCard :id="opinion.id" :emission_date="opinion.emission_date" :arguments="opinion.arguments"
						:subject="opinion.subject" :question="opinion.question" :answer="opinion.answer" />
				</div>
			</div>
		</div>
	</div>
</template>

<style>
mark {
	display: block !important;
}

.alist>li {
	margin-left: 0.5rem !important;
	/* Equivalente a Bootstrap .ms-2 */
	margin-top: 0.25rem !important;
	/* Equivalente a Bootstrap .mt-1 */
}

.fixed-icon {
	min-width: 32px;
	min-height: 32px;
}

#article-content * {
	font-family: var(--bs-body-font-family);
	font-size: var(--bs-body-font-size);
	font-weight: var(--bs-body-font-weight);
	line-height: var(--bs-body-line-height);
	color: var(--bs-body-color);
	text-align: var(--bs-body-text-align);
	background-color: var(--bs-body-bg);
	-webkit-text-size-adjust: 100%;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}
</style>

<script>

import { ArticleNode, loadOpinions } from '@/classes/tree'
import contents from '../../assets/data/contents.json'
import showdown from 'showdown';

import BreadcrumbNode from '../navigator/BreadcrumbNode.vue'
import OpinionCard from '../partials/OpinionCard.vue'

import { createTwoFilesPatch, diffWords } from "diff";
import "diff2html/bundles/css/diff2html.min.css";
import { nextTick } from 'vue';
import { ref } from 'vue';

export default {
	name: "ArticleView",
	components: {
		BreadcrumbNode,
		OpinionCard
	},
	props: {
		article: String,
		section: String,
		version: String
	},
	data() {
		return {
			content: null,
			dateFilter: "",
			defaultDateFormatter: new Intl.DateTimeFormat('it-IT', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			}),
			calendarDateFormatter: new Intl.DateTimeFormat('en-CA', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			}),
			opinions: [],
			versioning: {
				show: false,
				v1: "",
				v2: "",
				diff: undefined,
				from: "",
				to: "",
				listCounter: 0
			},
			localVersion: 0,
			localArticle: {
				versions: [],
				activeVersion: 0
			}
		}
	},
	methods: {
		async compare() {
			if (this.versioning.v1 !== '' && this.versioning.v2 !== '') {

				var v1_content = (await this.localArticle.getVersionContent(this.versioning.v1)).replaceAll(/<[^>]*>?/gm, '').replaceAll(/\[([^\]]+)\]\([^)]+\)/g, '$1')
				var v2_content = (await this.localArticle.getVersionContent(this.versioning.v2)).replaceAll(/<[^>]*>?/gm, '').replaceAll(/\[([^\]]+)\]\([^)]+\)/g, '$1')

				var from = this.localArticle.versions.filter((x) => x.id == this.versioning.v1)[0].normative_reference
				var to = this.localArticle.versions.filter((x) => x.id == this.versioning.v2)[0].normative_reference

				v1_content = this.markdownToHTML(v1_content)
				v1_content = this.convertOrderedListToStaticList(v1_content);
				v1_content = v1_content.replace(/<p>/g, '<span>').replace(/<\/p>/g, '</span><br>').replace('<pre>', '<span>').replace('</pre>', '</span>').replace('<code>', '<span>').replace('</code>', '</span>');
				v2_content = this.markdownToHTML(v2_content)
				v2_content = this.convertOrderedListToStaticList(v2_content);
				v2_content = v2_content.replace(/<p>/g, '<span>').replace(/<\/p>/g, '</span><br>').replace('<pre>', '<span>').replace('</pre>', '</span>').replace('<code>', '<span>').replace('</code>', '</span>');

				this.versioning.from = from
				this.versioning.to = to

				const diffString = createTwoFilesPatch(from, to, v1_content, v2_content, { context: 0 });

				const lines = diffString.split('\n');

				var groupedLines = [];
				var diffBlocks = [];

				let diffRes = ""
				let diffAppend = ""

				var lastLine = undefined
				var currentGroup = undefined;

				var lastEnd = 0
				var firstHeader = true
				var headers = lines.filter((x) => x.includes("@@"));

				lines.forEach((line, index) => {
					var diffPrepend = ""
					var header_match = null
					var b = {}
					// eslint-disable-next-line
					if ((header_match = /\@\@ (-|[+])(\d+),(\d+) (-|[+])(\d+),(\d+) \@\@/.exec(line)) !== null) {
						var diffSubInit = parseInt(header_match[2])
						var diffSubEnd = parseInt(header_match[3])
						var diffAddInit = parseInt(header_match[5])
						var diffAddEnd = parseInt(header_match[6])

						var lastBranch = headers[headers.indexOf(line) - 1]
						if (lastBranch) {
							var lastHeaderMatch = null;
							// eslint-disable-next-line
							if ((lastHeaderMatch = /\@\@ (-|[+])(\d+),(\d+) (-|[+])(\d+),(\d+) \@\@/.exec(lastBranch)) !== null) {
								var diffLastSubInit = parseInt(lastHeaderMatch[2])
								var diffLastSubEnd = parseInt(lastHeaderMatch[3])
								var diffLastAddInit = parseInt(lastHeaderMatch[5])
								var diffLastAddEnd = parseInt(lastHeaderMatch[6])
								b["pre"] = v1_content.split('\n').splice(diffLastSubInit + diffLastSubEnd - 1, diffSubInit - (diffLastSubInit + diffLastSubEnd)).join('\n')
							}
						}
						if (line == headers[0]) {
							diffRes += v1_content.split('\n').splice(0, diffSubInit - 1).join('\n')
						}
						var longestContent = v2_content
						if (v2_content.split('\n').length > v1_content.split('\n').length) {
							longestContent = v1_content
						}
						diffAppend = longestContent.split('\n').splice(Math.max(diffAddInit + diffAddEnd, diffSubInit + diffSubEnd) - 1).join('\n')
						//diffAppend = ""
					}
					diffBlocks.push(b)
					if (
						line.startsWith('-') && lastLine && lastLine.startsWith('+') ||
						line.startsWith('+') && lastLine && lastLine.startsWith('-')
					) {
						groupedLines.push(currentGroup)
						currentGroup = {
							"type": line.startsWith('-') ? 'sub' : 'add',
							"start": index,
							"lines": []
						}
						currentGroup["end"] = index
						currentGroup["lines"].push(line)
					}
					if (line.startsWith('-') && (!lastLine || lastLine.startsWith('-'))) {
						if (!currentGroup) {
							currentGroup = {
								"type": "sub",
								"start": index,
								"lines": []
							}
						}
						currentGroup["end"] = index
						currentGroup["lines"].push(line)
					}
					if (line.startsWith('+') && (!lastLine || lastLine.startsWith('+'))) {
						if (!currentGroup) {
							currentGroup = {
								"type": "add",
								"start": index,
								"lines": []
							}
						}
						currentGroup["end"] = index
						currentGroup["lines"].push(line)
					}
					if (line.includes("@@") && diffBlocks[index]["pre"]) {
						line = diffBlocks[index]["pre"]
					}
					if (line.startsWith('-') || line.startsWith('+')) {
						lastLine = line
					} else {
						lastLine = undefined;
						if (currentGroup) {
							groupedLines.push(currentGroup)
						}
						currentGroup = {
							"type": "neutral",
							"start": index,
							"lines": [line],
							"end": index
						}
						groupedLines.push(currentGroup)
						currentGroup = undefined;
					}
				});

				for (var i = 4; i < groupedLines.length; i++) {

					var lastLines = groupedLines[i - 1] ?? null;
					var currentLines = groupedLines[i];
					var nextLines = groupedLines[i + 1] ?? null;

					if (currentLines["type"] == "sub" && nextLines["type"] == "add") {
						let res = this.highlighDifferences(
							currentLines["lines"].map(l => { return l.substring(1) }).join('<br>'),
							nextLines["lines"].map(l => { return l.substring(1) }).join('<br>')
						)
						if (res) {
							diffRes += res + `<br><br>`
						}
					} else if (currentLines["type"] == "add" && (!lastLines || lastLines["type"] != "sub")) {
						diffRes += `<b class="text-success">` + currentLines["lines"].map(l => { return l.substring(1) }).join('<br>') + `<br></b>`
					} else if (currentLines["type"] == "sub") {
						diffRes += `<s class="text-danger text-decoration-line-through">` + currentLines["lines"].map(l => { return l.substring(1) }).join('<br>') + `</s>`
					} else if (currentLines["type"] == "neutral") {
						//qui è presente articolo 121
						diffRes += currentLines["lines"].map(l => { return l.substring(1) }).join('<br>')
					}
				}

				this.versioning.diff = diffRes.replaceAll(/\b(?<!lettera\s+|lettere\s+|ed |[,] |e |\(|comma )([a-zA-Z](-bis|-ter|-quater|-quinquies)?\).*?)<br>/g, '<div class="ms-2 mt-1">$1</div> ').replaceAll("\\ No newline at end of file", '').replaceAll(" No newline at end of file", "") + diffAppend;
				this.versioning.diff = this.versioning.diff.replaceAll(/(:|;)\b(?<!lettera\s+|lettere\s+|ed |[,] |e |\(|comma )([a-zA-Z](-bis|-ter|-quater|-quinquies)?\).*?)/g, '$1<br>$2').replaceAll('undefined', '')
			}
		},
		highlighDifferences(str1, str2) {
			const words1 = str1.split(" ").filter((x) => { return x != "" }).map((x) => x.replaceAll('<br><br><br>', ' \n').replace(/<\/?[^>]+(>|$)/g, ""));
			const words2 = str2.split(" ").filter((x) => { return x != "" }).map((x) => x.replaceAll('<br><br><br>', ' \n').replace(/<\/?[^>]+(>|$)/g, ""));

			let diff = diffWords(words1.join(' '), words2.join(' '))
			var result;
			diff.forEach(part => {
				if (part.added && part.value) {
					result += `<b class="text-success">${part.value}</b>`; // Testo aggiunto
				} else if (part.removed && part.value) {
					result += `<s class="text-danger text-decoration-line-through">${part.value}</s>`; // Testo rimosso
				} else {
					result += part.value ?? ""; // Testo invariato
				}
			});

			return result;
		},
		collapseTag(str) {
			if (str.includes('<b class="text-success">')) {
				return '<b class="text-success">' + str.replaceAll('<b class="text-success">', '').replaceAll('</b>', '') + "</b>"
			}
			if (str.includes('<s class="text-danger text-decoration-line-through">')) {
				return '<s class="text-danger text-decoration-line-through">' + str.replaceAll('<s class="text-danger text-decoration-line-through">', '').replaceAll('</s>', '') + '</s>'
			}

			return str
		},
		markdownToHTML(string) {
			const converter = new showdown.Converter({ tables: true });
			let html = converter.makeHtml(string).replaceAll('<table>', '<table class="table">').replaceAll('href="/','href="'+this.$root.baseURL+"/");
			return html
		},

		convertOrderedListToStaticList(htmlString) {
			let tempDiv = document.createElement("div");
			tempDiv.innerHTML = htmlString;

			let olElements = tempDiv.querySelectorAll("ol");
			if (olElements.length == 0) return htmlString;

			olElements.forEach((olElement, index) => {
				let startIndex = 0;
				if (olElement.getAttribute('start')) {
					startIndex = parseInt(olElement.getAttribute('start')) - 1;
				}
				let listItems = olElement.querySelectorAll("li");
				let newContent = "";

				listItems.forEach((li, _index) => {
					let liContent = li.innerHTML.replace(/<p>/g, '<span>').replace(/<\/p>/g, '</span><br><br>');
					newContent += `${startIndex + _index + 1}. ${liContent}\n`; // Aggiunge la numerazione fissa
				});

				olElements[index].outerHTML = newContent;
			})
			return tempDiv.innerHTML;
		},

		clearCompare() {
			this.versioning.label = ""
			this.versioning.diff = undefined
			this.versioning.from = ""
			this.versioning.to = ""
		},

		scrollToElement(query) {
			const element = document.querySelector(query);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		},
		changeDate(event) {
			this.dateFilter = event.currentTarget.value
			let searchingDate = new Date(this.dateFilter)
			if (searchingDate > new Date()) {
				searchingDate = new Date()
			}
			let version = this.localArticle.findVersionByDate(searchingDate)
			if (version) {
				this.setArticleVersion(version, false)
			}
		},
		updateDateFilter() {
			this.dateFilter = this.calendarDateFormatter.format(this.localArticle.activeVersion.validity_end)
		},
		isToday(date) {
			const today = new Date();

			return date.getFullYear() === today.getFullYear() &&
				date.getMonth() === today.getMonth() &&
				date.getDate() === today.getDate();
		},
		async setArticleVersion(version, updateDate = true) {
			this.localArticle.activeVersion = version
			await this.localArticle.loadVersion(version.id)

			let content = this.markdownToHTML(this.localArticle.markdown)
			content = this.convertOrderedListToStaticList(content)
				.replaceAll('<p>', '<span>')
				.replaceAll('</p>', '<br><br></span>')
				// eslint-disable-next-line
				.replaceAll(/\b(?<!lettera |lettere |punto |punti |peso |ed |[,] |e |\(|numero |numeri |del |\=|\- |\+ |\,|\/|\-|comma |n\. |÷ )(([a-zA-Z]{1,2}|\d+(.\d+)?)(-bis|-ter|-quater|-quinquies|-sexies|-septies)?\).*?)(<br>|$)/gm, '<div class="ms-2 mt-1">$1</div> ')
				.replaceAll(/(<div class="ms-2 mt-1">(\d(\.\d)?\).*?)<\/div>)/gm, '<div class="ms-2">$1</div> ');

			this.content = content;

			//carica i pareri
			this.opinions = await loadOpinions(this.localArticle)
			this.opinions.sort((a, b) => {
				return a.emission_date < b.emission_date;
			})
			if (updateDate) {
				this.updateDateFilter()
			}
		}
	},
	async created() {
		//carica l'articolo
		let art = contents.contents[this.article]
		this.localArticle = new ArticleNode(this.article, art.title, art.type, art)

		//imposta la versione 
		let version = undefined;
		if (this.$root.version) { //se è impostata una versione nell'argomento della rotta estrapola
			let currentversionsion = this.localArticle.versions.filter((v) => { return v.id == this.$root.version })
			if (currentversionsion.length > 0) {
				version = currentversionsion[0]
			}

		}
		//altrimenti imposta la versione attualmente attiva
		if (version === undefined) {
			version = this.localArticle.findCurrentVersion();
		}

		this.setArticleVersion(version)
		this.updateDateFilter()
	}
}
</script>