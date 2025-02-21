import {
    createApp
} from 'vue'
import App from './App.vue'

import {
    createWebHistory,
    createRouter
} from 'vue-router'

import HomeView from './components/views/HomeView';
import ArticleView from './components/views/ArticleView';
import SectionView from './components/views/SectionView';

import 'bootstrap'
import 'bootstrap-italia/dist/css/bootstrap-italia.min.css';
import 'bootstrap-italia/dist/js/bootstrap-italia.bundle.min.js'
import ContainerNode from './components/navigator/ContainerNode.vue';

const routes = [{
        path: "/",
        component: HomeView
    },
    {
        path: "/section/:section",
        component: SectionView
    },
    {
        path: "/section/:section/:version",
        component: SectionView
    },
    {
        path: "/:article/:version",
        component: ArticleView
    },
    {
        path: "/:article",
        component: ArticleView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (savedPosition) {
                    resolve(savedPosition);
                } else {
                    resolve({
                        top: 0,
                        left: 0
                    });
                }
            }, 100);
        });
    }
})


router.afterEach(() => {
    const meta = document.createElement("meta");
    meta.httpEquiv = "Cache-Control";
    meta.content = "no-cache, no-store, must-revalidate";
    document.head.appendChild(meta);
});


createApp(App).component('ContainerNode', ContainerNode).use(router).mount('#app')