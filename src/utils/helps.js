function capitalizeFirstLetter(string) {
    let Expried = string.toLowerCase();
    Expried = Expried.charAt(0).toUpperCase() + Expried.slice(1);
    return Expried
  
}

export {
    capitalizeFirstLetter
}