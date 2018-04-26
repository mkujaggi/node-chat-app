const expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from='Mukul';
        var text='Some message';
        var message=generateMessage(from,text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });
    });
});
describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        var from='Testing';
        var lat=2;
        var lon=3;
        var result=generateLocationMessage(from,lat,lon);
        expect(typeof result.createdAt).toBe('number');
        expect(result).toMatchObject({
            from,
            url:`https://www.google.com/maps?q=${lat},${lon}`
        });
    });
});