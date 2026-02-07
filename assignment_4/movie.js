
function createMovie(movieId, name, ticketPrice) {
    return {
        movieId: movieId,
        name: name,
        ticketPrice: ticketPrice
    };
}


function createUser(userId, name, userType) {
    return {
        userId: userId,
        name: name,
        userType: userType 
    };
}


function bookMovies(user, movies) {
    return {
        user: user,
        movies: movies
    };
}


function calculateTotalPrice(booking) {
    let total = 0;

    for (let i = 0; i < booking.movies.length; i++) {
        total = total + booking.movies[i].ticketPrice;
    }

    return total;
}

function applyDiscount(totalPrice, userType) {
    let discount = 0;

    if (userType === "Standard") {
        discount = totalPrice * 0.05;
    } else if (userType === "VIP") {
        discount = totalPrice * 0.12; 
    }

    return totalPrice - discount;
}



let movie1 = createMovie(1, "Avengers", 200);
let movie2 = createMovie(2, "Inception", 250);
let movie3 = createMovie(3, "Interstellar", 300);

let user1 = createUser(101, "Aditi", "VIP");

let booking1 = bookMovies(user1, [movie1, movie2, movie3]);


let totalPrice = calculateTotalPrice(booking1);

let finalPrice = applyDiscount(totalPrice, user1.userType);

console.log("User Name:", booking1.user.name);
console.log("User Type:", booking1.user.userType);
console.log("Total Price:", totalPrice);
console.log("Final Price after Discount:", finalPrice);