let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let monthAndYear = document.getElementById("monthAndYear");

var travellerName;
var travellerPhone;
var travellerEmail;
var travellerStartDate;
var travellerEndDate;
var highlightedCell = $(".highlightedCell");

$( function() {
    var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
    $( "#destination" ).autocomplete({
      source: countries
    });
  });

$("form").submit(function() {

        var travellerInfo = $("form").serializeArray();
        var sendEmail = $("#emailrow");
        travellerName = travellerInfo[0].value;
        travellerPhone = travellerInfo[1].value;
        travellerEmail = travellerInfo[2].value;
        travellerStartDate = moment(travellerInfo[6].value).format("DD-MM-YYYY");
        travellerEndDate = moment(travellerInfo[7].value).format("DD-MM-YYYY");
        travellerStartMonth = Number(moment(travellerInfo[6].value).format("MM"))-1;
        travellerStartYear = moment(travellerInfo[6].value).format("YYYY");
        showCalendar(travellerStartMonth, travellerStartYear);
        sendEmail.href = "mailto:"+travellerEmail+"?Subject=Event Planner";
        sendEmail.trigger();
        return false;
    });

function main() {
    showCalendar(currentMonth, currentYear);
}

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = $("#calendar-body"); // body of the calendar


    // clearing all previous cells
    tbl.html("");



    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;



    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = $("<tr></tr>");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                row.append("<td></td>");
            } else if (date > daysInMonth) {
                break;
            } else {
                var updatedMonth = parseInt(month)+parseInt("1");
                var dateID =  
                    (date <= 9 ? "0"+date : date) + "-" + 
                    (month <= 9 ? "0"+updatedMonth : updatedMonth) + "-" + 
                    year;   
                if(dateID === travellerStartDate || dateID === travellerEndDate) 
                {
                    row.append("<td id="+dateID+" class=highlightedCell>"+date+"</td></tr>");
                    // console.log("If part " + i +" "+ j + " "+ row.html());
                }
                else 
                {
                    row.append("<td id="+dateID+">"+date+"</td></tr>");  
                    // console.log("Else part " + i +" "+ j + " "+ row.html());
                }
                date++;
            }
        }
        tbl.append(row); // appending each row into calendar body.
    }

    $(".highlightedCell").on("mouseover",function () {
        var info = "Name: "+travellerName+"\nPhone: "+travellerPhone+"\nEmail: "+travellerEmail;
        var rect = this.getBoundingClientRect();
        x = rect.left;
        r = rect.right;
        y = rect.top;
        w = rect.width;
        h = rect.height;
        console.log("Right: " + r + ", Left: " + x + ", Top: " + y + ", Width: " + w + ", Height: " + h);
        $("#myPopup").text(info);
       
        $(".popup").css({
            "top":(y-90).toString()+"px",
            "margin-left":(x-500).toString()+"px"
        });
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
     });

    $(".highlightedCell").on("mouseout",function(){
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    });
}
