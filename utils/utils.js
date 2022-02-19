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

module.exports = {
    validateEmail
}