/* let divThree = document.getElementById("three")
let divFour = document.getElementById("four")
let divFive = document.getElementById("five")
let divSix = document.getElementById("six")
let addrows = document.getElementById("add-btn")
const limitm = document.getElementById("limitm")

divThree.style.display = "none"
divFour.style.display = "none"
divFive.style.display = "none"
divSix.style.display = "none"

function add() {
    if (divThree.style.display == "none") {
        divThree.style.display = "flex";
        console.log("3rd row added")
    } else if (divFour.style.display == "none"){
        divFour.style.display = "flex";
        console.log("4th row added")
    } else if (divFive.style.display == "none"){
        divFive.style.display = "flex";
        console.log("5th row added")
    } else if (divSix.style.display == "none"){
        divSix.style.display = "flex";
        console.log("6th row added")
    } else {
        limitm.innerText = "Maximum limit reached!"
    }
};

let foodThree = document.getElementById("food-row3")
let foodFour = document.getElementById("food-row4")
let foodFive = document.getElementById("food-row5")
let foodSix = document.getElementById("food-row6")
let addfoodrows = document.getElementById("add-food-rows")
const limitfoodm = document.getElementById("limitfood")

foodThree.style.display = "none"
foodFour.style.display = "none"
foodFive.style.display = "none"
foodSix.style.display = "none"

function addFoodRow() {
    if (foodThree.style.display == "none") {
        foodThree.style.display = "flex";
        console.log("3rd row added")
    } else if (foodFour.style.display == "none"){
        foodFour.style.display = "flex";
        console.log("4th row added")
    } else if (foodFive.style.display == "none"){
        foodFive.style.display = "flex";
        console.log("5th row added")
    } else if (foodSix.style.display == "none"){
        foodSix.style.display = "flex";
        console.log("6th row added")
    } else {
        limitfoodm.innerText = "Maximum limit reached!"
    }
};


//Gather all inputs from physical activity
let phys1 = document.getElementById("physical-act")
let phys2 = document.getElementById("physical-act2")
let phys3 = document.getElementById("physical-act3")
let phys4 = document.getElementById("physical-act4")
let phys5 = document.getElementById("physical-act5")
let phys6 = document.getElementById("physical-act6")

//Gather all inputs from type of physical activity
let typep1 = document.getElementById("type-phys1")
let typep2 = document.getElementById("type-phys2")
let typep3 = document.getElementById("type-phys3")
let typep4 = document.getElementById("type-phys4")
let typep5 = document.getElementById("type-phys5")
let typep6 = document.getElementById("type-phys6")

//Gather all inputs from intensity
let intensity1 = document.getElementById("intensity1")
let intensity2 = document.getElementById("intensity2")
let intensity3 = document.getElementById("intensity3")
let intensity4 = document.getElementById("intensity4")
let intensity5 = document.getElementById("intensity5")
let intensity6 = document.getElementById("intensity6")

//Gathet all inputs from Duration
let duration1 = document.getElementById("duration1")
let duration2 = document.getElementById("duration2")
let duration3 = document.getElementById("duration3")
let duration4 = document.getElementById("duration4")
let duration5 = document.getElementById("duration5")
let duration6 = document.getElementById("duration6")

//Gather all inputs  from calories burned
let cb1 = document.getElementById("calorie-burned1")
let cb2 = document.getElementById("calorie-burned2")
let cb3 = document.getElementById("calorie-burned3")
let cb4 = document.getElementById("calorie-burned4")
let cb5 = document.getElementById("calorie-burned5")
let cb6 = document.getElementById("calorie-burned6")



function getAllInputs() {
    let arr = []; //COMBINE ALL INPUTS
    let row1info;
    let row2info;
    let row3info;
    let row4info;
    let row5info;
    let row6info;

    console.log("This is result of all inputs: ", arr)
 
    if (phys1.value.length > 0  && typep1.value.length > 0 && intensity1.value.length > 0 && duration1.value.length > 0 && cb1.value.length > 0) {
    row1info = {phys1: phys1.value, type1: typep1.value, intensity1: intensity1.value, duration: duration1.value, cburned1: cb1.value, image:"" }
    arr.push(row1info)
    } else {
        console.log("incomplete row 1")
    }


    if (phys2.value.length > 0  && typep2.value.length > 0 && intensity2.value.length > 0 && duration2.value.length > 0 && cb2.value.length > 0) {
        row2info = {phys2: phys2.value, type2: typep2.value, intensity2: intensity2.value, duration: duration2.value, cburned2: cb2.value, image:"" }
        arr.push(row2info)
    } else {
        console.log("incomplete row 2")
    }
    
    if (phys3.value.length > 0  && typep3.value.length > 0 && intensity3.value.length > 0 && duration3.value.length > 0 && cb3.value.length > 0) {
        row3info = {phys3: phys3.value, type3: typep3.value, intensity3: intensity3.value, duration: duration3.value, cburned3: cb3.value, image:"" }
        arr.push(row3info)
    } else  if (divThree.style.display == "none"){
        console.log("3rd row not yet added")
    }  else {
        console.log("incomplete row 3")
    }

    if (phys4.value.length > 0  && typep4.value.length > 0 && intensity4.value.length > 0 && duration4.value.length > 0 && cb4.value.length > 0) {
        row4info = {phys4: phys4.value, type4: typep4.value, intensity4: intensity4.value, duration: duration4.value, cburned4: cb4.value, image:"" }
        arr.push(row4info)
    } else  if (divFour.style.display == "none"){
        console.log("4th row not yet added")
    } else {
        console.log("incomplete row 4")
    }  

    if (phys5.value.length > 0  && typep5.value.length > 0 && intensity5.value.length > 0 && duration5.value.length > 0 && cb5.value.length > 0) {
        row5info = {phys5: phys5.value, type5: typep5.value, intensity5: intensity5.value, duration: duration5.value, cburned5: cb5.value, image:"" }
        arr.push(row5info)
    } else  if (divFive.style.display == "none"){
        console.log("5th row not yet added")
    } else {
        console.log("incomplete row 5")
    }  

    if (phys6.value.length > 0  && typep6.value.length > 0 && intensity6.value.length > 0 && duration6.value.length > 0 && cb6.value.length > 0) {
        row6info = {phys6: phys6.value, type6: typep6.value, intensity6: intensity6.value, duration: duration6.value, cburned6: cb6.value, image:"" }
        arr.push(row6info)
    } else  if (divSix.style.display == "none"){
        console.log("6th row not yet added")
    } else {
        console.log("incomplete row 6")
    }  

 






}
 */