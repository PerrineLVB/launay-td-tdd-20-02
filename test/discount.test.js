const expect = require('chai').expect;
const Basket = require('../src/basket.js');

describe('Basket Class with Discounts', function() {
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

    describe ('coupons tests', function() {
        it ('should apply coupon to item price', function(){
            basket.addItem('Apple', 10);
            basket.applyCoupon('SPRING24', 2);
            expect(basket.calculateTotal()).to.equal(8);
        });
        it ('discounted item price should not be less than 0', function(){
            basket.addItem('Apple', 2);
            basket.applyCoupon('SPRING24', 10);
            expect(basket.calculateTotal())>=0;
        });
        it ('coupon should exist', function(){
            basket.addItem('Apple', 10);
            expect(basket.applyCoupon(coupon)).to.equal(8);
        })
    });
});
