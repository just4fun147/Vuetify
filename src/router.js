import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "admin",
            component: importComponent("DashboardLayout"),
            children: [
                //Dashboard
                {
                    path: "/",
                    name: "Root",
                    component: importComponent("DashboardIndex"),
                },

                //To Do List
                {
                    path: "/gd",
                    name: "Guided",
                    component: importComponent("TodoList/ListItem"),
                },
                //UGD
                {
                    path: "/ugd",
                    name: "Unguided",
                    component: importComponent("TodoList/UnguidedList"),
                },
                //TGS
                {
                    path: "/tgs",
                    name: "Tugas",
                    component: importComponent("TodoList/TugasList"),
                },
            ],
        },
    ],
});

export default router;