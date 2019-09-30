/* 多语言设置
 *
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
exports.i18nCookie = async (ctx, next) => {
    const locale = ctx.cookies.get('locale');
    if (!locale) {
        ctx.cookies.set('locale', ctx.getLang(), { path: '/' });
    }

    return next();
};
