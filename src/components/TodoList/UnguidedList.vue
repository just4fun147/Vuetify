<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="grey"></v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">To Do List</v-list-item-title>
                    <v-list-item-subtitle>200710755</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    outlined
                    hide
                    details
                    style="margin-top: 30px"></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn color="success" dark @click="dialog =true"> Tambah </v-btn>
            </v-card-title>
        </v-card>
        <v-card>
            <v-data-table :headers="headers"
                      :items="todos"
                      item-key="task"
                      :single-expand="singleExpand"
                      :expanded.sync="expanded"
                      show-expand
                      class="elevation-1">
                      
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mx-2"
                        fab
                        dark
                        color="red" @click="editItem(item)"><v-icon>mdi-pencil</v-icon> </v-btn>
                    <v-btn small class="mx-2"
                        fab
                        dark
                        color="green" @click="conf=true"> <v-icon> mdi-delete</v-icon> </v-btn>
                </template>
                <template v-slot:[`item.priority`]="{ item }">
                    <span v-if="item.priority=='Penting'">
                        <v-icon color="red">mdi-alert-octagon</v-icon>
                    </span>
                    <span v-else-if="item.priority=='Biasa'">
                        <v-icon color="green">mdi-alert-octagon</v-icon>
                    </span>
                    <span v-else-if="item.priority=='Tidak Penting'">
                        <v-icon color="blue">mdi-alert-octagon</v-icon>
                    </span>
                </template>
                <template v-slot:expanded-item="{ item }">
                    <td colspan="5">
                        <span v-if="item.priority=='Penting'">
                            <v-simple-table style="background-color:red">
                             <template v-slot:default>
                                <tr ><v-btn  color="red" dark disable style="border-radius: 25px; margin: 10px;">
                                    <v-icon dark right class="ma-2"  >mdi-fire</v-icon> {{ item.priority }}</v-btn>
                                </tr>
                                <tr ><v-btn  color="yellow" dark disable style="border-radius: 25px;margin: 10px;">
                                    <v-icon dark right class="ma-2" >mdi-calendar</v-icon> {{ item.note }}</v-btn>
                                </tr>
                            </template>
                        </v-simple-table>
                        </span>
                        <span v-if="item.priority=='Biasa'">
                            <v-simple-table style="background-color:green">
                             <template v-slot:default>
                                <tr ><v-btn  color="green" dark disable style="border-radius: 25px;margin: 10px;">
                                    <v-icon dark right class="ma-2" >mdi-fire</v-icon> {{ item.priority }}</v-btn>
                                </tr>
                                <tr ><v-btn  color="yellow" dark disable style="border-radius: 25px;margin: 10px;">
                                    <v-icon dark right class="ma-2" >mdi-calendar</v-icon> {{ item.note }}</v-btn>
                                </tr>
                            </template>
                        </v-simple-table>
                        </span>
                        <span v-if="item.priority=='Tidak Penting'">
                            <v-simple-table style="background-color:blue">
                             <template v-slot:default>
                                <tr ><v-btn  color="blue" dark disable style="border-radius: 25px; margin: 10px;">
                                    <v-icon dark right class="ma-2" >mdi-fire</v-icon> {{ item.priority }}</v-btn>
                                </tr>
                                <tr ><v-btn  color="yellow" dark disable style="border-radius: 25px; margin: 10px;">
                                    <v-icon dark right class="ma-2" >mdi-calendar</v-icon> {{ item.note }}</v-btn>
                                </tr>
                            </template>
                        </v-simple-table>
                        </span>
                        
                    </td>
                </template>

                      
            </v-data-table>
        </v-card>
        <!-- TGS -->
        <v-card>
            
        </v-card>
        <v-dialog v-model="conf" persistent max-width="350px">
            <v-card>
                <v-card-title>
                    <span class="headline">Are You Sure to Delete?</span>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="conf=false"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItem(item)"> Delete </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Form Todo List </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="formTodo.task"
                            label="Task"
                            required></v-text-field>
                        <v-select
                            v-model="formTodo.priority"
                            :items="[`Penting`, `Biasa`, `Tidak Penting`]"
                            label="Priority"
                            required></v-select>
                        <v-textarea
                            v-model="formTodo.note"
                            label="Note"
                            required></v-textarea>
                        <v-select
                            v-model="formTodo.status"
                            :items="[`Selesai`, `Belum Selesai`]"
                            label="Status"
                            required></v-select>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogs" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Form Todo List </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="formTodo.task"
                            label="Task"
                            required></v-text-field>
                        <v-select
                            v-model="formTodo.priority"
                            :items="[`Penting`, `Biasa`, `Tidak Penting`]"
                            label="Priority"
                            required></v-select>
                        <v-textarea
                            v-model="formTodo.note"
                            label="Note"
                            required></v-textarea>
                        <v-select
                            v-model="formTodo.status"
                            :items="[`Selesai`, `Belum Selesai`]"
                            label="Status"
                            required></v-select>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogs=false"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="update"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
export default{
    name: "ListItem",
    data(){
        return{
            search: null,
            dialog: false,
            dialogs: false,
            notes:false,
            conf:false,
            headers: [
                {
                    text: "Task",
                    value: "task", 
                    align: "start",
                    sortable: "true",
                },
                {text: "Priority", value: "priority"},
                {text: "Status", value: "status"},
                {text: "Actions", value: "actions"},
            ],
            todos: [
                {
                    task: "Coding",
                    priority: "Penting",
                    note: "Code for your life",
                    status: "Belum Selesai",
                },
                {
                    task: "Cooking",
                    priority: "Biasa",
                    note: "Indomie saat begadang ngerjain coding terbaek",
                    status: "Selesai",
                },
                {
                    task: "Gaming",
                    priority: "Tidak Penting",
                    note: "Wasting time",
                    status: "Belum Selesai",
                },
            ],
            formTodo:{
                task: null,
                priority: null,
                note: null,
                status: null,
            },
        };
    },
    methods: {
        save(){
            this.todos.push(this.formTodo);
            this.resetForm();
            this.dialog = false;
        },
        update(){
            this.todos[this.index].task = this.formTodo.task;
            this.todos[this.index].priority = this.formTodo.priority;
            this.todos[this.index].note = this.formTodo.note;
            this.todos[this.index].status = this.formTodo.status;
            this.dialogs = false;
        },
        cancel(){
            this.resetForm();
            this.dialog = false;
        },
        editItem: function(event){
            
            this.index = this.todos.indexOf(event);
            this.item = this.todos[this.index];
            this.formTodo.task = this.item.task;
            this.formTodo.priority = this.item.priority;
            this.formTodo.note = this.item.note;
            this.formTodo.status = this.item.status;
            this.dialogs = true; 
        },
        deleteItem: function(event){
                this.todos.splice(this.todos.indexOf(event),1); 
                this.conf = false;  
        },
        resetForm(){
            this.formTodo = {
                task: null,
                priority: null,
                note: null,
                status: null,
            };
        },
    },
};
</script>

<style>
    .text{
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        font-size: 40px;
        font-style: italic;
    }
</style>