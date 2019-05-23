/**
 *获取语言
 *
 * @param {*} ctx
 * @returns
 */
async function getWEBLang(ctx){
    let lang = ctx.cookies.get('locale');
    console.log('lang--------------->' , lang);
    if ( !lang ){
        lang = ['cn' , 'en'][Math.floor(Math.random() * 10) % 2];
    }
    return ()=>{
        return lang;   
    };
}
/**
 *
 *
 * @param {*} ctx
 * @param {*} next
 */
exports.baseContext = async(ctx, next)=>{
    //获取语言
    ctx.getLang = await getWEBLang(ctx);
    await next();
};