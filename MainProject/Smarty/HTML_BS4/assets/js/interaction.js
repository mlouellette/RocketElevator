$( document ).ready(function() {

    hideAll();
    initListeners();

    // Percentage and unit price global variables
    let per = 0;
    intPrice = [7565.00, 12345.00, 15400.00]

    // Department selector
    $("#select").change(function() {

        hideAll();

        // resets input fields when selector changes
        $('input[type="number"]').val('');
        
        // SwitchCase display appropriate input fields and calculation functions
        switch($(this).val()) {
            case "Residential":
                $(".residential").show();
                $("#appartment, #floor").on('input', function () {
                    calculateResidential()
                
                });
                break;          
            case "Commercial":
                $(".commercial").show();
                $("#comCage").on('input', function () {
                    calculateCommercial()

                });
                break;
            case "Corporate":
                $(".corporate").show();
                $("#floor, #occPerFloor, #basement").on('input', function (){
                    calculateCorpoHybrid()
                
                });
                break;
            case "Hybrid":
                $(".hybrid").show();
                $("#floor, #occPerFloor, #basement").on('input', function (){
                    
                
                });
                break;
            
        };

    });

    // function hides the HTML element that we don't need
    function hideAll() {
        $(".allInput").hide();
        $(".all").hide();
        
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
        console.log(occPerFloor);

        var floor = parseInt($('input[name="floor"]').val());
        console.log(floor);

        var basement = parseInt($("#basement").val());
        console.log(basement);

        var totalNumOfElevators;
        if(floor <= 0 || isNaN(floor)) {
            return $('input[type="text"]').val('');
        } else {
            
            var occupants = (basement + floor) * occPerFloor;
            console.log(typeof occupants)
            console.log("occupants :" + occupants);
            var elevatorRequired = Math.floor(parseFloat(occupants) / 1000);
            console.log("elevatorReq " + elevatorRequired); // 22 works

            var columnsRequired = Math.ceil((parseInt(basement) + parseInt(floor)) / 20);
            console.log("columns Req " + columnsRequired);

            var elevatorPerColumn = Math.ceil(elevatorRequired / columnsRequired);
            console.log("elevatorPerColumn :" + elevatorPerColumn);

            var totalNumOfElevators = Math.ceil(parseInt(elevatorPerColumn) * parseInt(elevatorRequired));
            console.log("total num of elevator :" + totalNumOfElevators);

            // ERROR
            $("input[name=amountEle]").val(totalNumOfElevators);
            console.log(typeof $("input[name=amountEle]").val(totalNumOfElevators));
            console.log($("input[name=amountEle]").val(totalNumOfElevators));
            // ERROR

            var unitPrice = dollarStringToFloat($("#amountUni").val());
            var totalPrice = unitPrice * totalNumOfElevators
            $("#amountTot").val(format(totalPrice));

            var installationFees = (totalPrice * per) / 100;
            $('#amountIns').val(format(installationFees));
            
            var finalPrice = totalPrice + installationFees;
            $('#amountFin').val(format(finalPrice));

        };

    };
    // standard elevator cost 68,085.00
    // Calculations for the Residential part

    

    function calculateResidential() {
        var getValue = $("#appartment").val();
        var floor = $('input[name="floor"]').val();
        var numResEle;
        if(floor <= 0 || isNaN(floor)) {
            return $('input[type="text"]').val('');
        } else {
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

    }
    
    // Radio Selector function to display Unit price of each elevator
    $('.radioSelect').change(function(){
        selected_value = $("input[name='productLine']:checked").val();
        $('input[type="text"]').val('')
        $(".allInput").show();

        switch(selected_value) {
            case "Standard":
                per = 10
                $("#amountUni").val(format(intPrice[0]));
                break;
            case "Premium":
                per = 13
                $("#amountUni").val(format(intPrice[1]));
                break;
            case "Excelium":
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



