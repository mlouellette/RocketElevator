$( document ).ready(function() {
    
    hideAll();
    initListeners();
    
    // Percentage and unit price global variables
    let per = 0;
    intPrice = [7565.00, 12345.00, 15400.00];
    

    // Department selector
    $("#select").change( function() {
        
        hideAll();

        // resets input fields when selector changes
        $('input[type="number"]').val(0);
        
        // SwitchCase display appropriate input fields and calculation functions
        switch($(this).val()) {
            case "Residential":
                $(".residential").show();
                $(".radioSelect").show();
                $("#appartment, #floor").on('input', function () {
                    calculateResidential();
                
                });
                break;          
            case "Commercial":
                $(".commercial").show();
                $(".radioSelect").show();
                $("#comCage").on('input', function () {
                    calculateCommercial();

                });
                break;
            case "Corporate":
                $(".corporate").show();
                $(".radioSelect").show();
                $("#floor, #occPerFloor, #basement").on('input', function (){
                    calculateCorpoHybrid();
                
                });
                break;
            case "Hybrid":
                $(".hybrid").show();
                $(".radioSelect").show();
                $("#floor, #occPerFloor, #basement").on('input', function (){
                    calculateCorpoHybrid();
                
                });
                break;
            
        };


    });

    // function hides the HTML element that we don't need
    function hideAll() {
        
        $(".displayFields").hide();
        $(".all").hide();
        $(".radioSelect").hide();
        
    };

    // Init Listener function to update ReadOnly fields on input 
    function initListeners() {
        $("#inputFields, #amountEle").on('input', function () {
            

        });
    };

    // Calculations for the commercial part
    function calculateCommercial() {
        var getValue= parseInt($('#comCage').val());
        $('#amountEle').val(getValue);

        var unitPrice = dollarStringToFloat($("#amountUni").val());

        var totalPrice = unitPrice * getValue;
        $("#amountTot").val(format(totalPrice));

        var installationFees = (totalPrice * per) / 100;
        $('#amountIns').val(format(installationFees));

        var finalPrice = totalPrice + installationFees;
        $('#amountFin').val(format(finalPrice));

    };

    // Calculations for the Corporate and Hybrid part
    function calculateCorpoHybrid() {
        var occPerFloor = parseInt($("#occPerFloor").val());
        var floor = parseInt($('input[name="floor"]').val());
        var basement = parseInt($("#basement").val());      
            
        var occupants = (basement + floor) * occPerFloor;
        var elevatorRequired = Math.floor(parseFloat(occupants) / 1000);

        var columnsRequired = Math.ceil((parseInt(basement) + parseInt(floor)) / 20);

        var elevatorPerColumn = Math.ceil(elevatorRequired / columnsRequired);

        var totalNumOfElevators = Math.ceil(parseInt(elevatorPerColumn) * parseInt(columnsRequired));
        $("input[name=amountEle]").val(totalNumOfElevators);

        var unitPrice = dollarStringToFloat($("#amountUni").val());

        var totalPrice = unitPrice * totalNumOfElevators
        $("#amountTot").val(format(totalPrice));

        var installationFees = (totalPrice * per) / 100;
        $('#amountIns').val(format(installationFees));

        var finalPrice = totalPrice + installationFees;
        $('#amountFin').val(format(finalPrice));

        };

    function calculateResidential() {
        var getValue = $("#appartment").val();
        var floor = $('input[name="floor"]').val();
        var appFloor = Math.ceil((getValue / (floor * 6)));
        var column = Math.ceil(floor / 20);
        var numResEle = appFloor * column;
        
        $("#amountEle").val(numResEle);

        var unitPrice = dollarStringToFloat($("#amountUni").val());

        var totalPrice = unitPrice * numResEle;
        $("#amountTot").val(format(totalPrice));

        var installationFees = (totalPrice * per) / 100;
        $('#amountIns').val(format(installationFees));

        var finalPrice = totalPrice + installationFees;
        $('#amountFin').val(format(finalPrice));
            
        };

    // Radio Selector function to display Unit price of each elevator
    $('.radioSelect').on('change', function(){
        selected_value = $("input[name='productLine']:checked").val();
        $('input[type="text"]').val(0);
        

        switch(selected_value) {
            case "Standard":
                $(".displayFields").show();
                per = 10
                $("#amountUni").val(format(intPrice[0]));
                break;
            case "Premium":
                $(".displayFields").show();
                per = 13
                $("#amountUni").val(format(intPrice[1]));
                break;
            case "Excelium":
                $(".displayFields").show();
                per = 16 
                $("#amountUni").val(format(intPrice[2]));
                break;
                
        };
    });

    // Replace Dollar formatted strings back to float
    function dollarStringToFloat(value) {
        var newStr = value.slice(1, value.length)
        newStr = newStr.replace(/,/g, '');
        return parseFloat(newStr);
        
    };
     
    // Format my number values in USD
    function format(num) {
        let formatting_options = {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
         };

       return num.toLocaleString('en-US',
        formatting_options);

    };

    });



