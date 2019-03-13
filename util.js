const isArrayIncludeAny = (srcArr, checkItems) => {
    for(let i=0; i< checkItems.length; i++) {
        if (srcArr.includes(checkItems[i])) {
            return true;
        }
    }

    return false;
}