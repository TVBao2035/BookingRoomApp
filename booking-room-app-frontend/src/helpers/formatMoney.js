export const formatMoneyStyle1 = (currentMoney) => {
    let money = String(currentMoney);
    let newMoney= '';
    let count = 0;
    for(let i=money.length -1; i >= 0; i--){
        newMoney = money[i] + newMoney;
        count++;
        if(count===3 && i !== 0 ){
            newMoney = "." + newMoney;
            count = 0;
        }
    }

    return newMoney;
}