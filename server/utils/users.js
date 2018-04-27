// [{
//     id:'',
//     name:'',
//     room:''
// }]

class Users{
    constructor (){
        this.users=[];
    }
    addUser (id,name,room){
        var user={id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser (id){
        var user=this.users.filter((user)=>user.id===id)[0];
        if(user){
            // var index=this.users.indexOf(user);
            // var removedUser=this.users.splice(index,1);
            this.users=this.users.filter((user)=>user.id!==id);
        }
        return user;
    }
    getUser(id){
        var users=this.users.filter((user)=>user.id===id)[0];
        return users
    }
    getUserList(room){
        var users=this.users.filter((user)=>{
            return user.room===room;
        });
        var namesArray=users.map((user)=>{
            return user.name;
        });
        return namesArray;
    }
}

module.exports={Users};
