// const Cube = require('../src/app').Cube;
// const expect = require('chai').expect;

// describe('Testing the Cube Functions', function() {
//     it('1. The side length of the Cube', function(done) {
//         let c1 = new Cube(2);
//         expect(c1.getSideLength()).to.equal(2);
//         done();
//     });
    
//     it('2. The surface area of the Cube', function(done) {
//         let c2 = new Cube(5);
//         expect(c2.getSurfaceArea()).to.equal(150);
//         done();
//     });
    
//     it('3. The volume of the Cube', function(done) {
//         let c3 = new Cube(7);
//         expect(c3.getVolume()).to.equal(343);
//         done();
//     });
    
// });

const Basket = require('../src/app').Basket;
const Stock = require('../src/app').Stock;
const Item = require('../src/app').Item;
const expect = require('chai').expect;

// BASKET TESTS
describe('Testing basket methods', function() {
    let basket;

    beforeEach(() => {
        basket = new Basket();
    });

    describe('addItem()', function() {
        it('should add an item to the basket', function() {
            basket.addItem('Apple', 0.99);
            expect(basket.items).to.deep.include({ name: 'Apple', price: 0.99 });
        });

        it('should increase the item count in the basket', function() {
            basket.addItem('Apple', 0.99);
            basket.addItem('Banana', 1.49);
            expect(basket.items.length).to.equal(2);
        });
    });

    describe('calculateTotal()', function() {
        it('should calculate the total price of the basket', function() {
            basket.addItem('Apple', 0.99);
            basket.addItem('Banana', 1.49);
            expect(basket.calculateTotal()).to.equal(2.48);
        });

        it('should return 0 if the basket is empty', function() {
            expect(basket.calculateTotal()).to.equal(0);
        });
    });

    describe('removeItem()', function() {
        it('should remove an item from the basket', function() {
            basket.addItem('Apple', 0.99);
            basket.removeItem('Apple');
            expect(basket.items).to.not.deep.include({ name: 'Apple', price: 0.99 });
        });

        it('should decrease the item count in the basket', function() {
            basket.addItem('Apple', 0.99);
            basket.addItem('Banana', 1.49);
            basket.removeItem('Apple');
            expect(basket.items.length).to.equal(1);
        });
    });

    describe('emptyBasket()', function() {
        it('should empty the basket', function() {
            basket.addItem('Apple', 0.99);
            basket.emptyBasket();
            expect(basket.items).to.be.empty;
        });

        it('should reset the item count to 0', function() {
            basket.addItem('Apple', 0.99);
            basket.addItem('Banana', 1.49);
            basket.emptyBasket();
            expect(basket.items.length).to.equal(0);
        });
    });
});

// DISCOUNT TESTS
describe('testing basket with Discounts', function() {
    let basket;

    beforeEach(() => {
        basket = new Basket();
    });

    describe('addItem()', function() {
        it('should not allow items with a price less than or equal to 0', function() {
            expect(() => basket.addItem('Freebie', 0)).to.throw();
            expect(() => basket.addItem('Negative Price', -1)).to.throw();
        });
    });

    describe('applyDiscount()', function() {
        it('should not allow discounts less than or equal to 0%', function() {
            basket.addItem('Apple', 1.00);
            expect(() => basket.applyDiscount('INVALID', 0)).to.throw();
            expect(() => basket.applyDiscount('MOREINVALID', -10)).to.throw();
        });

        it('the amount of the price of an item after discount is proportionally less than the initial amount', function() {
            basket.addItem('Banana', 1.50);
            basket.applyDiscount('GOODDEAL', 10); // Apply 10% discount
            const total = basket.calculateTotal();
            expect(total).to.be.lessThan(1.50);
        });
    });

    describe('calculateTotal()', function() {
        it('should apply the discount correctly to the total price', function() {
            basket.addItem('Apple', 1.00);
            basket.addItem('Banana', 2.00);
            basket.applyDiscount('SUMMER21', 25); // Apply a 25% discount
            const total = basket.calculateTotal();
            const expectedTotal = (1.00 + 2.00) * 0.75; // 25% discount
            expect(total).to.equal(expectedTotal);
        });

        it('the discount can only be applied once', function() {
            basket.addItem('Apple', 1.00);
            basket.applyDiscount('ONEOFF', 10); // Apply 10% discount
            let total = basket.calculateTotal();
            expect(total).to.be.lessThan(1.00);
            // Try to apply another discount and calculate again
            basket.applyDiscount('ANOTHERONE', 10); // This should not work
            total = basket.calculateTotal();
            // The total should not change because the discount can only be applied once
            expect(total).to.equal(0.9);
        });
    });
});

// //STOCK TESTS
// describe('Testing stock methods', function() {
//     it ('should add an item to the stock', function() {
//         let stock = new Stock();
//         stock.addItem('Apple', 2023);
//         expect(stock.items).to.deep.include({ name: 'Apple' });
//     });
//     it ('should remove an item from the stock', function() {
//         let stock = new Stock();
//         stock.addItem('Apple', 2023);
//         stock.removeItem('Apple');
//         expect(stock.items).to.not.deep.include({ name: 'Apple' });
//     });
//     it ('stock after removing an item should be less than stock before removing an item', function() {
//         let stock = new Stock();
//         stock.addItem('Apple', 2023);
//         stock.removeItem('Apple');
//         expect(stock.items.length).to.be.lessThan(1);
//     });
//     it ('stock should not be negative', function() {
//         let stock = new Stock();
//         stock.addItem('Apple', 2023);
//         stock.removeItem('Apple');
//         expect(stock.items.length).to.be.greaterThan(-1);
//     });
//     it ('item should not be expired', function() {
//         let stock = new Stock();
//         item = stock.addItem('Apple', 2023);
//         expect(stock.item.expirationDate).to.be.greaterThan(2024);
//     });
// });

// COUPON TESTS
describe('coupons tests', function() {
    let item;

    beforeEach(() => {
        item = new Item();
    });

    it ('coupon should be applied', function() {
        let endPrice = item.applyCoupon(25, 10);
        expect(endPrice).to.equal(15);
    })
});
