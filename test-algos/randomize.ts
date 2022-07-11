
 const random = (min: number = 0, max: number = -1, isInteger: boolean = true): number => {
    let randomNumber = 0;
    
    if(max === -1){
        randomNumber = Math.random() * 1000
    }else{
        randomNumber = Math.random() * (max - min+1) + min
    }
    
    if(isInteger){
        randomNumber = Math.floor(randomNumber)
    }

    return randomNumber;
}

 const randomizeAndPull = (options: string[] | number[]): string | number => {
    const max = options.length;
    const index = random(0, max-1);
    return options[index];
}

 const randomize = (options: string[]): string[] => {
    let currentIndex = options.length;
    let randomIndex: number;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [options[currentIndex], options[randomIndex]] = [options[randomIndex], options[currentIndex]]
    }

    return options;
}