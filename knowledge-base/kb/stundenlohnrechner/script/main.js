new Vue({
    el: '#app',
    data: {
        costs: { 
            salaryDesired: 6500, 
            thirteen: true,
            salarySocialOptions: [
                { text: 'AHV/IV', value: 0.097},
                { text: 'Unfall', value: 0.03568},
                { text: '2. Säule / BVG', value: 0.125},
                { text: '3. Säule', value: 0.048},
                { text: 'Krankentaggeld', value: 0.03},
                { text: 'Familienzulagen', value: 0.04},
            ],
            spending: 2000,
        },
        salarySocialSelected: [ 0.097, 0.03568, 0.125 ],
        hours: {
            workingHours: 162, // darin schon 6h abgezogen für illness
            illness: 0,
            holidays: 0.10638,
            holidayOptions: [
                { text: '4 Wochen (08.33%)', value: 0.08333 }, // 4 Wochen im Jahr heisst Stunden pro Monat: 4*5*8/12
                { text: '5 Wochen (10.64%)', value: 0.10638 },
                { text: '6 Wochen (13.04%)', value: 0.13044 },
                ],
            unbillable: 30,
        },
        lohnModal: false,
        thirteenModal: false,
        versicherungenModal: false,
        ausgabenModal: false,
        arbeitsstundenModal: false,
        ferienModal: false,
        nichtVerrechenbarModal: false
    },
    computed: {
        calculatedSocial: function () {
            if (!this.salarySocialSelected) {
                return 0;
            };
            return this.salarySocialSelected.reduce(function(prev, cur) {
            return prev + cur;
            }, 0)
        },
        calculatedSalary: function () {
            if (!this.costs.salaryDesired ) {
                return 0;
            };
            return this.costs.salaryDesired * (1 + this.calculatedSocial) + this.calculatedThirteen;
        }, 
        calculatedThirteen: function () {
            if (this.costs.thirteen === true) {
                return this.costs.salaryDesired / 12;
            };
            return 0;
        },
        calculatedCosts: function () {
            if (!this.costs.spending ) {
                return this.calculatedSalary;
            };
            return this.calculatedSalary + this.costs.spending;
        }, 
        calculatedHours: function () {
            return (this.hours.workingHours * (1 - this.hours.holidays) * (1 - this.hours.unbillable / 100));
        }, 
        calculatedRate: function () {
            return this.calculatedCosts / this.calculatedHours;
        }
    }
    })