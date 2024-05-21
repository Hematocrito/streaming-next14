import * as pathToRegexp from 'path-to-regexp';
/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(array, id, parentId, children) {
    if (id === void 0) { id = 'id'; }
    if (parentId === void 0) { parentId = 'pid'; }
    if (children === void 0) { children = 'children'; }
}
/**
 * Whether the path matches the regexp if the language prefix is ignored, https:// github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
export function pathMatchRegexp(regexp, pathname) {
    return pathToRegexp.pathToRegexp(regexp).exec(pathname);
}
/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryAncestors(array, current, parentId, id) {
    if (id === void 0) { id = 'id'; }
    var result = [current];
    var hashMap = new Map();
    array.forEach(function (item) { return hashMap.set(item[id], item); });
    var getPath = function (currentPath) {
        var currentParentId = hashMap.get(currentPath[id])[parentId];
        if (currentParentId) {
            result.push(hashMap.get(currentParentId));
            getPath(hashMap.get(currentParentId));
        }
    };
    getPath(current);
    return result;
}
export function getResponseError(data) {
    if (!data) {
        return '';
    }
    if (typeof data === 'string') {
        return data;
    }
    if (Array.isArray(data.message)) {
        var item = data.message[0];
        if (!item.constraints) {
            return item || data.error || 'Bad request!';
        }
        return Object.values(item.constraints)[0];
    }
    //  TODO - parse for langauge or others
    return typeof data.message === 'string' ? data.message : 'Bad request!';
}
