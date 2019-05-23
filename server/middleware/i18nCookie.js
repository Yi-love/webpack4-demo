/*多语言设置
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
exports.i18nCookie = async(ctx , next)=>{
    let locale = ctx.cookies.get('locale');
    if ( locale ){
        return await next();
    }
    ctx.cookies.set('locale' , ctx.getLang() ,{path: '/'});
    return await next();
};