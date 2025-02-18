import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaMale, FaFemale } from "react-icons/fa";
import useFilterStore from "./useFilterStore";
import { useEffect } from "react";
import {Selection} from '@nextui-org/react';

export const useFilters = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { filters, setFilter } = useFilterStore();

    const { ageRange, gender, orderBy } = filters;

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (gender) searchParams.set('gender', gender.join(','));
        if (ageRange) searchParams.set('ageRange', ageRange.toString());
        if (orderBy) searchParams.set('orderBy', orderBy);

        router.replace(`${pathname}?${searchParams}`);
    }, [ageRange, gender, orderBy, pathname, router])


    const orderByList = [
        { label: 'Last active', value: 'updated' },
        { label: 'Newest members', value: 'created' }
    ]

    const genderList = [
        { value: 'male', icon: FaMale },
        { value: 'female', icon: FaFemale }
    ]


    const handleAgeSelect = (value: number[]) => {
        setFilter('ageRange',value);
    }

    const handleOrderSelect = (value: Selection) => {
        if (value instanceof Set) {
            setFilter('orderBy', value.values().next().value as string);
        }
    }

    const handleGenderSelect = (value: string) => {
        if(gender.includes(value)) setFilter('gender',gender.filter(g=>g!==value));
        else setFilter('gender',[...gender,value]);
    }

    return{
        orderByList,
        genderList,
        selectAge:handleAgeSelect,
        selectGender:handleGenderSelect,
        selectOrder:handleOrderSelect,
        filters
    }
}