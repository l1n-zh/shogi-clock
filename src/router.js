import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";

import ClockSelect from "./views/ClockSelect.vue";
import RoleSelect from "./views/clock_triple/RoleSelect.vue";
import PadView from "./views/clock_triple/PadView.vue";
import DisplayView from "./views/clock_triple/DisplayView.vue";

const routes = [
    { path: "/", component: ClockSelect },
    { path: "/triple", component: RoleSelect },
    { path: "/triple/display", component: DisplayView },
    { path: "/triple/pad", component: PadView },
];

export const router = createRouter({
    history: createWebHashHistory("/shogi-clock/"),
    routes,
});
