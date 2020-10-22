// BUDGET CONTROLLER
var budgetController = (function() {

    // some code

})();


// UI CONTROLLER
var UIController = (function () {

    // html id strings, all in one object
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value, // + or -
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
            
        },
        // returns the DOMstrings object for access to other components
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function() {

        // 1. Get the filled input data
        var input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller

        //3. Add iten to the UI

        // 4. Calculate Budget

        // 5. Display the budget on the UI
        
    }
    
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);
