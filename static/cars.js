window.addEventListener("load", main);


// Car Class
class Car {
    constructor(type, colors, description, price, carImages) {
        this.type = type;
        this.colors = colors;
        this.description = description;
        this.price = price;
        this.carImages = carImages;
    }
}

// Creating Cars and returning array of 3 default car objects and 1 base chosen car object which can be modified
function createCars() {
    let ferrariColors = ["Red", "White", "Yellow"];
    let lamboColors = ["Blue", "Green", "Yellow"];
    let mustangColors = ["Black", "Silver", "White"];

    let ferrariDescription = "Indulge in Ferrari's blend of Italian craftsmanship, cutting-edge technology, and exhilarating performance, setting the standard for automotive excellence and unforgettable driving experiences.";
    let lamboDescription = "Unleash exhilaration with the Lamborghini, where precision engineering meets raw power in a symphony of speed and luxury. Experience the thrill of automotive mastery.";
    let mustangDescription = "Feel the pulse of American muscle with the iconic Mustang, where timeless design meets relentless performance. Command the road with legendary power and unrivaled heritage.";

    let ferrariImages = ["./static/images/ferrari_red.png", "./static/images/ferrari_white.png", "./static/images/ferrari_yellow.png"];
    let lamboImages = ["./static/images/lambo_blue.jpeg", "./static/images/lambo_green.jpeg", "./static/images/lambo_yellow.jpeg"];
    let mustangImages = ["./static/images/mustang_black.png", "./static/images/mustang_silver.png", "./static/images/mustang_white.png"];

    ferrari = new Car("Ferrari", ferrariColors, ferrariDescription, 200000, ferrariImages);
    lamborghini = new Car("Lamborghini", lamboColors, lamboDescription, 215000, lamboImages);
    mustang = new Car("Mustang", mustangColors, mustangDescription, 175000, mustangImages);
    chosen_car = new Car("Ferrari", ferrariColors, ferrariDescription, 200000, ferrariImages);

    let car_list = [ferrari, lamborghini, mustang, chosen_car];
    return car_list;

}


// Main Driver Function
function main() {
    car_list = createCars();
    get_dom_references();
    set_chosen_car(car_list[0].type);
    add_event_listeners();
}

// Getting DOM References 
function get_dom_references() {
    car_type_reference = document.getElementById("car_type");
    car_color_reference = document.getElementById("car_color");
    no_insurance_reference = document.getElementById("no_insurance");
    three_year_insurance_reference = document.getElementById("three_year_insurance");
    car_image_reference = document.getElementById("car_image");
    car_description_reference = document.getElementById("description");
}

// Adding Event Listeners
function add_event_listeners() {
    car_type_reference.addEventListener("change", update_screen);
    car_color_reference.addEventListener("change", update_car_image);
    no_insurance_reference.addEventListener("change", update_sale_description);
    three_year_insurance_reference.addEventListener("change", update_sale_description);

}

// Updating entire screen to show default car layout when a new car type is chosen
function set_chosen_car(car_selection) {
    for (let car of car_list){
        if(car_selection==car.type.toLowerCase()){
            car_image_reference.setAttribute("src", car.carImages[0]);
            car_color_reference.innerHTML = "";
            car_description_reference.innerHTML = "";
            for(let color of car.colors){
                let color_option = document.createElement("option");
                color_option.value = color.toLowerCase();
                color_option.textContent = color;
                car_color_reference.appendChild(color_option);
            }
            car_description_reference.textContent = `Car: ${car.type} \nDescription: ${car.description}\nSelected color: ${car.colors[0].toLowerCase()} \nBasic Price: ${(car.price*.3).toLocaleString()}`;
            car_list[3] = car;
            three_year_insurance_reference.checked = true;
            break;
        }
    } 

}

// Updating Car image and description when a new color is selected 
function update_car_image() {
    let car_color = car_color_reference.value;
    for(let i = 0; i < car_list[3].colors.length; i++){
        if(car_list[3].colors[i].toLowerCase()==car_color){
            car_image_reference.setAttribute("src", car_list[3].carImages[i]);
            let cost;
            if(no_insurance_reference.checked){
                cost = car_list[3].price;
            }
            else cost = car_list[3].price*.3;
            car_description_reference.textContent = `Car: ${car_list[3].type} \nDescription: ${car_list[3].description}\nSelected color: ${car_list[3].colors[i].toLowerCase()} \nBasic Price: ${(cost).toLocaleString()}`;
        }
    }
}

// Function to get selected car type and update screen
function update_screen() {
    let car_selection = car_type_reference.value;
    set_chosen_car(car_selection);
}

// Function to update price in description based on selected insurance plan
function update_sale_description() {
    if(no_insurance_reference.checked){
        car_description_reference.textContent = `Car: ${car_list[3].type} \nDescription: ${car_list[3].description}\nSelected color: ${car_color_reference.value} \nBasic Price: ${(car_list[3].price).toLocaleString()}`;

    }

    else if(three_year_insurance_reference.checked){
        car_description_reference.textContent = `Car: ${car_list[3].type} \nDescription: ${car_list[3].description}\nSelected color: ${car_color_reference.value} \nBasic Price: ${(car_list[3].price*.3).toLocaleString()}`;

    }

}