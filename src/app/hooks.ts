import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from './store';
import {useCallback, useEffect, useState} from "react";
import {DisputeType} from "../features/lawcalculator/LawCalculatorTypes";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export function useLawCalculator(initialState: any) {
    const [state, setState] = useState(initialState);

    const initLawCalculator = () => {
        state.disputeValue = Number.NaN;
        state.disputeType = Number.NaN;
        state.disputeHearings = Number.NaN;

        state.officeAbsenceFee = Number.NaN;
        state.disputeLump = Number.NaN;
        state.disputeBaseExpense = Number.NaN;
        state.disputeCourtTax = Number.NaN;
        state.disputeTotal = Number.NaN;

        state.disputeLumpRatio = 0.30;
        state.officeAbsenceFeeRatio = 0.20;
    }

    useEffect(() => {
        initLawCalculator();
    }, [])

    const computeDisputeCourtTax = (disputeValue: number): number => {
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

    const computeDisputeBaseExpense = (disputeValue: number, disputeType: DisputeType): number => {

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

    const computeDisputeTotal = useCallback(
        (disputeValue: number, disputeType: DisputeType, disputeHearings: number): number => {
            let disputeBaseExpense: number = computeDisputeBaseExpense(disputeValue, disputeType);
            let disputeCourtTax: number = computeDisputeCourtTax(disputeValue);
            let disputeLump: number = disputeBaseExpense * state.disputeLumpRatio;
            let disputeTotal: number = disputeBaseExpense + disputeLump;
            let officeAbsenceFee: number = disputeTotal * state.officeAbsenceFeeRatio;
            disputeTotal += officeAbsenceFee;
            disputeTotal = disputeTotal * disputeHearings;

            let computation = {
                ...state,
                disputeBaseExpense: disputeBaseExpense,
                disputeCourtTax: disputeCourtTax,
                disputeLump: disputeLump,
                officeAbsenceFee: officeAbsenceFee,
                disputeTotal: disputeTotal,

                disputeValue: disputeValue,
                disputeType: disputeType as unknown as number,
                disputeHearings: disputeHearings,
            };

            console.log(computation);

            setState(computation);

            return 0;
        }
        , [state, setState])

    return {state, computeDisputeTotal};
}
