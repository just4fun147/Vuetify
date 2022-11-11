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
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-combobox
                        v-model="select"
                        :items="combo"
                        label="Search"
                        single
                        outlined
                        dense
                    ></v-combobox>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-btn color="success" dark @click="dialog =true"> Tambah </v-btn>

                    
            </v-card-title>
        </v-card>
        <v-card>
          
            <v-data-table 
                      v-model="selected"
                      :headers="headers"
                      :items="todos"
                      :search="filter"
                      item-key="task"
                      :single-expand="singleExpand"
                      :single-select="singleSelect"
                      :expanded.sync="expanded"
                      show-expand
                      show-select
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
                    <span v-else-if="item.priority=='Tidak'">
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
                        <span v-if="item.priority=='Tidak'">
                            <v-simple-table style="background-color:blue">
                             <template v-slot:default>
                                <tr ><v-btn  color="blue" dark disable style="border-radius: 25px; margin: 10px;">
                                    <v-icon dark right class="ma-2" >mdi-fire</v-icon> TIDAK PENTING</v-btn>
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
        <v-card>
            <span v-if="selected.length">
                <v-header>
                    <h2 style="margin-left:10px">Delete Multiple</h2>
                </v-header>
                <span v-for="(list,index) in selected" :key="index">        
                    <ul>
                        <li style="margin-left:10px"><p>{{ list.task }}</p></li>
                    </ul>
                </span>
                
                <v-footer>
                        <v-btn color="red" @click="deleteAllItem()">HAPUS SEMUA</v-btn>
                        
                </v-footer>
            </span>
                
               
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
            select:'',
            combo:[
                "All","Penting","Tidak Penting"
            ],
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
                    priority: "Tidak",
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
            selected:[
            ],
        };
    },
    computed:{
        filter(){
            if(this.select=="Penting"){
                return "Penting"
            }
            if(this.select=="All"){
                return ""
            }
            if(this.select=="Tidak Penting"){
                return "Tidak"
            }
            return "";
        }
    },
    methods: {
        save(){
            this.temp1=this.todos.task;
            if(this.formTodo.priority=="Tidak Penting"){
                this.formTodo.priority="Tidak";
            }
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
        deleteAllItem(){
            this.temp = this.selected.length;
            this.temp2 = this.selected.length;
            if(this.todos.length==this.selected.length){
                
                this.todos=[];
                
                
            }else{
                while(this.temp!=0){    
                    for(var j =0;j<this.temp2;j++){
                        for(var i = 0; i<=this.todos.length;i++){
                            if(this.selected[j]==this.todos[i]){
                                this.todos.splice(i,1);
                                this.temp--;
                            }
                        }
                        }
                    }

            }
            this.selected=[];
            
        },
        resetForm(){
            this.formTodo = {
                task: null,
                priority: null,
                note: null,
                status: null,
            };
        },
        inputSelect:function(event){
            this.listSelected.task(event.task)
        }
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