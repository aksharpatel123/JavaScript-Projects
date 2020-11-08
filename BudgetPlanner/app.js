// BUDGET CONTROLLER
var budgetController = (function() {

    // Constructors to add expense & Value.
    // these will be inherited by other objects as needed.
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Structure to store data
    var data = {
        allItems: {
            exp: [], // array of objects, filled in addItem
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    // Public methods in return
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // ID = prevID + 1
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else {
                ID = 0;
            }

            // newItem object will be filled everytime addItem is called.
            if (type === 'exp') {
                newItem = new Expense(ID, des, val); 
            }
            else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // push in in our data str.
            data.allItems[type].push(newItem);
            return newItem;
            
        },

        testing: function() {
            console.log(data);
        }
    };

})();



// UI CONTROLLER
var UIController = (function () {

    // html id strings, all in one object
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'

    }

    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value, // + or -
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
            
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';

            }
            else if (type === 'exp') {
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }
            

            // Replace placeholder with real data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert HTML into DOM. beforeend is location of where newhtml code will be added.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // Clears the text input after hitting enter
        clearFields: function() {
            var fields, fieldsArr;

            // css style format ', '
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            // A list is returned, we need to convert it into array

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        // returns the DOMstrings object for access to other components
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function() {

        // 1. Calculate Budget

        // 2. Return the budget

        // 3. Display the budget on the UI
    };

    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the filled input data
        input = UICtrl.getInput();

        // Proceed only if the input is valid
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add iten to the UI 
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

        }
        
    };

    // setupEventListeners will not get executed, needs to be called.
    // Init to call that function.
    return {
        init: function() {
            console.log('App has started.');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init(); // Starter
