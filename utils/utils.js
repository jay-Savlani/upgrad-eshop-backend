/**
 * 
 * @param {String} email  
 * @returns {Boolean} - returns boolean indicating whether email is valid or not
 */



const validateEmail = (email) => {
    let splitAt = email.split("@");
    let part1 = splitAt[0];
    let afterAt = splitAt[1];
    let splitAtDot = afterAt.split(".");
    let part2 = splitAtDot[0];
    let part3 = splitAtDot[1];
   
    let part1AndPart2Regex = new RegExp(/^([A-Za-z0-9]|_|\.|-){1,}$/);
    let part3Regex = new RegExp(/^[a-z]{2,6}$/);
    
    return part1.length >= 1 && part2.length >=1 && part3.length >= 2 && part3.length <= 6 
            && part1AndPart2Regex.test(part1) && part1AndPart2Regex.test(part2) && part3Regex.test(part3);
}

/**
 * 
 * @param {String} direction 
 * @param {String} sortBy 
 * @returns - sort criteria object for querying purposes
 */

const buildProductSortCriteria = (direction, sortBy) => {

    const mapSort = {
        asc: 1,
        desc: -1,
    };

    let sortCriteria = {};
    
    if(!direction && !sortBy) {
        sortCriteria = {product_id: mapSort["desc"]};
    }
    else if(direction && !sortBy){
        sortCriteria = {product_id: mapSort[direction]};
    }
    else if(!direction && sortBy) {

        sortCriteria = {[sortBy]: mapSort["desc"]};
    }
    else{

        sortCriteria = {[sortBy]: mapSort[direction]};
    }
    return sortCriteria;
}

const buildFindProductFilter = (name, category) => {
    let filter = {};

    if(name) filter.name = name;
    if(category) filter.category = category;

    return filter;
}

module.exports = {
    validateEmail, buildProductSortCriteria, buildFindProductFilter
}