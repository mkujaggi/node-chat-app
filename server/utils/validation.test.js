const expect=require('expect');
const {isRealString}=require('./validation');

describe('isRealString Validation',()=>{
    it('should reject non-string values',()=>{
        var result=isRealString(09128312983);
        expect(result).toBe(false);
    });
    it('should reject string with only spaces',()=>{
        var result=isRealString('     ');
        expect(result).toBe(false);
    });
    it('should allow string with non-space values',()=>{
        var result=isRealString('test string');
        expect(result).toBe(true);
    });
});