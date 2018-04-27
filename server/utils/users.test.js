const expect=require('expect');

const {Users}=require('./users');

describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users=new Users();
        users.users=[{
            id:'1',
            name:'Mukul',
            room:'Node'
        },{
            id:'2',
            name:'Tan',
            room:'Node'
        },{
            id:'3',
            name:'Yas',
            room:'React'
        }];
    });
    it('should add new User.',()=>{
        var users=new Users();
        var user={
            id:'123',
            name:'Mukul',
            room:'office'
        };
        var res=users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });
    it('should remove a User',()=>{
        var userList=users.removeUser('1');
        expect(users.users).toEqual([{
            id:'2',
            name:'Tan',
            room:'Node'
        },{
            id:'3',
            name:'Yas',
            room:'React'
        }]);
        expect(userList).toEqual({
            id:'1',
            name:'Mukul',
            room:'Node'
        });
    });
    it('should not remove user',()=>{
        var userList=users.removeUser('4');
        expect(users.users).toEqual([{
            id:'1',
            name:'Mukul',
            room:'Node'
        },{
            id:'2',
            name:'Tan',
            room:'Node'
        },{
            id:'3',
            name:'Yas',
            room:'React'
        }]);
    });
    it('should find user',()=>{
        var userSearch=users.getUser('2');
        expect(userSearch).toEqual({
            id:'2',
            name:'Tan',
            room:'Node'
        });
    });
    it('should not find a user',()=>{
        var userSearch=users.getUser('4');
        expect(userSearch).toBeFalsy();
    });
    it('should return names for node course',()=>{
        var userList=users.getUserList('Node');
        expect(userList).toEqual(['Mukul','Tan']);
    });
    it('should return names for react course',()=>{
        var userList=users.getUserList('React');
        expect(userList).toEqual(['Yas']);
    });
})