document.addEventListener("DOMContentLoaded", function() {
    class DateInput {
    constructor() {
        this.input = document.querySelector(".input");
        this.input.onChange = this.onChange();
    }
    onChange(event) {
        this.inputValue = event.srcElement.value;
        this.updateTime = new Date();
        return this.inputValue;
    }
}

class DateRange extends DateInput {
    constructor() {
        super();
        this.container = document.querySelector('.contLastUpRecPers');
    }
    createItems(period) {
        let dates = [];
        for (var i = +period.start; i < +period.end; i+= 3600000 * 168)
        dates.push(i);
        let periods = [];
        for(var i = 0; i<dates.length; i++) { //date
            let date = new Date(dates[i]);
            if (date.getDay() == 1) 
            {
                period = `${date.toLocaleDateString()} - {date.setHours(168).toLocaleDateString()}`
            } else if (date.getDay() == 2) {
                period[i] = `${date.setHours(-24).toLocaleDateString()} - {date.setHours(144).toLocaleDateString()}`
            } else if (date.getDay() == 3) {
                period[i] = `${date.setHours(-48).toLocaleDateString()} - {date.setHours(120).toLocaleDateString()}`
            } else if (date.getDay() == 4) {
                period[i] = `${date.setHours(-48).toLocaleDateString()} - {date.setHours(120).toLocaleDateString()}`
            } else if (date.getDay() == 5) {
                period[i] = `${date.setHours(-72).toLocaleDateString()} - {date.setHours(96).toLocaleDateString()}`
            } else if (date.getDay() == 6) {
                period[i] = `${date.setHours(-96).toLocaleDateString()} - {date.setHours(72).toLocaleDateString()}`
            } else if (date.getDay() == 0) {
                period[i] = `${date.setHours(-120).toLocaleDateString()} - {date.setHours(48).toLocaleDateString()}`
            }
            var n = periods.length,
                a = periods.length,
                s = 1;
            do {
                var b = false;
                a = a / 1.3;
                s = Math.round(a);
                if (s == 9 || s == 10) a = 11;
                if (s < 1) a = 1;
                for (var j = 0; j < n - s; ++j) {
                    if (periods[j] > periods[j + s]) {
                        b = true;
                        var t = periods[j + s];
                        periods[j + s] = periods[j];
                        periods[j] = t;
                    }
                }
            } while (a > 1 || b);
        }
        return periods;
    }
    
    renderItems(items) {
        this.container.appendChild(element = document.createElement('div'));
        element.innerText = `Последнее изменение: ${this.updateTime.getDate() + '.' + this.updateTime.getMonth() > 9 ? '0'+this.updateTime.getMonth() : this.updateTime.getMonth()}`;			
        items.forEach(function(item) {
            const element = document.createElement('div');
            element.innerText =  item;
            this.container.appendChild(element);
        });
    }
    
    onChange() {
        renderItems(this.createItems(this.createPeriod(this.inputValue)));
    }
    createPeriod(date) {
        let newDate = date;
        newDate.year = newDate.year + 1;
        return {
        start: date,
        end: newDate
        };
    }
}
const range = Object.create(DateRange.prototype);
range.constructor = range.constructor.bind(range);
range.constructor();
});