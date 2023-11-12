//Cash in drawer problem on freecodecamp

//This is my solution. I have tried to make thing little cleaner & easy to understand.

function checkCashRegister(price, cash, cid) {
  const INSUFFICIENT_FUNDS = {status: "INSUFFICIENT_FUNDS", change: []}
  const CLOSED = {status: "CLOSED", change: cid}
  const OPEN = {status: "OPEN", change: []}
  let totalCid = cidTotal();
  let dueBlance = parseFloat((cash - price).toFixed(2));

  //if balance/change due is greater than total amount in cash drawer
  if(totalCid < dueBlance) {
    return INSUFFICIENT_FUNDS;
  }

  //if balance/change due is equal to total amount in cash drawer
  if(totalCid === dueBlance) {
    return CLOSED;
  }

  //cash types and their corresponding values in an array(2d) from highest to lowest value
  let cashTypes = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01],
  ];


  for(let i = 0; i < cashTypes.length; i++) {
    let cashType = cashTypes[i][0];
    let cashValue = cashTypes[i][1];
    let totalCash = cid.find(item => item[0] === cashType)[1];

    /*if due balance/change is greater than the cash type's value in cashTypes array and due balance is greater than amount 
    of that same cash type in the cash drawer*/
    if(dueBlance > cashValue && dueBlance > totalCash ) { // if due balance is bigger than available balance
      dueBlance -= totalCash;
      OPEN.change.push([cashType, totalCash]);

    /*if due balance is greater than cash type's value in cashTypes array but same cash type's amount in cash drawer 
    is greater than due balance/change */
    }else if(dueBlance > cashValue && totalCash > dueBlance) { // if there are more balance than due balance
      let pay = Math.floor(dueBlance / cashValue) * cashValue;
      dueBlance -= pay;
      dueBlance = parseFloat(dueBlance.toFixed(2));
      OPEN.change.push([cashType, pay]);
    }
  }
  //This code executes when total due balance is not possible to get from cash drawer
  if(dueBlance > 0) {
    return INSUFFICIENT_FUNDS;
  }
  //Returns total due balance/change as cash types and their respective amounts in an object
  return OPEN;

  function cidTotal() {
    return parseFloat(cid.reduce((a,b) => a + b[1], 0).toFixed(2));
  }
}
