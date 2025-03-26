import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";

import ClockSelect from "./views/ClockSelect.vue";
import RoleSelect from "./views/clock_triple/RoleSelect.vue";
import ButtonView from "./views/clock_triple/ButtonView.vue";
import DisplayView from "./views/clock_triple/DisplayView.vue";

const routes = [
    { path: "/", component: ClockSelect },
    { path: "/triple", component: RoleSelect },
    { path: "/triple/display", component: DisplayView },
    { path: "/triple/button", component: ButtonView },
];

export const router = createRouter({
    history: createWebHashHistory("/shogi-clock/"),
    routes,
});
