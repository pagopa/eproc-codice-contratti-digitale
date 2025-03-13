const { markdownToTxt } = require('markdown-to-txt')
const lodash = require('lodash')

export class Node {
    constructor(id, title, type = null, data = {}) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.childrens = [];
        this.parentId = data.section
    }
}

export class SectionNode extends Node {
    constructor(id, title, type = null, data = {}) {
        super(id, title, type, data)
        this.id = id;
        this.title = title;
        this.type = type;
        this.childrens = [];
        this.parentId = data.parent
    }
}

export class ArticleNode extends Node {
    constructor(id, title, type = null, data = {}) {
        super(id, title, type, data)
        this.id = id;
        this.title = title;
        this.type = type;
        this.childrens = [];
        this.keywords = data.keywords
        this.folder = data.folder
        this.parentId = data.section

        this.activeVersion = undefined
        this.activeNormative = undefined

        this.versions = data.versions

        this.versions.forEach(version => {
            if (version.validity_start) {
                let date = new Date(version.validity_start)
                date.setDate(date.getDate())
                date.setHours(23,59,59,59)
                version.validity_start = date
            }
            if (version.validity_end) {
                let date = new Date(version.validity_end)
                date.setDate(date.getDate())
                date.setHours(23,59,59,59)
                version.validity_end = date
            } else {
                let today = new Date();
                today.setDate(today.getDate())
                today.setHours(23,59,59,59)
                version.validity_end = today
            }
        });

        this.versions.sort((a,b) => {
            return a.validity_start > b.validity_start
        })

        this.markdown = ""
    }

    findVersionByDate = (date) => {
        let current_version = undefined;
        this.versions.forEach(version => {
            if (date >= version.validity_start && date <= version.validity_end) {
                current_version = version
                return
            }
        })
        return current_version
    }

    findCurrentVersion = () => {
        const now = new Date();
        return this.findVersionByDate(now)
    }

    loadVersion = async (version) => {
        this.markdown = await this.getVersionContent(version)
    }

    getVersionContent = async (version) => {
        const url = `${process.env.VUE_APP_BASE_URL}/${this.folder}/v${version}.md`
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const text = await response.text();
            return text
        } catch (error) {
            console.error(error.message)
        }
        return ""
    }
}

export class ContentTree {
    constructor(data) {
        this.filtered = false
        this.nodes = this.buildTree(data);
        this.unfilteredNodes = lodash.cloneDeep(this.nodes)
        this.unordedData = data
    }

    chunk(chunkSize) {
        var chunks = []
        var nodes = lodash.cloneDeep(this.nodes)
        for (let i = 0; i < this.nodes.length; i += chunkSize) {
            const chunk = nodes.slice(i, i + chunkSize);
            chunks.push(chunk)
        }
        return chunks
    }
    
    filterVersionByDate(node, input, date) {
        node.childrens.forEach((child) => {
            this.filterVersionByDate(child, input, date);
        });
        if (node.type !== "content") return;

        let searchDate = null;
        if (date) {
            let d = date.split("/");
            searchDate = new Date(`${d[2]}/${d[1]}/${d[0]}`);
        }

        node.versions.sort((a, b) => a.id - b.id);
        let activeVersion = null;
        node.versions.forEach((version) => {
            if (searchDate) {
                if (!activeVersion || (version.validity_start <= searchDate && version.validity_end >= searchDate)) {
                    activeVersion = version;
                }
            }
            version.filtered = true;
        });
        if (activeVersion) {
            activeVersion.filtered = false;
            var matchedKeywords = false 
            input.split(',').forEach((keyword) => {
                if (node.keywords.includes(keyword)) {
                    matchedKeywords = true
                }
            })
            if (!node.title.toLowerCase().includes(input.toLowerCase()) && !(activeVersion.plainText ?? "").toLowerCase().includes(input.toLowerCase()) && !matchedKeywords) {
                activeVersion.filtered = true
            }

            if (activeVersion.validity_start > searchDate) {
                activeVersion.filtered = true
            }
        }

    }

    filterBySearch = (node, input, date) => {
        node.childrens.forEach((child) =>  {
            this.filterBySearch(child, input, date)
        })
        if (node.type == "content") {
            node.versions.forEach((version) => {
                version.filtered = false

                var matchedKeywords = false 
                input.split(',').forEach((keyword) => {
                    if (node.keywords.includes(keyword)) {
                        matchedKeywords = true
                    }
                })

                if (date != "") {
                    let d = date.split("/");
                    let searchDate = new Date(d[2] + '/' + d[1] + '/' + d[0]);
                    if (version.validity_start > searchDate || version.validity_end < searchDate) {
                        version.filtered = true
                    }
                }

                if (!node.title.toLowerCase().includes(input.toLowerCase()) && !(version.plainText ?? "").toLowerCase().includes(input.toLowerCase()) && !matchedKeywords) {
                    version.filtered = true
                }
            })
        }
    }

    setUnfiltered = () => {
        this.filtered = false
        this.nodes = lodash.cloneDeep(this.unfilteredNodes)
    }

    search = async (input, date) => {
        this.filtered = true
        await this.loadAllContents()
        this.nodes = lodash.cloneDeep(this.unfilteredNodes)
        this.nodes.forEach((node) => {
            this.filterBySearch(node, input, date)
        })
    }

    progressiveSearch = async (input, date) => {
        this.filtered = true
        await this.loadAllContents()
        this.nodes = lodash.cloneDeep(this.unfilteredNodes)
        this.nodes.forEach((node) => {
            this.filterVersionByDate(node, input, date)
        })
    }

    loadNodeContents = async (node) => {
        for (const child of node.childrens) {
            await this.loadNodeContents(child); // Attendi il caricamento dei figli
        }

        if (node.type === "content") {
            for (const version of node.versions) {
                try {
                    const content = await node.getVersionContent(version.id);
                    version.plainText = markdownToTxt(content);
                } catch (error) {
                    console.error(`Errore nel caricamento di plainText per la versione ${version.id}:`, error);
                }
            }
        }
    };

    loadAllContents = async () => {
        this.nodes = lodash.cloneDeep(this.unfilteredNodes);

        for (const node of this.nodes) {
            await this.loadNodeContents(node); // Attendi il caricamento dei contenuti di ogni nodo
        }

        this.unfilteredNodes = lodash.cloneDeep(this.nodes);
    };

    getNodeById = (node, nodeId) => {
        if (node.id === nodeId) {
            return node;
        }
        for (const child of node.childrens) {
            const result = this.getNodeById(child, nodeId)
            if (result) {
                return result;
            }
        }
        return null
    }

    getNodeParent = (node) => {
        let _node = undefined
        if (node.parentId) { //se si tratta di un ArticleNode
            if (this.unordedData.sections[node.parentId]) {
                _node = this.unordedData.sections[node.parentId]
            }
        } else { //altrimenti se si tratta di un oggetto semplice
            _node = this.unordedData.sections[node.parent]
        }
        if (_node) { //se è stato trovato il nodo trova la sua chiave di riferimento
            let _parent = undefined
            _parent = this.unordedData.sections
            if (_node.parentId) {
                _parent = this.unordedData.sections[_node.parent]
            }
            for (const [key, val] of Object.entries(_parent)) {
                if (val === _node) {
                    _node.id = key
                    _node.route = `index.html?section=${_node.id}`
                }
            }
        }
        return _node;
    }

    getChain = (article) => {
        let chain = [];
        chain.push(article);
        let parent = this.getNodeParent(article)
        while (parent != undefined) {
            chain.push(parent)
            parent = this.getNodeParent(parent)
        }
        chain.reverse()
        return chain
    }

    buildTree(data) {
        const sections = data.sections;
        const contents = data.contents;

        // Helper function to recursively create a node and its children
        const createNode = (id, title, sections, contents, type = null, data = {}) => {
            const node = new SectionNode(id, title, type, data);

            // Add section children
            for (const [sectionId, section] of Object.entries(sections)) {
                if (section.parent === id) {
                    const childNode = createNode(sectionId, section.title, sections, contents, "section", section);
                    node.childrens.push(childNode);
                }
            }

            // Add content children
            for (const [contentId, content] of Object.entries(contents)) {
                if (content.section === id) {
                    const contentNode = new ArticleNode(contentId, content.title, "content", content);
                    node.childrens.push(contentNode);
                }
            }

            return node;
        };

        // Find root sections (those with no parent)
        const rootNodes = [];
        for (const [sectionId, section] of Object.entries(sections)) {
            if (!section.parent) {
                const rootNode = createNode(sectionId, section.title, sections, contents, "section");
                rootNodes.push(rootNode);
            }
        }

        return rootNodes;
    }
}

export async function loadOpinions(article) {
    try {
        const response = await fetch(`${process.env.VUE_APP_BASE_URL}/contents/quesiti.json`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const opinions = await response.json()
        return opinions.filter((q) => q.article == article.id && q.versions.includes(article.activeVersion.id))
    } catch (error) {
        console.log(error.message)
    }
}