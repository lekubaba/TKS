
function DateLastMonth(date){
    var year = date.substr(0, 4);
    var month = date.substr(5, 2);
    var day = date.substr(8, 2);
    var thisDay = new Date(year,month,0);
    var maxThisDay = thisDay.getDate();
    if (month == '01') {
        year = year - 1;
        month = '12';
    } else {
        if (month <= 10) {
            month = '0' + (month - 1);
        } else {
            month = (month - 1);
        }
    }
    var lastDay = new Date(year,month,0);
    var maxLastDay = lastDay.getDate();
    if(day>maxLastDay){
        day = maxLastDay;
    }else if(day==maxThisDay){
        day = maxLastDay;
    }
    return year +'-'+ month +'-'
	
}

module.exports.lastMonth = DateLastMonth;