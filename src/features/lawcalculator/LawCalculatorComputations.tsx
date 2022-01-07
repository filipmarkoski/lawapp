export enum DisputeType {
    Unspecified,
    WorkDispute
}

export class LawCalculatorComputations {

    private _disputeValue: number;
    private _disputeType: DisputeType;
    private _disputeHearings: number;

    officeAbsenceFeeRatio: number = 0.20;

    officeAbsenceFee: number;
    disputeLump: number;
    disputeBaseExpense: number;
    disputeCourtTax: number;
    disputeTotal: number;

    // disputeValue: number, disputeType: DisputeType, disputeHearings: number
    constructor() {
        this._disputeValue = Number.NaN;
        this._disputeType = Number.NaN;
        this._disputeHearings = Number.NaN;

        this.officeAbsenceFee = Number.NaN;
        this.disputeLump = Number.NaN;
        this.disputeBaseExpense = Number.NaN;
        this.disputeCourtTax = Number.NaN;
        this.disputeTotal = Number.NaN;

    }

    public get disputeValue(): number {
        return this._disputeValue;
    }

    public set disputeValue(value: number) {
        this._disputeValue = +value;
        this.compute();
    }

    public get disputeType(): DisputeType {
        return this._disputeType;
    }

    public set disputeType(value: DisputeType) {
        this._disputeType = value;
        this.compute();
    }

    public get disputeHearings(): number {
        return this._disputeHearings;
    }

    public set disputeHearings(value: number) {
        this._disputeHearings = +value;
        this.compute();
    }

    public compute(): void {
        console.log(this._disputeValue);
        console.log(this._disputeType);
        console.log(this._disputeHearings);
        console.log(`Total=${this.disputeTotal}`);

        console.log(Number.isFinite(this._disputeValue));
        console.log(this._disputeType in DisputeType);
        console.log(Number.isFinite(this._disputeHearings));
        console.log(typeof (this._disputeHearings));

        if (Number.isFinite(this._disputeValue) && this._disputeType in DisputeType && Number.isFinite(this._disputeHearings)) {
            this.computeDisputeTotal(this._disputeValue, this._disputeType, this._disputeHearings);
        } else {
            console.log('LawCalculatorComputations.compute() is inadequate.');
        }
    }

    public computeDisputeTotal(disputeValue: number, disputeType: DisputeType, disputeHearings: number): number {
        this.disputeBaseExpense = this.computeDisputeBaseExpense(disputeValue, disputeType);
        this.disputeCourtTax = this.computeDisputeCourtTax(disputeValue);
        this.disputeLump = this.disputeBaseExpense * 0.30;
        this.disputeTotal = this.disputeBaseExpense + this.disputeLump;
        this.officeAbsenceFee = this.disputeTotal * this.officeAbsenceFeeRatio;
        this.disputeTotal += this.officeAbsenceFee;
        this.disputeTotal = this.disputeTotal * this._disputeHearings;
        return this.disputeTotal;
    }

    public computeDisputeCourtTax(disputeValue: number): number {
        if (disputeValue <= 10000) {
            return 600;
        }
        if (10000 <= disputeValue && disputeValue <= 20000) {
            return 1000;
        }
        if (20000 <= disputeValue && disputeValue <= 40000) {
            return 1500;
        }
        if (40000 <= disputeValue && disputeValue <= 60000) {
            return 2000;
        }
        if (60000 <= disputeValue && disputeValue <= 100000) {
            return 2500;
        }
        if (disputeValue > 100000) {
            let disputeCourtTaxOverhead = disputeValue - 100000;
            disputeCourtTaxOverhead = disputeCourtTaxOverhead * 0.2;
            if (disputeCourtTaxOverhead > 60000) {
                return 60000;
            } else {
                return disputeCourtTaxOverhead;
            }
        }
        return Number.NaN;

    }

    public computeDisputeBaseExpense(disputeValue: number, disputeType: DisputeType): number {

        if (!Number.isFinite(disputeValue)) {
            throw new TypeError('The value of the dispute must be a number.');
        }
        if (!(disputeType in DisputeType)) {
            throw new TypeError('The type of the dispute must be a pre-configured item.');
        }

        if (disputeType === DisputeType.WorkDispute) {
            return 7000;
        }

        if (disputeValue <= 10000) {
            return 1000;
        }
        if (10001 <= disputeValue && disputeValue <= 50000) {
            return 3000;
        }
        if (50001 <= disputeValue && disputeValue <= 100000) {
            return 4000;
        }
        if (100001 <= disputeValue && disputeValue <= 300000) {
            return 5000;
        }
        if (300001 <= disputeValue && disputeValue <= 600000) {
            return 6000;
        }
        if (600001 <= disputeValue && disputeValue <= 1000000) {
            return 7000;
        }
        if (1000001 <= disputeValue && disputeValue <= 2500000) {
            return 9000;
        }
        if (2500001 <= disputeValue && disputeValue <= 5000000) {
            return 12000;
        }
        if (disputeValue >= 5000001) {
            return 18000;
        }
        return Number.NaN;
    }
}